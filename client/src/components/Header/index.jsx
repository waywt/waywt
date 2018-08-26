import React, { Component } from "react";
import "./Header.css";

class Header extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    redirect: false,
  };

  logOut = (event) => {
    event.preventDefault();
    localStorage.removeItem('accessToken');
    this.props.resetState();
  }

  render() {
    return (
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
        <button className="btn my-2 my-sm-0 signOutButton" type="submit" onClick={this.logOut}>
          <i className="fas fa-sign-out-alt"></i> Log Out
        </button>
      </nav>
    );
  }
}
export default Header;
