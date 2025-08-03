# TrueStar API Documentation

This document provides detailed information about the TrueStar API endpoints, request/response formats, and authentication requirements.

## Base URL

```
http://localhost:5000/api
```

## Authentication

Many endpoints require authentication. To authenticate, include a JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

You can obtain a token by registering or logging in using the authentication endpoints.

## API Endpoints

### Authentication

#### Register a new user

```
POST /auth/register
```

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "preferences": {},
    "savedNeighborhoods": []
  }
}
```

#### Login

```
POST /auth/login
```

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "preferences": {},
    "savedNeighborhoods": []
  }
}
```

#### Get current user

```
GET /auth/me
```

**Headers:**

```
Authorization: Bearer <your_jwt_token>
```

**Response:**

```json
{
  "id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "preferences": {
    "lifestyle": "active",
    "budget": 5000,
    "commute": 30,
    "amenities": ["parks", "restaurants"],
    "safety": 7
  },
  "savedNeighborhoods": []
}
```

### Users

#### Get all users

```
GET /users
```

**Response:**

```json
[
  {
    "id": "user_id_1",
    "name": "John Doe",
    "email": "john@example.com"
  },
  {
    "id": "user_id_2",
    "name": "Jane Smith",
    "email": "jane@example.com"
  }
]
```

#### Get user by ID

```
GET /users/:id
```

**Response:**

```json
{
  "id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "preferences": {
    "lifestyle": "active",
    "budget": 5000,
    "commute": 30,
    "amenities": ["parks", "restaurants"],
    "safety": 7
  },
  "savedNeighborhoods": []
}
```

#### Update user preferences

```
PUT /users/:id/preferences
```

**Request Body:**

```json
{
  "lifestyle": "urban",
  "budget": 6000,
  "commute": 20,
  "amenities": ["restaurants", "nightlife", "public_transport"],
  "safety": 6
}
```

**Response:**

```json
{
  "id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "preferences": {
    "lifestyle": "urban",
    "budget": 6000,
    "commute": 20,
    "amenities": ["restaurants", "nightlife", "public_transport"],
    "safety": 6
  },
  "savedNeighborhoods": []
}
```

#### Save neighborhood to favorites

```
POST /users/:id/neighborhoods
```

**Request Body:**

```json
{
  "neighborhoodId": "neighborhood_id"
}
```

**Response:**

```json
{
  "id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "preferences": {
    "lifestyle": "urban",
    "budget": 6000,
    "commute": 20,
    "amenities": ["restaurants", "nightlife", "public_transport"],
    "safety": 6
  },
  "savedNeighborhoods": ["neighborhood_id"]
}
```

#### Remove neighborhood from favorites

```
DELETE /users/:id/neighborhoods
```

**Request Body:**

```json
{
  "neighborhoodId": "neighborhood_id"
}
```

**Response:**

```json
{
  "id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "preferences": {
    "lifestyle": "urban",
    "budget": 6000,
    "commute": 20,
    "amenities": ["restaurants", "nightlife", "public_transport"],
    "safety": 6
  },
  "savedNeighborhoods": []
}
```

### Neighborhoods

#### Get all neighborhoods

```
GET /neighborhoods
```

**Response:**

```json
[
  {
    "id": "neighborhood_id_1",
    "name": "Downtown",
    "city": "Austin",
    "state": "TX",
    "characteristics": {
      "lifestyle": {
        "active": 8,
        "familyOriented": 4,
        "quiet": 3,
        "social": 9,
        "urban": 10
      },
      "costOfLiving": 8,
      "safety": 7,
      "amenities": {
        "parks": 6,
        "schools": 5,
        "restaurants": 10,
        "shopping": 9,
        "nightlife": 10,
        "publicTransport": 8,
        "healthcare": 7
      }
    }
  },
  {
    "id": "neighborhood_id_2",
    "name": "South Congress",
    "city": "Austin",
    "state": "TX",
    "characteristics": {
      "lifestyle": {
        "active": 7,
        "familyOriented": 6,
        "quiet": 5,
        "social": 8,
        "urban": 7
      },
      "costOfLiving": 7,
      "safety": 8,
      "amenities": {
        "parks": 7,
        "schools": 6,
        "restaurants": 9,
        "shopping": 8,
        "nightlife": 8,
        "publicTransport": 6,
        "healthcare": 6
      }
    }
  }
]
```

#### Get neighborhood by ID

```
GET /neighborhoods/:id
```

**Response:**

```json
{
  "id": "neighborhood_id",
  "name": "Downtown",
  "city": "Austin",
  "state": "TX",
  "characteristics": {
    "lifestyle": {
      "active": 8,
      "familyOriented": 4,
      "quiet": 3,
      "social": 9,
      "urban": 10
    },
    "costOfLiving": 8,
    "safety": 7,
    "amenities": {
      "parks": 6,
      "schools": 5,
      "restaurants": 10,
      "shopping": 9,
      "nightlife": 10,
      "publicTransport": 8,
      "healthcare": 7
    }
  },
  "description": "Vibrant downtown area with excellent nightlife and dining options.",
  "images": [
    "https://images.unsplash.com/photo-1531218150217-54595bc2b934",
    "https://images.unsplash.com/photo-1449824913935-59a10b8d2000"
  ]
}
```

#### Search neighborhoods

```
GET /neighborhoods/search?query=austin
```

**Response:**

```json
[
  {
    "id": "neighborhood_id_1",
    "name": "Downtown",
    "city": "Austin",
    "state": "TX"
  },
  {
    "id": "neighborhood_id_2",
    "name": "South Congress",
    "city": "Austin",
    "state": "TX"
  }
]
```

#### Find nearby neighborhoods

```
GET /neighborhoods/nearby?longitude=-97.7431&latitude=30.2672&maxDistance=10
```

**Response:**

```json
[
  {
    "id": "neighborhood_id_1",
    "name": "Downtown",
    "city": "Austin",
    "state": "TX",
    "location": {
      "type": "Point",
      "coordinates": [-97.7431, 30.2672]
    }
  },
  {
    "id": "neighborhood_id_2",
    "name": "South Congress",
    "city": "Austin",
    "state": "TX",
    "location": {
      "type": "Point",
      "coordinates": [-97.7511, 30.2451]
    }
  }
]
```

#### Filter neighborhoods

```
GET /neighborhoods/filter?lifestyle=active&costOfLiving=7&safety=8&amenities=parks,restaurants
```

**Response:**

```json
[
  {
    "id": "neighborhood_id_2",
    "name": "South Congress",
    "city": "Austin",
    "state": "TX",
    "characteristics": {
      "lifestyle": {
        "active": 7,
        "familyOriented": 6,
        "quiet": 5,
        "social": 8,
        "urban": 7
      },
      "costOfLiving": 7,
      "safety": 8,
      "amenities": {
        "parks": 7,
        "restaurants": 9
      }
    }
  }
]
```

### Matching

#### Get all matches for a user

```
GET /matching/users/:userId
```

**Response:**

```json
[
  {
    "neighborhood": {
      "_id": "neighborhood_id_1",
      "name": "Downtown",
      "city": "Austin",
      "state": "TX"
    },
    "matchScore": {
      "percentage": 85,
      "breakdown": {
        "lifestyle": 80,
        "budget": 70,
        "safety": 90,
        "amenities": 100
      }
    }
  },
  {
    "neighborhood": {
      "_id": "neighborhood_id_2",
      "name": "South Congress",
      "city": "Austin",
      "state": "TX"
    },
    "matchScore": {
      "percentage": 75,
      "breakdown": {
        "lifestyle": 70,
        "budget": 80,
        "safety": 80,
        "amenities": 70
      }
    }
  }
]
```

#### Get top matches for a user

```
GET /matching/users/:userId/top?limit=3
```

**Response:**

```json
[
  {
    "neighborhood": {
      "_id": "neighborhood_id_1",
      "name": "Downtown",
      "city": "Austin",
      "state": "TX"
    },
    "matchScore": {
      "percentage": 85,
      "breakdown": {
        "lifestyle": 80,
        "budget": 70,
        "safety": 90,
        "amenities": 100
      }
    }
  },
  {
    "neighborhood": {
      "_id": "neighborhood_id_2",
      "name": "South Congress",
      "city": "Austin",
      "state": "TX"
    },
    "matchScore": {
      "percentage": 75,
      "breakdown": {
        "lifestyle": 70,
        "budget": 80,
        "safety": 80,
        "amenities": 70
      }
    }
  },
  {
    "neighborhood": {
      "_id": "neighborhood_id_3",
      "name": "Hyde Park",
      "city": "Austin",
      "state": "TX"
    },
    "matchScore": {
      "percentage": 70,
      "breakdown": {
        "lifestyle": 60,
        "budget": 90,
        "safety": 90,
        "amenities": 40
      }
    }
  }
]
```

#### Get match details for a specific neighborhood and user

```
GET /matching/users/:userId/neighborhoods/:neighborhoodId
```

**Response:**

```json
{
  "user": {
    "_id": "user_id",
    "name": "John Doe",
    "preferences": {
      "lifestyle": "active",
      "budget": 5000,
      "commute": 30,
      "amenities": ["parks", "restaurants"],
      "safety": 7
    }
  },
  "neighborhood": {
    "_id": "neighborhood_id",
    "name": "Downtown",
    "city": "Austin",
    "state": "TX",
    "characteristics": {
      "lifestyle": {
        "active": 8,
        "familyOriented": 4,
        "quiet": 3,
        "social": 9,
        "urban": 10
      },
      "costOfLiving": 8,
      "safety": 7,
      "amenities": {
        "parks": 6,
        "restaurants": 10
      }
    }
  },
  "matchScore": {
    "percentage": 85,
    "breakdown": {
      "lifestyle": 80,
      "budget": 70,
      "safety": 90,
      "amenities": 100
    }
  }
}
```

#### Preview matches with temporary preferences

```
POST /matching/preview
```

**Request Body:**

```json
{
  "lifestyle": "urban",
  "budget": 6000,
  "commute": 20,
  "amenities": ["restaurants", "nightlife", "public_transport"],
  "safety": 6
}
```

**Response:**

```json
[
  {
    "neighborhood": {
      "_id": "neighborhood_id_1",
      "name": "Downtown",
      "city": "Austin",
      "state": "TX"
    },
    "matchScore": {
      "percentage": 90,
      "breakdown": {
        "lifestyle": 100,
        "budget": 80,
        "safety": 80,
        "amenities": 100
      }
    }
  },
  {
    "neighborhood": {
      "_id": "neighborhood_id_4",
      "name": "East Austin",
      "city": "Austin",
      "state": "TX"
    },
    "matchScore": {
      "percentage": 85,
      "breakdown": {
        "lifestyle": 80,
        "budget": 100,
        "safety": 70,
        "amenities": 90
      }
    }
  }
]
```

## Error Responses

All endpoints return appropriate HTTP status codes:

- `200 OK`: Request succeeded
- `201 Created`: Resource created successfully
- `400 Bad Request`: Invalid request parameters
- `401 Unauthorized`: Authentication required or failed
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error

Error responses include a message field:

```json
{
  "message": "Error message here"
}
```