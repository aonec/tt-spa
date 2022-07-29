import {
  $existingCities,
  fetchExistingCities,
} from "./../../../housingStocks/displayHousingStockCities/models/index";
import { forward, sample } from "effector";
import {
  openExpandedSearch,
  closeExpandedSearch,
  $isExpandedSearchOpen,
  ConsumptionStatisticsGate,
  fetchConsumptionStatistics,
  $consumptionStatistics,
  $selectedHousingsStockId,
  setSelectedHousingStockId,
  subscribersConsumptionFindForm,
} from "./index";
import { getConsumptionStatistics } from "../../../../_api/consumptionStatistics";

fetchConsumptionStatistics.use(getConsumptionStatistics);

$isExpandedSearchOpen
  .on(openExpandedSearch, () => true)
  .reset(closeExpandedSearch);

forward({
  from: ConsumptionStatisticsGate.state.map((values) => values),
  to: fetchConsumptionStatistics as any,
});

$consumptionStatistics.on(
  fetchConsumptionStatistics.doneData,
  (_, values) => values
);

$selectedHousingsStockId.on(setSelectedHousingStockId, (_, id) => id);

sample({
  clock: $existingCities.updates,
  fn: (cities) => (cities?.length ? cities[cities.length - 1] : ""),
  target: subscribersConsumptionFindForm.fields.city.set,
});
