const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors'); // Import CORS package

const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const agentRoutes = require('./routes/agentRoutes');
const propertyRoutes = require('./routes/propertyRoutes');

// Load environment variables
dotenv.config();

// Display a custom pre-start message
console.log('🔄 Starting the server...');

// Initialize Express App
const app = express();

// CORS Middleware to allow all origins (or specify specific domains)
app.use(cors({
  origin: 'http://localhost:5173', // Allow only the specific frontend origin
  methods: 'GET,POST,PUT,DELETE', // Allow specific methods
  credentials: true, // If you are sending cookies or authentication headers
}));

// Connect to MongoDB
connectDB();

// Middleware for JSON Parsing
app.use(express.json());

// Register API Routes
app.use('/api/auth', authRoutes); // Auth routes
app.use('/api/admin', adminRoutes); // Admin routes
app.use('/api/agent', agentRoutes); // Agent routes
app.use('/api/properties', propertyRoutes); // Properties routes

// Default route for backend-only
app.get('/', (req, res) => {
  res.send('API is running...');
});

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
