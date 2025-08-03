const express = require('express');
const router = express.Router();
const neighborhoodController = require('../controllers/neighborhoodController');
const auth = require('../middleware/auth');

/**
 * @route   GET /api/neighborhoods
 * @desc    Get all neighborhoods
 * @access  Public
 */
router.get('/', neighborhoodController.getNeighborhoods);

/**
 * @route   GET /api/neighborhoods/:id
 * @desc    Get neighborhood by ID
 * @access  Public
 */
router.get('/:id', neighborhoodController.getNeighborhoodById);

/**
 * @route   POST /api/neighborhoods
 * @desc    Create a new neighborhood
 * @access  Private/Admin
 */
router.post('/', neighborhoodController.createNeighborhood);

/**
 * @route   PUT /api/neighborhoods/:id
 * @desc    Update a neighborhood
 * @access  Private/Admin
 */
router.put('/:id', neighborhoodController.updateNeighborhood);

/**
 * @route   DELETE /api/neighborhoods/:id
 * @desc    Delete a neighborhood
 * @access  Private/Admin
 */
router.delete('/:id', neighborhoodController.deleteNeighborhood);

/**
 * @route   GET /api/neighborhoods/search
 * @desc    Search neighborhoods by query
 * @access  Public
 */
router.get('/search', neighborhoodController.searchNeighborhoods);

/**
 * @route   GET /api/neighborhoods/nearby
 * @desc    Find neighborhoods near a location
 * @access  Public
 */
router.get('/nearby', neighborhoodController.findNearbyNeighborhoods);

/**
 * @route   GET /api/neighborhoods/filter
 * @desc    Filter neighborhoods by characteristics
 * @access  Public
 */
router.get('/filter', neighborhoodController.filterNeighborhoods);

module.exports = router;