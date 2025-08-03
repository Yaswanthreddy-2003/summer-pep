const mongoose = require('mongoose');

const neighborhoodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  state: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true
    }
  },
  characteristics: {
    lifestyle: {
      active: { type: Number, min: 1, max: 10 },
      familyOriented: { type: Number, min: 1, max: 10 },
      quiet: { type: Number, min: 1, max: 10 },
      social: { type: Number, min: 1, max: 10 },
      urban: { type: Number, min: 1, max: 10 }
    },
    costOfLiving: {
      type: Number, // Average cost index (1-10)
      min: 1,
      max: 10,
      required: true
    },
    safety: {
      type: Number, // Safety rating (1-10)
      min: 1,
      max: 10,
      required: true
    },
    amenities: {
      parks: { type: Number, min: 0, max: 10 },
      schools: { type: Number, min: 0, max: 10 },
      restaurants: { type: Number, min: 0, max: 10 },
      shopping: { type: Number, min: 0, max: 10 },
      nightlife: { type: Number, min: 0, max: 10 },
      publicTransport: { type: Number, min: 0, max: 10 },
      healthcare: { type: Number, min: 0, max: 10 }
    },
    commuteOptions: {
      walkability: { type: Number, min: 1, max: 10 },
      publicTransit: { type: Number, min: 1, max: 10 },
      cycling: { type: Number, min: 1, max: 10 },
      driving: { type: Number, min: 1, max: 10 }
    }
  },
  description: {
    type: String,
    required: true
  },
  images: [{
    type: String, // URLs to neighborhood images
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Create a geospatial index for location-based queries
neighborhoodSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Neighborhood', neighborhoodSchema);