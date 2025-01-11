const express = require('express');
const {
  getAllAgents,
  getAgentById,   // Make sure this is correctly imported
  createAgent,
  updateAgent,
  deleteAgent
} = require('../controllers/agentController');

const router = express.Router();

// Define routes for agents
router.get('/', getAllAgents);           // Get all agents
router.get('/:id', getAgentById);        // Get agent by ID
router.post('/', createAgent);           // Create new agent
router.put('/:id', updateAgent);        // Update agent by ID
router.delete('/:id', deleteAgent);     // Delete agent by ID

module.exports = router;
