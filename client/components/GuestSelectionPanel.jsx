import React from 'react';
import GuestEntry from './GuestEntry.jsx';

const GuestSelectionPanel = props => {
  let { onDecrease, onIncrease, counts, maxGuests, onClose } = props;
  let maxReached = counts.adults + counts.pups >= maxGuests;

  return (
    <div className="guests-panel">
      <GuestEntry
        onDecrease={onDecrease}
        onIncrease={onIncrease}
        field="adults"
        count={counts.adults}
        maxReached={maxReached}
      />
      <GuestEntry
        onDecrease={onDecrease}
        onIncrease={onIncrease}
        field="pups"
        count={counts.pups}
        maxGuests={maxGuests}
      />
      <div className="guests-constraints-info">
        {`${maxGuests} guests maximum. Eggs don't count toward the number of guests.`}
      </div>
      <button 
        className="close-button" 
        onClick={onClose}
      >
        close
      </button>
    </div>
  )
};

export default GuestSelectionPanel;
