// Environment configuration
const config = {
  development: {
    apiUrl: '/api'
  },
  production: {
    apiUrl: 'https://summer-pep-orpin.vercel.app/api'
  }
};

// Determine environment - be very explicit
const isProduction = window.location.hostname !== 'localhost' && 
                    window.location.hostname !== '127.0.0.1' &&
                    window.location.hostname !== '0.0.0.0';

const environment = isProduction ? 'production' : 'development';

// Get API URL with multiple fallbacks
const getApiUrl = () => {
  // First try environment variable
  if (import.meta.env.VITE_API_URL) {
    return `${import.meta.env.VITE_API_URL}/api`;
  }
  
  // Then use hostname-based detection
  if (isProduction) {
    return 'https://summer-pep-orpin.vercel.app/api';
  }
  
  // Development fallback
  return '/api';
};

// Export configuration
export const API_CONFIG = {
  baseURL: getApiUrl(),
  environment,
  isProduction
};

// Detailed logging
console.log('🔧 Environment Config:', {
  hostname: window.location.hostname,
  environment,
  isProduction,
  baseURL: API_CONFIG.baseURL,
  envVar: import.meta.env.VITE_API_URL,
  mode: import.meta.env.MODE,
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
  finalApiUrl: API_CONFIG.baseURL
});
