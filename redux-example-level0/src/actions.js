import { INCREMENT, DECREMENT, RENAME } from './actionKeys';

export const incrementCounter = () => {
  return { type: INCREMENT };
};

export const decrementCounter = () => {
  return { type: DECREMENT };
};

export const renameCounter = (name) => {
  return { type: RENAME, name };
};

