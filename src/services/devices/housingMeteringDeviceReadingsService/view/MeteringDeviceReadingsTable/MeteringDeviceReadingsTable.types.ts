import { PreparedMeteringDeviceReading } from '../../housingMeteringDeviceReadingsService.types';

export type MeteringDeviceReadingsTableProps = {
  isColdWater: boolean;
  readings: PreparedMeteringDeviceReading[];
};
