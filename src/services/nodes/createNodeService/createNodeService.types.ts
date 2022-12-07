import { CreateCommunicationPipeRequest, CreatePipeNodeRequest } from 'myApi';

export type CreateNodeFormPayload = CreatePipeNodeRequest & {
  communicationPipes?: (CreateCommunicationPipeRequest & { id: number })[];
};

export type UpdateNodeFormPayloadCallback = (payload: CreateNodeFormPayload) => void