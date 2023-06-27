import { EResourceType } from '../myApi';

export type ReadingType = {
  id: number;
  hasError: boolean;
  status: string;
  statusMessage: string | null;
  value1: string | null | number;
  value2: string | null | number;
  value3: string | null | number;
  value4: string | null | number;
  readingDate: string;
  uploadTime: string;
};

export type ManagementFirmType = {
  id: number;
  name: string;
  phoneNumber: string | null;
  information: string | null;
  timeZoneOffset: string | null;
};

export type IndividualDeviceType = {
  apartmentNumber: string;
  closingDate: string | null;
  futureCheckingDate: string | null;
  futureCommercialAccountingDate: string | null;
  homeownerName: string | null;
  housingStockNumber: string | null;
  id: number;
  lastCheckingDate: string | null;
  lastCommercialAccountingDate: string | null;
  managementFirm: ManagementFirmType;
  model: string | null;
  mountPlace: string;
  personalAccountNumber: string | null;
  rateType: string;
  readings: Array<ReadingType>;
  resource: EResourceType;
  serialNumber: string | null;
  transactionType: string | null;
};

export type EffectFailDataAxiosError = {
  response: {
    data: {
      error: {
        Message: string;
        Text: string;
      };
    };
    status: number;
  };
};
export type EffectFailDataAxiosErrorDataId = {
  response: {
    data: {
      error: {
        Message: string;
        Text: string;
        Data: {
          Id: string;
        };
      };
    };
    status: number;
  };
};
export type EffectFailDataAxiosErrorDataApartmentId = {
  response: {
    data: {
      error: {
        Message: string;
        Text: string;
        Data: {
          ApartmentId: number;
        };
        Code: string;
      };
    };
    status: number;
  };
};

export const ymaps = window.ymaps;

export enum DistrictColor {
  Blue = 'blue',
  Violet = 'violete',
  Yellow = 'yellow',
  Red = 'red',
  Green = 'green',
}

export type DistrictData = {
  id: string;
  type: DistrictColor;
  coordinates: number[][][];
  name: string;
  isEditing?: boolean;
};

export type BlobResponseErrorType = {
  response: { data: Blob; status: number };
};

export type DistrictAdditionalInfo = {
  districtPolygonCoordinates: number[][];
  districtColor: DistrictColor;
};
