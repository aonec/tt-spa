import { createStore, Store } from 'effector';

import { createGate } from 'effector-react';

export const PageGate = createGate();

export const $serviceZones = createStore([{ id: 0, name: '' }]);
