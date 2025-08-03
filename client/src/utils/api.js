// import axios from 'axios';

// // Create an axios instance with default config
// const api = axios.create({
//   baseURL: '/api',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // User API calls
// export const userAPI = {
//   // Get all users
//   getUsers: async () => {
//     try {
//       const response = await api.get('/users');
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching users:', error);
//       throw error;
//     }
//   },
  
//   // Get user by ID
//   getUserById: async (userId) => {
//     try {
//       const response = await api.get(`/users/${userId}`);
//       return response.data;
//     } catch (error) {
//       console.error(`Error fetching user ${userId}:`, error);
//       throw error;
//     }
//   },
  
//   // Create new user
//   createUser: async (userData) => {
//     try {
//       const response = await api.post('/users', userData);
//       return response.data;
//     } catch (error) {
//       console.error('Error creating user:', error);
//       throw error;
//     }
//   },
  
//   // Update user
//   updateUser: async (userId, userData) => {
//     try {
//       const response = await api.put(`/users/${userId}`, userData);
//       return response.data;
//     } catch (error) {
//       console.error(`Error updating user ${userId}:`, error);
//       throw error;
//     }
//   },
  
//   // Update user preferences
//   updatePreferences: async (userId, preferences) => {
//     try {
//       const response = await api.put(`/users/${userId}/preferences`, preferences);
//       return response.data;
//     } catch (error) {
//       console.error(`Error updating preferences for user ${userId}:`, error);
//       throw error;
//     }
//   },
  
//   // Save neighborhood to favorites
//   saveNeighborhood: async (userId, neighborhoodId) => {
//     try {
//       const response = await api.put(`/users/${userId}/neighborhoods/${neighborhoodId}`);
//       return response.data;
//     } catch (error) {
//       console.error(`Error saving neighborhood ${neighborhoodId} for user ${userId}:`, error);
//       throw error;
//     }
//   },
  
//   // Remove neighborhood from favorites
//   removeNeighborhood: async (userId, neighborhoodId) => {
//     try {
//       const response = await api.delete(`/users/${userId}/neighborhoods/${neighborhoodId}`);
//       return response.data;
//     } catch (error) {
//       console.error(`Error removing neighborhood ${neighborhoodId} for user ${userId}:`, error);
//       throw error;
//     }
//   }
// };

// // Neighborhood API calls
// export const neighborhoodAPI = {
//   // Get all neighborhoods
//   getNeighborhoods: async () => {
//     try {
//       const response = await api.get('/neighborhoods');
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching neighborhoods:', error);
//       throw error;
//     }
//   },
  
//   // Get neighborhood by ID
//   getNeighborhoodById: async (neighborhoodId) => {
//     try {
//       const response = await api.get(`/neighborhoods/${neighborhoodId}`);
//       return response.data;
//     } catch (error) {
//       console.error(`Error fetching neighborhood ${neighborhoodId}:`, error);
//       throw error;
//     }
//   },
  
//   // Search neighborhoods by city or state
//   searchNeighborhoods: async (query) => {
//     try {
//       const response = await api.get('/neighborhoods/search', { params: query });
//       return response.data;
//     } catch (error) {
//       console.error('Error searching neighborhoods:', error);
//       throw error;
//     }
//   },
  
//   // Find neighborhoods near a location
//   findNearbyNeighborhoods: async (location, maxDistance) => {
//     try {
//       const response = await api.get('/neighborhoods/nearby', { 
//         params: { lat: location.lat, lng: location.lng, maxDistance }
//       });
//       return response.data;
//     } catch (error) {
//       console.error('Error finding nearby neighborhoods:', error);
//       throw error;
//     }
//   },
  
//   // Filter neighborhoods by characteristics
//   filterNeighborhoods: async (filters) => {
//     try {
//       const response = await api.get('/neighborhoods/filter', { params: filters });
//       return response.data;
//     } catch (error) {
//       console.error('Error filtering neighborhoods:', error);
//       throw error;
//     }
//   }
// };

// // Matching API calls
// export const matchingAPI = {
//   // Get all matches for a user
//   getUserMatches: async (userId) => {
//     try {
//       const response = await api.get(`/matching/user/${userId}`);
//       return response.data;
//     } catch (error) {
//       console.error(`Error fetching matches for user ${userId}:`, error);
//       throw error;
//     }
//   },
  
//   // Get top N matches for a user
//   getTopMatches: async (userId, n) => {
//     try {
//       const response = await api.get(`/matching/user/${userId}/top/${n}`);
//       return response.data;
//     } catch (error) {
//       console.error(`Error fetching top ${n} matches for user ${userId}:`, error);
//       throw error;
//     }
//   },
  
//   // Get match details for a specific neighborhood and user
//   getMatchDetails: async (userId, neighborhoodId) => {
//     try {
//       const response = await api.get(`/matching/user/${userId}/neighborhood/${neighborhoodId}`);
//       return response.data;
//     } catch (error) {
//       console.error(`Error fetching match details for user ${userId} and neighborhood ${neighborhoodId}:`, error);
//       throw error;
//     }
//   },
  
//   // Preview matches with temporary preferences
//   previewMatches: async (preferences) => {
//     try {
//       const response = await api.post('/matching/preview', preferences);
//       return response.data;
//     } catch (error) {
//       console.error('Error previewing matches:', error);
//       throw error;
//     }
//   }
// };

// export default {
//   user: userAPI,
//   neighborhood: neighborhoodAPI,
//   matching: matchingAPI
// };


import axios from 'axios';

// Create an axios instance with default config
export const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production' 
    ? 'https://your-backend-url.vercel.app/api'  // Replace with your actual backend URL
    : '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// User API calls
export const userAPI = {
  // Get all users
  getUsers: async () => {
    try {
      const response = await api.get('/users');
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },
  
  // Get user by ID
  getUserById: async (userId) => {
    try {
      const response = await api.get(`/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching user ${userId}:`, error);
      throw error;
    }
  },
  
  // Create new user
  createUser: async (userData) => {
    try {
      const response = await api.post('/users', userData);
      return response.data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },
  
  // Update user
  updateUser: async (userId, userData) => {
    try {
      const response = await api.put(`/users/${userId}`, userData);
      return response.data;
    } catch (error) {
      console.error(`Error updating user ${userId}:`, error);
      throw error;
    }
  },
  
  // Update user preferences
  updatePreferences: async (userId, preferences) => {
    try {
      const response = await api.put(`/users/${userId}/preferences`, preferences);
      return response.data;
    } catch (error) {
      console.error(`Error updating preferences for user ${userId}:`, error);
      throw error;
    }
  },
  
  // Save neighborhood to favorites
  saveNeighborhood: async (userId, neighborhoodId) => {
    try {
      const response = await api.put(`/users/${userId}/neighborhoods/${neighborhoodId}`);
      return response.data;
    } catch (error) {
      console.error(`Error saving neighborhood ${neighborhoodId} for user ${userId}:`, error);
      throw error;
    }
  },
  
  // Remove neighborhood from favorites
  removeNeighborhood: async (userId, neighborhoodId) => {
    try {
      const response = await api.delete(`/users/${userId}/neighborhoods/${neighborhoodId}`);
      return response.data;
    } catch (error) {
      console.error(`Error removing neighborhood ${neighborhoodId} for user ${userId}:`, error);
      throw error;
    }
  }
};

// Neighborhood API calls
export const neighborhoodAPI = {
  // Get all neighborhoods
  getNeighborhoods: async () => {
    try {
      const response = await api.get('/neighborhoods');
      return response.data;
    } catch (error) {
      console.error('Error fetching neighborhoods:', error);
      throw error;
    }
  },
  
  // Get neighborhood by ID
  getNeighborhoodById: async (neighborhoodId) => {
    try {
      const response = await api.get(`/neighborhoods/${neighborhoodId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching neighborhood ${neighborhoodId}:`, error);
      throw error;
    }
  },
  
  // Search neighborhoods by city or state
  searchNeighborhoods: async (query) => {
    try {
      const response = await api.get('/neighborhoods/search', { params: query });
      return response.data;
    } catch (error) {
      console.error('Error searching neighborhoods:', error);
      throw error;
    }
  },
  
  // Find neighborhoods near a location
  findNearbyNeighborhoods: async (location, maxDistance) => {
    try {
      const response = await api.get('/neighborhoods/nearby', { 
        params: { lat: location.lat, lng: location.lng, maxDistance }
      });
      return response.data;
    } catch (error) {
      console.error('Error finding nearby neighborhoods:', error);
      throw error;
    }
  },
  
  // Filter neighborhoods by characteristics
  filterNeighborhoods: async (filters) => {
    try {
      const response = await api.get('/neighborhoods/filter', { params: filters });
      return response.data;
    } catch (error) {
      console.error('Error filtering neighborhoods:', error);
      throw error;
    }
  }
};

// Matching API calls
export const matchingAPI = {
  // Get all matches for a user
  getUserMatches: async (userId) => {
    try {
      const response = await api.get(`/matching/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching matches for user ${userId}:`, error);
      throw error;
    }
  },
  
  // Get top N matches for a user
  getTopMatches: async (userId, n) => {
    try {
      const response = await api.get(`/matching/user/${userId}/top/${n}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching top ${n} matches for user ${userId}:`, error);
      throw error;
    }
  },
  
  // Get match details for a specific neighborhood and user
  getMatchDetails: async (userId, neighborhoodId) => {
    try {
      const response = await api.get(`/matching/user/${userId}/neighborhood/${neighborhoodId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching match details for user ${userId} and neighborhood ${neighborhoodId}:`, error);
      throw error;
    }
  },
  
  // Preview matches with temporary preferences
  previewMatches: async (preferences) => {
    try {
      const response = await api.post('/matching/preview', preferences);
      return response.data;
    } catch (error) {
      console.error('Error previewing matches:', error);
      throw error;
    }
  }
};

export default {
  user: userAPI,
  neighborhood: neighborhoodAPI,
  matching: matchingAPI
};