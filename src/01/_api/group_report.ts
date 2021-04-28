import { ReadingsStateType } from './houses_readings_page';
import {
  EmailSubscriptionType,
  NodeCommercialAccountStatus,
  ResourceType,
} from '../../myApi';
import axiosWithHeaders from '../axiosWithHeaders';

export const sendGroupReport = async (query?: {
  GroupReportId?: string | null;
  HouseManagementId?: string | null;
  NodeResourceTypes?: ResourceType[] | null;
  NodeStatus?: NodeCommercialAccountStatus;
  'Subscription.Email'?: string | null;
  'Subscription.ContractorIds'?: number[] | null;
  'Subscription.TriggerAt'?: string;
  'Subscription.Type'?: EmailSubscriptionType;
  DelayedEmailTarget?: string | null;
  ReportType?: string | null;
  From?: string | null;
  To?: string | null;
}): Promise<ReadingsStateType> => {
  const config: Partial<{ params: typeof query } & { responseType: 'blob' }> = {
    params: query,
  };
  if (!query?.DelayedEmailTarget) {
    config.responseType = 'blob';
  }
  const res = await axiosWithHeaders.get<any, any>(
    `Reports/GroupReport`,
    config
  );
  return res;
};
