import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Pages/Home/";
import Signup from "./components/Auth/Signup";
//import Login from './components/Auth/Login';
import Tag from "./components/Tag";

const App = () => (
  <Router>
    <div>
      <Switch>
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/" component={Home} />
        {/* <Route exact path='/login' component={Login} /> */}
        {/* <Route component={NoMatch} /> */}
        <Route exact path="/tagtest" component={Tag} />
      </Switch>
    </div>
  </Router>
);

export default App;
