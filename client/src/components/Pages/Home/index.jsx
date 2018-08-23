import React, { Component } from "react";
import Header from "../../Header";
import Outfit from "../../Outfit";
import Sidebar from "../../Sidebar";

class Home extends Component {
  state = {
    username: "chris_evans", // {db}
    avatar: "https://i.imgur.com/G28Yu4r.png", // {db}
    description:
      "If you can't handle me at my worst you don't deserve me at my best", // {db}
    image:
      "https://static1.squarespace.com/static/560eabc4e4b061c4bb358ae8/t/57802d7e6b8f5b118a25062b/1468018050251/image.jpg?format=1000w" // {db}
    // comments: []
  };

  render() {
    const { authenticated, resetState, user, outfits } = this.props;

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
              </div>
            </div>
            <div className="col-md-4">
              <Sidebar
                username={user ? user.username : ''}
                avatar={user ? user.Profile.avatar : ''}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
