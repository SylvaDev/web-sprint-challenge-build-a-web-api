const express = require('express');
const helmet = require('helmet');
const server = express();

// Import routers
const projectsRouter = require('./projects/projects-router');

// Global middleware
server.use(helmet());
server.use(express.json());

// Routes
server.use('/api/projects', projectsRouter);

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

module.exports = server;
