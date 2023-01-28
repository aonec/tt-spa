import { createStore, createEvent, createEffect } from 'effector';

export const $userIdToDelete = createStore<number | null>(null);
export const $isDeleteStaffModalVisible = $userIdToDelete.map(
  (id) => id !== null
);
export const $isDeletionStaffFailed = createStore(false);

export const deleteStaffButtonClicked = createEvent<number>();
export const deleteStaffModalCancelButtonClicked = createEvent();
export const deleteStaffConfirmButtonClicked = createEvent();

export const deleteStaffFx = createEffect<number, any>();
