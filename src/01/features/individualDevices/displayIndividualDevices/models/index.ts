import { GetIndividualDeviceRequestParams } from '01/_api/individualDevices';
import { createEffect, createStore } from 'effector';
import { createGate } from 'effector-react';
import { IndividualDeviceListItemResponse } from 'myApi';

export const $individualDevices = createStore<
  IndividualDeviceListItemResponse[] | null
>(null);

export const fetchIndividualDevices = createEffect<
  GetIndividualDeviceRequestParams,
  IndividualDeviceListItemResponse[]
>();

export const IndividualDevicesGate = createGate<GetIndividualDeviceRequestParams>();
