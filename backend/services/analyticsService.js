const { getAnalyticsClient } = require('./analyticsClient');
const { buildActiveUsersQuery } = require('./analyticsQueries');

class AnalyticsService {
  async getActiveUsers() {
    try {
      const client = getAnalyticsClient();
      const [response] = await client.runReport({
        property: `properties/${process.env.GOOGLE_ANALYTICS_PROPERTY_ID}`,
       dateRanges: [
    {
      startDate: '90daysAgo',
      endDate: 'today',
    },
  ],
  metrics: [
    {
      name: 'activeUsers',
    },
  ],
  dimensions: [
    {
      name: 'country',
    },
  ],
      });
      return response;
    } catch (error) {
      console.error('Analytics API Error:', error);
      throw error;
    }
  }
}

module.exports = new AnalyticsService();