import { Redirect, Route } from 'react-router-dom';
import { TaskProfileContainer } from './taskProfileService';
import {
  TasksProfileContainer,
  tasksProfileService,
} from './tasksProfileService';
import React from 'react';
import { useStore } from 'effector-react';

export const TasksRouter = () => {
  const isSpectator = useStore(tasksProfileService.outputs.$isSpectator);
  const TasksIsOpen = tasksProfileService.gates.TasksIsOpen;

  const initialTasksPath = isSpectator
    ? '/tasks/list/Observing'
    : '/tasks/list/Executing';

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
