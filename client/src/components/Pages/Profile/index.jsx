import React, { Component } from 'react';
import './Profile.css';
import Header from '../../Header';
import UserDetailed from '../../UserDetailed';

class Profile extends Component {
  render() {
    const { 
      authenticated, resetState, updateOutfitsState, user, outfits, suggestions 
    } = this.props;

    return (
      <div className="Profile">
        <Header 
          authenticated={authenticated}
          resetState={resetState}
        />
        <div className="container">
          <UserDetailed />
          <hr />
        </div>
      </div>
    );
  }
}

export default Profile;
