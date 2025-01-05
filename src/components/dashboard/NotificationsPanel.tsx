import React from 'react';
import { Bell, MessageSquare, DollarSign, AlertCircle } from 'lucide-react';

interface Notification {
  id: string;
  type: 'message' | 'payment' | 'alert' | 'update';
  title: string;
  description: string;
  time: string;
  read: boolean;
}

export default function NotificationsPanel() {
  const notifications: Notification[] = [
    {
      id: '1',
      type: 'message',
      title: 'New collaboration request',
      description: 'John Smith wants to collaborate on Rice Farming project',
      time: '5 min ago',
      read: false,
    },
    {
      id: '2',
      type: 'payment',
      title: 'Payment received',
      description: 'Received $5,000 for Project Investment',
      time: '2 hours ago',
      read: false,
    },
    {
      id: '3',
      type: 'alert',
      title: 'Weather Alert',
      description: 'Heavy rain expected in your region next week',
      time: '1 day ago',
      read: true,
    },
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'message':
        return <MessageSquare className="h-5 w-5 text-blue-500" />;
      case 'payment':
        return <DollarSign className="h-5 w-5 text-green-500" />;
      case 'alert':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Notifications</h2>
        <button className="btn-secondary">Mark all as read</button>
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`flex items-start space-x-4 p-4 rounded-lg ${
              notification.read ? 'bg-white' : 'bg-blue-50'
            }`}
          >
            <div className="p-2 rounded-lg bg-gray-100">
              {getNotificationIcon(notification.type)}
            </div>
            
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{notification.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{notification.description}</p>
              <span className="text-xs text-gray-500 mt-2 block">{notification.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}