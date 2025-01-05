import React from 'react';
import { Clock } from 'lucide-react';

interface CapTableHistoryProps {
  projectId: string;
}

export default function CapTableHistory({ projectId }: CapTableHistoryProps) {
  const history = [
    {
      id: '1',
      date: '2024-03-15',
      user: 'Sarah Johnson',
      action: 'Updated share distribution',
      changes: 'Allocated 100 shares to new investor',
    },
    {
      id: '2',
      date: '2024-02-28',
      user: 'Sarah Johnson',
      action: 'Modified share class',
      changes: 'Changed investor shares to preferred class',
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Version History</h3>
      <div className="space-y-4">
        {history.map((item) => (
          <div key={item.id} className="flex space-x-4 border-l-2 border-gray-200 pl-4">
            <Clock className="h-5 w-5 text-gray-400 flex-shrink-0" />
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">{item.user}</span>
                <span className="text-sm text-gray-500">
                  {new Date(item.date).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm text-gray-900 mt-1">{item.action}</p>
              <p className="text-sm text-gray-500 mt-1">{item.changes}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}