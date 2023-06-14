import { axios } from '01/axios';
import { createQuery } from '@farfetched/core';
import { DistrictResponse } from 'myApi';

export const districtsQuery = createQuery<void, DistrictResponse[]>({
  handler: () => axios.get('IndividualSeal/Districts'),
});
