const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  // Store preferences as a simple mixed type
  preferences: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  savedNeighborhoods: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Neighborhood'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);