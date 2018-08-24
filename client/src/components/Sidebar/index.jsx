import React, { Component } from 'react';
import './Sidebar.css';
import UserSnapshot from '../UserSnapshot';

class Sidebar extends Component {
  render() {
    const { username, profile } = this.props;
    
    return (
      <div className="categories-container">
        <div className="list-container">
          <UserSnapshot username={username} profile={profile}/>
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
      </div>
    );
  }
}

export default Sidebar;
