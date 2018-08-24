import React, { Component } from 'react';
import './Sidebar.css';
import UserSnapshot from '../UserSnapshot';
import { outfitsFollowing } from '../../utils/API';

class Sidebar extends Component {

  state = {
    categoryActive: [0,0,0,0,0,0],
  }

  handleCategoryClick = (event) => {
    event.preventDefault();

    const CategoryId = event.target.getAttribute('data-id');

    const categoryActive = [0,0,0,0,0,0];
    categoryActive[CategoryId-1] = 1;
    this.setState({categoryActive: categoryActive});
   
    outfitsFollowing(`?cat=${CategoryId}`).then(result => {
      const outfits = result.data.outfits || result.data.suggestedOutfits;
      this.props.updateOutfitsState(outfits);
    }).catch(err => {
      console.log(err);
    });

  }



  render() {
    const { id, username, profile } = this.props;
    
    return (
      <div className="Sidebar d-none d-md-block">
        <UserSnapshot
          id={id}
          username={username} 
          profile={profile}
          currUser={true}
        />
        <hr />
        <ul>
          <li>
            <a href="" data-id={1} onClick={this.handleCategoryClick} className={`category-active-${this.state.categoryActive[0]}`}><i className="fas fa-coffee" ></i> Casual</a>
          </li>
          <li>
            <a href="" data-id={2} onClick={this.handleCategoryClick} className={`category-active-${this.state.categoryActive[1]}`}><i className="fab fa-black-tie"></i> Formal</a>
          </li>
          <li>
            <a href="" data-id={3} onClick={this.handleCategoryClick} className={`category-active-${this.state.categoryActive[2]}`}> <i className="fas fa-briefcase"></i> Business</a>
          </li>
          <li>
            <a href="" data-id={4} onClick={this.handleCategoryClick} className={`category-active-${this.state.categoryActive[3]}`}><i className="fas fa-bed"></i> Sleepwear</a>
          </li>
          <li>
            <a href="" data-id={5} onClick={this.handleCategoryClick} className={`category-active-${this.state.categoryActive[4]}`}><i className="fas fa-dumbbell"></i> Athletic</a>
          </li>
          <li>
            <a href="" data-id={6} onClick={this.handleCategoryClick} className={`category-active-${this.state.categoryActive[5]}`}> <i className="fas fa-snowflake"></i> Outerwear</a>
          </li>
        </ul>
      </div>
    );
  }
}

export default Sidebar;
