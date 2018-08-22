import React, { Component } from "react";
import "./Outfit.css";

class Outfit extends Component {
  render() {
    const { username, avatar, image, description } = this.props;

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
          <button id="button1" />
          <div className="Post-image-bg">
            <img alt={description} src={image} />
          </div>
        </div>
        <div className="action-buttons">
          <button className="btn like-btn" />
          <button className="btn comment-btn" />
        </div>
        <div className="Post-likes">
          <strong>1,481 likes</strong>
        </div>
        <div className="Post-description">
          <strong>{username}</strong> {description}
        </div>
        <div className="comment-container">
          <div className="Post-comment">
            <strong>pat_gabes</strong> This ain't even great
          </div>
          <div className="Post-comment">
            <strong>pat_gabes</strong> Sick fit dude
          </div>
          <div className="Post-comment">
            <strong>pat_gabes</strong> Wow, this fit is dope bro
          </div>
        </div>
        <hr />
        <form>
          <div className="form-group">
            <input
              id="comment-form"
              type="text"
              class="form-control"
              id="formGroupExampleInput"
              placeholder="Add a comment..."
            />
          </div>
        </form>
      </article>
    );
  }
}
export default Outfit;
