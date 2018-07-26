import React from 'react';

var ViewsCount = (props) => (
  <div className="promo-container row">
    <div className="promo-details">
      <div className="catchphrase">This home is on people's mind.</div>
      <div className="catchphrase2">This listing has been fetched {props.views} times this week.</div>
    </div>
    <svg className="fetch-icon"></svg>
  </div>
);

export default ViewsCount;