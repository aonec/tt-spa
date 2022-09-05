import { subscribersConsumptionFilterForm } from '../models';
import { useForm } from 'effector-forms/dist';
import { HousingStockWithApartmentStatistic } from './displayStatisticsListByManagingFirmService.types';
import moment from 'moment';

export function useFilterStatisticsList(
  housingStocks: HousingStockWithApartmentStatistic[]
) {
  const { fields } = useForm(subscribersConsumptionFilterForm);

  const hasColdWaterFilter = fields.coldOpen;
  const hasHeatFilter = fields.heatOpen.value;
  const hasElectricityFilter = fields.electricityOpen.value;
  const excludeApartments = fields.excludeApartments.value;
  const lastReadingMonth = fields.lastReadingMonth.value;
  const individualDeviceCheckPeriod = fields.individualDeviceCheckPeriod.value;

  const preparedHousingStocks = housingStocks.map((housingStock) => {
    let apartmentsStatistic = housingStock.apartmentsStatistic;
    if (hasColdWaterFilter) {
      const coldwaterFilter = fields.cold.value;
      apartmentsStatistic = apartmentsStatistic.filter((apartment) => {
        const coldWaterSupplyСonsumption = apartment.coldWaterSupplyСonsumption;
        if (!coldWaterSupplyСonsumption) {
          return false;
        }
        if (coldwaterFilter.from && coldwaterFilter.to) {
          return (
            coldWaterSupplyСonsumption >= coldwaterFilter.from &&
            coldWaterSupplyСonsumption <= coldwaterFilter.to
          );
        }
        return true;
      });
    }

    if (hasHeatFilter) {
      const heatFilter = fields.heat.value;
      apartmentsStatistic = apartmentsStatistic.filter((apartment) => {
        const hotWaterSupplyСonsumption = apartment.hotWaterSupplyСonsumption;
        if (!hotWaterSupplyСonsumption) {
          return false;
        }
        if (heatFilter.from && heatFilter.to) {
          return (
            hotWaterSupplyСonsumption >= heatFilter.from &&
            hotWaterSupplyСonsumption <= heatFilter.to
          );
        }
        return true;
      });
    }

    if (hasElectricityFilter) {
      const electricityFilter = fields.electricity.value;
      apartmentsStatistic = apartmentsStatistic.filter((apartment) => {
        const electricitySupplyСonsumption =
          apartment.electricitySupplyСonsumption;
        if (!electricitySupplyСonsumption) {
          return false;
        }
        if (electricityFilter.from && electricityFilter.to) {
          return (
            electricitySupplyСonsumption >= electricityFilter.from &&
            electricitySupplyСonsumption <= electricityFilter.to
          );
        }
        return true;
      });
    }

    if (excludeApartments) {
      apartmentsStatistic = apartmentsStatistic.filter((apartment) => {
        const checkDate = moment(apartment.dateLastCheck);

        if (!checkDate.isValid()) {
          return false;
        }

        return moment().diff(checkDate, 'months') <= 3;
      });
    }

    if (lastReadingMonth) {
      apartmentsStatistic = apartmentsStatistic.filter((apartment) => {
        const dateLastTransmissionOfReading = moment(
          apartment.dateLastTransmissionOfReading
        );
        const lastReadingDate = moment(lastReadingMonth).startOf('month');
        const diff = dateLastTransmissionOfReading.diff(
          lastReadingDate,
          'month'
        );
        return diff === 0;
      });
    }
    if (individualDeviceCheckPeriod.from && individualDeviceCheckPeriod.to) {
      apartmentsStatistic = apartmentsStatistic.filter((apartment) => {
        const dateLastCheck = moment(apartment.dateLastCheck);
        const from = moment(individualDeviceCheckPeriod.from);
        const to = moment(individualDeviceCheckPeriod.to);
        if (!dateLastCheck.isValid) {
          return false;
        }
        const dateMore = dateLastCheck.diff(from) >= 0;
        const dateLess = dateLastCheck.diff(to) <= 0;
        return dateMore && dateLess;
      });
    }
    return { ...housingStock, apartmentsStatistic };
  });

  return preparedHousingStocks;
}
