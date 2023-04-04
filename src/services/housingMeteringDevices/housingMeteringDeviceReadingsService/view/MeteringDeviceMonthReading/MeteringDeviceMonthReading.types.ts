import { HousingMeteringDeviceReadingsIncludingPlacementResponse } from 'myApi';
import { SortedMeteringDeviceReading } from '../../housingMeteringDeviceReadingsService.types';
import { EffectFailDataAxiosError } from 'types';
import { Event } from 'effector';

export type MeteringDeviceMonthReadingProps = {
  monthReadings: SortedMeteringDeviceReading[];
  allReadings: HousingMeteringDeviceReadingsIncludingPlacementResponse[];
  isColdWater: boolean;
  month: string;
  createReading: (reading: { value: number; deviceId: number }) => void;
  failureCreateReading: Event<EffectFailDataAxiosError>;
};
