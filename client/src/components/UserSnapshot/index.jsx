import React, { Component } from 'react';
import './UserSnapshot.css';

class UserSnapshot extends Component {
  handleFollowUser = () => {
    
  }

  render() {
    const {profile, username, id, currUser, customStyle} = this.props;

    return (
      <header style={customStyle}>
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
          { id && !currUser ? (
            <button 
              className="btn btn-primary btn-sm ml-auto"
              data-id={id}
              onClick={this.handleFollowUser}
            >
              Follow
            </button>
          ) : ''}
          { id && currUser ? (
            <a href="/outfits/new" className="new-Outfit-link ml-auto">
              <i className="fas fa-tshirt fa-lg"></i>
            </a>
          ) : ''}
        </div>
      </header>
    );
  }
}

export default UserSnapshot;
