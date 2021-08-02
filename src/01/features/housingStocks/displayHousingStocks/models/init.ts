import { forward } from 'effector';
import { getHousingStocks } from './../../../../_api/housingStocks';
import {
  fetchHousingStocksFx,
  $isFetchingHousingStocksFailed,
  $housingStocks,
  filterFieldHasBeenChanged,
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
  from: filterFieldHasBeenChanged,
  to: fetchHousingStocksFx,
});
