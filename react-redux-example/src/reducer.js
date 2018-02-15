import { INCREMENT, DECREMENT, RENAME } from './actionKeys';

const initialState = {
  name: "Untitled Counter",
  count: 0
};

export default function (state = initialState, action) {
  switch(action.type) {
    case INCREMENT:
      return { name: state.name, count: state.count + 1 };
    case DECREMENT:
      return { name: state.name, count: state.count - 1 };
    case RENAME:
      return { name: action.name, count: state.count };
    default:
      return state;
  }
};

