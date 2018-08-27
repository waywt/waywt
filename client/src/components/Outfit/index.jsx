import React, { Component } from 'react';
import './Outfit.css';
import UserSnapshot from '../UserSnapshot';
import { 
  OutfitDescription, OutfitHashtags, OutfitComments, OutfitBasics 
} from '../OutfitDetailed';
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

  render() {
    const { 
      authenticated, category, username, profile, id, image, description, likeCount, comments, tags, hashtags 
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
        <OutfitBasics
          authenticated={authenticated} 
          category={category}
          outfitId={id}
          likeCount={likeCount}
          showLink={true}
        />
        <hr className="op-hr"/>
        <div className="op-info-container">
          <OutfitDescription 
            username={username}
            description={description}
          />
          <OutfitHashtags hashtags={hashtags} />
          <OutfitComments
            comments={comments}
          />
        </div>
        <hr className="op-hr"/>
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
