import { getHousingStocks } from './../../../../_api/housingStocks';
import { forward, guard } from 'effector';
import {
  HousingStocksGate,
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

forward({
  from: guard({
    source: $housingStocks,
    clock: HousingStocksGate.open,
    filter: (contractors) => contractors === null,
  }),
  to: fetchHousingStocksFx,
});
