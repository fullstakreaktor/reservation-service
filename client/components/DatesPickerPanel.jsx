import React from 'react';
import MonthGrid from './MonthGrid.jsx';

const DatesPickerPanel = (props) => (
  <div className="calendar-panel">
    <div className="nav-container">
    	<button className="prev-month-button" onClick={() => props.handleMonthChange('prev')}>{'<'}</button>
    	<button className="next-month-button" onClick={() => props.handleMonthChange('next')}>{'>'}</button>
  	</div>
    <MonthGrid handleClick={props.handleClick} monthYear={'November 2018'} monthLength={30} unavailableDates={[5,10,15]} startDay={4}/>
  </div>
);

export default DatesPickerPanel;