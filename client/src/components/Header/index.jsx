import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './Header.css';

class Header extends Component {
  state = {
    redirect: false,
  };

  logOut = (event) => {
    event.preventDefault();
    localStorage.removeItem('accessToken');
    this.props.resetState();
    this.setState({redirect: true});
  }

  render() {
    return this.state.redirect ? (
      <Redirect to="/signup" />
    ) : (
      <nav className="Nav navbar justify-content-between">
        <a className="navbar-brand" href="/">Instagarment</a>
        <form className="d-none d-md-block form-inline">
          <input
            id="header-input"
            className="form-control mr-sm-2"
            type="search"
            placeholder="search..."
            aria-label="Search"
          />
          <button className="btn my-2 my-sm-0 searchButton" type="submit">
            Search
          </button>
        </form>
        {this.props.authenticated ? (
          <div>
            <a
              href={`/${this.props.user ? this.props.user.username : ''}`}
              className="btn nb-profile-btn"
            >
              <i className="fas fa-user"></i>
            </a>
            <button 
              className="btn nb-logout-btn"
              type="submit" 
              onClick={this.logOut}
            >
              <i className="fas fa-sign-out-alt"></i>
            </button>
          </div>
        ) : (
          <a
            href="/login"
            className="btn nb-login-btn"
          >
            <i className="fas fa-sign-in-alt"></i>
          </a>  
        )}
      </nav>
    );
  }
}
export default Header;
