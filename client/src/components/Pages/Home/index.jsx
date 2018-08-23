import React, { Component } from "react";
import Header from "../../Header";
import Post from "../../Post";
import Sidebar from "../../Sidebar";

class Patrick extends Component {
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
    const { username, avatar, description, image } = this.state;
    return (
      <div className="App">
        <Header />
        <div className="container">
          <div className="row">
            <div className="col-md-4 offset-md-8">
              <Sidebar
                username={username}
                avatar={avatar}
                description={description}
                image="https://i.redd.it/yfo3eglyfrv01.jpg"
              />
            </div>
            <div className="posts-container">
              <div className="col-md-8">
                <Post
                  username={username}
                  avatar={avatar}
                  description={description}
                  image={image}
                  // comments={comments}
                />
              </div>
              <div className="col-md-8">
                <Post
                  username={username}
                  avatar={avatar}
                  description={description}
                  image={image}
                  // comments={comments}
                />
              </div>
              <div className="col-md-8">
                <Post
                  username={username}
                  avatar={avatar}
                  description={description}
                  image={image}
                  // comments={comments}
                />
              </div>
              <div className="col-md-8">
                <Post
                  username={username}
                  avatar={avatar}
                  description={description}
                  image={image}
                  // comments={comments}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Patrick;
