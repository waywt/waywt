import React, { Component } from 'react';
import './CategoryPage.css';
import { getOutfitsByCatName } from '../../../utils/outfitAPI';
import Header from '../../Header';
import Error from '../../Error';
import ProfileContent from '../Profile/ProfileContent';

class CategoryPage extends Component {
  state = {
    outfitsCount: null,
    outfitsData: null,
    categoryDNE: false
  }

  componentDidMount() {
    if(!['casual', 'formal', 'business', 'sleepwear', 'athletic', 'outerwear'].includes(this.props.catName.toLowerCase())) {
      this.setState({categoryDNE: true});
    } else {
      getOutfitsByCatName(this.props.catName).then(result => {
        if (result.data) {
          this.setState({
            outfitsCount: result.data.outfitCount[0].outfit_count,
            outfitsData: result.data.outfits,
          });
        }
      });
    }
  }

  getCatIcon = (catName) => {
    switch (catName) {
      case 'Casual':
        return (<i className="fas fa-coffee fa-sm" ></i>);
      case 'Formal':
        return (<i className="fab fa-black-tie" ></i>);
      case 'Business':
        return (<i className="fas fa-briefcase" ></i>);
      case 'Sleepwear':
        return (<i className="fas fa-bed" ></i>);
      case 'Athletic':
        return (<i className="fas fa-dumbbell" ></i>);
      case 'Outerwear':
      default:
        return (<i className="fas fa-snowflake" ></i>);
    }
  }

  render() {
    const { authenticated, currUser, resetState, catName} = this.props;
    const { categoryDNE, outfitsData, outfitsCount } = this.state;

    return (
      <div>
        <Header 
          authenticated={authenticated}
          user={currUser}
          resetState={resetState}
        />
        {categoryDNE ? (
          <Error />
        ) : (
          <div className="container">
            <div className="cp-header">
              <h1>{this.getCatIcon(catName)} {catName}</h1>
              <p><strong>{outfitsCount}</strong> outfits</p>
            </div>
            <hr />
            <ProfileContent 
              activeTab={0}
              outfitsData={outfitsData}
            />
          </div>
        )}
      </div>
    );
  }
}

export default CategoryPage;
