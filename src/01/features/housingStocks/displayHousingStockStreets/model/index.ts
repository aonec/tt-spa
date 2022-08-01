import { createEffect, createStore } from 'effector';
import { createGate } from 'effector-react';
import { GetExistingSteetRequestParams } from '../../../../_api/existingStreets';

export const $existingStreets = createStore<string[]>([]);

export const fetchExistingStreets = createEffect<
  GetExistingSteetRequestParams,
  string[]
>();

export const ExistingStreetsGate = createGate<GetExistingSteetRequestParams>();
