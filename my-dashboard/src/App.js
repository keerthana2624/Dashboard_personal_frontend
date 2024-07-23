import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StudentLogin from './components/StudentLogin';
import Studentregistration from './components/Studentregistration';
import Programs from './components/Programs';
import Application from './components/Application';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<StudentLogin />} />
          <Route path="/register" element={<Studentregistration />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/apply" element ={<Application/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
