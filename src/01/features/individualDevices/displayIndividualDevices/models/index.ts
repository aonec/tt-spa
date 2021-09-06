import { GetIndividualDeviceRequestParams } from '01/_api/individualDevices';
import { createEffect, createEvent, createStore } from 'effector';
import { createGate } from 'effector-react';
import { IndividualDeviceListItemResponse } from 'myApi';

export const $individualDevices = createStore<
  IndividualDeviceListItemResponse[]
>([]);

export const fetchIndividualDeviceFxs = createEffect<
  GetIndividualDeviceRequestParams,
  IndividualDeviceListItemResponse[]
>();

export const IndividualDevicesGate = createGate<GetIndividualDeviceRequestParams>();

export const refetchIndividualDevicesFx = createEvent();
