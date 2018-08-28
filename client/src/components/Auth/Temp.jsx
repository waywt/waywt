import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Temp extends Component {  
  render() {
    const accessToken = this.props.location.search.match(/=(.*?)&/g)[0].slice(1, -1);

    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
    }

    return <Redirect to="/" />;
  }
}

export default Temp;
