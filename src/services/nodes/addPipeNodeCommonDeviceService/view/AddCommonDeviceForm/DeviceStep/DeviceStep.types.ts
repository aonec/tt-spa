import {
  CommunicationPipePayload,
  CreateCommonDevicePartitial,
} from 'services/nodes/addPipeNodeCommonDeviceService/addPipeNodeCommonDeviceService.types';

export type DeviceStepProps = {
  formId: string;
  openAddPipeModal: () => void;
  communicationPipes: CommunicationPipePayload[];
  updateRequestPayload: (payload: CreateCommonDevicePartitial) => void;
  requestPayload: CreateCommonDevicePartitial;
  withoutNewPipes: boolean;
};
