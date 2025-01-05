import React, { useState } from 'react';
import MeetingList from './MeetingList';
import MeetingModal from './MeetingModal';
import MeetingNotesModal from './MeetingNotesModal';

export default function MeetingsPanel() {
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isNotesModalOpen, setNotesModalOpen] = useState(false);
  const [selectedMeetingId, setSelectedMeetingId] = useState<string | null>(null);
  const [meetings, setMeetings] = useState([
    {
      id: '1',
      title: 'Q1 Investor Update',
      type: 'investor' as const,
      date: '2024-03-25',
      time: '14:00',
      duration: '2h',
      location: {
        type: 'online' as const,
        details: 'https://meet.google.com/abc-defg-hij',
      },
      agenda: 'Review Q1 performance, discuss upcoming projects, and address investor questions.',
      participants: ['investor1@example.com', 'investor2@example.com'],
      status: 'upcoming' as const,
    },
    {
      id: '2',
      title: 'Farm Operations Review',
      type: 'labor' as const,
      date: '2024-03-20',
      time: '09:00',
      duration: '1h',
      location: {
        type: 'onsite' as const,
        details: 'Farm Main Office',
      },
      agenda: 'Review current operations, discuss challenges, and plan next week\'s activities.',
      participants: ['manager@example.com', 'supervisor@example.com'],
      status: 'completed' as const,
    },
  ]);

  const handleAddMeeting = (data: any) => {
    const newMeeting = {
      id: (meetings.length + 1).toString(),
      ...data,
      status: 'upcoming',
    };
    setMeetings([...meetings, newMeeting]);
    setAddModalOpen(false);
  };

  const handleAddNotes = (meetingId: string) => {
    setSelectedMeetingId(meetingId);
    setNotesModalOpen(true);
  };

  const handleSaveNotes = (data: any) => {
    setMeetings(meetings.map(meeting => 
      meeting.id === selectedMeetingId
        ? { ...meeting, notes: data.notes }
        : meeting
    ));
    setNotesModalOpen(false);
    setSelectedMeetingId(null);
  };

  const selectedMeeting = meetings.find(m => m.id === selectedMeetingId);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <MeetingList
        meetings={meetings}
        onAddMeeting={() => setAddModalOpen(true)}
        onAddNotes={handleAddNotes}
      />

      <MeetingModal
        isOpen={isAddModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSubmit={handleAddMeeting}
      />

      {selectedMeeting && (
        <MeetingNotesModal
          isOpen={isNotesModalOpen}
          onClose={() => setNotesModalOpen(false)}
          onSubmit={handleSaveNotes}
          meetingTitle={selectedMeeting.title}
        />
      )}
    </div>
  );
}