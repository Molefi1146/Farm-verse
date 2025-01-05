import React, { useState } from 'react';
import SearchBar from '../components/marketplace/SearchBar';
import FilterPanel from '../components/marketplace/FilterPanel';
import ProjectGrid from '../components/marketplace/ProjectGrid';
import Stats from '../components/Stats';
import { Filter } from 'lucide-react';

export default function Marketplace() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    projectType: [],
    location: [],
    investmentRange: [],
    status: [],
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (filters: typeof activeFilters) => {
    setActiveFilters(filters);
  };

  const activeFilterCount = Object.values(activeFilters).flat().length;

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="bg-green-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Agricultural Project Marketplace</h1>
          <p className="text-green-100 text-lg mb-8">
            Discover and invest in sustainable farming projects worldwide
          </p>
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <Stats />
        
        <div className="mt-8">
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
            >
              <Filter className="h-5 w-5" />
              <span>Filters {activeFilterCount > 0 && `(${activeFilterCount})`}</span>
            </button>
          </div>
          
          <div className="lg:grid lg:grid-cols-4 lg:gap-8">
            <div className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
              <FilterPanel
                activeFilters={activeFilters}
                onFilterChange={handleFilterChange}
              />
            </div>
            <div className="mt-6 lg:mt-0 lg:col-span-3">
              <ProjectGrid searchQuery={searchQuery} activeFilters={activeFilters} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}