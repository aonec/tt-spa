import {
  EEmailSubscriptionType,
  ENodeCommercialAccountStatus,
  EReportFormat,
  EReportType,
  EResourceType,
} from 'api/types';

export type GroupReportRequestPayload = RegularUnloadSubscription & {
  To: string;
  From: string;
  Name: string;
  HouseManagementId: string | null;
  NodeResourceTypes: EResourceType[];
  ReportType: EReportType;
  ReportFormat?: EReportFormat;
  NodeStatus?: ENodeCommercialAccountStatus;
};

export type RegularUnloadSubscription = {
  'Subscription.Email'?: string;
  'Subscription.ContractorIds'?: number[];
  'Subscription.TriggerAt'?: string;
  'Subscription.Type'?: EEmailSubscriptionType;
};
