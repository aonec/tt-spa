import {
  EEmailSubscriptionType,
  ENodeCommercialAccountStatus,
  EReportType,
  EResourceType,
} from 'myApi';

export type GroupReportRequestPayload = RegularUnloadSubscription & {
  To: string;
  From: string;
  Name: string;
  HouseManagementId: string;
  NodeResourceTypes: EResourceType[];
  ReportType: EReportType;

  NodeStatus?: ENodeCommercialAccountStatus;
  DelayedEmailTarget?: string;
};

export type RegularUnloadSubscription = {
  'Subscription.Email'?: string;
  'Subscription.ContractorIds'?: number[];
  'Subscription.TriggerAt'?: string;
  'Subscription.Type'?: EEmailSubscriptionType;
};
