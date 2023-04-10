import { SubscriberStatisticsFilter } from './displayStatisticsListByManagingFirmService.types';

export const prepareFilterBeforeSenging = (
  filter: SubscriberStatisticsFilter,
) => {
  const {
    ColdWaterSupply,
    Electricity,
    HotWaterSupply,
    Heat,
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

      'ColdWaterSupplyFilter.From': filter['ColdWaterSupplyFilter.From'],
      'ColdWaterSupplyFilter.To': filter['ColdWaterSupplyFilter.To'],
    };
  }
  if (Electricity) {
    payload = {
      ...payload,
      'ElectricityFilter.From': filter['ElectricityFilter.From'],
      'ElectricityFilter.To': filter['ElectricityFilter.To'],
    };
  }
  if (HotWaterSupply) {
    payload = {
      ...payload,
      'HotWaterSupplyFilter.From': filter['ElectricityFilter.From'],
      'HotWaterSupplyFilter.To': filter['HotWaterSupplyFilter.To'],
    };
  }
  if (Heat) {
    payload = {
      ...payload,
      'HeatFilter.From': filter['HeatFilter.From'],
      'HeatFilter.To': filter['HeatFilter.To'],
    };
  }
  return payload;
};
