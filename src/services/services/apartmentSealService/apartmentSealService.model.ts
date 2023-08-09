import { createDomain, sample } from 'effector';
import {
  ApartmentResponse,
  IndividualDeviceListItemResponse,
  AppointmentResponse,
} from 'api/types';
import { EffectFailDataAxiosError } from 'types';
import { message } from 'antd';
import { createGate } from 'effector-react';
import { putApartment } from 'services/meters/metersService/ApartmentReadingsService/ApartmentReadingsService.api';
import {
  GetApartmentsRequestPayload,
  UpdateApartmentRequestPayload,
} from 'services/meters/metersService/ApartmentReadingsService/ApartmentReadingsService.types';
import {
  getApartmentIdQuery,
  getApartmentQuery,
  getIndividualDevices,
  getNearestAppointmentForApartment,
} from './apartmentSealService.api';

const domain = createDomain('apartmentSealService');

const ApartmentGate = createGate<{ id?: number }>();

const handleUpdateApartment =
  domain.createEvent<UpdateApartmentRequestPayload>();
const updateApartmentFx = domain.createEffect<
  UpdateApartmentRequestPayload,
  ApartmentResponse,
  EffectFailDataAxiosError
>(putApartment);

const handleSearchApartment = domain.createEvent<GetApartmentsRequestPayload>();

const $apartment = domain
  .createStore<ApartmentResponse | null>(null)
  .on(
    [getApartmentQuery.$data, updateApartmentFx.doneData],
    (_, apartment) => apartment,
  )
  .reset(ApartmentGate.close);

const refetchAppointment = domain.createEvent();
const fetchAppointmentFx = domain.createEffect<number, AppointmentResponse[]>(
  getNearestAppointmentForApartment,
);
const $apartmentAppointment = domain
  .createStore<AppointmentResponse | null>(null)
  .on(fetchAppointmentFx.doneData, (_, appointments) => appointments[0] || null)
  .reset(ApartmentGate.close);

const handleApartmentLoaded = getApartmentQuery.finished.success;
const $isApartmentLoading = getApartmentQuery.$pending;
const $isSealAppointmentLoading = fetchAppointmentFx.pending;

const setSelectedHomeownerName = domain.createEvent<string>();
const $selectedHomeownerName = domain
  .createStore<string | null>(null)
  .on(setSelectedHomeownerName, (_, name) => name);

const getIndividualDevicesFx = domain.createEffect(getIndividualDevices);
const $individualDevices = domain
  .createStore<IndividualDeviceListItemResponse[]>([])
  .on(getIndividualDevicesFx.doneData, (_, data) => data?.items || []);

sample({
  source: $apartment,
  filter: (apartment) => Boolean(apartment?.id),
  fn: (apartment) => apartment?.id,
  target: getIndividualDevicesFx,
});

sample({
  source: ApartmentGate.state.map(({ id }) => ({ ApartmentId: id })),
  clock: [
    sample({
      source: $apartment,
      clock: ApartmentGate.state,
      filter: (apartment, { id }) => Boolean(id && id !== apartment?.id),
    }),
  ],
  target: getApartmentIdQuery.start,
});

sample({
  clock: handleSearchApartment,
  target: getApartmentIdQuery.start,
});

sample({
  source: $apartment,
  clock: [$apartment, refetchAppointment],
  fn: (apartment) => apartment.id,
  filter: Boolean,
  target: fetchAppointmentFx,
});

sample({
  clock: ApartmentGate.close,
  target: [getApartmentQuery.reset, getApartmentIdQuery.reset],
});

sample({
  clock: handleUpdateApartment,
  target: updateApartmentFx,
});

// getApartmentQuery.finished.failure.watch(({ error }) => {
//   return message.error(
//     error.response.data.error.Text ||
//       error.response.data.error.Message ||
//       'Произошла ошибка',
//   );
// });

updateApartmentFx.doneData.watch(() => message.success('Сохранено успешно!'));

export const apartmentSealService = {
  inputs: {
    handleApartmentLoaded,
    handleSearchApartment,
    setSelectedHomeownerName,
    handleUpdateApartment,
    refetchAppointment,
  },
  outputs: {
    $isApartmentLoading,
    $apartment,
    $selectedHomeownerName,
    $individualDevices,
    $apartmentAppointment,
    $isSealAppointmentLoading,
  },
  gates: { ApartmentGate },
};
