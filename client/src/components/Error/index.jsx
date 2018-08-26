import React, { Component } from "react";
import Header from "../Header";

class Error extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    redirect: false,
  };
  render() {
    return (
      <article className= "Post" ref="Post">     
         <div> 
        <Header/>
    <div className="row">
      <div className="col-md">
        <div className="errorMes"> 
         <strong> <h2> Sorry, this page isn't available.</h2> </strong>
        </div>
      </div>
      </div>
  
    <div classname = "row">
      <div classname = "broken">
      <h6>The link you followed may be broken, or the page may have been removed. Go back to Instagarment.</h6>
     </div>
    </div>
      
    </div>
  </article>
    )
  }
}

export default Error;