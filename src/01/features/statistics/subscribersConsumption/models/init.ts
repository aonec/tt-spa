import { getConsumptionStatistics } from '01/_api/consumptionStatistics';
import { forward } from 'effector';
import {
  openExpandedSearch,
  closeExpandedSearch,
  $isExpandedSearchOpen,
  ConsumptionStatisticsGate,
  fetchConsumptionStatistics,
  $consumptionStatistics,
  $selectedHousingsStockId,
  setSelectedHousingStockId,
} from './index';

fetchConsumptionStatistics.use(getConsumptionStatistics);

$isExpandedSearchOpen
  .on(openExpandedSearch, () => true)
  .reset(closeExpandedSearch);

forward({
  from: ConsumptionStatisticsGate.state.map(({ housingStockId, month }) => ({
    id: housingStockId,
    month,
  })),
  to: fetchConsumptionStatistics,
});

$consumptionStatistics.on(
  fetchConsumptionStatistics.doneData,
  (_, values) => values
);

$selectedHousingsStockId.on(setSelectedHousingStockId, (_, id) => id);
