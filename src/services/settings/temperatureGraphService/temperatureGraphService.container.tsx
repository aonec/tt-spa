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
  const { temperatureNormative, isEditing, handleEditTemperatureNormative } =
    useUnit({
      temperatureNormative: outputs.$temperatureNormative,
      isEditing: outputs.$isEditing,
      handleEditTemperatureNormative: inputs.handleEditTemperatureNormative,
    });
  return (
    <>
      <TemperatureGraphGate />
      <TemperatureGraph
        temperatureNormative={temperatureNormative}
        isEditing={isEditing}
        handleEditTemperatureNormative={handleEditTemperatureNormative}
      />
    </>
  );
};
