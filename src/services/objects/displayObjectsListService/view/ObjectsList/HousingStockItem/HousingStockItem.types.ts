import { BuildingListResponse } from 'api/types';

export type HousingStockItemProps = {
  housingStock: BuildingListResponse;
  setSelectedBuilding: (building: BuildingListResponse) => void;
  openConsolidatedReportModal: () => void;
};
