import { createDomain } from 'effector';

const domain = createDomain('addCommunicationPipeService');

const handleCreatePipe = domain.createEvent<string>();

export const addCommunicationPipeService = {
  inputs: { handleCreatePipe },
};
