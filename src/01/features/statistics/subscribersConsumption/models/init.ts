import { $existingCities } from './../../../housingStocks/displayHousingStockCities/models/index';
import { getConsumptionStatistics } from '01/_api/consumptionStatistics';
import { sample } from 'effector';

import { exportStatisticsService } from './ExportStatisticsService/ExportStatistics.model';
import {
  $selectedHousingsStockId,
  fetchConsumptionStatistics,
  setSelectedHousingStockId,
  subscribersConsumptionFindForm,
} from '.';

const { inputs } = exportStatisticsService;

fetchConsumptionStatistics.use(getConsumptionStatistics);

$selectedHousingsStockId.on(setSelectedHousingStockId, (_, id) => id);

sample({
  clock: $existingCities.updates,
  fn: (cities) => (cities?.length ? cities[cities.length - 1] : ''),
  target: subscribersConsumptionFindForm.fields.city.set,
});
