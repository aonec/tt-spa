import { IndividualDeviceResponse } from 'myApi';
import { createEffect, createStore } from 'effector';
import { createGate } from 'effector-react';

export const $individualDevice = createStore<IndividualDeviceResponse | null>(
  null
);

export const fetchIndividualDevice = createEffect<
  number,
  IndividualDeviceResponse
>();

export const IndividualDeviceGate = createGate<{ id: number }>();
