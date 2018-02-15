import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { incrementCounter, decrementCounter, renameCounter } from './actions';

class Counter extends Component {
  constructor(props) {
    super(props);
    this.rename = this.rename.bind(this);
  }

  rename() {
    const newName = prompt("Please enter the new name for the counter.", this.props.name);

    if (newName === null || newName === "") {
      return;
    }

    this.props.onRename(newName);
  }

  render() {
    return (
      <div className="Counter">
        <p>{this.props.name}</p>
        <h1>{this.props.count}</h1>
        <button onClick={this.props.onIncrement}>+1</button>
        <button onClick={this.props.onDecrement}>-1</button>
        <button onClick={this.rename}>rename</button>
      </div>
    );
  }
}

Counter.propTypes = {
  count: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
  onRename: PropTypes.func.isRequired
};

const ConnectedCounter = connect(
  function mapStateToProps(state) {
    return {
      name: state.name,
      count: state.count
    };
  },
  function mapDispatchToProps(dispatch) {
    return {
      onIncrement() { dispatch(incrementCounter()); },
      onDecrement() { dispatch(decrementCounter()); },
      onRename(name) { dispatch(renameCounter(name)); }
    };
  }
)(Counter);

export { Counter, ConnectedCounter };

