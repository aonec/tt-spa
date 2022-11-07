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
    outputs.$isHousingsByFilterLoading
  );
  const individualDevicesApartmentsPagedData = useStore(
    outputs.$individualDevicesApartmentsPagedData
  );
  const isIndividualDevicesApartmentsLoading = useStore(
    outputs.$isIndividualDevicesApartmentsLoading
  );

  const setIndividualDeviceSearchRquestPayload = useEvent(
    inputs.setIndividualDeviceSearchRquestPayload
  );

  return (
    <Wrapper>
      <IndividualDevicesSearchGate />
      <IndividualDevicesAddressSearch
        setIndividualDeviceSearchRquestPayload={
          setIndividualDeviceSearchRquestPayload
        }
      />
      <IndividualDevicesApartmentsList
        housingsByFilter={housingsByFilter}
        isLoading={
          isHousingsByFilterLoading || isIndividualDevicesApartmentsLoading
        }
        individualDevicesApartmentsList={
          individualDevicesApartmentsPagedData?.items
        }
      />
      {individualDevicesApartmentsPagedData && (
        <Pagination
          pageSize={APARTMENTS_LIST_PAGE_SIZE}
          total={individualDevicesApartmentsPagedData?.totalItems}
          current={1}
          showSizeChanger={false}
        />
      )}
    </Wrapper>
  );
};
