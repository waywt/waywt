import React, { Component } from 'react';
import './Profile.css';
import { userInfo } from '../../../utils/API';
import Header from '../../Header';
import UserDetailed from '../../UserDetailed';
import ProfileNav from './ProfileNav';
import ProfileOutfits from './ProfileOutfits';
import ProfileUsers from './ProfileUsers';

class Profile extends Component {
  state = {
    username: null,
    id: null,
    profile: null,    
    outfitCount: null,
    followerCount: null,
    followingCount: null,
    activeTab: 0
  }

  componentDidMount() {
    userInfo(this.props.username).then(result => {
      if (result.data) {
        this.setState({
          profile: result.data[0].Profile,
          id: result.data[0].id,
          username: result.data[0].username,
          outfitCount: result.data[0].outfit_count,
          followerCount: result.data[1][0].follower_count,
          followingCount: result.data[2][0].following_count
        });
      }
    }).catch(err => {
      console.log(err);
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.activeTab !== this.state.activeTab) {
      console.log('tab changed');
    }
  }

  showTabContent = () => {
    if (this.state.activeTab === 0) {
      return <ProfileOutfits />;      
    } else if (this.state.activeTab === 1) {
      return <ProfileOutfits />;     
    } else if (this.state.activeTab === 2) {
      return <ProfileUsers />;  
    } else {
      return <ProfileUsers />;
    }
  }

  handleFollowUser = () => {
    const id = this.state.id;
    this.props.updateFollowingState(id, 'follow');
    this.setState({followerCount: this.state.followerCount + 1});
  }

  handleUnfollowUser = () => {
    const id = this.state.id;
    this.props.updateFollowingState(id);
    this.setState({followerCount: this.state.followerCount - 1});
  }

  updateActiveTab = tab => {
    this.setState({activeTab: tab});
  }

  render() {
    const { 
      currUser, authenticated, resetState, following 
    } = this.props;
    const {
      username, id, profile, outfitCount, followerCount, followingCount
    } = this.state;

    return (
      <div className="Profile">
        <Header 
          authenticated={authenticated}
          resetState={resetState}
        />
        <div className="container">
          <UserDetailed
            authenticated={authenticated} 
            currUser={currUser}
            currUserFollowing={following}
            username={username}
            id={id}
            profile={profile}
            outfitCount={outfitCount}
            followerCount={followerCount}
            followingCount={followingCount}
            handleFollowUser={this.handleFollowUser}
            handleUnfollowUser={this.handleUnfollowUser}
          />
          <hr className="Profile-hr" />
          <ProfileNav updateActiveTab={this.updateActiveTab} />
          {this.showTabContent()}
        </div>
      </div>
    );
  }
}

export default Profile;
