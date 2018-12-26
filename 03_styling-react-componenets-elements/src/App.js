import React, { Component } from 'react'
import './App.css'
import Radium, { StyleRoot } from 'radium'
import Person from './Person/Person'

class App extends Component {
  state = {
    persons: [
        { id: 'jen', name: 'Tajib', age: 24 },
        { id: 'dva', name: 'Hasan', age: 17 },
        { id: 'tri', name: 'Kemal', age: 56 }
    ]
  }

    nameChangedHandler = ( event, id ) => {
        const personIndex = this.state.persons.findIndex(p => {
            return p.id === id;
        });

        const person = {
            ...this.state.persons[personIndex]
        };

        // const person = Object.assign({}, this.state.persons[personIndex]);

        person.name = event.target.value;

        const persons = [...this.state.persons];
        persons[personIndex] = person;

        this.setState( {persons: persons} );
    }

  deletePersonHandler = (personIndex) => {
      // const persons = this.state.persons.slice()
      const persons = [...this.state.persons]
      persons.splice(personIndex, 1)
      this.setState({persons})
  }

    togglePersonHandler = () => {
        const doesShow = this.state.showPersons
        this.setState({showPersons: !doesShow})
    }

    render() {
      const style = {
          backgroundColor: 'green',
          color: 'white',
          font: 'inherit',
          border: '1px solid blue',
          padding: '8px',
          cursor: 'pointer',
          ':hover': {
              backgroundColor: 'lightgreen',
              color: 'black'
          }
      }

      let persons = null

        if ( this.state.showPersons ) {
            persons = (
                <div>
                    {this.state.persons.map((person, index) => <Person click={() => this.deletePersonHandler(index)} name={person.name} age={person.age} key={person.id} change={(event) => this.nameChangedHandler(event, person.id)}/>)}
                </div>
            )
            style.backgroundColor = 'red'
            style[':hover'] = {
                backgroundColor: 'salmon',
                    color: 'black'
            }
        }

        // let classes = ['red', 'bold'].join(' ')
        let classes = []
        if (this.state.persons.length <= 2) {
            classes.push('red')
        }
        if (this.state.persons.length <= 1) {
            classes.push('bold')
        }

        return (
            <StyleRoot>
            <div className="App">
                <h1>Hi, I'm a React App</h1>
                <p className={classes.join(' ')}>This is really working!</p>
                <button
                    style={style}
                    onClick={this.togglePersonHandler}>Toggle Persons
                </button>
                {persons}
                </div>
            </StyleRoot>
        )
    }
}

export default Radium(App)