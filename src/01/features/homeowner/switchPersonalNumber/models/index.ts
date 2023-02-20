import { RequestStatusShared } from '01/features/readings/displayReadingHistory/hooks/useReadingValues';
import { createEffect, createStore, createEvent } from 'effector';
import { HomeownerAccountReplaceRequest } from 'myApi';
import { EffectFailDataAxiosErrorDataApartmentId } from 'types';

export const switchPersonalNumberFx = createEffect<
  HomeownerAccountReplaceRequest,
  void,
  EffectFailDataAxiosErrorDataApartmentId
>();

export const $switchRequestStatus = createStore<RequestStatusShared>(null);

export const setSwitchRequestStatus = createEvent<RequestStatusShared>();

export const switchPersonalNumber = createEvent();

export const handleConfirmationModalClose = createEvent();
export const onForced = createEvent();
export const handleSwitchPersonalNumber = createEvent();

export const $samePersonalAccountNumderId = createStore<number | null>(null);
export const $isConfirmationModalOpen =
  $samePersonalAccountNumderId.map(Boolean);
export const $isForced = createStore<boolean>(false);
