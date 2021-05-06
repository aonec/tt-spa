import { ReadingsStateType } from './houses_readings_page';
import {
  EmailSubscriptionType,
  NodeCommercialAccountStatus,
  ResourceType,
} from '../../myApi';
import axiosWithHeaders from '../axiosWithHeaders';
import qs from 'qs';

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
}) => {
  debugger;
  const config: Partial<
    {
      params: typeof query;
      paramsSerializer: (params: typeof query) => string;
    } & {
      responseType: 'blob';
    }
  > = {
    params: query,
    paramsSerializer: (params) => qs.stringify(params),
  };
  if (!query?.NodeStatus) {
    delete query?.NodeStatus;
  }
  if (!query?.DelayedEmailTarget) {
    config.responseType = 'blob';
  }
  const res = await axiosWithHeaders.get(`Reports/GroupReport`, config);
  return res;
};
