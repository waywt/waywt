import React, { Component } from 'react';
import './UserSnapshot.css';

class UserSnapshot extends Component {
  render() {
    const {avatar, username} = this.props;

    return (
      <header>
        <div className="User-snapshot">
          <div className="User-avatar">
            <img src={avatar} alt={username} />
          </div>
          <div className="User-username">
            <a href={`/${username}`}>{username}</a>
          </div>
        </div>
      </header>
    );
  }
}

export default UserSnapshot;
