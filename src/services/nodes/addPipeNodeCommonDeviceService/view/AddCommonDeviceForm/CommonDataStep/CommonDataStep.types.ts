import { EResourceType } from 'myApi';
import { CreateCommonDevicePartitial } from 'services/nodes/addPipeNodeCommonDeviceService/addPipeNodeCommonDeviceService.types';

export type CommonDataStepProps = {
  resource: EResourceType;
  formId: string;
  updateRequestPayload: (payload: CreateCommonDevicePartitial) => void;
};
