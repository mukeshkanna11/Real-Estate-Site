// File: models/Property.js
const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String, // Assuming type is a string (e.g., 'house', 'apartment')
      required: true, // Makes the type field required
    },
    price: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    // Other fields...
  },
  {
    timestamps: true, // Optional: to keep track of creation and updates
  }
);

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;
