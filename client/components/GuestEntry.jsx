import React from 'react';

const GuestEntry = props => {
  let { field, count, maxReached, onDecrease, onIncrease } = props;
  let min = 0;
  if (field === 'adults') min = 1;

  return (
    <div className="guest-entry row">
      <div className="guest-type">
        {field}
      </div>
      <div className="guest-number row">
        <button 
          className="decrease-guest-button" 
          onClick={() => onDecrease(field)} 
          disabled={count <= min}
        >
          -
        </button>
        <div className="guest-number">
          {count}
        </div>
        <button 
          className="increase-guest-button" 
          onClick={() => onIncrease(field)} 
          disabled={maxReached}
        >
          +
        </button>
      </div>
    </div>
  )
};

export default GuestEntry;
