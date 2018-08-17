import React, { Component } from "react";
import "./Post.css";

class Post extends Component {
  render() {
    const username = this.props.username;
    const avatar = this.props.avatar;
    const image = this.props.image;
    const description = this.props.description;
    return (
      <article className="Post" ref="Post">
        <header>
          <div className="Post-user">
            <div className="Post-user-avatar">
              <img src={avatar} alt={username} />
            </div>
            <div className="Post-user-username">
              <span>{username}</span>
            </div>
          </div>
        </header>
        <div className="Post-image">
          <div className="Post-image-bg">
            <img alt={description} src={image} />
          </div>
        </div>
        <div className="Post-description">
          <strong>{username}</strong> {description}
        </div>
      </article>
    );
  }
}
export default Post;
