import { createQuery } from '@farfetched/core';
import { GetInspectorsHousingStocksRequestParams } from './types';
import { InspectorOnBuildingResponse } from 'api/types';
import axios from 'api/axios';

export const getInspectorsHousingStocksQuery = createQuery<
  GetInspectorsHousingStocksRequestParams,
  InspectorOnBuildingResponse[] | null
>({
  handler: (query) => axios.get('Buildings/inspectors', { params: query }),
});
