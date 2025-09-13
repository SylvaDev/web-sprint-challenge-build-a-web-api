const Projects = require('./projects-model');

// Middleware to validate project data
function validateProject(req, res, next) {
  const { name, description, completed } = req.body;
  
  if (!name || !description) {
    return res.status(400).json({ 
      message: 'Missing required fields: name and description are required' 
    });
  }
  
  if (typeof name !== 'string' || typeof description !== 'string') {
    return res.status(400).json({ 
      message: 'Invalid data types: name and description must be strings' 
    });
  }
  
  // For PUT requests, also require completed field
  if (req.method === 'PUT' && completed === undefined) {
    return res.status(400).json({ 
      message: 'Missing required fields: name, description, and completed are required' 
    });
  }
  
  if (req.method === 'PUT' && typeof completed !== 'boolean') {
    return res.status(400).json({ 
      message: 'Invalid data type: completed must be a boolean' 
    });
  }
  
  next();
}

// Middleware to validate project ID
async function validateProjectId(req, res, next) {
  const { id } = req.params;
  
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ 
      message: 'Invalid project ID: must be a number' 
    });
  }
  
  next();
}

module.exports = {
  validateProject,
  validateProjectId
};
