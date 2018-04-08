# Redux Example - Level 1

First, this follows on from level 0 where I did the following:

Create a simple counter component that allows incrementing, decrementing, and renaming.

1. Add redux as a dependency: `npm install redux --save`
2. Add action keys in `src/actionKeys.js`: `INCREMENT`, `DECREMENT`, `RENAME`
3. Add action creators in `src/actions.js`: `increment()`, `decrement()`, `rename(newName)`
4. Add a reducer function in `src/reducer.js`. This is a function that takes a state and an action object and returns a new state object.
5. Make changes to the `src/App.js` component to make it act as a counter and take the store as a prop.
6. Make changes to the `src/index.js` bootstrapping script to create the store, pass it to the rendered App component, and re-render when state changes.

Second, I made the following enhancements:

1. Add react-redux as a dependency: `npm install react-redux --save`
2. 
3. 
3. In `src/index.js`, used the `<Provider>` component to pass down the store to a `<ConnectedCounter>`.

