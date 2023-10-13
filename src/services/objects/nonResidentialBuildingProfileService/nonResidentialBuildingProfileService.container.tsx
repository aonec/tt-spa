import React, { useCallback } from 'react';
import { nonResidentialBuildingProfileService } from './nonResidentialBuildingProfileService.model';
import { useHistory, useParams } from 'react-router-dom';
import {
  nonResidentialBuildingQuery,
  resourceDisconnectionQuery,
} from './nonResidentialBuildingProfileService.api';
import { useUnit } from 'effector-react';
import { WithLoader } from 'ui-kit/shared/WithLoader';
import { NonResidentialBuildingProfile } from './view/NonResidentialBuildingProfile';
import { usePermission } from 'hooks/usePermission';
import { ESecuredIdentityRoleName } from 'api/types';
import { ConsolidatedReportContainer } from '../housingStockProfileService/consolidatedReportService';
import { NonResidentialBuildingProfileGrouptype } from './nonResidentialBuildingProfileService.constants';

const { inputs, gates } = nonResidentialBuildingProfileService;
const { BuildingIdGate } = gates;

export const NonResidentialBuildingProfileContainer = () => {
  const { buildingId, section } = useParams<{
    buildingId: string;
    section?: NonResidentialBuildingProfileGrouptype;
  }>();
  const history = useHistory();

  const {
    isLoading,
    nonResidentialBuilding,
    openConsolidatedReportModal,
    resourceDisconnections,
  } = useUnit({
    isLoading: nonResidentialBuildingQuery.$pending,
    nonResidentialBuilding: nonResidentialBuildingQuery.$data,
    resourceDisconnections: resourceDisconnectionQuery.$data,
    openConsolidatedReportModal: inputs.openConsolidatedReportModal,
  });

  const isPermitionToAddNode = usePermission([
    ESecuredIdentityRoleName.Administrator,
    ESecuredIdentityRoleName.ManagingFirmExecutor,
    ESecuredIdentityRoleName.ManagingFirmSpectatingAdministrator,
  ]);
  const isPermitionToDownloadConsolidatedReport = usePermission([
    ESecuredIdentityRoleName.Administrator,
    ESecuredIdentityRoleName.ManagingFirmExecutor,
    ESecuredIdentityRoleName.ManagingFirmSpectator,
    ESecuredIdentityRoleName.ManagingFirmSpectatorRestricted,
    ESecuredIdentityRoleName.ManagingFirmSpectatingAdministrator,
  ]);
  const isPermissionToEditHousingStock = usePermission([
    ESecuredIdentityRoleName.Administrator,
  ]);

  const setGrouptype = useCallback(
    (section: NonResidentialBuildingProfileGrouptype) =>
      history.replace(
        `/buildings/nonResidentialProfile/${buildingId}/${section}`,
      ),
    [history, buildingId],
  );

  return (
    <>
      <BuildingIdGate buildingId={Number(buildingId)} />
      {nonResidentialBuilding && (
        <ConsolidatedReportContainer building={nonResidentialBuilding} />
      )}

      <WithLoader isLoading={isLoading}>
        <NonResidentialBuildingProfile
          currentGrouptype={section}
          setGrouptype={setGrouptype}
          nonResidentialBuilding={nonResidentialBuilding}
          isPermitionToAddNode={isPermitionToAddNode}
          isPermitionToDownloadConsolidatedReport={
            isPermitionToDownloadConsolidatedReport
          }
          isPermissionToEditHousingStock={isPermissionToEditHousingStock}
          openConsolidatedReportModal={openConsolidatedReportModal}
          resourceDisconnections={resourceDisconnections?.items || []}
        />
      </WithLoader>
    </>
  );
};
