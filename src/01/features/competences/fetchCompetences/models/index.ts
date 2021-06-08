import { createStore, createEffect } from 'effector';
import { createGate } from 'effector-react';
import { ECompetenceTypeStringDictionaryItem } from './../../../../../myApi';

export const $competencesCatalog = createStore<
  ECompetenceTypeStringDictionaryItem[] | null
>(null);
export const $isFetchingCompetencesFailed = createStore(false);

export const fetchCompetencesFx = createEffect<
  void,
  ECompetenceTypeStringDictionaryItem[] | null
>();

export const CompetencesGate = createGate();
