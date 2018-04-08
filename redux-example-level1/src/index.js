/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';
import { Counter, ConnectedCounter } from './Counter';
import reducer from './reducer';
import { incrementCounter, decrementCounter, renameCounter } from './actions';

const store = createStore(reducer);

// Without using react-redux
/* ----------------------------------------------------
const render = () => ReactDOM.render(
  <Counter 
    name={store.getState().name} 
    count={store.getState().count} 
    onIncrement={() => store.dispatch(incrementCounter())}
    onDecrement={() => store.dispatch(decrementCounter())}
    onRename={(name) => store.dispatch(renameCounter(name))}
  />, 
  document.getElementById('root')
);
render();
store.subscribe(render);
----------------------------------------------------- */

// Using react-redux
ReactDOM.render(
  <Provider store={store}>
    <ConnectedCounter />
  </Provider>,
  document.getElementById('root')
);
