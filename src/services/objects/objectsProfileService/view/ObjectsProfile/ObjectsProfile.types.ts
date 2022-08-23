import { SearchType } from './../../objectsProfileService.types';

export type ObjectsProfileProps = {
  handleExportGroupReport: () => void;
  handleOpenCreateResourceDisconnectionModal: () => void;
  searchType?: SearchType;
};
