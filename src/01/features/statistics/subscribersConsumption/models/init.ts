import { getConsumptionStatistics } from '01/_api/consumptionStatistics';
import { forward } from 'effector';
import moment from 'moment';
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
  from: ConsumptionStatisticsGate.state.map(({ housingStockId, month }) => {
    console.log(month);
    return {
      id: housingStockId,
      month: month ? String(month) : void 0,
    };
  }),
  to: fetchConsumptionStatistics,
});

$consumptionStatistics.on(
  fetchConsumptionStatistics.doneData,
  (_, values) => values
);

$selectedHousingsStockId.on(setSelectedHousingStockId, (_, id) => id);
