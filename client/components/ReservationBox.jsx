import React from 'react';
import ListingSnippet from './ListingSnippet.jsx';
import ReservationDetails from './ReservationDetails.jsx';
import Promo from './Promo.jsx';


class ReservationBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listing: {
        id: 33,
        hostId: 33,
        rate: 33,
        minStay: 3,
        maxGuests: 3,
        fees: 3.33,
        taxRate: 3,
        avgRating: 3.3,
        ratingsCount: 33,
        weeklyViews: 333,

      },
      hasDates: false
    };
  }

  componentDidMount() {
    this.getListingInfo();
  }
  getListingInfo() {
    let url = `/api/listings/${this.props.listingId}`;
    fetch(url)
    .then(res => res.json())
    .then((res) => this.setListingDetails(res))
    .catch(err => console.log(err))
  }

  handleDatesSelect () {
    this.setState({
      hasDates: true
    })
  }

  handleDatesReset () {
    this.setState ({
      hasDates: false
    })
  }

  setListingDetails (data) {
    let listing = {
      hostId: data.hostId, 
      rate: data.rate,
      reviewsCount: data.reviews.total_reviews,
      avgRating: data.reviews.avg_rating,
      minStay: data.min_stay,
      maxGuests: data.max_guests,
      fees: data.fees,
      taxRate: data.tax_rate,
      weeklyViews: data.weekly_views
    }
    this.setState({
      listing: listing
    }, () => console.log(this.state))
  }


  render() {
    return (
      <div className="container">
        <ListingSnippet 
          listing={this.state.listing} 
        />
        <ReservationDetails 
          listing={this.state.listing} 
          onDatesSelect={this.handleDatesSelect.bind(this)} 
          onClearDates={this.handleDatesReset.bind(this)}
        />
        <Promo 
          views={this.state.listing.weeklyViews} 
          hasDates={this.state.hasDates} 
        />
      </div>
    );
  }
}

export default ReservationBox;
