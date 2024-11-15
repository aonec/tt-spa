import {
  ETemperatureNormativeDeviationType,
  ManagingFirmTaskType,
} from 'api/types';
import { ResourceType } from 'cypress/types/net-stubbing';

export type CommonDashboardQueryParams = {
  /** @format date-time */
  From?: string;
  /** @format date-time */
  To?: string;
  City?: string;
  /** @format int32 */
  ManagementFirmId?: number;
  BuildingIds?: number[];
  ResourceType?: ResourceType;
  MalfunctionType?: ManagingFirmTaskType;
  DeviationType?: ETemperatureNormativeDeviationType;
  IsTest?: boolean;
};
