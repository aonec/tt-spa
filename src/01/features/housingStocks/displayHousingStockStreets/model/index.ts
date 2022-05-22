import { GetExistingSteetRequestParams } from '01/_api/existingStreets';
import { createEffect, createStore } from 'effector';
import { createGate } from 'effector-react';

export const $existingStreets = createStore<string[]>([]);

export const fetchExistingStreets = createEffect<
  GetExistingSteetRequestParams,
  string[]
>();

export const ExistingStreetsGate = createGate<GetExistingSteetRequestParams>();
