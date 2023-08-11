import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { closedIndividualDevicesFormService } from './closedIndividualDevicesFormService.model';
import { ClosedIndividualDevicesForm } from './view/ClosedIndividualDevicesForm';
import './closedIndividualDevicesFormService.relations';
import { prepareAddressesForTreeSelect } from 'ui-kit/shared/AddressTreeSelect/AddressTreeSelect.utils';
import { addressSearchService } from 'services/addressSearchService/addressSearchService.models';

const { ExistingCitiesGate } = addressSearchService.gates;

export const ClosedIndividualDevicesFormContainer = () => {
  const { inputs, outputs } = closedIndividualDevicesFormService;

  const unloadSelectType = useStore(outputs.$unloadSelectType);
  const selectedCity = useStore(outputs.$selectedCity);
  const exisitingCities = useStore(
    addressSearchService.outputs.$existingCities,
  );

  const setUnloadSelectType = useEvent(inputs.setUnloadSelectType);
  const selectCity = useEvent(inputs.selectCity);

  const addressesPagedList = useStore(outputs.$addressesPagedList);
  const organizationPagedList = useStore(outputs.$organizationPagedList);
  const houseManagementList = useStore(outputs.$houseManagementList);

  const preparedAddresses = prepareAddressesForTreeSelect({
    items: addressesPagedList?.items || [],
    isSelectableStreetNode: false,
    isTreeCheckable: false,
  });

  return (
    <>
      <ExistingCitiesGate />
      <ClosedIndividualDevicesForm
        unloadSelectType={unloadSelectType}
        setUnloadSelectType={setUnloadSelectType}
        preparedAddresses={preparedAddresses}
        organizationPagedList={organizationPagedList}
        houseManagementList={houseManagementList}
        selectedCity={selectedCity}
        existingCities={exisitingCities || []}
        selectCity={selectCity}
      />
    </>
  );
};
