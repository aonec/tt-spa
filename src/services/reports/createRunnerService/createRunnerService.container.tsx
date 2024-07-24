import React from 'react';
import { createRunnerService } from './createRunnerService.models';
import { CreateRunnerModal } from './CreateRunnerModal';
import { useUnit } from 'effector-react';
import { addressSearchService } from 'services/addressSearchService/addressSearchService.models';
import { organizationsQuery } from 'services/organizations';
import { houseManagementsService } from 'services/objects/houseManagementsService';
import { reportViewService } from 'services/reportsService/reportViewService';

const { inputs, outputs } = createRunnerService;

export const CreateRunnerContainer = () => {
  const {
    existingCities,
    organizations,
    houseManagements,
    addressesWithHouseManagements,
    isOpen,
    setOpen,
  } = useUnit({
    existingCities: addressSearchService.outputs.$existingCities,
    organizations: organizationsQuery.$data,
    houseManagements: houseManagementsService.outputs.$houseManagements,
    addressesWithHouseManagements:
      reportViewService.outputs.$addressesWithHouseManagements,
    setOpen: inputs.setOpen,
    isOpen: outputs.$isOpen,
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
    <CreateRunnerModal
      existingCities={existingCities}
      organizations={organizations}
      houseManagements={houseManagements}
      addressesWithHouseManagements={addressesWithHouseManagements}
      isOpen={isOpen}
      setOpen={setOpen}
    />
  );
};
