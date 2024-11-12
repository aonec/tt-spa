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
  /** @format int32 */
  MunicipalDistrictId?: number | null;
  /** @format int32 */
  RegionId?: number | null;
  /** @format int32 */
  ManagementFirmId?: number | null;
  BuildingIds?: number[];
  /** @format date-time */
  Date?: string | null;
  addressCity?: string;
  addressStreet?: string;
  /** @format int32 */
  addressHousingManagementId?: number | null;
  addressAddress?: string;
  IsTest?: boolean;
};

export type ManagementFirmsQueryParams = {
  City?: string;
  Street?: string;
  /** @format int32 */
  HousingManagementId?: number;
  Address?: string;
};
