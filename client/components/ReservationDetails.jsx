import React from 'react';
import Dates from './Dates.jsx';
import Guests from './Guests.jsx';
import Book from './Book.jsx';

class ReservationDetails extends React.Component {
	constructor (props) {
		super (props);
	}

	render () {
		return (
			<div className='details-container'>
			  <Dates />
			  <Guests />
			  <Book />
			</div>
		)
	}
}

export default ReservationDetails;