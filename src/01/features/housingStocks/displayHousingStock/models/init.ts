import { $housingStock, HousingStockGate } from './index';
import { guard, sample, combine } from 'effector';
import { getHousingStock } from '01/_api/housingStocks';
import { fetchHousingStockFx } from '.';

$housingStock
  .on(fetchHousingStockFx.doneData, (_, housingStock) => housingStock)
  .reset(HousingStockGate.close);

fetchHousingStockFx.use(getHousingStock);

sample({
  source: HousingStockGate.state.map((state) => state.id),
  clock: guard({
    source: combine(
      $housingStock,
      HousingStockGate.state.map((state) => state.id),
      (house, id) => ({ house, id }),
    ),
    clock: HousingStockGate.state,
    filter: ({ house, id }) => Boolean(id) && house?.id !== id,
  }),
  target: fetchHousingStockFx,
});
