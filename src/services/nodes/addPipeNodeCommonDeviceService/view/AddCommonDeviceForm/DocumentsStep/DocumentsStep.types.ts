import { CreateCommonDevicePartitial } from 'services/nodes/addPipeNodeCommonDeviceService/addPipeNodeCommonDeviceService.types';

export type DocumentsStepProps = {
  updateRequestPayload: (payload: CreateCommonDevicePartitial) => void;
  formId: string;
  handleFormComplete: () => void;
};
