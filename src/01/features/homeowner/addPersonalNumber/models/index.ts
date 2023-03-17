import { RequestStatusShared } from './../../../readings/displayReadingHistory/hooks/useReadingValues';
import { createEffect, createEvent, createStore } from 'effector';
import { HomeownerAccountCreateRequest } from 'myApi';
import { EffectFailDataAxiosErrorDataApartmentId } from 'types';

export const addPersonalNumberFx = createEffect<
  HomeownerAccountCreateRequest,
  void,
  EffectFailDataAxiosErrorDataApartmentId
>();

export const addPersonalNmberSaveButtonClicked = createEvent();
export const handleAddPersonalNumber = createEvent();
export const handleConfirmationModalClose = createEvent();
export const onForced = createEvent();

export const $addPersonalNumberRequestStatus =
  createStore<RequestStatusShared>(null);

export const $samePersonalAccountNumderId = createStore<number | null>(null)
  .on(addPersonalNumberFx.failData, (prev, errData) => {
    if (errData.response.status === 409) {
      return errData.response.data.error.Data.ApartmentId;
    }
    return prev;
  })
  .reset(handleConfirmationModalClose);

export const $isConfirmationModalOpen =
  $samePersonalAccountNumderId.map(Boolean);

export const $isForced = createStore<boolean>(false)
  .on(onForced, () => true)
  .reset(handleConfirmationModalClose);

export const setAddPersonalNumberStatus = createEvent<RequestStatusShared>();
