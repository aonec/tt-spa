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

const { inputs } = objectsProfileService;

export const ObjectsProfileContainer = () => {
  const { searchType } = useParams<{ searchType?: SearchType }>();

  const history = useHistory();

  const openSoiReportModal = useEvent(inputs.openSoiReportModal);

  const openFeedFlowBackReportModal = useEvent(
    inputs.openFeedFlowBackReportModal
  );

  const handleExportGroupReport = useEvent(groupReportService.inputs.openModal);

  const handleOpenChooseResourceDisconnectionModal = useEvent(
    chooseTypeOfResourceDisconnectionModalService.inputs.openModal
  );

  const handleOpenGroupreportModal = useEvent(
    groupReportService.inputs.openModal
  );

  const handleCreateObject = () => history.push('/objects/create');

  const userRoles = useStore(currentUserService.outputs.$currentUserRoles);

  const isAdministrator = userRoles
    .map((e) => e.key)
    .includes(ESecuredIdentityRoleName.Administrator);

  useEffect(() => {
    if (!searchType) {
      history.push(`/objects/${SearchType.Houses}`);
    }
  }, [searchType]);

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
        isAdministrator={isAdministrator}
        openFeedFlowBackReportModal={() => openFeedFlowBackReportModal()}
        handleOpenGroupreportModal={() => handleOpenGroupreportModal()}
      />
    </>
  );
};
