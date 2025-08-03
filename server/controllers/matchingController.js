const User = require('../models/User');
const Neighborhood = require('../models/Neighborhood');

// Calculate match score between user preferences and neighborhood
const calculateMatchScore = (userPreferences, neighborhood) => {
  let totalScore = 0;
  let maxPossibleScore = 0;
  
  // Lifestyle matching (weight: 30%)
  const lifestyleWeight = 0.3;
  let lifestyleScore = 0;
  
  if (userPreferences.lifestyle === 'active') {
    lifestyleScore = neighborhood.characteristics.lifestyle.active;
  } else if (userPreferences.lifestyle === 'family-oriented') {
    lifestyleScore = neighborhood.characteristics.lifestyle.familyOriented;
  } else if (userPreferences.lifestyle === 'quiet') {
    lifestyleScore = neighborhood.characteristics.lifestyle.quiet;
  } else if (userPreferences.lifestyle === 'social') {
    lifestyleScore = neighborhood.characteristics.lifestyle.social;
  } else if (userPreferences.lifestyle === 'urban') {
    lifestyleScore = neighborhood.characteristics.lifestyle.urban;
  }
  
  totalScore += lifestyleScore * lifestyleWeight;
  maxPossibleScore += 10 * lifestyleWeight; // Max lifestyle score is 10
  
  // Budget matching (weight: 25%)
  const budgetWeight = 0.25;
  // Lower cost of living is better for the user
  const budgetScore = 10 - Math.abs(userPreferences.budget / 1000 - neighborhood.characteristics.costOfLiving);
  totalScore += Math.max(0, budgetScore) * budgetWeight;
  maxPossibleScore += 10 * budgetWeight;
  
  // Safety matching (weight: 20%)
  const safetyWeight = 0.2;
  // Higher safety score is better
  const safetyScore = neighborhood.characteristics.safety >= userPreferences.safety ? 10 : 
    (neighborhood.characteristics.safety / userPreferences.safety) * 10;
  totalScore += safetyScore * safetyWeight;
  maxPossibleScore += 10 * safetyWeight;
  
  // Amenities matching (weight: 25%)
  const amenitiesWeight = 0.25;
  let amenitiesScore = 0;
  
  if (userPreferences.amenities && userPreferences.amenities.length > 0) {
    userPreferences.amenities.forEach(amenity => {
      let amenityKey = amenity;
      if (amenity === 'public_transport') amenityKey = 'publicTransport';
      
      amenitiesScore += neighborhood.characteristics.amenities[amenityKey] || 0;
    });
    
    // Normalize amenities score
    amenitiesScore = (amenitiesScore / userPreferences.amenities.length) || 0;
  }
  
  totalScore += amenitiesScore * amenitiesWeight;
  maxPossibleScore += 10 * amenitiesWeight;
  
  // Calculate percentage match
  const matchPercentage = (totalScore / maxPossibleScore) * 100;
  
  return {
    score: totalScore,
    percentage: Math.round(matchPercentage),
    breakdown: {
      lifestyle: Math.round((lifestyleScore / 10) * 100),
      budget: Math.round((Math.max(0, budgetScore) / 10) * 100),
      safety: Math.round((safetyScore / 10) * 100),
      amenities: Math.round((amenitiesScore / 10) * 100)
    }
  };
};

// Get neighborhood matches for a user
exports.getMatches = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Get all neighborhoods
    const neighborhoods = await Neighborhood.find();
    
    // Calculate match scores for each neighborhood
    const matches = neighborhoods.map(neighborhood => {
      const matchScore = calculateMatchScore(user.preferences, neighborhood);
      
      return {
        neighborhood: {
          _id: neighborhood._id,
          name: neighborhood.name,
          city: neighborhood.city,
          state: neighborhood.state,
          description: neighborhood.description,
          images: neighborhood.images
        },
        matchScore
      };
    });
    
    // Sort matches by percentage (highest first)
    const sortedMatches = matches.sort((a, b) => b.matchScore.percentage - a.matchScore.percentage);
    
    res.status(200).json(sortedMatches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get top N neighborhood matches for a user
exports.getTopMatches = async (req, res) => {
  try {
    const userId = req.params.userId;
    const limit = parseInt(req.query.limit) || 5; // Default to top 5
    
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Get all neighborhoods
    const neighborhoods = await Neighborhood.find();
    
    // Calculate match scores for each neighborhood
    const matches = neighborhoods.map(neighborhood => {
      const matchScore = calculateMatchScore(user.preferences, neighborhood);
      
      return {
        neighborhood: {
          _id: neighborhood._id,
          name: neighborhood.name,
          city: neighborhood.city,
          state: neighborhood.state,
          description: neighborhood.description,
          images: neighborhood.images
        },
        matchScore
      };
    });
    
    // Sort matches by percentage (highest first) and limit results
    const topMatches = matches
      .sort((a, b) => b.matchScore.percentage - a.matchScore.percentage)
      .slice(0, limit);
    
    res.status(200).json(topMatches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get match details for a specific neighborhood and user
exports.getMatchDetails = async (req, res) => {
  try {
    const { userId, neighborhoodId } = req.params;
    
    const user = await User.findById(userId);
    const neighborhood = await Neighborhood.findById(neighborhoodId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    if (!neighborhood) {
      return res.status(404).json({ message: 'Neighborhood not found' });
    }
    
    const matchScore = calculateMatchScore(user.preferences, neighborhood);
    
    res.status(200).json({
      user: {
        _id: user._id,
        name: user.name,
        preferences: user.preferences
      },
      neighborhood: {
        _id: neighborhood._id,
        name: neighborhood.name,
        city: neighborhood.city,
        state: neighborhood.state,
        characteristics: neighborhood.characteristics
      },
      matchScore
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get match preview with temporary user preferences (without saving)
exports.previewMatches = async (req, res) => {
  try {
    const tempPreferences = req.body;
    
    if (!tempPreferences) {
      return res.status(400).json({ message: 'Preferences are required' });
    }
    
    // Get all neighborhoods
    const neighborhoods = await Neighborhood.find();
    
    // Calculate match scores for each neighborhood
    const matches = neighborhoods.map(neighborhood => {
      const matchScore = calculateMatchScore(tempPreferences, neighborhood);
      
      return {
        neighborhood: {
          _id: neighborhood._id,
          name: neighborhood.name,
          city: neighborhood.city,
          state: neighborhood.state,
          description: neighborhood.description,
          images: neighborhood.images
        },
        matchScore
      };
    });
    
    // Sort matches by percentage (highest first)
    const sortedMatches = matches.sort((a, b) => b.matchScore.percentage - a.matchScore.percentage);
    
    // Return top 10 matches
    res.status(200).json(sortedMatches.slice(0, 10));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};