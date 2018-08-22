import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from "../../Header";
import "./Outfit.css";

class Outfit extends Component {
    state = {
      username: '',
      email: '',
      password: '',
      redirect: false,
    };

    render() {
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to='/'/>;
          } else {
            return (
          <div>
              <Header />
          </div>
        )
    }
}
}
  
  
  export default Post;
  