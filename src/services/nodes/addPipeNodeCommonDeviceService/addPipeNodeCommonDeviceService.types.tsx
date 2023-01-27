import {
  CreateCommunicationPipeRequest,
  CreatePipeHousingMeteringDeviceInNodeRequest,
  EResourceType,
} from 'myApi';

export type Props = {
  resource: EResourceType;
  communicationPipes: CommunicationPipePayload[];
  handleAddCommunicationPipe: (
    communicationPipe: CommunicationPipePayload,
  ) => void;
};

export type CreateCommonDevicePartitial = Partial<
  CreatePipeHousingMeteringDeviceInNodeRequest & { pipeId: number }
>;

export type CommunicationPipePayload = CreateCommunicationPipeRequest & {
  id: number;
};
