import React, { FC } from 'react';
import { Wrapper } from './TasksMapView.styled';
import { TasksMapViewProps } from './TasksMapView.types';
import { TasksMapFiltration } from './TasksMapFiltration';
import { TasksMapsNative } from './TasksMapsNative';

export const TasksMapView: FC<TasksMapViewProps> = ({
  taskTypes,
  housingStocksWithTasks,
  applyFilters,
  filtrationValues,
  resetFilters,
  isLoadingHousingStocksWithTasks,
  selectedHousingStock,
  handleClickMarker,
  clearSelectedHousingStock,
  task,
  handleClickTask,
  isLoadingTask,
  clearTask,
  organizationUsers,
  organizationCoordinates,
}) => {
  return (
    <Wrapper>
      <TasksMapFiltration
        taskTypes={taskTypes}
        applyFilters={applyFilters}
        filtrationValues={filtrationValues}
        resetFilters={resetFilters}
        isLoadingHousingStocksWithTasks={isLoadingHousingStocksWithTasks}
        selectedHousingStock={selectedHousingStock}
        clearSelectedHousingStock={clearSelectedHousingStock}
        task={task}
        isLoadingTask={isLoadingTask}
        handleClickTask={handleClickTask}
        clearTask={clearTask}
        organizationUsers={organizationUsers}
        housingStocksWithTasks={housingStocksWithTasks}
      />
      <TasksMapsNative
        buildingsWithTasks={housingStocksWithTasks}
        handleClickMarker={handleClickMarker}
        selectedHousingStockId={selectedHousingStock?.building?.id}
        organizationCoordinates={organizationCoordinates}
      />
    </Wrapper>
  );
};
