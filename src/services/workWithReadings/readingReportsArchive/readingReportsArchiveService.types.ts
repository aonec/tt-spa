import { OrderByRule } from 'api/types';

export type IndividualDevicesReportArchiveQueryParams = {
  /** @format int32 */
  PageNumber?: number;
  /** @format int32 */
  PageSize?: number;
  OrderBy?: OrderByRule;
  /** @format int32 */
  Skip?: number;
  /** @format int32 */
  Take?: number;
};
