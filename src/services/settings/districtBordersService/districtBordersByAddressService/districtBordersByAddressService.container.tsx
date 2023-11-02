import React, { useEffect, useMemo } from 'react';
import { useUnit } from 'effector-react';
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
  const { data: housingStocksWithCoordinates } = useUnit(
    existingHousingStocksQuery,
  );
  const { isLoading } = useUnit({
    isLoading: outputs.$isLoading,
  });

  const {
    checkedhousingStockIdsWithStreet,
    filterData,
    addresses,
    setPoligon,
    handleOpenDistrictEditer,
    setHousingStockIdsWithStreet,
    setFilter,
    handleFetchAddress,
  } = useUnit({
    checkedhousingStockIdsWithStreet: outputs.$checkedhousingStockIdsWithStreet,
    filterData: outputs.$filter,
    addresses: outputs.$addresses,
    setPoligon: inputs.setPoligon,
    handleOpenDistrictEditer: inputs.handleOpenDistrictEditer,
    setHousingStockIdsWithStreet: inputs.setHousingStockIdsWithStreet,
    setFilter: inputs.setFilter,
    handleFetchAddress: inputs.handleFetchAddress,
  });

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
        handleFetchAddress={handleFetchAddress}
        addresses={filteredAddress}
        setFilter={setFilter}
        setHousingStockIdsWithStreet={setHousingStockIdsWithStreet}
        checkedhousingStockIdsWithStreet={checkedhousingStockIdsWithStreet}
        handleOpenDistrictEditer={handleOpenDistrictEditer}
        isAllowedToEditer={isAllowedToEditer}
        cityInFilter={cityInFilter}
        isLoading={isLoading}
      />
    </>
  );
};
