import { createStore, createEffect } from 'effector';
import { createGate } from 'effector-react';

export const $existingCities = createStore<string[] | null>(null);

export const fetchExistingCities = createEffect<void, string[] | null>();

export const ExistingCitiesGate = createGate();
