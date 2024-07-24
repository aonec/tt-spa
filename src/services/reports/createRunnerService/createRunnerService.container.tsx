import React from 'react';
import { createRunnerService } from './createRunnerService.models';
import { CreateRunnerModal } from './CreateRunnerModal';
import { useUnit } from 'effector-react';
import { addressSearchService } from 'services/addressSearchService/addressSearchService.models';
import {
  organizationsQuery,
  organizationsService,
} from 'services/organizations';
import { houseManagementsService } from 'services/objects/houseManagementsService';
import { reportViewService } from 'services/reportsService/reportViewService';

const { inputs, outputs } = createRunnerService;
const {
  gates: { OrganizationsGate },
} = organizationsService;
const {
  gates: { ExistingCitiesGate },
} = addressSearchService;
const {
  gates: { HouseManagementsGate },
} = houseManagementsService;
const {
  gates: { AddressesWithHouseManagementsGate },
} = reportViewService;

export const CreateRunnerContainer = () => {
  const {
    existingCities,
    organizations,
    houseManagements,
    addressesWithHouseManagements,
    isOpen,
    setOpen,
    handleGenerateReport,
    isGenerating,
  } = useUnit({
    existingCities: addressSearchService.outputs.$existingCities,
    organizations: organizationsQuery.$data,
    houseManagements: houseManagementsService.outputs.$houseManagements,
    addressesWithHouseManagements:
      reportViewService.outputs.$addressesWithHouseManagements,
    setOpen: inputs.setOpen,
    isOpen: outputs.$isOpen,
    isGenerating: outputs.$isGenerating,
    handleGenerateReport: inputs.handleGenerateReport,
  });

  console.log({
    existingCities,
    organizations,
    houseManagements,
    addressesWithHouseManagements,
    isOpen,
    setOpen,
  });

  return (
    <>
      <ExistingCitiesGate />
      <OrganizationsGate />
      <HouseManagementsGate />
      <AddressesWithHouseManagementsGate />
      <CreateRunnerModal
        existingCities={existingCities}
        organizations={organizations}
        houseManagements={houseManagements}
        addressesWithHouseManagements={addressesWithHouseManagements}
        isOpen={isOpen}
        setOpen={setOpen}
        isGenerating={isGenerating}
        handleGenerateReport={handleGenerateReport}
      />
    </>
  );
};
