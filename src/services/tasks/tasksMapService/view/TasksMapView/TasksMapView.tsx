import React, { FC } from 'react';
import { Wrapper } from './TasksMapView.styled';
import { TasksMapViewProps } from './TasksMapView.types';
import { TasksMapFiltration } from './TasksMapFiltration';
import { TasksMap } from './TasksMap/TasksMap';

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
      />
      <TasksMap
        housingStocksWithTasks={housingStocksWithTasks}
        handleClickMarker={handleClickMarker}
      />
    </Wrapper>
  );
};
