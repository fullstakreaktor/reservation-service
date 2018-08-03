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
      pups: null
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


  resetReservationDetails () {
    this.setState({
      adults: null, 
      pups: null
    }, this.clearDates);
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
          className="guests" 
          maxGuests={this.props.maxGuests}/>
        <button className="book-button">Book</button>
      </div>
    )
  }
}

export default ReservationDetails;
