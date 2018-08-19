import React, { Component } from 'react';
import { authSignup } from '../../utils/API';

class Signup extends Component {
  state = {
    username: '',
    email: '',
    password: '',
  };

  handleInputChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    
    authSignup(this.state).then(result => {
      console.log(result);
    });
  }

  render() {
    return (
      <div>
        <h1>SIGNUP FORM COMPONENT</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            Username
            <input
              type="text"
              name="username"
              value={this.state.username}  
              onChange={this.handleInputChange}     
            />
          </label>
          <label>
            Email
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleInputChange}
            />  
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleInputChange}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default Signup;
