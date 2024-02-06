import { createQuery } from '@farfetched/core';
import axios from 'api/axios';
import {
  BuildingWithCoordinatesResponsePagedList,
  DistrictResponse,
} from 'api/types';

export const existingHousingStocksQuery = createQuery<
  void,
  BuildingWithCoordinatesResponsePagedList
>({
  handler: () => axios.get('Buildings/Lite'),
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

