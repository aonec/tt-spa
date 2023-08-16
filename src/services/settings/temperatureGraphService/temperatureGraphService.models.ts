import { createDomain, sample } from 'effector';
import { getTemperatureNormative } from './temperatureGraphService.api';
import { TemperatureNormativeResponse } from 'api/types';
import { createGate } from 'effector-react';
import { sortBy } from 'lodash';

const domain = createDomain('temperatureGraphService');

const TemperatureGraphGate = createGate();

const handleEditTemperatureNormative = domain.createEvent();

const getTemperatureNormativeFx = domain.createEffect<
  void,
  TemperatureNormativeResponse[]
>(getTemperatureNormative);

const $temperatureNormative = domain
  .createStore<TemperatureNormativeResponse[]>([])
  .on(getTemperatureNormativeFx.doneData, (_, normativeData) =>
    sortBy(normativeData, (data) => data.outdoorTemperature * -1),
  );

sample({ clock: TemperatureGraphGate.open, target: getTemperatureNormativeFx });

export const temperatureGraphService = {
  inputs: { handleEditTemperatureNormative },
  outputs: { $temperatureNormative },
  gates: { TemperatureGraphGate },
};
