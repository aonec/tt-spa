import { createGate } from 'effector-react';
import { createEffect, createStore } from 'effector';
import { HomeownerAccountResponse } from 'myApi';

export const $homeowner = createStore<HomeownerAccountResponse | null>(null);

export const fetchHomeownerFx = createEffect<
  string,
  HomeownerAccountResponse
>();

export const HomeownerGate = createGate<{ id: string }>();
