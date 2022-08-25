import { message } from 'antd';
import { combine, forward, guard, sample } from 'effector';
import { $existingCities } from './../../../housingStocks/displayHousingStockCities/models/index';
import { getConsumptionStatistics } from '01/_api/consumptionStatistics';
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
  manualyGetStatisticData,
  subscribersConsumptionFilterForm,
} from './index';
import { exportStatisticsService } from './ExportStatisticsService/ExportStatistics.model';

const { inputs } = exportStatisticsService;

fetchConsumptionStatistics.use(getConsumptionStatistics);

$isExpandedSearchOpen
  .on(openExpandedSearch, () => true)
  .reset(closeExpandedSearch);

forward({
  from: ConsumptionStatisticsGate.state.map((values) => values),
  to: fetchConsumptionStatistics as any,
});

sample({
  source: guard({
    source: combine(
      ConsumptionStatisticsGate.state.map((values) => values),
      subscribersConsumptionFilterForm.$values
    ),
    clock: manualyGetStatisticData,
    filter: ([gateData]) => {
      if (!gateData.hasOwnProperty('HousingStockId'))
        message.error('Выберите адрес');
      return gateData.hasOwnProperty('HousingStockId');
    },
  }),
  fn: ([gateData, formValues]) => {
    return {
      HousingStockId: gateData.HousingStockId,
      MonthOfLastTransmission: gateData.MonthOfLastTransmission,
      HotWaterSupply: formValues.heatOpen,
      ColdWaterSupply: formValues.coldOpen,
      Electricity: formValues.electricityOpen,
    };
  },
  target: inputs.exportStatisticsFx,
});

$consumptionStatistics.on(
  fetchConsumptionStatistics.doneData,
  (_, values) => values
);

$selectedHousingsStockId.on(setSelectedHousingStockId, (_, id) => id);

sample({
  clock: $existingCities.updates,
  fn: (cities) => (cities?.length ? cities[cities.length - 1] : ''),
  target: subscribersConsumptionFindForm.fields.city.set,
});
