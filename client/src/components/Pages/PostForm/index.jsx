import React, { Component } from "react";
import Header from "../../Header";
import "./PostForm.css";
import { createOutfit } from "../../../utils/API";

class PostForm extends Component {
  state = {
    imageURL:
      "https://static1.squarespace.com/static/560eabc4e4b061c4bb358ae8/t/57802d7e6b8f5b118a25062b/1468018050251/image.jpg?format=1000w", // IMGUR API response link
    description: "Lorem ipsum dolor sit amet",
    categoryId: 1,
    buttonArray: [],
    tagArray: [],
    formArray: []
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

  // Use this function to handle form submit
  // this.setState name: "" in formArray
  // Value - name of piece
  // On submit, join two arrays then in test post event -
  // const newArray push

  // handleInputChange = event => {
  //   const { name, value } = event.target;
  //   this.setState({
  //     [name]: value
  //   });
  // };

  // Submit button for each Tag?
  // On submit, setState to corresponding [index.text] *match id's(key)*?

  showCoords = event => {
    var rect = event.target.getBoundingClientRect();

    console.log("RECT", rect);

    var x = ((event.clientX - rect.left - 14) / 729) * 100;
    var y = ((event.clientY - rect.top - 14) / 970) * 100;
    var coords = "X coords: " + x + ", Y coords: " + y;
    console.log(coords);

    const newButtonStyle = this.getButtonStyles(x, y);

    this.setState(
      {
        tagArray: [...this.state.tagArray, { x: x, y: y, text: "" }],
        buttonArray: [...this.state.buttonArray, newButtonStyle],
        formArray: [...this.state.formArray, { text: "" }]
      },
      () => {
        // This function needs to be moved to on submit
        const joinedArray = this.state.tagArray;
        this.state.formArray.forEach((el, index) => {
          joinedArray[index]["text"] = el.text;
        });
        this.setState({ tagArray: joinedArray });
      }
    );
  };

  getButtonStyles(xCoord, yCoord) {
    let styles = {
      position: "absolute",
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
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <div onClick={this.showCoords} className="picture-container">
                {this.state.buttonArray.map((styles, index) => {
                  return (
                    <button id="button1" style={styles} key={`button_${index}`}>
                      {index + 1}
                    </button>
                  );
                })}
                <img src={this.state.imageURL} alt="" />
              </div>
            </div>
            <div className="form-container col-md-4">
              {this.state.formArray.map((key, index) => {
                return (
                  <form key={index}>
                    <div class="form-group">
                      <label for="formGroupExampleInput">Tag {index + 1}</label>
                      <input
                        type="text"
                        class="form-control"
                        id="tagTextInput"
                        placeholder="Name this piece!"
                      />
                      {/* <button className="btn btn primary" type="submit">
                        Submit
                      </button> */}
                    </div>
                  </form>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PostForm;
