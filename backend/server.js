require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db.js');

// Initialize Express app
const app = express();

// Middleware to parse JSON
app.use(express.json());

// CORS configuration
const corsOptions = {
    origin: process.env.NODE_ENV === 'production'
        ? 'https://your-production-domain.com' // Production frontend domain
        : 'http://localhost:3000', // Frontend URL during development
    credentials: true, // Allow cookies and credentials
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Handle preflight requests (for non-simple CORS requests)
app.options('*', cors(corsOptions));

// Connect to the database
connectDB();

// Import and use routes
const authRoutes = require('./routes/authRoutes.js');
app.use('/api/auth', authRoutes);

// Default route for unmatched routes
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app; // Export app for testing or other purposes