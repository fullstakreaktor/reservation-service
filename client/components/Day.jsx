import React from 'react';

var Day = (props) => (
	<div className={`cell ${props.type}`} onClick={props.handleClick}>
	  <div>{props.date}</div>
	</div>
);

export default Day;


