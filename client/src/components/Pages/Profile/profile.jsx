import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from "../../Header";
import "./profile.css";




class Profile extends Component {
    state = {
      username: '',
      email: '',
      password: '',
      redirect: false,
    };


    imageSquare = props => {
        return (
            <div className="col-md-3">
            <div className="imageContainer">
            <a href="">
                <img src="https://i.imgur.com/E51bZN1.jpg" alt="image1" className="userImage"></img>
                <div class="iconProfile">
                    <i class="fas fa-heart"></i>
                    <i class="fas fa-comment iconCommentProfile"></i>
                </div>
             </a>   
             </div>
        </div>
        )
    }

    
    render() {
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to='/'/>;
          } else {
            return (
          <div>
              <Header />
              <div className="profilePage">
                   
                    <div className="col-md-6">
                    
                    
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
                        {this.imageSquare()}
                        {this.imageSquare()}
                        {this.imageSquare()}
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
  