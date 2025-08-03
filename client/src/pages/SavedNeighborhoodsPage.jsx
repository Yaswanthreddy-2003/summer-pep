import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import NeighborhoodCard from '../components/NeighborhoodCard';
import Button from '../components/Button';
import Alert from '../components/Alert';
import LoadingSpinner from '../components/LoadingSpinner';
import LoginModal from '../components/LoginModal';
import { api } from '../utils/api';

/**
 * Page component for displaying user's saved neighborhoods
 */
const SavedNeighborhoodsPage = () => {
  const { currentUser, isAuthenticated, removeNeighborhood } = useAuth();
  const [savedNeighborhoods, setSavedNeighborhoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();
  
  // Fetch saved neighborhoods when component mounts or user changes
  useEffect(() => {
    const fetchSavedNeighborhoods = async () => {
      if (!isAuthenticated) {
        setLoading(false);
        return;
      }
      
      setLoading(true);
      setError('');
      
      try {
        // In a real app, you would call your API
        // const response = await api.users.getSavedNeighborhoods(currentUser.id);
        
        // For demo purposes, we'll use mock data
        // Simulate fetching neighborhoods based on saved IDs
        const mockNeighborhoods = [
          {
            id: '1',
            name: 'Downtown',
            city: 'Metropolis',
            state: 'NY',
            image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000',
            description: 'Vibrant downtown area with great nightlife and restaurants.',
            lifestyle: 'young_professional',
            costOfLiving: 'high',
            safety: 'medium',
            amenities: ['restaurants', 'nightlife', 'shopping', 'public_transit'],
            commuteOptions: ['public_transit', 'walking', 'biking']
          },
          {
            id: '2',
            name: 'Suburbia Heights',
            city: 'Pleasantville',
            state: 'CA',
            image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa',
            description: 'Family-friendly suburban neighborhood with excellent schools.',
            lifestyle: 'family',
            costOfLiving: 'medium',
            safety: 'high',
            amenities: ['parks', 'schools', 'shopping'],
            commuteOptions: ['car', 'biking']
          },
          {
            id: '3',
            name: 'University District',
            city: 'Collegetown',
            state: 'MA',
            image: 'https://images.unsplash.com/photo-1498136882173-b6ad341409b0',
            description: 'Lively area near major universities with affordable housing options.',
            lifestyle: 'student',
            costOfLiving: 'low',
            safety: 'medium',
            amenities: ['restaurants', 'nightlife', 'public_transit', 'parks'],
            commuteOptions: ['public_transit', 'walking', 'biking']
          }
        ];
        
        // Filter to only include neighborhoods that are in the user's saved list
        const userSavedNeighborhoods = mockNeighborhoods.filter(neighborhood => 
          currentUser.savedNeighborhoods.includes(neighborhood.id)
        );
        
        setSavedNeighborhoods(userSavedNeighborhoods);
      } catch (err) {
        console.error('Error fetching saved neighborhoods:', err);
        setError('Failed to load saved neighborhoods. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchSavedNeighborhoods();
  }, [isAuthenticated, currentUser]);
  
  const handleRemoveNeighborhood = async (neighborhoodId) => {
    try {
      await removeNeighborhood(neighborhoodId);
      // Update the local state to remove the neighborhood
      setSavedNeighborhoods(prevNeighborhoods => 
        prevNeighborhoods.filter(neighborhood => neighborhood.id !== neighborhoodId)
      );
    } catch (err) {
      console.error('Error removing neighborhood:', err);
      setError('Failed to remove neighborhood. Please try again.');
    }
  };
  
  // Render content based on authentication status
  const renderContent = () => {
    if (!isAuthenticated) {
      return (
        <div className="text-center py-12">
          <h2 className="text-xl font-medium text-gray-900 mb-4">Sign in to view your saved neighborhoods</h2>
          <p className="text-gray-600 mb-6">Create an account or sign in to save and track your favorite neighborhoods.</p>
          <Button 
            variant="primary" 
            onClick={() => setShowLoginModal(true)}
          >
            Sign In
          </Button>
        </div>
      );
    }
    
    if (loading) {
      return <LoadingSpinner fullPage text="Loading saved neighborhoods..." />;
    }
    
    if (error) {
      return (
        <Alert 
          type="error" 
          title="Error" 
          message={error} 
          onDismiss={() => setError('')} 
        />
      );
    }
    
    if (savedNeighborhoods.length === 0) {
      return (
        <div className="text-center py-12">
          <h2 className="text-xl font-medium text-gray-900 mb-4">No saved neighborhoods yet</h2>
          <p className="text-gray-600 mb-6">Start exploring neighborhoods and save your favorites to see them here.</p>
          <Button 
            variant="primary" 
            onClick={() => navigate('/neighborhoods')}
          >
            Explore Neighborhoods
          </Button>
        </div>
      );
    }
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savedNeighborhoods.map(neighborhood => (
          <NeighborhoodCard
            key={neighborhood.id}
            neighborhood={neighborhood}
            showDetails
            showActions
            isSaved={true}
            onSave={() => handleRemoveNeighborhood(neighborhood.id)}
          />
        ))}
      </div>
    );
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Saved Neighborhoods</h1>
        <p className="text-gray-600 mt-2">Your collection of favorite neighborhoods</p>
      </div>
      
      {renderContent()}
      
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />
    </div>
  );
};

export default SavedNeighborhoodsPage;