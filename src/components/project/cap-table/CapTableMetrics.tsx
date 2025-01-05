import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface CapTableMetricsProps {
  projectId: string;
}

export default function CapTableMetrics({ projectId }: CapTableMetricsProps) {
  const metrics = {
    totalShares: 2000,
    fullyDilutedShares: 2200,
    outstandingShares: 1800,
    reservedShares: 200,
    lastUpdated: '2024-03-15',
  };

  const distributionData = [
    { name: 'Founders', value: 1000 },
    { name: 'Investors', value: 800 },
    { name: 'Reserved', value: 200 },
  ];

  const COLORS = ['#10B981', '#3B82F6', '#6366F1'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 grid grid-cols-2 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Total Shares</p>
          <p className="text-2xl font-bold">{metrics.totalShares.toLocaleString()}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Fully Diluted Shares</p>
          <p className="text-2xl font-bold">{metrics.fullyDilutedShares.toLocaleString()}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Outstanding Shares</p>
          <p className="text-2xl font-bold">{metrics.outstandingShares.toLocaleString()}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Reserved Shares</p>
          <p className="text-2xl font-bold">{metrics.reservedShares.toLocaleString()}</p>
        </div>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={distributionData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {distributionData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}