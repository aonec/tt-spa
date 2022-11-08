import { Dictionary } from 'lodash';
import {
  EResourceType,
  HousingMeteringDeviceReadingsIncludingPlacementResponse,
} from 'myApi';

export type HousingMeteringDeviceReadingsContainerProps = {
  nodeId: number;
  resource: EResourceType;
};

export type PreparedMeteringDeviceReadings = {
  year: string;
  readings: Dictionary<
    HousingMeteringDeviceReadingsIncludingPlacementResponse[]
  >;
}[];
