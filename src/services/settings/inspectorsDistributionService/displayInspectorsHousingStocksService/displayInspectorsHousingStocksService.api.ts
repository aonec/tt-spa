import { GetInspectorsHousingStocksRequestParams } from './types';
import {
  InspectorOnBuildingResponse,
  InspectorOnBuildingResponseListSuccessApiResponse,
} from 'api/types';
import { createQueryWithAuth } from 'api/farfetched';
import { Contract } from '@farfetched/core';

const getInspectorsHousingContract: Contract<
  unknown,
  InspectorOnBuildingResponseListSuccessApiResponse
> = {
  isData: (res): res is InspectorOnBuildingResponseListSuccessApiResponse =>
    Boolean(res),
  getErrorMessages: () => ['Invalid data'],
};

export const getInspectorsHousingStocksQuery = createQueryWithAuth<
  GetInspectorsHousingStocksRequestParams,
  InspectorOnBuildingResponse[] | null
>({
  url: 'Buildings/inspectors',
  response: {
    contract: getInspectorsHousingContract,
  },
});
