import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { incrementCounter, decrementCounter, renameCounter } from './actions';

class Counter extends Component {
  constructor(props) {
    super(props);
    this.incrementCounter = this.incrementCounter.bind(this);
    this.decrementCounter = this.decrementCounter.bind(this);
    this.renameCounter = this.renameCounter.bind(this);
  }

  incrementCounter() {
    this.props.store.dispatch(incrementCounter());
  }

  decrementCounter() {
    this.props.store.dispatch(decrementCounter());
  }

  renameCounter() {
    const newName = prompt("Enter a new name for this counter: ", this.props.store.getState().name);

    if (newName !== null && newName !== "") {
      this.props.store.dispatch(renameCounter(newName));
    }
  }

  render() {
    const { count, name } = this.props.store.getState();
    return (
      <div className="Counter">
        <p>{name}</p>
        <h1>{count}</h1>
        <div>
          <button onClick={this.incrementCounter}>+1</button>
          <button onClick={this.decrementCounter}>-1</button>
          <button onClick={this.renameCounter}>Rename</button>
        </div>
      </div>
    );
  }
}

Counter.propTypes = {
  store: PropTypes.object.isRequired
};

export default Counter;
