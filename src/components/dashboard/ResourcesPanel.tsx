import React from 'react';
import { Tractor, Users, Warehouse } from 'lucide-react';

interface Resource {
  id: string;
  name: string;
  type: 'equipment' | 'labor' | 'storage';
  status: 'available' | 'in-use' | 'maintenance';
  utilization: number;
}

export default function ResourcesPanel() {
  const resources: Resource[] = [
    {
      id: '1',
      name: 'Harvester Machine',
      type: 'equipment',
      status: 'available',
      utilization: 60,
    },
    {
      id: '2',
      name: 'Seasonal Workers',
      type: 'labor',
      status: 'in-use',
      utilization: 85,
    },
    {
      id: '3',
      name: 'Cold Storage',
      type: 'storage',
      status: 'available',
      utilization: 45,
    },
  ];

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'equipment':
        return <Tractor className="h-5 w-5" />;
      case 'labor':
        return <Users className="h-5 w-5" />;
      case 'storage':
        return <Warehouse className="h-5 w-5" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Resources</h2>
        <button className="btn-secondary">Manage</button>
      </div>

      <div className="space-y-4">
        {resources.map((resource) => (
          <div key={resource.id} className="flex items-center space-x-4 p-4 border rounded-lg">
            <div className={`p-2 rounded-lg ${
              resource.status === 'available' ? 'bg-green-100 text-green-600' :
              resource.status === 'in-use' ? 'bg-blue-100 text-blue-600' :
              'bg-yellow-100 text-yellow-600'
            }`}>
              {getResourceIcon(resource.type)}
            </div>
            
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-semibold text-gray-900">{resource.name}</h3>
                <span className="text-sm capitalize text-gray-500">{resource.status.replace('-', ' ')}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="flex-1 h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-blue-500 rounded-full"
                    style={{ width: `${resource.utilization}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600">{resource.utilization}% utilized</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}