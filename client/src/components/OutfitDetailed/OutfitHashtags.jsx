import React from 'react';
import './OutfitDetailed.css';

const OutfitHashtags = ({hashtags}) => {
  return (
    <div className="Outfit-hashtags">
    {hashtags && hashtags.map(hashtag => {
      return (
        <a href={`/explore/tags/${hashtag.text}`} className="Outfit-hashtag" key={`hashtag-${hashtag.id}`}>{`#${hashtag.text}`}</a>
      );
      })}
    </div>
  ); 
}

export default OutfitHashtags;
