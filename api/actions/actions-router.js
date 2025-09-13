const express = require('express');
const router = express.Router();
const Actions = require('./actions-model');
const { validateAction, validateActionId, validateProjectId } = require('./actions-middleware');

// GET /api/actions
router.get('/', async (req, res, next) => {
  try {
    const actions = await Actions.get();
    res.json(actions);
  } catch (err) {
    next(err);
  }
});

// GET /api/actions/:id
router.get('/:id', validateActionId, async (req, res, next) => {
  try {
    const action = await Actions.get(req.params.id);
    if (action) {
      res.json(action);
    } else {
      res.status(404).json({ message: 'Action not found' });
    }
  } catch (err) {
    next(err);
  }
});

// POST /api/actions
router.post('/', validateAction, validateProjectId, async (req, res, next) => {
  try {
    const newAction = await Actions.insert(req.body);
    res.status(201).json(newAction);
  } catch (err) {
    next(err);
  }
});

// PUT /api/actions/:id
router.put('/:id', validateActionId, validateAction, validateProjectId, async (req, res, next) => {
  try {
    const updatedAction = await Actions.update(req.params.id, req.body);
    if (updatedAction) {
      res.json(updatedAction);
    } else {
      res.status(404).json({ message: 'Action not found' });
    }
  } catch (err) {
    next(err);
  }
});

// DELETE /api/actions/:id
router.delete('/:id', validateActionId, async (req, res, next) => {
  try {
    const deleted = await Actions.remove(req.params.id);
    if (deleted > 0) {
      res.status(200).end();
    } else {
      res.status(404).json({ message: 'Action not found' });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
