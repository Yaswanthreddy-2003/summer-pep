import React, { useState } from 'react';

/**
 * A component for filtering neighborhood listings
 * 
 * @param {Object} props - Component props
 * @param {Object} props.filters - Current filter values
 * @param {Function} props.onFilterChange - Handler for filter changes
 * @param {boolean} props.collapsible - Whether the filter bar can be collapsed
 */
const FilterBar = ({ 
  filters = {}, 
  onFilterChange,
  collapsible = true,
  className = '',
  ...rest 
}) => {
  const [isExpanded, setIsExpanded] = useState(!collapsible);
  
  const handleFilterChange = (filterName, value) => {
    if (onFilterChange) {
      onFilterChange({ ...filters, [filterName]: value });
    }
  };
  
  const handleLifestyleChange = (e) => {
    handleFilterChange('lifestyle', e.target.value);
  };
  
  const handleCostChange = (e) => {
    handleFilterChange('costOfLiving', e.target.value);
  };
  
  const handleSafetyChange = (e) => {
    handleFilterChange('safety', e.target.value);
  };
  
  const handleAmenityChange = (e) => {
    const { value, checked } = e.target;
    let updatedAmenities = [...(filters.amenities || [])];
    
    if (checked) {
      updatedAmenities.push(value);
    } else {
      updatedAmenities = updatedAmenities.filter(amenity => amenity !== value);
    }
    
    handleFilterChange('amenities', updatedAmenities);
  };
  
  const handleCommuteChange = (e) => {
    const { value, checked } = e.target;
    let updatedCommute = [...(filters.commuteOptions || [])];
    
    if (checked) {
      updatedCommute.push(value);
    } else {
      updatedCommute = updatedCommute.filter(option => option !== value);
    }
    
    handleFilterChange('commuteOptions', updatedCommute);
  };
  
  const handleClearFilters = () => {
    if (onFilterChange) {
      onFilterChange({
        lifestyle: '',
        costOfLiving: '',
        safety: '',
        amenities: [],
        commuteOptions: []
      });
    }
  };
  
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };
  
  return (
    <div className={`bg-white shadow-md rounded-lg ${className}`} {...rest}>
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-900">Filters</h2>
          {collapsible && (
            <button
              type="button"
              onClick={toggleExpanded}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {isExpanded ? (
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          )}
        </div>
      </div>
      
      {isExpanded && (
        <div className="p-4">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Lifestyle Filter */}
            <div>
              <label htmlFor="lifestyle" className="block text-sm font-medium text-gray-700 mb-1">
                Lifestyle
              </label>
              <select
                id="lifestyle"
                name="lifestyle"
                value={filters.lifestyle || ''}
                onChange={handleLifestyleChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
              >
                <option value="">Any</option>
                <option value="young_professional">Young Professional</option>
                <option value="family">Family-Friendly</option>
                <option value="retiree">Retiree-Friendly</option>
                <option value="student">Student-Friendly</option>
              </select>
            </div>
            
            {/* Cost of Living Filter */}
            <div>
              <label htmlFor="costOfLiving" className="block text-sm font-medium text-gray-700 mb-1">
                Budget
              </label>
              <select
                id="costOfLiving"
                name="costOfLiving"
                value={filters.costOfLiving || ''}
                onChange={handleCostChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
              >
                <option value="">Any</option>
                <option value="low">Budget-Friendly</option>
                <option value="medium">Mid-Range</option>
                <option value="high">Luxury</option>
              </select>
            </div>
            
            {/* Safety Filter */}
            <div>
              <label htmlFor="safety" className="block text-sm font-medium text-gray-700 mb-1">
                Safety
              </label>
              <select
                id="safety"
                name="safety"
                value={filters.safety || ''}
                onChange={handleSafetyChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
              >
                <option value="">Any</option>
                <option value="low">Moderate</option>
                <option value="medium">Good</option>
                <option value="high">Excellent</option>
              </select>
            </div>
            
            {/* Clear Filters Button */}
            <div className="flex items-end">
              <button
                type="button"
                onClick={handleClearFilters}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Clear Filters
              </button>
            </div>
          </div>
          
          <div className="mt-6 border-t border-gray-200 pt-4">
            <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3">
              {/* Amenities Filter */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Amenities</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      id="amenity-parks"
                      name="amenity"
                      value="parks"
                      type="checkbox"
                      checked={(filters.amenities || []).includes('parks')}
                      onChange={handleAmenityChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="amenity-parks" className="ml-2 text-sm text-gray-700">
                      Parks & Recreation
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="amenity-restaurants"
                      name="amenity"
                      value="restaurants"
                      type="checkbox"
                      checked={(filters.amenities || []).includes('restaurants')}
                      onChange={handleAmenityChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="amenity-restaurants" className="ml-2 text-sm text-gray-700">
                      Restaurants & Dining
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="amenity-shopping"
                      name="amenity"
                      value="shopping"
                      type="checkbox"
                      checked={(filters.amenities || []).includes('shopping')}
                      onChange={handleAmenityChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="amenity-shopping" className="ml-2 text-sm text-gray-700">
                      Shopping Centers
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="amenity-nightlife"
                      name="amenity"
                      value="nightlife"
                      type="checkbox"
                      checked={(filters.amenities || []).includes('nightlife')}
                      onChange={handleAmenityChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="amenity-nightlife" className="ml-2 text-sm text-gray-700">
                      Nightlife & Entertainment
                    </label>
                  </div>
                </div>
              </div>
              
              {/* More Amenities */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">More Amenities</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      id="amenity-schools"
                      name="amenity"
                      value="schools"
                      type="checkbox"
                      checked={(filters.amenities || []).includes('schools')}
                      onChange={handleAmenityChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="amenity-schools" className="ml-2 text-sm text-gray-700">
                      Quality Schools
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="amenity-healthcare"
                      name="amenity"
                      value="healthcare"
                      type="checkbox"
                      checked={(filters.amenities || []).includes('healthcare')}
                      onChange={handleAmenityChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="amenity-healthcare" className="ml-2 text-sm text-gray-700">
                      Healthcare Facilities
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="amenity-public_transit"
                      name="amenity"
                      value="public_transit"
                      type="checkbox"
                      checked={(filters.amenities || []).includes('public_transit')}
                      onChange={handleAmenityChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="amenity-public_transit" className="ml-2 text-sm text-gray-700">
                      Public Transportation
                    </label>
                  </div>
                </div>
              </div>
              
              {/* Commute Options */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Commute Options</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      id="commute-car"
                      name="commute"
                      value="car"
                      type="checkbox"
                      checked={(filters.commuteOptions || []).includes('car')}
                      onChange={handleCommuteChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="commute-car" className="ml-2 text-sm text-gray-700">
                      Car
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="commute-public_transit"
                      name="commute"
                      value="public_transit"
                      type="checkbox"
                      checked={(filters.commuteOptions || []).includes('public_transit')}
                      onChange={handleCommuteChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="commute-public_transit" className="ml-2 text-sm text-gray-700">
                      Public Transit
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="commute-biking"
                      name="commute"
                      value="biking"
                      type="checkbox"
                      checked={(filters.commuteOptions || []).includes('biking')}
                      onChange={handleCommuteChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="commute-biking" className="ml-2 text-sm text-gray-700">
                      Biking
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="commute-walking"
                      name="commute"
                      value="walking"
                      type="checkbox"
                      checked={(filters.commuteOptions || []).includes('walking')}
                      onChange={handleCommuteChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="commute-walking" className="ml-2 text-sm text-gray-700">
                      Walking
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBar;