import React, { Component } from "react";
import "./ImgUpload.css";

class ImgUpload extends Component {
  state = {
    imgURL: "",
    description: "",
    xCoord: "",
    yCoord: "",
    xPercentage: "",
    yPercentage: "",
    tagArray: []
  };

  createButton = style => {
    return (
      <div className="tagcontainer">
        <button id="button1" style={style} />
        <div class="dropdown-content">
          <a href="#">Name of Clothing</a>
        </div>
      </div>
      // <div class="dropdown">
      //   <button class="" id="button1" style={style} />
      //   <div class="dropdown-content">
      //     <a href="#">Name of Shirt</a>
      //   </div>
      // </div>
    );
  };

  render() {
    return (
      <div className="uploadedImg" onClick={this.showCoords}>
        {this.state.tagArray.map(button => {
          return button;
        })}
      </div>

      // <article className="Post" ref="Post" onClick={this.showCoords}>
      //   {this.state.tagArray.map(button => {
      //     return button;
      //   })}
      //   <div className="Post-image">
      //     <button id="button1" />
      //     <div className="Post-image-bg" />
      //   </div>
      // </article>
    );
  }

  showCoords = event => {
    var x = (event.clientX / 500) * 100;
    var y = (event.clientY / 500) * 100;
    var coords = "X coords: " + x + ", Y coords: " + y;
    console.log(event);
    console.log(coords);
    console.log(x);
    console.log(y);

    const newButton = this.createButton(this.getButtonStyles(x, y));

    this.setState({
      tagArray: [...this.state.tagArray, newButton]
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
}

export default ImgUpload;
