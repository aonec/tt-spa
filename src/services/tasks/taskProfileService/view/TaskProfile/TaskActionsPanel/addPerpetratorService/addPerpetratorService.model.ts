import { createDomain, forward, guard } from 'effector';
import { createGate } from 'effector-react';
import {
  OrganizationUserListResponse,
  OrganizationUserListResponsePagedList,
} from 'myApi';
import { getOrganizationUsers } from './addPerpetratorService.api';

const domain = createDomain('addPerpetratorService');

const fetchOrganizationUsersFx = domain.createEffect<
  void,
  OrganizationUserListResponsePagedList
>(getOrganizationUsers);

const OrganizationUsersGate = createGate();

const $organizationUsers = domain
  .createStore<OrganizationUserListResponse[] | null>(null)
  .on(fetchOrganizationUsersFx.doneData, (_, data) => data.items)
  .reset(OrganizationUsersGate.close);

guard({
  source: $organizationUsers,
  clock: OrganizationUsersGate.open,
  filter: (users) => !users,
  target: fetchOrganizationUsersFx,
});

export const addPerpetratorService = {
  outputs: {
    $organizationUsers: $organizationUsers.map((users) => users || []),
  },
  gates: { OrganizationUsersGate },
};
