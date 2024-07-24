import { DeviceResource, PollCommand, YearRangeType } from 'api/types';

export type RunnerPayload = {
  YearRange?: YearRangeType;
  Resource?: DeviceResource;
  HmIds?: string[];
  ManagementFirmId?: number;
  HouseIds?: number[];
  Command?: PollCommand;
  PollId?: number;
};
