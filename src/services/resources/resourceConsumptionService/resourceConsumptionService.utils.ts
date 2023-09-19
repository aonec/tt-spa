import _ from 'lodash';
import dayjs from 'api/dayjs';
import {
  DateTimeDoubleDictionaryItem,
  StreetWithBuildingNumbersResponse,
} from 'api/types';
import { getFilledArray } from 'utils/getFilledArray';
import {
  ConsumptionDataForTwoMonth,
  ResourceConsumptionGraphDataType,
  SetConsumptionDataType,
} from './resourceConsumptionService.types';

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
  const startOfMonth = dayjs(dataArr[0].key).startOf('month');
  const emptyArray = getFilledArray(
    dayjs(lastDate).diff(startOfMonth, 'd') + 1,
    (index) => index + 1,
  );

  const objectOfData = dataArr.reduce((acc, elem) => {
    const diff = String(dayjs(elem.key).diff(startOfMonth, 'day') + 1);

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
  const startOfMonth = dayjs(dataArr[0].key).startOf('month');
  const emptyArray = getFilledArray(31, (index) => index + 1);

  const objectOfData = dataArr.reduce((acc, elem) => {
    const diff = String(dayjs(elem.key).diff(startOfMonth, 'day') + 1);

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

export const setConsumptionData = (
  prev: ConsumptionDataForTwoMonth | null,
  fieldName: ResourceConsumptionGraphDataType,
  data: SetConsumptionDataType,
) => {
  return {
    ...(prev || {}),
    [fieldName]: {
      ...(prev?.[fieldName] || {}),
      ...(data || {}),
    },
  };
};

export const handleResetNormativeAndSubscriberData = (
  prev: ConsumptionDataForTwoMonth | null,
): ConsumptionDataForTwoMonth | null => {
  return {
    currentMonthData: {
      housing: undefined,
      normative: undefined,
      subscriber: undefined,
    },
    prevMonthData: {
      housing: undefined,
      normative: undefined,
      subscriber: undefined,
    },
    additionalAddress: {
      housing: undefined,
      normative: undefined,
      subscriber: undefined,
    },
  };
};
