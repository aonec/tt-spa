import React from 'react';
import { Skeleton } from 'antd';
import { useUnit } from 'effector-react';
import { useParams } from 'react-router-dom';
import { housingStockProfileService } from './housingStockProfileService.model';
import { HousingStockProfile } from './view/HousingStockProfile';
import { ConsolidatedReportContainer } from './consolidatedReportService';
import { ESecuredIdentityRoleName } from 'myApi';
import { usePermission } from 'hooks/usePermission';

const { inputs, outputs, gates } = housingStockProfileService;
const { ObjectProfileIdGate } = gates;

export const HousingStockProfileContainer = () => {
  const { buildingId } = useParams<{ buildingId: string }>();

  const {
    currentGrouptype,
    housingStock,
    isLoading,
    openConsolidatedReportModal,
    setCurrentGrouptype,
    resourceDisconnections,
  } = useUnit({
    housingStock: outputs.$housingStock,
    resourceDisconnections: outputs.$resourceDisconnections,
    isLoading: outputs.$isLoading,
    currentGrouptype: outputs.$currentGrouptype,
    setCurrentGrouptype: inputs.setCurrentGroutype,
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
      <ObjectProfileIdGate objectId={Number(buildingId)} />
      {housingStock && <ConsolidatedReportContainer building={housingStock} />}
      {isLoading && <Skeleton active />}
      {!isLoading && housingStock && (
        <HousingStockProfile
          housingStock={housingStock}
          setCurrentGrouptype={setCurrentGrouptype}
          currentGrouptype={currentGrouptype}
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
