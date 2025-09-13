const Actions = require('./actions-model');
const Projects = require('../projects/projects-model');

// Middleware to validate action data
function validateAction(req, res, next) {
  const { project_id, description, notes, completed } = req.body;
  
  if (!project_id || !description || !notes) {
    return res.status(400).json({ 
      message: 'Missing required fields: project_id, description, and notes are required' 
    });
  }
  
  if (typeof project_id !== 'number' || typeof description !== 'string' || typeof notes !== 'string') {
    return res.status(400).json({ 
      message: 'Invalid data types: project_id must be a number, description and notes must be strings' 
    });
  }
  
  if (description.length > 128) {
    return res.status(400).json({ 
      message: 'Description must be 128 characters or less' 
    });
  }
  
  // For PUT requests, also require completed field
  if (req.method === 'PUT' && completed === undefined) {
    return res.status(400).json({ 
      message: 'Missing required fields: project_id, description, notes, and completed are required' 
    });
  }
  
  if (req.method === 'PUT' && typeof completed !== 'boolean') {
    return res.status(400).json({ 
      message: 'Invalid data type: completed must be a boolean' 
    });
  }
  
  next();
}

// Middleware to validate action ID
function validateActionId(req, res, next) {
  const { id } = req.params;
  
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ 
      message: 'Invalid action ID: must be a number' 
    });
  }
  
  next();
}

// Middleware to validate that project_id exists
async function validateProjectId(req, res, next) {
  const { project_id } = req.body;
  
  try {
    const project = await Projects.get(project_id);
    if (!project) {
      return res.status(400).json({ 
        message: 'Invalid project_id: project does not exist' 
      });
    }
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  validateAction,
  validateActionId,
  validateProjectId
};
