import React, { Component } from 'react';

class Error extends Component {
  render() {
    return (
      <section>
        <h2> Sorry, this page isn't available.</h2>
        <h6>The link you followed may be broken, or the page may have been removed. Go back to <a href="/">Instagarment</a>.</h6> 
      </section>     
    );
  }
}

export default Error;