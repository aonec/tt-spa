// import { PageGate, requestFx } from './index';
import { PageGate } from './index';
import { createEffect, forward } from 'effector';
import { createGate } from 'effector-react';
import './index';

// requestFx.use(() => {
//   console.log('Работает!');
//   return '1';
// });
export const requestFx = createEffect(() => {
  console.log('Работает!');
  return '1';
});

forward({
  from: PageGate.open,
  to: requestFx,
});

// export const Gate = createGate();
//
// const getFx = createEffect(() => {
//   console.log('works');
//   return 1;
// });

// const $store = createStore('default').on(getFx.doneData, (_, result) => result)

// $store.watch(state => {console.log('$store', state)})

// forward({
//   from: Gate.open,
//   to: getFx,
// });
