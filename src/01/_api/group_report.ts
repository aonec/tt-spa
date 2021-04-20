import axios from '../axios';
import { ReadingsStateType } from './houses_readings_page';
import {
  Api,
  EmailSubscriptionType,
  NodeCommercialAccountStatus,
  ResourceType,
} from '../../myApi';

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
  const res = await axios.get<any, any>(`Reports/GetGroupReport`, {
    params: query,
  });
  return res;
};
