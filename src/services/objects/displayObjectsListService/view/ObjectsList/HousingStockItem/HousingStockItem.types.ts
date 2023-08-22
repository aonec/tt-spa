import { BuildingListResponse } from 'api/types';

export type HousingStockItemProps = {
  housingStock: BuildingListResponse;
  setSelectedBuilding: (building: BuildingListResponse) => void;
  openConsolidatedReportModal: () => void;
  openHeatIndividualDeviceReportModal: (building: BuildingListResponse) => void;
  openResourceDisconnectionReportModal: (
    payload: void | BuildingListResponse,
  ) => void;
};
