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
export const handleConfirmationModalClose = createEvent();
export const onForced = createEvent();

export const $addPersonalNumberRequestStatus =
  createStore<RequestStatusShared>(null);

export const $samePersonalAccountNumderId = createStore<number | null>(null);
export const $isConfirmationModalOpen =
  $samePersonalAccountNumderId.map(Boolean);
export const $isForced = createStore<boolean>(false);

export const setAddPersonalNumberStatus = createEvent<RequestStatusShared>();
