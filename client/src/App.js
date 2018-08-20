import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Patrick from './components/Patrick';
import Signup from './components/Auth/Signup';

//import Login from './components/Auth/Login';
import Temp from './components/Auth/Temp';

import Login from './components/Auth/Login';


const App = () => (
  <Router>
    <div>
      <Switch>
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/' component={Patrick} />

        <Route exact path='/auth/cb' component={Temp} />

        <Route exact path="/login" component={Login} />

        {/* <Route exact path='/login' component={Login} /> */}
        {/* <Route component={NoMatch} /> */}
      </Switch>
    </div>
  </Router>
);

export default App;
