import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { authLogin } from '../../utils/API';
import './auth.css';
import InstagarmentLarge from '../../images/InstagarmentLarge.png';

class Login extends Component {
    state = {
      usernameOrEmail: '',
      password: '',
      usernameOrEmailErr: false,
      passwordErr: false,
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
      this.setState({ [name]: value, [`${name}Err`]: false });
    };
  
    handleSubmit = event => {
      event.preventDefault();
      
      authLogin(this.state).then(result => {
        if(!result.data.error) {
          localStorage.setItem('accessToken', result.data.accessToken);
          this.props.updateAuthState(true);
        } else if (result.data.error.usernameOrEmail) {
          this.setState({usernameOrEmailErr: true});
        } else {
          this.setState({passwordErr: true});
        }
      });
    }
  
    render() {
      if (this.props.authenticated) {
        return <Redirect to="/" />;
      } else {
        return (
          <div className="container">
            <div className="row mt-0 mt-sm-5">
              <div className="col">
                <div className="login-page mx-auto">
                  <form onSubmit={this.handleSubmit}>
                    <div >
                      <img className="instagarment-logo" src={InstagarmentLarge} alt="instagarment logo" ></img>
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
                        name="usernameOrEmail"
                        placeholder="Username or Email"
                        value={this.state.username}  
                        onChange={this.handleInputChange}     
                      />
                      <div className="authError" style={this.state.usernameOrEmailErr ? {opacity: 1} : {opacity: 0}}>
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
                    <button className="btn w-75" id="login_btn" type="submit">Log in</button>
                    <div>
                      <a className="password-link" href="/reset-password"> Forgot password? </a>
                    </div>
                  </form>
                </div>
                <div className="loginBox mx-auto">
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
  