import moment from 'moment';
import { ENodeCommercialAccountStatus, ENodeRegistrationType } from 'myApi';

export const getInitialDateFieldValue = (date?: string | null) => {
  if (!date) return null;

  return moment(date);
};

export const getNodeStatus = (
  commercialStatus?: ENodeCommercialAccountStatus | null
) => {
  if (commercialStatus === undefined) {
    return null;
  }
  if (commercialStatus === null) {
    return ENodeRegistrationType.Technical;
  }
  return ENodeRegistrationType.Commercial;
};
