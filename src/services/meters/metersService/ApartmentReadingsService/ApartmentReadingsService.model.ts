import { createDomain, forward, guard, sample } from 'effector';
import { createGate } from 'effector-react';
import {
  ApartmentResponse,
  HomeownerAccountResponse,
  HomeownerAccountUpdateRequest,
} from 'myApi';
import { SearchMode } from './view/ApartmentsReadings/ApartmentsReadings.types';
import {
  GetApartmentsRequestPayload,
  UpdateApartmentRequestPayload,
} from './ApartmentReadingsService.types';
import {
  getApartment,
  patchOwner,
  putApartment,
} from './ApartmentReadingsService.api';
import { message } from 'antd';
import { EffectFailDataAxiosError } from 'types';
import { individualDeviceMountPlacesService } from 'services/devices/individualDeviceMountPlacesService/individualDeviceMountPlacesService.model';
import { selectPersonalNumberActionService } from 'services/homeowner/personalNumber/selectPersonalNumberActionService';
import { pauseApartmentService } from 'services/apartments/pauseApartmentService/pauseApartmentService.models';
import { printApartmentDevicesCertificateService } from 'services/apartments/printApartmentDevicesCertificateService/printApartmentDevicesCertificateService.models';

const domain = createDomain('apartmentReadingsService');

const setSearchMode = domain.createEvent<SearchMode>();

const handleSearchApartment = domain.createEvent<GetApartmentsRequestPayload>();

const handleUpdateApartment =
  domain.createEvent<UpdateApartmentRequestPayload>();

const handleUpdatePhoneNumber = domain.createEvent<{
  id: string;
  data: HomeownerAccountUpdateRequest;
}>();

const setSelectedHomeownerName = domain.createEvent<string>();

const ApartmentGate = createGate<{ id?: number }>();

const fetchApartmentFx = domain.createEffect<
  GetApartmentsRequestPayload,
  ApartmentResponse | null,
  EffectFailDataAxiosError
>(getApartment);

const updateApartmentFx = domain.createEffect<
  UpdateApartmentRequestPayload,
  ApartmentResponse,
  EffectFailDataAxiosError
>(putApartment);

const updateHomeownerFx = domain.createEffect<
  { id: string; data: HomeownerAccountUpdateRequest },
  HomeownerAccountResponse,
  EffectFailDataAxiosError
>(patchOwner);

const $apartment = domain
  .createStore<ApartmentResponse | null>(null)
  .on(
    [fetchApartmentFx.doneData, updateApartmentFx.doneData],
    (_, apartment) => apartment,
  )
  .reset(ApartmentGate.close);

const $searchMode = domain
  .createStore(SearchMode.Apartment)
  .on(setSearchMode, (_, mode) => mode);

const $selectedHomeownerName = domain
  .createStore<string | null>(null)
  .on(setSelectedHomeownerName, (_, name) => name);

sample({
  clock: handleUpdatePhoneNumber,
  target: updateHomeownerFx,
});

forward({
  from: handleSearchApartment,
  to: fetchApartmentFx,
});

sample({
  source: ApartmentGate.state.map(({ id }) => ({ ApartmentId: id })),
  clock: [
    guard({
      source: $apartment,
      clock: ApartmentGate.state,
      filter: (apartment, { id }) => Boolean(id && id !== apartment?.id),
    }),
    pauseApartmentService.inputs.pauseApartmentStatusFx.doneData,
  ],
  target: fetchApartmentFx,
});

forward({
  from: handleUpdateApartment,
  to: updateApartmentFx,
});

updateApartmentFx.doneData.watch(() => message.success('Сохранено успешно!'));

updateHomeownerFx.doneData.watch(() => message.success('Сохранено успешно!'));

const $isLoadingApartment = fetchApartmentFx.pending;

const handleApartmentLoaded = fetchApartmentFx.doneData;

fetchApartmentFx.failData.watch((error) => {
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

const $isUpdateHomeownerLoading = updateHomeownerFx.pending;
const handleHomeownerUpdated = updateHomeownerFx.doneData;

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
    handleUpdatePhoneNumber,
    handleHomeownerUpdated,
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
  },
  gates: { ApartmentGate },
};
