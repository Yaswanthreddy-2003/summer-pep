import React from 'react';
import { Link } from 'react-router-dom';
import Card from './Card';
import { formatLifestyle, formatCostOfLiving, formatSafety } from '../utils/helpers';

/**
 * A component for displaying neighborhood information in a card format
 * 
 * @param {Object} props - Component props
 * @param {Object} props.neighborhood - Neighborhood data
 * @param {boolean} props.showDetails - Whether to show additional details
 * @param {boolean} props.showActions - Whether to show action buttons
 * @param {Function} props.onSave - Handler for saving a neighborhood
 * @param {boolean} props.isSaved - Whether the neighborhood is saved
 */
const NeighborhoodCard = ({ 
  neighborhood, 
  showDetails = true,
  showActions = true,
  onSave = null,
  isSaved = false,
  className = '',
  ...rest 
}) => {
  if (!neighborhood) return null;
  
  const {
    _id,
    name,
    city,
    state,
    lifestyle,
    costOfLiving,
    safety,
    amenities = [],
    images = [],
    description
  } = neighborhood;
  
  // Default image if none provided
  const imageUrl = images && images.length > 0 
    ? images[0] 
    : 'https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60';
  
  // Get lifestyle badge color
  const getLifestyleBadgeColor = (lifestyle) => {
    switch(lifestyle) {
      case 'young_professional':
        return 'bg-blue-100 text-blue-800';
      case 'family':
        return 'bg-green-100 text-green-800';
      case 'retiree':
        return 'bg-purple-100 text-purple-800';
      case 'student':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <Card 
      hover 
      clickable={!showDetails} 
      className={`h-full flex flex-col ${className}`}
      {...rest}
    >
      <div className="relative">
        <Card.Image 
          src={imageUrl} 
          alt={name} 
          className="h-48 w-full object-cover"
        />
        <div className="absolute top-2 right-2 flex space-x-2">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getLifestyleBadgeColor(lifestyle)}`}>
            {formatLifestyle(lifestyle)}
          </span>
        </div>
      </div>
      
      <Card.Body className="flex-grow">
        <Card.Title>
          {showDetails ? (
            name
          ) : (
            <Link to={`/neighborhoods/${_id}`} className="hover:text-primary-600">
              {name}
            </Link>
          )}
        </Card.Title>
        <Card.Subtitle className="mt-1">
          {city}, {state}
        </Card.Subtitle>
        
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {formatCostOfLiving(costOfLiving)}
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            Safety: {formatSafety(safety)}
          </span>
        </div>
        
        {description && showDetails && (
          <p className="mt-4 text-sm text-gray-600">
            {description.length > 150 ? `${description.substring(0, 150)}...` : description}
          </p>
        )}
        
        {amenities && amenities.length > 0 && showDetails && (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-900">Amenities</h4>
            <div className="mt-2 flex flex-wrap gap-2">
              {amenities.slice(0, 3).map((amenity, index) => (
                <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  {amenity.charAt(0).toUpperCase() + amenity.slice(1).replace('_', ' ')}
                </span>
              ))}
              {amenities.length > 3 && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  +{amenities.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}
      </Card.Body>
      
      {showActions && (
        <Card.Footer className="bg-gray-50">
          <div className="flex justify-between items-center">
            <Link 
              to={`/neighborhoods/${_id}`}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              View Details
            </Link>
            
            {onSave && (
              <button
                type="button"
                onClick={() => onSave(_id)}
                className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                {isSaved ? (
                  <>
                    <svg className="-ml-0.5 mr-1.5 h-4 w-4 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                    Saved
                  </>
                ) : (
                  <>
                    <svg className="-ml-0.5 mr-1.5 h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                    Save
                  </>
                )}
              </button>
            )}
          </div>
        </Card.Footer>
      )}
    </Card>
  );
};

export default NeighborhoodCard;