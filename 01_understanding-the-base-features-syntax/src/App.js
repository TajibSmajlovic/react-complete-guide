import React, { Component } from 'react'
import './App.css'
import Person from './Person/Person'

class App extends Component {
  state = {
    persons: [
        { name: 'Tajib', age: 24 },
        { name: 'Hasan', age: 17 },
        { name: 'Kemal', age: 56 }
    ]
  }

  switchNameHandler = (newName) => {
    this.setState({
        persons: [
            { name: newName, age: 24 },
            { name: 'Hasan', age: 17 },
            { name: 'Kemal', age: 59 }
        ]
    } )
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

    render() {
      const style = {
          backgroundColor: 'white',
          font: 'inherit',
          border: '1px solid blue',
          padding: '8px',
          cursor: 'pointer'
      }

        return (
            <div className="App">
                <h1>Hi, I'm a React App</h1>
                <p>This is really working!</p>
                <button
                    style={style}
                    onClick={() => this.switchNameHandler('Tajib !!!!1')}>Switch Name</button>
                <Person
                    name = {this.state.persons[0].name}
                    age = {this.state.persons[0].age}/>
                <Person
                    name = {this.state.persons[1].name}
                    age = {this.state.persons[1].age}
                    click = {this.switchNameHandler.bind(this, 'Smajke')}
                    change = {this.nameChangedHandler}> Testing of other things </Person>
                <Person
                    name = {this.state.persons[2].name}
                     age = {this.state.persons[2].age}/>
            </div>
        )
    }
}

export default App