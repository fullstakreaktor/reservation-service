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
      firsBookingAfterCheckIn: null
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
    }, this.getListingBookedDatesByMonth);
  }

  handleDateSelect(date) {
    this.handleOverlayToggle();
    this.props.handleDateSelect([...utils.getYearMonth(this.state.dateInView), date]);
  }

  handleClearDate() {
    this.handleOverlayToggle();
    this.props.handleReset();
  }

  getListingBookedDatesByMonth() {
    // TODO: replace mock data with ajax get request

    let [year, month] = utils.getYearMonth(this.state.dateInView);
    let url = `/api/dates/${this.props.listingId}?month=${year}-${month+1}`;
    fetch(url)
    .then(res => res.json())
    .then((res) => this.setState({ reservations: res}, this.setUnavailableDates))
    .then(() => console.log(this.state))
    .catch(err => console.log(err))
  }

  getFirstUnavailableDateAfterCheckIn() {
    // TODO: write ajax get first reservation between checkin and this month
    let [year, month, date] = utils.getYearMonthDate(this.props.checkInDate);
    let url = `/api/dates/${this.props.listingId}?targetDate=${year}-${month+1}-${date}`;

    fetch(url)
      .then(res => res.json())
      .then(res => console.log(res))
      .then((res) => {
        if (res.length === 0) return null;
        else return new Date(res[0].check_in);
      })
      .then((res) => this.setState({ firsBookingAfterCheckIn: res}))
      .catch(error => console.log(err))
  }

  getUnavailableDates() {
    const checkIn = this.props.checkInDate;
    const checkOut = this.props.checkOutDate;
    const dateInView = this.state.dateInView;
    const today = new Date ();


    if (!checkIn) {
      let bookedDates = utils.blockBookedDates(this.state.reservations, this.props.minStay);
      if (utils.isTargetSameMonth(dateInView, today)){
        let date = 1;
        while (date < today.getDate()) {
          bookedDates.add(date);
          date += 1;
        }
      }
      return [...bookedDates];
    }

    if (utils.isTargetFutureMonth(dateInView, checkIn)) {
      return utils.blockEntireMonth();
    }

    let vacancyStart = checkIn;
    let vacancyEnd = checkOut || this.state.firsBookingAfterCheckIn;

    if (utils.isTargetPastMonth(dateInView, vacancyStart)) {
      if (!vacancyEnd) {
        // i.e. vacancyEnd is sometime after month in view
        return [];
      }
      if (utils.isTargetPastMonth(dateInView, vacancyEnd)) {
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
