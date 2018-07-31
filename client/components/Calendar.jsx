import React from 'react';
import MonthGrid from './MonthGrid.jsx';

const Calendar = (props) => (
  <div className="dates-panel">
    <div className="calendar-container">
    <div className="nav-container">
      <button className="prev-month-button" onClick={() => props.handleMonthChange('prev')}>{'<'}</button>
      <button className="next-month-button" onClick={() => props.handleMonthChange('next')}>{'>'}</button>
    </div>
    <MonthGrid 
      selectedDates={props.selectedDates}
      handleDateSelect={props.handleDateSelect} 
      monthInView={props.monthInView} 
      monthLength={props.monthLength} 
      unavailableDates={props.unavailableDates} 
      startDay={props.startDay}
      minStay={props.minStay}/>
    </div>
    <div className="calendar-footer row">
    <div className="dates-constraints-info">{props.minStay} night{props.minStay > 1? 's': ''} minimum stay</div>
    <button className="clear-dates-button" onClick={props.handleReset}>Clear dates</button>
    </div>
  </div>
);

export default Calendar;

