import React, { Component } from 'react';
import { connect } from 'react-redux';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';
import * as actionType from '../../store/actions'

class Counter extends Component {
    state = {
        counter: 0
    }

 /*   counterChangedHandler = ( action, value ) => {
        switch ( action ) {
            case 'inc':
                this.setState( ( prevState ) => { return { counter: prevState.counter + 1 } } )
                break;
            case 'dec':
                this.setState( ( prevState ) => { return { counter: prevState.counter - 1 } } )
                break;
            case 'add':
                this.setState( ( prevState ) => { return { counter: prevState.counter + value } } )
                break;
            case 'sub':
                this.setState( ( prevState ) => { return { counter: prevState.counter - value } } )
                break;
        }
    }*/

    render () {
        return (
            <div>
                <CounterOutput value={this.props.ctr} />
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter}  />
                <CounterControl label="Add 10" clicked={this.props.onAddCounter}  />
                <CounterControl label="Subtract 7" clicked={this.props.OnSubtrackCounter}  />
				<hr/>
				<button onClick={() => this.props.onStoreResult(this.props.ctr)}>Store Result</button>
				<ul>
					{this.props.res.map(r => (
						<li key={r.id} onClick={() => this.props.onRemoveResult(r.id)}>{r.value}</li>
					))}
				</ul>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ctr: state.ctr.counter,
		res: state.res.results
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIncrementCounter: () => dispatch({type: actionType.INCREMENT}),
		onDecrementCounter: () => dispatch({type: actionType.DECREMENT}),
		onAddCounter: () => dispatch({type: actionType.ADD, value: 10}),
		OnSubtrackCounter: () => dispatch({type: actionType.SUBTRACT, value: 7}),
		onStoreResult: (result) => dispatch({type: actionType.STORE_RESULT, result: result}),
		onRemoveResult: (id) => dispatch({type: actionType.REMOVE_RESULT, resId: id})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);