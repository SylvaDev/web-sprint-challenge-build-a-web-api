const express = require('express');
const router = express.Router();
const Projects = require('./projects-model');
const { validateProject, validateProjectId } = require('./projects-middleware');

// GET /api/projects
router.get('/', async (req, res, next) => {
  try {
    const projects = await Projects.get();
    res.json(projects);
  } catch (err) {
    next(err);
  }
});

// GET /api/projects/:id
router.get('/:id', validateProjectId, async (req, res, next) => {
  try {
    const project = await Projects.get(req.params.id);
    if (project) {
      res.json(project);
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (err) {
    next(err);
  }
});

// POST /api/projects
router.post('/', validateProject, async (req, res, next) => {
  try {
    const newProject = await Projects.insert(req.body);
    res.status(201).json(newProject);
  } catch (err) {
    next(err);
  }
});

// PUT /api/projects/:id
router.put('/:id', validateProjectId, validateProject, async (req, res, next) => {
  try {
    const updatedProject = await Projects.update(req.params.id, req.body);
    if (updatedProject) {
      res.json(updatedProject);
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (err) {
    next(err);
  }
});

// DELETE /api/projects/:id
router.delete('/:id', validateProjectId, async (req, res, next) => {
  try {
    const deleted = await Projects.remove(req.params.id);
    if (deleted > 0) {
      res.status(200).end();
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (err) {
    next(err);
  }
});

// GET /api/projects/:id/actions
router.get('/:id/actions', validateProjectId, async (req, res, next) => {
  try {
    const project = await Projects.get(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    const actions = await Projects.getProjectActions(req.params.id);
    res.json(actions);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
