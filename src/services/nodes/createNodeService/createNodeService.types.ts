import { CreateCommunicationPipeRequest, CreatePipeNodeRequest } from 'myApi';
import { CommunicationPipePayload } from '../addPipeNodeCommonDeviceService/addPipeNodeCommonDeviceService.types';

export type CreateNodeFormPayload = Omit<
  CreatePipeNodeRequest,
  'communicationPipes'
> & {
  communicationPipes?: CommunicationPipePayload[];
};

export type UpdateNodeFormPayloadCallback = (
  payload: CreateNodeFormPayload,
) => void;
