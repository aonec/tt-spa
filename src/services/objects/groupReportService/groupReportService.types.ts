import {
  EEmailSubscriptionType,
  ENodeCommercialAccountStatus,
  EReportFormat,
  EReportType,
  EResourceType,
} from 'myApi';

export type GroupReportRequestPayload = {
  To: string;
  From: string;
  Name: string;
  HouseManagementId: string;
  NodeResourceTypes: EResourceType[];
  ReportType: EReportType;

  NodeStatus?: ENodeCommercialAccountStatus;
  'Subscription.Email'?: string;
  'Subscription.ContractorIds'?: number[];
  'Subscription.TriggerAt'?: string;
  'Subscription.Type'?: EEmailSubscriptionType;
  DelayedEmailTarget?: string;
};
