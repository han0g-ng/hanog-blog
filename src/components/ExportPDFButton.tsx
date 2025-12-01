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

      // Tạo bản sao của element để xử lý
      const clonedElement = element.cloneNode(true) as HTMLElement;
      clonedElement.style.width = '210mm'; // A4 width
      clonedElement.style.padding = '20mm';
      clonedElement.style.backgroundColor = 'white';
      clonedElement.style.color = 'black';
      
      // Thêm vào body tạm thời (ẩn)
      clonedElement.style.position = 'absolute';
      clonedElement.style.left = '-9999px';
      document.body.appendChild(clonedElement);

      // Chuyển đổi sang canvas
      const canvas = await html2canvas(clonedElement, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      });

      // Xóa element tạm
      document.body.removeChild(clonedElement);

      const imgData = canvas.toDataURL('image/png');
      
      // Kích thước A4
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      // Lề cho header và footer
      const marginTop = 20;
      const marginBottom = 20; 
      const marginSide = 20;
      
      // Chiều cao vùng nội dung (không tính header/footer)
      const contentAreaHeight = pdfHeight - marginTop - marginBottom;
      
      const imgWidth = pdfWidth - (marginSide * 2);
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      // Tính tỉ lệ pixel trên canvas tương ứng với mm trên PDF
      const pixelPerMm = canvas.width / imgWidth;
      const contentHeightInPixels = contentAreaHeight * pixelPerMm;
      
      let currentY = 0; // Vị trí hiện tại trên canvas (pixel)
      let pageNumber = 1;
      
      while (currentY < canvas.height) {
        if (pageNumber > 1) {
          pdf.addPage();
        }
        
        // Tính chiều cao cần cắt từ canvas (pixel)
        const sliceHeight = Math.min(contentHeightInPixels, canvas.height - currentY);
        
        // Tạo canvas tạm để chứa phần cắt
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = canvas.width;
        tempCanvas.height = sliceHeight;
        
        const tempCtx = tempCanvas.getContext('2d');
        if (tempCtx) {
          // Vẽ phần cần thiết từ canvas gốc
          tempCtx.drawImage(
            canvas,
            0, currentY,           // Vị trí bắt đầu cắt trên canvas gốc
            canvas.width, sliceHeight,  // Kích thước vùng cắt
            0, 0,                  // Vị trí vẽ trên canvas tạm
            canvas.width, sliceHeight   // Kích thước vẽ
          );
          
          const sliceData = tempCanvas.toDataURL('image/png');
          const sliceHeightMm = sliceHeight / pixelPerMm;
          
          // Thêm ảnh vào vùng nội dung (tránh header/footer)
          pdf.addImage(sliceData, 'PNG', marginSide, marginTop, imgWidth, sliceHeightMm);
        }
        
        // Thêm số trang ở góc phải cuối trang
        pdf.setFontSize(10);
        pdf.setTextColor(120);
        pdf.text(
          `${pageNumber}`,
          pdfWidth - 20,
          pdfHeight - 10,
          { align: 'right' }
        );
        
        currentY += sliceHeight;
        pageNumber++;
      }
      
      // Lưu file
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
