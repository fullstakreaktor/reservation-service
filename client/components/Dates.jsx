import React from 'react';
import ReactDOM from 'react-dom';
import DatePicker from './DatePicker.jsx';

class Dates extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        	checkIn: null,
        	checkOut: null,
        	minStay: 1,
        	currentPanel: 'Check In',
    	};
  }

  setCheckIn(dateArr) {
    this.setState({
      checkIn: new Date(...dateArr),
    });
  }

  setCheckOut(dateArr) {
    this.setState({
      checkOut: new Date(...dateArr),
    });
  }

  getSelectedDateString(date) {
	  	if (!date) return null;

	  	const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
	    return date.toLocaleDateString('en-US', options);
  }

  clearDates() {
    this.setState({
      checkIn: null,
      checkOut: null,
    });
  }

  render() {
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
            buttonLabel={this.getSelectedDateString(this.state.checkIn) || 'Check In'}
            handleDateSelect={this.setCheckIn.bind(this)}
            handleReset={this.clearDates.bind(this)}
            checkInDate={this.state.checkIn}
            checkOutDate={this.state.checkOut}
            minStay={2}
          />
          <div className="calendar-dropdown-arrow">
            {'>'}
          </div>
          <DatePicker
            overlayTarget={this.target}
            overlayContainer={this}
            buttonLabel={this.getSelectedDateString(this.state.checkOut) || 'Check Out'}
            handleDateSelect={this.setCheckOut.bind(this)}
            handleReset={this.clearDates.bind(this)}
            checkInDate={this.state.checkIn}
            checkOutDate={this.state.checkOut}
            minStay={2}
          />
        </div>
      </div>

    );
  }
}

export default Dates;
