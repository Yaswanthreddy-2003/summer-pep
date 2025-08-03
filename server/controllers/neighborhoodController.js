const Neighborhood = require('../models/Neighborhood');

// Get all neighborhoods
exports.getNeighborhoods = async (req, res) => {
  try {
    const neighborhoods = await Neighborhood.find().select('-__v');
    res.status(200).json(neighborhoods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single neighborhood by ID
exports.getNeighborhoodById = async (req, res) => {
  try {
    const neighborhood = await Neighborhood.findById(req.params.id).select('-__v');
    if (!neighborhood) {
      return res.status(404).json({ message: 'Neighborhood not found' });
    }
    res.status(200).json(neighborhood);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new neighborhood
exports.createNeighborhood = async (req, res) => {
  try {
    const newNeighborhood = new Neighborhood(req.body);
    const savedNeighborhood = await newNeighborhood.save();
    res.status(201).json(savedNeighborhood);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a neighborhood
exports.updateNeighborhood = async (req, res) => {
  try {
    const updatedNeighborhood = await Neighborhood.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedNeighborhood) {
      return res.status(404).json({ message: 'Neighborhood not found' });
    }
    res.status(200).json(updatedNeighborhood);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a neighborhood
exports.deleteNeighborhood = async (req, res) => {
  try {
    const deletedNeighborhood = await Neighborhood.findByIdAndDelete(req.params.id);
    if (!deletedNeighborhood) {
      return res.status(404).json({ message: 'Neighborhood not found' });
    }
    res.status(200).json({ message: 'Neighborhood deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search neighborhoods by city or state
exports.searchNeighborhoods = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ message: 'Search query is required' });
    }
    
    const neighborhoods = await Neighborhood.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { city: { $regex: query, $options: 'i' } },
        { state: { $regex: query, $options: 'i' } }
      ]
    }).select('-__v');
    
    res.status(200).json(neighborhoods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Find neighborhoods near a location
exports.findNearbyNeighborhoods = async (req, res) => {
  try {
    const { longitude, latitude, maxDistance } = req.query;
    
    if (!longitude || !latitude) {
      return res.status(400).json({ message: 'Longitude and latitude are required' });
    }
    
    // Convert maxDistance from kilometers to meters (MongoDB uses meters)
    const distance = maxDistance ? Number(maxDistance) * 1000 : 10000; // Default 10km
    
    const neighborhoods = await Neighborhood.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [Number(longitude), Number(latitude)]
          },
          $maxDistance: distance
        }
      }
    }).select('-__v');
    
    res.status(200).json(neighborhoods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Filter neighborhoods by characteristics
exports.filterNeighborhoods = async (req, res) => {
  try {
    const { lifestyle, costOfLiving, safety, amenities } = req.query;
    
    let query = {};
    
    // Add filters based on provided parameters
    if (lifestyle) {
      query['characteristics.lifestyle.' + lifestyle] = { $gte: 7 }; // High score for the lifestyle
    }
    
    if (costOfLiving) {
      query['characteristics.costOfLiving'] = { $lte: Number(costOfLiving) };
    }
    
    if (safety) {
      query['characteristics.safety'] = { $gte: Number(safety) };
    }
    
    if (amenities) {
      const amenitiesList = amenities.split(',');
      amenitiesList.forEach(amenity => {
        query['characteristics.amenities.' + amenity] = { $gte: 7 }; // High score for the amenity
      });
    }
    
    const neighborhoods = await Neighborhood.find(query).select('-__v');
    
    res.status(200).json(neighborhoods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};