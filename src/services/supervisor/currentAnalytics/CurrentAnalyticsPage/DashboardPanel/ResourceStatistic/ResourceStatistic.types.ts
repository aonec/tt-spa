import {
  DashboardTaskMalfunctionDetailsModel,
  DashboardTaskResourceDetailsModel,
} from 'api/types';

export type Props = {
  data:
    | DashboardTaskResourceDetailsModel
    | DashboardTaskMalfunctionDetailsModel;
};
