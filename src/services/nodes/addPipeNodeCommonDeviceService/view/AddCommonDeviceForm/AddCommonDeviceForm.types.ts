import { EPipeNodeConfig } from 'api/myApi';
import {
  CommunicationPipePayload,
  CreateCommonDevicePartitial,
} from '../../addPipeNodeCommonDeviceService.types';

export type AddCommonDeviceFormProps = {
  currentFormStep: number;
  formId: string;
  updateRequestPayload: (payload: CreateCommonDevicePartitial) => void;
  configuration: EPipeNodeConfig;
  requestPayload: CreateCommonDevicePartitial;
  communicationPipes: CommunicationPipePayload[];
  handleFormComplete: () => void;
};
