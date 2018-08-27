import React, {Component} from 'react';
import './OutfitDetailed.css';

class OutfitCategory extends Component {
  getCatIcon = (catName) => {
    switch (catName) {
      case 'Casual':
        return (<i className="fas fa-coffee" ></i>);
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

  render () {
    const { category } = this.props;

    return (
      <div>
        { category ? (
          <a 
            href={`/outfits/${category.name}`}
            data-id={category.id}
            className="od-cat"
          >
            {this.getCatIcon(category.name)} {category.name}
          </a>
        ) : ''}
      </div>
    ); 
  }
}

export default OutfitCategory;
          