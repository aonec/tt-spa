import { createStore, createEvent, createEffect } from 'effector';

export const $deletionUserId = createStore<number | null>(null);
export const $isDeleteStaffModalVisible = $deletionUserId.map(
  (id) => id !== null
);
export const $isDeletionStaffFailed = createStore(false);

export const deleteStaffButtonClicked = createEvent<number>();
export const delteStaffModalCancelButtonClicked = createEvent();
export const deleteStaffConfirmButtonClicked = createEvent();

export const deleteStaffFx = createEffect<number, any>();
