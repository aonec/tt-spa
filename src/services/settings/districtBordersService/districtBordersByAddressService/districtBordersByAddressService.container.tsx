import React, { useEffect, useMemo } from 'react';
import { DistrictBordersByAddressPage } from './view/DistrictBordersByAddressPage/DistrictBordersByAddressPage';
import { districtBordersByAddressService } from './districtBordersByAddressService.model';
import { useEvent, useStore } from 'effector-react';
import { StreetWithHousingStockNumbersResponse } from 'myApi';

const { inputs, outputs } = districtBordersByAddressService;

export const DistrictBordersByAddressContainer = () => {
  const handleFetchAddress = useEvent(inputs.handleFetchAddress);
  const setFilter = useEvent(inputs.setFilter);

  const addresses = useStore(outputs.$addresses);
  const filterData = useStore(outputs.$filter);

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
      />
    </>
  );
};
