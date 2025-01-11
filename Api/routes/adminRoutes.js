const express = require('express');
const {
  getAllUsers,
  deleteUser,
  getAllProperties,
} = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Admin routes
router.get('/users', protect, getAllUsers);
router.delete('/users/:id', protect, deleteUser);
router.get('/properties', protect, getAllProperties);

module.exports = router;
