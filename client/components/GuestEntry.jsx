import React from 'react';

var GuestEntry = (props) => (
  <div className="row">
    <div className="guest-type">ADULT</div>
    <button className="subtract-guest">-</button>
    <div className="guest-number">2</div>
    <button className="add-guest">+</button>
  </div>
);

export default GuestEntry;
