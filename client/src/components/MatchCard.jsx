import React from 'react';
import { Link } from 'react-router-dom';
import Card from './Card';
import { 
  formatLifestyle, 
  formatCostOfLiving, 
  formatSafety,
  getScoreColor,
  getScoreBarColor 
} from '../utils/helpers';

/**
 * A component for displaying neighborhood match information in a card format
 * 
 * @param {Object} props - Component props
 * @param {Object} props.match - Match data including neighborhood and scores
 * @param {boolean} props.showDetailedScores - Whether to show category scores
 */
const MatchCard = ({ 
  match, 
  showDetailedScores = true,
  className = '',
  ...rest 
}) => {
  if (!match || !match.neighborhood) return null;
  
  const { neighborhood, matchScore, categoryScores = {} } = match;
  
  const {
    _id,
    name,
    city,
    state,
    lifestyle,
    costOfLiving,
    safety,
    images = []
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
      className={`h-full ${className}`}
      {...rest}
    >
      <div className="md:flex">
        <div className="md:flex-shrink-0 h-48 w-full md:w-56">
          <img 
            src={imageUrl} 
            alt={name} 
            className="h-full w-full object-cover"
          />
        </div>
        <div className="p-6 md:flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                <Link to={`/neighborhoods/${_id}`} className="hover:text-primary-600">
                  {name}
                </Link>
              </h3>
              <p className="text-sm text-gray-500">{city}, {state}</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold rounded-full h-16 w-16 flex items-center justify-center bg-gray-50 border-4 border-gray-100">
                <span className={getScoreColor(matchScore)}>{matchScore}%</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Match Score</p>
            </div>
          </div>
          
          {showDetailedScores && categoryScores && (
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {categoryScores.lifestyle !== undefined && (
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-medium text-gray-500">Lifestyle</span>
                    <span className={`text-xs font-medium ${getScoreColor(categoryScores.lifestyle)}`}>
                      {categoryScores.lifestyle}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div 
                      className={`h-1.5 rounded-full ${getScoreBarColor(categoryScores.lifestyle)}`} 
                      style={{ width: `${categoryScores.lifestyle}%` }}
                    ></div>
                  </div>
                </div>
              )}
              
              {categoryScores.budget !== undefined && (
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-medium text-gray-500">Budget</span>
                    <span className={`text-xs font-medium ${getScoreColor(categoryScores.budget)}`}>
                      {categoryScores.budget}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div 
                      className={`h-1.5 rounded-full ${getScoreBarColor(categoryScores.budget)}`} 
                      style={{ width: `${categoryScores.budget}%` }}
                    ></div>
                  </div>
                </div>
              )}
              
              {categoryScores.commute !== undefined && (
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-medium text-gray-500">Commute</span>
                    <span className={`text-xs font-medium ${getScoreColor(categoryScores.commute)}`}>
                      {categoryScores.commute}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div 
                      className={`h-1.5 rounded-full ${getScoreBarColor(categoryScores.commute)}`} 
                      style={{ width: `${categoryScores.commute}%` }}
                    ></div>
                  </div>
                </div>
              )}
              
              {categoryScores.amenities !== undefined && (
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-medium text-gray-500">Amenities</span>
                    <span className={`text-xs font-medium ${getScoreColor(categoryScores.amenities)}`}>
                      {categoryScores.amenities}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div 
                      className={`h-1.5 rounded-full ${getScoreBarColor(categoryScores.amenities)}`} 
                      style={{ width: `${categoryScores.amenities}%` }}
                    ></div>
                  </div>
                </div>
              )}
              
              {categoryScores.safety !== undefined && (
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-medium text-gray-500">Safety</span>
                    <span className={`text-xs font-medium ${getScoreColor(categoryScores.safety)}`}>
                      {categoryScores.safety}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div 
                      className={`h-1.5 rounded-full ${getScoreBarColor(categoryScores.safety)}`} 
                      style={{ width: `${categoryScores.safety}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          )}
          
          <div className="mt-6 flex flex-wrap gap-2">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getLifestyleBadgeColor(lifestyle)}`}>
              {formatLifestyle(lifestyle)}
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              {formatCostOfLiving(costOfLiving)}
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              Safety: {formatSafety(safety)}
            </span>
          </div>
          
          <div className="mt-4">
            <Link 
              to={`/neighborhoods/${_id}`}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MatchCard;