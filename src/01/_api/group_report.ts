import { stringify } from 'query-string';

import {
  EEmailSubscriptionType,
  ENodeCommercialAccountStatus,
  EResourceType,
} from '../../myApi';
import axiosWithHeaders from '../axiosWithHeaders';

export const sendGroupReport = async (query?: {
  GroupReportId?: string | null;
  HouseManagementId?: string | null;
  NodeResourceTypes?: EResourceType[] | null;
  NodeStatus?: ENodeCommercialAccountStatus;
  'Subscription.Email'?: string | null;
  'Subscription.ContractorIds'?: number[] | null;
  'Subscription.TriggerAt'?: string;
  'Subscription.Type'?: EEmailSubscriptionType;
  DelayedEmailTarget?: string | null;
  ReportType?: string | null;
  From?: string | null;
  To?: string | null;
}) => {
  const config: Partial<
    {
      params: typeof query;
      paramsSerializer: (params: typeof query) => string;
    } & {
      responseType: 'blob';
    }
  > = {
    params: query,
    paramsSerializer: (params) => stringify(params || {}),
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
