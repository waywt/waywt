import React, { Component } from 'react';
import './Outfit.css';

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
      username, avatar, id, image, description, likeCount, comments, tags, hashtags 
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
        <div className="Outfit-image">
          {/* <button id="button1" /> */}
          <div className="Outfit-image-bg">
            <img alt={description} src={image} />
          </div>
        </div>
        <div className="action-buttons">
          <button className="like-btn" />
          <button className="comment-btn" />
        </div>
        <div className="Outfit-likes mb-2">
          <a href={`/outfits/${id}`}><strong>{likeCount} likes</strong></a>
        </div>
        <div className="Outfit-description">
          <a href={`/${username}`}><strong>{username}</strong></a> {description}
        </div>
        {/* {tags && tags.map(tag => {
          return (
            <h1>{tag.x} {tag.y} {tag.text} {tag.Tagged ? tag.Tagged.username : ''}</h1>
          );
        })} */}
        <div className="Outfit-hashtags">
          {hashtags && hashtags.map(hashtag => {
            return (
              <a href={`/explore/tags/${hashtag.text}`} classname="Outfit-hashtag" key={`hashtag-${hashtag.id}`}>{`#${hashtag.text}`}</a>
            );
          })}
        </div>
        <div>
          {comments && comments.slice(0,this.state.numComments-1).map(comment =>{
            return (
              <div className="Outfit-comment" key={`comment-${comment.id}`}>
                <a href={`/${comment.User.username}`}><strong>{comment.User.username}</strong></a> {comment.text}
              </div>
            );
          })}
          {comments && comments.length > this.state.numComments ? (
            <div className="Outfit-load-comment mt-2">
              <a href="" onClick={this.loadMoreComments}>Load more comments</a>
            </div>
          ) : ''}
        </div>
        <hr />
        <form className="Outfit-comment-form">
          <div className="form-group">              
            <input
              type="text"
              className="form-control"
              placeholder="Add a comment..."
            />
          </div>
        </form>
      </article>
    );
  }
}
export default Outfit;
