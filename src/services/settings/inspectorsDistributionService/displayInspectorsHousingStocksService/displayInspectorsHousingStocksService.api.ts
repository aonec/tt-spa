import { axios } from 'api/axios';
import { GetInspectorsHousingStocksRequestParams } from './types';
import { InspectorOnBuildingResponse } from 'api/types';
import { createQuery } from '@farfetched/core';
import { createEffect } from 'effector';

export const getInspectorsHousingStocksQuery = createQuery({
  effect: createEffect<
    GetInspectorsHousingStocksRequestParams,
    InspectorOnBuildingResponse[] | null
  >(async (params) => await axios.get('Buildings/inspectors', { params })),
});
