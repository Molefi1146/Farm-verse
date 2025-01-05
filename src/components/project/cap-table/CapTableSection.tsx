import React, { useState } from 'react';
import { Shield, Download, History, Edit2 } from 'lucide-react';
import ShareholderTable from './ShareholderTable';
import CapTableMetrics from './CapTableMetrics';
import CapTableHistory from './CapTableHistory';
import EditShareholderModal from './EditShareholderModal';
import ExportMenu from './ExportMenu';

interface CapTableSectionProps {
  projectId: string;
  isAdmin: boolean;
}

export default function CapTableSection({ projectId, isAdmin }: CapTableSectionProps) {
  const [showHistory, setShowHistory] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  if (!isAdmin) return null;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Shield className="h-5 w-5 text-green-600" />
          <h2 className="text-xl font-bold">Cap Table</h2>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="flex items-center space-x-1 text-gray-600 hover:text-gray-900"
          >
            <History className="h-4 w-4" />
            <span>History</span>
          </button>
          <ExportMenu projectId={projectId} />
          <button
            onClick={() => setEditModalOpen(true)}
            className="flex items-center space-x-1 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700"
          >
            <Edit2 className="h-4 w-4" />
            <span>Edit</span>
          </button>
        </div>
      </div>

      <div className="mb-6">
        <CapTableMetrics projectId={projectId} />
      </div>

      <div className="mb-6">
        <ShareholderTable projectId={projectId} />
      </div>

      {showHistory && (
        <div className="mt-6 border-t pt-6">
          <CapTableHistory projectId={projectId} />
        </div>
      )}

      <EditShareholderModal
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        projectId={projectId}
      />
    </div>
  );
}