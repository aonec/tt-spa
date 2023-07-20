import { createDomain } from 'effector';
import { createGate } from 'effector-react';
import { HomeownerAccountResponse } from 'api/types';
import { getHomeownerAccount } from './displayHomeownerService.api';

const domain = createDomain('displayHomeownerService');

const HomeownerGate = createGate<{ id: string }>();

const fetchHomeownerFx = domain.createEffect<string, HomeownerAccountResponse>(
  getHomeownerAccount,
);

const $homeowner = domain
  .createStore<HomeownerAccountResponse | null>(null)
  .on(fetchHomeownerFx.doneData, (_, homeowner) => homeowner);

export const displayHomeownerService = {
  inputs: {},
  outputs: { $homeowner },
  gates: { HomeownerGate },
};
