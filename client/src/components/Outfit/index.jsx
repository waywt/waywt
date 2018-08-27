import React, { Component } from 'react';
import './Outfit.css';
import UserSnapshot from '../UserSnapshot';
import like_btn_active from '../../images/like_btn_active.png';
import like_btn from '../../images/like_btn.png';
import comment_btn from '../../images/comment_btn.png'


class Outfit extends Component {
  state = {
    numComments: 3,
    imgsrc: like_btn,
    likeClicked: false,
  }


  handleLikeClick = () => {
    if (this.state.likeClicked===false){
      this.setState({
        imgsrc: like_btn_active,
        likeClicked:true
       });
    }
    else {
      this.setState({
        imgsrc: like_btn,
        likeClicked: false
      })
    }
   };

  

  componentDidMount() {
    //
  }

  loadMoreComments = (event) => {
    event.preventDefault();
    this.setState({numComments: this.state.numComments + 3});
  }

  getCatIcon = (catName) => {
    switch (catName) {
      case 'Casual':
        return (<i className="fas fa-coffee" ></i>);
      case 'Formal':
        return (<i className="fab fa-black-tie" ></i>);
      case 'Business':
        return (<i className="fas fa-briefcase" ></i>);
      case 'Sleepwear':
        return (<i className="fas fa-bed" ></i>);
      case 'Athletic':
        return (<i className="fas fa-dumbbell" ></i>);
      case 'Outerwear':
      default:
        return (<i className="fas fa-snowflake" ></i>);
    }
  }

  render() {
    const { 
      category, username, profile, id, image, description, likeCount, comments, tags, hashtags 
    } = this.props;

    return (
      <article className="Outfit">
        <UserSnapshot profile={profile} username={username} />
        <div className="Outfit-image">
          {/* <button id="button1" /> */}
          <div className="Outfit-image-bg">
            <img alt={description} src={image} />
          </div>
        </div>
        <div className="d-flex align-items-center my-3">
          <div className="Outfit-action-buttons mr-auto">
            <img onClick={this.handleLikeClick}src={this.state.imgsrc} className="like-btn" alt="like button"></img>
            <img src={comment_btn} className="comment-btn" alt="comment button" />
          </div>
          <div className="Outfit-category ml-auto">
            <span data-id={category.id} className="Outfit-category-badge">{this.getCatIcon(category.name)} {category.name}</span>
          </div>
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
              <a href={`/explore/tags/${hashtag.text}`} className="Outfit-hashtag" key={`hashtag-${hashtag.id}`}>{`#${hashtag.text}`}</a>
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
