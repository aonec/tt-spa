import { createEffect, createEvent, createStore } from 'effector';
import { message } from 'antd';
import { ApartmentResponse } from 'api/types';
import { sample } from 'effector';
import { createGate } from 'effector-react';
import { PutApartment, TabsSection } from './editApartmentProfileService.types';
import { getApartment, putApartment } from './editApartmentProfileService.api';
import { EffectFailDataAxiosError } from 'types';
import { createForm } from 'effector-forms';

const fetchApartmentFx = createEffect<number, ApartmentResponse>(getApartment);

const refetchAaprtment = createEvent();

const updateApartmentFx = createEffect<
  PutApartment,
  ApartmentResponse,
  EffectFailDataAxiosError
>(putApartment);

const ApartmentGate = createGate<{ apartmentId: number }>();

const $apartment = createStore<ApartmentResponse | null>(null)
  .on(
    [fetchApartmentFx.doneData, updateApartmentFx.doneData],
    (_, apartment) => apartment,
  )
  .reset(ApartmentGate.close);

const editApartmentCommonInfoForm = createForm({
  fields: {
    Square: { init: null as string | null },
    NumberOfLiving: { init: null as string | null },
    NormativeNumberOfLiving: { init: null as string | null },
    ColdWaterRiserCount: { init: null as string | null },
    HotWaterRiserCount: { init: null as string | null },
  },
  validateOn: ['submit'],
});

sample({
  clock: ApartmentGate.open.map(({ apartmentId }) => apartmentId),
  target: fetchApartmentFx,
});

sample({
  source: ApartmentGate.state.map(({ apartmentId }) => apartmentId),
  clock: refetchAaprtment,
  target: fetchApartmentFx,
});

sample({
  clock: $apartment,
  filter: Boolean,
  fn: (apartment) => ({
    Square: apartment.square ? String(apartment.square) : null,
    NumberOfLiving: apartment.numberOfLiving
      ? String(apartment.numberOfLiving)
      : null,
    NormativeNumberOfLiving: apartment.normativeNumberOfLiving
      ? String(apartment.normativeNumberOfLiving)
      : null,
    ColdWaterRiserCount: apartment.coldWaterRiserCount
      ? String(apartment.coldWaterRiserCount)
      : null,
    HotWaterRiserCount: apartment.hotWaterRiserCount
      ? String(apartment.hotWaterRiserCount)
      : null,
  }),
  target: editApartmentCommonInfoForm.setInitialForm,
});

sample({
  source: $apartment,
  filter: Boolean,
  clock: editApartmentCommonInfoForm.formValidated,
  fn: (apartment, values) => ({
    ApartmentId: apartment.id,
    Square: Number(values.Square) || undefined,
    NumberOfLiving: Number(values.NumberOfLiving) || undefined,
    ColdWaterRiserCount: Number(values.ColdWaterRiserCount) || undefined,
    HotWaterRiserCount: Number(values.HotWaterRiserCount) || undefined,
    NormativeNumberOfLiving:
      Number(values.NormativeNumberOfLiving) || undefined,
  }),
  target: updateApartmentFx,
});

sample({
  clock: ApartmentGate.close,
  target: editApartmentCommonInfoForm.reset,
});

const $isLoading = fetchApartmentFx.pending;

const $isUpdatingApartmentLoading = updateApartmentFx.pending;

const setTabSection = createEvent<TabsSection>();

const $tabSection = createStore<TabsSection>(TabsSection.CommonData)
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
  forms: { editApartmentCommonInfoForm },
};
