import { createEffect, sample } from 'effector';
import { getCurrentUser } from './regularReportsService.api';
import { createGate } from 'effector-react';

const PageGate = createGate();

const getCurrentUserFx = createEffect(getCurrentUser);

sample({ clock: PageGate.open, target: getCurrentUserFx });

export const regularReportsService = {
  inputs: {},
  outputs: {},
  gates: { PageGate },
};
