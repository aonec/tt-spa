import { createEffect, createStore } from 'effector';

import { createGate } from 'effector-react';
import { HomeownerAccountResponse } from 'api/types';
import { getHomeownerAccount } from './displayHomeownerService.api';

const HomeownerGate = createGate<{ id: string }>();

const fetchHomeownerFx = createEffect<string, HomeownerAccountResponse>(
  getHomeownerAccount,
);

const $homeowner = createStore<HomeownerAccountResponse | null>(null).on(
  fetchHomeownerFx.doneData,
  (_, homeowner) => homeowner,
);

export const displayHomeownerService = {
  inputs: {},
  outputs: { $homeowner },
  gates: { HomeownerGate },
};
