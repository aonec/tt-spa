import {
  fetchHousingStockFx,
  HousingStockGate,
} from '01/features/housingStocks/displayHousingStock/models';
import { getIndividualDevices } from '01/_api/individualDevices';
import { combine, forward, guard, sample } from 'effector';
import { individualDeviceMetersInputService } from 'services/meters/individualDeviceMetersInputService';
import {
  $individualDevices,
  $isAllDevicesDone,
  $isShownClosedDevices,
  $pagedIndividualDevicePageNumber,
  $pagedIndividualDevices,
  $totalPagedElems,
  fetchIndividualDevicesFx,
  fetchNextPageOfIndividualDevices,
  fetchNextPageOfIndividualDevicesFx,
  hideClosedDevices,
  IndividualDevicesGate,
  PagedIndividualDevicesGate,
  refetchIndividualDevices,
  resetIndividualDevices,
  showClosedDevices,
} from '.';
import { toArray } from '../../addIndividualDevice/components/CheckFormValuesModal';

fetchIndividualDevicesFx.use(getIndividualDevices);
fetchNextPageOfIndividualDevicesFx.use(getIndividualDevices);

$individualDevices
  .on(fetchIndividualDevicesFx.doneData, (_, { items: devices }) => devices)
  .reset(resetIndividualDevices, IndividualDevicesGate.close);

guard({
  source: IndividualDevicesGate.state,
  clock: IndividualDevicesGate.state,
  filter: (value) => toArray(value).some(Boolean),
  target: fetchIndividualDevicesFx,
});

sample({
  source: IndividualDevicesGate.state.map((elem) => elem),
  clock: refetchIndividualDevices,
  target: fetchIndividualDevicesFx,
});

$isShownClosedDevices
  .on(showClosedDevices, () => true)
  .reset(hideClosedDevices);

sample({
  clock: guard({
    source: combine(
      $isAllDevicesDone,
      fetchNextPageOfIndividualDevicesFx.pending
    ),
    clock: fetchNextPageOfIndividualDevices,
    filter: ([isAllDone, pending]) => !(pending || isAllDone),
  }),
  source: combine(
    PagedIndividualDevicesGate.state,
    $pagedIndividualDevicePageNumber,
    (values, pageNumber) => ({
      ...values,
      PageNumber: pageNumber,
      PageSize: 25,
      OrderRule: 'ApartmentNumber',
      IsOpened: true,
    })
  ),
  target: [fetchNextPageOfIndividualDevicesFx],
});

$pagedIndividualDevicePageNumber
  .on(fetchNextPageOfIndividualDevicesFx.doneData, (prev) => prev + 1)
  .reset(HousingStockGate.state);

forward({
  from: fetchHousingStockFx.doneData,
  to: fetchNextPageOfIndividualDevices,
});

$totalPagedElems.on(
  fetchNextPageOfIndividualDevicesFx.doneData,
  (_, { total }) => total
);

$pagedIndividualDevices
  .on(PagedIndividualDevicesGate.close, () => [])
  .on(
    fetchNextPageOfIndividualDevicesFx.doneData,
    (prevElems, { items: nextElems }) => [...prevElems, ...nextElems]
  )
  .reset(HousingStockGate.state);

$pagedIndividualDevices
  .on(
    individualDeviceMetersInputService.inputs.uploadMeterFx.done,
    (state, { params, result }) => {
      return state.map((device) => {
        if (device.id !== params.meter.deviceId) return device;

        const filteredReadings =
          device.readings?.filter(({ id }) => params.meterId !== id) || [];

        return {
          ...device,
          readings: [...filteredReadings, result],
        };
      });
    }
  )
  .on(
    individualDeviceMetersInputService.inputs.deleteMeterFx.done,
    (state, { params: { deviceId, meterId } }) =>
      state.map((device) => {
        if (device.id !== deviceId) return device;

        return {
          ...device,
          readings: device.readings?.filter(({ id }) => id !== meterId) || [],
        };
      })
  );
