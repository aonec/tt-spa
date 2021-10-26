import { GetIndividualDeviceRequestParams } from '01/_api/individualDevices';
import { createEffect, createEvent, createStore } from 'effector';
import { createGate } from 'effector-react';
import { IndividualDeviceListItemResponse } from 'myApi';

export const $isShownClosedDevices = createStore(false);

export const $individualDevices = createStore<
  IndividualDeviceListItemResponse[]
>([]);

export const $pagedIndividualDevices = createStore<
  IndividualDeviceListItemResponse[]
>([]);

export const $pagedIndividualDevicePageNumber = createStore<number>(1);

export const fetchNextPageOfIndividualDevices = createEvent();

export const fetchNextPageOfIndividualDevicesFx = createEffect<
  GetIndividualDeviceRequestParams,
  IndividualDeviceListItemResponse[]
>();

export const PagedIndividualDevicesGate = createGate<GetIndividualDeviceRequestParams>();

export const fetchIndividualDevicesFx = createEffect<
  GetIndividualDeviceRequestParams,
  IndividualDeviceListItemResponse[]
>();

export const IndividualDevicesGate = createGate<GetIndividualDeviceRequestParams>();

export const refetchIndividualDevices = createEvent();

export const showClosedDevices = createEvent();
export const hideClosedDevices = createEvent();

export const resetIndividualDevices = createEvent();
