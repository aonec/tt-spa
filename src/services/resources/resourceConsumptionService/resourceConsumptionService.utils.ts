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

const getCheckedCurrentMonthConsumption = (
  consumptionData: ConsumptionDataForTwoMonth | null,
  checked: BooleanTypesOfResourceConsumptionGraphForTwoMonth,
  consumptionType: ResourceConsumptionGraphDataType,
): MonthConsumptionData => {
  return {
    [ResourceConsumptionGraphType.Housing]: checked[consumptionType].housing
      ? consumptionData?.[consumptionType]?.housing
      : [],
    [ResourceConsumptionGraphType.Normative]: checked[consumptionType].normative
      ? consumptionData?.[consumptionType]?.normative
      : [],
    [ResourceConsumptionGraphType.Subscriber]: checked[consumptionType]
      .subscriber
      ? consumptionData?.[consumptionType]?.subscriber
      : [],
  };
};

const getCheckedConsumptionData = (
  consumptionData: ConsumptionDataForTwoMonth | null,
  checked: BooleanTypesOfResourceConsumptionGraphForTwoMonth,
) => {
  const checkedCurrentMonthConsumption = getCheckedCurrentMonthConsumption(
    consumptionData,
    checked,
    ResourceConsumptionGraphDataType.currentMonthData,
  );

  const checkedPrevMonthConsumption = getCheckedCurrentMonthConsumption(
    consumptionData,
    checked,
    ResourceConsumptionGraphDataType.prevMonthData,
  );

  const checkedAdditionalAddressConsumption = getCheckedCurrentMonthConsumption(
    consumptionData,
    checked,
    ResourceConsumptionGraphDataType.additionalAddress,
  );

  return {
    checkedCurrentMonthConsumption,
    checkedPrevMonthConsumption,
    checkedAdditionalAddressConsumption,
  };
};

export const prepareDataForMinMaxCalculation = (
  consumptionData: ConsumptionDataForTwoMonth | null,
  checked: BooleanTypesOfResourceConsumptionGraphForTwoMonth,
) => {
  const {
    checkedCurrentMonthConsumption,
    checkedPrevMonthConsumption,
    checkedAdditionalAddressConsumption,
  } = getCheckedConsumptionData(consumptionData, checked);

  const dataForMinMaxCalculation = [
    ...Object.values(checkedCurrentMonthConsumption),
    ...Object.values(checkedPrevMonthConsumption),
    ...Object.values(checkedAdditionalAddressConsumption),
  ].map(prepareData);

  return dataForMinMaxCalculation;
};

export const getIsOnlyHousingDataEmpty = (
  housingConsumptionData: ConsumptionDataForTwoMonth | null,
) => {

  if (
    !housingConsumptionData?.currentMonthData?.housing?.length &&
    (housingConsumptionData?.currentMonthData?.normative?.length ||
      housingConsumptionData?.currentMonthData?.subscriber?.length ||
      housingConsumptionData?.prevMonthData?.normative?.length ||
      housingConsumptionData?.prevMonthData?.subscriber?.length)
  ) {
    return true; //some
  } else return false;
};
