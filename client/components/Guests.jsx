import React from 'react';
import ReactDOM from 'react-dom';
import { Overlay } from 'react-bootstrap';
import GuestSelectionPanel from './GuestSelectionPanel.jsx';

class Guests extends React.Component {
  constructor(props) {
  	super(props);
  	this.state={
  		showPanel:false,
  		adults: 0,
  		pups: 0,
  		maxReached: false
  	}
  }

  handleToggle ()  {
  	this.setState({
  		showPanel: !this.state.showPanel
  	})
  }

  increaseGuests (guestType) {
  	console.log(guestType);
  	this.setState({
  		[guestType]:this.state[guestType] + 1
  	}, this.setButtonsState)
  }
  
   decreaseGuests (guestType) {
  	console.log(guestType);
  	this.setState({
  		[guestType] :this.state[guestType] - 1
  	}, this.setButtonsState)
  }

  setButtonsState () {
  	if (this.state.adults + this.state.pups === this.props.maxGuests) {
      this.setState({maxReached: true});
  	} 
  	if (this.state.maxReached && this.state.adults + this.state.pups < this.props.maxGuests){
  		this.setState({maxReached: false});
  	}
  }


  render () {
  	return (
  <div>
    <div className="heading">Guests</div>
    <button 
      ref={button => {
    	this.target=button;
      }}
      onClick={this.handleToggle.bind(this)}
    >
      click
    </button>
    <Overlay 
      onHide={() => this.setState({show:false})}
      show={this.state.showPanel}
      rootClose
      placement="bottom" 
      container={this}
      target={() => ReactDOM.findDOMNode(this.target)}
    >
	  <GuestSelectionPanel 
	    onClose={this.handleToggle.bind(this)} 
	    counts={{adults: this.state.adults, pups: this.state.pups}} 
	    increaseGuests={this.increaseGuests.bind(this)} 
	    decreaseGuests={this.decreaseGuests.bind(this)}
	    maxReached={this.state.maxReached}
	  />
    </Overlay>
  </div>
  )
  }
}

export default Guests;
