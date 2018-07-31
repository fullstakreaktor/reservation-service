import React from 'react';
import PawRating from './PawRating.jsx';

const ListingSnippet = props => (
  <div className="snippet-container">
    <div className="row">
      <div className="rate">
        {`$${props.listing.rate}`}
      </div>
      <div>
        {` per night`}
      </div>
    </div>
    <div className="row">
      <PawRating rating={props.listing.avgRating} />
      <div className="ratings-count">
        {props.listing.ratingsCount}
      </div>
    </div>
  </div>
);

export default ListingSnippet;
