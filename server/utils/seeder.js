const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Neighborhood = require('../models/Neighborhood');
const User = require('../models/User');
require('dotenv').config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/neighborfit';
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Sample neighborhood data
const neighborhoods = [
  {
    name: 'Downtown',
    city: 'Austin',
    state: 'TX',
    location: {
      type: 'Point',
      coordinates: [-97.7431, 30.2672]
    },
    characteristics: {
      lifestyle: {
        active: 8,
        familyOriented: 4,
        quiet: 3,
        social: 9,
        urban: 10
      },
      costOfLiving: 8,
      safety: 7,
      amenities: {
        parks: 6,
        schools: 5,
        restaurants: 10,
        shopping: 9,
        nightlife: 10,
        publicTransport: 8,
        healthcare: 7
      },
      commuteOptions: {
        walkability: 9,
        publicTransit: 8,
        cycling: 7,
        driving: 5
      }
    },
    description: 'Vibrant downtown area with excellent nightlife and dining options.',
    images: [
      'https://images.unsplash.com/photo-1531218150217-54595bc2b934',
      'https://images.unsplash.com/photo-1449824913935-59a10b8d2000'
    ]
  },
  {
    name: 'South Congress',
    city: 'Austin',
    state: 'TX',
    location: {
      type: 'Point',
      coordinates: [-97.7511, 30.2451]
    },
    characteristics: {
      lifestyle: {
        active: 7,
        familyOriented: 6,
        quiet: 5,
        social: 8,
        urban: 7
      },
      costOfLiving: 7,
      safety: 8,
      amenities: {
        parks: 7,
        schools: 6,
        restaurants: 9,
        shopping: 8,
        nightlife: 8,
        publicTransport: 6,
        healthcare: 6
      },
      commuteOptions: {
        walkability: 8,
        publicTransit: 6,
        cycling: 8,
        driving: 6
      }
    },
    description: 'Trendy neighborhood with unique shops, restaurants, and a great view of downtown.',
    images: [
      'https://images.unsplash.com/photo-1517637633369-e7a280b2c456',
      'https://images.unsplash.com/photo-1518156677180-95a2893f3499'
    ]
  },
  {
    name: 'Hyde Park',
    city: 'Austin',
    state: 'TX',
    location: {
      type: 'Point',
      coordinates: [-97.7311, 30.3051]
    },
    characteristics: {
      lifestyle: {
        active: 6,
        familyOriented: 8,
        quiet: 8,
        social: 6,
        urban: 5
      },
      costOfLiving: 6,
      safety: 9,
      amenities: {
        parks: 8,
        schools: 9,
        restaurants: 7,
        shopping: 6,
        nightlife: 5,
        publicTransport: 7,
        healthcare: 8
      },
      commuteOptions: {
        walkability: 7,
        publicTransit: 7,
        cycling: 8,
        driving: 7
      }
    },
    description: 'Historic neighborhood with tree-lined streets, beautiful homes, and a strong sense of community.',
    images: [
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750'
    ]
  },
  {
    name: 'East Austin',
    city: 'Austin',
    state: 'TX',
    location: {
      type: 'Point',
      coordinates: [-97.7111, 30.2672]
    },
    characteristics: {
      lifestyle: {
        active: 7,
        familyOriented: 5,
        quiet: 4,
        social: 9,
        urban: 8
      },
      costOfLiving: 5,
      safety: 6,
      amenities: {
        parks: 6,
        schools: 5,
        restaurants: 8,
        shopping: 6,
        nightlife: 9,
        publicTransport: 6,
        healthcare: 5
      },
      commuteOptions: {
        walkability: 7,
        publicTransit: 6,
        cycling: 8,
        driving: 7
      }
    },
    description: 'Up-and-coming area with a vibrant arts scene, diverse food options, and a mix of old and new.',
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750',
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be'
    ]
  },
  {
    name: 'Barton Hills',
    city: 'Austin',
    state: 'TX',
    location: {
      type: 'Point',
      coordinates: [-97.7811, 30.2451]
    },
    characteristics: {
      lifestyle: {
        active: 9,
        familyOriented: 7,
        quiet: 7,
        social: 6,
        urban: 4
      },
      costOfLiving: 7,
      safety: 9,
      amenities: {
        parks: 10,
        schools: 8,
        restaurants: 6,
        shopping: 5,
        nightlife: 4,
        publicTransport: 5,
        healthcare: 7
      },
      commuteOptions: {
        walkability: 6,
        publicTransit: 5,
        cycling: 7,
        driving: 8
      }
    },
    description: 'Beautiful neighborhood near Zilker Park and Barton Springs with excellent outdoor recreation options.',
    images: [
      'https://images.unsplash.com/photo-1565953554309-d181306db7b5',
      'https://images.unsplash.com/photo-1573599852326-2d4da0bbe613'
    ]
  }
];

// Sample user data
const users = [
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    preferences: {
      lifestyle: 'active',
      budget: 5000,
      commute: 30,
      amenities: ['parks', 'restaurants', 'nightlife'],
      safety: 7
    }
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password123',
    preferences: {
      lifestyle: 'family-oriented',
      budget: 7000,
      commute: 20,
      amenities: ['parks', 'schools', 'healthcare'],
      safety: 9
    }
  },
  {
    name: 'Bob Johnson',
    email: 'bob@example.com',
    password: 'password123',
    preferences: {
      lifestyle: 'urban',
      budget: 4000,
      commute: 15,
      amenities: ['restaurants', 'shopping', 'nightlife', 'public_transport'],
      safety: 6
    }
  }
];

// Import data into DB
const importData = async () => {
  try {
    // Clear existing data
    await Neighborhood.deleteMany();
    await User.deleteMany();
    
    // Insert neighborhoods
    await Neighborhood.insertMany(neighborhoods);
    
    // Insert users with hashed passwords
    const hashedUsers = await Promise.all(
      users.map(async (user) => {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        return user;
      })
    );
    
    await User.insertMany(hashedUsers);
    
    console.log('Data imported successfully');
    process.exit();
  } catch (error) {
    console.error('Error importing data:', error);
    process.exit(1);
  }
};

// Delete all data from DB
const deleteData = async () => {
  try {
    await Neighborhood.deleteMany();
    await User.deleteMany();
    
    console.log('Data deleted successfully');
    process.exit();
  } catch (error) {
    console.error('Error deleting data:', error);
    process.exit(1);
  }
};

// Connect to database
connectDB().then(() => {
  // Check command line arguments
  if (process.argv[2] === '-i') {
    importData();
  } else if (process.argv[2] === '-d') {
    deleteData();
  } else {
    console.log('Please use -i to import data or -d to delete data');
    process.exit();
  }
});