import React, { Component } from 'react';
import './OutfitPage.css';
import { getOutfitDetails } from '../../../utils/outfitAPI';
import Header from '../../Header';
import Error from '../../Error';

class Profile extends Component {
  state = {
    outfitDNE: false
  }

  componentDidMount() {
    if(isNaN(this.props.outfitId)) {
      this.setState({outfitDNE: true});
    } else {
      getOutfitDetails(this.props.outfitId).then(result => {
        if (result.data) {
          //
          console.log(result.data);
        } else {
          this.setState({outfitDNE: true});
        }
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    
  }

  render() {
    const { authenticated, currUser, resetState, outfitId} = this.props;
    const { outfitDNE } = this.state;

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
          <div>
            {outfitId}
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
