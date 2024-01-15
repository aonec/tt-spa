import { IndividualDeviceListItemResponse } from 'api/types';
import { CloseIndividualDeviceFormType } from '../../closeIndividualDeviceService.types';

export type CloseIndividualDeviceFormProps = {
  form: CloseIndividualDeviceFormType;
  formId: string;
  device: IndividualDeviceListItemResponse | null;
};
