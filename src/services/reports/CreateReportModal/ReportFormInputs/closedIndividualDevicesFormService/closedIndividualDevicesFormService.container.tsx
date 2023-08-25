import { useUnit } from 'effector-react';
import React from 'react';
import { closedIndividualDevicesFormService } from './closedIndividualDevicesFormService.model';
import { ClosedIndividualDevicesForm } from './view/ClosedIndividualDevicesForm';
import './closedIndividualDevicesFormService.relations';
import { prepareAddressesForTreeSelect } from 'ui-kit/shared/AddressTreeSelect/AddressTreeSelect.utils';
import { addressSearchService } from 'services/addressSearchService/addressSearchService.models';

const { ExistingCitiesGate } = addressSearchService.gates;
const { inputs, outputs } = closedIndividualDevicesFormService;

export const ClosedIndividualDevicesFormContainer = () => {
  const {
    houseManagementList,
    addressesPagedList,
    organizationPagedList,
    handleFetchHousingStockData,
    selectCity,
    setUnloadSelectType,
    exisitingCities,
    selectedCity,
    unloadSelectType,
  } = useUnit({
    houseManagementList: outputs.$houseManagementList,
    organizationPagedList: outputs.$organizationPagedList,
    addressesPagedList: outputs.$addressesPagedList,
    handleFetchHousingStockData: inputs.handleFetchHousingStockData,
    selectCity: inputs.selectCity,
    setUnloadSelectType: inputs.setUnloadSelectType,
    exisitingCities: addressSearchService.outputs.$existingCities,
    selectedCity: outputs.$selectedCity,
    unloadSelectType: outputs.$unloadSelectType,
  });

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
        handleFetchHousingStockData={handleFetchHousingStockData}
      />
    </>
  );
};
