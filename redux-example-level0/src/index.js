import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore } from 'redux';
import reducer from './reducer';

const store = createStore(reducer);

const render = () => ReactDOM.render(<App store={store} />, document.getElementById('root'));

render();

store.subscribe(render);

