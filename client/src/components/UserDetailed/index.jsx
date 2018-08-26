import React, { Component } from 'react';
import './UserDetailed.css';
import defaultAvatar from '../../images/default_avatar.png';
import FollowButton from '../FollowButton';
import UnfollowButton from '../UnfollowButton';

class UserDetailed extends Component {
  showBtns = () => {
    const {currUser, currUserFollowing, id} = this.props;

    if (currUser && id === currUser.id) {
      return (<button>Edit Profile</button>);
    } else if (currUser && currUserFollowing.includes(id)) {
      return (
        <UnfollowButton
          id={id}
          handleUnfollowUser={this.props.handleUnfollowUser}
        />
      );
    } else if (currUser) {
      return (
        <FollowButton 
          id={id}
          handleFollowUser={this.props.handleFollowUser}
        />
      );
    }
  }

  render() {
    const {
      authenticated, username, profile, outfitCount, followerCount, followingCount
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
              <div className="col-12 d-flex align-items-center">
                <span className="profile-username mr-3">{username}</span>
                {authenticated ? this.showBtns() : null}
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
