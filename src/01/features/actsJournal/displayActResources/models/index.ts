import { createEffect, createStore } from 'effector';
import { createGate } from 'effector-react';
import { EActResourceTypeStringDictionaryItem } from 'myApi';
import { MayBe } from '../../displayActsJournal/models';

export const $resources = createStore<
  MayBe<EActResourceTypeStringDictionaryItem[]>
>(null);

export const fetchResourcesFx = createEffect<
  void,
  MayBe<EActResourceTypeStringDictionaryItem[]>
>();

export const ActResourcesGate = createGate();
