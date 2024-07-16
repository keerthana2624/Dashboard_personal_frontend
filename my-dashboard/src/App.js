import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import StudentLogin from './components/StudentLogin';
import StudentRegister from './components/StudentRegister';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/student-login" element={<StudentLogin />} />
          <Route path="/student-register" element={<StudentRegister />} />
          {/* Add routes for admin login and register if necessary */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
