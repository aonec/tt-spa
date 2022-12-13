import _ from 'lodash';
import moment from 'moment';
import {
  DateTimeDoubleDictionaryItem,
  StreetWithHousingStockNumbersResponse,
} from 'myApi';

export const prepareDataForConsumptionGraph = (
  dataArr: DateTimeDoubleDictionaryItem[]
) => {
  if (!dataArr.length) {
    return [];
  }
  const startOfMonth = moment(dataArr[0].key).startOf('month');

  return dataArr.map((elem) => ({
    ...elem,
    key: String(moment(elem.key).diff(startOfMonth, 'day') + 1),
  }));
};

export const getAddressSearchData = (
  data: StreetWithHousingStockNumbersResponse[] | null
) =>
  _.uniqBy(
    (data || []).reduce((acc, elem) => {
      const addresses =
        elem.addresses?.map((address) => ({
          id: address.housingStockId,
          addressString: `ул. ${elem.street}, д. ${address.housingStockNumber}`,
        })) || [];

      return [...acc, ...addresses];
    }, [] as { id: number; addressString: string }[]),
    'addressString'
  );
