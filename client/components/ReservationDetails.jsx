import React from 'react';
import Dates from './Dates.jsx';
import Guests from './Guests.jsx';
import Book from './Book.jsx';

class ReservationDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      checkIn: null,
      checkOut: null,
      adults: 1,
      pups: 0
    }
  }

  postNewReservation () {
    let url ='/api/reservations/new' + this.props.listingId;
    let options = {
      listingId: this.props.listing.id,
      checkIn: this.state.checkIn,
      checkOut: this.state.checkOut,
      guestId: 1,
      adults: this.state.adults, 
      pups: this.state.pups,

    }

    fetch('http://localhost:3003/api/reservations/new', options)
    .then(this.resetReservationDetails.bind(this));
  }

  setCheckIn(dateArr) {
    this.setState({
      checkIn: new Date(...dateArr),
    });
  }

  setCheckOut(dateArr) {
    this.setState({
      checkOut: new Date(...dateArr),
    }, () => this.props.onDatesSet(this.state.checkIn, this.state.checkOut));
  }

  clearDates() {
    this.setState({
      checkIn: null,
      checkOut: null,
    }, this.props.onDatesReset);
  }

  increaseGuests(guestType) {
    this.setState({
      [guestType]: this.state[guestType] + 1,
    });
  }

  decreaseGuests(guestType) {
    this.setState({
      [guestType]: this.state[guestType] - 1,
    });
  }

  setButtonsState() {
    if (this.state.adults + this.state.pups === this.props.maxGuests) {
      this.setState({ maxReached: true });
    }
    if (this.state.maxReached && this.state.adults + this.state.pups < this.props.maxGuests) {
      this.setState({ maxReached: false });
    }
  }

  resetReservationDetails () {
    this.setState({
      adults: 1, 
      pups: 0
    }, this.clearDates);
  }

  renderSummary() {
    if (!this.state.checkOut) return null;
    const { listing, fees, taxRate, rate } = this.props.listing;
    let stayLength = Math.round((this.state.checkOut.getTime() - this.state.checkIn.getTime()) / (1000*60*60*24));
    let baseBreakdown = `$${rate} X ${stayLength} night${stayLength > 1? 's' : ''}`;
    let basePrice = rate*stayLength;
    let tax = Math.round((basePrice+fees)*taxRate/100);
    let total = basePrice + fees + tax;
    let rows = [[baseBreakdown, basePrice], ['Fees', fees], ['Taxes', tax], ['TOTAL', total]];
    return rows.map((row, i) => {
      let name = `summary summary${i} row`;
      return(
        <div key={i} className={name}>
          <div>{row[0]}</div>
          <div>${row[1]}</div>
        </div>
      )
    });

  }

  render () {
    return (
      <div className='details-container'>
        <Dates 
          listing={this.props.listing}
          checkIn={this.state.checkIn}
          checkOut={this.state.checkOut}
          onCheckIn={this.setCheckIn.bind(this)} 
          onCheckOut={this.setCheckOut.bind(this)} 
          onReset={this.clearDates.bind(this)}/>
        <Guests 
          adults={this.state.adults}
          pups={this.state.pups}
          className="guests" 
          maxGuests={this.props.listing.maxGuests}
          onIncrease={this.increaseGuests.bind(this)}
          onDecrease={this.decreaseGuests.bind(this)}/>
        <div className="summary-container">
          {this.renderSummary()}
        </div>
        <button className="book-button">Book</button>
      </div>
    )
  }
}

export default ReservationDetails;
