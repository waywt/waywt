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
    outfit_count: null,
    follower_count: null,
    following_count: null
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

  render() {
    const { 
      currUser, authenticated, resetState 
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
            currUser={currUser}
            authenticated={authenticated} 
            username={username}
            id={id}
            profile={profile}
            outfitCount={outfitCount}
            followerCount={followerCount}
            followingCount={followingCount}
          />
          <hr />
        </div>
      </div>
    );
  }
}

export default Profile;
