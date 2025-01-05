import React from 'react';
import { Plus, Minus, DollarSign } from 'lucide-react';

interface ResourceRequirementsProps {
  data: {
    financialNeeds: string;
    equipmentNeeds: string[];
    laborNeeds: string;
    landRequirements: string;
    collaboratorRoles: string[];
  };
  onUpdate: (data: Partial<ResourceRequirementsProps['data']>) => void;
}

export default function ResourceRequirements({ data, onUpdate }: ResourceRequirementsProps) {
  const handleArrayUpdate = (field: 'equipmentNeeds' | 'collaboratorRoles', index: number, value: string) => {
    const newArray = [...data[field]];
    newArray[index] = value;
    onUpdate({ [field]: newArray });
  };

  const handleAddItem = (field: 'equipmentNeeds' | 'collaboratorRoles') => {
    onUpdate({ [field]: [...data[field], ''] });
  };

  const handleRemoveItem = (field: 'equipmentNeeds' | 'collaboratorRoles', index: number) => {
    const newArray = data[field].filter((_, i) => i !== index);
    onUpdate({ [field]: newArray });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Resource Requirements</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700">Financial Requirements</label>
        <div className="mt-1 relative">
          <DollarSign className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={data.financialNeeds}
            onChange={(e) => onUpdate({ financialNeeds: e.target.value })}
            className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            placeholder="Enter required investment amount"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Equipment Needs</label>
        {data.equipmentNeeds.map((equipment, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              value={equipment}
              onChange={(e) => handleArrayUpdate('equipmentNeeds', index, e.target.value)}
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              placeholder="Enter equipment needed"
            />
            <button
              onClick={() => handleRemoveItem('equipmentNeeds', index)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-md"
            >
              <Minus className="h-5 w-5" />
            </button>
          </div>
        ))}
        <button
          onClick={() => handleAddItem('equipmentNeeds')}
          className="flex items-center text-green-600 hover:text-green-700"
        >
          <Plus className="h-5 w-5 mr-1" />
          Add Equipment
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Labor Requirements</label>
        <textarea
          value={data.laborNeeds}
          onChange={(e) => onUpdate({ laborNeeds: e.target.value })}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          placeholder="Describe your labor requirements"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Land Requirements</label>
        <textarea
          value={data.landRequirements}
          onChange={(e) => onUpdate({ landRequirements: e.target.value })}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          placeholder="Describe your land requirements"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Collaborator Roles</label>
        {data.collaboratorRoles.map((role, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              value={role}
              onChange={(e) => handleArrayUpdate('collaboratorRoles', index, e.target.value)}
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              placeholder="Enter collaborator role"
            />
            <button
              onClick={() => handleRemoveItem('collaboratorRoles', index)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-md"
            >
              <Minus className="h-5 w-5" />
            </button>
          </div>
        ))}
        <button
          onClick={() => handleAddItem('collaboratorRoles')}
          className="flex items-center text-green-600 hover:text-green-700"
        >
          <Plus className="h-5 w-5 mr-1" />
          Add Role
        </button>
      </div>
    </div>
  );
}