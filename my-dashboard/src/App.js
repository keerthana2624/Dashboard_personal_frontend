import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';  // Import the new component
import StudentLogin from './components/StudentLogin';
import Studentregistration from './components/Studentregistration';
import Programs from './components/Programs';
import Application from './components/Application';
import AdminLogin from './components/Adminlogin';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />  {/* Set LandingPage as the root route */}
          <Route path="/student-login" element={<StudentLogin />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/register" element={<Studentregistration />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/apply" element={<Application />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
