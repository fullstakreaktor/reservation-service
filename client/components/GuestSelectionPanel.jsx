import React from 'react';
import GuestEntry from './GuestEntry.jsx';

var GuestSelectionPanel =(props) => {
	return (
	<div style={{
        position: 'absolute',
        backgroundColor: '#EEE',
        boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)',
        border: '1px solid #CCC',
        borderRadius: 3,
        padding: 10
      }}>
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
	  <button onClick={props.onClose}>close</button>
	</div>
  )
}

export default GuestSelectionPanel;