import { SubscriberStatisticsСonsumptionResponse } from 'myApi';
import { subscribersConsumptionFilterForm } from './../../models/index';
import { $consumptionStatistics } from '../../models';
import { useStore } from 'effector-react';
import { useForm } from 'effector-forms/dist';
import _ from 'lodash';

type IterateArrayCallback<T> = ((apartment: T) => any)[];

export function useApartmentList() {
  const apartmentList = useStore($consumptionStatistics);
  const { fields } = useForm(subscribersConsumptionFilterForm);

  const sortCallbacks: IterateArrayCallback<SubscriberStatisticsСonsumptionResponse> = [];

  const filterCallbacks: IterateArrayCallback<SubscriberStatisticsСonsumptionResponse> = [];

  if (fields.coldOpen.value && fields.cold.value.from && fields.cold.value.to) {
    filterCallbacks.push(
      (apartment) =>
        apartment.coldWaterSupplyСonsumption &&
        apartment.coldWaterSupplyСonsumption >=
          Number(fields.cold.value.from) &&
        apartment.coldWaterSupplyСonsumption <= Number(fields.cold.value.to)
    );
  }

  if (fields.heatOpen.value && fields.heat.value.from && fields.heat.value.to) {
    filterCallbacks.push(
      (apartment) =>
        apartment.hotWaterSupplyСonsumption &&
        apartment.hotWaterSupplyСonsumption >= Number(fields.cold.value.from) &&
        apartment.hotWaterSupplyСonsumption <= Number(fields.heat.value.to)
    );
  }

  if (
    fields.electricityOpen.value &&
    fields.electricity.value.from &&
    fields.electricity.value.to
  ) {
    filterCallbacks.push(
      (apartment) =>
        apartment.electricitySupplyСonsumption &&
        apartment.electricitySupplyСonsumption >=
          Number(fields.electricity.value.from) &&
        apartment.electricitySupplyСonsumption <=
          Number(fields.electricity.value.to)
    );
  }

  const filteredApartmentList = apartmentList?.filter((elem) => {
    const checks = filterCallbacks.map((callback) => Boolean(callback(elem)));

    return checks.every(Boolean);
  });

  const sortedApartmentList = _.sortBy(
    filteredApartmentList,
    [(apartment) => Number(apartment.apartmentNumber), ...sortCallbacks],
    []
  );

  return { apartmentList: sortedApartmentList };
}
