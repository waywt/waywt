import React, { Component } from 'react';
import './UserSnapshot.css';

class UserSnapshot extends Component {
  handleFollowUser = () => {
    
  }

  render() {
    const {profile, username, id} = this.props;

    return (
      <header>
        <div className="User-snapshot">
          <div className="User-avatar">
            <img 
              src={profile && profile.avatar ? profile.avatar : '/default_avatar.png'} 
              alt={username} 
            />
          </div>
          <div className="User-info">
            <a href={`/${username}`}>{username}</a>
            {profile && profile.header ? (
              <p>{profile.header}</p>
            ) : ''}
          </div>
          { id ? (
            <button 
              className="btn btn-primary btn-sm ml-auto"
              data-id={id}
              onClick={this.handleFollowUser}
            >
              Follow
            </button>
          ) : ''}
        </div>
      </header>
    );
  }
}

export default UserSnapshot;
