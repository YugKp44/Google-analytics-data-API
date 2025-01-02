class AnalyticsError extends Error {
  constructor(message, originalError = null) {
    super(message);
    this.name = 'AnalyticsError';
    this.originalError = originalError;
  }
}

function handleAnalyticsError(error) {
  console.error('Analytics API Error:', error.message);
  throw new AnalyticsError(`Analytics API Error: ${error.message}`, error);
}

module.exports = {
  AnalyticsError,
  handleAnalyticsError
};