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
  const { temperatureNormative } = useUnit({
    temperatureNormative: outputs.$temperatureNormative,
  });
  return (
    <>
      <TemperatureGraphGate />
      <TemperatureGraph temperatureNormative={temperatureNormative} />
    </>
  );
};
