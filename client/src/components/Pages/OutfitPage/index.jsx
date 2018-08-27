import React, { Component } from 'react';
import './OutfitPage.css';
import { getOutfitDetails } from '../../../utils/outfitAPI';
import { 
  OutfitImage, OutfitDescription, OutfitHashtags, OutfitComments, OutfitBasics, OutfitCommentForm 
} from '../../OutfitDetailed';
import UserSnapshot from '../../UserSnapshot';
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
            <div className="row no-gutters op-container">
              <div className="col-12 col-md-7 d-flex align-items-center justify-content-center op-img-container">
                <OutfitImage 
                  id={outfitData ? outfitData.id : null}
                  imgLink={outfitData ? outfitData.imageUrl : null}
                  tags={outfitData ? outfitData.Tags : null}
                />
              </div>
              <div className="col-12 col-md-5">
                <UserSnapshot
                  profile={outfitData ? outfitData.User.Profile : null} 
                  username={outfitData ? outfitData.User.username : null}
                />
                <hr className="op-hr"/>
                <div className="op-info-container">
                  <OutfitDescription
                    username={outfitData ? outfitData.User.username : null}
                    description={outfitData ? outfitData.description : null}
                  />
                  <OutfitHashtags 
                    hashtags={outfitData ? outfitData.Hashtags : null}
                  />
                  <OutfitComments
                    comments={outfitData ? outfitData.Comments : null}
                  />
                </div>
                <hr className="op-hr"/>
                <OutfitBasics 
                  category={outfitData ? outfitData.Category : null}
                  outfitId={outfitId}
                  likeCount={outfitData ? outfitData.Likes.length : null}
                />
                <hr className="op-hr"/>
                <OutfitCommentForm />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default OutfitPage;
