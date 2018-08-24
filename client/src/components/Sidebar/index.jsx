import React, { Component } from 'react';
import './Sidebar.css';
import UserSnapshot from '../UserSnapshot';
import { outfitsFollowing } from '../../utils/API';

class Sidebar extends Component {
  handleCategoryClick = (event) => {
    event.preventDefault();
    const CategoryId = event.target.getAttribute('data-id');

    outfitsFollowing(`?cat=${CategoryId}`).then(result => {
      const outfits = result.data.outfits || result.data.suggestedOutfits;
      this.props.updateOutfitsState(outfits);
    }).catch(err => {
      console.log(err);
    });
  }

  render() {
    const { id, username, profile } = this.props;
    
    return (
      <div className="Sidebar d-none d-md-block">
        <UserSnapshot
          id={id}
          username={username} 
          profile={profile}
          currUser={true}
        />
        <hr />
        <ul>
          <li>
            <a href="" data-id={1} onClick={this.handleCategoryClick}>Casual</a>
          </li>
          <li>
            <a href="" data-id={2} onClick={this.handleCategoryClick}>Formal</a>
          </li>
          <li>
            <a href="" data-id={3} onClick={this.handleCategoryClick}>Business</a>
          </li>
          <li>
            <a href="" data-id={4} onClick={this.handleCategoryClick}>Sleepwear</a>
          </li>
          <li>
            <a href="" data-id={5} onClick={this.handleCategoryClick}>Athletic</a>
          </li>
          <li>
            <a href="" data-id={6} onClick={this.handleCategoryClick}>Outerwear</a>
          </li>
        </ul>
      </div>
    );
  }
}

export default Sidebar;
