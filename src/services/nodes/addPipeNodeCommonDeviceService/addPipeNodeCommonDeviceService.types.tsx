import {
  CreateCommunicationPipeRequest,
  CreatePipeHousingMeteringDeviceInNodeRequest,
  EPipeNodeConfig,
} from 'api/types';

export type Props = {
  configuration: EPipeNodeConfig;
  communicationPipes: CommunicationPipePayload[];
  handleAddCommunicationPipe: (
    communicationPipe: CommunicationPipePayload,
  ) => void;
};

export type CreateCommonDevicePartitial = Partial<
  CreatePipeHousingMeteringDeviceInNodeRequest & { pipeId: number }
>;

export type CommunicationPipePayload = CreateCommunicationPipeRequest & {
  id: string;
};
