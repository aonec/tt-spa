import { sample } from 'effector';
import { createGate } from 'effector-react';
import { getAllClosingDevicesQuery } from './standartReportService.api';

const StandartReportGate = createGate();

sample({
  clock: StandartReportGate.open,
  target: getAllClosingDevicesQuery.start,
});

export const standartReportService = {
  inputs: {},
  outputs: {},
  gates: { StandartReportGate },
};
