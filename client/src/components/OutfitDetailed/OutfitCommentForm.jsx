import React, {Component} from 'react';
import './OutfitDetailed.css';

class OutfitCommentForm extends Component {
  render () {
    return (
      <form className="Outfit-comment-form">          
        <input
          type="text"
          className="form-control"
          placeholder="Add a comment..."
        />
      </form>
    ); 
  }
}

export default OutfitCommentForm;
          