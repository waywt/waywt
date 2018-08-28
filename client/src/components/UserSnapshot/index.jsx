import React, { Component } from 'react';
import './UserSnapshot.css';
import defaultAvatar from '../../images/default_avatar.png';
import { FollowButton, UnfollowButton } from '../Buttons';

class UserSnapshot extends Component {
  handleFollowUser = () => {
    const id = this.props.id;
    this.props.updateFollowingState(id, 'follow');
  }

  handleUnfollowUser = () => {
    const id = this.props.id;
    this.props.updateFollowingState(id);
  }
  
  render() {
    const {
      profile, username, id, currUserId, customStyle, following
    } = this.props;

    return (
      <div className="User-snapshot" style={customStyle}>
        <div className="User-avatar">
          <img 
            src={profile && profile.avatar ? profile.avatar : defaultAvatar} 
            alt={username} 
          />
        </div>
        <div className="User-info">
          <a href={`/${username}`}>{username}</a>
          {profile && profile.header ? (
            <p>{profile.header}</p>
          ) : ''}
        </div>
        {currUserId && id === currUserId ? (
          <a href="/outfits/new" className="new-Outfit-link ml-auto">
            <i className="fas fa-tshirt fa-lg"></i>
          </a>
        ) : ''}
        {following && !following.includes(id) && id !== currUserId ? (
          <FollowButton 
            customClasses={'ml-auto'}
            id={id}
            handleFollowUser={this.handleFollowUser}
          />
        ) : ''}
        {following && following.includes(id) ? (
          <UnfollowButton 
            customClasses={'ml-auto'}
            id={id}
            handleUnfollowUser={this.handleUnfollowUser}
          />
        ) : ''}
        {/* { id && !currUser ? (
          <button 
            className="btn btn-primary btn-sm ml-auto"
            data-id={id}
            onClick={this.handleFollowUser}
          >
            Follow
          </button>
        ) : ''}
        { id && currUser ? (
          
        ) : ''} */}
      </div>
    );
  }
}

export default UserSnapshot;
