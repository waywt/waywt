import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import QueryString from 'query-string';

class Temp extends Component {  
  render() {
    const parsed = QueryString.parse(this.props.location.search);
    const accessToken = parsed.accessToken;

    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
    }

    return <Redirect to='/' />;
  }
}

export default Temp;
