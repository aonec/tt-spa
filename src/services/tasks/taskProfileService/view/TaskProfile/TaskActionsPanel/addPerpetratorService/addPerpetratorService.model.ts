import { createEffect, createStore } from 'effector';
import { combine, guard, sample } from 'effector';
import { createGate } from 'effector-react';
import {
  OrganizationUserListResponse,
  OrganizationUserListResponsePagedList,
} from 'api/types';
import { taskProfileService } from 'services/tasks/taskProfileService/taskProfileService.model';
import { getOrganizationUsers } from './addPerpetratorService.api';

const fetchOrganizationUsersFx = createEffect<
  string[] | null,
  OrganizationUserListResponsePagedList
>(getOrganizationUsers);

const OrganizationUsersGate = createGate();

const $organizationUsers = createStore<OrganizationUserListResponse[] | null>(
  null,
)
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
    if (!task) return null;

    const potentialNextStageId = task.currentStage?.potentialNextStageIds?.[0];

    if (!potentialNextStageId) return null;

    const nextStage = task.stages?.find(
      (elem) => elem.id === potentialNextStageId,
    );

    if (!nextStage) return null;

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
