import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { authSignup } from '../../utils/API';
import './auth.css';

class Signup extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    redirect: false,
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({[name]: value});
  };

  handleSubmit = event => {
    event.preventDefault();

    authSignup(this.state).then(result => {
      if(!result.data.error) {
        localStorage.setItem('accessToken', result.data.accessToken);
        
      }
    });
  }

  render() {
    const { redirect } = this.state;

    if (this.props.authenticated || redirect) {
      return <Redirect to="/" />;
    } else {
      return (
        <div className="container">
          <div className="row mt-0 mt-sm-5">
            <div className="d-none d-md-block col order-2 order-md-1">
              <img id="iphonePic" src="iPhoneX.png" alt="iphone"></img>
            </div>
            <div className="col order-1 order-md-2">
              <div className="signup-page mx-auto">
                <form className="login-form" onSubmit={this.handleSubmit}>
                  <div >
                    <img className="instagarment-logo" src="instagarment.png" alt="instagarment logo" ></img>
                  </div>
                  <div id="signup-descrip">
                    Sign up to share what you're wearing with friends and followers.
                  </div>
                  <div className="w-75 btn facebook-signup">
                    <i className="fab fa-facebook-square fa-lg mr-2"></i>
                    Log in with Facebook
                  </div>
                  <div className="w-75 btn google-signup">
                    <i className="fab fa-google fa-lg mr-2"></i>
                    Log in with Google
                  </div> 
                  <div className="d-flex justify-content-center">
                    <div className="linebreak"></div>
                    <div className="or p-2">OR</div>
                    <div className="linebreak"></div>
                  </div>
                  <label>
                    <input
                      className="input"
                      type="text"
                      name="username"
                      placeholder="Username"
                      value={this.state.username}  
                      onChange={this.handleInputChange}     
                    />
                  </label>
                  <label>
                    <input
                      className="input"
                      type="email"
                      name="email"
                      placeholder="Email address"
                      value={this.state.email}
                      onChange={this.handleInputChange}
                    />  
                  </label>
                  <label>
                    <input
                      className="input" 
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={this.state.password}
                      onChange={this.handleInputChange}
                    />
                  </label>
                  <button className="btn w-75" id="signup_btn" type="submit">Sign up</button>
                </form>
              </div>
              <div className="loginBox mx-auto">
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
