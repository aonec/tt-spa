import { IndividualDeviceResponse } from '../../api/types';
import { createEffect, createStore } from 'effector';
import { createGate } from 'effector-react';

export const $individualDevice = createStore<IndividualDeviceResponse | null>(
  null
);

export const fetchIndividualDeviceFx = createEffect<
  number,
  IndividualDeviceResponse
>();

export const IndividualDeviceGate = createGate<{ id: number }>();
