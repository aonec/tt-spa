import { createDomain, forward, guard, sample } from 'effector';
import { createGate } from 'effector-react';
import { ApartmentResponse } from 'myApi';
import { SearchMode } from './view/ApartmentsReadings/ApartmentsReadings.types';
import {
  GetApartmentsRequestPayload,
  UpdateApartmentRequestPayload,
} from './ApartmentReadingsService.types';
import { getApartment, putApartment } from './ApartmentReadingsService.api';
import { message } from 'antd';
import {
  pauseApartmentButtonClicked,
  cancelPauseApartmentButtonClicked,
  pauseApartmentStatusFx,
} from '01/features/apartments/pauseApartment/models';
import { openEditPersonalNumberTypeModal } from '01/features/homeowner/editPersonalNumber/models';
import { EffectFailDataAxiosError } from 'types';

const domain = createDomain('apartmentReadingsService');

const setSearchMode = domain.createEvent<SearchMode>();

const handleSearchApartment = domain.createEvent<GetApartmentsRequestPayload>();

const handleUpdateApartment =
  domain.createEvent<UpdateApartmentRequestPayload>();

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
    pauseApartmentStatusFx.doneData,
  ],
  target: fetchApartmentFx,
});

forward({
  from: handleUpdateApartment,
  to: updateApartmentFx,
});

updateApartmentFx.doneData.watch(() => message.success('Сохранено успешно!'));

const $isLoadingApartment = fetchApartmentFx.pending;

const handleApartmentLoaded = fetchApartmentFx.doneData;

fetchApartmentFx.failData.watch((error) => {
  if (error.response.status === 403) {
    return message.error(
      'У вашего аккаунта нет доступа к выбранному действию. Уточните свои права у Администратора',
    );
  }
  return message.error(
    error.response.data.error.Text ||
      error.response.data.error.Message ||
      'Произошла ошибка',
  );
});

updateApartmentFx.failData.watch((error) => {
  if (error.response.status === 403) {
    return message.error(
      'У вашего аккаунта нет доступа к выбранному действию. Уточните свои права у Администратора',
    );
  }
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
    handlePauseApartment: pauseApartmentButtonClicked,
    handleCancelPauseApartment: cancelPauseApartmentButtonClicked,
    openEditPersonalNumberModal: openEditPersonalNumberTypeModal,
    handleApartmentLoaded,
    setSelectedHomeownerName,
  },
  outputs: {
    $searchMode,
    $apartment,
    $isLoadingApartment,
    $selectedHomeownerName,
  },
  gates: { ApartmentGate },
};
