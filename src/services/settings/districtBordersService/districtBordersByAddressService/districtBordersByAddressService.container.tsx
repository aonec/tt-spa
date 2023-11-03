import React, { useEffect, useMemo } from 'react';
import { useUnit } from 'effector-react';
import { DistrictBordersByAddressPage } from './view/DistrictBordersByAddressPage/DistrictBordersByAddressPage';
import { districtBordersByAddressService } from './districtBordersByAddressService.model';
import {
  getConvexHull,
  getFilteredAddresses,
} from './districtBordersByAddressService.utils';
import { existingHousingStocksQuery } from '../createDistrictBorderMapService/createDistrictBorderMapService.api';
import {
  ShowSelectedAddressesContainer,
  showSelectedAddressesService,
} from '../showSelectedAddressesService';

const { inputs, outputs } = districtBordersByAddressService;

export const DistrictBordersByAddressContainer = () => {
  const {
    addresses,
    checkedhousingStockIdsWithStreet,
    filterData,
    handleOpenDistrictEditer,
    selectCity,
    setFilter,
    setHousingStockIdsWithStreet,
    setPoligon,
    openShowAddressesModal,
    isLoading,
  } = useUnit({
    selectCity: inputs.selectCity,
    setFilter: inputs.setFilter,
    setHousingStockIdsWithStreet: inputs.setHousingStockIdsWithStreet,
    handleOpenDistrictEditer: inputs.handleOpenDistrictEditer,
    setPoligon: inputs.setPoligon,
    addresses: outputs.$addresses,
    filterData: outputs.$filter,
    checkedhousingStockIdsWithStreet: outputs.$checkedhousingStockIdsWithStreet,
    openShowAddressesModal: showSelectedAddressesService.inputs.openModal,
    isLoading: outputs.$isLoading,
  });

  const { data: housingStocksWithCoordinates } = useUnit(
    existingHousingStocksQuery,
  );

  const checkedhousingStockIds = checkedhousingStockIdsWithStreet.flatMap(
    (current) => current.addresses.map((elem) => elem.buildingId),
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
      <ShowSelectedAddressesContainer />
      <DistrictBordersByAddressPage
        selectCity={selectCity}
        addresses={filteredAddress}
        setFilter={setFilter}
        setHousingStocksWithStreet={setHousingStockIdsWithStreet}
        checkedhousingStocksWithStreet={checkedhousingStockIdsWithStreet}
        handleOpenDistrictEditer={handleOpenDistrictEditer}
        isAllowedToEditer={isAllowedToEditer}
        filter={filterData}
        openShowAddressesModal={() =>
          openShowAddressesModal(checkedhousingStockIdsWithStreet)
        }
        checkedAddressesAmount={checkedhousingStockIds.length}
        isLoading={isLoading}
      />
    </>
  );
};
