import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { currentUser, isAuthenticated, logout } = useAuth()
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }
  
  const closeMenu = () => {
    setIsMenuOpen(false)
  }
  
  const handleLogout = () => {
    logout()
    closeMenu()
  }
  
  const handleLoginClick = () => {
    navigate('/login')
    closeMenu()
  }
  

  const handleRegisterClick = () => {
    navigate('/register')
    closeMenu()
  }
  
  const isActive = (path) => {
    return location.pathname === path ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'
  }
  
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center" onClick={closeMenu}>
              <span className="text-2xl font-bold text-primary-600">NeighborFit</span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link to="/" className={`${isActive('/')} px-3 py-2 text-sm font-medium`}>Home</Link>
            <Link to="/about" className={`${isActive('/about')} px-3 py-2 text-sm font-medium`}>About</Link>
            <Link to="/neighborhoods" className={`${isActive('/neighborhoods')} px-3 py-2 text-sm font-medium`}>Neighborhoods</Link>
            
            {isAuthenticated ? (
              <>
                <Link to="/preferences" className={`${isActive('/preferences')} px-3 py-2 text-sm font-medium`}>Preferences</Link>
                <Link to="/matches" className={`${isActive('/matches')} px-3 py-2 text-sm font-medium`}>Matches</Link>
                <Link to="/saved" className={`${isActive('/saved')} px-3 py-2 text-sm font-medium`}>Saved</Link>
                <button 
                  onClick={handleLogout}
                  className="ml-2 px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={handleLoginClick}
                  className="ml-2 px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700"
                >
                  Sign In
                </button>
                <button 
                  onClick={handleRegisterClick}
                  className="ml-2 px-4 py-2 text-sm font-medium text-white bg-secondary-600 rounded-md hover:bg-secondary-700"
                >
                  Register
                </button>
              </>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-100 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon when menu is closed */}
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              {/* Icon when menu is open */}
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link 
            to="/" 
            className={`${isActive('/') ? 'bg-primary-50 text-primary-600' : 'text-gray-700 hover:bg-gray-100'} block px-3 py-2 rounded-md text-base font-medium`}
            onClick={closeMenu}
          >
            Home
          </Link>
          <Link 
            to="/about" 
            className={`${isActive('/about') ? 'bg-primary-50 text-primary-600' : 'text-gray-700 hover:bg-gray-100'} block px-3 py-2 rounded-md text-base font-medium`}
            onClick={closeMenu}
          >
            About
          </Link>
          <Link 
            to="/neighborhoods" 
            className={`${isActive('/neighborhoods') ? 'bg-primary-50 text-primary-600' : 'text-gray-700 hover:bg-gray-100'} block px-3 py-2 rounded-md text-base font-medium`}
            onClick={closeMenu}
          >
            Neighborhoods
          </Link>
          
          {isAuthenticated ? (
            <>
              <Link 
                to="/preferences" 
                className={`${isActive('/preferences') ? 'bg-primary-50 text-primary-600' : 'text-gray-700 hover:bg-gray-100'} block px-3 py-2 rounded-md text-base font-medium`}
                onClick={closeMenu}
              >
                Preferences
              </Link>
              <Link 
                to="/matches" 
                className={`${isActive('/matches') ? 'bg-primary-50 text-primary-600' : 'text-gray-700 hover:bg-gray-100'} block px-3 py-2 rounded-md text-base font-medium`}
                onClick={closeMenu}
              >
                Matches
              </Link>
              <Link 
                to="/saved" 
                className={`${isActive('/saved') ? 'bg-primary-50 text-primary-600' : 'text-gray-700 hover:bg-gray-100'} block px-3 py-2 rounded-md text-base font-medium`}
                onClick={closeMenu}
              >
                Saved
              </Link>
              <button 
                onClick={handleLogout}
                className="mt-2 w-full px-4 py-2 text-base font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={handleLoginClick}
                className="mt-2 w-full px-4 py-2 text-base font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700"
              >
                Sign In
              </button>
              <button 
                onClick={handleRegisterClick}
                className="mt-2 w-full px-4 py-2 text-base font-medium text-white bg-secondary-600 rounded-md hover:bg-secondary-700"
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar