import React from 'react';
import { useStore } from 'effector-react';
import { tasksMapService } from './tasksMapService.model';
import { TasksMapView } from './view/TasksMapView';

const { outputs, gates } = tasksMapService;
const { TaskTypesGate } = gates;

export const TasksMapContainer = () => {
  const housingStocksWithTasks = useStore(outputs.$housingStocksWithTasks);
  const taskTypes = useStore(outputs.$taskTypes);

  // const applyFilters = useEvent(inputs.applyFilters);

  return (
    <>
      <TaskTypesGate />
      <TasksMapView
        taskTypes={taskTypes}
        housingStocksWithTasks={housingStocksWithTasks}
      />
    </>
  );
};
