import { createGate } from 'effector-react';
import { EActTypeStringDictionaryItem } from './../../../../../myApi';
import { createStore, createEffect } from 'effector';

export const $actTypes = createStore<EActTypeStringDictionaryItem[] | null>(
  null,
);

export const fetchActTypesFx = createEffect<
  void,
  EActTypeStringDictionaryItem[] | null
>();

export const ApartmentActTypesGate = createGate();
