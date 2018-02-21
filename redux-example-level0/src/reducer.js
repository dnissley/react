import { INCREMENT, DECREMENT, RENAME } from './actionKeys';

const initialState = {
  value: 0,
  name: "UNTITLED"
};

export default function(state = initialState, action) {
  switch(action.type) {
    case INCREMENT:
      return { value: state.value + 1, name: state.name };
    case DECREMENT:
      return { value: state.value - 1, name: state.name };
    case RENAME:
      return { value: state.value, name: action.name };
    default:
      return state;
  }
}

