import { useState } from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
  const [email, setEmail] = useState('')
  
  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, this would save the email for a newsletter or account creation
    alert(`Thank you for your interest! We'll keep you updated at ${email}`)
    setEmail('')
  }
  
  return (
    <div className="bg-gradient-to-b from-white to-primary-50">
      {/* Hero Section */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-6">
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Find Your Perfect</span>
                <span className="block text-primary-600">Neighborhood Match</span>
              </h1>
              <p className="mt-6 text-xl text-gray-500">
                NeighborFit helps you discover neighborhoods that perfectly match your lifestyle preferences through data analysis and our advanced matching algorithm.
              </p>
              <div className="mt-10 flex space-x-4">
                <Link 
                  to="/preferences" 
                  className="btn-primary text-center px-8 py-3 text-base font-medium rounded-md shadow-md"
                >
                  Find Your Match
                </Link>
                <Link 
                  to="/about" 
                  className="btn-outline text-center px-8 py-3 text-base font-medium rounded-md"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="mt-12 lg:mt-0 lg:col-span-6">
              <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80" 
                  alt="Neighborhood houses" 
                  className="w-full h-64 sm:h-72 md:h-96 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              How NeighborFit Works
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Our data-driven approach helps you find the perfect neighborhood match in just a few steps.
            </p>
          </div>
          
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="bg-primary-50 rounded-lg p-6 text-center">
              <div className="flex justify-center">
                <span className="inline-flex items-center justify-center p-3 bg-primary-100 text-primary-600 rounded-md shadow-lg text-3xl font-bold">
                  1
                </span>
              </div>
              <h3 className="mt-4 text-xl font-medium text-gray-900">Share Your Preferences</h3>
              <p className="mt-2 text-base text-gray-500">
                Tell us about your lifestyle, budget, and what matters most to you in a neighborhood.
              </p>
            </div>
            
            <div className="bg-primary-50 rounded-lg p-6 text-center">
              <div className="flex justify-center">
                <span className="inline-flex items-center justify-center p-3 bg-primary-100 text-primary-600 rounded-md shadow-lg text-3xl font-bold">
                  2
                </span>
              </div>
              <h3 className="mt-4 text-xl font-medium text-gray-900">Our Algorithm Works</h3>
              <p className="mt-2 text-base text-gray-500">
                Our matching algorithm analyzes real neighborhood data to find your best matches.
              </p>
            </div>
            
            <div className="bg-primary-50 rounded-lg p-6 text-center">
              <div className="flex justify-center">
                <span className="inline-flex items-center justify-center p-3 bg-primary-100 text-primary-600 rounded-md shadow-lg text-3xl font-bold">
                  3
                </span>
              </div>
              <h3 className="mt-4 text-xl font-medium text-gray-900">Discover Your Matches</h3>
              <p className="mt-2 text-base text-gray-500">
                Explore personalized neighborhood recommendations with detailed match explanations.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Ready to find your perfect neighborhood?
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-primary-100 mx-auto">
              Join thousands of others who have found their ideal neighborhood match.
            </p>
            
            <form onSubmit={handleSubmit} className="mt-8 sm:flex justify-center max-w-xl mx-auto">
              <div className="min-w-0 flex-1">
                <label htmlFor="email" className="sr-only">Email address</label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full px-4 py-3 rounded-md border-0 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-300"
                />
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3">
                <button
                  type="submit"
                  className="block w-full rounded-md px-4 py-3 bg-white text-primary-700 font-medium hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600"
                >
                  Get Started
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage