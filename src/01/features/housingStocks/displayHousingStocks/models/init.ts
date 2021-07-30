import { getHousingStocks } from './../../../../_api/housingStocks';
import {
  fetchHousingStocksFx,
  $isFetchingHousingStocksFailed,
  $housingStocks,
} from './index';

fetchHousingStocksFx.use(getHousingStocks);

$isFetchingHousingStocksFailed
  .on(fetchHousingStocksFx.failData, () => true)
  .reset(fetchHousingStocksFx.doneData);

$housingStocks.on(
  fetchHousingStocksFx.doneData,
  (_, housingStocks) => housingStocks
);
