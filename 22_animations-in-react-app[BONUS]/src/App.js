import React, { Component } from "react";
import Transition from 'react-transition-group/Transition'

import "./App.css";
import Modal from "./components/Modal/Modal";
import Backdrop from "./components/Backdrop/Backdrop";
import List from "./components/List/List";

class App extends Component {
	state = {
		open: false,
		showDiv: false
	}

	showModal = () => {
		this.setState({open: true})
	}

	closeModal = () => {
		this.setState({open: false})
	}


  render() {
		const {open} = this.state

    return (
      <div className="App">
        <h1>React Animations</h1>
		  <button
			  className='Button'
			  onClick={() => this.setState(prevState => ({showDiv: !prevState.showDiv}))}>toggle</button>
		  <br/>

		  <Transition
			  in={this.state.showDiv}
			  timeout={1000}
			  mountOnEnter
			  unmountOnExit
			  onEnter={() => console.log('onEnter')}
			  onEntering={() => console.log('onEntering')}
			  onEntered={() => console.log('onEntered')}
			  onExit={() => console.log('onExit')}
			  onExited={() => console.log('onExited')}
			  onExiting={() => console.log('onExiting')}>
			  {state => (
			  	<div style={{background: 'red',
					width: 100,
					height: 100,
					margin: 'auto',
					transition: 'opacity 1s ease-out',
					opacity: state === 'exiting' ? 0 : 1}}/>
			  )}
		  </Transition>

		  {/*<Transition
			  mountOnEnter
			  unmountOnExit
			  in={open} timeout={500}>
			  {state => (
				  <Modal show={state} closed={this.closeModal} />
			  )}
		  </Transition>*/}

		  <Modal show={open} closed={this.closeModal}/>
		  {open ? <Backdrop show={open} /> : null}

        <button
			className="Button"
			onClick={this.showModal}>Open Modal</button>
        <h3>Animating Lists</h3>
        <List />
      </div>
    );
  }
}

export default App;
