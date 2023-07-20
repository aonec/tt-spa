import { BuildingWithTasksResponse } from 'api/myApi';
import { OrganizationCoordinates } from 'services/currentUserService/currentUserService.types';

export enum HousingStockTaskMarkerType {
  Calculator = 'Calculator',
  AllResources = 'AllResources',
  ColdWaterSupply = 'ColdWaterSupply',
  HotWaterSupply = 'HotWaterSupply',
  Heat = 'Heat',
  Electricity = 'Electricity',
  Application = 'Application',
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
  buildingsWithTasks: BuildingWithTasksResponse[];
  handleClickMarker: (payload: BuildingWithTasksResponse) => void;
  selectedHousingStockId: number | undefined;
  organizationCoordinates: OrganizationCoordinates | null;
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
