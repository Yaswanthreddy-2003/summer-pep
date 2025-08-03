import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

/**
 * PrivateRoute component to protect routes that require authentication
 * If user is not authenticated, redirects to login page
 */
const PrivateRoute = () => {
  const { currentUser, loading } = useAuth();
  
  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }
  
  // If authenticated, render the child routes
  // Otherwise, redirect to login page
  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;