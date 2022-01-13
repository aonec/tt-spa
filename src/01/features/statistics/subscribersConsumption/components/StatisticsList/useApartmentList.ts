import { SubscriberStatisticsСonsumptionResponse } from 'myApi';
import { subscribersConsumptionFilterForm } from './../../models/index';
import { $consumptionStatistics } from '../../models';
import { useStore } from 'effector-react';
import { useForm } from 'effector-forms/dist';
import _ from 'lodash';
import moment from 'moment';

type IterateArrayCallback<T> = ((apartment: T) => boolean)[];

export function useApartmentList() {
  const apartmentList = useStore($consumptionStatistics);
  const { fields } = useForm(subscribersConsumptionFilterForm);

  const sortCallbacks: IterateArrayCallback<SubscriberStatisticsСonsumptionResponse> = [];

  const filterCallbacks: IterateArrayCallback<SubscriberStatisticsСonsumptionResponse> = [];

  const filters = [
    {
      valuePath: 'coldOpen.value',
      fromPath: 'cold.value.from',
      toPath: 'cold.value.to',
      consumptionPath: 'coldWaterSupplyСonsumption',
    },
    {
      valuePath: 'hotOpen.value',
      fromPath: 'hot.value.from',
      toPath: 'hot.value.to',
      consumptionPath: 'hotWaterSupplyСonsumption',
    },
    {
      valuePath: 'electricityOpen.value',
      fromPath: 'electricity.value.from',
      toPath: 'electricity.value.to',
      consumptionPath: 'electricitySupplyСonsumption',
    }
  ];

  filters.forEach(({valuePath, fromPath, toPath, consumptionPath}) => {
    const [value, from, to, consuption] = [
      _.get(fields, valuePath),
      _.get(fields, fromPath),
      _.get(fields, toPath),
      _.get(fields, consumptionPath)
    ]
    if (value && (typeof from === 'number') && (typeof to === 'number')) {
      filterCallbacks.push((apartment) =>
        Boolean(typeof consuption === "number" && consuption >= Number(from) && consuption <= Number(to))
      )
    }
  });

  if (
    fields.individualDeviceCheckPeriod.value.from &&
    fields.individualDeviceCheckPeriod.value.to
  ) {
    filterCallbacks.push((apartment) => {
      const checkDate = moment(apartment.dateLastCheck);

      if (!checkDate.isValid()) return false;

      const isAfterThanFrom =
        checkDate.isSameOrAfter(
          moment(fields.individualDeviceCheckPeriod.value.from)
        ) ||
        checkDate.format('DD-MM-YYYY') ===
          moment(fields.individualDeviceCheckPeriod.value.from)?.format(
            'DD-MM-YYYY'
          );

      const isBeforeThanTo =
        checkDate.isSameOrBefore(
          moment(fields.individualDeviceCheckPeriod.value.to)
        ) ||
        checkDate.format('DD-MM-YYYY') ===
          moment(fields.individualDeviceCheckPeriod.value.to)?.format(
            'DD-MM-YYYY'
          );

      return isAfterThanFrom && isBeforeThanTo;
    });
  }

  if (fields.excludeApartments.value) {
    filterCallbacks.push((apartment) => {
      const checkDate = moment(apartment.dateLastCheck);

      if (!checkDate.isValid()) return false;

      return moment().diff(checkDate, 'months') <= 3;
    });
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
