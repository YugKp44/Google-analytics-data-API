import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

const GoogleAuth = ({ setAuthToken }) => {
  const handleLoginSuccess = async (response) => {
    const { code } = response;

    // Send authorization code to the backend to exchange for tokens
    try {
      const res = await fetch('http://localhost:5000/api/auth/exchange', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),  // Send the authorization code to the backend
      });

      if (res.ok) {
        const tokens = await res.json();
        localStorage.setItem('access_token', tokens.access_token);
        localStorage.setItem('refresh_token', tokens.refresh_token);
        setAuthToken(tokens.access_token);  // Pass access token to parent component
      }
    } catch (error) {
      console.error('Error during Google login', error);
    }
  };

  const handleLoginFailure = (error) => {
    console.error('Google Login Failure:', error);
  };

  return (
    <div>
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={handleLoginFailure}
        useOneTap  // Optional: Use One-Tap login feature
        scope="https://www.googleapis.com/auth/analytics.readonly"
      />
    </div>
  );
};

export default GoogleAuth;
