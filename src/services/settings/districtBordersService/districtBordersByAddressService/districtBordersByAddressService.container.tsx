import React, { useEffect, useMemo } from 'react';
import { useEvent, useStore, useUnit } from 'effector-react';
import { DistrictBordersByAddressPage } from './view/DistrictBordersByAddressPage/DistrictBordersByAddressPage';
import { districtBordersByAddressService } from './districtBordersByAddressService.model';
import {
  getConvexHull,
  getFilteredAddresses,
} from './districtBordersByAddressService.utils';
import { existingHousingStocksQuery } from '../createDistrictBorderMapService/createDistrictBorderMapService.api';

const {
  inputs,
  outputs,
  gates: { DistrictBordersByAddressPageGate },
} = districtBordersByAddressService;

export const DistrictBordersByAddressContainer = () => {
  const selectCity = useEvent(inputs.selectCity);
  const setFilter = useEvent(inputs.setFilter);
  const setHousingStockIdsWithStreet = useEvent(
    inputs.setHousingStockIdsWithStreet,
  );
  const handleOpenDistrictEditer = useEvent(inputs.handleOpenDistrictEditer);
  const setPoligon = useEvent(inputs.setPoligon);

  const addresses = useStore(outputs.$addresses);
  const filterData = useStore(outputs.$filter);
  const checkedhousingStockIdsWithStreet = useStore(
    outputs.$checkedhousingStockIdsWithStreet,
  );
  const { data: housingStocksWithCoordinates } = useUnit(
    existingHousingStocksQuery,
  );

  const cityInFilter = filterData?.city;

  const checkedhousingStockIds = checkedhousingStockIdsWithStreet.reduce(
    (acc, current) => [...acc, ...current.housingStocksId],
    [] as number[],
  );

  const isAllowedToEditer = checkedhousingStockIds.length > 2;

  const checkedHousingStockCoordinates = useMemo(
    () =>
      housingStocksWithCoordinates?.items
        ?.filter((housingStock) =>
          checkedhousingStockIds.includes(housingStock.id),
        )
        .flatMap((housingStock) =>
          housingStock.coordinates
            ? [
                {
                  latitude: housingStock.coordinates.latitude,
                  longitude: housingStock.coordinates.longitude,
                },
              ]
            : [],
        ) || [],
    [housingStocksWithCoordinates, checkedhousingStockIds],
  );

  useEffect(() => {
    const borderCoordinates = getConvexHull(checkedHousingStockCoordinates).map(
      (data) => [data.latitude, data.longitude],
    );

    setPoligon({
      housingStockIds: checkedhousingStockIds,
      polygon: borderCoordinates,
    });
  }, [checkedHousingStockCoordinates, checkedhousingStockIds, setPoligon]);

  const filteredAddress =
    useMemo(() => {
      return getFilteredAddresses(addresses, filterData);
    }, [addresses, filterData]) || [];

  return (
    <>
      <DistrictBordersByAddressPageGate />
      <DistrictBordersByAddressPage
        selectCity={selectCity}
        addresses={filteredAddress}
        setFilter={setFilter}
        setHousingStockIdsWithStreet={setHousingStockIdsWithStreet}
        checkedhousingStockIdsWithStreet={checkedhousingStockIdsWithStreet}
        handleOpenDistrictEditer={handleOpenDistrictEditer}
        isAllowedToEditer={isAllowedToEditer}
        cityInFilter={cityInFilter}
      />
    </>
  );
};
