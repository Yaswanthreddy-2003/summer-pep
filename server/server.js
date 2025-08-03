const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import routes
const userRoutes = require('./routes/userRoutes');
const neighborhoodRoutes = require('./routes/neighborhoodRoutes');
const matchingRoutes = require('./routes/matchingRoutes');
const authRoutes = require('./routes/auth');

// Initialize express app
const app = express();

// Middleware
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:8000', 
  'http://localhost:8001',
  'http://localhost:8002',
  'https://summer-pep-xnka.vercel.app', // main frontend URL
  'https://summer-pep-xnka-ln4ue21x6-yaswanthreddy-2003s-projects.vercel.app', // current deployment URL
  'https://summer-pep-qoz3.vercel.app'  // backup URL
];

// More flexible CORS for Vercel deployments
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Check if origin is in allowed list
    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    }
    
    // Allow any subdomain of vercel.app for your project
    if (origin.includes('summer-pep') && origin.includes('vercel.app')) {
      return callback(null, true);
    }
    
    // Reject other origins
    const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
    return callback(new Error(msg), false);
  },
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/neighborfit';
mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/neighborhoods', neighborhoodRoutes);
app.use('/api/matching', matchingRoutes);
app.use('/api/auth', authRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('NeighborFit API is running');
});

// Health check route
app.get('/api/health', async (req, res) => {
  try {
    // Check database connection
    const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
    
    // Test a simple database query
    await mongoose.connection.db.admin().ping();
    
    res.json({
      status: 'OK',
      database: dbStatus,
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development'
    });
  } catch (error) {
    console.error('Health check failed:', error);
    res.status(500).json({
      status: 'ERROR',
      database: 'error',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Start server only if not in a serverless environment
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export the app for serverless deployment (Vercel)
module.exports = app;
