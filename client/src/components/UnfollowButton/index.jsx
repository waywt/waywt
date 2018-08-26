import React, { Component } from 'react';
import { userUnfollow } from '../../utils/API';

class UnfollowButton extends Component {
  handleUnfollowUser = (event) => {
    event.preventDefault();
    const id = (event.target.getAttribute('data-id'));

    userUnfollow(id).then(result => {
      this.props.handleUnfollowUser();
    }).catch(err => {
      console.log(err);
    });
  }

  render() {
    return (
      <button 
        className={`btn btn-primary btn-sm ${this.props.customClasses}`}
        data-id={this.props.id}
        onClick={this.handleUnfollowUser}
      >
        Following <i className="fas fa-check"></i>
      </button>
    );
  }
}

export default UnfollowButton;
