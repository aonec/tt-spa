import { createEffect, createStore } from 'effector';
import { createGate } from 'effector-react';
import { EActResourceTypeStringDictionaryItem } from '../../api/types';
import { MayBe } from '../../displayActsJournal/models';

export const $actResources = createStore<
  MayBe<EActResourceTypeStringDictionaryItem[]>
>(null);

export const fetchResourcesFx = createEffect<
  void,
  MayBe<EActResourceTypeStringDictionaryItem[]>
>();

export const ActResourcesGate = createGate();
