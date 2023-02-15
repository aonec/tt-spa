import { useStore } from 'effector-react';
import React from 'react';
import { tasksMapService } from './tasksMapService.model';
import { TasksMapView } from './view/TasksMapView';

const { outputs } = tasksMapService;

export const TasksMapContainer = () => {
  const tasksPagedData = useStore(outputs.$tasks);

  const tasks = tasksPagedData?.items;

  return <TasksMapView tasks={tasks || []} />;
};
