import React from 'react';

const GuestEntry = props => (
  <div className="guest-entry row">
    <div className="guest-type">
      {props.field}
    </div>
    <div className="guest-number row">
      <button 
        className="decrease-guest-button" 
        onClick={() => props.decreaseGuests(props.field)} 
        disabled={props.count === 0}
      >
        -
      </button>
      <div className="guest-number">
        {props.count}
      </div>
      <button 
        className="increase-guest-button" 
        onClick={() => props.increaseGuests(props.field)} 
        disabled={props.maxReached}
      >
        +
      </button>
    </div>
  </div>
);

export default GuestEntry;
