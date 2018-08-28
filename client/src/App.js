import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { authVerify, userFeed } from './utils/API';
import { Signup, Login, Temp } from './components/Auth';
import Home from './components/Pages/Home/';
import Profile from './components/Pages/Profile';
import OutfitPage from "./components/Pages/OutfitPage";
import CategoryPage from "./components/Pages/CategoryPage";
import HashtagPage from "./components/Pages/HashtagPage";
import PostForm from './components/Pages/PostForm/';
import Header from './components/Header';
import Error from './components/Error';

class App extends Component {
  state = {
    authenticated: false,
    user: null,
    following: [],
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
            following: result.data.following,
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

  updateFollowingState = (id, follow) => {
    let following = this.state.following;
    if (follow) {
      following.push(id);
    } else {
      following = following.filter(f => f !== id);
    }
    this.setState({following: following});
  }

  resetState = () => {
    this.setState({
      authenticated: false,
      user: null,
      following: null,
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
                  resetState={this.resetState}
                  following={this.state.following}
                  outfits={this.state.outfits}
                  suggestions={this.state.suggestions}
                  updateOutfitsState={this.updateOutfitsState}
                  updateFollowingState={this.updateFollowingState}
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
            <Route exact path="/explore/category/:categoryName" render={({match}) => {
              return (
                <CategoryPage 
                  authenticated={this.state.authenticated}
                  resetState={this.resetState}
                  currUser={this.state.user}
                  catName={match.params.categoryName}
                />
              );
            }} />
            <Route exact path="/explore/tags/:hashtag" render={({match}) => {
              return (
                <HashtagPage 
                  authenticated={this.state.authenticated}
                  resetState={this.resetState}
                  currUser={this.state.user}
                  hashtag={match.params.hashtag}
                />
              );
            }} />

            <Route exact path="/outfits/new" render={() => {
              return (
                <PostForm
                  authenticated={this.state.authenticated}
                  updateAuthState={this.updateAuthState}
                />
              );
            }} />
            <Route exact path='/outfits/:id' render={({match}) => {
              return (
                <OutfitPage
                  authenticated={this.state.authenticated}
                  resetState={this.resetState}
                  currUser={this.state.user}
                  outfitId={match.params.id}
                  following={this.state.following}
                  updateFollowingState={this.updateFollowingState}
                />
              );
            }} />; 
            <Route exact path='/:username' render={({match}) => {
              return (
                <Profile
                  authenticated={this.state.authenticated}
                  resetState={this.resetState}
                  currUser={this.state.user}
                  following={this.state.following}
                  updateFollowingState={this.updateFollowingState}
                  username={match.params.username}                
                />
              );
            }} />
            <Route render={() => {
              return (
                <div>
                  <Header 
                    authenticated={this.state.authenticated}
                    user={this.state.user}
                    resetState={this.resetState}
                  />
                  <Error />
                </div>
              );
            }} />
          </Switch>
        </div>  
      </Router>
    );
  }
}
export default App;
