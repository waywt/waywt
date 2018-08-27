import React, {Component} from 'react';
import './OutfitDetailed.css';
import like_btn_active from '../../images/like_btn_active.png';
import like_btn from '../../images/like_btn.png';
import comment_btn from '../../images/comment_btn.png'

class OutfitActionBtns extends Component {
  state = {
    likeActive: false
  }

  toggleLike = () => {
    this.setState({likeActive: !this.state.likeActive});
   };

  render () {
    const { OutfitId, likeCount, showLink } = this.props;

    return (
      <div className="row">
        <div className="col-12">
          <img
            src={this.state.likeActive ? like_btn_active : like_btn} 
            onClick={this.toggleLike} 
            className="like-btn" 
            alt="like button"
          ></img>
          <img src={comment_btn} className="comment-btn" alt="comment button" />
        </div>
        <div className="col-12 od od-like-ct">
          { showLink ? (
            <a href={`/outfits/${OutfitId}`}><strong>{likeCount} likes</strong></a>
          ) : (
            <strong>{likeCount} likes</strong>
          )}
        </div>
      </div>
    ); 
  }
}

export default OutfitActionBtns;
          