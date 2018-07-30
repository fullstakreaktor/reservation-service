import React from 'react';
import GuestEntry from './GuestEntry.jsx';

var Guests = (props) => (
  <div>
    <div className="heading">Guests</div>
    <GuestEntry className="adults" />
    <GuestEntry className="pups" />
  </div>
);

export default Guests;