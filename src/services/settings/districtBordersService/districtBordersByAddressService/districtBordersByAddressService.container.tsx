import React from 'react';
import { DistrictBordersByAddressPage } from './view/DistrictBordersByAddressPage/DistrictBordersByAddressPage';
import { districtBordersByAddressService } from './districtBordersByAddressService.model';
import { useEvent } from 'effector-react';

const { inputs, outputs } = districtBordersByAddressService;

export const DistrictBordersByAddressContainer = () => {
  const handleFetchAddress = useEvent(inputs.handleFetchAddress);

  return (
    <>
      <DistrictBordersByAddressPage handleFetchAddress={handleFetchAddress} />
    </>
  );
};
