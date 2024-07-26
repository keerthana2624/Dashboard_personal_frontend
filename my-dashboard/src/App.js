import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import StudentLogin from './components/StudentLogin';
import Studentregistration from './components/Studentregistration';
import Programs from './components/Programs';
import Application from './components/Application';
import AdminLogin from './components/Adminlogin';
import AdminDashboard from './components/AdminDashboard';
import Dashboard from './components/Dashboard'; // Import Dashboard

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/student-login" element={<StudentLogin />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/register" element={<Studentregistration />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/apply" element={<Application />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/dashboard" element={<Dashboard />} /> {/* Add Dashboard route */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
