import { DashboardTaskQualityResponse } from 'api/types';

export function getTaskQualityOtherData(
  otherData: DashboardTaskQualityResponse[],
) {
  return otherData.reduce(
    (acc, elem) => ({
      allTasksCount: acc.allTasksCount + Number(elem?.totalTasksCount || 0),
      totalBuildingCount:
        acc.totalBuildingCount + Number(elem?.totalBuildingCount || 0),
      buildingsWithTasksCount:
        acc.buildingsWithTasksCount +
        Number(elem?.buildingsWithTasksCount || 0),
      averageCompletionTime: Number(elem?.averageCompletionTime || 0),
    }),
    {
      allTasksCount: 0,
      totalBuildingCount: 0,
      buildingsWithTasksCount: 0,
      averageCompletionTime: 0,
    },
  );
}
