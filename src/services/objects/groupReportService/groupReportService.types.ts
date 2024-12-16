import {
  ENodeCommercialAccountStatus,
  EReportFormat,
  EReportType,
  EResourceType,
  GroupReportConfigurationPeriod,
} from 'api/types';

export type GroupReportRequestPayload = RegularUnloadSubscription & {
  To: string;
  From: string;
  FileName: string;
  NodeResourceTypes: EResourceType[];
  ReportType: EReportType;
  ReportFormat?: EReportFormat;
  NodeStatus?: ENodeCommercialAccountStatus;
  ManagementFirmId?: number | null;
  HouseManagementId?: string | null;
  BuildingIds?: number[];
};

export type RegularUnloadSubscription = {
  'Subscription.Email'?: string;
  'Subscription.ContractorIds'?: number[];
  'Subscription.TriggerAt'?: string;
  'Subscription.Type'?: GroupReportConfigurationPeriod;
};
