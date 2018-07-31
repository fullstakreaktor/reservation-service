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
      adults: null,
      pups: null
    }
  }

  postNewReservation () {
    let url ='http://localhost:3003/api/reservations/new' + this.props.listing.id;
    let options = {
      listingId: this.props.listing.id,
      checkIn: this.state.checkIn,
      checkOut: this.state.checkOut,
      guestId: 1,
      adults: this.state.adults, 
      pups: this.state.pups,
      //TODO:amend db model and schema

    }

    fetch('http://localhost:3003/api/reservations/new', options)
    .then(this.resetReservationDetails.bind(this));
  }

  resetReservationDetails () {
    this.setState({
      checkIn: null,
      checkOut: null, 
      adults: null, 
      pups: null
    });
  }

  render () {
    return (
      <div className='details-container'>
        <Dates />
        <Guests className="guests" maxGuests={5}/>
        <button className="book-button">Book</button>
      </div>
    )
  }
}

export default ReservationDetails;
