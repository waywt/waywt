import React, { Component } from "react";
import "./Tag.css";

class Tag extends Component {
  state = {
    id: 1,
    xCoord: "",
    yCoord: "",
    xPercentage: "",
    yPercentage: "",
    tagArray: []
  };

  createButton = style => {
    return <button style={style} />;
  };

  render() {
    return (
      <React.Fragment>
        <div id="picture" onClick={this.showCoords}>
          {this.state.tagArray.map(button => {
            return button;
          })}
        </div>
      </React.Fragment>
    );
  }

  showCoords = event => {
    var x = (event.clientX / 500) * 100;
    var y = (event.clientY / 500) * 100;
    var coords = "X coords: " + x + ", Y coords: " + y;
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
      height: "30px",
      width: "30px",
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

export default Tag;
