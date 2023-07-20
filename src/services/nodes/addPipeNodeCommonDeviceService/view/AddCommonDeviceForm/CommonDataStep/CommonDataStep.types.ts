import { EPipeNodeConfig } from 'api/myApi';
import { CreateCommonDevicePartitial } from 'services/nodes/addPipeNodeCommonDeviceService/addPipeNodeCommonDeviceService.types';

export type CommonDataStepProps = {
  configuration: EPipeNodeConfig;
  formId: string;
  updateRequestPayload: (payload: CreateCommonDevicePartitial) => void;
  requestPayload: CreateCommonDevicePartitial;
};
