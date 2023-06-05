import React, { useEffect, useMemo } from 'react';
import { useEvent, useStore } from 'effector-react';
import { StreetWithHousingStockNumbersResponse } from 'myApi';
import { DistrictBordersByAddressPage } from './view/DistrictBordersByAddressPage/DistrictBordersByAddressPage';
import { districtBordersByAddressService } from './districtBordersByAddressService.model';
import { getBorderPoints } from './districtBordersByAddressService.utils';

const { inputs, outputs } = districtBordersByAddressService;

export const DistrictBordersByAddressContainer = () => {
  const handleFetchAddress = useEvent(inputs.handleFetchAddress);
  const setFilter = useEvent(inputs.setFilter);
  const setHousingStockIds = useEvent(inputs.setHousingStockIds);
  const handleOpenDistrictEditer = useEvent(inputs.handleOpenDistrictEditer);
  const setPoligon = useEvent(inputs.setPoligon);

  const addresses = useStore(outputs.$addresses);
  const housingStocksWithCoordinates = useStore(
    outputs.$housingStocksWithCoordinates,
  );
  const filterData = useStore(outputs.$filter);
  const checkedhousingStockIdsWithStreet = useStore(
    outputs.$checkedhousingStockIdsWithStreet,
  );

  const checkedhousingStockIds = checkedhousingStockIdsWithStreet.reduce(
    (acc, current) => [...acc, ...current.housingStocksId],
    [] as number[],
  );

  const isAllowedToEditer = checkedhousingStockIds.length > 2;

  const checkedHousingStockCoordinates = housingStocksWithCoordinates
    .filter((housingStock) => {
      return checkedhousingStockIds.some((checkedHousingStockId) => {
        return checkedHousingStockId === housingStock.id;
      });
    })
    .map((housingStock) => housingStock.coordinates);

  useEffect(() => {
    const borderCoordinates = getBorderPoints(
      checkedHousingStockCoordinates,
    ).map((data) => [data.latitude, data.longitude]);

    setPoligon({
      housingStockIds: checkedhousingStockIds,
      polygon: borderCoordinates,
    });
  }, [checkedHousingStockCoordinates]);

  const filteredAddress =
    useMemo(() => {
      if (!addresses) return [];
      if (!filterData) return addresses;
      if (!filterData.street) return addresses;

      if (!filterData.corpus && !filterData.house) {
        return (
          addresses?.filter(
            (address) => address.street === filterData.street,
          ) || []
        );
      }

      if (filterData.corpus || filterData.house) {
        const filteredByStreetAddress = addresses?.filter(
          (address) => address.street === filterData.street,
        );

        const filteredHouses = filteredByStreetAddress[0].addresses?.filter(
          (address) => {
            if (!filterData.corpus) {
              return address.housingStockNumber === filterData.house;
            }
            if (!filterData.house) {
              return address.housingStockCorpus === filterData.corpus;
            }
            if (filterData.house && filterData.corpus) {
              return (
                address.housingStockCorpus === filterData.corpus &&
                address.housingStockNumber === filterData.house
              );
            }
            return true;
          },
        );

        return [
          {
            street: filteredByStreetAddress[0].street,
            addresses: filteredHouses,
          },
        ] as StreetWithHousingStockNumbersResponse[];
      }
    }, [addresses, filterData]) || [];

  return (
    <>
      <DistrictBordersByAddressPage
        handleFetchAddress={handleFetchAddress}
        addresses={filteredAddress}
        setFilter={setFilter}
        setHousingStockIds={setHousingStockIds}
        checkedhousingStockIdsWithStreet={checkedhousingStockIdsWithStreet}
        handleOpenDistrictEditer={handleOpenDistrictEditer}
        isAllowedToEditer={isAllowedToEditer}
      />
    </>
  );
};
