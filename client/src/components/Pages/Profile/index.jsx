import React, { Component } from 'react';
//import {} from 
import './Profile.css';
import { userInfo } from '../../../utils/API';
import Header from '../../Header';
import UserDetailed from '../../UserDetailed';

class Profile extends Component {
  state = {
    username: null,
    id: null,
    profile: null,    
    outfitCount: null,
    followerCount: null,
    followingCount: null
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

  handleFollowUser = () => {
    const id = this.state.id;
    this.props.updateFollowingState(id, 'follow');
    this.setState({followerCount: this.state.followerCount + 1});
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
          />
          <hr />
        </div>
      </div>
    );
  }
}

export default Profile;
