import { EOrderByRule, NodeStatusType } from 'api/mvitu.types';

export type GetMvituNodesRequestParams = {
  /** Строка адреса для поиска */
  AddressTerm?: string;
  /** Статус интеграции узла */
  Status?: NodeStatusType;
  /** @format int32 */
  PageNumber?: number;
  /** @format int32 */
  PageSize?: number;
  OrderBy?: EOrderByRule;
};
