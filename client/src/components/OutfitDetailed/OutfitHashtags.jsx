import React from 'react';
import './OutfitDetailed.css';

const OutfitHashtags = ({hashtags}) => {
  return (
    <div className="od-hts">
      {hashtags && hashtags.map(hashtag => {
        return (
          <a 
            href={`/explore/tags/${hashtag.text}`} 
            key={hashtag.id}
          >
            {`#${hashtag.text}`}
          </a>
        );
      })}
    </div>
  ); 
}

export default OutfitHashtags;
