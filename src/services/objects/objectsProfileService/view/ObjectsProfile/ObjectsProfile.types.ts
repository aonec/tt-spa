import { ReactElement, ReactNode } from 'react';
import { SearchType } from './../../objectsProfileService.types';

export type ObjectsProfileProps = {
  handleOpenChooseResourceDisconnectionModal: () => void;
  searchType?: SearchType;
  openSoiReportModal: () => void;
  handleCreateObject: () => void;
  openFeedFlowBackReportModal: () => void;
  handleExportGroupReport: () => void;
  isPermitionToDownloadGroupReport: boolean;
  isPermitionToDownloadSOIReport: boolean;
  isPermitionToDownloadFeedBackFlowReport: boolean;
  isPermitionToCreateObjectAndIPUReport: boolean;
  isPermitionToCreateResourceDisconnection: boolean;
  isPermitionToCreateFeedFlowPipeTemperatureReport: boolean;
  handleOpenGroupreportModal: () => void;
  openHeatIndividualDevicesReportModal: () => void;
  openFlowTemperatureDeviationReportModal: () => void;
  pageSegment: BuildingsPageSegment;
  setSegment: (payload: BuildingsPageSegment) => void;
};

export type HeaderInject = {
  Header: (props: { children: ReactNode }) => ReactElement;
};

export type BuildingsPageSegment = 'list' | 'map';
