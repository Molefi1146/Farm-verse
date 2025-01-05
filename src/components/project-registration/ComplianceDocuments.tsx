import React from 'react';
import { Upload, X, FileCheck } from 'lucide-react';

interface ComplianceDocumentsProps {
  data: {
    documents: File[];
    certifications: string[];
    permits: string[];
  };
  onUpdate: (data: Partial<ComplianceDocumentsProps['data']>) => void;
}

export default function ComplianceDocuments({ data, onUpdate }: ComplianceDocumentsProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      onUpdate({ documents: [...data.documents, ...newFiles] });
    }
  };

  const handleRemoveFile = (index: number) => {
    const newFiles = data.documents.filter((_, i) => i !== index);
    onUpdate({ documents: newFiles });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Compliance & Documents</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload Documents
        </label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
          <div className="space-y-1 text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="flex text-sm text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500"
              >
                <span>Upload files</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  multiple
                  onChange={handleFileChange}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">
              PDF, DOC, DOCX up to 10MB each
            </p>
          </div>
        </div>
      </div>

      {data.documents.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Uploaded Files</h3>
          <ul className="divide-y divide-gray-200">
            {data.documents.map((file, index) => (
              <li key={index} className="py-3 flex justify-between items-center">
                <div className="flex items-center">
                  <FileCheck className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-sm text-gray-900">{file.name}</span>
                </div>
                <button
                  onClick={() => handleRemoveFile(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  <X className="h-5 w-5" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Required Certifications
        </label>
        <textarea
          value={data.certifications.join('\n')}
          onChange={(e) => onUpdate({ certifications: e.target.value.split('\n') })}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          placeholder="List required certifications (one per line)"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Required Permits
        </label>
        <textarea
          value={data.permits.join('\n')}
          onChange={(e) => onUpdate({ permits: e.target.value.split('\n') })}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          placeholder="List required permits (one per line)"
        />
      </div>
    </div>
  );
}