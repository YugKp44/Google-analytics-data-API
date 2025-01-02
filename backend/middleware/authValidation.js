const { AnalyticsError } = require('../utils/errorHandler');

function validateAccessToken(req, res, next) {
  if (!req.user?.accessToken) {
    return res.status(401).json({ error: 'No access token available' });
  }
  next();
}

module.exports = { validateAccessToken };