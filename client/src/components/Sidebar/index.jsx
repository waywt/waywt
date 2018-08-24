import React, { Component } from 'react';
import './Sidebar.css';
import UserSnapshot from '../UserSnapshot';

class Sidebar extends Component {
  handleCategoryClick = (event) => {
    event.preventDefault();
    // make API call
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
          <li><a href="" onClick={this.handleCategoryClick}>Casual</a></li>
          <li><a href="" onClick={this.handleCategoryClick}>Formal</a></li>
          <li><a href="" onClick={this.handleCategoryClick}>Business</a></li>
          <li><a href="" onClick={this.handleCategoryClick}>Sleepwear</a></li>
          <li><a href="" onClick={this.handleCategoryClick}>Athletic</a></li>
          <li><a href="" onClick={this.handleCategoryClick}>Outerwear</a></li>
        </ul>
      </div>
    );
  }
}

export default Sidebar;
