import React from 'react';
import { X, Calendar, Clock, MapPin, Users, Video } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const meetingSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  type: z.enum(['investor', 'labor', 'resources', 'voting', 'emergency']),
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required'),
  duration: z.string().min(1, 'Duration is required'),
  location: z.object({
    type: z.enum(['online', 'onsite', 'other']),
    details: z.string().min(1, 'Location details are required'),
  }),
  agenda: z.string().min(1, 'Agenda is required'),
  participants: z.array(z.string()).min(1, 'At least one participant is required'),
});

type MeetingForm = z.infer<typeof meetingSchema>;

interface MeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: MeetingForm) => void;
  initialData?: Partial<MeetingForm>;
}

export default function MeetingModal({ isOpen, onClose, onSubmit, initialData }: MeetingModalProps) {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<MeetingForm>({
    resolver: zodResolver(meetingSchema),
    defaultValues: initialData,
  });

  const locationType = watch('location.type');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Schedule Meeting</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Meeting Title</label>
            <input
              type="text"
              {...register('title')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Meeting Type</label>
            <select
              {...register('type')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            >
              <option value="">Select type</option>
              <option value="investor">Investor Meeting</option>
              <option value="labor">Labor Meeting</option>
              <option value="resources">Resources Meeting</option>
              <option value="voting">Voting Power Meeting</option>
              <option value="emergency">Emergency Meeting</option>
            </select>
            {errors.type && (
              <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <div className="mt-1 relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="date"
                  {...register('date')}
                  className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
              </div>
              {errors.date && (
                <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Time</label>
              <div className="mt-1 relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="time"
                  {...register('time')}
                  className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
              </div>
              {errors.time && (
                <p className="mt-1 text-sm text-red-600">{errors.time.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Duration</label>
              <select
                {...register('duration')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              >
                <option value="">Select duration</option>
                <option value="30m">30 minutes</option>
                <option value="1h">1 hour</option>
                <option value="2h">2 hours</option>
                <option value="3h">3 hours</option>
                <option value="4h">4 hours</option>
              </select>
              {errors.duration && (
                <p className="mt-1 text-sm text-red-600">{errors.duration.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Location Type</label>
            <select
              {...register('location.type')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            >
              <option value="">Select location type</option>
              <option value="online">Online</option>
              <option value="onsite">On-site</option>
              <option value="other">Other</option>
            </select>
            {errors.location?.type && (
              <p className="mt-1 text-sm text-red-600">{errors.location.type.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              {locationType === 'online' ? 'Meeting Link' : 'Location Details'}
            </label>
            <div className="mt-1 relative">
              {locationType === 'online' ? (
                <Video className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              ) : (
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              )}
              <input
                type="text"
                {...register('location.details')}
                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                placeholder={locationType === 'online' ? 'Enter meeting link' : 'Enter location details'}
              />
            </div>
            {errors.location?.details && (
              <p className="mt-1 text-sm text-red-600">{errors.location.details.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Meeting Agenda</label>
            <textarea
              {...register('agenda')}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              placeholder="Enter meeting agenda and topics to be discussed"
            />
            {errors.agenda && (
              <p className="mt-1 text-sm text-red-600">{errors.agenda.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Participants</label>
            <div className="mt-1 relative">
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                {...register('participants')}
                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                placeholder="Enter participant emails (comma-separated)"
              />
            </div>
            {errors.participants && (
              <p className="mt-1 text-sm text-red-600">{errors.participants.message}</p>
            )}
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
              Schedule Meeting
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}