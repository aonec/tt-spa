import { SubscriberStatisticsFilter } from './displayStatisticsListByManagingFirmService.types';

export const prepareFilterBeforeSenging = (
  filter: SubscriberStatisticsFilter
) => {
  const {
    ColdWaterSupply,
    Electricity,
    HotWaterSupply,
    ColdWaterSupplyConsumptionFrom,
    ColdWaterSupplyConsumptionTo,
    ElectricitySupplyConsumptionFrom,
    ElectricitySupplyConsumptionTo,
    HotWaterSupplyConsumptionFrom,
    HotWaterSupplyConsumptionTo,
    DateLastCheckFrom,
    DateLastCheckTo,
    MonthOfLastTransmission,
    HousingStockId,
  } = filter;

  let payload: SubscriberStatisticsFilter = {
    DateLastCheckFrom,
    DateLastCheckTo,
    MonthOfLastTransmission,
    HousingStockId,
  };

  if (ColdWaterSupply) {
    payload = {
      ...payload,
      ColdWaterSupplyConsumptionFrom,
      ColdWaterSupplyConsumptionTo,
    };
  }
  if (Electricity) {
    payload = {
      ...payload,
      ElectricitySupplyConsumptionFrom,
      ElectricitySupplyConsumptionTo,
    };
  }
  if (HotWaterSupply) {
    payload = {
      ...payload,
      HotWaterSupplyConsumptionFrom,
      HotWaterSupplyConsumptionTo,
    };
  }
  return payload;
};
