import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import { authVerify, userFeed } from "./utils/API";
import { Signup, Login, Temp } from "./components/Auth";
import Home from "./components/Pages/Home/";
import Profile from "./components/Pages/Profile";
import PostForm from "./components/Pages/PostForm/";
import Outfit from "./components/Outfit";
import OutfitPage from "./components/OutfitPage";

class App extends Component {
  state = {
    authenticated: false,
    user: null,
    outfits: null,
    suggestions: null
  };

  componentDidMount() {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      authVerify()
        .then(result => {
          this.setState({ authenticated: result.data.authenticated });
        })
        .catch(err => {
          // Unauthorized
          localStorage.removeItem("accessToken");
        });
    }
  }

  componentDidUpdate() {
    if(this.state.authenticated && !this.state.user) {
      userFeed().then(result => {
        if (result.data.suggestions) {
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

  updateAuthState = boolean => {
    this.setState({ authenticated: boolean });
  };

  updateOutfitsState = outfits => {
    this.setState({outfits: outfits});
  };

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
            <Route exact path="/" render={() => {
              return (
                <Home
                  authenticated={this.state.authenticated}
                  user={this.state.user}
                  outfits={this.state.outfits}
                  suggestions={this.state.suggestions}
                  updateOutfitsState={this.updateOutfitsState}
                  resetState={this.resetState}
                />
              );
            }} />
            <Route exact path="/signup" render={() => {
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
            <Route exact path="/auth/cb" component={Temp} />
            
            
            <Route exact path='/outfitpage' component={OutfitPage} />
            <Route exact path='/outfit' component={Outfit} />
            <Route
              exact
              path="/postform"
              render={() => {
                return (
                  <PostForm
                    authenticated={this.state.authenticated}
                    updateAuthState={this.updateAuthState}
                  />
                );
              }}
            />
            <Route exact path='/:username' render={() => {
              return (
                <Profile
                  authenticated={this.state.authenticated}
                  user={this.state.user}
                  outfits={this.state.outfits}
                  suggestions={this.state.suggestions}
                  updateOutfitsState={this.updateOutfitsState}
                  resetState={this.resetState}
                />
              );
            }} />

            {/* <Route component={NoMatch} /> */}
          </Switch>
        </div>
      </Router>
    );
  }
}
export default App;
