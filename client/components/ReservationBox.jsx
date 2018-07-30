import React from 'react';
import ListingSnippet from './ListingSnippet.jsx';
import ReservationDetails from './ReservationDetails.jsx';
import Promo from './Promo.jsx';


class ReservationBox extends React.Component {
	constructor(props) {
		super(props);
	}

	render () {
		return (
			<div className="container">
			  <ListingSnippet />
			  <ReservationDetails />
			  <Promo />
			</div>
		)
	}
}

export default ReservationBox;
