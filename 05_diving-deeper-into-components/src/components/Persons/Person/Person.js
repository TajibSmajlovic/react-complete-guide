import React, { Component } from 'react';
import PropTypes from 'prop-types'

import classes from './Person.css';
import Aux from '../../../hoc/Auxiliary'
import withClass from '../../../hoc/withClass'
import { AuthContext } from '../../../containers/App'

class Person extends Component{
    constructor( props ) {
        super( props );
        console.log( '[Person.js] Inside Constructor', props );
        this.inputElement = React.createRef()
    }

    componentWillMount () {
        console.log( '[Person.js] Inside componentWillMount()' );
    }

    componentDidMount () {
        console.log( '[Person.js] Inside componentDidMount()' );
    }

    focus() {
        this.inputElement.current.focus()
    }

    shouldComponentUpdate ( nextProps, nextState ) {
        console.log( '[UPDATE Person.js] Inside shouldComponentUpdate', nextProps, nextState );
        return true;
    }

    componentWillUpdate ( nextProps, nextState ) {
        console.log( '[UPDATE Person.js] Inside componentWillUpdate', nextProps, nextState )
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        console.log( '[UPDATE Person.js] Inside getDerivedStateFromProps', nextProps, prevState )

        return prevState
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log( '[UPDATE Person.js] Inside getSnapshotBeforeUpdate')
    }

    componentDidUpdate () {
        console.log( '[UPDATE Person.js] Inside componentDidUpdate' )
        this.inputElement.current.focus()
    }

    render() {
        console.log('[Person.js] Inside render()')

        return (
            <Aux>
                <AuthContext.Consumer>
                    {auth => auth ? <p>I'm authenticated!</p> : null}
                </AuthContext.Consumer>
                <p onClick={this.props.click}>I'm {this.props.name} and I am {this.props.age} years old!</p>
                <p>{this.props.children}</p>
                <input
                    ref={this.inputElement}
                    type="text"
                    onChange={this.props.changed}
                    value={this.props.name} />
            </Aux>
        )

      /*  return [
            <p key='1' onClick={this.props.click}>I'm {this.props.name} and I am {this.props.age} years old!</p>
            <p key='2'>{this.props.children}</p>
            <input key='3' type="text" onChange={this.props.changed} value={this.props.name} />
        ]*/
    }
}

Person.propTypes = {
    age: PropTypes.number,
    name: PropTypes.string,
    click: PropTypes.func,
    changed: PropTypes.func
}

export default withClass(Person, classes.Person)