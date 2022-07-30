import { $housingStock, HousingStockGate } from './index';
import { guard, sample, combine } from 'effector';
import { fetchHousingStockFx } from '.';
import { getHousingStock } from '../../../../_api/housingStocks';

$housingStock.on(
  fetchHousingStockFx.doneData,
  (_, housingStock) => housingStock
);

fetchHousingStockFx.use(getHousingStock);

sample({
  source: HousingStockGate.state.map((state) => state.id),
  clock: guard({
    source: combine(
      $housingStock,
      HousingStockGate.state.map((state) => state.id),
      (house, id) => ({ house, id })
    ),
    clock: HousingStockGate.state,
    filter: ({ house, id }) => house?.id !== id,
  }),
  target: fetchHousingStockFx,
});
