import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { authSignup } from '../../utils/API';
import "./signup.css"

class Signup extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    redirect: false,
  };

  handleInputChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    
    authSignup(this.state).then(result => {
      if(!result.data.error) {
        localStorage.setItem('accessToken', result.data.accessToken);
        localStorage.setItem('username', result.data.username);
        this.setState({ redirect: true });
      }
    });
  }

  render() {
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to='/'/>;
    } else {
      return (
        <div>
          <div class="row">
          <div class="col-md-4 offset-md-2">
          <img id="iphonePic" src="./iPhoneX.png" alt="iphone"></img></div>
          <div class="col-md-4">
          <div class="signup-page">
          <form class="login-form" onSubmit={this.handleSubmit}>
            <div >
              <img src="./instagarment.png" alt="instagarment logo" class="instagarment-logo"></img>
            </div>
            <div id="signup-descrip">
            Sign up to share what you're wearing with friends and followers.
            </div>
            <a href="http://localhost:3100/auth/facebook">
            <div class="w-75 btn facebook-signup">
            <i class="fab fa-facebook-square fa-lg"></i>  Log in with Facebook
            </div> 
            </a>
            
            <div class="d-flex">
              <div class="linebreak1"></div>
              <div class="or p-2">OR</div>
              <div class="linebreak2"></div>
            </div>
            <label>
              <input 
              class="input"
              id="username_input"
                type="text"
                name="username"
                placeholder=" Username"
                value={this.state.username}  
                onChange={this.handleInputChange}     
              />
            </label>
            <br></br>
            <label>
              <input
              class="input"
                id="email_input"
                type="email"
                name="email"
                placeholder=" Email address"
                value={this.state.email}
                onChange={this.handleInputChange}
              />  
            </label>
            <br></br>
            <label>
              <input
              class="input"
                id="password_input"
                type="password"
                name="password"
                placeholder=" Password"
                value={this.state.password}
                onChange={this.handleInputChange}
              />
            </label>
            <br></br>
            <button class="btn w-75" id="signup_btn" type="submit">Sign up</button>
          </form>
          </div>
          <div class="loginBox">
          Have an account? <a href="/login">Log in</a>
          </div>
          </div>
          </div>
          
        </div>
      );
    }
  }
}

export default Signup;
