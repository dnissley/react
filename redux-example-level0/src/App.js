import React, { Component } from 'react';
import PropTypes from 'prop-types';
import logo from './logo.svg';
import './App.css';
import { increment, decrement, rename } from './actions';

class App extends Component {
  constructor(props) {
    super(props);
    this.incrementCounter = this.incrementCounter.bind(this);
    this.decrementCounter = this.decrementCounter.bind(this);
    this.renameCounter = this.renameCounter.bind(this);
  }

  incrementCounter() {
    this.props.store.dispatch(increment());
  }

  decrementCounter() {
    this.props.store.dispatch(decrement());
  }

  renameCounter() {
    const newName = prompt("Enter a new name for this counter: ", this.props.store.getState().name);

    if (newName != null && newName != "") {
      this.props.store.dispatch(rename(newName));
    }
  }

  render() {
    const { value, name } = this.props.store.getState();
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">{name}</p>
        <p>{value}</p>
        <div>
          <button onClick={this.incrementCounter}>+1</button>
          {' '}
          <button onClick={this.decrementCounter}>-1</button>
          {' '}
          <button onClick={this.renameCounter}>Rename</button>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  store: PropTypes.object.isRequired
};

export default App;
