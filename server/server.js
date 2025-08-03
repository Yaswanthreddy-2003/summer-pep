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
console.log('🔗 Attempting MongoDB connection...');
console.log('📍 MONGO_URI exists:', !!process.env.MONGO_URI);
console.log('🌍 NODE_ENV:', process.env.NODE_ENV);

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB successfully');
    console.log('📊 Connection state:', mongoose.connection.readyState);
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    console.error('🔍 Full error:', err);
  });

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
    // Check database connection status
    const dbState = mongoose.connection.readyState;
    const dbStateText = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting'
    }[dbState] || 'unknown';
    
    // Check environment variables
    const envCheck = {
      mongoUriExists: !!process.env.MONGO_URI,
      jwtSecretExists: !!process.env.JWT_SECRET,
      nodeEnv: process.env.NODE_ENV || 'not_set'
    };
    
    let dbPingResult = null;
    if (dbState === 1 && mongoose.connection.db) {
      // Only ping if connected and db object exists
      try {
        await mongoose.connection.db.admin().ping();
        dbPingResult = 'success';
      } catch (pingError) {
        dbPingResult = `ping_failed: ${pingError.message}`;
      }
    } else {
      dbPingResult = 'not_connected';
    }
    
    const isHealthy = dbState === 1 && dbPingResult === 'success';
    
    res.status(isHealthy ? 200 : 500).json({
      status: isHealthy ? 'OK' : 'ERROR',
      database: {
        state: dbStateText,
        stateCode: dbState,
        ping: dbPingResult
      },
      environment: envCheck,
      timestamp: new Date().toISOString(),
      mongoUri: process.env.MONGO_URI ? 'SET' : 'NOT_SET'
    });
  } catch (error) {
    console.error('Health check failed:', error);
    res.status(500).json({
      status: 'ERROR',
      database: 'health_check_error',
      error: error.message,
      timestamp: new Date().toISOString(),
      mongoUri: process.env.MONGO_URI ? 'SET' : 'NOT_SET'
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
