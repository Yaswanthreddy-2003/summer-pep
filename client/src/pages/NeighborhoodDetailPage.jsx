import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'

const NeighborhoodDetailPage = () => {
  const { id } = useParams()
  const [neighborhood, setNeighborhood] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('overview')
  
  useEffect(() => {
    const fetchNeighborhood = async () => {
      try {
        setLoading(true)
        // In a real app, we would fetch from the API
        const response = await axios.get(`http://localhost:5000/api/neighborhoods/${id}`)
        setNeighborhood(response.data)
        setLoading(false)
      } catch (err) {
        setError('Failed to fetch neighborhood details. Please try again later.')
        setLoading(false)
        console.error('Error fetching neighborhood:', err)
        // For demo purposes, we'll use mock data if the API call fails
        setNeighborhood(getMockNeighborhood(id))
      }
    }
    
    fetchNeighborhood()
  }, [id])
  
  const getMockNeighborhood = (id) => {
    const mockNeighborhoods = {
      '1': {
        _id: '1',
        name: 'Downtown',
        city: 'Seattle',
        state: 'WA',
        description: 'Downtown Seattle is the central business district of Seattle, Washington, United States. It is the center of many of the city\'s financial and commercial activities, as well as home to many of the city\'s most recognizable landmarks. The area features a mix of office buildings, residential towers, shopping centers, and cultural institutions.',
        lifestyle: 'young_professional',
        costOfLiving: 'high',
        safety: 'medium',
        amenities: ['restaurants', 'shopping', 'nightlife', 'parks', 'public_transit'],
        commuteOptions: ['public_transit', 'walking', 'biking'],
        images: [
          'https://images.unsplash.com/photo-1575517111839-3a3843ee7f5d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
          'https://images.unsplash.com/photo-1534430480872-3498386e7856?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
          'https://images.unsplash.com/photo-1531335773500-23410bebddf1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
        ],
        highlights: [
          'Vibrant urban center with excellent public transit',
          'Abundant dining, shopping, and entertainment options',
          'Close to major employers and business centers',
          'Walking distance to Pike Place Market and waterfront',
          'Access to cultural venues like theaters and museums'
        ],
        housingOptions: [
          { type: 'Apartment', averagePrice: '$2,500/month', description: 'Modern high-rise apartments with city views' },
          { type: 'Condo', averagePrice: '$650,000', description: 'Luxury condos with amenities like gyms and rooftop terraces' },
          { type: 'Loft', averagePrice: '$3,000/month', description: 'Converted industrial spaces with open floor plans' }
        ],
        reviews: [
          { author: 'Alex M.', rating: 4, comment: 'Great location for young professionals. Everything is within walking distance, but it can be noisy at night.' },
          { author: 'Jamie L.', rating: 5, comment: 'I love living downtown! So many restaurants and things to do. Public transit makes it easy to get anywhere in the city.' },
          { author: 'Taylor S.', rating: 3, comment: 'Convenient location but expensive. Safety can be a concern in some areas, especially at night.' }
        ]
      },
      '2': {
        _id: '2',
        name: 'Queen Anne',
        city: 'Seattle',
        state: 'WA',
        description: 'Queen Anne is a charming residential neighborhood in Seattle, Washington, known for its beautiful historic homes, stunning views of the city skyline and Elliott Bay, and family-friendly atmosphere. The neighborhood is divided into North Queen Anne, West Queen Anne, East Queen Anne, and Lower Queen Anne (also known as Uptown). The area features tree-lined streets, local shops, and numerous parks.',
        lifestyle: 'family',
        costOfLiving: 'high',
        safety: 'high',
        amenities: ['parks', 'schools', 'restaurants', 'shopping', 'views'],
        commuteOptions: ['car', 'public_transit', 'biking'],
        images: [
          'https://images.unsplash.com/photo-1571939228382-b2f2b585ce15?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
          'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
          'https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
        ],
        highlights: [
          'Beautiful views of the Seattle skyline and Elliott Bay',
          'Historic homes and tree-lined streets',
          'Excellent schools and family-friendly parks',
          'Close to Seattle Center and Space Needle',
          'Strong sense of community with local events'
        ],
        housingOptions: [
          { type: 'Single-Family Home', averagePrice: '$1,200,000', description: 'Historic Craftsman and Victorian homes with character' },
          { type: 'Townhouse', averagePrice: '$850,000', description: 'Modern townhomes with multiple levels and small yards' },
          { type: 'Apartment', averagePrice: '$2,200/month', description: 'Mix of older buildings and newer luxury apartments' }
        ],
        reviews: [
          { author: 'Sarah J.', rating: 5, comment: 'Perfect neighborhood for families. Great schools, safe streets, and plenty of parks for the kids.' },
          { author: 'Michael P.', rating: 4, comment: 'Beautiful area with amazing views. A bit pricey but worth it for the quality of life.' },
          { author: 'Rebecca T.', rating: 5, comment: 'We love Queen Anne! The community feel is strong, and it\'s close enough to downtown while still feeling residential.' }
        ]
      },
      '3': {
        _id: '3',
        name: 'Capitol Hill',
        city: 'Seattle',
        state: 'WA',
        description: 'Capitol Hill is one of Seattle\'s most vibrant and diverse neighborhoods, known for its eclectic mix of restaurants, bars, shops, and cultural venues. The area has a rich history as a center for arts, music, and LGBTQ+ culture. With its mix of historic mansions, vintage apartment buildings, and modern developments, Capitol Hill offers a unique urban living experience with excellent walkability and public transit options.',
        lifestyle: 'young_professional',
        costOfLiving: 'medium',
        safety: 'medium',
        amenities: ['restaurants', 'nightlife', 'parks', 'arts', 'public_transit'],
        commuteOptions: ['public_transit', 'walking', 'biking'],
        images: [
          'https://images.unsplash.com/photo-1569012871812-f38ee64cd54c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
          'https://images.unsplash.com/photo-1566041510639-8d95a2490bfb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2013&q=80',
          'https://images.unsplash.com/photo-1594741158704-5a784b8e59fb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
        ],
        highlights: [
          'Diverse, artistic neighborhood with eclectic shops and restaurants',
          'Vibrant nightlife and music scene',
          'Beautiful Volunteer Park with conservatory and water tower',
          'Historic mansions and architectural diversity',
          'Strong LGBTQ+ community and cultural heritage'
        ],
        housingOptions: [
          { type: 'Apartment', averagePrice: '$1,800/month', description: 'Mix of vintage buildings and modern complexes' },
          { type: 'Condo', averagePrice: '$550,000', description: 'Converted historic buildings and new developments' },
          { type: 'Shared Housing', averagePrice: '$1,000/month', description: 'Rooms in shared houses popular with students and young adults' }
        ],
        reviews: [
          { author: 'Jordan K.', rating: 5, comment: 'Best neighborhood in Seattle for food, culture, and nightlife. Never a dull moment!' },
          { author: 'Casey R.', rating: 4, comment: 'Love the diversity and energy of Capitol Hill. Great restaurants and easy to get downtown.' },
          { author: 'Morgan L.', rating: 3, comment: 'Fun area but can be noisy on weekends. Parking is a nightmare if you have a car.' }
        ]
      }
    }
    
    return mockNeighborhoods[id] || null
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
  
  const getAmenityIcon = (amenity) => {
    const icons = {
      'restaurants': (
        <svg className="h-5 w-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      'shopping': (
        <svg className="h-5 w-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
      'nightlife': (
        <svg className="h-5 w-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      'parks': (
        <svg className="h-5 w-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      'schools': (
        <svg className="h-5 w-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M12 14l9-5-9-5-9 5 9 5z" />
          <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
        </svg>
      ),
      'public_transit': (
        <svg className="h-5 w-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ),
      'healthcare': (
        <svg className="h-5 w-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      'views': (
        <svg className="h-5 w-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
      'arts': (
        <svg className="h-5 w-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    }
    
    return icons[amenity] || (
      <svg className="h-5 w-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    )
  }
  
  const getCommuteIcon = (option) => {
    const icons = {
      'public_transit': (
        <svg className="h-5 w-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ),
      'car': (
        <svg className="h-5 w-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
        </svg>
      ),
      'walking': (
        <svg className="h-5 w-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7a4 4 0 11-8 0 4 4 0 018 0zM9 14a6 6 0 00-6 6v1h12v-1a6 6 0 00-6-6zM21 12h-6" />
        </svg>
      ),
      'biking': (
        <svg className="h-5 w-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    }
    
    return icons[option] || (
      <svg className="h-5 w-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    )
  }
  
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    )
  }
  
  if (error && !neighborhood) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
              <p className="mt-2 text-sm text-red-700">
                <Link to="/neighborhoods" className="font-medium underline text-red-700 hover:text-red-600">
                  Return to neighborhood list
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  if (!neighborhood) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">Neighborhood not found.</p>
              <p className="mt-2 text-sm text-yellow-700">
                <Link to="/neighborhoods" className="font-medium underline text-yellow-700 hover:text-yellow-600">
                  Return to neighborhood list
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="bg-white">
      {/* Hero Section with Image Carousel */}
      <div className="relative h-96 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={neighborhood.images[0]} 
            alt={neighborhood.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-end pb-12">
          <div className="text-white">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              {neighborhood.name}
            </h1>
            <p className="mt-2 text-xl">
              {neighborhood.city}, {neighborhood.state}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium ${neighborhood.lifestyle === 'family' ? 'bg-green-100 text-green-800' : neighborhood.lifestyle === 'young_professional' ? 'bg-blue-100 text-blue-800' : neighborhood.lifestyle === 'student' ? 'bg-yellow-100 text-yellow-800' : 'bg-purple-100 text-purple-800'}`}>
                {getLifestyleLabel(neighborhood.lifestyle)}
              </span>
              <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                {getCostOfLivingLabel(neighborhood.costOfLiving)}
              </span>
              <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                Safety: {getSafetyLabel(neighborhood.safety)}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`${activeTab === 'overview' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('amenities')}
              className={`${activeTab === 'amenities' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Amenities & Transportation
            </button>
            <button
              onClick={() => setActiveTab('housing')}
              className={`${activeTab === 'housing' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Housing Options
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`${activeTab === 'reviews' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Reviews
            </button>
          </nav>
        </div>
        
        {/* Tab Content */}
        <div className="mt-8">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div>
              <div className="prose max-w-none">
                <h2 className="text-2xl font-bold text-gray-900">About {neighborhood.name}</h2>
                <p className="text-gray-700">{neighborhood.description}</p>
              </div>
              
              <div className="mt-10">
                <h3 className="text-xl font-bold text-gray-900">Neighborhood Highlights</h3>
                <ul className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {neighborhood.highlights?.map((highlight, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="h-5 w-5 text-primary-500 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-10">
                <h3 className="text-xl font-bold text-gray-900">Location & Map</h3>
                <div className="mt-4 aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg overflow-hidden">
                  {/* In a real app, we would embed a map here */}
                  <div className="flex items-center justify-center h-full">
                    <p className="text-gray-500">Map of {neighborhood.name} would be displayed here</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Amenities Tab */}
          {activeTab === 'amenities' && (
            <div>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Amenities</h3>
                  <ul className="mt-4 space-y-4">
                    {neighborhood.amenities.map((amenity, index) => (
                      <li key={index} className="flex items-start">
                        <div className="flex-shrink-0">
                          {getAmenityIcon(amenity)}
                        </div>
                        <span className="ml-3 text-gray-700">
                          {amenity.charAt(0).toUpperCase() + amenity.slice(1).replace('_', ' ')}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Transportation Options</h3>
                  <ul className="mt-4 space-y-4">
                    {neighborhood.commuteOptions.map((option, index) => (
                      <li key={index} className="flex items-start">
                        <div className="flex-shrink-0">
                          {getCommuteIcon(option)}
                        </div>
                        <span className="ml-3 text-gray-700">
                          {option.charAt(0).toUpperCase() + option.slice(1).replace('_', ' ')}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="mt-10">
                <h3 className="text-xl font-bold text-gray-900">Nearby Attractions</h3>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {/* In a real app, we would fetch and display nearby attractions */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-medium text-gray-900">Local Parks</h4>
                    <p className="mt-2 text-sm text-gray-500">Information about nearby parks would be displayed here.</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-medium text-gray-900">Dining Options</h4>
                    <p className="mt-2 text-sm text-gray-500">Information about local restaurants would be displayed here.</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-medium text-gray-900">Shopping</h4>
                    <p className="mt-2 text-sm text-gray-500">Information about shopping options would be displayed here.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Housing Tab */}
          {activeTab === 'housing' && (
            <div>
              <h3 className="text-xl font-bold text-gray-900">Housing Options in {neighborhood.name}</h3>
              <p className="mt-2 text-gray-700">Explore the different types of housing available in this neighborhood.</p>
              
              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {neighborhood.housingOptions?.map((option, index) => (
                  <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="p-6">
                      <h4 className="text-lg font-bold text-gray-900">{option.type}</h4>
                      <p className="mt-1 text-primary-600 font-medium">{option.averagePrice}</p>
                      <p className="mt-3 text-gray-700">{option.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-10">
                <h3 className="text-xl font-bold text-gray-900">Housing Market Trends</h3>
                <div className="mt-4 bg-gray-50 rounded-lg p-6">
                  <p className="text-gray-700">In a real application, we would display housing market trends, price history, and other relevant data for this neighborhood.</p>
                </div>
              </div>
            </div>
          )}
          
          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">Resident Reviews</h3>
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                  Write a Review
                </button>
              </div>
              
              <div className="mt-6 space-y-6">
                {neighborhood.reviews?.map((review, index) => (
                  <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                          <span className="text-primary-800 font-medium">{review.author.charAt(0)}</span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-sm font-medium text-gray-900">{review.author}</h4>
                        <div className="mt-1 flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <svg 
                              key={i} 
                              className={`h-5 w-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                              xmlns="http://www.w3.org/2000/svg" 
                              viewBox="0 0 20 20" 
                              fill="currentColor"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-primary-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Is {neighborhood.name} right for you?
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-primary-100">
            See how well this neighborhood matches your lifestyle preferences.
          </p>
          <div className="mt-8 flex justify-center">
            <Link 
              to="/preferences" 
              className="inline-block bg-white py-3 px-8 rounded-md font-medium text-primary-600 hover:bg-primary-50"
            >
              Take the Quiz
            </Link>
            <Link 
              to={`/matches?neighborhood=${neighborhood._id}`} 
              className="ml-4 inline-block bg-primary-500 py-3 px-8 rounded-md font-medium text-white hover:bg-primary-400"
            >
              View Match Score
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NeighborhoodDetailPage