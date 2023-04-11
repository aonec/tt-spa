import { HousingStockWithTasksResponse } from 'myApi';

export type TasksMapProps = {
  housingStocksWithTasks: HousingStockWithTasksResponse[];
  handleClickMarker: (payload: HousingStockWithTasksResponse) => void;
  selectedHousingStockId: number | undefined;
};

export enum HousingStockTaskMarkerType {
  Calculator = 'Calculator',
  AllResources = 'AllResources',
  ColdWaterSupply = 'ColdWaterSupply',
  HotWaterSupply = 'HotWaterSupply',
  Heat = 'Heat',
  Electricity = 'Electricity',
}

export type GetPlacemarkerLayoutLinkResponse = {
  iconHrev: string;
  size: {
    width: number;
    height: number;
  };
  isExtended?: boolean;
};

export type TasksMapsNativeProps = {
  housingStocksWithTasks: HousingStockWithTasksResponse[];
  handleClickMarker: (payload: HousingStockWithTasksResponse) => void;
  selectedHousingStockId: number | undefined;
};

export type DiagramData = {
  value: number;
  color: string;
};

export type DiagramConfig = {
  strokeWidth: number;
  radius: number;
  start: 'top' | 'left' | 'right' | 'bottom';
};

export interface SectorData extends DiagramData {
  width: number;
  offset: number;
}
