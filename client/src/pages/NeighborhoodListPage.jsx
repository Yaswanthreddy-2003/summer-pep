import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const NeighborhoodListPage = () => {
  const [neighborhoods, setNeighborhoods] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filters, setFilters] = useState({
    city: '',
    state: '',
    lifestyle: '',
    costOfLiving: ''
  })
  
  useEffect(() => {
    const fetchNeighborhoods = async () => {
      try {
        setLoading(true)
        // In a real app, we would use query parameters for filtering
        const response = await axios.get('http://localhost:5000/api/neighborhoods')
        setNeighborhoods(response.data)
        setLoading(false)
      } catch (err) {
        setError('Failed to fetch neighborhoods. Please try again later.')
        setLoading(false)
        console.error('Error fetching neighborhoods:', err)
      }
    }
    
    fetchNeighborhoods()
  }, [])
  
  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  const applyFilters = () => {
    // In a real app, we would make a new API call with filter parameters
    // For now, we'll just simulate filtering on the client side
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }
  
  const resetFilters = () => {
    setFilters({
      city: '',
      state: '',
      lifestyle: '',
      costOfLiving: ''
    })
    // In a real app, we would make a new API call without filter parameters
  }
  
  // For demo purposes, we'll use mock data if the API call isn't working
  const mockNeighborhoods = [
    {
      _id: '1',
      name: 'Downtown',
      city: 'Seattle',
      state: 'WA',
      description: 'Vibrant urban center with excellent public transit, restaurants, and nightlife.',
      lifestyle: 'young_professional',
      costOfLiving: 'high',
      safety: 'medium',
      amenities: ['restaurants', 'shopping', 'nightlife'],
      commuteOptions: ['public_transit', 'walking', 'biking'],
      images: ['https://images.unsplash.com/photo-1575517111839-3a3843ee7f5d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80']
    },
    {
      _id: '2',
      name: 'Queen Anne',
      city: 'Seattle',
      state: 'WA',
      description: 'Charming residential area with beautiful views, parks, and family-friendly amenities.',
      lifestyle: 'family',
      costOfLiving: 'high',
      safety: 'high',
      amenities: ['parks', 'schools', 'restaurants'],
      commuteOptions: ['car', 'public_transit'],
      images: ['https://images.unsplash.com/photo-1571939228382-b2f2b585ce15?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80']
    },
    {
      _id: '3',
      name: 'Capitol Hill',
      city: 'Seattle',
      state: 'WA',
      description: 'Diverse, artistic neighborhood with eclectic shops, restaurants, and nightlife.',
      lifestyle: 'young_professional',
      costOfLiving: 'medium',
      safety: 'medium',
      amenities: ['restaurants', 'nightlife', 'parks'],
      commuteOptions: ['public_transit', 'walking', 'biking'],
      images: ['https://images.unsplash.com/photo-1569012871812-f38ee64cd54c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80']
    },
    {
      _id: '4',
      name: 'Ballard',
      city: 'Seattle',
      state: 'WA',
      description: 'Former fishing village with a mix of old and new, featuring breweries, shops, and the Ballard Locks.',
      lifestyle: 'family',
      costOfLiving: 'medium',
      safety: 'high',
      amenities: ['parks', 'restaurants', 'shopping'],
      commuteOptions: ['car', 'public_transit', 'biking'],
      images: ['https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80']
    },
    {
      _id: '5',
      name: 'Fremont',
      city: 'Seattle',
      state: 'WA',
      description: 'Quirky, artistic neighborhood known as the "Center of the Universe" with public art and a vibrant food scene.',
      lifestyle: 'young_professional',
      costOfLiving: 'medium',
      safety: 'high',
      amenities: ['parks', 'restaurants', 'nightlife'],
      commuteOptions: ['public_transit', 'biking', 'walking'],
      images: ['https://images.unsplash.com/photo-1566737236500-c8ac43014a67?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80']
    },
    {
      _id: '6',
      name: 'University District',
      city: 'Seattle',
      state: 'WA',
      description: 'Lively area surrounding the University of Washington with affordable dining, shopping, and student-oriented amenities.',
      lifestyle: 'student',
      costOfLiving: 'low',
      safety: 'medium',
      amenities: ['restaurants', 'shopping', 'parks'],
      commuteOptions: ['public_transit', 'walking', 'biking'],
      images: ['https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80']
    }
  ]
  
  const displayNeighborhoods = neighborhoods.length > 0 ? neighborhoods : mockNeighborhoods
  
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
  
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Explore Neighborhoods
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Discover neighborhoods that match your lifestyle preferences
          </p>
        </div>
        
        {/* Filters */}
        <div className="mt-8 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Filter Neighborhoods</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
              <select
                id="city"
                name="city"
                value={filters.city}
                onChange={handleFilterChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
              >
                <option value="">All Cities</option>
                <option value="Seattle">Seattle</option>
                <option value="Bellevue">Bellevue</option>
                <option value="Tacoma">Tacoma</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
              <select
                id="state"
                name="state"
                value={filters.state}
                onChange={handleFilterChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
              >
                <option value="">All States</option>
                <option value="WA">Washington</option>
                <option value="OR">Oregon</option>
                <option value="CA">California</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="lifestyle" className="block text-sm font-medium text-gray-700">Lifestyle</label>
              <select
                id="lifestyle"
                name="lifestyle"
                value={filters.lifestyle}
                onChange={handleFilterChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
              >
                <option value="">All Lifestyles</option>
                <option value="family">Family-Friendly</option>
                <option value="young_professional">Young Professional</option>
                <option value="retiree">Retiree-Friendly</option>
                <option value="student">Student-Friendly</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="costOfLiving" className="block text-sm font-medium text-gray-700">Cost of Living</label>
              <select
                id="costOfLiving"
                name="costOfLiving"
                value={filters.costOfLiving}
                onChange={handleFilterChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
              >
                <option value="">All Price Ranges</option>
                <option value="low">Budget-Friendly</option>
                <option value="medium">Mid-Range</option>
                <option value="high">Luxury</option>
              </select>
            </div>
          </div>
          
          <div className="mt-4 flex justify-end space-x-3">
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={applyFilters}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Apply Filters
            </button>
          </div>
        </div>
        
        {/* Neighborhood List */}
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
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {displayNeighborhoods.map((neighborhood) => (
                <div key={neighborhood._id} className="bg-white overflow-hidden shadow-md rounded-lg">
                  <div className="h-48 w-full relative">
                    <img 
                      src={neighborhood.images[0] || 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'} 
                      alt={neighborhood.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          <Link to={`/neighborhoods/${neighborhood._id}`} className="hover:text-primary-600">
                            {neighborhood.name}
                          </Link>
                        </h3>
                        <p className="text-sm text-gray-500">{neighborhood.city}, {neighborhood.state}</p>
                      </div>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${neighborhood.lifestyle === 'family' ? 'bg-green-100 text-green-800' : neighborhood.lifestyle === 'young_professional' ? 'bg-blue-100 text-blue-800' : neighborhood.lifestyle === 'student' ? 'bg-yellow-100 text-yellow-800' : 'bg-purple-100 text-purple-800'}`}>
                        {getLifestyleLabel(neighborhood.lifestyle)}
                      </span>
                    </div>
                    
                    <p className="mt-3 text-base text-gray-500 line-clamp-3">
                      {neighborhood.description}
                    </p>
                    
                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {getCostOfLivingLabel(neighborhood.costOfLiving)}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        Safety: {getSafetyLabel(neighborhood.safety)}
                      </span>
                      {neighborhood.amenities.slice(0, 2).map((amenity, index) => (
                        <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {amenity.charAt(0).toUpperCase() + amenity.slice(1)}
                        </span>
                      ))}
                      {neighborhood.amenities.length > 2 && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          +{neighborhood.amenities.length - 2} more
                        </span>
                      )}
                    </div>
                    
                    <div className="mt-6">
                      <Link 
                        to={`/neighborhoods/${neighborhood._id}`}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default NeighborhoodListPage