import React from 'react';
import './OutfitDetailed.css';

const OutfitDescription = ({username, description}) => {
  return (
    <div className="od od-desc">
      {username ? (
        <div>
          <a href={`/${username}`}><strong>{username}</strong></a> {description}
        </div>
      ) : (
        <div>{description}</div>
      )}
    </div>
  ); 
}

export default OutfitDescription;
