import React, { Component } from 'react';
import './UserDetailed.css';

class UserDetailed extends Component {
  handleFollowUser = () => {
    
  }

  render() {
    const {profile, username, id, currUser} = this.props;

    return (
      <div className="User-detailed">
        <div className="row justify-content-center">
          <div className="d-flex col-auto col-md-3 align-items-center">
            <img src="https://i.imgur.com/WUcNZ1D.jpg" alt="profile" className="profile-photo mb-2 mb-md-0"></img>
          </div>
          <div className="col-12 col-md-6">
            <div className="row">
              <div className="col-12 text-center text-md-left username-display">
                username
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-4">
                <span className="profileNumber">1 </span>
                <span className="profileCount">posts</span>
              </div>
              <div className="col-4">
                <span className="profileNumber">1 </span>
                <span className="profileCount">followers
              </span>
                </div>
              <div className="col-4">
                <span className="profileNumber">1 </span>
                <span className="profileCount">following</span>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-12">
                <span className="profileName">
                  Header
                </span>
              </div>
              <div className="col-12">
                <span className="profileBio">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam iste ullam, temporibus excepturi officiis sunt atque hic sequi ratione quas illum eveniet esse!
                </span>
              </div>
            </div>
          </div>        
        </div>
      </div>
    );
  }
}

export default UserDetailed;
