import React from 'react';
import ReactDOM from 'react-dom';
import Counter from './Counter';
import { createStore } from 'redux';
import reducer from './reducer';

const store = createStore(reducer);

const render = () => ReactDOM.render(<Counter store={store} />, document.getElementById('root'));

render();

store.subscribe(render);
