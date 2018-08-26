import React, { Component } from 'react';
import './Profile.css';
import TaggedOutfit from './TaggedOutfit';
import UserSnapshot from '../../UserSnapshot';

class ProfileContent extends Component {
  showContent = () => {
    const { 
      activeTab, outfitsData, taggedData, followersData, followingData 
    } = this.props;

    if (activeTab === 0) {
      return (
        <div className="row">
          {outfitsData && outfitsData.map(outfit => {
            return (
              <div className="col-6 col-md-4 mb-4" key={`profileOutfits-${outfit.id}`}>
                <div className="Profile-outfit">
                  <img className="img-fluid w-100 Profile-outfit-img" src={outfit.imageUrl} alt={outfit.id} />
                  <a href={`/outfits/${outfit.id}`} className="Profile-outfit-overlay">
                    <div className="row no-gutters w-100">
                      <div className="col-12 col-sm text-center text-sm-right">
                        <span>
                          <i className="fas fa-heart"></i> {outfit.Likes.length}
                        </span>
                      </div>
                      <div className="col-12 col-sm text-center text-sm-left">
                        <span>
                          <i className="fas fa-comment"></i> {outfit.Comments.length}
                        </span>
                      </div>
                    </div>
                  </a>
                </div>              
              </div>
            );
          })}
        </div>
      );
    } else if (activeTab === 1) {
      return (
        <div className="row">
          {taggedData && taggedData.map(tagged => {
            return (
              <TaggedOutfit tagged={tagged} key={`taggedOutfit-${tagged.Outfit.id}`}/>
            );
          })}
        </div>
      );
    } else if (activeTab === 2) {
      return (
        <div className="row no-gutters">
          {followersData && followersData.map(follower => {
            return (
              <div className="col-12 col-sm-6" key={follower.UserFollower.id}>
                <UserSnapshot
                  profile={follower.UserFollower.Profile} 
                  username={follower.UserFollower.username}
                />
              </div>
            )
          })}
        </div>
      );
    } else {
      return (
        <div className="row">
          {followingData && followingData.map(following => {
            return (
              <div className="col-12 col-sm-6" key={following.User.id}>
                <UserSnapshot
                  profile={following.User.Profile} 
                  username={following.User.username}
                />
              </div>
            )
          })}
        </div>
      );
    }
  }

  render() {
    return (
      <section className="Profile-section">
        {this.showContent()}
      </section>
    );
  }
}

export default ProfileContent;
