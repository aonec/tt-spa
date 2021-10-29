import {
  fetchHousingStockFx,
  HousingStockGate,
} from '01/features/housingStocks/displayHousingStock/models';
import { getIndividualDevices } from '01/_api/individualDevices';
import { combine, forward, guard, sample } from 'effector';
import {
  $individualDevices,
  $isShownClosedDevices,
  $pagedIndividualDevicePageNumber,
  $pagedIndividualDevices,
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
  .on(fetchIndividualDevicesFx.doneData, (_, devices) => devices)
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
    clock: fetchNextPageOfIndividualDevices,
    filter: () => !fetchNextPageOfIndividualDevicesFx.pending.getState(),
  }),
  source: combine(
    PagedIndividualDevicesGate.state,
    $pagedIndividualDevicePageNumber,
    (values, pageNumber) => ({
      ...values,
      PageNumber: pageNumber,
      PageSize: 10,
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

$pagedIndividualDevices
  .on(PagedIndividualDevicesGate.close, () => [])
  .on(fetchNextPageOfIndividualDevicesFx.doneData, (prevElems, nextElems) => [
    ...prevElems,
    ...nextElems,
  ])
  .reset(HousingStockGate.state);
