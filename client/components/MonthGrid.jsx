import React from 'react';
import Day from './Day.jsx';

var MonthGrid = (props) => {
  const days = [];
  for (let i = 1; i < props.startDay; i++){
    days.push(<Day key={-i} date={null} type={null} />);
  }

  for (let i = 1; i <= props.monthLength; i++) {
    days.push(<Day key={i} handleClick={props.handleClick} date={i}  type={props.unavailableDates.includes(i)? "day unavailable-date": " day available-date"}/>)
  }

  return (
    <div className="month-container">
      <div className="month-header">{props.monthYear}</div>
      <div className="week-header">
        <div>Su</div>
        <div>Mo</div>
        <div>Tu</div>
        <div>We</div>
        <div>Th</div>
        <div>Fr</div>
        <div>Sa</div>
    </div>
      <div className="month-grid">{days}</div>
    </div>
  )
};


export default MonthGrid;