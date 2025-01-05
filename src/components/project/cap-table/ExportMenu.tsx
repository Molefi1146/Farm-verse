import React, { useState } from 'react';
import { Download, FileText, Table } from 'lucide-react';

interface ExportMenuProps {
  projectId: string;
}

export default function ExportMenu({ projectId }: ExportMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleExport = (format: 'csv' | 'pdf') => {
    // Implement export logic here
    console.log(`Exporting as ${format}...`);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 text-gray-600 hover:text-gray-900"
      >
        <Download className="h-4 w-4" />
        <span>Export</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu">
            <button
              onClick={() => handleExport('csv')}
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
            >
              <Table className="h-4 w-4 mr-2" />
              Export as CSV
            </button>
            <button
              onClick={() => handleExport('pdf')}
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
            >
              <FileText className="h-4 w-4 mr-2" />
              Export as PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
}