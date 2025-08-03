/**
 * Format a lifestyle value to a human-readable label
 * @param {string} lifestyle - The lifestyle value (young_professional, family, retiree, student)
 * @returns {string} The formatted label
 */
export const formatLifestyle = (lifestyle) => {
  const labels = {
    'young_professional': 'Young Professional',
    'family': 'Family-Friendly',
    'retiree': 'Retiree-Friendly',
    'student': 'Student-Friendly'
  };
  return labels[lifestyle] || lifestyle;
};

/**
 * Format a cost of living value to a human-readable label
 * @param {string} cost - The cost value (low, medium, high)
 * @returns {string} The formatted label
 */
export const formatCostOfLiving = (cost) => {
  const labels = {
    'low': 'Budget-Friendly',
    'medium': 'Mid-Range',
    'high': 'Luxury'
  };
  return labels[cost] || cost;
};

/**
 * Format a safety value to a human-readable label
 * @param {string} safety - The safety value (low, medium, high)
 * @returns {string} The formatted label
 */
export const formatSafety = (safety) => {
  const labels = {
    'low': 'Moderate',
    'medium': 'Good',
    'high': 'Excellent'
  };
  return labels[safety] || safety;
};

/**
 * Format a commute option to a human-readable label
 * @param {string} commute - The commute option (car, public_transit, biking, walking)
 * @returns {string} The formatted label
 */
export const formatCommute = (commute) => {
  const labels = {
    'car': 'Car',
    'public_transit': 'Public Transit',
    'biking': 'Biking',
    'walking': 'Walking'
  };
  return labels[commute] || commute.replace('_', ' ');
};

/**
 * Format an amenity to a human-readable label
 * @param {string} amenity - The amenity (parks, restaurants, shopping, etc.)
 * @returns {string} The formatted label
 */
export const formatAmenity = (amenity) => {
  const labels = {
    'parks': 'Parks & Recreation',
    'restaurants': 'Restaurants & Dining',
    'shopping': 'Shopping Centers',
    'nightlife': 'Nightlife & Entertainment',
    'schools': 'Quality Schools',
    'healthcare': 'Healthcare Facilities',
    'public_transit': 'Public Transportation'
  };
  return labels[amenity] || amenity.replace('_', ' ');
};

/**
 * Get a color class for a score value
 * @param {number} score - The score value (0-100)
 * @returns {string} The Tailwind CSS color class
 */
export const getScoreColor = (score) => {
  if (score >= 90) return 'text-green-600';
  if (score >= 80) return 'text-green-500';
  if (score >= 70) return 'text-yellow-500';
  if (score >= 60) return 'text-yellow-600';
  return 'text-red-500';
};

/**
 * Get a background color class for a score bar
 * @param {number} score - The score value (0-100)
 * @returns {string} The Tailwind CSS background color class
 */
export const getScoreBarColor = (score) => {
  if (score >= 90) return 'bg-green-600';
  if (score >= 80) return 'bg-green-500';
  if (score >= 70) return 'bg-yellow-500';
  if (score >= 60) return 'bg-yellow-600';
  return 'bg-red-500';
};

/**
 * Truncate a string to a specified length and add ellipsis
 * @param {string} str - The string to truncate
 * @param {number} length - The maximum length
 * @returns {string} The truncated string
 */
export const truncateString = (str, length = 100) => {
  if (!str) return '';
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
};

/**
 * Format a date string to a human-readable format
 * @param {string} dateString - The date string to format
 * @returns {string} The formatted date
 */
export const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

/**
 * Generate a random ID (for demo purposes)
 * @returns {string} A random ID
 */
export const generateId = () => {
  return Math.random().toString(36).substring(2, 15);
};

/**
 * Get a random item from an array
 * @param {Array} array - The array to get a random item from
 * @returns {*} A random item from the array
 */
export const getRandomItem = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

/**
 * Debounce a function call
 * @param {Function} func - The function to debounce
 * @param {number} wait - The debounce wait time in milliseconds
 * @returns {Function} The debounced function
 */
export const debounce = (func, wait = 300) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};