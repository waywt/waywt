import React, { Component } from 'react';
import './UserDetailed.css';
import defaultAvatar from '../../images/default_avatar.png';

class UserDetailed extends Component {
  handleFollowUser = () => {
    
  }

  render() {
    const {
      authenticated, username, id, profile, outfitCount, followerCount, followingCount
    } = this.props;

    return (
      <div className="User-detailed">
        <div className="row">
          <div className="col-12 col-md-auto d-flex justify-content-center align-items-center">
            <img 
              src={profile && profile.avatar ? profile.avatar : defaultAvatar} 
              alt={username} 
              className="profile-photo"
            ></img>
          </div>
          <div className="col-12 col-md">
            <div className="row">
              <div className="col-12 profile-username">
                {username}
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-auto">
                <span className="profile-num-value">{outfitCount} </span>
                outfits
              </div>
              <div className="col-auto">
                <span className="profile-num-value">{followerCount} </span>
                followers
              </div>
              <div className="col-auto">
                <span className="profile-num-value">{followingCount} </span>
                following
              </div>
              <div className="col-auto flex-grow-1"></div>
            </div>
            <div className="row mt-2">
              <div className="col-12 my-2 profile-header">
                {profile && profile.header ? profile.header : ''}
              </div>
              <div className="col-12 profile-summary">
                {profile && profile.summary ? profile.summary : ''}
              </div>
            </div>
          </div>        
        </div>
      </div>
    );
  }
}

export default UserDetailed;
