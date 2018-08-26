import React, { Component } from 'react';
import './Profile.css';

class ProfileContent extends Component {
  showContent = () => {
    const { activeTab, outfitsData } = this.props;

    if (activeTab === 0) {
      return (
        <div className="row">
          {outfitsData && outfitsData.map(outfit => {
            return (
              <div className="col-12 col-sm-6 col-md-4 mb-4" key={`profileOutfits-${outfit.id}`}>
                <div>
                  <img className="img-fluid w-100" src={outfit.imageUrl} alt={outfit.id} />
                </div>              
              </div>
            );
          })}
        </div>
      );
    } else if (activeTab === 1) {
      return <h1>Tagged</h1>;
    } else if (activeTab === 2) {
      return <h1>Followers</h1>;
    } else {
      return <h1>Following</h1>;
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
