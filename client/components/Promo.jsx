import React from 'react';
import RareFind from './RareFind.jsx';
import ViewsCount from './ViewsCount.jsx';

const Promo = (props) => {
  let details = null;

  if (props.hasSetDates && props.views >= 200) {
  	details = <RareFind />;
  } else details = <ViewsCount views={props.views} />;

  return (
    <div>
      {details}
    </div>
  );
};

export default Promo;
