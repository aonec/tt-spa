import {
  ECalculatorOrderRule,
  EExpiresDateAt,
  EHouseCategory,
  ENodeCommercialAccountStatus,
  ENodeRegistrationType,
  EOrderByRule,
  EResourceType,
} from 'api/types';
import { DeviceConnectionType } from 'services/devices/devicesProfileService/view/DevicesProfile/ExtendedSearchForm/ExtendedSearchForm.constants';

export interface CalculatorsListRequestPayload {
  'Filter.PipeDiameters'?: number[];
  'Filter.ExpiresCheckingDateAt'?: EExpiresDateAt;
  'Filter.ExpiresAdmissionActDateAt'?: EExpiresDateAt;
  'Filter.Resource'?: EResourceType;
  'Filter.Model'?: string;
  'Filter.CommercialDateRange.From'?: string;
  'Filter.CommercialDateRange.To'?: string;
  'Filter.Address.City'?: string;
  'Filter.Address.Street'?: string;
  'Filter.Address.HousingStockNumber'?: string;
  'Filter.Address.Corpus'?: string;
  'Filter.Address.HouseCategory'?: EHouseCategory;
  'Filter.HousingStockId'?: number;
  'Filter.NodeStatus'?: ENodeCommercialAccountStatus;
  'Filter.NodeRegistrationType'?: ENodeRegistrationType;
  Question?: string;
  OrderRule?: ECalculatorOrderRule;
  IsConnected?: boolean;
  CountTasks?: boolean;
  IsClosed?: boolean;
  FileName?: string;
  PageNumber?: number;
  PageSize?: number;
  OrderBy?: EOrderByRule;
  Skip?: number;
  Take?: number;
}

export type CalculatorsListRequestForm = Omit<
  CalculatorsListRequestPayload,
  'IsConnected'
> & {
  IsConnected: DeviceConnectionType | undefined;
};
