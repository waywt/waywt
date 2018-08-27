import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './Home.css';
import Header from '../../Header';
import Outfit from '../../Outfit';
import Sidebar from '../../Sidebar';
import UserSnapshot from '../../UserSnapshot';

class Home extends Component {
  render() {
    const { 
      authenticated, resetState, updateOutfitsState, user, outfits, suggestions 
    } = this.props;

    if (!authenticated) {
      return <Redirect to="/signup" />;
    } else {
      return (
        <div className="Home">
          <Header 
            authenticated={authenticated}
            user={user}
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
                          authenticated={authenticated}
                          username={outfit.User.username}
                          profile={outfit.User.Profile}
                          id={outfit.id}
                          description={outfit.description}
                          category={outfit.Category}
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
                      <div className="col-12 col-lg-8 offset-lg-2" key={`suggestion-${suggestion.id}`}>
                        <UserSnapshot 
                          profile={suggestion.Profile}
                          username={suggestion.username}
                          id={suggestion.id}
                          customStyle={{backgroundColor: 'white', border: '1px solid #efefef'}} 
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="col-md-4">
                <Sidebar
                  id={user ? user.id : null}
                  username={user ? user.username : null}
                  profile={user ? user.Profile : null}
                  updateOutfitsState={updateOutfitsState}
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
