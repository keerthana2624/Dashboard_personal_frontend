import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import StudentLogin from './components/StudentLogin';
import StudentRegister from './components/StudentRegister';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/student-login" component={StudentLogin} />
          <Route path="/student-register" component={StudentRegister} />
          {/* Add routes for admin login and register if necessary */}
        </Switch>
      </div>
    </Router>
  );
};

export default App;
