import React from 'react';

var GuestEntry = (props) => (
  <div className="row">
    <div className="guest-type">{props.field}</div>
    <button className="decrease-guest-button" onClick={() => props.decreaseGuests(props.field)} disabled={props.count===0}>-</button>
    <div className="guest-number">{props.count}</div>
    <button className="increase-guest-button"onClick={() => props.increaseGuests(props.field)} disabled={props.maxReached}>+</button>
  </div>
);

export default GuestEntry;
