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
  ]);

  const initialTasksPath = isSpectator
    ? `/tasks/list/${TaskGroupingFilter.Observing}`
    : `/tasks/list/${TaskGroupingFilter.Executing}`;

  const TasksIsOpen = tasksProfileService.gates.TasksIsOpen;

  const RouteWrapper = () => {
    return (
      <>
        <TasksIsOpen />
        <Outlet />
      </>
    );
  };

  return [
    <Route
      path="/tasks"
      element={<Navigate replace to={initialTasksPath} />}
    />,
    <Route path="/tasks" key="/tasks" element={<RouteWrapper />}>
      <Route path="/tasks/profile/:taskId" element={<TaskProfileContainer />} />

      <Route
        path="/tasks/list/:grouptype"
        element={<TasksProfileContainer />}
      />
    </Route>,
  ];
};
