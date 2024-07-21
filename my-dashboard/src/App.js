import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Home from './components/Home';
import StudentLogin from './components/StudentLogin';
import Registration from './components/Studentregistration';


const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/" element={<StudentLogin />} />
          <Route path="/register" element={<Registration />} />
          {/* Add routes for admin login and register if necessary */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
