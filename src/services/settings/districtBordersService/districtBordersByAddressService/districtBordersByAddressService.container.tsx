import React, { useEffect, useMemo } from 'react';
import { useEvent, useStore } from 'effector-react';
import { DistrictBordersByAddressPage } from './view/DistrictBordersByAddressPage/DistrictBordersByAddressPage';
import { districtBordersByAddressService } from './districtBordersByAddressService.model';
import {
  getConvexHull,
  getFilteredAddresses,
} from './districtBordersByAddressService.utils';

const {
  inputs,
  outputs,
  gates: { DistrictBordersByAddressPageGate },
} = districtBordersByAddressService;

export const DistrictBordersByAddressContainer = () => {
  const handleFetchAddress = useEvent(inputs.handleFetchAddress);
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
  const housingStocksWithCoordinates = useStore(
    outputs.$housingStocksWithCoordinates,
  );

  const cityInFilter = filterData?.city;

  const checkedhousingStockIds = checkedhousingStockIdsWithStreet.reduce(
    (acc, current) => [...acc, ...current.housingStocksId],
    [] as number[],
  );

  const isAllowedToEditer = checkedhousingStockIds.length > 2;

  const checkedHousingStockCoordinates =
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
      ) || [];

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
      />
    </>
  );
};
