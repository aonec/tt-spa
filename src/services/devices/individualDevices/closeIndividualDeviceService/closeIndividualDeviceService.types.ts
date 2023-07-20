import { CloseIndividualDeviceRequest } from 'api/types';
import { closeIndividualDeviceService } from './closeIndividualDeviceService.model';

export type CloseIndividualDevicePayload = {
  deviceId: number;
} & CloseIndividualDeviceRequest;

export type CloseIndividualDeviceFormType =
  typeof closeIndividualDeviceService.forms.closeIndividualDeviceForm;
