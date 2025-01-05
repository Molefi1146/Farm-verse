import React from 'react';
import { Filter } from 'lucide-react';

interface FilterPanelProps {
  activeFilters: {
    projectType: string[];
    location: string[];
    investmentRange: string[];
    status: string[];
  };
  onFilterChange: (filters: FilterPanelProps['activeFilters']) => void;
}

export default function FilterPanel({ activeFilters, onFilterChange }: FilterPanelProps) {
  const filters = {
    projectType: [
      'Crop Farming',
      'Livestock',
      'Aquaculture',
      'Vertical Farming',
      'Organic Farming',
    ],
    location: [
      'North America',
      'South America',
      'Europe',
      'Asia',
      'Africa',
      'Oceania',
    ],
    investmentRange: [
      'Under $10,000',
      '$10,000 - $50,000',
      '$50,000 - $100,000',
      '$100,000+',
    ],
    status: [
      'Accepting Investments',
      'In Progress',
      'Coming Soon',
    ],
  };

  const handleFilterClick = (category: keyof typeof filters, value: string) => {
    const updatedFilters = { ...activeFilters };
    const index = updatedFilters[category].indexOf(value);
    
    if (index === -1) {
      updatedFilters[category] = [...updatedFilters[category], value];
    } else {
      updatedFilters[category] = updatedFilters[category].filter(item => item !== value);
    }
    
    onFilterChange(updatedFilters);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Filter className="h-5 w-5 text-gray-500" />
        <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
      </div>

      {Object.entries(filters).map(([category, values]) => (
        <div key={category} className="mb-6">
          <h3 className="text-sm font-medium text-gray-900 mb-3 capitalize">
            {category.replace(/([A-Z])/g, ' $1').trim()}
          </h3>
          <div className="space-y-2">
            {values.map((value) => (
              <label key={value} className="flex items-center">
                <input
                  type="checkbox"
                  checked={activeFilters[category as keyof typeof filters].includes(value)}
                  onChange={() => handleFilterClick(category as keyof typeof filters, value)}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-600">{value}</span>
              </label>
            ))}
          </div>
        </div>
      ))}

      <button
        onClick={() => onFilterChange({
          projectType: [],
          location: [],
          investmentRange: [],
          status: [],
        })}
        className="w-full mt-4 text-sm text-gray-600 hover:text-gray-900"
      >
        Clear all filters
      </button>
    </div>
  );
}