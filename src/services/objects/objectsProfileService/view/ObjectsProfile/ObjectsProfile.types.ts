import { SearchType } from './../../objectsProfileService.types';

export type ObjectsProfileProps = {
  handleExportGroupReport: () => void;
  handleOpenChooseResourceDisconnectionModal: () => void;
  searchType?: SearchType;
  openSoiReportModal: () => void;
  segment: SegmentType;
};

export type SegmentType = 'list' | 'map';
