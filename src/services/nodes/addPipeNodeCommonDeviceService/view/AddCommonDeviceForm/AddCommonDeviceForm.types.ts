import { EResourceType } from 'myApi';
import {
  CommunicationPipePayload,
  CreateCommonDevicePartitial,
} from '../../addPipeNodeCommonDeviceService.types';

export type AddCommonDeviceFormProps = {
  currentFormStep: number;
  formId: string;
  updateRequestPayload: (payload: CreateCommonDevicePartitial) => void;
  resource: EResourceType;
  requestPayload: CreateCommonDevicePartitial;
  openAddPipeModal: () => void;
  communicationPipes: CommunicationPipePayload[];
  handleFormComplete: () => void;
};
