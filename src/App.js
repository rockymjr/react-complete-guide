import React, { Component } from 'react';
import './App.css';
import Radium from 'radium';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      { id: 1001, name: 'Rocky', age: 29 },
      { id: 1002, name: 'Max', age: 28 },
      { id: 1003, name: 'Alax', age: 30 },
      { id: 1004, name: 'Jack', age: 25 }
    ],
    otherState: 'Some Other Data',
    showPersons: false
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow })
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });
    const person = { ...this.state.persons[personIndex] };
    person.name = event.target.value;
    const persons = [...this.state.persons];
    persons[personIndex] = person;
    this.setState({ persons: persons })
  }

  deletePersonHandler = (index) => {
    //const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(index, 1);
    this.setState({ persons: persons });
  }

  render() {

    const style = {
      background: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
      ':hovor': {
        backgroundColor: 'lightgreen',
        color: 'black'
      }
    };

    let personsView = null;
    if (this.state.showPersons) {
      personsView = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person
              key={person.id}
              name={person.name}
              age={person.age}
              click={() => this.deletePersonHandler(index)} 
              changed={(event) => this.nameChangedHandler(event, person.id)}/>
          })}
        </div>
      );
      style.background = 'red';
      style[':hovor'] = {
        backgroundColor: 'salmon',
        color: 'black'
      }
    }
    let classes = [];
    if(this.state.persons.length <=2) {
      classes.push('red');
    }
    if(this.state.persons.length <= 1) {
      classes.push('bold');
    }


    return (
      <div className="App">
        <h1>Hi, This is my first react app</h1>
        <p className={classes.join(" ")}>This is really working</p>
        <button 
            style={style} 
            onClick={this.togglePersonsHandler}>Switch Name</button>
        {personsView}
      </div>
    );
  }
}

export default Radium(App);