import { Redirect, Route } from 'react-router-dom';
import { TaskProfileContainer } from './taskProfileService';
import {
  TasksProfileContainer,
  tasksProfileService,
} from './tasksProfileService';
import React from 'react';
import { ESecuredIdentityRoleName, TaskGroupingFilter } from 'api/types';
import { usePermission } from 'hooks/usePermission';

export const TasksRouter = () => {
  const isSpectator = usePermission([
    ESecuredIdentityRoleName.ManagingFirmSpectator,
    ESecuredIdentityRoleName.ManagingFirmSpectatorRestricted,
  ]);
  const TasksIsOpen = tasksProfileService.gates.TasksIsOpen;

  const isDispacher = usePermission([
    ESecuredIdentityRoleName.ManagingFirmDispatcher,
  ]);

  const initialTasksPath =
    isSpectator || isDispacher
      ? `/tasks/list/${TaskGroupingFilter.Observing}`
      : `/tasks/list/${TaskGroupingFilter.Executing}`;

  return [
    <Redirect from="/tasks" to={initialTasksPath} exact />,
    <Route path="/tasks">
      <TasksIsOpen />

      <Route
        path="/tasks/profile/:taskId"
        component={TaskProfileContainer}
        exact
      />

      <Route
        path="/tasks/list/:grouptype"
        component={TasksProfileContainer}
        exact
      />
    </Route>,
  ];
};
