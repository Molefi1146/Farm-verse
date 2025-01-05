import React from 'react';
import { X, FileText } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const notesSchema = z.object({
  notes: z.string().min(1, 'Meeting notes are required'),
  actionItems: z.array(z.string()).optional(),
  decisions: z.array(z.string()).optional(),
});

type NotesForm = z.infer<typeof notesSchema>;

interface MeetingNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: NotesForm) => void;
  meetingTitle: string;
}

export default function MeetingNotesModal({
  isOpen,
  onClose,
  onSubmit,
  meetingTitle,
}: MeetingNotesModalProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<NotesForm>({
    resolver: zodResolver(notesSchema),
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <FileText className="h-6 w-6 text-green-600" />
            <h2 className="text-xl font-bold">Meeting Notes: {meetingTitle}</h2>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Meeting Notes</label>
            <textarea
              {...register('notes')}
              rows={6}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              placeholder="Enter detailed meeting notes..."
            />
            {errors.notes && (
              <p className="mt-1 text-sm text-red-600">{errors.notes.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Action Items</label>
            <textarea
              {...register('actionItems')}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              placeholder="Enter action items (one per line)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Key Decisions</label>
            <textarea
              {...register('decisions')}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              placeholder="Enter key decisions made (one per line)"
            />
          </div>

          <div className="flex justify-end space-x-3">
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
              Save Notes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}