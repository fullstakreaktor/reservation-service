import React from 'react';

const ViewsCount = props => (
  <div className="promo-container row">
    <div className="promo-details">
      <div className="catchphrase">
        {'This home is on people\'s mind.'}
      </div>
      <div className="catchphrase2">
        {`This listing has been fetched ${props.views} times this week.`}
      </div>
    </div>
    <svg className="fetch-icon" />
  </div>
);

export default ViewsCount;
