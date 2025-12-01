import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export async function POST(request: NextRequest) {
  try {
    const { url, title } = await request.json();
    
    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    // Launch browser
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    
    // Set viewport size
    await page.setViewport({ width: 1200, height: 800 });
    
    // Navigate to the URL
    await page.goto(url, { 
      waitUntil: 'networkidle0',
      timeout: 30000 
    });

    // Wait for images to load
    await page.evaluate(async () => {
      const images = Array.from(document.images);
      await Promise.all(
        images.map(img => {
          if (img.complete) return Promise.resolve();
          return new Promise((resolve, reject) => {
            img.addEventListener('load', resolve);
            img.addEventListener('error', reject);
            setTimeout(reject, 10000); // timeout after 10s
          });
        })
      );
    });

    // Add CSS to improve PDF rendering
    await page.addStyleTag({
      content: `
        @media print {
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            font-size: 10pt !important;
          }
          
          /* Hide metadata info at the top of writeup */
          .text-sm.text-gray-600,
          .dark\\:text-gray-400,
          article > div:first-child > div:first-child {
            display: none !important;
          }
          
          /* Reduce font sizes for PDF */
          h1 { font-size: 18pt !important; }
          h2 { font-size: 16pt !important; }
          h3 { font-size: 14pt !important; }
          h4, h5, h6 { font-size: 12pt !important; }
          
          p, div, li, span {
            font-size: 10pt !important;
          }
          
          code, pre {
            font-size: 9pt !important;
          }
          
          /* Hide navigation elements */
          header, footer, nav, .no-print {
            display: none !important;
          }
          
          /* Prevent page breaks inside elements */
          h1, h2, h3, h4, h5, h6 {
            page-break-after: avoid;
            break-after: avoid;
          }
          
          img, figure, pre, code {
            page-break-inside: avoid;
            break-inside: avoid;
          }
          
          /* Ensure images fit on page */
          img {
            max-width: 100% !important;
            height: auto !important;
            page-break-inside: avoid;
            break-inside: avoid;
          }
          
          /* Code blocks */
          pre {
            white-space: pre-wrap;
            word-wrap: break-word;
            page-break-inside: avoid;
            break-inside: avoid;
          }
        }
      `
    });

    // Generate PDF
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20mm',
        right: '15mm',
        bottom: '20mm',
        left: '15mm'
      },
      displayHeaderFooter: true,
      headerTemplate: '<div></div>',
      footerTemplate: `
        <div style="font-size: 10px; text-align: center; width: 100%; color: #666;">
          <span class="pageNumber"></span> / <span class="totalPages"></span>
        </div>
      `
    });

    await browser.close();

    // Sanitize filename - remove special characters and convert to safe format
    const safeFilename = title 
      ? title.replace(/[^a-z0-9\s-]/gi, '').replace(/\s+/g, '_').toLowerCase() + '.pdf'
      : 'export.pdf';

    // Return PDF as response
    return new NextResponse(Buffer.from(pdfBuffer), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${safeFilename}"`
      }
    });

  } catch (error) {
    console.error('PDF Export Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF' }, 
      { status: 500 }
    );
  }
}
