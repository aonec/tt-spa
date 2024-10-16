import { DashboardCurrentAnalitycsDetailsOthersResponse } from 'api/types';

export const getRatioOfTasksCountByOthers = (
  data: DashboardCurrentAnalitycsDetailsOthersResponse,
) => {
  return data.items?.reduce(
    (acc, elem) => ({
      all: acc.all + (elem.totalTasksCount || 0),
      danger: acc.danger + (elem.notClosedTasksCount || 0),
    }),
    {
      danger: 0,
      all: 0,
    },
  );
};
