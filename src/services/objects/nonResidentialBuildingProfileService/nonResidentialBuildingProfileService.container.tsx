import React from 'react';
import { nonResidentialBuildingProfileService } from './nonResidentialBuildingProfileService.model';
import { useParams } from 'react-router-dom';
import { nonResidentialBuildingQuery } from './nonResidentialBuildingProfileService.api';
import { useUnit } from 'effector-react';
import { WithLoader } from 'ui-kit/shared_components/WithLoader';
import { NonResidentialBuildingProfile } from './view/NonResidentialBuildingProfile';
import { usePermission } from 'hooks/usePermission';
import { ESecuredIdentityRoleName } from 'myApi';
import { ConsolidatedReportContainer } from '../housingStockProfileService/consolidatedReportService';

const { inputs, outputs, gates } = nonResidentialBuildingProfileService;
const { BuildingIdGate } = gates;

export const NonResidentialBuildingProfileContainer = () => {
  const { buildingId } = useParams<{ buildingId: string }>();

  const {
    currentGrouptype,
    isLoading,
    nonResidentialBuilding,
    setGrouptype,
    openConsolidatedReportModal,
  } = useUnit({
    isLoading: nonResidentialBuildingQuery.$pending,
    nonResidentialBuilding: nonResidentialBuildingQuery.$data,
    currentGrouptype: outputs.$currentGrouptype,
    setGrouptype: inputs.setCurrentGroutype,
    openConsolidatedReportModal: inputs.openConsolidatedReportModal,
  });

  const isPermitionToAddNode = usePermission([
    ESecuredIdentityRoleName.Administrator,
    ESecuredIdentityRoleName.ManagingFirmExecutor,
  ]);
  const isPermitionToDownloadConsolidatedReport = usePermission([
    ESecuredIdentityRoleName.Administrator,
    ESecuredIdentityRoleName.ManagingFirmExecutor,
    ESecuredIdentityRoleName.ManagingFirmSpectator,
    ESecuredIdentityRoleName.ManagingFirmSpectatorRestricted,
  ]);
  const isPermissionToEditHousingStock = usePermission([
    ESecuredIdentityRoleName.Administrator,
  ]);

  return (
    <>
      <BuildingIdGate buildingId={Number(buildingId)} />
      {nonResidentialBuilding && (
        <ConsolidatedReportContainer building={nonResidentialBuilding} />
      )}

      <WithLoader isLoading={isLoading}>
        <NonResidentialBuildingProfile
          currentGrouptype={currentGrouptype}
          setGrouptype={setGrouptype}
          nonResidentialBuilding={nonResidentialBuilding}
          isPermitionToAddNode={isPermitionToAddNode}
          isPermitionToDownloadConsolidatedReport={
            isPermitionToDownloadConsolidatedReport
          }
          isPermissionToEditHousingStock={isPermissionToEditHousingStock}
          openConsolidatedReportModal={openConsolidatedReportModal}
        />
      </WithLoader>
    </>
  );
};
