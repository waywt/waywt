import React, { Component } from 'react';
import './profile.css';

class ProfileNav extends Component {
  state = {
    tabActive: [1, 0, 0, 0]
  }
  
  handleNavTabClick = tab => {
    const tabActive = [0, 0, 0, 0];
    if (this.state.tabActive[tab] !== 1) {
      tabActive[tab] = 1;
      this.setState({tabActive: tabActive});
      this.props.updateActiveTab(tab);
    }
  }

  render() {
    return (
      <nav className="Profile-nav">
        <div className="row justify-content-center">
          <div 
            className={`col-auto Profile-nav-tab-${this.state.tabActive[0]}`}
            onClick={() => this.handleNavTabClick(0)}
          >
            <span className="d-none d-md-block">OUTFITS</span>
            <span className="d-md-none"><i className="fas fa-tshirt"></i></span>
          </div>
          <div 
            className={`col-auto Profile-nav-tab-${this.state.tabActive[1]}`} 
            onClick={() => this.handleNavTabClick(1)}
          >
            <span className="d-none d-md-block">TAGGED</span>
            <span className="d-md-none"><i className="fas fa-tags"></i></span>
          </div>
          <div 
            className={`col-auto Profile-nav-tab-${this.state.tabActive[2]}`}
            onClick={() => this.handleNavTabClick(2)}
          >
            <span className="d-none d-md-block">FOLLOWERS</span>
            <span className="d-md-none"><i className="fas fa-user-friends"></i></span>
          </div>
          <div 
            className={`col-auto Profile-nav-tab-${this.state.tabActive[3]}`}
            onClick={() => this.handleNavTabClick(3)}
          >
            <span className="d-none d-md-block">FOLLOWING</span>
            <span className="d-md-none"><i className="fas fa-check"></i></span>
          </div>
        </div>
      </nav>
    );
  }
}

export default ProfileNav;
