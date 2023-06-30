import { createDomain } from 'effector';

const domain = createDomain('documentService');

const setIsLoading = domain.createEvent<boolean>();

const $isLoading = domain
  .createStore<boolean>(false)
  .on(setIsLoading, (_, data) => data);

export const documentService = {
  inputs: { setIsLoading },
  outputs: { $isLoading },
};
