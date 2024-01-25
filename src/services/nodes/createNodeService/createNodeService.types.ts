import { CreatePipeNodeRequest, EHouseCategory } from 'api/types';
import { CommunicationPipePayload } from '../addPipeNodeCommonDeviceService/addPipeNodeCommonDeviceService.types';

export type CreateNodeFormPayload = Omit<
  CreatePipeNodeRequest,
  'communicationPipes' | 'title'
> & {
  communicationPipes?: CommunicationPipePayload[];
  houseCategory?: EHouseCategory;
  title?: string;
};

export type UpdateNodeFormPayloadCallback = (
  payload: CreateNodeFormPayload,
) => void;

export type GetBuildingPayload = {
  buildingId: number;
  houseCategory: EHouseCategory;
};
