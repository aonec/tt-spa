import React, { useCallback } from 'react';
import { Skeleton } from 'antd';
import { useUnit } from 'effector-react';
import { useNavigate, useParams } from 'react-router-dom';
import { housingStockProfileService } from './housingStockProfileService.model';
import { HousingStockProfile } from './view/HousingStockProfile';
import { ConsolidatedReportContainer } from './consolidatedReportService';
import { ESecuredIdentityRoleName } from 'api/types';
import { usePermission } from 'hooks/usePermission';
import { HousingStockProfileGrouptype } from './housingStockProfileService.constants';

const { inputs, outputs, gates } = housingStockProfileService;
const { ObjectProfileIdGate } = gates;

export const HousingStockProfileContainer = () => {
  const { buildingId, section } = useParams<{
    buildingId: string;
    section?: HousingStockProfileGrouptype;
  }>();
  const history = useNavigate();

  const {
    housingStock,
    isLoading,
    openConsolidatedReportModal,
    resourceDisconnections,
  } = useUnit({
    housingStock: outputs.$housingStock,
    resourceDisconnections: outputs.$resourceDisconnections,
    isLoading: outputs.$isLoading,
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
    (section: HousingStockProfileGrouptype) =>
      history(`/buildings/livingProfile/${buildingId}/${section}`, {
        replace: true,
      }),
    [history, buildingId],
  );

  return (
    <>
      <ObjectProfileIdGate objectId={Number(buildingId)} />
      {housingStock && <ConsolidatedReportContainer building={housingStock} />}
      {isLoading && <Skeleton active />}
      {!isLoading && housingStock && (
        <HousingStockProfile
          housingStock={housingStock}
          setCurrentGrouptype={setGrouptype}
          currentGrouptype={section}
          openCommonReport={() => openConsolidatedReportModal()}
          isPermitionToAddNode={isPermitionToAddNode}
          isPermitionToDownloadConsolidatedReport={
            isPermitionToDownloadConsolidatedReport
          }
          isPermissionToEditHousingStock={isPermissionToEditHousingStock}
          resourceDisconnections={resourceDisconnections}
        />
      )}
    </>
  );
};
