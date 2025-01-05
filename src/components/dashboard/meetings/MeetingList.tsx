import React from 'react';
import { Calendar, Clock, MapPin, Users, Video, FileText, Plus } from 'lucide-react';
import { formatDate } from '../../../utils/formatters';

interface Meeting {
  id: string;
  title: string;
  type: 'investor' | 'labor' | 'resources' | 'voting' | 'emergency';
  date: string;
  time: string;
  duration: string;
  location: {
    type: 'online' | 'onsite' | 'other';
    details: string;
  };
  agenda: string;
  participants: string[];
  notes?: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}

interface MeetingListProps {
  meetings: Meeting[];
  onAddMeeting: () => void;
  onAddNotes: (meetingId: string) => void;
}

export default function MeetingList({ meetings, onAddMeeting, onAddNotes }: MeetingListProps) {
  const getTypeColor = (type: Meeting['type']) => {
    switch (type) {
      case 'investor':
        return 'bg-blue-100 text-blue-800';
      case 'labor':
        return 'bg-purple-100 text-purple-800';
      case 'resources':
        return 'bg-green-100 text-green-800';
      case 'voting':
        return 'bg-yellow-100 text-yellow-800';
      case 'emergency':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: Meeting['status']) => {
    switch (status) {
      case 'upcoming':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Meetings</h2>
        <button
          onClick={onAddMeeting}
          className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Schedule Meeting</span>
        </button>
      </div>

      <div className="space-y-4">
        {meetings.map((meeting) => (
          <div key={meeting.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-lg">{meeting.title}</h3>
                <div className="flex items-center space-x-2 mt-1">
                  <span className={`text-xs px-2 py-1 rounded-full capitalize ${getTypeColor(meeting.type)}`}>
                    {meeting.type}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full capitalize ${getStatusColor(meeting.status)}`}>
                    {meeting.status}
                  </span>
                </div>
              </div>
              {meeting.status === 'completed' && !meeting.notes && (
                <button
                  onClick={() => onAddNotes(meeting.id)}
                  className="flex items-center space-x-1 text-green-600 hover:text-green-700"
                >
                  <FileText className="h-4 w-4" />
                  <span>Add Notes</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{formatDate(meeting.date)}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>{meeting.time} ({meeting.duration})</span>
                </div>
                <div className="flex items-center text-gray-600">
                  {meeting.location.type === 'online' ? (
                    <Video className="h-4 w-4 mr-2" />
                  ) : (
                    <MapPin className="h-4 w-4 mr-2" />
                  )}
                  <span>{meeting.location.details}</span>
                </div>
              </div>

              <div>
                <div className="flex items-center text-gray-600 mb-2">
                  <Users className="h-4 w-4 mr-2" />
                  <span>{meeting.participants.length} participants</span>
                </div>
                {meeting.notes && (
                  <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-700 mb-1">Meeting Notes</h4>
                    <p className="text-sm text-gray-600">{meeting.notes}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-medium text-gray-700 mb-1">Agenda</h4>
              <p className="text-sm text-gray-600">{meeting.agenda}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}