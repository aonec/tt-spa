import { createDomain, forward, sample } from 'effector';
import { createGate } from 'effector-react';
import { OrganizationUserResponse } from 'myApi';
import { getUserData } from './employeeProfileService.api';

const domain = createDomain('employeeProfileService');

const FetchUserDataGate = createGate<{ id: string }>();

const fetchUserDataFx = domain.createEffect<
  string,
  OrganizationUserResponse | null
>(getUserData);

sample({
  clock: FetchUserDataGate.open,
  fn: (id) => id.id,
  target: fetchUserDataFx,
});

const $userData = domain
  .createStore<OrganizationUserResponse | null>(null)
  .on(fetchUserDataFx.doneData, (_, data) => data);

export const employeeProfileService = {
  inputs: {},
  outputs: { $userData },
  gates: { FetchUserDataGate },
};
