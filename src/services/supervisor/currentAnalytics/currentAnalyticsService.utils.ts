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
  return params.ManagementFirmId ? 'detail' : '';
}
