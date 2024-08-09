import React, { useMemo } from 'react';
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
import { RunnerGeneratingModal } from './RunnerGeneratingModal';
import { RunnerDownloadModal } from './RunnerDownloadModal';

const {
  inputs,
  outputs,
  gates: { GetLastPollGate },
} = createRunnerService;
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
    handleDownloadFile,
    isDownloading,
    handleReset,
    stageNumber,
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
    handleDownloadFile: inputs.handleDownloadFile,
    isDownloading: outputs.$isDownloading,
    handleReset: inputs.handleReset,
    stageNumber: outputs.$stageNumber,
  });

  return (
    <>
      <GetLastPollGate />
      <ExistingCitiesGate />
      <OrganizationsGate />
      <HouseManagementsGate />
      <AddressesWithHouseManagementsGate />
      {stageNumber === 1 && (
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
      )}
      {stageNumber === 2 && (
        <RunnerGeneratingModal isOpen={isOpen} setOpen={setOpen} />
      )}
      {stageNumber === 3 && (
        <RunnerDownloadModal
          isOpen={isOpen}
          setOpen={setOpen}
          handleDownloadFile={handleDownloadFile}
          isDownloading={isDownloading}
          handleReset={handleReset}
        />
      )}
    </>
  );
};
