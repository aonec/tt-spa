import { DashboardTaskResourceResponse } from 'api/types';

export const getRatioOfTasksCountByOthers = (
  data: DashboardTaskResourceResponse[],
) => {
  return data?.reduce(
    (acc, elem) => ({
      all: acc.all + (elem.totalTasksCount || 0),
      danger: acc.danger + (elem.expiredTasksCount || 0),
    }),
    {
      danger: 0,
      all: 0,
    },
  );
};
