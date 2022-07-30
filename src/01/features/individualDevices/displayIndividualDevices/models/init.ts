
import { combine, forward, guard, sample } from 'effector';
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
import { getIndividualDevices } from '../../../../_api/individualDevices';
import { fetchHousingStockFx, HousingStockGate } from '../../../housingStocks/displayHousingStock/models';
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
