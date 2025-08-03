import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const PreferencesPage = () => {
  const navigate = useNavigate()
  
  const [preferences, setPreferences] = useState({
    budget: 'medium',
    commute: 'public_transit',
    amenities: [],
    safety: 'medium',
    lifestyle: 'family'
  })
  
  const [step, setStep] = useState(1)
  const totalSteps = 5
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setPreferences(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target
    setPreferences(prev => {
      if (checked) {
        return {
          ...prev,
          amenities: [...prev.amenities, value]
        }
      } else {
        return {
          ...prev,
          amenities: prev.amenities.filter(item => item !== value)
        }
      }
    })
  }
  
  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    }
  }
  
  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, we would save the preferences to the user's profile
    // For now, we'll just navigate to the matches page with the preferences as state
    navigate('/matches', { state: { preferences } })
  }
  
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-primary-600 py-6 px-6">
            <h2 className="text-2xl font-bold text-white">Your Lifestyle Preferences</h2>
            <p className="mt-1 text-primary-100">
              Help us understand what you're looking for in a neighborhood
            </p>
            
            {/* Progress Bar */}
            <div className="mt-4">
              <div className="w-full bg-primary-300 rounded-full h-2.5">
                <div 
                  className="bg-white h-2.5 rounded-full transition-all duration-300" 
                  style={{ width: `${(step / totalSteps) * 100}%` }}
                ></div>
              </div>
              <p className="text-right text-primary-100 text-sm mt-1">
                Step {step} of {totalSteps}
              </p>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="py-8 px-6">
            {/* Step 1: Lifestyle */}
            {step === 1 && (
              <div className="space-y-6">
                <h3 className="text-xl font-medium text-gray-900">What lifestyle are you looking for?</h3>
                <p className="text-gray-500">This helps us find neighborhoods that match your living preferences.</p>
                
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <label className="relative bg-white rounded-lg border border-gray-200 p-4 flex cursor-pointer hover:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500">
                    <input 
                      type="radio" 
                      name="lifestyle" 
                      value="family" 
                      className="sr-only" 
                      checked={preferences.lifestyle === 'family'}
                      onChange={handleChange}
                    />
                    <div className="flex-1 flex flex-col">
                      <span className="block text-sm font-medium text-gray-900">Family-Friendly</span>
                      <span className="mt-1 flex items-center text-sm text-gray-500">Safe, quiet, good schools</span>
                      <span className={`absolute inset-0 rounded-lg pointer-events-none ${preferences.lifestyle === 'family' ? 'border-2 border-primary-500' : 'border border-transparent'}`} aria-hidden="true"></span>
                    </div>
                  </label>
                  
                  <label className="relative bg-white rounded-lg border border-gray-200 p-4 flex cursor-pointer hover:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500">
                    <input 
                      type="radio" 
                      name="lifestyle" 
                      value="young_professional" 
                      className="sr-only" 
                      checked={preferences.lifestyle === 'young_professional'}
                      onChange={handleChange}
                    />
                    <div className="flex-1 flex flex-col">
                      <span className="block text-sm font-medium text-gray-900">Young Professional</span>
                      <span className="mt-1 flex items-center text-sm text-gray-500">Trendy, active, convenient</span>
                      <span className={`absolute inset-0 rounded-lg pointer-events-none ${preferences.lifestyle === 'young_professional' ? 'border-2 border-primary-500' : 'border border-transparent'}`} aria-hidden="true"></span>
                    </div>
                  </label>
                  
                  <label className="relative bg-white rounded-lg border border-gray-200 p-4 flex cursor-pointer hover:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500">
                    <input 
                      type="radio" 
                      name="lifestyle" 
                      value="retiree" 
                      className="sr-only" 
                      checked={preferences.lifestyle === 'retiree'}
                      onChange={handleChange}
                    />
                    <div className="flex-1 flex flex-col">
                      <span className="block text-sm font-medium text-gray-900">Retiree</span>
                      <span className="mt-1 flex items-center text-sm text-gray-500">Peaceful, accessible, community</span>
                      <span className={`absolute inset-0 rounded-lg pointer-events-none ${preferences.lifestyle === 'retiree' ? 'border-2 border-primary-500' : 'border border-transparent'}`} aria-hidden="true"></span>
                    </div>
                  </label>
                  
                  <label className="relative bg-white rounded-lg border border-gray-200 p-4 flex cursor-pointer hover:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500">
                    <input 
                      type="radio" 
                      name="lifestyle" 
                      value="student" 
                      className="sr-only" 
                      checked={preferences.lifestyle === 'student'}
                      onChange={handleChange}
                    />
                    <div className="flex-1 flex flex-col">
                      <span className="block text-sm font-medium text-gray-900">Student</span>
                      <span className="mt-1 flex items-center text-sm text-gray-500">Affordable, social, near campus</span>
                      <span className={`absolute inset-0 rounded-lg pointer-events-none ${preferences.lifestyle === 'student' ? 'border-2 border-primary-500' : 'border border-transparent'}`} aria-hidden="true"></span>
                    </div>
                  </label>
                </div>
              </div>
            )}
            
            {/* Step 2: Budget */}
            {step === 2 && (
              <div className="space-y-6">
                <h3 className="text-xl font-medium text-gray-900">What's your budget range?</h3>
                <p className="text-gray-500">This helps us find neighborhoods within your price range.</p>
                
                <div className="space-y-4">
                  <label className="relative bg-white rounded-lg border border-gray-200 p-4 flex cursor-pointer hover:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500">
                    <input 
                      type="radio" 
                      name="budget" 
                      value="low" 
                      className="sr-only" 
                      checked={preferences.budget === 'low'}
                      onChange={handleChange}
                    />
                    <div className="flex-1 flex flex-col">
                      <span className="block text-sm font-medium text-gray-900">Budget-Friendly</span>
                      <span className="mt-1 flex items-center text-sm text-gray-500">Lower cost of living areas</span>
                      <span className={`absolute inset-0 rounded-lg pointer-events-none ${preferences.budget === 'low' ? 'border-2 border-primary-500' : 'border border-transparent'}`} aria-hidden="true"></span>
                    </div>
                  </label>
                  
                  <label className="relative bg-white rounded-lg border border-gray-200 p-4 flex cursor-pointer hover:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500">
                    <input 
                      type="radio" 
                      name="budget" 
                      value="medium" 
                      className="sr-only" 
                      checked={preferences.budget === 'medium'}
                      onChange={handleChange}
                    />
                    <div className="flex-1 flex flex-col">
                      <span className="block text-sm font-medium text-gray-900">Mid-Range</span>
                      <span className="mt-1 flex items-center text-sm text-gray-500">Average cost of living areas</span>
                      <span className={`absolute inset-0 rounded-lg pointer-events-none ${preferences.budget === 'medium' ? 'border-2 border-primary-500' : 'border border-transparent'}`} aria-hidden="true"></span>
                    </div>
                  </label>
                  
                  <label className="relative bg-white rounded-lg border border-gray-200 p-4 flex cursor-pointer hover:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500">
                    <input 
                      type="radio" 
                      name="budget" 
                      value="high" 
                      className="sr-only" 
                      checked={preferences.budget === 'high'}
                      onChange={handleChange}
                    />
                    <div className="flex-1 flex flex-col">
                      <span className="block text-sm font-medium text-gray-900">Luxury</span>
                      <span className="mt-1 flex items-center text-sm text-gray-500">Premium neighborhoods with high-end amenities</span>
                      <span className={`absolute inset-0 rounded-lg pointer-events-none ${preferences.budget === 'high' ? 'border-2 border-primary-500' : 'border border-transparent'}`} aria-hidden="true"></span>
                    </div>
                  </label>
                </div>
              </div>
            )}
            
            {/* Step 3: Commute */}
            {step === 3 && (
              <div className="space-y-6">
                <h3 className="text-xl font-medium text-gray-900">How do you prefer to commute?</h3>
                <p className="text-gray-500">This helps us find neighborhoods with your preferred transportation options.</p>
                
                <div className="space-y-4">
                  <label className="relative bg-white rounded-lg border border-gray-200 p-4 flex cursor-pointer hover:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500">
                    <input 
                      type="radio" 
                      name="commute" 
                      value="public_transit" 
                      className="sr-only" 
                      checked={preferences.commute === 'public_transit'}
                      onChange={handleChange}
                    />
                    <div className="flex-1 flex flex-col">
                      <span className="block text-sm font-medium text-gray-900">Public Transit</span>
                      <span className="mt-1 flex items-center text-sm text-gray-500">Bus, subway, train accessibility</span>
                      <span className={`absolute inset-0 rounded-lg pointer-events-none ${preferences.commute === 'public_transit' ? 'border-2 border-primary-500' : 'border border-transparent'}`} aria-hidden="true"></span>
                    </div>
                  </label>
                  
                  <label className="relative bg-white rounded-lg border border-gray-200 p-4 flex cursor-pointer hover:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500">
                    <input 
                      type="radio" 
                      name="commute" 
                      value="car" 
                      className="sr-only" 
                      checked={preferences.commute === 'car'}
                      onChange={handleChange}
                    />
                    <div className="flex-1 flex flex-col">
                      <span className="block text-sm font-medium text-gray-900">Car</span>
                      <span className="mt-1 flex items-center text-sm text-gray-500">Good parking, highway access</span>
                      <span className={`absolute inset-0 rounded-lg pointer-events-none ${preferences.commute === 'car' ? 'border-2 border-primary-500' : 'border border-transparent'}`} aria-hidden="true"></span>
                    </div>
                  </label>
                  
                  <label className="relative bg-white rounded-lg border border-gray-200 p-4 flex cursor-pointer hover:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500">
                    <input 
                      type="radio" 
                      name="commute" 
                      value="walking" 
                      className="sr-only" 
                      checked={preferences.commute === 'walking'}
                      onChange={handleChange}
                    />
                    <div className="flex-1 flex flex-col">
                      <span className="block text-sm font-medium text-gray-900">Walking</span>
                      <span className="mt-1 flex items-center text-sm text-gray-500">Walkable neighborhoods with good sidewalks</span>
                      <span className={`absolute inset-0 rounded-lg pointer-events-none ${preferences.commute === 'walking' ? 'border-2 border-primary-500' : 'border border-transparent'}`} aria-hidden="true"></span>
                    </div>
                  </label>
                  
                  <label className="relative bg-white rounded-lg border border-gray-200 p-4 flex cursor-pointer hover:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500">
                    <input 
                      type="radio" 
                      name="commute" 
                      value="biking" 
                      className="sr-only" 
                      checked={preferences.commute === 'biking'}
                      onChange={handleChange}
                    />
                    <div className="flex-1 flex flex-col">
                      <span className="block text-sm font-medium text-gray-900">Biking</span>
                      <span className="mt-1 flex items-center text-sm text-gray-500">Bike lanes, bike-friendly roads</span>
                      <span className={`absolute inset-0 rounded-lg pointer-events-none ${preferences.commute === 'biking' ? 'border-2 border-primary-500' : 'border border-transparent'}`} aria-hidden="true"></span>
                    </div>
                  </label>
                </div>
              </div>
            )}
            
            {/* Step 4: Amenities */}
            {step === 4 && (
              <div className="space-y-6">
                <h3 className="text-xl font-medium text-gray-900">What amenities are important to you?</h3>
                <p className="text-gray-500">Select all that apply.</p>
                
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <label className="relative bg-white rounded-lg border border-gray-200 p-4 flex cursor-pointer hover:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500">
                    <input 
                      type="checkbox" 
                      name="amenities" 
                      value="parks" 
                      className="h-4 w-4 text-primary-600 border-gray-300 rounded mt-1 mr-2" 
                      checked={preferences.amenities.includes('parks')}
                      onChange={handleCheckboxChange}
                    />
                    <div className="flex-1 flex flex-col">
                      <span className="block text-sm font-medium text-gray-900">Parks & Green Spaces</span>
                    </div>
                  </label>
                  
                  <label className="relative bg-white rounded-lg border border-gray-200 p-4 flex cursor-pointer hover:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500">
                    <input 
                      type="checkbox" 
                      name="amenities" 
                      value="restaurants" 
                      className="h-4 w-4 text-primary-600 border-gray-300 rounded mt-1 mr-2" 
                      checked={preferences.amenities.includes('restaurants')}
                      onChange={handleCheckboxChange}
                    />
                    <div className="flex-1 flex flex-col">
                      <span className="block text-sm font-medium text-gray-900">Restaurants & Cafes</span>
                    </div>
                  </label>
                  
                  <label className="relative bg-white rounded-lg border border-gray-200 p-4 flex cursor-pointer hover:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500">
                    <input 
                      type="checkbox" 
                      name="amenities" 
                      value="shopping" 
                      className="h-4 w-4 text-primary-600 border-gray-300 rounded mt-1 mr-2" 
                      checked={preferences.amenities.includes('shopping')}
                      onChange={handleCheckboxChange}
                    />
                    <div className="flex-1 flex flex-col">
                      <span className="block text-sm font-medium text-gray-900">Shopping Centers</span>
                    </div>
                  </label>
                  
                  <label className="relative bg-white rounded-lg border border-gray-200 p-4 flex cursor-pointer hover:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500">
                    <input 
                      type="checkbox" 
                      name="amenities" 
                      value="schools" 
                      className="h-4 w-4 text-primary-600 border-gray-300 rounded mt-1 mr-2" 
                      checked={preferences.amenities.includes('schools')}
                      onChange={handleCheckboxChange}
                    />
                    <div className="flex-1 flex flex-col">
                      <span className="block text-sm font-medium text-gray-900">Good Schools</span>
                    </div>
                  </label>
                  
                  <label className="relative bg-white rounded-lg border border-gray-200 p-4 flex cursor-pointer hover:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500">
                    <input 
                      type="checkbox" 
                      name="amenities" 
                      value="nightlife" 
                      className="h-4 w-4 text-primary-600 border-gray-300 rounded mt-1 mr-2" 
                      checked={preferences.amenities.includes('nightlife')}
                      onChange={handleCheckboxChange}
                    />
                    <div className="flex-1 flex flex-col">
                      <span className="block text-sm font-medium text-gray-900">Nightlife & Entertainment</span>
                    </div>
                  </label>
                  
                  <label className="relative bg-white rounded-lg border border-gray-200 p-4 flex cursor-pointer hover:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500">
                    <input 
                      type="checkbox" 
                      name="amenities" 
                      value="healthcare" 
                      className="h-4 w-4 text-primary-600 border-gray-300 rounded mt-1 mr-2" 
                      checked={preferences.amenities.includes('healthcare')}
                      onChange={handleCheckboxChange}
                    />
                    <div className="flex-1 flex flex-col">
                      <span className="block text-sm font-medium text-gray-900">Healthcare Facilities</span>
                    </div>
                  </label>
                </div>
              </div>
            )}
            
            {/* Step 5: Safety */}
            {step === 5 && (
              <div className="space-y-6">
                <h3 className="text-xl font-medium text-gray-900">How important is safety to you?</h3>
                <p className="text-gray-500">This helps us prioritize neighborhoods based on safety ratings.</p>
                
                <div className="space-y-4">
                  <label className="relative bg-white rounded-lg border border-gray-200 p-4 flex cursor-pointer hover:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500">
                    <input 
                      type="radio" 
                      name="safety" 
                      value="high" 
                      className="sr-only" 
                      checked={preferences.safety === 'high'}
                      onChange={handleChange}
                    />
                    <div className="flex-1 flex flex-col">
                      <span className="block text-sm font-medium text-gray-900">Very Important</span>
                      <span className="mt-1 flex items-center text-sm text-gray-500">Prioritize neighborhoods with the highest safety ratings</span>
                      <span className={`absolute inset-0 rounded-lg pointer-events-none ${preferences.safety === 'high' ? 'border-2 border-primary-500' : 'border border-transparent'}`} aria-hidden="true"></span>
                    </div>
                  </label>
                  
                  <label className="relative bg-white rounded-lg border border-gray-200 p-4 flex cursor-pointer hover:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500">
                    <input 
                      type="radio" 
                      name="safety" 
                      value="medium" 
                      className="sr-only" 
                      checked={preferences.safety === 'medium'}
                      onChange={handleChange}
                    />
                    <div className="flex-1 flex flex-col">
                      <span className="block text-sm font-medium text-gray-900">Somewhat Important</span>
                      <span className="mt-1 flex items-center text-sm text-gray-500">Balance safety with other factors</span>
                      <span className={`absolute inset-0 rounded-lg pointer-events-none ${preferences.safety === 'medium' ? 'border-2 border-primary-500' : 'border border-transparent'}`} aria-hidden="true"></span>
                    </div>
                  </label>
                  
                  <label className="relative bg-white rounded-lg border border-gray-200 p-4 flex cursor-pointer hover:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500">
                    <input 
                      type="radio" 
                      name="safety" 
                      value="low" 
                      className="sr-only" 
                      checked={preferences.safety === 'low'}
                      onChange={handleChange}
                    />
                    <div className="flex-1 flex flex-col">
                      <span className="block text-sm font-medium text-gray-900">Less Important</span>
                      <span className="mt-1 flex items-center text-sm text-gray-500">Willing to consider all neighborhoods regardless of safety rating</span>
                      <span className={`absolute inset-0 rounded-lg pointer-events-none ${preferences.safety === 'low' ? 'border-2 border-primary-500' : 'border border-transparent'}`} aria-hidden="true"></span>
                    </div>
                  </label>
                </div>
              </div>
            )}
            
            {/* Navigation Buttons */}
            <div className="mt-8 flex justify-between">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={prevStep}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Back
                </button>
              ) : (
                <div></div>
              )}
              
              {step < totalSteps ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Find Matches
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default PreferencesPage