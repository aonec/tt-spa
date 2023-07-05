import { axios } from '01/axios';
import { createQuery } from '@farfetched/core';
import { DistrictResponse } from 'myApi';

export const existingDistrictsQuery = createQuery<
  void,
  DistrictResponse[] | null
>({
  handler: async () => {
    const districts: DistrictResponse[] = await axios.get(
      'IndividualSeal/Districts',
    );

    if (!districts) return null;

    return districts.reverse();
  },
});
