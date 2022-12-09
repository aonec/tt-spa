import {
  CreateNodeFormPayload,
  UpdateNodeFormPayloadCallback,
} from 'services/nodes/createNodeService/createNodeService.types';

export type ConnectedDevicesProps = {
  goPrevStep: () => void;
  requestPayload: CreateNodeFormPayload;
  updateRequestPayload: UpdateNodeFormPayloadCallback;
  openConfiramtionModal: () => void;
};
