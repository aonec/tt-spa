import { createStore, createEvent } from 'effector';

export const $isSelectEditPersonalNumberTypeModalOpen = createStore(false);

export const openEditPersonalNumberTypeModal = createEvent();
export const closeEditPersonalNumberTypeModal = createEvent();
