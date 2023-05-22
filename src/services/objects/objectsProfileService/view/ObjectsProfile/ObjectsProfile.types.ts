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
  handleOpenGroupreportModal: () => void;
  openHeatIndividualDevicesReportModal: () => void;
};

export type HeaderInject = {
  Header: (props: { children: ReactNode }) => ReactElement;
};
