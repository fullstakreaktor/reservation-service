import React from 'react';

class MonthGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkIn: this.props.selectedDates[0],
      inRangeDates: this.getInRangeDates(),
    };
  }

  getInRangeDates() {
    if (this.props.selectedDates[0] && this.props.selectedDates[1]) {
      const inRangeDates = [];
      for (let i = this.props.selectedDates[0] + 1; i < this.props.selectedDates[1]; i++) {
        inRangeDates.push(i);
      }
      return inRangeDates;
    }
    return [];
  }

  handleMouseEnter(date) {
    if (this.props.selectedDates[1]) return;
    if (this.state.checkIn && date >= this.state.checkIn + this.props.minStay) {
      const inRangeDates = [];
      for (let i = this.state.checkIn + 1; i <= date; i++) {
        inRangeDates.push(i);
      }
      this.setState({
        inRangeDates,
      });
    }
  }

  handleMouseLeave() {
    if (!this.props.selectedDates[1]) {
      this.setState({
        inRangeDates: [],
      });
    }
  }

  renderDaysInMonth() {
    const days = [];

    for (let i = 1; i < this.props.startDay; i++) {
      days.push(<div className="cell" key={-i} />);
    }
    for (let i = 1; i <= this.props.monthLength; i++) {
      let type = 'cell day';
      if (this.props.selectedDates.includes(i)) type += ' selected-date';
      else if (this.props.unavailableDates.includes(i)) type += ' unavailable-date';
      else if (this.state.checkIn && this.state.inRangeDates.includes(i)) type += ' in-range-date';
      else if (this.state.checkIn && (this.state.checkIn + this.props.minStay > i)) type += ' unavailable-date';
      else type += ' available-date';

      days.push(
        <div
          className={type}
          key={i}
          onClick={() => this.props.handleDateSelect(i)}
          onMouseEnter={() => this.handleMouseEnter(i)}
          onMouseLeave={() => this.handleMouseLeave()}
        >
          <div>
            {i}
          </div>
        </div>,
      );
    }
    return days;
  }

  render() {
    return (
      <div className="month-container">
        <div className="month-header">
          {this.props.monthInView}
        </div>
        <div className="week-header">
          <div>
            Su
          </div>
          <div>
            Mo
          </div>
          <div>
            Tu
          </div>
          <div>
            We
          </div>
          <div>
            Th
          </div>
          <div>
            Fr
          </div>
          <div>
            Sa
          </div>
        </div>
        <div className="month-grid">
          {this.renderDaysInMonth()}
        </div>
      </div>
    );
  }
}

export default MonthGrid;
