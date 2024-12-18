import {
  HousingMeteringDeviceReadingsIncludingPlacementResponse,
  OrganizationUserShortResponse,
} from 'api/types';

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

export type HistoryMonthReadingType = {
  id: number;
  value: number;
  uploadTime: string;
  user: OrganizationUserShortResponse | null;
  isRemoved: boolean;
  removedTime: string | null;
  removedByUser: OrganizationUserShortResponse | null;
  isArchived: boolean;
};

export type AccountingNodesReadingsYearHistoryResponse = {
  year: number;
  monthReadings: AccountingNodesReadingsMonthHistoryResponse[] | null;
};

export type AccountingNodesReadingsMonthHistoryResponse = {
  month: number;
  readings: HistoryMonthReadingType[] | null;
};
