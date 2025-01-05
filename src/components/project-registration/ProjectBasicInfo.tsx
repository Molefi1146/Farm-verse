import React from 'react';
import { Calendar, MapPin } from 'lucide-react';

interface ProjectBasicInfoProps {
  data: {
    title: string;
    description: string;
    location: string;
    startDate: string;
    duration: string;
    category: string;
  };
  onUpdate: (data: Partial<ProjectBasicInfoProps['data']>) => void;
}

export default function ProjectBasicInfo({ data, onUpdate }: ProjectBasicInfoProps) {
  const categories = [
    'Crop Farming',
    'Livestock',
    'Aquaculture',
    'Vertical Farming',
    'Organic Farming',
    'Agroforestry',
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Basic Project Information</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700">Project Title</label>
        <input
          type="text"
          value={data.title}
          onChange={(e) => onUpdate({ title: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          placeholder="Enter project title"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={data.description}
          onChange={(e) => onUpdate({ description: e.target.value })}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          placeholder="Describe your project"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <div className="mt-1 relative">
            <MapPin className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={data.location}
              onChange={(e) => onUpdate({ location: e.target.value })}
              className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              placeholder="Project location"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Start Date</label>
          <div className="mt-1 relative">
            <Calendar className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
            <input
              type="date"
              value={data.startDate}
              onChange={(e) => onUpdate({ startDate: e.target.value })}
              className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Project Duration</label>
          <input
            type="text"
            value={data.duration}
            onChange={(e) => onUpdate({ duration: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            placeholder="e.g., 12 months"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            value={data.category}
            onChange={(e) => onUpdate({ category: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}