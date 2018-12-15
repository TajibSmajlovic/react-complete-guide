import React, { Component } from 'react'
import './App.css'
import Person from './Person/Person'

class App extends Component {
  state = {
    persons: [
        { id: 'jen', name: 'Tajib', age: 24 },
        { id: 'dva', name: 'Hasan', age: 17 },
        { id: 'tri', name: 'Kemal', age: 56 }
    ]
  }

  nameChangedHandler = (event) => {
      this.setState({
          persons: [
              { name: 'Tajib', age: 24 },
              { name: event.target.value, age: 17 },
              { name: 'Kemal', age: 56 }
          ]
      } )
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
          backgroundColor: 'white',
          font: 'inherit',
          border: '1px solid blue',
          padding: '8px',
          cursor: 'pointer'
      }

      let persons = null

        if ( this.state.showPersons ) {
            persons = (
                <div>
                    {this.state.persons.map((person, index) => <Person click={() => this.deletePersonHandler(index)} name={person.name} age={person.age} key={person.id}/>)}
                </div>
            )
        }

        return (
            <div className="App">
                <h1>Hi, I'm a React App</h1>
                <p>This is really working!</p>
                <button
                    style={style}
                    onClick={this.togglePersonHandler}>Toggle Persons
                </button>
                {persons}
                </div>
        )
    }
}

export default App