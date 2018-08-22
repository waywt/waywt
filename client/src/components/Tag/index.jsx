import React, { Component } from "react";
import "./Tag.css";

class Tag extends Component {
  state = {
    id: 1,
    xCoord: "",
    yCoord: "",
    xPercentage: "",
    yPercentage: "",
    dynamicStyles: "",
    hidden: true,
    finalStyles: {},
    newVar: []
  };

  createButton = style => {
    return <button style={style} />;
  };

  render() {
    return (
      <React.Fragment>
        <div id="picture" onClick={this.showCoords}>
          {this.state.newVar.map(button => {
            return button;
          })}
        </div>
      </React.Fragment>
    );
  }

  showCoords = event => {
    var x = (event.clientX / 500) * 100;
    var y = (event.clientY / 500) * 100;
    // var x = event.clientX;
    // var y = event.clientY;
    var coords = "X coords: " + x + ", Y coords: " + y;
    console.log(coords);
    console.log(x);
    console.log(y);

    const newButton = this.createButton(this.getButtonStyles(x, y));

    this.setState({
      newVar: [...this.state.newVar, newButton]
    });

    // this.setState({ xCoord: x, yCoord: y }, () => {
    //   this.getButtonStyles();
    //   this.setState({ hidden: false });
    // });
  };

  getButtonStyles(xCoord, yCoord) {
    // let xCoord = this.state.xCoord;
    // let yCoord = this.state.yCoord;
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
    // this.setState({ finalStyles: styles });
    return styles;
  }
}

export default Tag;
