import React from 'react';
import { Plus, Minus } from 'lucide-react';

interface ProjectDetailsProps {
  data: {
    overview: string;
    goals: string[];
    timeline: string;
    risks: string[];
    sustainabilityMeasures: string[];
  };
  onUpdate: (data: Partial<ProjectDetailsProps['data']>) => void;
}

export default function ProjectDetailsForm({ data, onUpdate }: ProjectDetailsProps) {
  const handleArrayUpdate = (field: keyof typeof data, index: number, value: string) => {
    const newArray = [...data[field]];
    newArray[index] = value;
    onUpdate({ [field]: newArray });
  };

  const handleAddItem = (field: keyof typeof data) => {
    onUpdate({ [field]: [...data[field], ''] });
  };

  const handleRemoveItem = (field: keyof typeof data, index: number) => {
    const newArray = data[field].filter((_, i) => i !== index);
    onUpdate({ [field]: newArray });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Project Details</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700">Project Overview</label>
        <textarea
          value={data.overview}
          onChange={(e) => onUpdate({ overview: e.target.value })}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          placeholder="Provide a detailed overview of your project"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Project Goals</label>
        {data.goals.map((goal, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              value={goal}
              onChange={(e) => handleArrayUpdate('goals', index, e.target.value)}
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              placeholder="Enter project goal"
            />
            <button
              onClick={() => handleRemoveItem('goals', index)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-md"
            >
              <Minus className="h-5 w-5" />
            </button>
          </div>
        ))}
        <button
          onClick={() => handleAddItem('goals')}
          className="flex items-center text-green-600 hover:text-green-700"
        >
          <Plus className="h-5 w-5 mr-1" />
          Add Goal
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Project Timeline</label>
        <textarea
          value={data.timeline}
          onChange={(e) => onUpdate({ timeline: e.target.value })}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          placeholder="Describe your project timeline and key milestones"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Potential Risks</label>
        {data.risks.map((risk, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              value={risk}
              onChange={(e) => handleArrayUpdate('risks', index, e.target.value)}
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              placeholder="Enter potential risk"
            />
            <button
              onClick={() => handleRemoveItem('risks', index)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-md"
            >
              <Minus className="h-5 w-5" />
            </button>
          </div>
        ))}
        <button
          onClick={() => handleAddItem('risks')}
          className="flex items-center text-green-600 hover:text-green-700"
        >
          <Plus className="h-5 w-5 mr-1" />
          Add Risk
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Sustainability Measures
        </label>
        {data.sustainabilityMeasures.map((measure, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              value={measure}
              onChange={(e) =>
                handleArrayUpdate('sustainabilityMeasures', index, e.target.value)
              }
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              placeholder="Enter sustainability measure"
            />
            <button
              onClick={() => handleRemoveItem('sustainabilityMeasures', index)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-md"
            >
              <Minus className="h-5 w-5" />
            </button>
          </div>
        ))}
        <button
          onClick={() => handleAddItem('sustainabilityMeasures')}
          className="flex items-center text-green-600 hover:text-green-700"
        >
          <Plus className="h-5 w-5 mr-1" />
          Add Measure
        </button>
      </div>
    </div>
  );
}