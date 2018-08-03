import React from 'react';
import ReactDOM from 'react-dom';
import DatePicker from './DatePicker.jsx';
import * as utils from './utils.js';

class Dates extends React.Component {
  constructor (props) {
    super (props);
    this.target = null;
  }

  render () {
    return (
      <div>
        <div className="heading">Dates</div>
        <div
          className="date-select-container"
          ref={(div) => { this.target = div; }}
        >
          <DatePicker
            overlayTarget={this.target}
            overlayContainer={this}
            buttonLabel={utils.getShortDate(this.props.checkIn) || 'Check In'}
            handleDateSelect={this.props.onCheckIn}
            handleReset={this.props.onReset}
            checkInDate={this.props.checkIn}
            checkOutDate={this.props.checkOut}
            minStay={this.props.listing.minStay}
            listingId={this.props.listing.id}
          />
          <div className="calendar-dropdown-arrow">
            {'>'}
          </div>
          <DatePicker
            overlayTarget={this.target}
            overlayContainer={this}
            buttonLabel={utils.getShortDate(this.props.checkOut) || 'Check Out'}
            handleDateSelect={this.props.onCheckOut}
            handleReset={this.props.onReset}
            checkInDate={this.props.checkIn}
            checkOutDate={this.props.checkOut}
            minStay={this.props.listing.minStay}
            listingId={this.props.listing.id}
          />
        </div>
      </div>
    );
  }
}


export default Dates;
