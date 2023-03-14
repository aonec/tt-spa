import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { closedIndividualDevicesFormService } from './closedIndividualDevicesFormService.model';
import { ClosedIndividualDevicesForm } from './view/ClosedIndividualDevicesForm';
import './closedIndividualDevicesFormService.relations';
import {
  $existingCities,
  ExistingCitiesGate,
} from '01/features/housingStocks/displayHousingStockCities/models';
import { prepareAddressesForTreeSelect } from 'ui-kit/shared_components/AddressTreeSelect/AddressTreeSelect.utils';

export const ClosedIndividualDevicesFormContainer = () => {
  const { inputs, outputs } = closedIndividualDevicesFormService;

  const unloadSelectType = useStore(outputs.$unloadSelectType);
  const selectedCity = useStore(outputs.$selectedCity);
  const exisitingCities = useStore($existingCities);

  const setUnloadSelectType = useEvent(inputs.setUnloadSelectType);
  const selectCity = useEvent(inputs.selectCity);

  const addressesPagedList = useStore(outputs.$addressesPagedList);
  const organizationPagedList = useStore(outputs.$organizationPagedList);
  const houseManagementList = useStore(outputs.$houseManagementList);

  const preparedAddresses = prepareAddressesForTreeSelect({
    items: addressesPagedList?.items || [],
    isSelectableStreetNode: false,
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
