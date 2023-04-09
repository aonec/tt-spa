import { Pagination } from 'antd';
import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { APARTMENTS_LIST_PAGE_SIZE } from './individualDevicesViewByAddressService.constatnts';
import { individualDevicesViewByAddressService } from './individualDevicesViewByAddressService.model';
import { IndividualDevicesAddressSearch } from './view/IndividualDevicesAddressSearch';
import { IndividualDevicesApartmentsList } from './view/IndividualDevicesApartmentsList';
import { Wrapper } from './individualDevicesViewByAddressService.styled';

const { inputs, outputs, gates } = individualDevicesViewByAddressService;
const { IndividualDevicesSearchGate } = gates;

export const IndividualDevicesViewByAddressContainer = () => {
  const housingsByFilter = useStore(outputs.$housingsByFilter);
  const isHousingsByFilterLoading = useStore(
    outputs.$isHousingsByFilterLoading,
  );
  const individualDevicesApartmentsPagedData = useStore(
    outputs.$individualDevicesApartmentsPagedData,
  );
  const isIndividualDevicesApartmentsLoading = useStore(
    outputs.$isIndividualDevicesApartmentsLoading,
  );
  const filters = useStore(outputs.$individualDeviceSearchRequestPayload);
  const pageNumber = useStore(outputs.$pageNumber);
  const mountPlaces = useStore(outputs.$mountPlaces);

  const setIndividualDeviceSearchRequestPayload = useEvent(
    inputs.setIndividualDeviceSearchRequestPayload,
  );
  const updateSearchPayload = useEvent(inputs.updateSearchPayload);
  const clearSearchPayload = useEvent(inputs.clearSearchPayload);
  const setPageNumber = useEvent(inputs.setPageNumber);

  return (
    <Wrapper>
      <IndividualDevicesSearchGate />
      <IndividualDevicesAddressSearch
        clearSearchPayload={() => {
          clearSearchPayload();
        }}
        filters={filters}
        setIndividualDeviceSearchRequestPayload={
          setIndividualDeviceSearchRequestPayload
        }
        mountPlaces={mountPlaces}
      />
      <IndividualDevicesApartmentsList
        housingsByFilter={housingsByFilter}
        isLoading={
          isHousingsByFilterLoading || isIndividualDevicesApartmentsLoading
        }
        individualDevicesApartmentsList={
          individualDevicesApartmentsPagedData?.items
        }
        updateSearchPayload={updateSearchPayload}
      />
      {individualDevicesApartmentsPagedData && (
        <Pagination
          pageSize={APARTMENTS_LIST_PAGE_SIZE}
          total={individualDevicesApartmentsPagedData?.totalItems}
          current={pageNumber}
          onChange={setPageNumber}
          showSizeChanger={false}
        />
      )}
    </Wrapper>
  );
};
