import { createEffect, createEvent, createStore } from 'effector';
import { forward, sample } from 'effector';
import { createGate } from 'effector-react';
import {
  ApartmentResponse,
  AppointmentResponse,
  HomeownerAccountResponse,
} from 'api/types';
import { SearchMode } from './view/ApartmentsReadings/ApartmentsReadings.types';
import {
  GetApartmentsRequestPayload,
  UpdateApartmentRequestPayload,
  UpdateHomeownerRequestPayload,
} from './ApartmentReadingsService.types';
import {
  getApartmentQuery,
  getNearestAppointmentForApartment,
  patchHomeowner,
  putApartment,
} from './ApartmentReadingsService.api';
import { message } from 'antd';
import { EffectFailDataAxiosError } from 'types';
import { individualDeviceMountPlacesService } from 'services/devices/individualDeviceMountPlacesService/individualDeviceMountPlacesService.model';
import { selectPersonalNumberActionService } from 'services/homeowner/personalNumber/selectPersonalNumberActionService';
import { pauseApartmentService } from 'services/apartments/pauseApartmentService/pauseApartmentService.models';
import { printApartmentDevicesCertificateService } from 'services/apartments/printApartmentDevicesCertificateService/printApartmentDevicesCertificateService.models';
import { and } from 'patronum';

const setSearchMode = createEvent<SearchMode>();

const handleSearchApartment = createEvent<GetApartmentsRequestPayload>();

const handleUpdateApartment = createEvent<UpdateApartmentRequestPayload>();

const handleUpdateHomeowner = createEvent<UpdateHomeownerRequestPayload>();

const setSelectedHomeownerName = createEvent<string | null>();

const ApartmentGate = createGate<{ id?: number }>();

const updateApartmentFx = createEffect<
  UpdateApartmentRequestPayload,
  ApartmentResponse,
  EffectFailDataAxiosError
>(putApartment);

const updateHomeownerFx = createEffect<
  UpdateHomeownerRequestPayload,
  HomeownerAccountResponse,
  EffectFailDataAxiosError
>(patchHomeowner);

const handleHomeownerUpdated = updateHomeownerFx.doneData;

const $apartment = createStore<ApartmentResponse | null>(null)
  .on(
    [getApartmentQuery.$data, updateApartmentFx.doneData],
    (_, apartment) => apartment,
  )
  .on(handleHomeownerUpdated, (prevApartment, updatedHomeowner) => {
    if (!prevApartment) return null;

    const changedHomeowners = prevApartment.homeownerAccounts?.map(
      (homeowner) => {
        if (homeowner.id !== updatedHomeowner.id) {
          return homeowner;
        }
        return {
          ...homeowner,
          phoneNumber: updatedHomeowner.phoneNumber,
          name: updatedHomeowner.name,
        };
      },
    );

    return { ...prevApartment, homeownerAccounts: changedHomeowners || null };
  })
  .reset(ApartmentGate.close);

const $searchMode = createStore(SearchMode.Apartment).on(
  setSearchMode,
  (_, mode) => mode,
);

const $selectedHomeownerName = createStore<string | null>(null).on(
  setSelectedHomeownerName,
  (_, name) => name,
);

const fetchAppointmentFx = createEffect<number, AppointmentResponse[]>(
  getNearestAppointmentForApartment,
);
const $apartmentAppointment = createStore<AppointmentResponse | null>(null)
  .on(fetchAppointmentFx.doneData, (_, appointments) => appointments[0] || null)
  .reset(ApartmentGate.close);

const $isUpdateHomeownerLoading = updateHomeownerFx.pending;

sample({
  source: and(ApartmentGate.status, $apartment),
  filter: Boolean,
  clock: $apartment,
  //Проверка типа идет выше
  fn: (_, apartment) => (apartment as ApartmentResponse).id,
  target: fetchAppointmentFx,
});

sample({
  clock: handleUpdateHomeowner,
  target: updateHomeownerFx,
});

sample({
  clock: handleSearchApartment,
  target: getApartmentQuery.start,
});

sample({
  clock: ApartmentGate.close,
  target: getApartmentQuery.reset,
});

sample({
  source: ApartmentGate.state.map(({ id }) => ({ ApartmentId: id })),
  clock: [
    sample({
      source: $apartment,
      clock: ApartmentGate.state,
      filter: (apartment, { id }) => Boolean(id && id !== apartment?.id),
    }),
    pauseApartmentService.inputs.pauseApartmentStatusFx.doneData,
  ],
  target: getApartmentQuery.start,
});

forward({
  from: handleUpdateApartment,
  to: updateApartmentFx,
});

updateApartmentFx.doneData.watch(() => message.success('Сохранено успешно!'));

updateHomeownerFx.doneData.watch(() => message.success('Сохранено успешно!'));

const $isLoadingApartment = getApartmentQuery.$pending;

const handleApartmentLoaded = getApartmentQuery.finished.success;

getApartmentQuery.finished.failure.watch(({ error }) => {
  return message.error(
    error.response.data.error.Text ||
      error.response.data.error.Message ||
      'Произошла ошибка',
  );
});

updateApartmentFx.failData.watch((error) => {
  return message.error(
    error.response.data.error.Text ||
      error.response.data.error.Message ||
      'Произошла ошибка',
  );
});

updateHomeownerFx.failData.watch((error) => {
  return message.error(
    error.response.data.error.Text ||
      error.response.data.error.Message ||
      'Произошла ошибка',
  );
});

export const apartmentReadingsService = {
  inputs: {
    setSearchMode,
    handleSearchApartment,
    handleUpdateApartment,
    handlePauseApartment:
      pauseApartmentService.inputs.pauseApartmentButtonClicked,
    handleCancelPauseApartment:
      pauseApartmentService.inputs.cancelPauseApartmentButtonClicked,
    openEditPersonalNumberModal:
      selectPersonalNumberActionService.inputs.setSelectActionModalOpen,
    handleApartmentLoaded,
    setSelectedHomeownerName,
    printIssueCertificate:
      printApartmentDevicesCertificateService.inputs
        .printIssueSertificateButtonClicked,
    handleUpdateHomeowner,
  },
  outputs: {
    $searchMode,
    $apartment,
    $isLoadingApartment,
    $selectedHomeownerName,
    $allIndividualDeviceMountPlaces:
      individualDeviceMountPlacesService.outputs
        .$allIndividualDeviceMountPlaces,
    $isUpdateHomeownerLoading,
    $apartmentAppointment,
  },
  gates: { ApartmentGate },
};
