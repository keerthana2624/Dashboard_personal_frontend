import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [role, setRole] = useState('student');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (role === 'student') {
      navigate('/student-login');
    } else {
      // Navigate to admin login (assuming you have an admin login route)
      navigate('/admin-login');
    }
  };

  const handleRegister = () => {
    if (role === 'student') {
      navigate('/student-register');
    } else {
      // Navigate to admin register (assuming you have an admin register route)
      navigate('/admin-register');
    }
  };

  return (
    <div>
      <h1>Welcome to Online Education</h1>
      <div>
        <label>Select Role: </label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleRegister}>Sign Up</button>
    </div>
  );
};

export default Home;
