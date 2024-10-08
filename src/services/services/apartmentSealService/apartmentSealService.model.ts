import { createEffect, createEvent, createStore } from 'effector';
import { sample } from 'effector';
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
  existingDistrictsQuery,
  getApartmentQuery,
  getIndividualDevices,
  getNearestAppointmentForApartment,
} from './apartmentSealService.api';

const ApartmentGate = createGate<{ id?: number }>();

const handleUpdateApartment = createEvent<UpdateApartmentRequestPayload>();
const updateApartmentFx = createEffect<
  UpdateApartmentRequestPayload,
  ApartmentResponse,
  EffectFailDataAxiosError
>(putApartment);

const handleSearchApartment = createEvent<GetApartmentsRequestPayload>();

const $apartment = createStore<ApartmentResponse | null>(null)
  .on(
    [getApartmentQuery.$data, updateApartmentFx.doneData],
    (_, apartment) => apartment,
  )
  .reset(ApartmentGate.close);

const refetchAppointment = createEvent();
const fetchAppointmentFx = createEffect<number, AppointmentResponse[]>(
  getNearestAppointmentForApartment,
);
const $apartmentAppointment = createStore<AppointmentResponse | null>(null)
  .on(fetchAppointmentFx.doneData, (_, appointments) => appointments[0] || null)
  .reset(ApartmentGate.close);

const handleApartmentLoaded = getApartmentQuery.finished.success;
const $isApartmentLoading = getApartmentQuery.$pending;
const $isSealAppointmentLoading = fetchAppointmentFx.pending;

const setSelectedHomeownerName = createEvent<string | null>();
const $selectedHomeownerName = createStore<string | null>(null).on(
  setSelectedHomeownerName,
  (_, name) => name,
);

const getIndividualDevicesFx = createEffect(getIndividualDevices);
const $individualDevices = createStore<IndividualDeviceListItemResponse[]>(
  [],
).on(getIndividualDevicesFx.doneData, (_, data) => data?.items || []);

sample({
  source: $apartment,
  filter: (apartment) => Boolean(apartment?.id),
  fn: (apartment) => apartment?.id,
  target: getIndividualDevicesFx,
});

sample({
  source: ApartmentGate.state.map(({ id }) => ({ ApartmentId: id })),
  clock: sample({
    source: $apartment,
    clock: ApartmentGate.state,
    filter: (apartment, { id }) => Boolean(id && id !== apartment?.id),
  }),
  target: getApartmentQuery.start,
});

sample({
  clock: handleSearchApartment,
  target: getApartmentQuery.start,
});

sample({
  source: $apartment,
  clock: sample({
    source: ApartmentGate.open,
    clock: [$apartment, refetchAppointment],
    filter: Boolean,
  }),
  fn: (apartment) => apartment.id,
  filter: Boolean,
  target: fetchAppointmentFx,
});

sample({
  clock: ApartmentGate.close,
  target: getApartmentQuery.reset,
});

sample({
  clock: handleUpdateApartment,
  target: updateApartmentFx,
});

getApartmentQuery.finished.failure.watch(({ error }) => {
  return message.error(
    error.response.data.error.Text ||
      error.response.data.error.Message ||
      'Произошла ошибка',
  );
});

sample({
  clock: ApartmentGate.open,
  target: existingDistrictsQuery.start,
});

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
