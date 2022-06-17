import { SearchType } from './../../objectsProfileService.types';

export type ObjectsProfileProps = {
  handleExportGroupReport: () => void;
  searchType?: SearchType;
  onChangeSearchType: (searchType: SearchType) => void;
};
