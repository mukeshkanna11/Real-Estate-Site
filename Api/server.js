const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); // Ensure this connects to MongoDB correctly
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const agentRoutes = require('./routes/agentRoutes');
const propertyRoutes = require('./routes/propertyRoutes'); // Import property routes
const path = require('path');

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

// Register API Routes
app.use('/api/auth', authRoutes); // Auth routes
app.use('/api/admin', adminRoutes); // Admin routes
app.use('/api/agent', agentRoutes); // Agent routes
app.use('/api/properties', propertyRoutes); // Properties routes

// Serve Frontend in Production
if (process.env.NODE_ENV === 'production') {
  const staticPath = path.join(__dirname, 'frontend/build');
  app.use(express.static(staticPath));

  // Catch-all route to serve React app
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(staticPath, 'index.html'));
  });
} else {
  // Default route for development
  app.get('/', (req, res) => {
    res.send('API is running...');
  });
}

// Error Handling Middleware
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack, // Hide stack trace in production
  });
});

// Server Initialization
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running on port: ${PORT}`);
});
