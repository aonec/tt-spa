import { RequestStatusShared } from '01/features/readings/displayReadingHistory/hooks/useReadingValues';

export function getColorByRequestStatus(status: RequestStatusShared) {
  return status
    ? status === 'pending'
      ? '#ffd476'
      : status === 'done'
      ? '#0ddf53'
      : status === 'failed'
      ? '#FF0021'
      : `#eeeeee`
    : null;
}
