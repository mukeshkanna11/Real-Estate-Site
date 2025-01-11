const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const agentRoutes = require('./routes/agentRoutes');
const propertyRoutes = require('./routes/propertyRoutes'); // Import property routes

// Load environment variables
dotenv.config();

// Display a custom pre-start message
console.log('🔄 Starting the server...');

// Initialize Express App
const app = express();

// Connect to MongoDB
connectDB();

// Middleware for JSON Parsing
app.use(express.json());

// Register Routes
app.use('/api/auth', authRoutes); // Auth routes
app.use('/api/admin', adminRoutes); // Admin routes
app.use('/api/agent', agentRoutes); // Agent routes
app.use('/api/properties', propertyRoutes); // Properties routes

// Error Handling Middleware
app.use((err, req, res, next) => {
  const statusCode = res.statusCode || 500;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack, // Hide stack trace in production
  });
});

// Server Initialization
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running at: http://0.0.0.0:${PORT}`);
});
