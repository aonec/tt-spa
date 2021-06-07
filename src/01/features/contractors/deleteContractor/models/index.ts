import { ContractorResponse } from './../../../../../myApi';
import { createEvent, createStore, createEffect } from 'effector';

export const $contractorIdToDelete = createStore<number | null>(null);
export const $isDeleteContractorModalVisible = $contractorIdToDelete.map(
  (id) => id !== null
);
export const $isDeletionContractorFailed = createStore(false);

export const deleteContractorFx = createEffect<number, ContractorResponse>();

export const deleteContractorButtonClicked = createEvent<number>();
export const deleteContractorCancelButtonClicked = createEvent();
export const deleteContractorConfirmButtonClicked = createEvent();
