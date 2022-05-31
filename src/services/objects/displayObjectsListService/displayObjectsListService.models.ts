import { createDomain, sample } from 'effector';
import { HousingStockListResponsePagedList } from 'myApi';
import { getHosuingStocks } from './displayObjectsListService.api';
import {
  GetHousingStocksRequestPayload,
  SearchHousingStocksPayload,
} from './displayObjectsListService.types';

const displayObjectsListServiceDomain = createDomain(
  'displayObjectsListService'
);

const $housingStocks = displayObjectsListServiceDomain.createStore<HousingStockListResponsePagedList | null>(
  null
);

const fetchHousingStocksFx = displayObjectsListServiceDomain.createEffect<
  GetHousingStocksRequestPayload,
  HousingStockListResponsePagedList
>(getHosuingStocks);

const $isLoading = fetchHousingStocksFx.pending;

const fetchHosuingStocks = displayObjectsListServiceDomain.createEvent<SearchHousingStocksPayload>();

sample({
  clock: fetchHosuingStocks,
  fn: (payload) => {
    return {
      City: payload.city,
      Street: payload.street,
      HousingStockNumber: payload.house,
      Corpus: payload.corpus,
      PageSize: 30,
      PageNumber: 1,
    };
  },
  target: fetchHousingStocksFx,
});

$housingStocks.on(fetchHousingStocksFx.doneData, (_, result) => result);

export const displayObjectsListService = {
  inputs: {
    fetchHosuingStocks,
  },
  outputs: {
    $housingStocks,
    $isLoading,
  },
};
