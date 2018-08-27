import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { authSignup } from '../../utils/API';
import { validUsername, validEmail, validPassword } from '../../utils/Validate';
import './auth.css';
import InstagarmentLarge from '../../images/InstagarmentLarge.png'
import iPhoneX from '../../images/iPhoneX.png'

class Signup extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    usernameErr: false,
    emailErr: false,
    passwordErr: false,
    errMsg: '',
    fbUrl: '/auth/facebook',
    googUrl: '/auth/google'
  };

  componentDidMount() {
    if (/localhost/.test(window.location.href)) {
      this.setState({
        fbUrl: 'http://localhost:3100/auth/facebook',
        googUrl: 'http://localhost:3100/auth/google'
      });
    };
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({[name]: value, [`${name}Err`]: false});
  };

  handleSubmit = event => {
    event.preventDefault();

    const validUsernameRes = validUsername(this.state.username);
    const validEmailRes = validEmail(this.state.email);
    const validPwRes = validPassword(this.state.password);
    const errMsg = [validUsernameRes, validEmailRes, validPwRes].filter(errRes => {
      return errRes !== 'valid';
    });
    
    this.setState({
      usernameErr: validUsernameRes === 'valid' ? false : true,
      emailErr: validEmailRes === 'valid' ? false : true,
      passwordErr: validPwRes === 'valid' ? false : true,
      errMsg: errMsg.length ? errMsg[0] : '',
    });

    if (!errMsg.length) {
      authSignup(this.state).then(result => {
        if(!result.data.error) {
          localStorage.setItem('accessToken', result.data.accessToken);
          this.props.updateAuthState(true);
        } else if (result.data.error.username) {
          this.setState({usernameErr: true, errMsg: result.data.error.username});
        } else if (result.data.error.email) {
          this.setState({emailErr: true, errMsg: result.data.error.email});
        } else {
          this.setState({errMsg: 'Unauthorized.'})
        }
      });
    }
  }

  render() {
    if (this.props.authenticated) {
      return <Redirect to="/" />;
    } else {
      return (
        <div className="auth-page container">
          <div className="row">
            <div className="d-none d-md-block col">
              <div className="row">
                <div className="col"></div>
                <div className="col">
                  <img id="iphonePic" src={iPhoneX} alt="iphone"></img>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="row">
                <div className="col">
                  <div className="signup-page mx-auto">
                    <form onSubmit={this.handleSubmit}>
                      <div >
                        <img className="instagarment-logo" src={InstagarmentLarge} alt="instagarment logo" ></img>
                      </div>
                      <div id="signup-descrip">
                        Sign up to share what you're wearing with friends and followers.
                      </div>
                      <a href={this.state.fbUrl} className="w-75 btn facebook-signup">
                        <i className="fab fa-facebook-square fa-lg mr-2"></i>
                        Log in with Facebook
                      </a>
                      <a href={this.state.googUrl} className="w-75 btn google-signup">
                        <i className="fab fa-google fa-lg mr-2"></i>
                        Log in with Google
                      </a> 
                      <div className="d-flex justify-content-center">
                        <div className="linebreak"></div>
                        <div className="or p-2">OR</div>
                        <div className="linebreak"></div>
                      </div>
                      <label className="position-relative">
                        <input
                          className="authInput"
                          type="text"
                          name="username"
                          placeholder="Username"
                          value={this.state.username}  
                          onChange={this.handleInputChange}     
                        />
                        <div className="authError" style={this.state.usernameErr ? {opacity: 1} : {opacity: 0}}>
                          <i className="far fa-times-circle fa-lg"></i>
                        </div>
                      </label>
                      <label className="position-relative">
                        <input
                          className="authInput"
                          type="email"
                          name="email"
                          placeholder="Email address"
                          value={this.state.email}
                          onChange={this.handleInputChange}
                        />  
                        <div className="authError" style={this.state.emailErr ? {opacity: 1} : {opacity: 0}}>
                          <i className="far fa-times-circle fa-lg"></i>
                        </div>
                      </label>
                      <label className="position-relative">
                        <input
                          className="authInput" 
                          type="password"
                          name="password"
                          placeholder="Password"
                          value={this.state.password}
                          onChange={this.handleInputChange}
                        />
                        <div className="authError" style={this.state.passwordErr ? {opacity: 1} : {opacity: 0}}>
                          <i className="far fa-times-circle fa-lg"></i>
                        </div>
                      </label>
                      <div className="authErrorMsg">
                        {this.state.errMsg}
                      </div>
                      <button className="btn w-75" id="signup_btn" type="submit">Sign up</button>
                    </form>
                  </div>
                  <div className="loginBox mx-auto">
                    Have an account? <a href="/login">Log in</a>
                  </div>
                </div>
                <div className="d-none d-md-block col"></div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Signup;
