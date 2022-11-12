import { CreateHousingMeteringDeviceReadingsRequest } from 'myApi';
import { PreparedMeteringDeviceReading } from '../../housingMeteringDeviceReadingsService.types';

export type MeteringDeviceReadingsTableProps = {
  isColdWater: boolean;
  readings: PreparedMeteringDeviceReading[];
  createReading: (reading: CreateHousingMeteringDeviceReadingsRequest) => void;
};
