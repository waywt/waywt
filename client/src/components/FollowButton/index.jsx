import React, { Component } from 'react';
import { userFollow } from '../../utils/API';

class FollowButton extends Component {
  handleFollowUser = (event) => {
    event.preventDefault();
    const id = (event.target.getAttribute('data-id'));

    userFollow(id).then(result => {
      this.props.handleFollowUser();
    }).catch(err => {
      console.log(err);
    });
  }

  render() {
    return (
      <button 
        className={`btn btn-primary btn-sm ${this.props.customClasses}`}
        data-id={this.props.id}
        onClick={this.handleFollowUser}
      >
        Follow
      </button>
    );
  }
}

export default FollowButton;
