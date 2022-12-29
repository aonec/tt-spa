import { SearchType } from './../../objectsProfileService.types';

export type ObjectsProfileProps = {
  handleOpenChooseResourceDisconnectionModal: () => void;
  searchType?: SearchType;
  openSoiReportModal: () => void;
  handleCreateObject: () => void;
  isAdministrator: boolean;
  openFeedFlowBackReportModal: () => void;
  handleExportGroupReport: () => void;
};
