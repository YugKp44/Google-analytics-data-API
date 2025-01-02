const { BetaAnalyticsDataClient } = require('@google-analytics/data');
const { getServiceAccountCredentials } = require('../config/serviceAccount');

// Create a singleton instance
let analyticsClient = null;

function getAnalyticsClient() {
  if (!analyticsClient) {
    const credentials = getServiceAccountCredentials();
    analyticsClient = new BetaAnalyticsDataClient({
      credentials,
      projectId: process.env.GOOGLE_PROJECT_ID
    });
  }
  return analyticsClient;
}

module.exports = { getAnalyticsClient };