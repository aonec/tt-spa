import { Navigate, Outlet, Route } from 'react-router-dom';
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
    ESecuredIdentityRoleName.Supervisor,
  ]);

  const initialTasksPath = isSpectator
    ? `/tasks/list/${TaskGroupingFilter.Observing}`
    : `/tasks/list/${TaskGroupingFilter.Executing}`;

  const TasksIsOpen = tasksProfileService.gates.TasksIsOpen;

  const TasksRouterWrapper = () => {
    return (
      <>
        <TasksIsOpen />
        <Outlet />
      </>
    );
  };

  return [
    <Route
      key="tasks"
      path="/tasks"
      element={<Navigate replace to={initialTasksPath} />}
    />,
    <Route path="/tasks" key="/tasks" element={<TasksRouterWrapper />}>
      <Route path="/tasks/profile/:taskId" element={<TaskProfileContainer />} />

      <Route
        path="/tasks/list/:grouptype"
        element={<TasksProfileContainer />}
      />
    </Route>,
  ];
};
