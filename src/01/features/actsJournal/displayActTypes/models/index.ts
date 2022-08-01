import { createGate } from 'effector-react';
import { MayBe } from './../../displayActsJournal/models/index';
import { createStore, createEffect } from 'effector';
import { EActTypeStringDictionaryItem } from '../../../../../api/types';

export const $actTypes = createStore<MayBe<EActTypeStringDictionaryItem[]>>(
  null
);

export const fetchActTypesFx = createEffect<
  void,
  MayBe<EActTypeStringDictionaryItem[]>
>();

export const ApartmentActTypesGate = createGate();
