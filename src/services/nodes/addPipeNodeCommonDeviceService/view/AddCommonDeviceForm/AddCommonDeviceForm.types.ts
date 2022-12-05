import { EResourceType } from 'myApi';
import { CreateCommonDevicePartitial } from '../../addPipeNodeCommonDeviceService.types';

export type AddCommonDeviceFormProps = {
  currentFormStep: number;
  formId: string;
  updateRequestPayload: (
    payload: CreateCommonDevicePartitial
  ) => void;
  resource: EResourceType;
};
