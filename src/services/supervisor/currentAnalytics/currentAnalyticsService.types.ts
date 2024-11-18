import {
  ETemperatureNormativeDeviationType,
  ManagingFirmTaskType,
  ResourceType,
} from 'api/types';

export enum DashboardDataType {
  PipeRupturesCount = 'PipeRupturesCount',
  ResourceDisconnectsCount = 'ResourceDisconnectsCount',
  MalfunctionsCount = 'MalfunctionsCount',
  AverageCompletionTime = 'AverageCompletionTime',
  TasksCount = 'TasksCount',
}

export type DashboardQueryParams = {
  /** @format date-time */
  From?: string | null;
  /** @format date-time */
  To?: string | null;
  City?: string | null;
  /** @format int32 */
  ManagementFirmId?: number | null;
  BuildingIds?: number[];
  ResourceType?: ResourceType | null;
  MalfunctionType?: ManagingFirmTaskType | null;
  DeviationType?: ETemperatureNormativeDeviationType | null;
  IsTest?: boolean;
};

export type ManagementFirmsQueryParams = {
  City?: string;
  Street?: string;
  /** @format int32 */
  HousingManagementId?: number;
  Address?: string;
};
