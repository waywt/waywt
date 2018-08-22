import React, { Component } from "react";
import "./Sidebar.css";

class Sidebar extends Component {
  state = {};
  render() {
    const { username, avatar } = this.props;
    return (
      <div className="categories-container">
        <div className="list-container">
          <div className="Post-user">
            <div id="sidebar-avatar" className="Post-user-avatar">
              <img src={avatar} alt={username} />
            </div>
            <div className="Post-user-username">
              <span>{username}</span>
            </div>
          </div>
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
