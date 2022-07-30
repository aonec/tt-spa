import { combine, createEffect, createEvent, createStore } from 'effector';
import { createGate } from 'effector-react';
import { IndividualDeviceListItemResponse } from '../../../../../api/types';
import { GetIndividualDeviceRequestParams } from '../../../../_api/individualDevices';

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
  { items: IndividualDeviceListItemResponse[]; total: number }
>();

export const PagedIndividualDevicesGate = createGate<GetIndividualDeviceRequestParams>();

export const fetchIndividualDevicesFx = createEffect<
  GetIndividualDeviceRequestParams,
  { items: IndividualDeviceListItemResponse[]; total: number }
>();

export const $totalPagedElems = createStore<null | number>(null);

export const IndividualDevicesGate = createGate<GetIndividualDeviceRequestParams>();

export const refetchIndividualDevices = createEvent();

export const showClosedDevices = createEvent();
export const hideClosedDevices = createEvent();

export const resetIndividualDevices = createEvent();

export const $isAllDevicesDone = combine(
  $pagedIndividualDevices,
  $totalPagedElems,
  (devices, total) => (devices.length ? devices.length === total : null)
);
