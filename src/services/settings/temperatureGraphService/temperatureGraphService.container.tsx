import React from 'react';
import { TemperatureGraph } from './view/TemperatureGraph';
import { temperatureGraphService } from './temperatureGraphService.models';
import { useUnit } from 'effector-react';

const {
  inputs,
  outputs,
  gates: { TemperatureGraphGate },
} = temperatureGraphService;

export const TemperatureGraphContainer = () => {
  const {
    temperatureNormative,
    isEditing,
    handleEditTemperatureNormative,
    setEditedTemperatureNormative,
    isLoading,
    errorColumns,
  } = useUnit({
    temperatureNormative: outputs.$temperatureNormative,
    isEditing: outputs.$isEditing,
    handleEditTemperatureNormative: inputs.handleEditTemperatureNormative,
    setEditedTemperatureNormative: inputs.setEditedTemperatureNormative,
    isLoading: outputs.$isLoading,
    errorColumns: outputs.$errorColumns,
  });
  return (
    <>
      <TemperatureGraphGate />
      <TemperatureGraph
        temperatureNormative={temperatureNormative}
        isEditing={isEditing}
        handleEditTemperatureNormative={handleEditTemperatureNormative}
        setEditedTemperatureNormative={setEditedTemperatureNormative}
        isLoading={isLoading}
        errorColumns={errorColumns}
      />
    </>
  );
};
