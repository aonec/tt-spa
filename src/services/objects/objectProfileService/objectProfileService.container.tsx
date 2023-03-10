import React from 'react';
import { Skeleton } from 'antd';
import { useEvent, useStore } from 'effector-react';
import { useParams } from 'react-router-dom';
import { objectProfileService } from './objectProfileService.model';
import { ObjectProfile } from './view/ObjectProfile';
import { ConsolidatedReportContainer } from './consolidatedReportService';
import { currentUserService } from 'services/currentUserService';
import _ from 'lodash';
import { ESecuredIdentityRoleName } from 'myApi';

const { inputs, outputs, gates } = objectProfileService;
const { ObjectProfileIdGate } = gates;

export const ObjectProfileContainer = () => {
  const { housingStockId } = useParams<{ housingStockId: string }>();

  const housingStock = useStore(outputs.$housingStock);
  const isLoading = useStore(outputs.$isLoading);
  const currentGrouptype = useStore(outputs.$currentGrouptype);

  const setCurrentGrouptype = useEvent(inputs.setCurrentGroutype);
  const openConsolidatedReportModal = useEvent(
    inputs.openConsolidatedReportModal,
  );

  const userRoles = useStore(currentUserService.outputs.$currentUserRoles);
  const userRolesKeys = userRoles.map((e) => e.key);
  const isPermitionToAddNode = Boolean(
    _.intersection(userRolesKeys, [
      ESecuredIdentityRoleName.Administrator,
      ESecuredIdentityRoleName.ManagingFirmExecutor,
    ]).length,
  );
  const isPermitionToDownloadConsolidatedReport = Boolean(
    _.intersection(userRolesKeys, [
      ESecuredIdentityRoleName.Administrator,
      ESecuredIdentityRoleName.ManagingFirmExecutor,
      ESecuredIdentityRoleName.ManagingFirmSpectator,
      ESecuredIdentityRoleName.ManagingFirmSpectatorRestricted,
    ]).length,
  );

  return (
    <>
      <ObjectProfileIdGate objectId={Number(housingStockId)} />
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
        />
      )}
    </>
  );
};
