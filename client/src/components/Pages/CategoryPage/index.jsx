import React, { Component } from 'react';
import './CategoryPage.css';
import Header from '../../Header';
import Error from '../../Error';

class CategoryPage extends Component {
  state = {
    outfitsData: null,
    categoryDNE: false
  }

  componentDidMount() {
    if(isNaN(this.props.outfitId)) {
      this.setState({outfitDNE: true});
    } else {
      getOutfitDetails(this.props.outfitId).then(result => {
        if (result.data) {
          this.setState({
            outfitData: result.data,
            comments: result.data.Comments.reverse()
          });
          //*
          console.log(result.data);
        } else {
          this.setState({outfitDNE: true});
        }
      });
    }
  }

  render() {
    const { authenticated, currUser, resetState, outfitId} = this.props;
    const { outfitDNE, outfitData, comments } = this.state;

    return (
      <div>
        <Header 
          authenticated={authenticated}
          user={currUser}
          resetState={resetState}
        />
        {outfitDNE ? (
          <Error />
        ) : (
          <div className="container">
            <div className="row no-gutters op-container">
           
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default CategoryPage;
