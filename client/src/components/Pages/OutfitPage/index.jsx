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
          this.setState({
            outfitData: result.data,
            comments: result.data.Comments.reverse()
          });
        } else {
          this.setState({outfitDNE: true});
        }
      });
    }
  }

  addComment = newComment => {
    const commentsArray = this.state.comments;
    commentsArray.unshift(newComment);
    this.setState({comments: commentsArray});
  }

  render() {
    const { 
      authenticated, currUser, resetState, outfitId, following, updateFollowingState
    } = this.props;
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
                  id={outfitData ? outfitData.User.id : null}
                  currUserId={currUser ? currUser.id : null}
                  following={following}
                  updateFollowingState={updateFollowingState}
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
                    comments={outfitData ? comments : null}
                  />
                </div>
                <hr className="op-hr"/>
                <OutfitBasics
                  authenticated={authenticated} 
                  category={outfitData ? outfitData.Category : null}
                  outfitId={outfitId}
                  likeCount={outfitData ? outfitData.Likes.length : null}
                />
                <hr className="op-hr"/>
                { authenticated ? (
                  <OutfitCommentForm 
                    outfitId={outfitId} 
                    currUser={currUser}
                    addComment={this.addComment}
                  /> 
                ) : ''}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default OutfitPage;
