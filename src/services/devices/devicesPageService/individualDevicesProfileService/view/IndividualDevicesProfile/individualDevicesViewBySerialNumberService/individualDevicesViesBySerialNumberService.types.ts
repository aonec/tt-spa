import { EApartmentStatus, EResourceType } from 'api/myApi';
import { SearchIndividualDevicesParams } from '../../../individualDevicesProfileService.types';

export type IndividualDeviceSearchbySerialNumberPayload =
  SearchIndividualDevicesParams & {
    SerialNumber: string;
    ApartmentStatus: EApartmentStatus | null;
    Resource: EResourceType | null;
    IsAlsoClosing: boolean;
  };
