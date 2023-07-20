import {
  EEmailSubscriptionType,
  ENodeCommercialAccountStatus,
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

  NodeStatus?: ENodeCommercialAccountStatus;
  DelayedEmailTarget?: string;
};

export type RegularUnloadSubscription = {
  'Subscription.Email'?: string;
  'Subscription.ContractorIds'?: number[];
  'Subscription.TriggerAt'?: string;
  'Subscription.Type'?: EEmailSubscriptionType;
};
