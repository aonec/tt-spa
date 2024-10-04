import { DashboardCurrentAnalitycsDetailsResourceModel } from 'api/types';

export const getRatioOfTasksCount = (
  data: DashboardCurrentAnalitycsDetailsResourceModel[],
) => {
  return data?.reduce(
    (acc, elem) => {
      const res = elem.items?.reduce(
        (acc, elem) => ({
          ...acc,
          danger: acc.danger + (elem?.notClosedTasksCount || 0),
          all: acc.all + (elem?.totalTasksCount || 0),
        }),
        {
          danger: 0,
          all: 0,
        },
      );

      return {
        danger: (res?.danger || 0) + acc.danger,
        all: (res?.all || 0) + acc.all,
      };
    },
    {
      danger: 0,
      all: 0,
    },
  );
};
