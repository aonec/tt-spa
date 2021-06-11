import { createEffect, createStore, createEvent } from 'effector';

export const $editStaffStatusUserId = createStore<number | null>(null);
export const $isEditStaffStatusRequestFailed = createStore(false);
export const $isEditStaffStatusModalVisible = $editStaffStatusUserId.map(
  (id) => id !== null
);

export const editStaffStatusButtonClicked = createEvent<number>();
export const editStaffStatusCancelButtonClicked = createEvent();
export const editStaffStatusConfirmButtonClicked = createEvent();

export const updateStaffStatusFx = createEffect();
