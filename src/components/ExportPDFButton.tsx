'use client';

import React from 'react';

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
      // Get current page URL
      const currentUrl = window.location.href;
      
      // Call API to generate PDF
      const response = await fetch('/api/export-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: currentUrl,
          title: title
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate PDF');
      }

      // Download the PDF
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
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
