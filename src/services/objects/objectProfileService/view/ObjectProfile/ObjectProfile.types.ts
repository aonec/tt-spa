import { HousingStockResponse } from 'myApi';
import { ObjectProfileGrouptype } from '../../objectProfileService.constants';

export type ObjectProfileProps = {
  housingStock: HousingStockResponse;
  currentGrouptype: ObjectProfileGrouptype;
  setCurrentGrouptype: (grouptype: ObjectProfileGrouptype) => void;
  openCommonReport: () => void;
  isPermitionToAddNode: boolean;
  isPermitionToDownloadConsolidatedReport: boolean;
  isPermissionToEditHousingStock: boolean;
};
