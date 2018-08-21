import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from "../../Header";
import "./profile.css"



class Profile extends Component {
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
              <div className="profilePage">
                    <div className="row profile-header offset-md-2">
                    <div className="col-md-3">
                    <img src="https://i.imgur.com/WUcNZ1D.jpg" alt="profile-photo" className="profile-photo"></img>
                    </div>
                    <div className="col-md-6">
                    <div className="row">
                        <div className="col-md-3 usernameDisplay">
                        username
                        </div>
                        </div>
                    <div className="row profDisplay">
                        <div className="col-md-3">
                        <span className="profileNumber">1 </span>
                        <span className="profileCount">posts</span>
                        </div>
                        <div className="col-md-3">
                        <span className="profileNumber">1 </span>
                        <span className="profileCount">followers
                        </span>
                        </div>
                        <div className="col-md-3">
                        <span className="profileNumber">1 </span>
                        <span className="profileCount">following</span>
                        </div>
                    </div>
                    <div className="row profDisplay">
                    <div className="col-md-3">
                    <span className="profileName">
                    Name
                    </span>
                    </div>
                    </div>
                    <div className="row profDisplay2">
                    <div className="col-md-12">
                    <span className="profileBio">
                    Bio
                    </span>
                    </div>
                    </div>
                    </div>
                    </div>
                    <hr className="profileLine col-md-8 offset-md-2"></hr>
                <div className="row photoGrid">
                <div className="col-md-11 offset-md-2">
                    <div className="row">
                    <div className="col-md-3">
                    <a href="#">
                    <img src="https://i.imgur.com/E51bZN1.jpg" alt="image1" className="userImage"></img>
                    </a>
                    </div>
                    <div className="col-md-3">
                    <a href="#">
                    <img src="https://i.imgur.com/E51bZN1.jpg" alt="image1" className="userImage"></img>
                    </a>
                    </div>
                    <div className="col-md-3">
                    <a href="#">
                    <img src="https://i.imgur.com/E51bZN1.jpg" alt="image1" className="userImage"></img>
                    </a>
                    </div>
                    </div>
                </div>
                </div>
            </div>
          </div>
        )
    }
}
}
  
  
  export default Profile;
  