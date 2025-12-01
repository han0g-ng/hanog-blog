'use client';

import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface ExportPDFButtonProps {
  title: string;
  contentId?: string;
}

const ExportPDFButton: React.FC<ExportPDFButtonProps> = ({ 
  title, 
  contentId = 'writeup-content' 
}) => {
  const [isExporting, setIsExporting] = React.useState(false);

  const exportToPDF = async () => {
    setIsExporting(true);
    
    try {
      const element = document.getElementById(contentId);
      if (!element) {
        alert('Không tìm thấy nội dung để xuất PDF');
        return;
      }

      const clonedElement = element.cloneNode(true) as HTMLElement;
      clonedElement.style.width = '210mm';
      clonedElement.style.padding = '20mm';
      clonedElement.style.backgroundColor = 'white';
      clonedElement.style.color = 'black';
      clonedElement.style.position = 'absolute';
      clonedElement.style.left = '-9999px';
      document.body.appendChild(clonedElement);

      const canvas = await html2canvas(clonedElement, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      });

      document.body.removeChild(clonedElement);

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      const marginTop = 20;
      const marginBottom = 20;
      const marginSide = 20;
      const contentAreaHeight = pdfHeight - marginTop - marginBottom;
      const imgWidth = pdfWidth - (marginSide * 2);
      const pixelPerMm = canvas.width / imgWidth;
      const contentHeightInPixels = contentAreaHeight * pixelPerMm;
      
      // Hàm tìm điểm ngắt tốt (tránh cắt giữa chữ)
      const findGoodBreakPoint = (startY: number, idealHeight: number): number => {
        const ctx = canvas.getContext('2d');
        if (!ctx) return idealHeight;
        
        const searchRange = Math.min(idealHeight * 0.15, 50);
        let bestBreak = idealHeight;
        let maxWhiteSpace = 0;
        
        for (let offset = 0; offset < searchRange; offset++) {
          const y = Math.floor(startY + idealHeight - offset);
          if (y >= canvas.height) continue;
          
          const imageData = ctx.getImageData(0, y, canvas.width, 1);
          let whiteCount = 0;
          
          for (let i = 0; i < imageData.data.length; i += 4) {
            const r = imageData.data[i];
            const g = imageData.data[i + 1];
            const b = imageData.data[i + 2];
            const brightness = (r + g + b) / 3;
            
            if (brightness > 240) {
              whiteCount++;
            }
          }
          
          const whitePercentage = whiteCount / (canvas.width / 4);
          if (whitePercentage > maxWhiteSpace) {
            maxWhiteSpace = whitePercentage;
            bestBreak = idealHeight - offset;
          }
          
          if (whitePercentage > 0.9) {
            break;
          }
        }
        
        return bestBreak;
      };
      
      let currentY = 0;
      let pageNumber = 1;
      
      while (currentY < canvas.height) {
        if (pageNumber > 1) {
          pdf.addPage();
        }
        
        const idealSliceHeight = Math.min(contentHeightInPixels, canvas.height - currentY);
        const actualSliceHeight = currentY + idealSliceHeight >= canvas.height 
          ? idealSliceHeight 
          : findGoodBreakPoint(currentY, idealSliceHeight);
        
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = canvas.width;
        tempCanvas.height = actualSliceHeight;
        
        const tempCtx = tempCanvas.getContext('2d');
        if (tempCtx) {
          tempCtx.drawImage(
            canvas,
            0, currentY,
            canvas.width, actualSliceHeight,
            0, 0,
            canvas.width, actualSliceHeight
          );
          
          const sliceData = tempCanvas.toDataURL('image/png');
          const sliceHeightMm = actualSliceHeight / pixelPerMm;
          pdf.addImage(sliceData, 'PNG', marginSide, marginTop, imgWidth, sliceHeightMm);
        }
        
        pdf.setFontSize(10);
        pdf.setTextColor(120);
        pdf.text(
          `${pageNumber}`,
          pdfWidth - 20,
          pdfHeight - 10,
          { align: 'right' }
        );
        
        currentY += actualSliceHeight;
        pageNumber++;
      }
      
      const fileName = `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`;
      pdf.save(fileName);
      
    } catch (error) {
      console.error('Lỗi khi xuất PDF:', error);
      alert('Có lỗi xảy ra khi xuất PDF. Vui lòng thử lại.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <button
      onClick={exportToPDF}
      disabled={isExporting}
      className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 
                 text-white font-medium rounded-lg transition-colors duration-200
                 disabled:opacity-50 disabled:cursor-not-allowed
                 dark:bg-red-700 dark:hover:bg-red-800"
      title="Xuất writeup sang PDF"
    >
      <svg 
        className="w-5 h-5" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
        />
      </svg>
      {isExporting ? 'Đang xuất...' : 'Xuất PDF'}
    </button>
  );
};

export default ExportPDFButton;
