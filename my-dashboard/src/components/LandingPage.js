import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css'; // Import the updated CSS

const LandingPage = () => {
  const navigate = useNavigate();

  const handleStudentClick = () => {
    navigate('/student-login');
  };

  const handleAdminClick = () => {
    navigate('/admin-login');
  };

  return (
    <div className="landing-page">
      <h1>Welcome to the Dashboard</h1>
      <button onClick={handleStudentClick}>Student Login</button>
      <button onClick={handleAdminClick}>Admin Login</button>
    </div>
  );
};

export default LandingPage;
