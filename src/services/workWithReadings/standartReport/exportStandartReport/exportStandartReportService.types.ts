import { PollCommand } from 'api/types';

export type IndividualDeviceExportQuery = {
  /** @format int32 */
  Year?: number;
  /** @format int32 */
  Month?: number;
  ManagementFirmIds?: number[];
  Command?: PollCommand;
  /** @format int32 */
  PollId?: number;
};
