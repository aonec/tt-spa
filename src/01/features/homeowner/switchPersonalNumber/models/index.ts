import { RequestStatusShared } from '01/features/readings/displayReadingHistory/hooks/useReadingValues';
import { createEffect, createStore, createEvent } from 'effector';
import { HomeownerAccountReplaceRequest } from '../../api/types';

export const switchPersonalNumberFx = createEffect<
  HomeownerAccountReplaceRequest,
  void
>();

export const $switchRequestStatus = createStore<RequestStatusShared>(null);

export const setSwitchRequestStatus = createEvent<RequestStatusShared>();

export const switchPersonalNumber = createEvent();
