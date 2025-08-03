import React, { useState } from 'react';

/**
 * A simple image carousel component
 * 
 * @param {Object} props - Component props
 * @param {Array} props.images - Array of image URLs
 * @param {string} props.alt - Alt text for images
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.height - Height of the carousel
 */
const ImageCarousel = ({ 
  images = [], 
  alt = 'Image',
  className = '',
  height = 'h-64 sm:h-96',
  ...rest 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // If no images provided, show a placeholder
  if (!images || images.length === 0) {
    return (
      <div 
        className={`bg-gray-200 flex items-center justify-center ${height} ${className}`}
        {...rest}
      >
        <svg className="h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    );
  }
  
  // If only one image, just show it without controls
  if (images.length === 1) {
    return (
      <div className={`relative overflow-hidden ${height} ${className}`} {...rest}>
        <img 
          src={images[0]} 
          alt={alt} 
          className="w-full h-full object-cover"
        />
      </div>
    );
  }
  
  const goToPrevious = () => {
    const isFirstImage = currentIndex === 0;
    const newIndex = isFirstImage ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  
  const goToNext = () => {
    const isLastImage = currentIndex === images.length - 1;
    const newIndex = isLastImage ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };
  
  return (
    <div className={`relative overflow-hidden ${height} ${className}`} {...rest}>
      {/* Main image */}
      <div className="w-full h-full transition-transform duration-500 ease-in-out">
        <img 
          src={images[currentIndex]} 
          alt={`${alt} ${currentIndex + 1}`} 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Left arrow */}
      <button
        onClick={goToPrevious}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all"
        aria-label="Previous image"
      >
        <svg className="h-5 w-5 text-gray-800" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </button>
      
      {/* Right arrow */}
      <button
        onClick={goToNext}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all"
        aria-label="Next image"
      >
        <svg className="h-5 w-5 text-gray-800" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
      </button>
      
      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 w-2 rounded-full focus:outline-none ${index === currentIndex ? 'bg-white' : 'bg-white bg-opacity-50'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;