import React from 'react';
import { DistrictBordersByAddressPage } from './view/DistrictBordersByAddressPage/DistrictBordersByAddressPage';
import { districtBordersByAddressService } from './districtBordersByAddressService.model';
import { useEvent, useStore } from 'effector-react';

const { inputs, outputs } = districtBordersByAddressService;

export const DistrictBordersByAddressContainer = () => {
  const handleFetchAddress = useEvent(inputs.handleFetchAddress);

  const addresses = useStore(outputs.$addresses);

  return (
    <>
      <DistrictBordersByAddressPage
        handleFetchAddress={handleFetchAddress}
        addresses={addresses}
      />
    </>
  );
};
