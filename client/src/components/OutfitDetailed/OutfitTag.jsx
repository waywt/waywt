import React, { Component } from 'react';
import './OutfitDetailed.css';

class OutfitTag extends Component {
  toggleTagDetails = () => {
    if (this.props.tagDetails && this.props.tagDetails.id === this.props.tag.id) {
      this.props.handleTagDetails();
    } else {
      this.props.handleTagDetails(this.props.tag);
    }
  }

  render() {
    const { tag, tagDetails } = this.props;

    return (
      <div 
        className="od-tag" 
        style={{
          top: `calc(${tag.y}% - 10px)`, 
          left: `calc(${tag.x}% - 10px)`,
          backgroundColor: `${tagDetails && tagDetails.id === tag.id ? '#dff8ec' : 'white'}`
        }}
        onClick={this.toggleTagDetails}
      ></div>
    );
  }
}

export default OutfitTag;
