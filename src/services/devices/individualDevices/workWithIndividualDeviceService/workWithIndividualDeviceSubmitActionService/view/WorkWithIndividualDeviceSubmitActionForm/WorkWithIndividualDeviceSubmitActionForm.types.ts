import {
  ContractorListResponse,
  IndividualDeviceMountPlaceListResponse,
  IndividualDeviceResponse,
} from 'api/types';
import { WorkWithIndividualDeviceType } from '../../../workWithIndividualDeviceService.types';
import { WorkWithIndividualDeviceFormType } from '../../../view/WorkWithIndividualDevicePage/WorkWithIndividualDeviceForm/WorkWithIndividualDeviceForm.types';

export type WorkWithIndividualDeviceSubmitActionFormProps = {
  contractors: ContractorListResponse[] | null;
  mountPlaces: IndividualDeviceMountPlaceListResponse[] | null;
  typeOfAction: WorkWithIndividualDeviceType;
  individualDevice: IndividualDeviceResponse;
  form: WorkWithIndividualDeviceFormType | null;
};
