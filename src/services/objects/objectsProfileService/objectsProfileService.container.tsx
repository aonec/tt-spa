import { useEvent } from 'effector-react';
import { ESecuredIdentityRoleName } from 'api/myApi';
import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
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
import { usePermission } from 'hooks/usePermission';
import {
  HeatIndividualDevicesReportContainer,
  heatIndividualDevicesReportService,
} from './heatIndividualDevicesReportService';
import { FlowTemperatureDeviationReportContainer } from './flowTemperatureDeviationReport';

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

  const handleOpenGroupreportModal = useEvent(
    groupReportService.inputs.openModal,
  );

  const handleOpenHeatIndividualDevicesReportModal = useEvent(
    heatIndividualDevicesReportService.inputs.openModal,
  );

  const openFlowTemperatureDeviationReportModal = useEvent(
    inputs.openFlowTemperatureDeviationReportModal,
  );

  const handleCreateObject = () => history.push('/buildings/create');

  const isPermitionToDownloadGroupReport = usePermission([
    ESecuredIdentityRoleName.Administrator,
    ESecuredIdentityRoleName.ManagingFirmExecutor,
    ESecuredIdentityRoleName.ManagingFirmSpectator,
    ESecuredIdentityRoleName.ManagingFirmSpectatorRestricted,
  ]);
  const isPermitionToDownloadSOIReport = usePermission([
    ESecuredIdentityRoleName.Administrator,
    ESecuredIdentityRoleName.ManagingFirmExecutor,
    ESecuredIdentityRoleName.SeniorOperator,
    ESecuredIdentityRoleName.Operator,
    ESecuredIdentityRoleName.ManagingFirmSpectator,
    ESecuredIdentityRoleName.ManagingFirmSpectatorRestricted,
    ESecuredIdentityRoleName.ManagingFirmDispatcher,
  ]);
  const isPermitionToDownloadFeedBackFlowReport = usePermission([
    ESecuredIdentityRoleName.Administrator,
    ESecuredIdentityRoleName.ManagingFirmExecutor,
  ]);
  const isPermitionToCreateResourceDisconnection = usePermission([
    ESecuredIdentityRoleName.Administrator,
  ]);
  const isPermitionToCreateObjectAndIPUReport = usePermission([
    ESecuredIdentityRoleName.Administrator,
  ]);
  const isPermitionToCreateFeedFlowPipeTemperatureReport = usePermission([
    ESecuredIdentityRoleName.Administrator,
    ESecuredIdentityRoleName.ManagingFirmSpectator,
  ]);

  useEffect(() => {
    if (!searchType) {
      history.push(`/buildings/${SearchType.Houses}`);
    }
  }, [searchType, history]);

  return (
    <>
      <HeatIndividualDevicesReportContainer />
      <SoiReportContainer />
      <CreateResourceDisconnectionContainer />
      <ChooseTypeOfResourceDisconnectionModalContainer />
      <FeedFlowBackReportContainer />
      <GroupReportContainer />
      <FlowTemperatureDeviationReportContainer />
      <ObjectsProfile
        openSoiReportModal={() => openSoiReportModal()}
        searchType={searchType}
        handleExportGroupReport={() => handleExportGroupReport()}
        handleOpenChooseResourceDisconnectionModal={() =>
          handleOpenChooseResourceDisconnectionModal()
        }
        handleCreateObject={handleCreateObject}
        openFeedFlowBackReportModal={() => openFeedFlowBackReportModal()}
        isPermitionToCreateObjectAndIPUReport={
          isPermitionToCreateObjectAndIPUReport
        }
        isPermitionToCreateResourceDisconnection={
          isPermitionToCreateResourceDisconnection
        }
        isPermitionToDownloadFeedBackFlowReport={
          isPermitionToDownloadFeedBackFlowReport
        }
        isPermitionToDownloadSOIReport={isPermitionToDownloadSOIReport}
        isPermitionToDownloadGroupReport={isPermitionToDownloadGroupReport}
        isPermitionToCreateFeedFlowPipeTemperatureReport={
          isPermitionToCreateFeedFlowPipeTemperatureReport
        }
        handleOpenGroupreportModal={() => handleOpenGroupreportModal()}
        openHeatIndividualDevicesReportModal={() =>
          handleOpenHeatIndividualDevicesReportModal()
        }
        openFlowTemperatureDeviationReportModal={
          openFlowTemperatureDeviationReportModal
        }
      />
    </>
  );
};
