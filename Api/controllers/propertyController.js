const Property = require('../models/Property'); // Assuming your Property model is in this file

// Create a new property
exports.createProperty = async (req, res) => {
  const { name, type, price, location } = req.body;

  // Validate input fields
  if (!name || !type || !price || !location) {
    return res.status(400).json({ message: 'All fields are required: name, type, price, and location.' });
  }

  try {
    const newProperty = new Property({ name, type, price, location });
    await newProperty.save();
    res.status(201).json({
      message: 'Property created successfully',
      property: newProperty
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating property',
      error: error.message || error
    });
  }
};

// Get all properties
exports.getProperties = async (req, res) => {
  try {
    const properties = await Property.find(); // Fetch all properties
    if (!properties || properties.length === 0) {
      return res.status(404).json({ message: 'No properties found' });
    }
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching properties',
      error: error.message || error
    });
  }
};

// Get a property by ID
exports.getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching property',
      error: error.message || error
    });
  }
};

// Update a property by ID
exports.updateProperty = async (req, res) => {
  try {
    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Return the updated document
    );
    if (!updatedProperty) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.status(200).json(updatedProperty);
  } catch (error) {
    res.status(500).json({
      message: 'Error updating property',
      error: error.message || error
    });
  }
};

// Delete a property by ID
exports.deleteProperty = async (req, res) => {
  try {
    const deletedProperty = await Property.findByIdAndDelete(req.params.id);
    if (!deletedProperty) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.status(200).json({ message: 'Property deleted successfully' });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting property',
      error: error.message || error
    });
  }
};
