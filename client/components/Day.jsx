import React from 'react';

var Day = (props) => (
	<div className={`day-cell ${props.type}`} onClick={props.clickHandler}>
	  <div>{props.date}</div>
	</div>
);

export default Day;

