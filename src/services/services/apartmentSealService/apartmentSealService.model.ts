import { createDomain, forward, sample } from 'effector';
import {
  ApartmentResponse,
  AppointmentResponse,
  IndividualDeviceListItemResponse,
} from 'myApi';
import { EffectFailDataAxiosError } from 'types';
import { message } from 'antd';
import { createGate } from 'effector-react';
import {
  getApartment,
  putApartment,
} from 'services/meters/metersService/ApartmentReadingsService/ApartmentReadingsService.api';
import {
  GetApartmentsRequestPayload,
  UpdateApartmentRequestPayload,
} from 'services/meters/metersService/ApartmentReadingsService/ApartmentReadingsService.types';
import {
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
const fetchApartmentFx = domain.createEffect<
  GetApartmentsRequestPayload,
  ApartmentResponse | null,
  EffectFailDataAxiosError
>(getApartment);

const $apartment = domain
  .createStore<ApartmentResponse | null>(null)
  .on(
    [fetchApartmentFx.doneData, updateApartmentFx.doneData],
    (_, apartment) => apartment,
  )
  .reset(ApartmentGate.close);

const fetchAppointmentFx = domain.createEffect<number, AppointmentResponse[]>(
  getNearestAppointmentForApartment,
);
const $apartmentAppointment = domain
  .createStore<AppointmentResponse | null>(null)
  .on(fetchAppointmentFx.doneData, (_, appointments) => appointments[0]);

const handleApartmentLoaded = fetchApartmentFx.doneData;
const $isApartmentLoading = fetchApartmentFx.pending;

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
  target: fetchApartmentFx,
});

forward({
  from: handleSearchApartment,
  to: fetchApartmentFx,
});

sample({
  clock: $apartment,
  fn: (apartment) => apartment.id,
  filter: Boolean,
  target: fetchAppointmentFx,
});

forward({
  from: handleUpdateApartment,
  to: updateApartmentFx,
});

fetchApartmentFx.failData.watch((error) => {
  return message.error(
    error.response.data.error.Text ||
      error.response.data.error.Message ||
      'Произошла ошибка',
  );
});

updateApartmentFx.doneData.watch(() => message.success('Сохранено успешно!'));

export const apartmentSealService = {
  inputs: {
    handleApartmentLoaded,
    handleSearchApartment,
    setSelectedHomeownerName,
    handleUpdateApartment,
  },
  outputs: {
    $isApartmentLoading,
    $apartment,
    $selectedHomeownerName,
    $individualDevices,
    $apartmentAppointment,
  },
  gates: { ApartmentGate },
};
