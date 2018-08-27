import React, { Component } from 'react';
import './OutfitPage.css';
import Header from '../../Header';

class Profile extends Component {
  state = {
   
  }

  componentDidMount() {
    
  }

  componentDidUpdate(prevProps, prevState) {
    
  }

  render() {
    const { 
      currUser, authenticated, resetState, following 
    } = this.props;
    const {
      username, id, profile, outfitCount, followerCount, followingCount, activeTab, outfitsData, taggedData, followersData, followingData, userDNE
    } = this.state;

    return (
      <div>
        <Header 
          authenticated={authenticated}
          user={currUser}
          resetState={resetState}
        />
      </div>
    );
  }
}

export default Profile;
