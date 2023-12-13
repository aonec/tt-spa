import React, { FC } from 'react';
import { addressIdSearchService } from './addressIdSearchService.model';
import { useUnit } from 'effector-react';
import { AddressIdSearchContainerProps } from './addressIdSearchService.types';
import { AddressIdSearch } from './view/AddressIdSearch';

const { inputs, outputs } = addressIdSearchService;

export const AddressIdSearchContainer: FC<AddressIdSearchContainerProps> = ({
  onEnter,
  dataKey,
}) => {
  const {
    addressFilter,
    getApartmentId,
    isError,
    isLoading,
    isSuccess,
    setAddress,
  } = useUnit({
    isSuccess: outputs.$isSuccess,
    isError: outputs.$isError,
    isLoading: outputs.$isLoading,
    addressFilter: outputs.$searchAddressFilter,
    getApartmentId: inputs.getApartmentSearchId,
    setAddress: inputs.setAddress,
  });

  return (
    <AddressIdSearch
      dataKey={dataKey}
      getApartmentId={getApartmentId}
      addressFilter={addressFilter}
      setAddress={setAddress}
      isSuccess={isSuccess}
      isError={isError}
      isLoading={isLoading}
      onEnter={onEnter}
    />
  );
};
