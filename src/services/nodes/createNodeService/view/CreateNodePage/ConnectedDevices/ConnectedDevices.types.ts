import { CreateCommunicationPipeRequest, CreatePipeNodeRequest, EResourceType } from 'myApi';

export type ConnectedDevicesProps = {
  goPrevStep: () => void;
  requestPayload: CreatePipeNodeRequest;
};

