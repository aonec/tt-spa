import { createGate } from 'effector-react';
import { MayBe } from './../../displayActsJournal/models/index';
import { EActTypeStringDictionaryItem } from './../../../../../myApi';
import { createStore, createEffect } from 'effector';

export const $actTypes = createStore<MayBe<EActTypeStringDictionaryItem[]>>(
  null
);

export const fetchActTypesFx = createEffect<
  void,
  MayBe<EActTypeStringDictionaryItem[]>
>();

export const ApartmentActTypesGate = createGate();
