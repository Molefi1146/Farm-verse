import React from 'react';
import { Tractor, Users, Wrench, Truck, Warehouse, Cloud } from 'lucide-react';

interface CategoryFilterProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryFilter({ activeCategory, onCategoryChange }: CategoryFilterProps) {
  const categories = [
    { id: 'all', label: 'All', icon: Tractor },
    { id: 'equipment', label: 'Equipment', icon: Wrench },
    { id: 'labor', label: 'Labor', icon: Users },
    { id: 'transport', label: 'Transport', icon: Truck },
    { id: 'storage', label: 'Storage', icon: Warehouse },
    { id: 'services', label: 'Services', icon: Cloud },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
            activeCategory === category.id
              ? 'bg-green-600 text-white'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          <category.icon className="h-4 w-4" />
          <span>{category.label}</span>
        </button>
      ))}
    </div>
  );
}