import React, { Component } from 'react';
import './FollowButton.css';

class FollowButton extends Component {
  handleFollowUser = (event) => {
    event.preventDefault();
    // API call to follow...
    console.log(event.target.getAttribute('data-id'));
  }

  render() {
    return (
      <button 
        className={`btn btn-primary btn-sm ${this.props.customClass}`}
        data-id={this.props.id}
        onClick={this.handleFollowUser}
      >
        Follow
      </button>
    );
  }
}

export default FollowButton;
