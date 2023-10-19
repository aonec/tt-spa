import { createEvent, createStore } from 'effector';

const setIsLoading = createEvent<boolean>();

const $isLoading = createStore<boolean>(false).on(
  setIsLoading,
  (_, data) => data,
);

export const documentService = {
  inputs: { setIsLoading },
  outputs: { $isLoading },
};
