import React from 'react';
import ListingSnippet from './ListingSnippet.jsx';
import ReservationDetails from './ReservationDetails.jsx';
import Promo from './Promo.jsx';


class ReservationBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listing: {
        id: 10,
        rate: 10,
        avgRating: 2.4,
        ratingsCount: 88,
        weeklyViews: 222
      },
    };
  }

  render() {
    return (
      <div className="container">
        <ListingSnippet listing={this.state.listing} />
        <ReservationDetails listing={this.state.listing}/>
        <Promo views={this.state.weeklyViews} hasSetDates={false} />
      </div>
    );
  }
}

export default ReservationBox;
