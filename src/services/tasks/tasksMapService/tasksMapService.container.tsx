import React from 'react';
import { useEvent, useStore } from 'effector-react';
import { tasksMapService } from './tasksMapService.model';
import { TasksMapView } from './view/TasksMapView';

const { inputs, outputs } = tasksMapService;

export const TasksMapContainer = () => {
  const housingStocksWithTasks = useStore(outputs.$housingStocksWithTasks);
  const taskTypes = useStore(outputs.$taskTypes);
  const filtrationValues = useStore(outputs.$filtrationValues);
  const isLoadingHousingStocksWithTasks = useStore(
    outputs.$isLoadingHousingStocksWithTasks,
  );
  const selectedHousingStock = useStore(outputs.$selectedHousingStock);
  const task = useStore(outputs.$task);
  const isLoadingTask = useStore(outputs.$isLoadingTask);
  const organizationUsers = useStore(outputs.$organizationUsers);

  const applyFilters = useEvent(inputs.applyFilters);
  const resetFilters = useEvent(inputs.resetFilters);
  const handleClickMarker = useEvent(inputs.handleClickMarker);
  const clearSelectedHousingStock = useEvent(inputs.clearSelectedHousingStock);
  const handleClickTask = useEvent(inputs.handleClickTask);
  const clearTask = useEvent(inputs.clearTask);

  return (
    <TasksMapView
      taskTypes={taskTypes}
      housingStocksWithTasks={housingStocksWithTasks}
      applyFilters={applyFilters}
      filtrationValues={filtrationValues}
      resetFilters={resetFilters}
      isLoadingHousingStocksWithTasks={isLoadingHousingStocksWithTasks}
      selectedHousingStock={selectedHousingStock}
      handleClickMarker={handleClickMarker}
      clearSelectedHousingStock={clearSelectedHousingStock}
      task={task}
      isLoadingTask={isLoadingTask}
      handleClickTask={handleClickTask}
      clearTask={clearTask}
      organizationUsers={organizationUsers}
    />
  );
};
