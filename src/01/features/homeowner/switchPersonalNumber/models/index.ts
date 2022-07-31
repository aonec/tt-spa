import { createEffect, createStore, createEvent } from 'effector';
import { HomeownerAccountReplaceRequest } from '../../../../../api/types';
import { RequestStatusShared } from '../../../readings/displayReadingHistory/hooks/useReadingValues';

export const switchPersonalNumberFx = createEffect<
  HomeownerAccountReplaceRequest,
  void
>();

export const $switchRequestStatus = createStore<RequestStatusShared>(null);

export const setSwitchRequestStatus = createEvent<RequestStatusShared>();

export const switchPersonalNumber = createEvent();
