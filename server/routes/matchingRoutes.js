const express = require('express');
const router = express.Router();
const matchingController = require('../controllers/matchingController');

// GET all neighborhood matches for a user
router.get('/users/:userId', matchingController.getMatches);

// GET top N neighborhood matches for a user
router.get('/users/:userId/top', matchingController.getTopMatches);

// GET match details for a specific neighborhood and user
router.get('/users/:userId/neighborhoods/:neighborhoodId', matchingController.getMatchDetails);

// POST preview matches with temporary preferences
router.post('/preview', matchingController.previewMatches);

module.exports = router;