import { INCREMENT, DECREMENT, RENAME } from './actionKeys';

const initialState = {
  name: "Untitled Counter",
  count: 0
};

export default function(state = initialState, action) {
  switch(action.type) {
    case INCREMENT:
      return { count: state.count + 1, name: state.name };
    case DECREMENT:
      return { count: state.count - 1, name: state.name };
    case RENAME:
      return { count: state.count, name: action.name };
    default:
      return state;
  }
}

