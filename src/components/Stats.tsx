import React from 'react';
import { Users, Sprout, DollarSign, Tractor } from 'lucide-react';

export default function Stats() {
  const stats = [
    {
      title: 'Active Farmers',
      value: '2,500+',
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'Projects Funded',
      value: '150+',
      icon: Sprout,
      color: 'bg-green-500',
    },
    {
      title: 'Total Investments',
      value: '$2.5M',
      icon: DollarSign,
      color: 'bg-yellow-500',
    },
    {
      title: 'Shared Resources',
      value: '500+',
      icon: Tractor,
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-lg p-6 transition-transform hover:scale-[1.02]"
        >
          <div className="flex items-center space-x-4">
            <div className={`${stat.color} p-3 rounded-lg`}>
              <stat.icon className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}