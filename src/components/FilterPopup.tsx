'use client';

import { useState } from 'react';

interface FilterPopupProps {
  category: string;
  onClose: () => void;
  onApplyFilters: (filters: FilterValues) => void;
}

export interface FilterValues {
  location?: string;
  priceRange: [number, number];
  startTime: [string, string];
  groupSize: [number, number];
  vehicle?: string[];
  features?: string[];
  theme?: string[];
  activities?: string[];
}

const FilterPopup = ({ category, onClose, onApplyFilters }: FilterPopupProps) => {
  const [filters, setFilters] = useState<FilterValues>({
    priceRange: [0, 10000],
    startTime: ['00:00', '23:59'],
    groupSize: [1, 50],
    vehicle: [],
    features: [],
    theme: [],
    activities: []
  });

  const handleReset = () => {
    setFilters({
      priceRange: [0, 10000],
      startTime: ['00:00', '23:59'],
      groupSize: [1, 50],
      vehicle: [],
      features: [],
      theme: [],
      activities: []
    });
  };

  const handleSearch = () => {
    onApplyFilters(filters);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold text-black capitalize">{category} Filters</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full text-black"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-4 space-y-6">
          {/* Price Range */}
          <div>
            <label className="text-sm font-medium text-black">Price Range</label>
            <div className="flex items-center gap-4 mb-2">
              <span className="text-sm text-black">$0</span>
              <input
                type="range"
                min="0"
                max="10000"
                step="100"
                value={filters.priceRange[1]}
                onChange={(e) => setFilters({
                  ...filters,
                  priceRange: [0, parseInt(e.target.value)]
                })}
                className="flex-1"
              />
              <span className="text-sm text-black">${filters.priceRange[1]}</span>
            </div>
            <p className="text-sm text-gray-700">Showing tours up to ${filters.priceRange[1]}</p>
          </div>

          {/* Start Time */}
          <div>
            <label className="text-sm font-medium text-black">Start Time</label>
            <div className="flex gap-4">
              <input
                type="time"
                value={filters.startTime[0]}
                onChange={(e) => setFilters({
                  ...filters,
                  startTime: [e.target.value, filters.startTime[1]]
                })}
                className="border rounded px-2 py-1 text-black"
              />
              <input
                type="time"
                value={filters.startTime[1]}
                onChange={(e) => setFilters({
                  ...filters,
                  startTime: [filters.startTime[0], e.target.value]
                })}
                className="border rounded px-2 py-1 text-black"
              />
            </div>
          </div>

          {/* Group Size */}
          <div>
            <label className="text-sm font-medium text-black">Group Size</label>
            <div className="flex items-center gap-4 mb-2">
              <span className="text-sm text-black">1</span>
              <input
                type="range"
                min="1"
                max="50"
                value={filters.groupSize[1]}
                onChange={(e) => setFilters({
                  ...filters,
                  groupSize: [1, parseInt(e.target.value)]
                })}
                className="flex-1"
              />
              <span className="text-sm text-black">{filters.groupSize[1]}</span>
            </div>
            <p className="text-sm text-gray-700">Up to {filters.groupSize[1]} people</p>
          </div>

          {/* Vehicle Selection */}
          <div>
            <label className="text-sm font-medium text-black">Vehicle Type</label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {['Yacht', 'Catamaran', 'Bus', 'Minivan'].map((vehicle) => (
                <label key={vehicle} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={filters.vehicle?.includes(vehicle)}
                    onChange={(e) => {
                      const newVehicles = e.target.checked
                        ? [...(filters.vehicle || []), vehicle]
                        : filters.vehicle?.filter(v => v !== vehicle);
                      setFilters({ ...filters, vehicle: newVehicles });
                    }}
                    className="rounded text-primary-500"
                  />
                  <span className="text-sm text-black">{vehicle}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Features */}
          <div>
            <label className="text-sm font-medium text-black">Features</label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {['WiFi', 'Food', 'Guide', 'Transfer'].map((feature) => (
                <label key={feature} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={filters.features?.includes(feature)}
                    onChange={(e) => {
                      const newFeatures = e.target.checked
                        ? [...(filters.features || []), feature]
                        : filters.features?.filter(f => f !== feature);
                      setFilters({ ...filters, features: newFeatures });
                    }}
                    className="rounded text-primary-500"
                  />
                  <span className="text-sm text-black">{feature}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-white p-4 border-t flex gap-4">
          <button
            onClick={handleReset}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-black hover:bg-gray-50"
          >
            Reset
          </button>
          <button
            onClick={handleSearch}
            className="flex-1 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterPopup; 