import React from 'react';
import ReactDOM from 'react-dom';
import { Overlay } from 'react-bootstrap';
import Calendar from './Calendar.jsx';
import * as utils from './utils.js';

class DatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        	showPanel: false,
        	dateInView: this.props.checkInDate || new Date(),
        	unavailableDates: [],
        	reservations: [],
    	};
  }

  componentDidMount() {
    this.getListingBookedDatesByMonth();
  }

  handleOverlayToggle() {
	    this.setState({
	      showPanel: !this.state.showPanel,
	  	});
  }

  getSelectedDatesInView() {
    const dates = [];

    if (utils.isTargetSameMonth(this.state.dateInView, this.props.checkInDate)) {
      dates.push(this.props.checkInDate.getDate());
    } else dates.push(null);

    if (utils.isTargetSameMonth(this.state.dateInView, this.props.checkOutDate)) {
      dates.push(this.props.checkOutDate.getDate());
    } else dates.push(null);

    return dates;
  }

  handleMonthChange(direction) {
    this.setState({
      dateInView: utils.getAdjacentMonth(this.state.dateInView, direction),
    });
  }

  handleDateSelect(date) {
    this.handleOverlayToggle();
    this.props.handleDateSelect([...utils.getYearMonth(this.state.dateInView), date], this.setUnavailableDates.bind(this));
  }

  handleClearDate() {
    this.handleOverlayToggle();
    this.props.handleReset();
  }

  getListingBookedDatesByMonth() {
    // TODO: replace mock data with ajax get request
    const year = this.state.dateInView.getFullYear();
    const month = this.state.dateInView.getMonth();
    this.setState({
      reservations: [
        { checkIn: new Date(year, month, 5), checkOut: new Date(year, month, 7) },
        { checkIn: new Date(year, month, 9), checkOut: new Date(year, month, 11) },
        { checkIn: new Date(year, month, 19), checkOut: new Date(year, month, 27) },
      ],
    });
  }

  getFirstUnavailableDateAfterCheckIn() {
    const checkIn = this.props.checkIn;
    // TODO: write ajax get first reservation between checkin and this month
    const results = [];
    if (results.length < 1) return null;
  }

  getUnavailableDates() {
    const checkIn = this.props.checkInDate;
    const checkOut = this.props.checkOutDate;
    const current = this.state.dateInView;


    if (!checkIn) return utils.blockBookedDates(this.state.reservations, this.props.minStay);

    const vacancyStart = checkIn;
    let vacancyEnd = null;

    if (utils.isTargetFutureMonth(current, vacancyStart)) {
      return utils.blockEntireMonth();
    }

    vacancyEnd = checkOut || this.getFirstUnavailableDateAfterCheckIn();

    if (utils.isTargetPastMonth(current, vacancyStart)) {
      if (!vacancyEnd) {
        // i.e. vacancyEnd is sometime after month in view
        return [];
      }
      if (utils.isTargetPastMonth(current, vacancyEnd)) {
        return utils.blockEntireMonth();
      }

      return utils.blockDatesAfterTarget(vacancyEnd);
    }

    // vacancyStart is this month
    const blockedDates = utils.blockDatesBeforeTarget(vacancyStart);
    if (!vacancyEnd) {
      return blockedDates;
    }

    return blockedDates.concat(utils.blockDatesAfterTarget(vacancyEnd));
  }

  setUnavailableDates() {
    this.setState({
      unavailableDates: this.getUnavailableDates(),
    });
  }


  render() {
    return (
      <div>
        <button
          className="calendar-dropdown-button"
          ref={(button) => { this.target = button; }}
          onClick={this.handleOverlayToggle.bind(this)}
        >
          {this.props.buttonLabel}
        </button>
        <Overlay
          onHide={() => this.setState({ showPanel: false })}
          onEnter={this.setUnavailableDates.bind(this)}
          show={this.state.showPanel}
          rootClose
          placement="bottom"
          container={this.props.overlayContainer}
          target={() => ReactDOM.findDOMNode(this.target)}
        >
          <Calendar
            selectedDates={this.getSelectedDatesInView()}
            handleDateSelect={this.handleDateSelect.bind(this)}
            handleMonthChange={this.handleMonthChange.bind(this)}
            handleReset={this.handleClearDate.bind(this)}
            monthInView={utils.getMonthYearString(this.state.dateInView)}
            monthLength={utils.getMonthLength(this.state.dateInView)}
            startDay={utils.getFirstDayOfMonth(this.state.dateInView)}
            minStay={this.props.minStay}
            unavailableDates={this.state.unavailableDates}
          />
        </Overlay>
      </div>
    );
  }
}

export default DatePicker;
