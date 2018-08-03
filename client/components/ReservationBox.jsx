import React from 'react';
import ListingSnippet from './ListingSnippet.jsx';
import ReservationDetails from './ReservationDetails.jsx';
import Promo from './Promo.jsx';


class ReservationBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      id: data.id,
      hostId: data.hostId, 
      rate: Math.round(data.rate),
      reviewsCount: data.reviews.total_reviews,
      avgRating: data.reviews.avg_rating,
      minStay: data.min_stay,
      maxGuests: data.max_guests,
      fees: Math.round(data.fees),
      taxRate: data.tax_rate,
      weeklyViews: data.weekly_views
    }
    this.setState({
      listing: listing
    })
  }


  render() {

    if (!this.state.listing) return null;

    return (
      <div className="container">
        <ListingSnippet 
          listing={this.state.listing} 
        />
        <ReservationDetails 
          listing={this.state.listing} 
          onDatesSet={this.handleDatesSelect.bind(this)} 
          onDatesReset={this.handleDatesReset.bind(this)}
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
