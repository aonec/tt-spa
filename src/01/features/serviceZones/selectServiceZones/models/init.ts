// import { PageGate, requestFx } from './index';
import { $serviceZones, PageGate } from './index';
import { createEffect, forward } from 'effector';
import { createGate } from 'effector-react';
import './index';
import axios from '01/axios';

// requestFx.use(() => {
//   console.log('Работает!');
//   return '1';
// });
export const requestFx = createEffect(() => axios.get('NodeServiceZones'));

$serviceZones.on(requestFx.doneData, (s, a: any) => [
  ...s,
  ...a.nodeServiceZones,
]);

$serviceZones.watch((state) => console.log(JSON.stringify(state)));

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
