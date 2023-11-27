import {
  EApartmentStatus,
  EClosingReason,
  EExpiresDateAt,
  EIndividualDeviceOrderRule,
  EOrderByRule,
  EResourceType,
} from 'api/types';

export type SearchIndividualDevicesParams = {
  City?: string;
  Street?: string;
  HouseNumber?: string;
  HouseCorpus?: string;
  Model?: string;
  SerialNumber?: string;
  MountPlace?: string;
  Resource?: EResourceType | null;
  ApartmentStatus?: EApartmentStatus | null;
  ClosingReason?: EClosingReason | null;
  ExpiresCheckingDateAt?: EExpiresDateAt | null;
  IsAlsoClosing?: boolean;
  PageNumber?: number;
  PageSize?: number;
  OrderBy?: EOrderByRule | null;
  OrderRule?: EIndividualDeviceOrderRule;
};
