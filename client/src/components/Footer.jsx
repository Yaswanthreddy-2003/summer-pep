import { Link } from 'react-router-dom'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">NeighborFit</h3>
            <p className="text-gray-300">
              Finding the perfect neighborhood that matches your lifestyle preferences.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/neighborhoods" className="text-gray-300 hover:text-white transition-colors">
                  Neighborhoods
                </Link>
              </li>
              <li>
                <Link to="/preferences" className="text-gray-300 hover:text-white transition-colors">
                  Preferences
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-gray-300 mb-2">
              Have questions or feedback? Reach out to us.
            </p>
            <a 
              href="mailto:info@neighborfit.com" 
              className="text-primary-400 hover:text-primary-300 transition-colors"
            >
              info@neighborfit.com
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; {currentYear} NeighborFit. All rights reserved.</p>
          <p className="mt-2 text-sm">
            This is a project assignment and not a real service.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer