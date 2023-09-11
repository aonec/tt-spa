import dayjs from 'api/dayjs';
import { HomeownerAccountListResponse } from 'api/types';

export const checkIsHomeownerAccountRecentlyModified = (
  account: HomeownerAccountListResponse,
) => {
  const changeDate = dayjs(account.openAtFact);

  const diff = dayjs().diff(changeDate, 'M');

  return diff < 2;
};
