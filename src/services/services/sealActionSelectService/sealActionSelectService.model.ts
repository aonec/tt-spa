import { createDomain, sample } from 'effector';
import { createGate } from 'effector-react';
import { TotalAppointmentCounterResponse } from 'myApi';
import { getNearestTotalAppointments } from './sealActionSelectService.api';

const domain = createDomain('sealActionSelectService');

const fetchNearestTotalAppointmentsFx = domain.createEffect(
  getNearestTotalAppointments,
);
const $nearestTotalAppointments = domain
  .createStore<TotalAppointmentCounterResponse | null>(null)
  .on(fetchNearestTotalAppointmentsFx.doneData, (_, total) => total);

const SealActionSelectGate = createGate();

const $isNearestTotalAppointmentsLoading =
  fetchNearestTotalAppointmentsFx.pending;

sample({
  clock: SealActionSelectGate.open,
  target: fetchNearestTotalAppointmentsFx,
});

export const sealActionSelectService = {
  outputs: {
    $nearestTotalAppointments,
    $isNearestTotalAppointmentsLoading,
  },
  gates: { SealActionSelectGate },
};