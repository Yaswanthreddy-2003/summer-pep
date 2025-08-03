import React from 'react';
import { Link } from 'react-router-dom';
import { 
  formatLifestyle, 
  formatCostOfLiving, 
  formatSafety,
  formatCommute,
  formatAmenity 
} from '../utils/helpers';

/**
 * A component for displaying user preferences in a summary format
 * 
 * @param {Object} props - Component props
 * @param {Object} props.preferences - User preferences data
 * @param {boolean} props.showUpdateLink - Whether to show the update preferences link
 * @param {string} props.className - Additional CSS classes
 */
const PreferencesSummary = ({ 
  preferences, 
  showUpdateLink = true,
  className = '',
  ...rest 
}) => {
  if (!preferences) return null;
  
  const {
    lifestyle = '',
    budget = '',
    commute = '',
    safety = '',
    amenities = []
  } = preferences;
  
  return (
    <div className={`bg-white shadow-md rounded-lg p-6 ${className}`} {...rest}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-900">Your Preferences</h2>
        {showUpdateLink && (
          <Link 
            to="/preferences" 
            className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Update Preferences
          </Link>
        )}
      </div>
      
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <div>
          <h3 className="text-sm font-medium text-gray-500">Lifestyle</h3>
          <p className="mt-1 text-base font-medium text-gray-900">
            {lifestyle ? formatLifestyle(lifestyle) : 'Not specified'}
          </p>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-500">Budget</h3>
          <p className="mt-1 text-base font-medium text-gray-900">
            {budget ? formatCostOfLiving(budget) : 'Not specified'}
          </p>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-500">Commute</h3>
          <p className="mt-1 text-base font-medium text-gray-900">
            {commute ? formatCommute(commute) : 'Not specified'}
          </p>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-500">Safety</h3>
          <p className="mt-1 text-base font-medium text-gray-900">
            {safety ? formatSafety(safety) : 'Not specified'}
          </p>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-500">Amenities</h3>
          <p className="mt-1 text-base font-medium text-gray-900">
            {amenities && amenities.length > 0 
              ? amenities.map(a => formatAmenity(a)).join(', ')
              : 'No specific preferences'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PreferencesSummary;