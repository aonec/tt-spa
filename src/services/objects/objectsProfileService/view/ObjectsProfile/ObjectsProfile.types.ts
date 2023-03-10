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
  isPermitionToCreateObject: boolean;
  isPermitionToCreateResourceDisconnection: boolean;
};
