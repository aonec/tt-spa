import { useEvent, useStore } from 'effector-react';
import { ESecuredIdentityRoleName } from 'myApi';
import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { currentUserService } from 'services/currentUserService';
import { FeedFlowBackReportContainer } from 'services/nodes/feedFlowBackReportService';
import { ChooseTypeOfResourceDisconnectionModalContainer } from 'services/resources/chooseTypeOfResourceDisconnectionModalService/chooseTypeOfResourceDisconnectionModalService.container';
import { chooseTypeOfResourceDisconnectionModalService } from 'services/resources/chooseTypeOfResourceDisconnectionModalService/chooseTypeOfResourceDisconnectionModalService.model';
import { CreateResourceDisconnectionContainer } from 'services/resources/createResourceDisconnectionService';
import {
  GroupReportContainer,
  groupReportService,
} from '../groupReportService';
import { objectsProfileService } from './objectsProfileService.model';
import { SearchType } from './objectsProfileService.types';
import { SoiReportContainer } from './soiReportService';
import { ObjectsProfile } from './view/ObjectsProfile';
import _ from 'lodash';

const { inputs } = objectsProfileService;

export const ObjectsProfileContainer = () => {
  const { searchType } = useParams<{ searchType?: SearchType }>();

  const history = useHistory();

  const openSoiReportModal = useEvent(inputs.openSoiReportModal);

  const openFeedFlowBackReportModal = useEvent(
    inputs.openFeedFlowBackReportModal,
  );

  const handleExportGroupReport = useEvent(groupReportService.inputs.openModal);

  const handleOpenChooseResourceDisconnectionModal = useEvent(
    chooseTypeOfResourceDisconnectionModalService.inputs.openModal,
  );

  const handleCreateObject = () => history.push('/objects/create');

  const userRoles = useStore(currentUserService.outputs.$currentUserRoles);
  const userRolesKeys = userRoles.map((e) => e.key);
  const isPermitionToDownloadGroupReport = Boolean(
    _.intersection(userRolesKeys, [
      ESecuredIdentityRoleName.Administrator,
      ESecuredIdentityRoleName.ManagingFirmExecutor,
      ESecuredIdentityRoleName.ManagingFirmSpectator,
      ESecuredIdentityRoleName.ManagingFirmSpectatorRestricted,
    ]).length,
  );
  const isPermitionToDownloadSOIReport = Boolean(
    _.intersection(userRolesKeys, [
      ESecuredIdentityRoleName.Administrator,
      ESecuredIdentityRoleName.ManagingFirmExecutor,
      ESecuredIdentityRoleName.SeniorOperator,
      ESecuredIdentityRoleName.Operator,
      ESecuredIdentityRoleName.ManagingFirmSpectator,
      ESecuredIdentityRoleName.ManagingFirmSpectatorRestricted,
      ESecuredIdentityRoleName.ManagingFirmDispatcher,
    ]).length,
  );
  const isPermitionToDownloadFeedBackFlowReport = Boolean(
    _.intersection(userRolesKeys, [
      ESecuredIdentityRoleName.Administrator,
      ESecuredIdentityRoleName.ManagingFirmExecutor,
    ]).length,
  );
  const isPermitionToCreateResourceDisconnection = Boolean(
    _.intersection(userRolesKeys, [ESecuredIdentityRoleName.Administrator])
      .length,
  );
  const isPermitionToCreateObject = Boolean(
    _.intersection(userRolesKeys, [ESecuredIdentityRoleName.Administrator])
      .length,
  );

  useEffect(() => {
    if (!searchType) {
      history.push(`/objects/${SearchType.Houses}`);
    }
  }, [searchType, history]);

  return (
    <>
      <SoiReportContainer />
      <CreateResourceDisconnectionContainer />
      <ChooseTypeOfResourceDisconnectionModalContainer />
      <FeedFlowBackReportContainer />
      <GroupReportContainer />
      <ObjectsProfile
        openSoiReportModal={() => openSoiReportModal()}
        searchType={searchType}
        handleExportGroupReport={() => handleExportGroupReport()}
        handleOpenChooseResourceDisconnectionModal={() =>
          handleOpenChooseResourceDisconnectionModal()
        }
        handleCreateObject={handleCreateObject}
        openFeedFlowBackReportModal={() => openFeedFlowBackReportModal()}
        isPermitionToCreateObject={isPermitionToCreateObject}
        isPermitionToCreateResourceDisconnection={
          isPermitionToCreateResourceDisconnection
        }
        isPermitionToDownloadFeedBackFlowReport={
          isPermitionToDownloadFeedBackFlowReport
        }
        isPermitionToDownloadSOIReport={isPermitionToDownloadSOIReport}
        isPermitionToDownloadGroupReport={isPermitionToDownloadGroupReport}
      />
    </>
  );
};
