import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { individualDevicesViewByAddressService } from './individualDevicesViewByAddressService.model';
import { IndividualDevicesAddressSearch } from './view/IndividualDevicesAddressSearch';
import { IndividualDevicesApartmentsList } from './view/IndividualDevicesApartmentsList';

const { inputs, outputs, gates } = individualDevicesViewByAddressService;
const { IndividualDevicesSearchGate } = gates;

export const IndividualDevicesViewByAddressContainer = () => {
  const housingsByFilter = useStore(outputs.$housingsByFilter);
  const isHousingsByFilterLoading = useStore(
    outputs.$isHousingsByFilterLoading
  );

  const setIndividualDeviceSearchRquestPayload = useEvent(
    inputs.setIndividualDeviceSearchRquestPayload
  );

  return (
    <>
      <IndividualDevicesSearchGate />
      <IndividualDevicesAddressSearch
        setIndividualDeviceSearchRquestPayload={
          setIndividualDeviceSearchRquestPayload
        }
      />
      <IndividualDevicesApartmentsList
        housingsByFilter={housingsByFilter}
        isLoading={isHousingsByFilterLoading}
      />
    </>
  );
};
