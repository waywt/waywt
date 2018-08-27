import React, { Component } from 'react';
import './OutfitDetailed.css';

class OutfitComments extends Component {
  state = {
    numComments: 3
  }

  loadMoreComments = event => {
    event.preventDefault();
    this.setState({numComments: this.state.numComments + 3});
  }

  render() {
    const { comments } = this.props;
    const { numComments } = this.state;

    return (
      <div className="od-comments-container">
        {comments && comments.slice(0,numComments).map(comment =>{
          return (
            <div className="od od-comment" key={comment.id}>
              <a href={`/${comment.User.username}`}><strong>{comment.User.username}</strong></a> {comment.text}
            </div>
          );
        })}
        {comments && this.state.numComments < comments.length ? (
          <div className="od od-load-comment">
            <a href="" onClick={this.loadMoreComments}>Load more comments</a>
          </div>
        ) : ''}
      </div>
    );
  }
}

export default OutfitComments;
