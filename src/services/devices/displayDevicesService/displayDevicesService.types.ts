import {
  BuildingShortResponse,
  EExpiresDateAt,
  EHouseCategory,
  ENodeCommercialAccountStatus,
  ENodeRegistrationType,
  EOrderByRule,
  EResourceType,
  PipeNodeResponse,
} from 'api/types';
import { DeviceConnectionType } from '../devicesProfileService/view/DevicesProfile/ExtendedSearchForm/ExtendedSearchForm.constants';

export interface DevicesByAddressInterface {
  devices: GroupedByCalculatorPipeNodes[];
  building: BuildingShortResponse | null;
}

export type GroupedByCalculatorPipeNodes = PipeNodeResponse[];

export type NodesListRequestPayload = {
  CalculatorId?: number;
  IsConnected?: boolean;
  BuildingId?: number;
  'Address.City'?: string;
  'Address.Street'?: string;
  'Address.HousingStockNumber'?: string;
  'Address.Corpus'?: string;
  'Address.HouseCategory'?: EHouseCategory;
  Resource?: EResourceType;
  RegistrationType?: ENodeRegistrationType;
  CommercialStatus?: ENodeCommercialAccountStatus;
  'DevicesFilter.ExpiresCheckingDateAt'?: EExpiresDateAt;
  'DevicesFilter.Model'?: string;
  'DevicesFilter.Question'?: string;
  'DevicesFilter.PipeDiameters'?: number[];
  'CommercialDateRange.From'?: string;
  'CommercialDateRange.To'?: string;
  ExpiresAdmissionActDateAt?: EExpiresDateAt;
  HasInvalidConfiguration?: boolean;
  PageNumber?: number;
  PageSize?: number;
  OrderBy?: EOrderByRule;
  Skip?: number;
  Take?: number;
};

export type NodesListRequestForm = Omit<
  NodesListRequestPayload,
  'IsConnected'
> & {
  connectionType: DeviceConnectionType | undefined;
};
