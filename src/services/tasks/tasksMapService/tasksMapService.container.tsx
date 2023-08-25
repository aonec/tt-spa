import React from 'react';
import { useUnit } from 'effector-react';
import { tasksMapService } from './tasksMapService.model';
import { TasksMapView } from './view/TasksMapView';

const { inputs, outputs } = tasksMapService;

export const TasksMapContainer = () => {
  const {
    housingStocksWithTasks,
    taskTypes,
    filtrationValues,
    isLoadingHousingStocksWithTasks,
    selectedHousingStock,
    task,
    isLoadingTask,
    organizationUsers,
    applyFilters,
    resetFilters,
    handleClickMarker,
    clearSelectedHousingStock,
    handleClickTask,
    clearTask,
    organizationCoordinates,
  } = useUnit({
    housingStocksWithTasks: outputs.$housingStocksWithTasks,
    taskTypes: outputs.$taskTypes,
    filtrationValues: outputs.$filtrationValues,
    isLoadingHousingStocksWithTasks: outputs.$isLoadingHousingStocksWithTasks,
    selectedHousingStock: outputs.$selectedHousingStock,
    task: outputs.$task,
    isLoadingTask: outputs.$isLoadingTask,
    organizationUsers: outputs.$organizationUsers,
    applyFilters: inputs.applyFilters,
    resetFilters: inputs.resetFilters,
    handleClickMarker: inputs.handleClickMarker,
    clearSelectedHousingStock: inputs.clearSelectedHousingStock,
    handleClickTask: inputs.handleClickTask,
    clearTask: inputs.clearTask,
    organizationCoordinates: outputs.$organizationCoordinates,
  });

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
      organizationCoordinates={organizationCoordinates}
    />
  );
};
