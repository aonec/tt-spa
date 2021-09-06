import { createGate } from 'effector-react';
import { GetMeteringDevicesModelsRequest } from './../../../../_api/meteringDevices';
import { createStore, createEffect } from 'effector';

export const $individualDevicesNames = createStore<string[] | null>(null);

export const fetchIndividualDeviceFxsNames = createEffect<
  GetMeteringDevicesModelsRequest,
  string[]
>();

export const IndividualDevicecModelsGate = createGate<{ model: string }>();
