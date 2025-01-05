import React from 'react';
import { useTable, useSortBy } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

interface Shareholder {
  id: string;
  name: string;
  shareClass: string;
  shares: number;
  ownership: number;
  fullyDiluted: number;
  dateAcquired: string;
}

interface ShareholderTableProps {
  projectId: string;
}

export default function ShareholderTable({ projectId }: ShareholderTableProps) {
  // In a real app, fetch this data from your API
  const shareholders: Shareholder[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      shareClass: 'Common',
      shares: 1000,
      ownership: 50,
      fullyDiluted: 45,
      dateAcquired: '2024-01-15',
    },
    // Add more shareholders...
  ];

  const columns = [
    {
      header: 'Shareholder',
      accessorKey: 'name',
    },
    {
      header: 'Share Class',
      accessorKey: 'shareClass',
    },
    {
      header: 'Shares',
      accessorKey: 'shares',
      cell: ({ value }: { value: number }) => value.toLocaleString(),
    },
    {
      header: 'Ownership %',
      accessorKey: 'ownership',
      cell: ({ value }: { value: number }) => `${value.toFixed(2)}%`,
    },
    {
      header: 'Fully Diluted %',
      accessorKey: 'fullyDiluted',
      cell: ({ value }: { value: number }) => `${value.toFixed(2)}%`,
    },
    {
      header: 'Date Acquired',
      accessorKey: 'dateAcquired',
      cell: ({ value }: { value: string }) => new Date(value).toLocaleDateString(),
    },
  ];

  const table = useTable({ data: shareholders, columns }, useSortBy);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {table.headers.map((header) => (
              <th
                key={header.id}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => header.toggleSortBy()}
              >
                <div className="flex items-center space-x-1">
                  <span>{header.render('header')}</span>
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {table.rows.map((row) => (
            <tr key={row.id}>
              {row.cells.map((cell) => (
                <td key={cell.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {cell.render('cell')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}