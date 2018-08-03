import React from 'react';
import ReactDOM from 'react-dom';
import { Overlay } from 'react-bootstrap';
import GuestSelectionPanel from './GuestSelectionPanel.jsx';

const DropDownButtonContent = props => (
  <div className="row dropdown-content">
    <div>
      { `${props.adults} adult${props.adults>1? 's':''}, ${props.pups} pup${props.pups>1? 's':''}`}
    </div>
    <div className="dropdown-arrow">
      {props.arrowUp ? (<span>&#9660;</span> ) : (<span>&#9650;</span>)}
    </div>
  </div>
);

class Guests extends React.Component {
  constructor(props) {
  	super(props);
  	this.state = {
  		showPanel: false,
  		// adults: 1,
  		// pups: 0,
  		// maxReached: false,
  	};
  }

  handleToggle() {
  	this.setState({
  		showPanel: !this.state.showPanel,
  	});
  }

  // increaseGuests(guestType) {
  // 	this.setState({
  // 		[guestType]: this.state[guestType] + 1,
  // 	}, this.setButtonsState);
  // }

  // decreaseGuests(guestType) {
  // 	this.setState({
  // 		[guestType]: this.state[guestType] - 1,
  // 	}, this.setButtonsState);
  // }

  // setButtonsState() {
  // 	if (this.state.adults + this.state.pups === this.props.maxGuests) {
  //     this.setState({ maxReached: true });
  // 	}
  // 	if (this.state.maxReached && this.state.adults + this.state.pups < this.props.maxGuests) {
  // 		this.setState({ maxReached: false });
  // 	}
  // }


  render() {
  	return (
    <div>
      <div className="heading">
Guests
      </div>
      <button
        className="guests-dropdown-button"
        ref={(button) => { this.target = button; }}
        onClick={this.handleToggle.bind(this)}
      >
        <DropDownButtonContent
          adults={this.props.adults}
          pups={this.props.pups}
          arrowUp={this.state.showPanel}
        />
      </button>
      <Overlay
        onHide={() => this.setState({ showPanel: false })}
        show={this.state.showPanel}
        rootClose
        placement="bottom"
        container={this}
        target={() => ReactDOM.findDOMNode(this.target)}
      >
        <GuestSelectionPanel
          onClose={this.handleToggle.bind(this)}
          counts={{ adults: this.props.adults, pups: this.props.pups }}
          onIncrease={this.props.onIncrease}
          onDecrease={this.props.onDecrease}
          maxGuests={this.props.maxGuests}
        />
      </Overlay>
    </div>
    );
  }
}

export default Guests;
