import {
  CommunicationPipePayload,
  CreateCommonDevicePartitial,
} from 'services/nodes/addPipeNodeCommonDeviceService/addPipeNodeCommonDeviceService.types';

export type DeviceStepProps = {
  formId: string;
  communicationPipes: CommunicationPipePayload[];
  updateRequestPayload: (payload: CreateCommonDevicePartitial) => void;
  requestPayload: CreateCommonDevicePartitial;
};
