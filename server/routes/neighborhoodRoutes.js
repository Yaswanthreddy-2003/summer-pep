const express = require('express');
const router = express.Router();
const neighborhoodController = require('../controllers/neighborhoodController');

// GET all neighborhoods
router.get('/', neighborhoodController.getNeighborhoods);

// GET a single neighborhood by ID
router.get('/:id', neighborhoodController.getNeighborhoodById);

// POST create a new neighborhood
router.post('/', neighborhoodController.createNeighborhood);

// PUT update a neighborhood
router.put('/:id', neighborhoodController.updateNeighborhood);

// DELETE a neighborhood
router.delete('/:id', neighborhoodController.deleteNeighborhood);

// GET search neighborhoods by name, city, or state
router.get('/search', neighborhoodController.searchNeighborhoods);

// GET find neighborhoods near a location
router.get('/nearby', neighborhoodController.findNearbyNeighborhoods);

// GET filter neighborhoods by characteristics
router.get('/filter', neighborhoodController.filterNeighborhoods);

module.exports = router;