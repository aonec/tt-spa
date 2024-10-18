import {
  DashboardTaskMalfunctionResponse,
  DashboardTaskResourceResponse,
} from 'api/types';

export type Props = {
  data?: DashboardTaskResourceResponse | DashboardTaskMalfunctionResponse;
  otherData?: (
    | DashboardTaskResourceResponse
    | DashboardTaskMalfunctionResponse
  )[];
};
