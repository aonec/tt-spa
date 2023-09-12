import { House } from 'api/types';

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

export type EffectFailDataAxiosErrorDataTemperatureGraph = {
  response: {
    data: {
      error: {
        Message: string;
        Text: string;
        Data: Record<string, { DayPart: string }>;
      };
      status: number;
    };
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
  isDrawing?: boolean;
  houses?: House[];
};

export type BlobResponseErrorType = {
  response: { data: Blob; status: number };
};

export type DistrictAdditionalInfo = {
  districtPolygonCoordinates: number[][];
  districtColor: DistrictColor;
};

export type DistrictColorData = {
  type: DistrictColor;
  name: string;
  color: string;
  strokeColor: string;
};
