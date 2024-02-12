import { createEvent, createStore } from 'effector';

const setModalOpen = createEvent<boolean>();

const $isOpen = createStore<boolean>(false).on(setModalOpen, (_, data) => data);

export const addInspectorService = {
  inputs: { setModalOpen },
  outputs: { $isOpen },
};
