import React from 'react';
import { useEvent, useStore } from 'effector-react';
import { tasksMapService } from './tasksMapService.model';
import { TasksMapView } from './view/TasksMapView';

const { inputs, outputs, gates } = tasksMapService;
const { TaskTypesGate } = gates;

export const TasksMapContainer = () => {
  const housingStocksWithTasks = useStore(outputs.$housingStocksWithTasks);
  const taskTypes = useStore(outputs.$taskTypes);
  const filtrationValues = useStore(outputs.$filtrationValues);
  const isLoadingHousingStocksWithTasks = useStore(
    outputs.$isLoadingHousingStocksWithTasks,
  );
  const selectedHousingStock = useStore(outputs.$selectedHousingStock);

  const applyFilters = useEvent(inputs.applyFilters);
  const resetFilters = useEvent(inputs.resetFilters);
  const handleClickMarker = useEvent(inputs.handleClickMarker);
  const clearSelectedHousingStock = useEvent(inputs.clearSelectedHousingStock);

  return (
    <>
      <TaskTypesGate />
      <TasksMapView
        taskTypes={taskTypes}
        housingStocksWithTasks={housingStocksWithTasks}
        applyFilters={applyFilters}
        filtrationValues={filtrationValues}
        resetFilters={() => resetFilters()}
        isLoadingHousingStocksWithTasks={isLoadingHousingStocksWithTasks}
        selectedHousingStock={selectedHousingStock}
        handleClickMarker={handleClickMarker}
        clearSelectedHousingStock={clearSelectedHousingStock}
      />
    </>
  );
};
