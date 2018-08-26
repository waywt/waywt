import React, { Component } from 'react';
import './profile.css';
import { 
  userInfo, userOutfits, userTagged, userFollowers, userFollowing 
} from '../../../utils/API';
import Header from '../../Header';
import UserDetailed from '../../UserDetailed';
import ProfileNav from './ProfileNav';
import ProfileContent from './ProfileContent';


class Profile extends Component {
  state = {
    username: null,
    id: null,
    profile: null,    
    outfitCount: null,
    followerCount: null,
    followingCount: null,
    activeTab: null,
    outfitsData: null,
    taggedData: null,
    followersData: null,
    followingData: null,
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
          followingCount: result.data[2][0].following_count,
          activeTab: 0
        });
      }
    }).catch(err => {
      console.log(err);
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const activeTab = this.state.activeTab;
    const differentTab = prevState.activeTab !== this.state.activeTab;
    const nullOutfitsData = this.state.outfitsData === null;
    const nullTaggedData = this.state.taggedData === null;
    const nullFollowersData = this.state.followersData === null;
    const nullFollowingData = this.state.followingData === null;

    if (activeTab === 0 && differentTab && nullOutfitsData) { 
      userOutfits(this.state.id).then(result => {
        this.setState({outfitsData: result.data});
      });
    } else if (activeTab === 1 && differentTab && nullTaggedData) {
      userTagged(this.state.id).then(result => {
        this.setState({taggedData: result.data});
      });
    } else if (activeTab === 2 && differentTab && nullFollowersData) {
      userFollowers(this.state.id).then(result => {
        this.setState({followersData: result.data});
      });
    } else if (activeTab === 3 && differentTab && nullFollowingData) {
      userFollowing(this.state.id).then(result => {
        this.setState({followingData: result.data});
      });
    }

    if (prevState.followerCount && prevState.followerCount !== this.state.followerCount) {
      userFollowers(this.state.id).then(result => {
        this.setState({followersData: result.data});
      });
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
      username, id, profile, outfitCount, followerCount, followingCount, activeTab, outfitsData, taggedData, followersData, followingData
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
          <ProfileContent 
            activeTab={activeTab}
            outfitsData={outfitsData}
            taggedData={taggedData}
            followersData={followersData}
            followingData={followingData}
          />
        </div>
      </div>
    );
  }
}

export default Profile;
