const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// GET all users
router.get('/', userController.getUsers);

// GET a single user by ID
router.get('/:id', userController.getUserById);

// POST create a new user
router.post('/', userController.createUser);

// PUT update a user
router.put('/:id', userController.updateUser);

// DELETE a user
router.delete('/:id', userController.deleteUser);

// PUT update user preferences
router.put('/:id/preferences', userController.updatePreferences);

// POST save a neighborhood to favorites
router.post('/:id/neighborhoods', userController.saveNeighborhood);

// DELETE remove a neighborhood from favorites
router.delete('/:id/neighborhoods', userController.removeNeighborhood);

module.exports = router;