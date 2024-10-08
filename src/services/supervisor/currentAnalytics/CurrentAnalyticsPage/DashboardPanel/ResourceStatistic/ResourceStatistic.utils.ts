import { DashboardCurrentAnalitycsDetailsResourceModel } from 'api/types';

export const getRatioOfTasksCount = (
  data: DashboardCurrentAnalitycsDetailsResourceModel,
) => {
  return data.items?.reduce(
    (acc, item) => {
      return {
        all: acc.all + (item.totalTasksCount || 0),
        danger: acc.danger + (item.notClosedTasksCount || 0),
      };
    },
    {
      danger: 0,
      all: 0,
    },
  );
};
