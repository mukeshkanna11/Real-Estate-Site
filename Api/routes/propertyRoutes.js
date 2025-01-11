const express = require('express');
const {
  createProperty,
  getProperties,
  getPropertyById,
  updateProperty,
  deleteProperty
} = require('../controllers/propertyController');

const router = express.Router();

// Define the routes for properties
router.get('/', getProperties);  // GET all properties
router.post('/', createProperty);  // POST to create a new property
router.get('/:id', getPropertyById);  // GET a single property by ID
router.put('/:id', updateProperty);  // PUT to update a property by ID
router.delete('/:id', deleteProperty);  // DELETE to remove a property by ID

module.exports = router;
