import React, { FC } from 'react';
import { addressIdSearchService } from './addressIdSearchService.model';
import { useEvent, useStore } from 'effector-react';
import { AddressIdSearchContainerProps } from './addressIdSearchService.types';
import { AddressIdSearch } from './view/AddressIdSearch';

const { inputs, outputs } = addressIdSearchService;

export const AddressIdSearchContainer: FC<AddressIdSearchContainerProps> = ({
  onEnter,
  dataKey,
}) => {
  const isSuccess = useStore(outputs.$isSuccess);
  const isError = useStore(outputs.$isError);
  const isLoading = useStore(outputs.$isLoading);
  const addressFilter = useStore(outputs.$searchAddressFilter);

  const getApartmentId = useEvent(inputs.getApartmentSearchId);
  const setAddress = useEvent(inputs.setAddress);

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
