# NeighborFit

A full-stack web application that solves the neighborhood-lifestyle matching problem through systematic research, data analysis, and algorithmic thinking.

## Project Overview

NeighborFit helps users find neighborhoods that match their lifestyle preferences through data analysis and a matching algorithm. The application collects user preferences, processes neighborhood data, and provides personalized recommendations.

## Tech Stack

### Frontend
- React with Vite
- Tailwind CSS for styling
- React Router for navigation
- Axios for API requests

### Backend
- Node.js with Express
- MongoDB with Mongoose for data storage
- RESTful API architecture

## Features

- **Preference-Based Matching**: Input your lifestyle preferences and get matched with compatible neighborhoods
- **Neighborhood Exploration**: Browse and search neighborhoods with detailed information
- **Match Scoring**: View detailed match scores across different preference categories
- **Responsive Design**: Fully responsive interface that works on desktop and mobile devices
- **User Authentication**: Register, login, and manage your profile
- **Saved Neighborhoods**: Save your favorite neighborhoods for later reference

## Project Structure

```
neighborfit/
├── client/                 # Frontend React application
│   ├── public/             # Static files
│   └── src/                # React source code
│       ├── components/     # Reusable UI components
│       ├── pages/          # Page components
│       └── utils/          # Utility functions
├── server/                 # Backend Node.js application
│   ├── controllers/        # Request handlers
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   └── services/           # Business logic
└── README.md              # Project documentation
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or Atlas)

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/neighborfit.git
   cd neighborfit
   ```

2. Install server dependencies
   ```
   cd server
   npm install
   ```

3. Install client dependencies
   ```
   cd ../client
   npm install
   ```

4. Create a `.env` file in the server directory with the following variables:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   NODE_ENV=development
   JWT_SECRET=your_jwt_secret_key
   ```

### Running the Application

1. Start the server
   ```
   cd server
   npm run dev
   ```

2. Start the client
   ```
   cd ../client
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

### Seeding the Database

To populate the database with sample data:

```bash
cd server
npm run seed
```

To remove all data from the database:

```bash
cd server
npm run seed:delete
```

## Development Approach

- **Problem Analysis & Research (50%)**: Thorough research on neighborhood characteristics and user preferences
- **Technical Problem-Solving (40%)**: Implementing the matching algorithm and data processing
- **Systems Thinking (10%)**: Designing a scalable architecture that can handle growing data

## Constraints

- Zero budget - using only free resources
- 2-week timeline
- Limited data access - creative data acquisition
- Must work with real neighborhood data
- Must be functional (not just mockups)
- Must handle edge cases and data inconsistencies

## API Endpoints

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create a new user
- `PUT /api/users/:id` - Update a user
- `DELETE /api/users/:id` - Delete a user
- `PUT /api/users/:id/preferences` - Update user preferences
- `PUT /api/users/:id/neighborhoods/:neighborhoodId` - Save a neighborhood to favorites
- `DELETE /api/users/:id/neighborhoods/:neighborhoodId` - Remove a neighborhood from favorites

### Neighborhoods
- `GET /api/neighborhoods` - Get all neighborhoods
- `GET /api/neighborhoods/:id` - Get neighborhood by ID
- `POST /api/neighborhoods` - Create a new neighborhood
- `PUT /api/neighborhoods/:id` - Update a neighborhood
- `DELETE /api/neighborhoods/:id` - Delete a neighborhood
- `GET /api/neighborhoods/search` - Search neighborhoods by city or state
- `GET /api/neighborhoods/nearby` - Find neighborhoods near a location
- `GET /api/neighborhoods/filter` - Filter neighborhoods by characteristics

### Matching
- `GET /api/matching/user/:userId` - Get all matches for a user
- `GET /api/matching/user/:userId/top/:n` - Get top N matches for a user
- `GET /api/matching/user/:userId/neighborhood/:neighborhoodId` - Get match details for a specific neighborhood and user
- `POST /api/matching/preview` - Preview matches with temporary preferences

## Future Enhancements

- Saved searches and match history
- Neighborhood reviews and ratings
- Interactive maps for neighborhood exploration
- Real estate listings integration
- Social sharing of neighborhood matches
- Advanced filtering options"# TrueStar-Task" 
