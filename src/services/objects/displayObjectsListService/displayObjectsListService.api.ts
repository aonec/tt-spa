import { BuildingListResponsePagedList } from 'api/types';
import { GetHousingStocksRequestPayload } from './displayObjectsListService.types';
import { createQuery } from 'api/farfetched/createQuery';

export const getBuildingsQuery = createQuery<
  GetHousingStocksRequestPayload,
  BuildingListResponsePagedList
>({
  url: 'Buildings',
});
