import React from 'react';

var NavContainer = (props) => (
  <div>
    <button className="prev-month-button" onClick={() => props.handleMonthChange('prev')}>{'<'}</button>
    <button className="next-month-button" onClick={() => props.handleMonthChange('next')}>{'>'}</button>
  </div>
);

export default NavContainer;