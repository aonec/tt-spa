import moment from 'time';
import { HomeownerAccountListResponse } from 'myApi';

export const checkIsHomeownerAccountRecentlyModified = (
  account: HomeownerAccountListResponse
) => {
  const changeDate = moment(account.openAtFact);

  const diff = moment().diff(changeDate, 'M');

  return diff < 2;
};
