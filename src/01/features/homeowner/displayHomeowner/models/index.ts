import { createGate } from 'effector-react';
import { createEffect, createStore, createEvent } from 'effector';
import { HomeownerAccountResponse } from 'myApi';

export const $homeowner = createStore<HomeownerAccountResponse | null>(null);

export const fetchHomeowner = createEffect<string, HomeownerAccountResponse>();

export const HomeownerGate = createGate<{ id: string }>();

export const $currentPersonalNumberIndex = createStore(0);

export const setCurrentPersonalNumberIndex = createEvent<number>();
