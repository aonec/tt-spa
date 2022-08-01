import { createDomain, forward } from 'effector';
import { createGate } from 'effector-react';
import { IndividualDeviceListItemResponsePagedList } from 'myApi';
import { getIndividualDevices } from './apartmentIndividualDevicesMetersService.api';
import { GetIndividualDevicesParams } from './apartmentIndividualDevicesMetersService.types';

const domain = createDomain('apartmentIndividualDevicesMetersService');

const $individualDevicesPagedData = domain.createStore<IndividualDeviceListItemResponsePagedList | null>(
  null
);

const $individualDevicesList = $individualDevicesPagedData.map(
  (data) => data?.items || []
);

const fetchIndividualDevicesFx = domain.createEffect<
  GetIndividualDevicesParams,
  IndividualDeviceListItemResponsePagedList
>(getIndividualDevices);

const $isLoading = fetchIndividualDevicesFx.pending;

const IndividualDevicesGate = createGate<GetIndividualDevicesParams>();

$individualDevicesPagedData.on(
  fetchIndividualDevicesFx.doneData,
  (_, data) => data
);

forward({
  from: IndividualDevicesGate.state,
  to: fetchIndividualDevicesFx,
});

export const apartmentIndividualDevicesMetersService = {
  outputs: { $individualDevicesList, $isLoading },
  gates: { IndividualDevicesGate },
};
