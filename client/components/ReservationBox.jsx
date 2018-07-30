import React from 'react';
import ListingSnippet from './ListingSnippet.jsx';
import ReservationDetails from './ReservationDetails.jsx';
import Promo from './Promo.jsx';


class ReservationBox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			listing: {
				rate: 10,
				avgRating: 2.4,
				ratingsCount: 88
			}
		}
	}

	render () {
		return (
			<div className="container">
			  <ListingSnippet listing={this.state.listing}/>
			  <ReservationDetails />
			  <Promo views={222} hasSetDates={false}/>
			</div>
		)
	}
}

export default ReservationBox;
