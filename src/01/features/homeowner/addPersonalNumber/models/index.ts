import { RequestStatusShared } from './../../../readings/displayReadingHistory/hooks/useReadingValues';
import { createEffect, createEvent, createStore } from 'effector';
import { HomeownerAccountCreateServiceModel } from 'myApi';

export const addPersonalNumberFx = createEffect<
  HomeownerAccountCreateServiceModel,
  void
>();

export const addPersonalNmberSaveButtonClicked = createEvent();

export const $addPersonalNumberRequestStatus = createStore<RequestStatusShared>(
  null
);

export const setAddPersonalNumberStatus = createEvent<RequestStatusShared>();
