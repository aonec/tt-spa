import { RequestStatusShared } from './../../../readings/displayReadingHistory/hooks/useReadingValues';
import { createEffect, createEvent, createStore } from 'effector';
import { HomeownerAccountCreateRequest } from 'myApi';

export const addPersonalNumberFx = createEffect<
  HomeownerAccountCreateRequest,
  void
>();

export const addPersonalNmberSaveButtonClicked = createEvent();

export const $addPersonalNumberRequestStatus = createStore<RequestStatusShared>(
  null
);

export const setAddPersonalNumberStatus = createEvent<RequestStatusShared>();
