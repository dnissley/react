import { INCREMENT, DECREMENT, RENAME } from './actionKeys';

export const increment = () => {
  return { type: INCREMENT };
};

export const decrement = () => {
  return { type: DECREMENT };
};

export const rename = (name) => {
  return { type: RENAME, name };
};

