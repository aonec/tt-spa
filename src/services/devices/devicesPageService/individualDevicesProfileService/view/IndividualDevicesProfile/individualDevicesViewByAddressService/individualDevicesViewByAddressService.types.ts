import {
  EApartmentStatus,
  EClosingReason,
  EExpiresDateAt,
  EOrderByRule,
  EResourceType,
} from 'api/types';
import { SearchIndividualDevicesParams } from '../../../individualDevicesProfileService.types';

export type SearchIndividualDevicesRequestPayload =
  SearchIndividualDevicesParams & {
    Apartment?: string | null;
  };

export type GetHousingByFilterRequestPayload = {
  City: string;
  Street: string;
  Number: string;
  Corpus?: string;
};

export type GetIndividualDevicesApartments = {
  HousingStockId?: number;
  ApartmentNumber?: string;
  'DeviceFilter.Resource'?: EResourceType;
  'DeviceFilter.Model'?: string;
  'DeviceFilter.ClosingReason'?: EClosingReason;
  'DeviceFilter.MountPlace'?: string;
  'DeviceFilter.ApartmentStatus'?: EApartmentStatus;
  'DeviceFilter.ExpiresCheckingDateAt'?: EExpiresDateAt;
  'DeviceFilter.IsAlsoClosing'?: boolean;
  PageNumber?: number;
  PageSize?: number;
  OrderBy?: EOrderByRule;
};
