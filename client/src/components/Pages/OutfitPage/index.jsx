import React, { Component } from 'react';
import './OutfitPage.css';
import { getOutfitDetails } from '../../../utils/outfitAPI';
import { OutfitImage } from '../../OutfitDetailed';
import Header from '../../Header';
import Error from '../../Error';

class OutfitPage extends Component {
  state = {
    outfitData: null,
    outfitDNE: false
  }

  componentDidMount() {
    if(isNaN(this.props.outfitId)) {
      this.setState({outfitDNE: true});
    } else {
      getOutfitDetails(this.props.outfitId).then(result => {
        if (result.data) {
          this.setState({outfitData: result.data});
          //*
          console.log(result.data);
        } else {
          this.setState({outfitDNE: true});
        }
      });
    }
  }

  // componentDidUpdate(prevProps, prevState) {
    
  // }

  render() {
    const { authenticated, currUser, resetState, outfitId} = this.props;
    const { outfitDNE, outfitData } = this.state;

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
            <div className="row">
              <div className="col-12 col-md-8">
                <OutfitImage 
                  id={outfitData ? outfitData.id : null}
                  imgLink={outfitData ? outfitData.imageUrl : null}
                  tags={outfitData ? outfitData.Tags : null}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default OutfitPage;
