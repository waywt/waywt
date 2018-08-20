import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { authSignup } from '../../utils/API';
import "./signup.css"

class Login extends Component {
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
            <div class="col-md-4 offset-md-4">
            <div class="login-page">
            <form class="login-form" onSubmit={this.handleSubmit}>
              <div >
                <img src="./instagarment.png" alt="instagarment logo" class="instagarment-logo"></img>
              </div>
              <label>
                <input 
                class="input"
                id="login-username_input"
                  type="text"
                  name="username"
                  placeholder=" Username"
                  value={this.state.username}  
                  onChange={this.handleInputChange}     
                />
              </label>
              <label>
                <input
                class="input"
                  id="login-password_input"
                  type="password"
                  name="password"
                  placeholder=" Password"
                  value={this.state.password}
                  onChange={this.handleInputChange}
                />
              </label>
              <br></br>
              <button class="btn w-75" id="signup_btn" type="submit">Log in</button>

              <br></br>
              <br></br>

              <a class="password-link" href="#"> Forgot password? </a>
            </form>
            </div>
            <div class="loginBox">
            Don't have an account? <a href="/signup">Sign up</a>
            </div>
            </div>
            </div>
            
          </div>
        );
      }
    }
  }
  
  export default Login;
  