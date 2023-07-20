import { HousingStockResponse } from 'api/myApi';
import { HousingStockProfileGrouptype } from '../../housingStockProfileService.constants';

export type HousingStockProfileProps = {
  housingStock: HousingStockResponse;
  currentGrouptype: HousingStockProfileGrouptype;
  setCurrentGrouptype: (grouptype: HousingStockProfileGrouptype) => void;
  openCommonReport: () => void;
  isPermitionToAddNode: boolean;
  isPermitionToDownloadConsolidatedReport: boolean;
  isPermissionToEditHousingStock: boolean;
};
