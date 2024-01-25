import { Pagination } from 'antd';
import { useUnit } from 'effector-react';
import React, { FC } from 'react';
import { APARTMENTS_LIST_PAGE_SIZE } from './individualDevicesViewByAddressService.constatnts';
import { individualDevicesViewByAddressService } from './individualDevicesViewByAddressService.model';
import { IndividualDevicesAddressSearch } from './view/IndividualDevicesAddressSearch';
import { IndividualDevicesApartmentsList } from './view/IndividualDevicesApartmentsList';
import { Wrapper } from './individualDevicesViewByAddressService.styled';
import { HeaderInject } from 'services/objects/objectsProfileService/view/ObjectsProfile/ObjectsProfile.types';

const { inputs, outputs, gates } = individualDevicesViewByAddressService;
const { IndividualDevicesSearchGate } = gates;

export const IndividualDevicesViewByAddressContainer: FC<HeaderInject> = ({
  Header,
}) => {
  const {
    clearSearchPayload,
    filters,
    housingsByFilter,
    individualDevicesApartmentsPagedData,
    isHousingsByFilterLoading,
    isIndividualDevicesApartmentsLoading,
    mountPlaces,
    pageNumber,
    setIndividualDeviceSearchRequestPayload,
    setPageNumber,
    updateSearchPayload,
  } = useUnit({
    housingsByFilter: outputs.$housingsByFilter,
    isHousingsByFilterLoading: outputs.$isHousingsByFilterLoading,
    individualDevicesApartmentsPagedData:
      outputs.$individualDevicesApartmentsPagedData,
    isIndividualDevicesApartmentsLoading:
      outputs.$isIndividualDevicesApartmentsLoading,
    filters: outputs.$individualDeviceSearchRequestPayload,
    pageNumber: outputs.$pageNumber,
    mountPlaces: outputs.$mountPlaces,
    setIndividualDeviceSearchRequestPayload:
      inputs.setIndividualDeviceSearchRequestPayload,
    updateSearchPayload: inputs.updateSearchPayload,
    clearSearchPayload: inputs.clearSearchPayload,
    setPageNumber: inputs.setPageNumber,
  });

  return (
    <Wrapper>
      <IndividualDevicesSearchGate />
      <Header>
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
      </Header>
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
