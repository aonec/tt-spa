import { createStore, createEffect } from 'effector';
import { createGate } from 'effector-react';
import { ContractorResponse } from '../../../../../api/types';

export const $contractors = createStore<ContractorResponse[] | null>(null);
export const $isFetchingContractorsFailed = createStore(false)

export const getContractorsFx = createEffect<any, any>();

export const ContractorsGate = createGate();
