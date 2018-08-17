import React, { Component } from "react";
import Header from "../src/components/Header";
import Post from "../src/components/Post";

class App extends Component {
  state = {
    username: "Chris", // {db}
    avatar: "https://i.imgur.com/G28Yu4r.png", //{db}
    description: "Example caption", //{db}
    image:
      "https://static1.squarespace.com/static/560eabc4e4b061c4bb358ae8/t/57802d7e6b8f5b118a25062b/1468018050251/image.jpg?format=1000w" //{db}
    // comments: []
  };
  render() {
    const { username, avatar, description, image } = this.state;

    return (
      <div className="App">
        <Header />
        <section className="App-main">
          <Post
            username={username}
            avatar={avatar}
            description={description}
            image={image}
            // comments={comments}
          />
        </section>
      </div>
    );
  }
}

export default App;
