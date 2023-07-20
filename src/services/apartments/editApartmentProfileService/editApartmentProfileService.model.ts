import { message } from 'antd';
import { ApartmentResponse } from 'api/myApi';
import { createDomain, forward, sample } from 'effector';
import { createGate } from 'effector-react';
import { PutApartment, TabsSection } from './editApartmentProfileService.types';
import { getApartment, putApartment } from './editApartmentProfileService.api';
import { EffectFailDataAxiosError } from 'types';

const domain = createDomain('editApartmentProfileService');

const handleUpdateApartment = domain.createEvent<PutApartment>();

const fetchApartmentFx = domain.createEffect<number, ApartmentResponse>(
  getApartment,
);

const refetchAaprtment = domain.createEvent();

const updateApartmentFx = domain.createEffect<
  PutApartment,
  ApartmentResponse,
  EffectFailDataAxiosError
>(putApartment);

const ApartmentGate = createGate<{ apartmentId: number }>();

const $apartment = domain
  .createStore<ApartmentResponse | null>(null)
  .on(
    [fetchApartmentFx.doneData, updateApartmentFx.doneData],
    (_, apartment) => apartment,
  )
  .reset(ApartmentGate.close);

forward({
  from: ApartmentGate.open.map(({ apartmentId }) => apartmentId),
  to: fetchApartmentFx,
});

sample({
  source: ApartmentGate.state.map(({ apartmentId }) => apartmentId),
  clock: refetchAaprtment,
  target: fetchApartmentFx,
});

forward({
  from: handleUpdateApartment,
  to: updateApartmentFx,
});

const $isLoading = fetchApartmentFx.pending;

const $isUpdatingApartmentLoading = updateApartmentFx.pending;

const setTabSection = domain.createEvent<TabsSection>();

const $tabSection = domain
  .createStore<TabsSection>(TabsSection.CommonData)
  .on(setTabSection, (_, tab) => tab)
  .reset(ApartmentGate.close);

const updateApartmentSuccess = updateApartmentFx.doneData;

updateApartmentSuccess.watch(() => message.success('Данные обновлены'));

updateApartmentFx.failData.watch((e) =>
  message.error(e.response.data.error.Text),
);

export const editApartmentProfileService = {
  inputs: {
    setTabSection,
    handleUpdateApartment,
    refetchAaprtment,
    updateApartmentSuccess,
  },
  outputs: {
    $apartment,
    $isLoading,
    $tabSection,
    $isUpdatingApartmentLoading,
  },
  gates: { ApartmentGate },
};
