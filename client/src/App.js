import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Patrick from './components/Patrick';
import Signup from './components/Auth/Signup';
//import Login from './components/Auth/Login';

const App = () => (
  <Router>
    <div>
      <Switch>
        <Route exact path='/' component={Patrick} />
        <Route exact path='/signup' component={Signup} />
        {/* <Route exact path='/login' component={Login} /> */}
        {/* <Route component={NoMatch} /> */}
      </Switch>
    </div>
  </Router>
);

export default App;
