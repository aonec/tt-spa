import { createQuery } from '@farfetched/core';
import axios from 'api/axios';
import { BuildingListResponsePagedList, DistrictResponse } from 'api/types';

export const existingHousingStocksQuery = createQuery<
  void,
  BuildingListResponsePagedList
>({
  handler: () => axios.get('Buildings'),
});

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
