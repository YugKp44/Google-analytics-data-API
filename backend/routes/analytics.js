const express = require('express');
const router = express.Router();
const analyticsService = require('../services/analyticsService');
const { ensureAuthenticated } = require('../middleware/auth');

router.get('/', ensureAuthenticated, async (req, res) => {
  try {
    const data = await analyticsService.getActiveUsers();
    res.json(data);
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to fetch analytics data',
      details: error.message 
    });
  }
});

module.exports = router;