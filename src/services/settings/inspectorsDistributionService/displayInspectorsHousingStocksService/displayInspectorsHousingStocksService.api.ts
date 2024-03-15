import { GetInspectorsHousingStocksRequestParams } from './types';
import {
  InspectorOnBuildingResponse,
  InspectorOnBuildingResponseListSuccessApiResponse,
} from 'api/types';
import { createQuery } from 'api/farfetched';
import { Contract } from '@farfetched/core';

const getInspectorsHousingContract: Contract<
  unknown,
  InspectorOnBuildingResponseListSuccessApiResponse
> = {
  isData: (res): res is InspectorOnBuildingResponseListSuccessApiResponse =>
    Boolean(res),
  getErrorMessages: () => ['Invalid data'],
};

export const getInspectorsHousingStocksQuery = createQuery<
  GetInspectorsHousingStocksRequestParams,
  InspectorOnBuildingResponse[] | null
>({
  url: '/api/Buildings/inspectors',
  response: {
    contract: getInspectorsHousingContract,
  },
});
