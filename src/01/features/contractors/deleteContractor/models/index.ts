import { ContractorResponse } from './../../../../../myApi';
import { createEvent, createStore, createEffect } from 'effector';

export const $contractorIdToDelete = createStore<number | null>(null);
export const $isDeleteContractorModalVisible = $contractorIdToDelete.map(
  (id) => id !== null
);
export const $isDeletionContractorFailed = createStore(false);
export const $deletedСonctractorName = createStore<string | null>(null);

export const deleteContractorFx = createEffect<number, ContractorResponse>();

export const deleteContractorButtonClicked = createEvent<{
  id: number;
  name: string;
}>();
export const deleteContractorCancelButtonClicked = createEvent();
export const deleteContractorConfirmButtonClicked = createEvent();
