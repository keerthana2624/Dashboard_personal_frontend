import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Home = () => {
  const [role, setRole] = useState('student');
  const history = useHistory();

  const handleLogin = () => {
    if (role === 'student') {
      history.push('/student-login');
    } else {
      // Navigate to admin login (assuming you have an admin login route)
      history.push('/admin-login');
    }
  };

  const handleRegister = () => {
    if (role === 'student') {
      history.push('/student-register');
    } else {
      // Navigate to admin register (assuming you have an admin register route)
      history.push('/admin-register');
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
