import { createEffect, createEvent, createStore } from 'effector';
import { sample } from 'effector';
import { createGate } from 'effector-react';
import {
  ApartmentResponse,
  AppointmentResponse,
  HomeownerAccountResponse,
} from 'api/types';
import { SearchMode } from './view/ApartmentsReadings/ApartmentsReadings.types';
import {
  EditPhoneNumberRequest,
  GetApartmentsRequestPayload,
  RemovePhoneNumberRequest,
  UpdateApartmentRequestPayload,
  UpdateHomeownerRequestPayload,
} from './ApartmentReadingsService.types';
import {
  addPhoneNumberRequest,
  getApartmentQuery,
  getNearestAppointmentForApartment,
  patchHomeowner,
  putApartment,
  removePhoneNumberRequest,
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

const removePhoneNumber = createEvent<RemovePhoneNumberRequest>();

const addPhoneNumber = createEvent<EditPhoneNumberRequest>();

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

const removePhoneNumberFx = createEffect<
  RemovePhoneNumberRequest,
  string[],
  EffectFailDataAxiosError
>(removePhoneNumberRequest);

const addPhoneNumberFx = createEffect<
  EditPhoneNumberRequest,
  string[],
  EffectFailDataAxiosError
>(addPhoneNumberRequest);

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
          name: updatedHomeowner.name,
        };
      },
    );

    return { ...prevApartment, homeownerAccounts: changedHomeowners || null };
  })
  .on(
    [removePhoneNumberFx.done, addPhoneNumberFx.done],
    (apartment, { params, result: phoneNumbers }) => {
      if (!apartment) {
        return null;
      }
      const changedHomeowners = (apartment.homeownerAccounts || []).map(
        (homeowner) => {
          if (homeowner.id !== params.id) {
            return homeowner;
          }
          return {
            ...homeowner,
            phoneNumbers,
          };
        },
      );
      return { ...apartment, homeownerAccounts: changedHomeowners };
    },
  )
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
  clock: removePhoneNumber,
  target: removePhoneNumberFx,
});

sample({
  clock: addPhoneNumber,
  target: addPhoneNumberFx,
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

sample({
  clock: handleUpdateApartment,
  target: updateApartmentFx,
});

updateApartmentFx.doneData.watch(() => message.success('Сохранено успешно!'));

updateHomeownerFx.doneData.watch(() => message.success('Сохранено успешно!'));

removePhoneNumberFx.doneData.watch(() =>
  message.success('Номер успешно удалён!'),
);

addPhoneNumberFx.done.watch(({ params }) => {
  if (params.oldPhoneNumber) {
    return message.success('Номер успешно изменён!');
  }
  return message.success('Номер успешно добавлен!');
});

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

removePhoneNumberFx.failData.watch((error) => {
  return message.error(
    error.response.data.error.Text ||
      error.response.data.error.Message ||
      'Произошла ошибка',
  );
});

addPhoneNumberFx.failData.watch((error) => {
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
    removePhoneNumber,
    addPhoneNumber,
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
