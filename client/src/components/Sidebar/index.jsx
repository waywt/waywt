import React, { Component } from 'react';
import './Sidebar.css';
import UserSnapshot from '../UserSnapshot';

class Sidebar extends Component {
  render() {
    const { id, username, profile } = this.props;
    
    return (
      <div className="Sidebar">
        <UserSnapshot 
          id={id}
          username={username} 
          profile={profile}
          currUser={true}
        />
        <hr />
        <ul>
          <li>Casual</li>
          <li>Formal</li>
          <li>Business</li>
          <li>Sleepwear</li>
          <li>Athletic</li>
          <li>Outerwear</li>
        </ul>
      </div>
    );
  }
}

export default Sidebar;
