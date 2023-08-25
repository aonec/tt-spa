import {
  ContractorListResponse,
  IndividualDeviceMountPlaceListResponse,
  IndividualDeviceResponse,
} from 'api/types';
import {
  WorkWithIndividualDeviceFormType,
  WorkWithIndividualDeviceType,
} from '../../../workWithIndividualDeviceService.types';

export type WorkWithIndividualDeviceSubmitActionFormProps = {
  form: WorkWithIndividualDeviceFormType;
  contractors: ContractorListResponse[] | null;
  mountPlaces: IndividualDeviceMountPlaceListResponse[] | null;
  typeOfAction: WorkWithIndividualDeviceType;
  individualDevice: IndividualDeviceResponse;
};
