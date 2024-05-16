import { createEffect, createEvent, createStore } from 'effector';
import { message } from 'antd';
import { sample } from 'effector';
import { createGate } from 'effector-react';
import { ApartmentResponse } from 'api/types';
import { PutApartment, TabsSection } from './editApartmentProfileService.types';
import { getApartment, putApartment } from './editApartmentProfileService.api';
import { EffectFailDataAxiosError } from 'types';
import { EditCommonDataForm } from './view/EditApartmentPage/EditCommonDataForm/EditCommonDataForm.types';

const fetchApartmentFx = createEffect<number, ApartmentResponse>(getApartment);

const refetchAaprtment = createEvent();

const handleEditCommonData = createEvent<EditCommonDataForm>();

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

const $commonDataInitialValues = $apartment.map<EditCommonDataForm>(
  (apartment) => ({
    Square: apartment?.square || null,
    NumberOfLiving: apartment?.numberOfLiving || null,
    NormativeNumberOfLiving: apartment?.normativeNumberOfLiving || null,
    ColdWaterRiserCount: apartment?.coldWaterRiserCount || null,
    HotWaterRiserCount: apartment?.hotWaterRiserCount || null,
  }),
);

const $apartmentId = ApartmentGate.state.map(
  ({ apartmentId }) => apartmentId || null,
);

sample({
  source: $apartmentId,
  clock: ApartmentGate.open,
  filter: Boolean,
  target: fetchApartmentFx,
});

sample({
  clock: refetchAaprtment,
  source: $apartmentId,
  filter: Boolean,
  target: fetchApartmentFx,
});

sample({
  source: $apartment,
  filter: Boolean,
  clock: handleEditCommonData,
  fn: (apartment, values) => ({
    ApartmentId: apartment.id,
    Square: values.Square || undefined,
    NumberOfLiving: values.NumberOfLiving || undefined,
    ColdWaterRiserCount: values.ColdWaterRiserCount || undefined,
    HotWaterRiserCount: values.HotWaterRiserCount || undefined,
    NormativeNumberOfLiving: values.NormativeNumberOfLiving || undefined,
  }),
  target: updateApartmentFx,
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
    handleEditCommonData,
  },
  outputs: {
    $apartment,
    $isLoading,
    $tabSection,
    $isUpdatingApartmentLoading,
    $commonDataInitialValues,
  },
  gates: { ApartmentGate },
};
