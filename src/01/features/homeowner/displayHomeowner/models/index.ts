import { createGate } from 'effector-react';
import { createEffect, createStore, createEvent } from 'effector';
import { HomeownerAccountResponse } from 'myApi';

export const $homeowner = createStore<HomeownerAccountResponse | null>(null);

export const fetchHomeownerFx = createEffect<
  string,
  HomeownerAccountResponse
>();

export const HomeownerGate = createGate<{ id: string }>();

export const setCurrentPersonalNumberId = createEvent<string>();
export const $currentPersonalNumberId = createStore<string>('').on(
  setCurrentPersonalNumberId,
  (_, id) => id
);
