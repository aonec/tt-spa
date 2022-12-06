import {
  CreateCommunicationPipeRequest,
  CreatePipeHousingMeteringDeviceInNodeRequest,
  EResourceType,
} from 'myApi';

export type Props = {
  resource: EResourceType;
  handleAddCommunicationPipe: (
    communicationPipes: CommunicationPipePayload
  ) => void;
};

export type CreateCommonDevicePartitial = Partial<CreatePipeHousingMeteringDeviceInNodeRequest>;

export type CommunicationPipePayload = CreateCommunicationPipeRequest & {
  id: string;
};
