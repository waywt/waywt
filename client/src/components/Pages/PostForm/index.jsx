import React, { Component } from "react";
import Header from "../../Header";
import "./PostForm.css";
import ImgUpload from "./ImgUpload";
import { createOutfit } from "../../../utils/API";

class PostForm extends Component {
  state = {
    imageURL: "https://loremflickr.com/320/240/fashion",
    description: "Lorem ipsum dolor sit amet",
    categoryId: 1,
    buttonArray: [],
    tagArray: []
  };

  test = event => {
    event.preventDefault();

    const newOutfitWithTags = {
      description: this.state.description,
      imageUrl: this.state.imageURL,
      categoryId: this.state.categoryId,
      outfitTagsArray: JSON.stringify(this.state.tagArray)
    };

    createOutfit(newOutfitWithTags).then(result => {
      console.log(result);
    });
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

    var x = ((event.clientX - rect.left) / 729) * 100;
    var y = ((event.clientY - rect.top) / 970) * 100;
    var coords = "X coords: " + x + ", Y coords: " + y;
    console.log(coords);

    const newButtonStyle = this.getButtonStyles(x, y);
    const xycoords = (x, y);

    this.setState({
      tagArray: [...this.state.tagArray, { x: x, y: y }],
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
          <Header
            authenticated={this.props.authenticated}
            updateAuthState={this.props.updateAuthState}
          />
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
            <button type="submit" onClick={this.test}>
              Submit
            </button>
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
