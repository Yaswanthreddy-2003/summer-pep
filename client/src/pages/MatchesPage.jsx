import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'

const MatchesPage = () => {
  const location = useLocation()
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  // Get preferences from location state (passed from PreferencesPage)
  // or use default preferences if none were passed
  const [preferences] = useState(
    location.state?.preferences || {
      budget: 'medium',
      commute: 'public_transit',
      amenities: ['parks', 'restaurants'],
      safety: 'medium',
      lifestyle: 'young_professional'
    }
  )
  
  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setLoading(true)
        // In a real app, we would call the API with the user's preferences
        // const response = await axios.post('http://localhost:5000/api/matching/preview', preferences)
        // setMatches(response.data)
        
        // For demo purposes, we'll use mock data
        setTimeout(() => {
          setMatches(getMockMatches())
          setLoading(false)
        }, 1000)
      } catch (err) {
        setError('Failed to fetch matches. Please try again later.')
        setLoading(false)
        console.error('Error fetching matches:', err)
      }
    }
    
    fetchMatches()
  }, [preferences])
  
  const getMockMatches = () => {
    return [
      {
        neighborhood: {
          _id: '1',
          name: 'Downtown',
          city: 'Seattle',
          state: 'WA',
          lifestyle: 'young_professional',
          costOfLiving: 'high',
          safety: 'medium',
          amenities: ['restaurants', 'shopping', 'nightlife', 'public_transit'],
          commuteOptions: ['public_transit', 'walking', 'biking'],
          images: ['https://images.unsplash.com/photo-1575517111839-3a3843ee7f5d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80']
        },
        matchScore: 87,
        categoryScores: {
          lifestyle: 95,
          budget: 70,
          commute: 100,
          amenities: 90,
          safety: 80
        }
      },
      {
        neighborhood: {
          _id: '3',
          name: 'Capitol Hill',
          city: 'Seattle',
          state: 'WA',
          lifestyle: 'young_professional',
          costOfLiving: 'medium',
          safety: 'medium',
          amenities: ['restaurants', 'nightlife', 'parks', 'public_transit'],
          commuteOptions: ['public_transit', 'walking', 'biking'],
          images: ['https://images.unsplash.com/photo-1569012871812-f38ee64cd54c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80']
        },
        matchScore: 85,
        categoryScores: {
          lifestyle: 90,
          budget: 85,
          commute: 90,
          amenities: 85,
          safety: 75
        }
      },
      {
        neighborhood: {
          _id: '5',
          name: 'Fremont',
          city: 'Seattle',
          state: 'WA',
          lifestyle: 'young_professional',
          costOfLiving: 'medium',
          safety: 'high',
          amenities: ['parks', 'restaurants', 'nightlife', 'public_transit'],
          commuteOptions: ['public_transit', 'biking', 'walking'],
          images: ['https://images.unsplash.com/photo-1566737236500-c8ac43014a67?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80']
        },
        matchScore: 82,
        categoryScores: {
          lifestyle: 85,
          budget: 80,
          commute: 85,
          amenities: 80,
          safety: 90
        }
      },
      {
        neighborhood: {
          _id: '2',
          name: 'Queen Anne',
          city: 'Seattle',
          state: 'WA',
          lifestyle: 'family',
          costOfLiving: 'high',
          safety: 'high',
          amenities: ['parks', 'schools', 'restaurants'],
          commuteOptions: ['car', 'public_transit'],
          images: ['https://images.unsplash.com/photo-1571939228382-b2f2b585ce15?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80']
        },
        matchScore: 75,
        categoryScores: {
          lifestyle: 65,
          budget: 70,
          commute: 75,
          amenities: 80,
          safety: 95
        }
      },
      {
        neighborhood: {
          _id: '4',
          name: 'Ballard',
          city: 'Seattle',
          state: 'WA',
          lifestyle: 'family',
          costOfLiving: 'medium',
          safety: 'high',
          amenities: ['parks', 'restaurants', 'shopping'],
          commuteOptions: ['car', 'public_transit', 'biking'],
          images: ['https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80']
        },
        matchScore: 72,
        categoryScores: {
          lifestyle: 60,
          budget: 85,
          commute: 70,
          amenities: 75,
          safety: 90
        }
      },
      {
        neighborhood: {
          _id: '6',
          name: 'University District',
          city: 'Seattle',
          state: 'WA',
          lifestyle: 'student',
          costOfLiving: 'low',
          safety: 'medium',
          amenities: ['restaurants', 'shopping', 'parks'],
          commuteOptions: ['public_transit', 'walking', 'biking'],
          images: ['https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80']
        },
        matchScore: 68,
        categoryScores: {
          lifestyle: 60,
          budget: 90,
          commute: 80,
          amenities: 65,
          safety: 65
        }
      }
    ]
  }
  
  const getLifestyleLabel = (lifestyle) => {
    const labels = {
      'young_professional': 'Young Professional',
      'family': 'Family-Friendly',
      'retiree': 'Retiree-Friendly',
      'student': 'Student-Friendly'
    }
    return labels[lifestyle] || lifestyle
  }
  
  const getCostOfLivingLabel = (cost) => {
    const labels = {
      'low': 'Budget-Friendly',
      'medium': 'Mid-Range',
      'high': 'Luxury'
    }
    return labels[cost] || cost
  }
  
  const getSafetyLabel = (safety) => {
    const labels = {
      'low': 'Moderate',
      'medium': 'Good',
      'high': 'Excellent'
    }
    return labels[safety] || safety
  }
  
  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 80) return 'text-green-500'
    if (score >= 70) return 'text-yellow-500'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-500'
  }
  
  const getScoreBarColor = (score) => {
    if (score >= 90) return 'bg-green-600'
    if (score >= 80) return 'bg-green-500'
    if (score >= 70) return 'bg-yellow-500'
    if (score >= 60) return 'bg-yellow-600'
    return 'bg-red-500'
  }
  
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Your Neighborhood Matches
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Based on your lifestyle preferences, here are the neighborhoods that match you best
          </p>
        </div>
        
        {/* Preferences Summary */}
        <div className="mt-8 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Your Preferences</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Lifestyle</h3>
              <p className="mt-1 text-base font-medium text-gray-900">{getLifestyleLabel(preferences.lifestyle)}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Budget</h3>
              <p className="mt-1 text-base font-medium text-gray-900">{getCostOfLivingLabel(preferences.budget)}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Commute</h3>
              <p className="mt-1 text-base font-medium text-gray-900">
                {preferences.commute.charAt(0).toUpperCase() + preferences.commute.slice(1).replace('_', ' ')}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Safety</h3>
              <p className="mt-1 text-base font-medium text-gray-900">{getSafetyLabel(preferences.safety)}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Amenities</h3>
              <p className="mt-1 text-base font-medium text-gray-900">
                {preferences.amenities.length > 0 
                  ? preferences.amenities.map(a => a.charAt(0).toUpperCase() + a.slice(1)).join(', ')
                  : 'No specific preferences'}
              </p>
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <Link 
              to="/preferences" 
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Update Preferences
            </Link>
          </div>
        </div>
        
        {/* Matches List */}
        <div className="mt-8">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mt-8">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {matches.map((match) => (
                <div key={match.neighborhood._id} className="bg-white shadow-md rounded-lg overflow-hidden">
                  <div className="md:flex">
                    <div className="md:flex-shrink-0 h-48 w-full md:w-56">
                      <img 
                        src={match.neighborhood.images[0]} 
                        alt={match.neighborhood.name} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="p-6 md:flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">
                            <Link to={`/neighborhoods/${match.neighborhood._id}`} className="hover:text-primary-600">
                              {match.neighborhood.name}
                            </Link>
                          </h3>
                          <p className="text-sm text-gray-500">{match.neighborhood.city}, {match.neighborhood.state}</p>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold rounded-full h-16 w-16 flex items-center justify-center bg-gray-50 border-4 border-gray-100">
                            <span className={getScoreColor(match.matchScore)}>{match.matchScore}%</span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">Match Score</p>
                        </div>
                      </div>
                      
                      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs font-medium text-gray-500">Lifestyle</span>
                            <span className={`text-xs font-medium ${getScoreColor(match.categoryScores.lifestyle)}`}>
                              {match.categoryScores.lifestyle}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div 
                              className={`h-1.5 rounded-full ${getScoreBarColor(match.categoryScores.lifestyle)}`} 
                              style={{ width: `${match.categoryScores.lifestyle}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs font-medium text-gray-500">Budget</span>
                            <span className={`text-xs font-medium ${getScoreColor(match.categoryScores.budget)}`}>
                              {match.categoryScores.budget}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div 
                              className={`h-1.5 rounded-full ${getScoreBarColor(match.categoryScores.budget)}`} 
                              style={{ width: `${match.categoryScores.budget}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs font-medium text-gray-500">Commute</span>
                            <span className={`text-xs font-medium ${getScoreColor(match.categoryScores.commute)}`}>
                              {match.categoryScores.commute}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div 
                              className={`h-1.5 rounded-full ${getScoreBarColor(match.categoryScores.commute)}`} 
                              style={{ width: `${match.categoryScores.commute}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs font-medium text-gray-500">Amenities</span>
                            <span className={`text-xs font-medium ${getScoreColor(match.categoryScores.amenities)}`}>
                              {match.categoryScores.amenities}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div 
                              className={`h-1.5 rounded-full ${getScoreBarColor(match.categoryScores.amenities)}`} 
                              style={{ width: `${match.categoryScores.amenities}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs font-medium text-gray-500">Safety</span>
                            <span className={`text-xs font-medium ${getScoreColor(match.categoryScores.safety)}`}>
                              {match.categoryScores.safety}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div 
                              className={`h-1.5 rounded-full ${getScoreBarColor(match.categoryScores.safety)}`} 
                              style={{ width: `${match.categoryScores.safety}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6 flex flex-wrap gap-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${match.neighborhood.lifestyle === 'family' ? 'bg-green-100 text-green-800' : match.neighborhood.lifestyle === 'young_professional' ? 'bg-blue-100 text-blue-800' : match.neighborhood.lifestyle === 'student' ? 'bg-yellow-100 text-yellow-800' : 'bg-purple-100 text-purple-800'}`}>
                          {getLifestyleLabel(match.neighborhood.lifestyle)}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {getCostOfLivingLabel(match.neighborhood.costOfLiving)}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          Safety: {getSafetyLabel(match.neighborhood.safety)}
                        </span>
                      </div>
                      
                      <div className="mt-4">
                        <Link 
                          to={`/neighborhoods/${match.neighborhood._id}`}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* No Matches Message */}
        {!loading && !error && matches.length === 0 && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">No matches found for your preferences.</p>
                <p className="mt-2 text-sm text-yellow-700">
                  <Link to="/preferences" className="font-medium underline text-yellow-700 hover:text-yellow-600">
                    Try adjusting your preferences
                  </Link>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MatchesPage