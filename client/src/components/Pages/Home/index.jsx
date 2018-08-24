import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../../Header';
import Outfit from '../../Outfit';
import Sidebar from '../../Sidebar';

class Home extends Component {
  render() {
    const { authenticated, resetState, user, outfits, suggestions } = this.props;

    if (!authenticated) {
      return <Redirect to="/signup" />;
    } else {
      return (
        <div className="App">
          <Header 
            authenticated={authenticated}
            resetState={resetState}
          />
          <div className="container">
            <div className="row">
              <div className="col-md-8">
                <div className="row">
                  {outfits && outfits.map(outfit => {
                    return (
                      <div className="col-12" key={`outfit-${outfit.id}`}>
                        <Outfit
                          username={outfit.User.username}
                          avatar={outfit.User.Profile.avatar}
                          id={outfit.id}
                          description={outfit.description}
                          image={outfit.imageUrl}
                          likeCount={outfit.Likes.length}
                          comments={outfit.Comments}
                          tags={outfit.Tags}
                          hashtags={outfit.Hashtags}
                        />
                      </div>
                    );
                  })}
                  {suggestions && suggestions.map(suggestion => {
                    return (
                      <div className="col-12" key={`suggestion-${suggestion.id}`}>
                        {suggestion.username}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="col-md-4">
                <Sidebar
                  username={user ? user.username : ''}
                  avatar={user && user.Profile ? user.Profile.avatar : '/default_avatar.png'}
                />
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Home;
