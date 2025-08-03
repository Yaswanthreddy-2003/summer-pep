import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import MatchCard from './MatchCard';
import Card from './Card';
import axios from 'axios';

/**
 * Component for displaying a user's saved neighborhoods
 */
const SavedNeighborhoods = () => {
  const { currentUser } = useAuth();
  const [savedNeighborhoods, setSavedNeighborhoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSavedNeighborhoods = async () => {
      if (!currentUser) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // Get user's saved neighborhoods
        const userResponse = await axios.get(`/api/users/${currentUser.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });

        // If user has saved neighborhoods, fetch their details
        if (userResponse.data.savedNeighborhoods && userResponse.data.savedNeighborhoods.length > 0) {
          // Get match scores for each saved neighborhood
          const matchesResponse = await axios.get(`/api/matching/users/${currentUser.id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });

          // Create a map of neighborhood IDs to match scores
          const matchScoresMap = {};
          matchesResponse.data.forEach(match => {
            matchScoresMap[match.neighborhood._id] = {
              matchScore: match.matchScore.percentage,
              categoryScores: match.matchScore.breakdown
            };
          });

          // Fetch full details for each saved neighborhood
          const neighborhoodPromises = userResponse.data.savedNeighborhoods.map(neighborhoodId =>
            axios.get(`/api/neighborhoods/${neighborhoodId}`, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
            })
          );

          const neighborhoodResponses = await Promise.all(neighborhoodPromises);
          
          // Combine neighborhood data with match scores
          const neighborhoods = neighborhoodResponses.map(response => {
            const neighborhood = response.data;
            const matchData = matchScoresMap[neighborhood._id] || { matchScore: 0, categoryScores: {} };
            
            return {
              neighborhood,
              matchScore: matchData.matchScore,
              categoryScores: matchData.categoryScores
            };
          });

          setSavedNeighborhoods(neighborhoods);
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching saved neighborhoods:', err);
        setError('Failed to load saved neighborhoods. Please try again later.');
        setLoading(false);
      }
    };

    fetchSavedNeighborhoods();
  }, [currentUser]);

  const handleRemoveNeighborhood = async (neighborhoodId) => {
    try {
      await axios.delete(`/api/users/${currentUser.id}/neighborhoods`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        data: { neighborhoodId }
      });

      // Update the local state to remove the neighborhood
      setSavedNeighborhoods(prev => 
        prev.filter(item => item.neighborhood._id !== neighborhoodId)
      );
    } catch (err) {
      console.error('Error removing neighborhood:', err);
      setError('Failed to remove neighborhood. Please try again.');
    }
  };

  if (!currentUser) {
    return (
      <Card className="p-6 text-center">
        <h2 className="text-xl font-semibold mb-4">Saved Neighborhoods</h2>
        <p>Please log in to view your saved neighborhoods.</p>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card className="p-6 text-center">
        <h2 className="text-xl font-semibold mb-4">Saved Neighborhoods</h2>
        <p>Loading your saved neighborhoods...</p>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-6 text-center">
        <h2 className="text-xl font-semibold mb-4">Saved Neighborhoods</h2>
        <p className="text-red-500">{error}</p>
      </Card>
    );
  }

  if (savedNeighborhoods.length === 0) {
    return (
      <Card className="p-6 text-center">
        <h2 className="text-xl font-semibold mb-4">Saved Neighborhoods</h2>
        <p>You haven't saved any neighborhoods yet.</p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Saved Neighborhoods</h2>
      <div className="grid grid-cols-1 gap-6">
        {savedNeighborhoods.map(match => (
          <div key={match.neighborhood._id} className="relative">
            <MatchCard match={match} />
            <button
              onClick={() => handleRemoveNeighborhood(match.neighborhood._id)}
              className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
              aria-label="Remove from saved"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedNeighborhoods;