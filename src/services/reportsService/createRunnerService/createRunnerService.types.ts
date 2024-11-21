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

export enum PollStatus {
  Pending = 'Pending',
  Running = 'Running',
  Done = 'Done',
}

export type PollResponse = {
  id: number;
  createdAt: string;
  userId: number;
  organizationId: number;
  status: PollStatus;
  runningAt: string;
  doneAt: string;
  actionType: string;
  hasFile: boolean;
};
