const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assuming you have a User model

// Protect middleware for authenticated routes
const protect = async (req, res, next) => {
  let token;

  // Check if the request has authorization header with 'Bearer' token
  if (
    req.headers.authorization && 
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Extract token from header
      token = req.headers.authorization.split(' ')[1];

      // Decode the token and verify it
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find user from token and attach user info to the request object (excluding password)
      req.user = await User.findById(decoded.userId).select('-password');

      // Proceed to the next middleware
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  // If no token is found in the request
  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// Admin middleware to check if user is an admin
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    // If user is an admin, proceed to the next middleware/route handler
    next();
  } else {
    // If user is not an admin, respond with an error
    res.status(403).json({ message: 'Not authorized as an admin' });
  }
};

module.exports = { protect, isAdmin };
