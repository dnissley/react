import { INCREMENT, DECREMENT, RENAME } from './actionKeys';

export function incrementCounter() {
  return { type: INCREMENT };
}

export function decrementCounter() {
  return { type: DECREMENT };
}

export function renameCounter(name) {
  return { type: RENAME, name };
}

