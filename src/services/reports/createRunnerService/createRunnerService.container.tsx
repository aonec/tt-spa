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
    isGeneratingDone,
    handleDownloadFile,
    isDownloading,
  } = useUnit({
    existingCities: addressSearchService.outputs.$existingCities,
    organizations: organizationsQuery.$data,
    houseManagements: houseManagementsService.outputs.$houseManagements,
    addressesWithHouseManagements:
      reportViewService.outputs.$addressesWithHouseManagements,
    setOpen: inputs.setOpen,
    isOpen: outputs.$isOpen,
    isGenerating: outputs.$isGenerating,
    isGeneratingDone: outputs.$isGeneratingDone,
    handleGenerateReport: inputs.handleGenerateReport,
    handleDownloadFile: inputs.handleDownloadFile,
    isDownloading: outputs.$isDownloading,
  });

  let computedStageNumber: number = useMemo(() => {
    if (!isGenerating && !isGeneratingDone) {
      return 1;
    }
    if (isGenerating) {
      return 2;
    }
    if (isGeneratingDone) {
      return 3;
    }
    return 1;
  }, [isGenerating, isGeneratingDone]);

  return (
    <>
      <GetLastPollGate />
      <ExistingCitiesGate />
      <OrganizationsGate />
      <HouseManagementsGate />
      <AddressesWithHouseManagementsGate />
      {computedStageNumber === 1 && (
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
      {computedStageNumber === 2 && (
        <RunnerGeneratingModal isOpen={isOpen} setOpen={setOpen} />
      )}
      {computedStageNumber === 3 && (
        <RunnerDownloadModal
          isOpen={isOpen}
          setOpen={setOpen}
          handleDownloadFile={handleDownloadFile}
          isDownloading={isDownloading}
        />
      )}
    </>
  );
};
