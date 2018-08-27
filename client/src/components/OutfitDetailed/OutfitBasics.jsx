import React, { Component } from 'react';
import './OutfitDetailed.css';
import OutfitCategory from './OutfitCategory';
import OutfitActionBtns from './OutfitActionBtns';

class OutfitBasics extends Component {
  render() {
    const { authenticated, category, outfitId, likeCount, showLink } = this.props;

    return (
      <div className="od-basics-container">
        <div className="row">
          <div className="col">
            <OutfitActionBtns
              authenticated={authenticated} 
              outfitId={outfitId} 
              likeCount={likeCount}
              showLink={showLink} 
            />
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
