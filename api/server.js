const express = require('express');
const helmet = require('helmet');
const server = express();

// Import routers
const projectsRouter = require('./projects/projects-router');
const actionsRouter = require('./actions/actions-router');

// Global middleware
server.use(helmet());
server.use(express.json());

// Routes
server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);

// Global error handling middleware
server.use((err, req, res, next) => {
  console.error('Error:', err);
  
  // Handle specific error types
  if (err.code === 'SQLITE_CONSTRAINT') {
    return res.status(400).json({
      message: 'Database constraint violation',
      error: err.message
    });
  }
  
  if (err.code === 'SQLITE_ERROR') {
    return res.status(500).json({
      message: 'Database error',
      error: err.message
    });
  }
  
  // Default error response
  res.status(500).json({
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
  
  // Call next to continue error handling chain if needed
  next();
});

// 404 handler for undefined routes
server.use('*', (req, res) => {
  res.status(404).json({
    message: 'Route not found'
  });
});

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

module.exports = server;
