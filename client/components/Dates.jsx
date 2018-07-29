import React from 'react';
import ReactDOM from 'react-dom';
import { Overlay } from 'react-bootstrap';
import DatesPickerPanel from './DatesPickerPanel.jsx';

class Dates extends React.Component {
	constructor (props) {
		super (props);
		this.state={
        	showPanel: false,
        	selectedDate: null
    	}
	}

	handleToggle ()  {
	    this.setState({
	      showPanel: !this.state.showPanel
	  	})
	  }

	getSelectedDateString () {
	  	if (!this.state.selectedDate) return null;

	  	let options = { year: 'numeric', month: 'numeric', day: 'numeric' };
	    return this.state.selectedDate.toLocaleDateString('en-US', options);
	}

	render () {
		return (
			<div>
			    <div className="heading">Dates</div>
			    <div className="date-select-container">
		            <button
		                className="calendar-dropdown-button checkin-button"
		            	ref={ button => {this.target=button } }
		            	onClick={ this.handleToggle.bind(this) }
		            >
		            	{this.getSelectedDateString() || this.props.buttonContent} 
		          	</button>
		          	<div className="calendar-dropdown-arrow">{'>'}</div>
		          	<button className="calendar-dropdown-button">Check Out</button>
		        </div>
		        <Overlay
		          	onHide={() =>this.setState( { showPanel: false} ) }
		          	show={ this.state.showPanel }
		          	rootClose
		          	placement="bottom"
		         	 container={ this }
		          	target={ () => ReactDOM.findDOMNode(this.target)}
		        >
		          	<DatesPickerPanel handleClick={this.props.handleClick} handleMonthChange={this.props.handleMonthChange} />
		        </Overlay>
			</div>
		)
	}
}

export default Dates;