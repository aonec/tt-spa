import { createStore, createEvent } from 'effector';

export const isAddStaffModalVisible = createStore(false);

export const addStaffButtonClicked = createEvent();
export const addStaffModalCloseButtonClicked = createEvent();
