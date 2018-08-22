import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { authVerify } from './utils/API';
import { Signup, Login, Temp } from './components/Auth';
import { Profile } from './components/Pages/Profile';
import Home from "./components/Pages/Home/";
import Tag from "./components/Tag";
import Outfit from "./components/Outfit";

class App extends Component {
  state = {
    authenticated: false,
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      authVerify(accessToken).then(result => {
        this.setState({authenticated: result.data.authenticated});
      }).catch(err => { // Unauthorized
        localStorage.removeItem('accessToken');
      });
    }
  }

  componentDidUpdate() {
    console.log('state authenticated updated');
  }
  
  updateAuthState = () => {
    this.setState({authenticated: true});
  }

  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path='/signup' render={() => {
              return (
                <Signup 
                  authenticated={this.state.authenticated}
                  updateAuthState={this.updateAuthState}
                />
              );
            }} />
            <Route exact path="/login" render={() => {
              return (
                <Login 
                  authenticated={this.state.authenticated}
                  updateAuthState={this.updateAuthState}
                />
              );
            }} />
            <Route exact path='/auth/cb' component={Temp} />
            <Route exact path='/' component={Home} />
            <Route exact path='/profile' component={Profile} />
            <Route exact path='/outfit' component={Outfit} />


            {/* <Route component={NoMatch} /> */}
          </Switch>
        </div>
      </Router>
    );
  } 
}
export default App;
