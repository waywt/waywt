import React, { Component } from "react";
import "./Outfit.css";

class Outfit extends Component {
  state = {
    numComments: 3
  }

  loadMoreComments = (event) => {
    event.preventDefault();
    this.setState({numComments: this.state.numComments + 3});
  }

  render() {
    const { 
      username, avatar, image, description, likeCount, comments, tags, hashtags 
    } = this.props;

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
        <div className="Post-likes mb-2">
          <strong>{likeCount} likes</strong>
        </div>
        <div className="Post-description">
          <a href={`/${username}`}><strong>{username}</strong></a> {description}
        </div>
        {tags && tags.map(tag => {
          return (
            <h1>{tag.x} {tag.y} {tag.text} {tag.Tagged ? tag.Tagged.username : ''}</h1>
          );
        })}
        {hashtags && hashtags.map(hashtag => {
          return (
            <h1>{hashtag.text}</h1>
          );
        })}
        <div className="comment-container">
          {comments && comments.slice(0,this.state.numComments-1).map(comment =>{
            return (
              <div className="Post-comment" key={`comment-${comment.id}`}>
                <a href={`/${comment.User.username}`}><strong>{comment.User.username}</strong></a> {comment.text}
              </div>
            );
          })}
          {comments && comments.length > this.state.numComments ? (
            <div className="Load-comment mt-2">
              <a href="" onClick={this.loadMoreComments}>Load more comments</a>
            </div>
          ) : ''}
        </div>
        <hr />
        <form>
          <div className="form-group">
            <input
              id="comment-form"
              type="text"
              className="form-control"
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
