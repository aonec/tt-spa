import { createDomain } from 'effector';

const domain = createDomain('addCommunicationPipeService');

const handleCreatePipe = domain.createEvent<number>();

export const addCommunicationPipeService = {
  inputs: { handleCreatePipe },
};
