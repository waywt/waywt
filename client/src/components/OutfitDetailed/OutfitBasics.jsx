import React, { Component } from 'react';
import './OutfitDetailed.css';
import OutfitCategory from './OutfitCategory';
// import OutfitLikes from './OutfitLikes';

class OutfitBasics extends Component {
  render() {
    const { category } = this.props;

    return (
      <div className="od-basics-container">
        <div className="row">
          <div className="col">
            <button>Likes</button><br/><p>numlikes</p>
          </div>
          <div className="col text-right">
            <OutfitCategory category={category} />
          </div>
        </div>
      </div>
    );
  }
}

export default OutfitBasics;
