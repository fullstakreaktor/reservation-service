import React from 'react';
import Dates from './Dates.jsx';
import Guests from './Guests.jsx';
import Book from './Book.jsx';

class ReservationDetails extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="details-container">
        <Dates today={new Date()} className="checkin-dropdown-button" buttonContent="Check In" handleClick={this.handleClick} handleMonthChange={this.handleMonthChange} />
        <Guests className="guests" maxGuests={5} />
        <Book />
      </div>
    );
  }
}

export default ReservationDetails;
