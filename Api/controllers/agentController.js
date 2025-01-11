const Agent = require('../models/Agent');  // Assuming you have an Agent model

// GET all agents
const getAllAgents = async (req, res) => {
  try {
    const agents = await Agent.find();
    if (!agents || agents.length === 0) {
      return res.status(404).json({ message: 'No agents found' });
    }
    res.status(200).json(agents);
  } catch (error) {
    console.error('Error fetching agents:', error);  // Log error to console for debugging
    res.status(500).json({ message: 'Server error, please try again later' });
  }
};

// GET agent by ID
const getAgentById = async (req, res) => {
  const { id } = req.params;  // Extract ID from the route params
  try {
    const agent = await Agent.findById(id);
    if (!agent) {
      return res.status(404).json({ message: 'Agent not found' });
    }
    res.status(200).json(agent);
  } catch (error) {
    console.error('Error fetching agent by ID:', error);  // Log error for debugging
    res.status(500).json({ message: 'Server error, please try again later' });
  }
};

// POST create an agent
const createAgent = async (req, res) => {
  const { name, email, phone } = req.body;  // Assuming these fields are required

  // Simple validation
  if (!name || !email || !phone) {
    return res.status(400).json({ message: 'Please provide all required fields: name, email, phone' });
  }

  try {
    const newAgent = new Agent({ name, email, phone });
    await newAgent.save();
    res.status(201).json(newAgent);
  } catch (error) {
    console.error('Error creating agent:', error);  // Log error for debugging
    res.status(500).json({ message: 'Server error, please try again later' });
  }
};

// PUT update an agent
const updateAgent = async (req, res) => {
  const { id } = req.params;  // Get the agent ID from the URL params
  const { name, email, phone } = req.body;

  // Simple validation
  if (!name || !email || !phone) {
    return res.status(400).json({ message: 'Please provide all required fields: name, email, phone' });
  }

  try {
    const updatedAgent = await Agent.findByIdAndUpdate(id, { name, email, phone }, { new: true });
    if (!updatedAgent) {
      return res.status(404).json({ message: 'Agent not found' });
    }
    res.status(200).json(updatedAgent);
  } catch (error) {
    console.error('Error updating agent:', error);  // Log error for debugging
    res.status(500).json({ message: 'Server error, please try again later' });
  }
};

// DELETE an agent
const deleteAgent = async (req, res) => {
  const { id } = req.params;  // Get the agent ID from the URL params

  try {
    const deletedAgent = await Agent.findByIdAndDelete(id);
    if (!deletedAgent) {
      return res.status(404).json({ message: 'Agent not found' });
    }
    res.status(200).json({ message: 'Agent deleted successfully' });
  } catch (error) {
    console.error('Error deleting agent:', error);  // Log error for debugging
    res.status(500).json({ message: 'Server error, please try again later' });
  }
};

module.exports = { getAllAgents, getAgentById, createAgent, updateAgent, deleteAgent };
