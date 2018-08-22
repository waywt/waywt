import React, { Component } from "react";
import "./Header.css";

class Header extends Component {
  render() {
    return (
      <nav class="Nav navbar justify-content-between">
        <a class="navbar-brand">Instagarment</a>
        <form class="form-inline">
          <input
            id="header-input"
            class="form-control mr-sm-2"
            type="search"
            placeholder="search..."
            aria-label="Search"
          />
          <button class="btn my-2 my-sm-0" type="submit">
            Search
          </button>
        </form>
      </nav>
    );
  }
}
export default Header;
