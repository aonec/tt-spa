import {
  IndividualDeviceListItemResponse,
  IndividualDeviceReadingsSlimResponse,
} from 'api/types';
import { CloseIndividualDeviceFormType } from '../../closeIndividualDeviceService.types';

export type CloseIndividualDeviceFormProps = {
  form: CloseIndividualDeviceFormType;
  formId: string;
  device: IndividualDeviceListItemResponse | null;
  lastReading: IndividualDeviceReadingsSlimResponse | null;
  isBannerShown: boolean;
  openReadingsHistoryModal: (payload: number) => void;
};
