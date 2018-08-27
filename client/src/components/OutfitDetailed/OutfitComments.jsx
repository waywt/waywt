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
      <div>
        {comments && comments.slice(0,numComments-1).map(comment =>{
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
    );
  }
}

export default OutfitComments;
