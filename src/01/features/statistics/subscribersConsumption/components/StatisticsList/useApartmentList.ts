import { SubscriberStatisticsСonsumptionResponse } from 'myApi';
import { subscribersConsumptionFilterForm } from './../../models/index';
import { $consumptionStatistics } from '../../models';
import { useStore } from 'effector-react';
import { useForm } from 'effector-forms/dist';
import _ from 'lodash';

type IterateArrayCallback<T> = ((apartment: T) => any)[];

export function useApartmentList() {
  const apartmentsList = useStore($consumptionStatistics);
  const { fields } = useForm(subscribersConsumptionFilterForm);

  const sortCallbacks: IterateArrayCallback<SubscriberStatisticsСonsumptionResponse> = [];

  const filterCallbacks: IterateArrayCallback<SubscriberStatisticsСonsumptionResponse> = [];

  //   if (fields.coldOpen && fields.cold) filterCallbacks.push((apartment) => apartment.)

  const sortedApartmentList = _.sortBy(
    apartmentsList,
    [(apartment) => Number(apartment.apartmentNumber), ...sortCallbacks],
    []
  );

  return { apartmentList: sortedApartmentList };
}
