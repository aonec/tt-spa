import React from 'react';
import { useStore } from 'effector-react';
import { tasksMapService } from './tasksMapService.model';
import { TasksMapView } from './view/TasksMapView';

const { outputs, gates } = tasksMapService;
const { TaskTypesGate } = gates;

export const TasksMapContainer = () => {
  const tasksPagedData = useStore(outputs.$tasks);
  const taskTypes = useStore(outputs.$taskTypes);

  const tasks = tasksPagedData?.items;

  return (
    <>
      <TaskTypesGate />
      <TasksMapView tasks={tasks || []} taskTypes={taskTypes} />
    </>
  );
};
