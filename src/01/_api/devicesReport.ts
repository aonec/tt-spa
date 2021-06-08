import {
  ECalculatorOrderBy,
  EExpiresCheckingDateAt,
  EHouseCategory,
  ENodeCommercialAccountStatus,
  EOrderByDestination,
  EResourceType,
} from '../../myApi';
import axios from '01/axios';

export type RequestDevicesReportQueryType = {
  'Filter.DiameterRange.From'?: number | null;
  'Filter.DiameterRange.To'?: number | null;
  'Filter.ExpiresCheckingDateAt'?: EExpiresCheckingDateAt;
  'Filter.Resource'?: EResourceType;
  'Filter.Model'?: string | null;
  'Filter.CommercialDateRange.From'?: string | null;
  'Filter.CommercialDateRange.To'?: string | null;
  'Filter.Address.City'?: string | null;
  'Filter.Address.Street'?: string | null;
  'Filter.Address.HousingStockNumber'?: string | null;
  'Filter.Address.Corpus'?: string | null;
  'Filter.Address.HouseCategory'?: EHouseCategory;
  'Filter.HousingStockId'?: number | null;
  'Filter.NodeStatus'?: ENodeCommercialAccountStatus;
  Question?: string | null;
  'OrderBy.Destination'?: EOrderByDestination;
  'OrderBy.Rule'?: ECalculatorOrderBy;
  IsConnected?: boolean | null;
  CountTasks?: boolean | null;
  PageNumber?: number;
  PageSize?: number;
};

export const requestDevicesReport = (
  query?: RequestDevicesReportQueryType
): Promise<File | null> => axios.get('Calculators/Export', { params: query });
