import { EActResourceType, EApartmentStatus, EResourceType } from 'myApi';

export type IndividualDeviceSearchbySerialNumberPayload = {
  SerialNumber: string;
  ApartmentStatus?: EApartmentStatus;
  Resource: EResourceType | null;
  IsAlsoClosing: boolean;
};
