import { createDomain, sample } from 'effector';
import {
  getAddresses,
  getHousingStocksWithCoordinates,
} from './districtBordersByAddressService.api';
import {
  HousingStockListResponsePagedList,
  StreetWithHousingStockNumbersResponse,
  StreetWithHousingStockNumbersResponsePagedList,
} from 'myApi';
import {
  CheckedHousingStocksIdWithStreets,
  CheckedHousingStocksIdWithStreetsHandler,
  FetchAddressQueryType,
  FilterType,
  HousingStocksIdsWithCoordinates,
} from './districtBordersByAddressService.types';
import { CreateDistrictBorderByMapService } from '../CreateDistrictBorderByMapService';
import { createGate } from 'effector-react';

const domain = createDomain('districtBordersByAddressService');

const DistrictBordersByAddressPageGate = createGate();

const pageResetter = domain.createEvent();

const handleOpenDistrictEditer = domain.createEvent();
const handleCloseDistrictEditer =
  CreateDistrictBorderByMapService.inputs.handleCloseDistrictEditer;

const handleCallEditByMap =
  CreateDistrictBorderByMapService.inputs.setSelectedHousingStocksIds;

const setPoligon = domain.createEvent<{
  housingStockIds: number[];
  polygon: number[][];
}>();

const handleFetchAddress = domain.createEvent<FetchAddressQueryType>();

const setFilter = domain.createEvent<FilterType>();

const setHousingStockIdsWithStreet =
  domain.createEvent<CheckedHousingStocksIdWithStreetsHandler>();

const fetchAddressFx = domain.createEffect<
  FetchAddressQueryType,
  StreetWithHousingStockNumbersResponsePagedList
>(getAddresses);

const fetchHousingStocksWithCoordinatesFx = domain.createEffect<
  {
    City?: string;
  },
  HousingStockListResponsePagedList
>(getHousingStocksWithCoordinates);

const $addresses = domain
  .createStore<StreetWithHousingStockNumbersResponse[] | null>(null)
  .on(fetchAddressFx.doneData, (_, addresses) => addresses.items);

const $filter = domain
  .createStore<FilterType | null>(null)
  .on(setFilter, (_, data) => data);

const $housingStocksWithCoordinates = domain
  .createStore<HousingStocksIdsWithCoordinates[]>([])
  .on(fetchHousingStocksWithCoordinatesFx.doneData, (_, housingStocks) =>
    housingStocks.items?.map((data) => ({
      id: data.id,
      coordinates: data.coordinates,
    })),
  );

const $checkedhousingStockIdsWithStreet = domain
  .createStore<CheckedHousingStocksIdWithStreets[]>([])
  .on(
    setHousingStockIdsWithStreet,
    (prevIdsWithStreet, commingIdsWithStreet) => {
      const street = commingIdsWithStreet.street;

      const isArray = Array.isArray(commingIdsWithStreet.housingStocksId);

      const housingStockByStreetIndex = prevIdsWithStreet.findIndex(
        (elem) => elem.street === street,
      );

      if (housingStockByStreetIndex === -1) {
        return [
          ...prevIdsWithStreet,
          {
            street: street ? street : 'unknown',
            housingStocksId: isArray
              ? commingIdsWithStreet.housingStocksId
              : ([commingIdsWithStreet.housingStocksId] as any),
          },
        ];
      } else {
        if (commingIdsWithStreet.isToAdd) {
          const clonePrevIdsWithStreet = prevIdsWithStreet.slice();

          clonePrevIdsWithStreet[housingStockByStreetIndex] = {
            street: street ? street : 'unknown',
            housingStocksId: isArray
              ? (commingIdsWithStreet.housingStocksId as any)
              : [
                  ...prevIdsWithStreet[housingStockByStreetIndex]
                    .housingStocksId,
                  commingIdsWithStreet.housingStocksId,
                ],
          };

          return clonePrevIdsWithStreet;
        }
        if (!commingIdsWithStreet.isToAdd) {
          const clonePrevIdsWithStreet = prevIdsWithStreet.slice();

          clonePrevIdsWithStreet[housingStockByStreetIndex] = {
            street: street ? street : 'unknown',
            housingStocksId: isArray
              ? []
              : prevIdsWithStreet[
                  housingStockByStreetIndex
                ].housingStocksId.filter(
                  (housingStockId) =>
                    housingStockId !== commingIdsWithStreet.housingStocksId,
                ),
          };
          return clonePrevIdsWithStreet;
        }
      }
    },
  )
  .reset(pageResetter);

const $checkedHousingStockIdsAndPoligon = domain
  .createStore<{
    housingStockIds: number[];
    polygon: number[][];
  }>({ housingStockIds: [], polygon: [] })
  .on(setPoligon, (_, data) => data);

const $onEditingInMap = domain
  .createStore<boolean>(false)
  .on(handleOpenDistrictEditer, () => true)
  .on(handleCloseDistrictEditer, () => false);

sample({
  clock: DistrictBordersByAddressPageGate.close,
  source: $onEditingInMap,
  filter: (inMap) => {
    return !inMap;
  },
  target: pageResetter,
});

sample({
  clock: handleFetchAddress,
  target: fetchAddressFx,
});

sample({
  clock: fetchAddressFx.doneData,
  source: $filter,
  fn: (data) => ({ City: data?.city }),
  target: fetchHousingStocksWithCoordinatesFx,
});

sample({
  clock: handleOpenDistrictEditer,
  source: $checkedHousingStockIdsAndPoligon,
  target: handleCallEditByMap,
});

export const districtBordersByAddressService = {
  inputs: {
    handleFetchAddress,
    setFilter,
    setHousingStockIdsWithStreet,
    handleOpenDistrictEditer,
    setPoligon,
  },
  outputs: {
    $addresses,
    $filter,
    $housingStocksWithCoordinates,
    $checkedhousingStockIdsWithStreet,
  },
  gates: { DistrictBordersByAddressPageGate },
};
