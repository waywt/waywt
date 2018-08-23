import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { authVerify, userFeed } from './utils/API';
import { Signup, Login, Temp } from './components/Auth';
import { Profile } from './components/Pages/Profile';
import Home from "./components/Pages/Home/";
import Tag from "./components/Tag";
import Outfit from "./components/Outfit";


class App extends Component {
  state = {
    authenticated: false,
    user: null,
    outfits: null,
    suggestions: null,
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      authVerify().then(result => {
        this.setState({authenticated: result.data.authenticated});
      }).catch(err => { // Unauthorized
        localStorage.removeItem('accessToken');
      });
    }
  }

  componentDidUpdate() {
    if(this.state.authenticated && !this.state.user) { // prevents infinite loop
      userFeed().then(result => {
        if (result.data.suggestions) { // new user / user not following anyone
          this.setState({
            user: result.data.user,
            suggestions: result.data.suggestions,
          });
        } else {
          this.setState({
            user: result.data.user,
            outfits: result.data.outfits,
          });
        }
      }).catch(err => {
        console.log(err);
      });
    }
  }
  
  updateAuthState = (boolean) => {
    this.setState({authenticated: boolean});
  }

  resetState = () => {
    this.setState({
      authenticated: false,
      user: null,
      outfits: null,
      suggestions: null,
    });
  }

  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path='/' render={() => {
              if (this.state.authenticated) {
                return (
                  <Home
                    authenticated={this.state.authenticated}
                    user={this.state.user}
                    outfits={this.state.outfits}
                    suggestions={this.state.suggestions}
                    resetState={this.resetState}
                  />
                );
              } else {
                return <Redirect to='/signup' />;
              }
            }} />
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
            <Route exact path='/:username' component={Profile} />
            <Route exact path='/outfit' component={Outfit} />


            {/* <Route component={NoMatch} /> */}
          </Switch>
        </div>
      </Router>
    );
  } 
}
export default App;
