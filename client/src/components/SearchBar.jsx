import React, { useState, useEffect, useRef } from 'react';

/**
 * A search bar component with optional autocomplete
 * 
 * @param {Object} props - Component props
 * @param {string} props.placeholder - Placeholder text
 * @param {Function} props.onSearch - Handler for search submission
 * @param {Function} props.onChange - Handler for input changes
 * @param {Array} props.suggestions - Array of search suggestions
 * @param {boolean} props.showSuggestions - Whether to show suggestions
 * @param {Function} props.onSuggestionClick - Handler for suggestion clicks
 * @param {string} props.className - Additional CSS classes
 */
const SearchBar = ({
  placeholder = 'Search neighborhoods...',
  onSearch,
  onChange,
  suggestions = [],
  showSuggestions = true,
  onSuggestionClick,
  className = '',
  ...rest
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef(null);
  
  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (onChange) {
      onChange(value);
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (onSearch && searchTerm.trim()) {
      onSearch(searchTerm.trim());
    }
  };
  
  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setIsFocused(false);
    
    if (onSuggestionClick) {
      onSuggestionClick(suggestion);
    }
    
    if (onSearch) {
      onSearch(suggestion);
    }
  };
  
  return (
    <div className={`relative ${className}`} ref={searchRef} {...rest}>
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            placeholder={placeholder}
            value={searchTerm}
            onChange={handleInputChange}
            onFocus={() => setIsFocused(true)}
          />
          {searchTerm && (
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => {
                setSearchTerm('');
                if (onChange) onChange('');
              }}
            >
              <svg className="h-5 w-5 text-gray-400 hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </button>
          )}
        </div>
        <button type="submit" className="sr-only">Search</button>
      </form>
      
      {/* Suggestions dropdown */}
      {showSuggestions && isFocused && suggestions.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto max-h-60 focus:outline-none sm:text-sm">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <span className="block truncate">{suggestion}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;