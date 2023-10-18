import { useUnit } from 'effector-react';
import { ESecuredIdentityRoleName } from 'api/types';
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

const { inputs, outputs } = objectsProfileService;

export const ObjectsProfileContainer = () => {
  const { searchType } = useParams<{ searchType?: SearchType }>();

  const history = useHistory();

  const {
    openSoiReportModal,
    openFeedFlowBackReportModal,
    handleExportGroupReport,
    handleOpenChooseResourceDisconnectionModal,
    handleOpenGroupreportModal,
    handleOpenHeatIndividualDevicesReportModal,
    openFlowTemperatureDeviationReportModal,
    pageSegment,
    setSegment,
  } = useUnit({
    openSoiReportModal: inputs.openSoiReportModal,
    openFeedFlowBackReportModal: inputs.openFeedFlowBackReportModal,
    handleExportGroupReport: groupReportService.inputs.openModal,
    handleOpenChooseResourceDisconnectionModal:
      chooseTypeOfResourceDisconnectionModalService.inputs.openModal,
    handleOpenGroupreportModal: groupReportService.inputs.openModal,
    handleOpenHeatIndividualDevicesReportModal:
      heatIndividualDevicesReportService.inputs.openModal,
    openFlowTemperatureDeviationReportModal:
      inputs.openFlowTemperatureDeviationReportModal,
    setSegment: inputs.setSegment,
    pageSegment: outputs.$pageSegment,
  });

  const handleCreateObject = () => history.push('/buildings/create');

  const isPermitionToDownloadGroupReport = usePermission([
    ESecuredIdentityRoleName.Administrator,
    ESecuredIdentityRoleName.ManagingFirmExecutor,
    ESecuredIdentityRoleName.ManagingFirmSpectator,
    ESecuredIdentityRoleName.ManagingFirmSpectatorRestricted,
    ESecuredIdentityRoleName.ManagingFirmSpectatingAdministrator,
  ]);
  const isPermitionToDownloadSOIReport = usePermission([
    ESecuredIdentityRoleName.Administrator,
    ESecuredIdentityRoleName.ManagingFirmExecutor,
    ESecuredIdentityRoleName.SeniorOperator,
    ESecuredIdentityRoleName.Operator,
    ESecuredIdentityRoleName.ManagingFirmSpectator,
    ESecuredIdentityRoleName.ManagingFirmSpectatorRestricted,
    ESecuredIdentityRoleName.ManagingFirmDispatcher,
    ESecuredIdentityRoleName.ManagingFirmSpectatingAdministrator,
  ]);
  const isPermitionToDownloadFeedBackFlowReport = usePermission([
    ESecuredIdentityRoleName.Administrator,
    ESecuredIdentityRoleName.ManagingFirmExecutor,
    ESecuredIdentityRoleName.ManagingFirmSpectatingAdministrator,
  ]);
  const isPermitionToCreateResourceDisconnection = usePermission([
    ESecuredIdentityRoleName.Administrator,
    ESecuredIdentityRoleName.ManagingFirmSpectatingAdministrator,
  ]);
  const isPermitionToCreateObjectAndIPUReport = usePermission([
    ESecuredIdentityRoleName.Administrator,
    ESecuredIdentityRoleName.ManagingFirmSpectatingAdministrator,
  ]);
  const isPermitionToCreateFeedFlowPipeTemperatureReport = usePermission([
    ESecuredIdentityRoleName.Administrator,
    ESecuredIdentityRoleName.ManagingFirmSpectator,
    ESecuredIdentityRoleName.ManagingFirmSpectatingAdministrator,
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
        pageSegment={pageSegment}
        setSegment={setSegment}
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
