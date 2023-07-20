import {
  EApartmentStatus,
  EClosingReason,
  EExpiresCheckingDateAt,
  EOrderByRule,
  EResourceType,
} from 'api/myApi';

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
  ExpiresCheckingDateAt?: EExpiresCheckingDateAt | null;
  IsAlsoClosing?: boolean;
  PageNumber?: number;
  PageSize?: number;
  OrderBy?: EOrderByRule | null;
};
