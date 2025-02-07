import { PollCommand } from 'api/types';

export type PollQuery = {
  Command?: PollCommand;
  /** @format int32 */
  PollId?: number;
};

export type CloseDevicesWithoutReadingsQuery = {
  ExceptedHmIds?: string[];
  HmIds?: string[];
  ManagementFirmIds?: number[];
  /**
   * Кол-во месяцев без показаний от текущего
   * @format int32
   */
  MonthsToCloseDevice?: number;
};
