import React from 'react';
import { DollarSign, TrendingUp, PieChart, Briefcase } from 'lucide-react';

export default function WalletStats() {
  const stats = [
    {
      title: 'Total Portfolio Value',
      value: '$125,000',
      change: '+12.5%',
      trend: 'up',
      icon: Briefcase,
      color: 'text-blue-600 bg-blue-100',
    },
    {
      title: 'Total Returns',
      value: '$15,500',
      change: '+8.3%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-green-600 bg-green-100',
    },
    {
      title: 'Available Balance',
      value: '$25,000',
      change: null,
      icon: DollarSign,
      color: 'text-purple-600 bg-purple-100',
    },
    {
      title: 'Active Investments',
      value: '8 Projects',
      change: null,
      icon: PieChart,
      color: 'text-yellow-600 bg-yellow-100',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div className={`p-3 rounded-lg ${stat.color}`}>
              <stat.icon className="h-6 w-6" />
            </div>
            {stat.change && (
              <span className={`text-sm font-medium ${
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
              </span>
            )}
          </div>
          <p className="mt-4 text-sm text-gray-600">{stat.title}</p>
          <p className="mt-2 text-2xl font-bold text-gray-900">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}