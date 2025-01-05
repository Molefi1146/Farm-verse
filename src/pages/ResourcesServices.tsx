import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import ResourceCard from '../components/resources/ResourceCard';
import ServiceCard from '../components/resources/ServiceCard';
import CategoryFilter from '../components/resources/CategoryFilter';
import Stats from '../components/Stats';

export default function ResourcesServices() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeFilters, setActiveFilters] = useState({
    type: [],
    location: [],
    availability: [],
    priceRange: [],
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="bg-green-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Resources & Services Marketplace</h1>
          <p className="text-green-100 text-lg mb-8">
            Rent equipment, hire contractors, and find agricultural services
          </p>
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for equipment, services, or contractors..."
              className="w-full pl-12 pr-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <Stats />

        <div className="mt-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <CategoryFilter
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
            >
              <Filter className="h-5 w-5" />
              <span>Filters</span>
            </button>
          </div>

          <div className="lg:grid lg:grid-cols-4 lg:gap-8">
            {showFilters && (
              <div className="mb-6 lg:mb-0">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="font-semibold mb-4">Filters</h2>
                  {/* Add filter options here */}
                </div>
              </div>
            )}
            
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${showFilters ? 'lg:col-span-3' : 'lg:col-span-4'}`}>
              <ResourceCard
                title="John Deere Harvester"
                type="equipment"
                description="Modern harvester with GPS guidance system"
                rate="$200/hour"
                location="Sacramento, CA"
                availability="Available Now"
                image="https://images.unsplash.com/photo-1530267981375-f0de937f5f13?auto=format&fit=crop&q=80"
                owner={{
                  name: "Mike Johnson",
                  rating: 4.8,
                  reviews: 23
                }}
              />
              <ServiceCard
                title="Crop Spraying Service"
                type="service"
                description="Professional aerial crop spraying service"
                rate="Custom Quote"
                location="Fresno, CA"
                availability="48hr Notice"
                image="https://images.unsplash.com/photo-1562599838-8cc871c241a5?auto=format&fit=crop&q=80"
                provider={{
                  name: "AeroCrop Solutions",
                  rating: 4.9,
                  reviews: 156
                }}
              />
              {/* Add more cards here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}