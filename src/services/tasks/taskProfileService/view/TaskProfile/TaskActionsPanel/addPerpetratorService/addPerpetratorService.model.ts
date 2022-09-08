import { combine, createDomain, guard, sample } from 'effector';
import { createGate } from 'effector-react';
import {
  OrganizationUserListResponse,
  OrganizationUserListResponsePagedList,
} from 'myApi';
import { taskProfileService } from 'services/tasks/taskProfileService/taskProfileService.model';
import { getOrganizationUsers } from './addPerpetratorService.api';

const domain = createDomain('addPerpetratorService');

const fetchOrganizationUsersFx = domain.createEffect<
  string[] | undefined,
  OrganizationUserListResponsePagedList
>(getOrganizationUsers);

const OrganizationUsersGate = createGate();

const $organizationUsers = domain
  .createStore<OrganizationUserListResponse[] | null>(null)
  .on(fetchOrganizationUsersFx.doneData, (_, data) => data.items)
  .reset(OrganizationUsersGate.close);

sample({
  source: taskProfileService.outputs.$task,
  clock: guard({
    source: combine($organizationUsers, taskProfileService.outputs.$task),
    clock: OrganizationUsersGate.open,
    filter: ([users, task]) => !users && Boolean(task),
  }),
  fn: (task) => {
    if (!task) return;

    const potentialNextStageId = task.currentStage?.potentialNextStageIds?.[0];

    if (!potentialNextStageId) return;

    const nextStage = task.stages?.find(
      (elem) => elem.id === potentialNextStageId
    );

    if (!nextStage) return;

    return nextStage.requiredUserRoles;
  },
  target: fetchOrganizationUsersFx,
});

export const addPerpetratorService = {
  outputs: {
    $organizationUsers: $organizationUsers.map((users) => users || []),
  },
  gates: { OrganizationUsersGate },
};
