import { DashboardQueryParams } from '../currentAnalytics/currentAnalyticsService.types';

export function getDetailSuffix(params: DashboardQueryParams) {
  if (!params.ManagementFirmId) return '';

  return '/detail';
}
