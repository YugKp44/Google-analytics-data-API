const { readFileSync } = require('fs');
const path = require('path');

function getServiceAccountCredentials() {
  try {
    // Check the environment variable
    if (process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS) {
      //console.log('Loading credentials from environment variable');
      //console.log('GOOGLE_SERVICE_ACCOUNT_CREDENTIALS:', process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS);

      return JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS);
    }

    // Check the fallback file
    const credentialsPath = path.join(__dirname, '../credentials/service-account.json');
   // console.log(`Loading credentials from file: ${credentialsPath}`);
    return JSON.parse(readFileSync(credentialsPath, 'utf8'));
  } catch (error) {
    console.error('Error loading service account credentials:', error);
    throw new Error('Failed to load service account credentials');
  }
}


module.exports = { getServiceAccountCredentials };