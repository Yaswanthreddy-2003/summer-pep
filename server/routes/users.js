const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');
const User = require('../models/User');

/**
 * @route   GET /api/users
 * @desc    Get all users
 * @access  Private/Admin
 */
router.get('/', userController.getUsers);

/**
 * @route   GET /api/users/:id
 * @desc    Get user by ID
 * @access  Private
 */
router.get('/:id', userController.getUserById);

/**
 * @route   POST /api/users
 * @desc    Create a new user
 * @access  Public
 */
router.post('/', userController.createUser);

/**
 * @route   PUT /api/users/:id
 * @desc    Update a user
 * @access  Private
 */
router.put('/:id', userController.updateUser);

/**
 * @route   DELETE /api/users/:id
 * @desc    Delete a user
 * @access  Private
 */
router.delete('/:id', userController.deleteUser);

/**
 * @route   PUT /api/users/:id/preferences
 * @desc    Update user preferences
 * @access  Private
 */
router.put('/:id/preferences', userController.updatePreferences);

/**
 * @route   POST /api/users/:id/neighborhoods
 * @desc    Save a neighborhood to user's favorites
 * @access  Private
 */
router.post('/:id/neighborhoods', userController.saveNeighborhood);

/**
 * @route   DELETE /api/users/:id/neighborhoods
 * @desc    Remove a neighborhood from user's favorites
 * @access  Private
 */
router.delete('/:id/neighborhoods', userController.removeNeighborhood);

/**
 * @route   POST /api/users/register
 * @desc    Register a new user
 * @access  Public
 */
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    // Add validation and hashing here!
    const user = new User({ email, password });
    await user.save();
    res.status(201).json({ message: 'User created' });
  } catch (error) {
    res.status(400).json({ error: 'Registration failed' });
  }
});

module.exports = router;