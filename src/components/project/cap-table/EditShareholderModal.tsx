import React from 'react';
import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const shareholderSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  shareClass: z.string().min(1, 'Share class is required'),
  shares: z.number().min(1, 'Must have at least 1 share'),
  dateAcquired: z.string().min(1, 'Date is required'),
});

interface EditShareholderModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
}

export default function EditShareholderModal({ isOpen, onClose, projectId }: EditShareholderModalProps) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(shareholderSchema),
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Edit Shareholder</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              {...register('name')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Share Class</label>
            <select
              {...register('shareClass')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            >
              <option value="common">Common</option>
              <option value="preferred">Preferred</option>
            </select>
            {errors.shareClass && (
              <p className="mt-1 text-sm text-red-600">{errors.shareClass.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Number of Shares</label>
            <input
              type="number"
              {...register('shares', { valueAsNumber: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
            {errors.shares && (
              <p className="mt-1 text-sm text-red-600">{errors.shares.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Date Acquired</label>
            <input
              type="date"
              {...register('dateAcquired')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
            {errors.dateAcquired && (
              <p className="mt-1 text-sm text-red-600">{errors.dateAcquired.message}</p>
            )}
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}