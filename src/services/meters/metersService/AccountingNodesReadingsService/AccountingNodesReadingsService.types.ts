import { HousingMeteringDeviceReadingsIncludingPlacementResponse } from 'myApi';

export type GetElectricNodesRequestParams =
  Partial<GetElectricNodesByAddress> & {
    BuildingId?: number;
  };

export type GetElectricNodesByAddress = {
  'Address.City': string;
  'Address.Street': string;
  'Address.HousingStockNumber': string;
  'Address.Corpus'?: string;
};

export type AccountingNodesSumReadings = {
  [key: number]: {
    currentReading?: HousingMeteringDeviceReadingsIncludingPlacementResponse;
    previousExistingReading?: HousingMeteringDeviceReadingsIncludingPlacementResponse;
  };
};

export type UpdateAccountingNodesSumPayload = {
  id: number;
  currentReading?: HousingMeteringDeviceReadingsIncludingPlacementResponse;
  previousExistingReading?: HousingMeteringDeviceReadingsIncludingPlacementResponse;
};
