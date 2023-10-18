import { createEffect, createStore } from 'effector';
import { sample } from 'effector';
import { createGate } from 'effector-react';
import { getNearestTotalAppointments } from './sealActionSelectService.api';
import { TotalAppointmentCounterResponse } from 'api/types';

const fetchNearestTotalAppointmentsFx = createEffect(
  getNearestTotalAppointments,
);
const $nearestTotalAppointments =
  createStore<TotalAppointmentCounterResponse | null>(null).on(
    fetchNearestTotalAppointmentsFx.doneData,
    (_, total) => total,
  );

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
