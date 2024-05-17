import {
  EOrderByRule,
  EResourceDisconnectingOrderRule,
  EResourceDisconnectingStatus,
  EResourceDisconnectingType,
  EResourceType,
} from 'api/types';

export type ExportResourceDisconnectingParams = {
  addressCity?: string;
  addressStreet?: string;
  addressHousingStockNumber?: string;
  addressCorpus?: string;
  Resource?: EResourceType;
  /** @format uuid */
  HouseManagementId?: string;
  Sender?: string;
  /** @format date-time */
  From?: string;
  /** @format date-time */
  To?: string;
  DisconnectingType?: EResourceDisconnectingType;
  OrderRule?: EResourceDisconnectingOrderRule;
  /** @format int32 */
  BuildingId?: number;
  Status?: EResourceDisconnectingStatus;
  /** @format int32 */
  PageNumber?: number;
  /** @format int32 */
  PageSize?: number;
  OrderBy?: EOrderByRule;
  /** @format int32 */
  Skip?: number;
  /** @format int32 */
  Take?: number;
};
