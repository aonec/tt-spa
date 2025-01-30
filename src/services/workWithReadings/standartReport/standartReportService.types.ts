import { PollCommand } from 'api/types';

export type PollQuery = {
  Command?: PollCommand;
  /** @format int32 */
  PollId?: number;
};
