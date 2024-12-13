import { DashboardQueryParams } from './currentAnalyticsService.types';

export function getItemArray<T>(data: null | T | T[]): T[] | null {
  if (!data) {
    return null;
  }

  if (Array.isArray(data)) {
    return data;
  } else {
    return [data];
  }
}

export function getDetailSuffix(params: DashboardQueryParams) {
  if (!params.ManagementFirmId && !params.City) return '';

  if (params.ManagementFirmId) return 'detail';

  return 'city';
}
