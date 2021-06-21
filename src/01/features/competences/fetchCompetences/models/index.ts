import { createStore, createEffect } from 'effector';
import { createGate } from 'effector-react';
import { ManagementFirmCompetenceResponse } from './../../../../../myApi';

export const $competencesCatalog = createStore<
  ManagementFirmCompetenceResponse[] | null
>(null);
export const $isFetchingCompetencesFailed = createStore(false);

export const fetchCompetencesFx = createEffect<
  void,
  ManagementFirmCompetenceResponse[] | null
>();

export const CompetencesGate = createGate();
