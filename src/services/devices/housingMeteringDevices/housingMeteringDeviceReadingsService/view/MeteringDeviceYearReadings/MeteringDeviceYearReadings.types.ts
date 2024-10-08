import { HousingMeteringDeviceReadingsIncludingPlacementResponse } from 'api/types';
import { SortedMeteringDeviceReading } from '../../housingMeteringDeviceReadingsService.types';
import { EffectFailDataAxiosError } from 'types';
import { Event } from 'effector';

export type MeteringDeviceYearReadingsProps = {
  year: string;
  allReadings: HousingMeteringDeviceReadingsIncludingPlacementResponse[];
  yearRreadings: {
    month: string;
    readings: SortedMeteringDeviceReading[];
  }[];
  isColdWater: boolean;
  createReading: (reading: {
    value: number;
    deviceId: number;
    month: string;
  }) => void;
  createReadingFailed: Event<EffectFailDataAxiosError>;
};
