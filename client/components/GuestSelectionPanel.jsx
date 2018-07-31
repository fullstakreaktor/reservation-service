import React from 'react';
import GuestEntry from './GuestEntry.jsx';

const GuestSelectionPanel = props => (
  <div className="guests-panel">
    <GuestEntry
      decreaseGuests={props.decreaseGuests}
      increaseGuests={props.increaseGuests}
      field="adults"
      count={props.counts.adults}
      maxReached={props.maxReached}
    />
    <GuestEntry
      decreaseGuests={props.decreaseGuests}
      increaseGuests={props.increaseGuests}
      field="pups"
      count={props.counts.pups}
      maxReached={props.maxReached}
    />
    <div className="guests-constraints-info">
      {`${props.maxGuests} guests maximum. Eggs don't count toward the number of guests.`}
    </div>
    <button 
      className="close-button" 
      onClick={props.onClose}
    >
      close
    </button>
  </div>
);

export default GuestSelectionPanel;
