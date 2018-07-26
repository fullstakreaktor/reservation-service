import React from 'react';

var ListingSnippet = (props) => (
  <div className="snippet-container">
    <div className="row">
      <div className="rate">${props.listing.rate}</div>
      <div>  per night</div>
    </div>
    <div className="row">
      <img className="rating paw-1-half" src="./img/ratings-sprite.png" />
      <div className="ratings-count">{props.listing.ratingsCount}</div>
     </div>
  </div>
);

export default ListingSnippet;