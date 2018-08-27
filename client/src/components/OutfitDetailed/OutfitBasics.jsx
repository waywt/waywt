import React, { Component } from 'react';
import './OutfitDetailed.css';
import OutfitCategory from './OutfitCategory';
import OutfitActionBtns from './OutfitActionBtns';

class OutfitBasics extends Component {
  render() {
    const { category, outfitId, likeCount } = this.props;

    return (
      <div className="od-basics-container">
        <div className="row">
          <div className="col">
            <OutfitActionBtns outfitId={outfitId} likeCount={likeCount} />
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
