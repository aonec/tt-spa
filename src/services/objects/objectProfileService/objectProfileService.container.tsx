import React from 'react';
import { Skeleton } from 'antd';
import { useEvent, useStore } from 'effector-react';
import { useParams } from 'react-router-dom';
import { objectProfileService } from './objectProfileService.model';
import { ObjectProfile } from './view/ObjectProfile';
import { ConsolidatedReportContainer } from './consolidatedReportService';
import { ESecuredIdentityRoleName } from 'myApi';
import { usePermission } from 'hooks/usePermission';

const { inputs, outputs, gates } = objectProfileService;
const { ObjectProfileIdGate } = gates;

export const ObjectProfileContainer = () => {
  const { buildingId } = useParams<{ buildingId: string }>();

  const housingStock = useStore(outputs.$housingStock);
  const isLoading = useStore(outputs.$isLoading);
  const currentGrouptype = useStore(outputs.$currentGrouptype);

  const setCurrentGrouptype = useEvent(inputs.setCurrentGroutype);
  const openConsolidatedReportModal = useEvent(
    inputs.openConsolidatedReportModal,
  );

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
      {housingStock && (
        <ConsolidatedReportContainer housingStock={housingStock} />
      )}
      {isLoading && <Skeleton active />}
      {!isLoading && housingStock && (
        <ObjectProfile
          housingStock={housingStock}
          setCurrentGrouptype={setCurrentGrouptype}
          currentGrouptype={currentGrouptype}
          openCommonReport={() => openConsolidatedReportModal()}
          isPermitionToAddNode={isPermitionToAddNode}
          isPermitionToDownloadConsolidatedReport={
            isPermitionToDownloadConsolidatedReport
          }
          isPermissionToEditHousingStock={isPermissionToEditHousingStock}
        />
      )}
    </>
  );
};
