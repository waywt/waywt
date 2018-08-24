import React, { Component } from "react";
import "./OutfitPage.css";
import Header from '../Header'
// import { url } from "inspector";
import like_btn_active from '../../images/like_btn_active.png'
import like_btn from '../../images/like_btn.png'

class OutfitPage extends Component {
  
  state = {
     imgsrc: like_btn,
     clicked: false
  };

  handleClick = () => {
    if (this.state.clicked===false){
      this.setState({
        imgsrc: like_btn_active,
        clicked:true
       });
    }
    else {
      this.setState({
        imgsrc: like_btn,
        clicked: false
      })
    }
   };

  render() {
    const { username, avatar, image, description } = this.props;

    return (
      <div>
      <Header />
      <article className="Post" ref="Post">
        <div className="row">
          <div className="col-8">
            <div className="outfit-image-container">
                <img src="https://i.imgur.com/FR5cxD7.jpg" alt="gray-cats" className="outfit-image"/>
            </div>
              {/* <div className="Post-image">
          <button id="button1" />
          <div className="Post-image-bg">
            <img alt={description} src={image} />
          </div>
        </div> */}
          </div>
          <div className="col-4">
          <div className="row">
          <a href="/profile">
              <div className="Post-user">
                  <div className="Post-user-avatar">
                  
                    <img src="https://i.imgur.com/57cpvBy.jpg" alt="avatar-image" />
                    {/* <img src={avatar} alt={username} /> */}
                  </div>
                  <div className="Post-user-username">
                    {/* <span>{username}</span> */}
                    <span className="Post-user-username">Linus</span>
                  </div>
              </div>
              </a>
              </div>
              <hr />
            <div className="row">
                <div className="Post-description">
                  {/* <strong>{username}</strong> {description} */}
                  <strong>Linus</strong> Post description
                  </div>
            </div>
        <div className="comment-container">
          <div className="Post-comment">
            <strong>pat_gabes</strong> This ain't even great
          </div>
          <div className="Post-comment">
            <strong>pat_gabes</strong> Sick fit dude
          </div>
          <div className="Post-comment">
            <strong>pat_gabes</strong> Wow, this fit is dope bro
          </div>
        </div>
        <hr />
        <div className="action-buttons">
          {/* <button className="btn like-btn" /> */}
          <img onClick={this.handleClick}src={this.state.imgsrc} className="likeButton" ></img>
        </div>
        <div className="Post-likes">
          <strong>1,481 likes</strong>
        </div>
        <hr></hr>
        <form>
          <div className="form-group">
            <input
              id="comment-form"
              type="text"
              className="form-control"
              id="formGroupExampleInput"
              placeholder="Add a comment..."
            />
          </div>
        </form>
        </div>
        </div>
      </article>
      </div>
    );
  }
}
export default OutfitPage;
