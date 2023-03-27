import React, { FC } from 'react';
import { Wrapper } from './TasksMapView.styled';
import { TasksMapViewProps } from './TasksMapView.types';
import { TasksMapFiltration } from './TasksMapFiltration';
import { TasksMap } from './TasksMap/TasksMap';
import { TasksMapsNative } from './TasksMapsNative';
import { featureToggles } from 'featureToggles';

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
      />
      {featureToggles.taskMaps.nativeApi && <TasksMapsNative />}
      {!featureToggles.taskMaps.nativeApi && (
        <TasksMap
          housingStocksWithTasks={housingStocksWithTasks}
          handleClickMarker={handleClickMarker}
          selectedHousingStockId={selectedHousingStock?.housingStock?.id}
        />
      )}
    </Wrapper>
  );
};
