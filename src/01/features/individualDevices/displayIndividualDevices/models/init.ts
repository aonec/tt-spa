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

forward({
  from: PagedIndividualDevicesGate.open,
  to: fetchNextPageOfIndividualDevices,
});

sample({
  clock: fetchNextPageOfIndividualDevices,
  source: combine(
    PagedIndividualDevicesGate.state,
    $pagedIndividualDevicePageNumber,
    (values, pageNumber) => ({
      ...values,
      PageNumber: pageNumber,
      PageSize: 5,
      OrderRule: 'ApartmentNumber',
    })
  ),
  target: [fetchNextPageOfIndividualDevicesFx],
});

$pagedIndividualDevicePageNumber.on(
  fetchNextPageOfIndividualDevicesFx.doneData,
  (prev) => prev + 1
);

$pagedIndividualDevices
  .on(PagedIndividualDevicesGate.close, () => [])
  .on(fetchNextPageOfIndividualDevicesFx.doneData, (prevElems, nextElems) => [
    ...prevElems,
    ...nextElems,
  ]);
