import {
  ContractorListResponse,
  IndividualDeviceMountPlaceListResponse,
} from 'myApi';
import { WorkWithIndividualDeviceFormType } from '../../../workWithIndividualDeviceService.types';

export type WorkWithIndividualDeviceSubmitActionFormProps = {
  form: WorkWithIndividualDeviceFormType;
  contractors: ContractorListResponse[] | null;
  mountPlaces: IndividualDeviceMountPlaceListResponse[] | null;
};
