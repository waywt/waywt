import React, { Component } from 'react';
import './profile.css';

class TaggedOutfit extends Component {
  state = {
    showTagDetails: false
  }

  handleOnMouseOver = () => {
    this.setState({showTagDetails: true});
  }

  handleOnMouseLeave = () => {
    this.setState({showTagDetails: false});
  }

  render() {
    const { tagged } = this.props;

    return (
      <div className="col-6 col-md-4 mb-4">
        <div className="Profile-outfit">
          <img className="img-fluid w-100 Profile-outfit-img" src={tagged.Outfit.imageUrl} alt={tagged.Outfit.id} />
          <div className="Profile-outfit-overlay">
            {this.state.showTagDetails ? (
              <div className="po-tag-details w-100">
                <p className="po-tag-text">{tagged.text}</p>
                <p className="po-tag-creator">
                  <em>Tagged by</em> {tagged.User.username}
                </p>
              </div>
            ) : ''}
            <a
              href={`/outfits/${tagged.Outfit.id}`}
              className="Profile-outfit-tag"
              style={{top: `calc(${tagged.y}% - 10px)`, left: `calc(${tagged.x}% - 10px)`}}
              onMouseOver={this.handleOnMouseOver}
              onMouseLeave={this.handleOnMouseLeave}
            > </a>
          </div>
        </div>              
      </div> 
    );
  }
}

export default TaggedOutfit;
