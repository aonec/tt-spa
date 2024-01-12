import { Contract, HttpError } from '@farfetched/core';
import { EventCallable } from 'effector';

export type QueryFactoryParams<
  Params extends object | void,
  Data,
  TransformedData,
> = {
  url: ((params: Params) => string) | string;
  response?: {
    contract: Contract<unknown, { successResponse: Data | null }>;
    mapData?: (payload: {
      result: Data | null;
      params: Params;
    }) => TransformedData;
  };
  errorConverter?: (error: HttpError) => string;
};

export type MutationFactoryParams<
  Params extends object | void,
  Data,
  TransformedData,
  Body,
> = {
  url: ((params: Params) => string) | string;
  method: 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: Body;
  response: {
    contract: Contract<unknown, { successResponse: Data | null }>;
    mapData: (payload: {
      result: Data | null;
      params: Params;
    }) => TransformedData;
  };
  abort?: EventCallable<void>;
};

export type OperationFailDataError = {
  error: {
    Message: string;
    Text: string;
  };
};

export type SuccessResponse<T> = { successResponse: T };
