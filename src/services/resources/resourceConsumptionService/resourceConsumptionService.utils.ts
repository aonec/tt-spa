import _ from 'lodash';
import moment from 'moment';
import {
  DateTimeDoubleDictionaryItem,
  StreetWithBuildingNumbersResponse,
} from 'myApi';
import { getFilledArray } from 'utils/getFilledArray';

export const prepareDataForConsumptionGraphWithLastValue = (
  dataArr: DateTimeDoubleDictionaryItem[],
  lastDate?: string,
) => {
  if (!dataArr.length) {
    return [];
  }
  if (!lastDate) {
    return prepareDataForConsumptionGraph(dataArr);
  }
  const startOfMonth = moment(dataArr[0].key).startOf('month');
  const emptyArray = getFilledArray(
    moment(lastDate).diff(startOfMonth, 'd') + 1,
    (index) => index + 1,
  );

  const objectOfData = dataArr.reduce((acc, elem) => {
    const diff = String(moment(elem.key).diff(startOfMonth, 'day') + 1);

    return { ...acc, [diff]: { ...elem, key: diff } };
  }, {} as { [key: string]: DateTimeDoubleDictionaryItem });

  let lastValue: null | number = null;

  return emptyArray.map((day) => {
    const foundValue = objectOfData[day];

    if (!foundValue) {
      return { key: String(day), value: lastValue };
    }
    lastValue = foundValue.value || null;
    return foundValue;
  });
};

export const prepareDataForConsumptionGraph = (
  dataArr: DateTimeDoubleDictionaryItem[],
) => {
  if (!dataArr.length) {
    return [];
  }
  const startOfMonth = moment(dataArr[0].key).startOf('month');
  const emptyArray = getFilledArray(31, (index) => index + 1);

  const objectOfData = dataArr.reduce((acc, elem) => {
    const diff = String(moment(elem.key).diff(startOfMonth, 'day') + 1);

    return { ...acc, [diff]: { ...elem, key: diff } };
  }, {} as { [key: string]: DateTimeDoubleDictionaryItem });

  return emptyArray.map((day) => {
    const foundValue = objectOfData[day];

    if (!foundValue) {
      return { key: String(day), value: null };
    }
    return foundValue;
  });
};

export const getAddressSearchData = (
  data: StreetWithBuildingNumbersResponse[] | null,
) =>
  _.uniqBy(
    (data || []).reduce((acc, elem) => {
      const addresses =
        elem.addresses?.map((address) => ({
          id: address.buildingId,
          addressString: `ул. ${elem.street}, д. ${address.number}`,
        })) || [];

      return [...acc, ...addresses];
    }, [] as { id: number; addressString: string }[]),
    'addressString',
  );
