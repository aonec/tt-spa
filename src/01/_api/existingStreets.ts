import { EOrderByRule } from 'myApi';

interface Params {
  Street?: string | null;
  City?: string | null;
  PageNumber?: number;
  PageSize?: number;
  OrderBy?: EOrderByRule;
}

export type GetExistingSteetRequestParams = Params;
