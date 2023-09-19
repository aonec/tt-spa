import _ from 'lodash';
import dayjs from 'api/dayjs';
import {
  DateTimeDoubleDictionaryItem,
  StreetWithBuildingNumbersResponse,
} from 'api/types';
import { getFilledArray } from 'utils/getFilledArray';
import {
  ConsumptionDataForTwoMonth,
  MonthConsumptionData,
  ResourceConsumptionGraphDataType,
  ResourceConsumptionGraphType,
  SetConsumptionDataType,
} from './resourceConsumptionService.types';
import { BooleanTypesOfResourceConsumptionGraphForTwoMonth } from './view/ResourceConsumptionProfile/ResourceConsumptionProfile.types';
import { prepareData } from 'utils/Graph.utils';

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

export const handleResetNormativeAndSubscriberData =
  (): ConsumptionDataForTwoMonth | null => {
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

export const prepareDataForMinMaxCalculation = (
  consumptionData: ConsumptionDataForTwoMonth | null,
  checked: BooleanTypesOfResourceConsumptionGraphForTwoMonth,
) => {
  const checkedCurrentMonthConsumption: MonthConsumptionData = {
    [ResourceConsumptionGraphType.Housing]: checked.currentMonthData.housing
      ? consumptionData?.currentMonthData?.housing
      : [],
    [ResourceConsumptionGraphType.Normative]: checked.currentMonthData.normative
      ? consumptionData?.currentMonthData?.normative
      : [],
    [ResourceConsumptionGraphType.Subscriber]: checked.currentMonthData
      .subscriber
      ? consumptionData?.currentMonthData?.subscriber
      : [],
  };

  const checkedPrevMonthConsumption: MonthConsumptionData = {
    [ResourceConsumptionGraphType.Housing]: checked.prevMonthData.housing
      ? consumptionData?.prevMonthData?.housing
      : [],
    [ResourceConsumptionGraphType.Normative]: checked.prevMonthData.normative
      ? consumptionData?.prevMonthData?.normative
      : [],
    [ResourceConsumptionGraphType.Subscriber]: checked.prevMonthData.subscriber
      ? consumptionData?.prevMonthData?.subscriber
      : [],
  };

  const additionalAddressConsumptionData =
    consumptionData?.additionalAddress || null;

  const checkedAdditionalAddressConsumption: MonthConsumptionData = {
    [ResourceConsumptionGraphType.Housing]:
      additionalAddressConsumptionData?.housing,
    [ResourceConsumptionGraphType.Normative]:
      additionalAddressConsumptionData?.normative,
    [ResourceConsumptionGraphType.Subscriber]:
      additionalAddressConsumptionData?.subscriber,
  };

  const dataForMinMaxCalculation = [
    ...Object.values(checkedCurrentMonthConsumption),
    ...Object.values(checkedPrevMonthConsumption),
    ...Object.values(checkedAdditionalAddressConsumption),
  ].map(prepareData);

  return dataForMinMaxCalculation;
};
