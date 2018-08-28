import React, {Component} from 'react';
import './OutfitDetailed.css';
import { createOutfitComment } from '../../utils/outfitAPI';
// import { validComment } from '../../utils/Validate';

class OutfitCommentForm extends Component {
  state = {
    text: ''
  }

  handleInputChange = (e) => {
    this.setState({ text: e.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();
    
    createOutfitComment(this.props.outfitId, {text: this.state.text}).then(result => {
      const newComment = {
        id: result.data.id,
        text: result.data.text,
        User: { id: result.data.UserId, username: this.props.currUser.username }
      }

      this.setState({ text: '' });
      this.props.addComment(newComment);
    });
  }

  render () {
    const { text, textErr } = this.state;

    return (
      <form className="Outfit-comment-form" onSubmit={this.handleSubmit}>        
        <input
          type="text"
          className="form-control Outfit-comment-input"
          placeholder="Add a comment..."
          value={text}
          onChange={this.handleInputChange}
        />
        { text && !textErr ? (
          <button className="btn Outfit-comment-submit">
            <i className="fas fa-plus-square fa-lg"></i>
          </button>
        ) : ''}        
      </form>
    ); 
  }
}

export default OutfitCommentForm;
          