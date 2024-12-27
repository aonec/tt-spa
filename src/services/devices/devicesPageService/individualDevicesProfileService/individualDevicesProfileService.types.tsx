import {
  EApartmentStatus,
  EClosingReason,
  EExpiresDateAt,
  EIndividualDeviceOrderRule,
  EOrderByRule,
  EResourceType,
} from 'api/types';

export type SearchIndividualDevicesParams = {
  City?: string | null;
  Street?: string | null;
  HouseNumber?: string | null;
  HouseCorpus?: string | null;
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
