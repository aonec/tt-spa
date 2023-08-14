import { EApartmentStatus, EResourceType } from 'api/types';
import { SearchIndividualDevicesParams } from '../../../individualDevicesProfileService.types';

export type IndividualDeviceSearchbySerialNumberPayload =
  SearchIndividualDevicesParams & {
    SerialNumber: string;
    ApartmentStatus: EApartmentStatus | null;
    Resource: EResourceType | null;
    IsAlsoClosing: boolean;
  };
