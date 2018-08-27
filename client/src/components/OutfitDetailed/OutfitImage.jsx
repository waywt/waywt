import React, { Component } from 'react';
import './OutfitDetailed.css';
import OutfitTag from './OutfitTag';

class OutfitImage extends Component {
  state = {
    showTags: false,
    tagDetails: null
  }

  toggleShowTags = () => {
    this.setState({showTags: !this.state.showTags})
  }

  handleTagDetails = (tag) => {
    if (tag) {
      this.setState({tagDetails: tag});
    } else {
      this.setState({tagDetails: null});
    }
  }
 
  render() {
    const { imgLink, id, tags } = this.props;
    const { tagDetails } = this.state;

    return (
      <div className="od-img-container">
        <img className="od-img" src={imgLink} alt={id}/>
        <div 
          className={`od-img-overlay active-${this.state.showTags ? '1' : '0'}`}
          onClick={this.toggleShowTags}
        >
          {tags && tags.map(tag => {
            return (
              <OutfitTag 
                tag={tag}
                tagDetails={this.state.tagDetails}
                handleTagDetails={this.handleTagDetails} 
                key={tag.id} 
              />
            );
          })}
          {tagDetails ? (
            <div className="od-tag-details">
              <p className="od-td-txt">{tagDetails.text}</p>
              {tagDetails.Tagged ? (
                <p className="od-td-usr">
                  <a href={`/${tagDetails.Tagged.username}`}>{tagDetails.Tagged.username}</a>
                </p>
              ): ''}
            </div>
          ) : ''}
        </div>
      </div>
    );
  }
}

export default OutfitImage;
