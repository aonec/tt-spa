import { createEvent, createStore } from 'effector';

const setOpen = createEvent<boolean>();

const $isOpen = createStore<boolean>(false).on(setOpen, (_, data) => data);


export const createRunnerService = {
  inputs: { setOpen },
  outputs: { $isOpen },
};
