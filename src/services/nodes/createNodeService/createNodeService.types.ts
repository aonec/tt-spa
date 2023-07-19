import { CreatePipeNodeRequest, EHouseCategory } from 'myApi';
import { CommunicationPipePayload } from '../addPipeNodeCommonDeviceService/addPipeNodeCommonDeviceService.types';

export type CreateNodeFormPayload = Omit<
  CreatePipeNodeRequest,
  'communicationPipes'
> & {
  communicationPipes?: CommunicationPipePayload[];
  houseCategory?: EHouseCategory;
};

export type UpdateNodeFormPayloadCallback = (
  payload: CreateNodeFormPayload,
) => void;

export type GetBuildingPayload = {
  buildingId: number;
  houseCategory: EHouseCategory;
};
