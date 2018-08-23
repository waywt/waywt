import React, { Component } from "react";
import Header from "../../Header";
import "./PostForm.css";
import ImgUpload from "./ImgUpload";

class PostForm extends Component {
  state = {
    imageURL: "",
    description: "",
    categoryId: "",
    buttonArray: [],
    tagArray: [
      {
        text: "",
        x: null,
        y: null,
        TaggedId: null
      }
    ]
  };

  createButton = style => {
    return (
      <button id="button1" style={style} />
      // <div class="dropdown">
      //   <button class="" id="button1" style={style} />
      //   <div class="dropdown-content">
      //     <a href="#">Name of Shirt</a>
      //   </div>
      // </div>
    );
  };

  showCoords = event => {
    var rect = event.target.getBoundingClientRect();

    console.log("RECT", rect);

    var x = ((event.clientX - rect.left) / 500) * 100;
    var y = ((event.clientY - rect.top) / 500) * 100;
    var coords = "X coords: " + x + ", Y coords: " + y;
    console.log(coords);

    const newButtonStyle = this.getButtonStyles(x, y);

    this.setState({
      buttonArray: [...this.state.buttonArray, newButtonStyle]
    });
  };

  getButtonStyles(xCoord, yCoord) {
    let styles = {
      position: "absolute",
      height: "20px",
      width: "20px",
      borderRadius: "100%",
      top: "",
      left: ""
    };
    styles.top = yCoord + "%";
    styles.left = xCoord + "%";
    console.log(styles);
    return styles;
  }

  render() {
    const {
      imgURL,
      description,
      xCoord,
      yCoord,
      xPercentage,
      yPercentage,
      buttonArray
    } = this.state;
    return (
      <div className="postform-container">
        <header>
          <Header />
        </header>
        <div class="post-jumbotron jumbotron jumbotron-fluid">
          <div class="text-container container text-center">
            <h1 class="display-3">Upload an Outfit!</h1>
            <p class="lead">
              You can then click on your photo to add tags to tell everyone what
              you're wearing.
            </p>
            <input
              type="file"
              class="inputForm form-control-file"
              id="exampleFormControlFile1"
            />
          </div>
        </div>
        <div class="post-jumbotron jumbotron jumbotron-fluid">
          <div class="text-container container text-center">
            <h1 class="display-3">Upload an Outfit!</h1>
            <p class="lead">
              You can then click on your photo to add tags to tell everyone what
              you're wearing.
            </p>
            <input
              type="file"
              class="inputForm form-control-file"
              id="exampleFormControlFile1"
            />
          </div>
        </div>
        <div onClick={this.showCoords} className="picture-container">
          {this.state.buttonArray.map((style, index) => {
            return (
              <button
                id="button1"
                style={style}
                key={`button_${index}${style.top}`}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default PostForm;
<div />;
