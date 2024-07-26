import React, { useState } from "react";
import "./dashboard.css";

const Dashboard = () => {
  const [isServiceEnabled, setIsServiceEnabled] = useState(false);

  const handleToggleService = () => {
    setIsServiceEnabled(!isServiceEnabled);
  };

  return (
    <div className="dashboard">
      <div className="app-bar">
        <h1>API Dashboard</h1>
      </div>
      <div className="container">
        <div className="section">
          <div className="paper">
            <h2>API Integration Guide</h2>
            <p>
              To integrate this API into your existing website, follow these
              steps:
            </p>
            <ol>
              <li>Install the required dependencies:</li>
              <pre className="codeBlock">
                <code>npm install axios</code>
              </pre>
              <li>Use the following code to interact with the API:</li>
              <pre className="codeBlock">
                <code>{`
import axios from 'axios';

// Generate challenge
const generateChallenge = async (username) => {
  const response = await axios.post('http://localhost:3001/generate-challenge', { username });
  return response.data.challenge;
};

// Verify authentication
const verifyAuthentication = async (username, publicKey, c, z) => {
  const response = await axios.post('http://localhost:3001/verify', { username, publicKey, c, z });
  return response.data.success;
};
                `}</code>
              </pre>
            </ol>
          </div>
        </div>
        <div className="section">
          <div className="paper">
            <div className="toggle-container">
              <span className="toggle-label">Enable Service</span>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={isServiceEnabled}
                  onChange={handleToggleService}
                />
                <span className="slider">
                  <span className="slider-text">
                    {isServiceEnabled ? "ON" : "OFF"}
                  </span>
                </span>
              </label>
            </div>
            {isServiceEnabled && (
              <div className="alert alert-success">Service is now enabled!</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
