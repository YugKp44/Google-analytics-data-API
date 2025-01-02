const buildActiveUsersQuery = (propertyId) => ({
  property: `properties/${propertyId}`,
  dateRanges: [
    {
      startDate: '30daysAgo',
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

const formatResponseForChart = (response) => {
  const { rows } = response;
  
  // Format the response to get active users by country.
  const formattedData = rows.map(row => ({
    country: row.dimensionValues[0].value, // Extract the country name.
    activeUsers: row.metricValues[0].value, // Extract the active users count.
  }));

  // Return the formatted data structure
  return formattedData;
};

module.exports = { buildActiveUsersQuery, formatResponseForChart };
