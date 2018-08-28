import React, { Component } from 'react';
import './HashtagPage.css';
import { getOutfitsByHashtag } from '../../../utils/outfitAPI';
import Header from '../../Header';
import Error from '../../Error';
import ProfileContent from '../Profile/ProfileContent';

class HashtagPage extends Component {
  state = {
    hashtagDNE: false,
    outfitsData: null 
  }

  componentDidMount() {
    getOutfitsByHashtag(this.props.hashtag).then(result => {
      if (result.data) {
        this.setState({
          outfitsData: result.data.Outfits,
        });
      } else {
        this.setState({hashtagDNE: true});
      }
    }); 
  }

  render() {
    const { authenticated, currUser, resetState, hashtag} = this.props;
    const { hashtagDNE, outfitsData } = this.state;

    return (
      <div>
        <Header 
          authenticated={authenticated}
          user={currUser}
          resetState={resetState}
        />
        {hashtagDNE ? (
          <Error />
        ) : (
          <div className="container">
            <div className="hp-header">
              <h1>#{hashtag}</h1>
              <p><strong>{outfitsData ? outfitsData.length : ''}</strong> outfits</p>
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

export default HashtagPage;
