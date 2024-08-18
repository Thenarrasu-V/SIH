import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const HomePage = () => {
  const navigate = useNavigate();

  const handleUserTypeSelection = (type) => {
    if (type === 'personal') {
      navigate('/personal-user');
    } else if (type === 'organization') {
      navigate('/organization');
    }
  };

  return (
    <div className="home-container">
      <div className="background-box">
        <div className="content-box">
          <h1 className="title">Welcome to Our Audit Tool</h1>
          <p className="subtitle">Please select your role to proceed:</p>
          <div className="button-container">
            <button
              className="button-primary"
              onClick={() => handleUserTypeSelection('personal')}
            >
              I am a Personal User
            </button>
            <button
              className="button-secondary"
              onClick={() => handleUserTypeSelection('organization')}
            >
              I am an Organization
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
