import React, { createContext, useState, useContext, useEffect } from 'react';
import { api } from '../utils/api';

// Create the context
const AuthContext = createContext();

/**
 * Provider component for authentication context
 * Manages user authentication state and provides login/logout functionality
 */
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Check if user is already logged in on mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      setLoading(true);
      try {
        // Check if token exists in localStorage
        const token = localStorage.getItem('token');
        if (token) {
          // Set authorization header
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          // Verify token by fetching current user
          const response = await api.get('/auth/me');
          setCurrentUser(response.data);
        }
      } catch (err) {
        console.error('Error checking auth status:', err);
        // Clear invalid token
        localStorage.removeItem('token');
        delete api.defaults.headers.common['Authorization'];
        setError('Session expired. Please log in again.');
      } finally {
        setLoading(false);
      }
    };
    
    checkAuthStatus();
  }, []);
  
  /**
   * Log in a user
   * @param {string} email - User's email
   * @param {string} password - User's password
   * @returns {Promise} - Resolves with user data or rejects with error
   */
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    
    try {
      // Call the login API endpoint
      const response = await api.post('/auth/login', { email, password });
      const { token, user } = response.data;
      
      // Store token in localStorage
      localStorage.setItem('token', token);
      
      // Set authorization header for future requests
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // Store user data
      setCurrentUser(user);
      return user;
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Failed to log in. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  /**
   * Register a new user
   * @param {string} name - User's name
   * @param {string} email - User's email
   * @param {string} password - User's password
   * @returns {Promise} - Resolves with user data or rejects with error
   */
  const register = async (name, email, password) => {
    setLoading(true);
    setError(null);
    
    try {
      // Call the register API endpoint
      const response = await api.post('/auth/register', { name, email, password });
      const { token, user } = response.data;
      
      // Store token in localStorage
      localStorage.setItem('token', token);
      
      // Set authorization header for future requests
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // Store user data
      setCurrentUser(user);
      return user;
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.response?.data?.message || 'Failed to register. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  /**
   * Log out the current user
   */
  const logout = () => {
    // Remove token from localStorage
    localStorage.removeItem('token');
    
    // Remove authorization header
    delete api.defaults.headers.common['Authorization'];
    
    // Clear user state
    setCurrentUser(null);
  };
  
  /**
   * Update user preferences
   * @param {Object} preferences - User preferences object
   * @returns {Promise} - Resolves with updated user data or rejects with error
   */
  const updatePreferences = async (preferences) => {
    if (!currentUser) {
      setError('You must be logged in to update preferences');
      throw new Error('Not authenticated');
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // Call the update preferences API endpoint
      const response = await api.put(`/users/${currentUser._id}/preferences`, preferences);
      
      // Update current user with new preferences
      setCurrentUser(prev => ({
        ...prev,
        preferences: response.data.preferences
      }));
      
      return response.data;
    } catch (err) {
      console.error('Update preferences error:', err);
      setError(err.response?.data?.message || 'Failed to update preferences. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  /**
   * Save a neighborhood to user's saved list
   * @param {string} neighborhoodId - ID of neighborhood to save
   * @returns {Promise} - Resolves with updated user data or rejects with error
   */
  const saveNeighborhood = async (neighborhoodId) => {
    if (!currentUser) {
      setError('You must be logged in to save neighborhoods');
      throw new Error('Not authenticated');
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // Check if neighborhood is already saved
      if (currentUser.savedNeighborhoods && currentUser.savedNeighborhoods.includes(neighborhoodId)) {
        return currentUser; // Already saved, no change needed
      }
      
      // Call the save neighborhood API endpoint
      const response = await api.post(`/users/${currentUser._id}/neighborhoods`, { neighborhoodId });
      
      // Update current user with new saved neighborhoods
      setCurrentUser(prev => ({
        ...prev,
        savedNeighborhoods: response.data.savedNeighborhoods
      }));
      
      return response.data;
    } catch (err) {
      console.error('Save neighborhood error:', err);
      setError(err.response?.data?.message || 'Failed to save neighborhood. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  /**
   * Remove a neighborhood from user's saved list
   * @param {string} neighborhoodId - ID of neighborhood to remove
   * @returns {Promise} - Resolves with updated user data or rejects with error
   */
  const removeNeighborhood = async (neighborhoodId) => {
    if (!currentUser) {
      setError('You must be logged in to manage saved neighborhoods');
      throw new Error('Not authenticated');
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // Call the remove neighborhood API endpoint
      const response = await api.delete(`/users/${currentUser._id}/neighborhoods`, {
        data: { neighborhoodId }
      });
      
      // Update current user with new saved neighborhoods
      setCurrentUser(prev => ({
        ...prev,
        savedNeighborhoods: response.data.savedNeighborhoods
      }));
      
      return response.data;
    } catch (err) {
      console.error('Remove neighborhood error:', err);
      setError(err.response?.data?.message || 'Failed to remove neighborhood. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  // Value object to be provided to consumers
  const value = {
    currentUser,
    loading,
    error,
    login,
    register,
    logout,
    updatePreferences,
    saveNeighborhood,
    removeNeighborhood,
    isAuthenticated: !!currentUser
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook to use the auth context
 * @returns {Object} Auth context value
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;