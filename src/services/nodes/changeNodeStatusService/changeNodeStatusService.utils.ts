import { ENodeCommercialAccountStatus } from 'myApi';
import { ChangeNodeStatusFormPayload } from './changeNodeStatusService.types';

export const getChangeNodeStatusPayload = (
  payload: ChangeNodeStatusFormPayload,
) => {
  const { commercialStatus, documentId, firstDate, secondDate } = payload;
  if (
    commercialStatus === ENodeCommercialAccountStatus.OnReview ||
    commercialStatus === ENodeCommercialAccountStatus.Prepared
  ) {
    return {
      commercialStatusChangingDate: firstDate,
      commercialStatus,
    };
  }

  if (commercialStatus === ENodeCommercialAccountStatus.NotRegistered) {
    return {
      commercialAccountingDeregistrationDate: firstDate,
      commercialStatus,
      documentId,
    };
  }
  return {
    commercialStatus,
    documentId,
    startCommercialAccountingDate: firstDate,
    endCommercialAccountingDate: secondDate,
  };
};
