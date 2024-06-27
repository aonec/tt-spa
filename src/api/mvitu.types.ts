/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface AddNodeRequest {
  /** @format int32 */
  nodeId: number;
  /** @minLength 1 */
  addressSrt: string;
  /** @minLength 1 */
  fias: string;
  point?: Point | null;
  /**
   * Тип объекта МВИТУ
   * @minLength 1
   */
  buildingType: string;
  /** Код объекта МВИТУ */
  buildingCode?: string | null;
  /**
   * Номер ввода в здание
   * @format int32
   */
  buildingInputNum: number;
}

export interface BuildingAddressResponse {
  /** @format int32 */
  buildingId: number;
  city: string | null;
  street: string | null;
  number: string | null;
  corpus: string | null;
}

export interface BuildingResponse {
  /** @format int32 */
  id: number;
  addressSrt: string | null;
  /** @format uuid */
  fias: string | null;
  point: Point | null;
  /** Тип объекта МВИТУ */
  buildingType: string | null;
  /** Код объекта МВИТУ */
  buildingCode: string | null;
}

export interface ChangeStatusRequest {
  expectedStatus?: ChangeStatusType;
}

export enum ChangeStatusType {
  Active = 'Active',
  Pause = 'Pause',
}

export enum EHouseCategory {
  Living = 'Living',
  NonResidential = 'NonResidential',
}

export enum EOrderByRule {
  Ascending = 'Ascending',
  Descending = 'Descending',
}

export enum EResourceType {
  Heat = 'Heat',
  HotWaterSupply = 'HotWaterSupply',
  ColdWaterSupply = 'ColdWaterSupply',
  Electricity = 'Electricity',
}

export interface ErrorApiResponse {
  error: ErrorResponse | null;
}

export interface ErrorResponse {
  code: string | null;
  message: string | null;
  text: string | null;
  data: Record<string, any>;
  requestId: string | null;
}

export interface IntegrationInfoRequest {
  /** @minLength 1 */
  inn: string;
  /** @minLength 1 */
  legalName: string;
}

export interface MvituBuildingResponse {
  /** @format int32 */
  id: number;
  /** Адрес объекта в строковом представлении */
  addressStr: string | null;
  /** Тип объекта МВИТУ */
  buildingType: string | null;
  /** Код объекта МВИТУ */
  buildingCode: string | null;
  /**
   * ФИАС код объекта
   * @format uuid
   */
  fias: string;
  /** Узлы подключенные в объекте */
  nodeIds: number[] | null;
}

export interface MvituNodeResponse {
  /** @format int32 */
  id: number;
  buildingId: string | null;
  /** Состояние интеграции */
  status: NodeStatusType;
  /** Название узла */
  title: string | null;
  /** Ресурс узла */
  resource: EResourceType;
  /**
   * Номер ввода в здание
   * @format int32
   */
  buildingInputNum: number;
  /**
   * Последний переданный архив, MinValue если передачи еще не происходило
   * @format date-time
   */
  lastTransmittedArchiveTime: string;
  /**
   * Последний готовый к передаче архив, null - если все архивы переданы
   * @format date-time
   */
  lastIsReadyTransmitArchiveTime: string | null;
}

export interface NodeListResponse {
  /** @format int32 */
  id: number;
  title: string | null;
  resource: EResourceType;
  address: BuildingAddressResponse | null;
}

export interface NodeListResponsePagedList {
  /** @format int32 */
  totalItems: number;
  /** @format int32 */
  pageNumber: number;
  /** @format int32 */
  pageSize: number;
  /** @format int32 */
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  /** @format int32 */
  nextPageNumber: number;
  /** @format int32 */
  previousPageNumber: number;
  items: NodeListResponse[] | null;
}

export interface NodeResponse {
  /** @format int32 */
  id: number;
  title: string | null;
  building: BuildingResponse | null;
  resource: EResourceType;
}

/** Статус интеграции для узла */
export enum NodeStatusType {
  Paused = 'Paused',
  Active = 'Active',
}

export interface OrganizationInfo {
  /** ИНН */
  inn?: string | null;
  /** Юридическое наименование */
  legalName?: string | null;
}

export interface Point {
  /** @format double */
  latitude: number;
  /** @format double */
  longitude: number;
}

export interface StatusResponse {
  /** Статус интеграции */
  status: StatusType;
  organizationInfo: OrganizationInfo | null;
}

export interface StatusResponseSuccessApiResponse {
  successResponse: StatusResponse | null;
}

/** Статус интеграции */
export enum StatusType {
  Unconfigured = 'Unconfigured',
  Paused = 'Paused',
  Active = 'Active',
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, 'body' | 'bodyUsed'>;

export interface FullRequestParams extends Omit<RequestInit, 'body'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<
  FullRequestParams,
  'body' | 'method' | 'query' | 'path'
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, 'baseUrl' | 'cancelToken' | 'signal'>;
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain',
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = '';
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: 'same-origin',
    headers: {},
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(
      typeof value === 'number' ? value : `${value}`,
    )}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join('&');
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      (key) => 'undefined' !== typeof query[key],
    );
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key),
      )
      .join('&');
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : '';
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === 'object' || typeof input === 'string')
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== 'string'
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === 'object' && property !== null
            ? JSON.stringify(property)
            : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams,
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (
    cancelToken: CancelToken,
  ): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ''}${path}${
        queryString ? `?${queryString}` : ''
      }`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { 'Content-Type': type }
            : {}),
        },
        signal:
          (cancelToken
            ? this.createAbortSignal(cancelToken)
            : requestParams.signal) || null,
        body:
          typeof body === 'undefined' || body === null
            ? null
            : payloadFormatter(body),
      },
    ).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title Transparent App Api mvitu
 * @version 1.0
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @tags Building
     * @name MvituBuildingList
     * @summary Список объектов подключенных к интеграции
     * @request GET:/api/mvitu/Building
     * @secure
     */
    mvituBuildingList: (params: RequestParams = {}) =>
      this.request<MvituBuildingResponse[], ErrorApiResponse>({
        path: `/api/mvitu/Building`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Building
     * @name MvituBuildingNodesDetail
     * @summary Список узлов подключенных к интеграции по объекту
     * @request GET:/api/mvitu/Building/{buildingId}/Nodes
     * @secure
     */
    mvituBuildingNodesDetail: (
      buildingId: string,
      params: RequestParams = {},
    ) =>
      this.request<MvituNodeResponse[], ErrorApiResponse>({
        path: `/api/mvitu/Building/${buildingId}/Nodes`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Building
     * @name MvituBuildingNodesChangeStatusCreate
     * @summary Смена стратуса интеграции для узла
     * @request POST:/api/mvitu/Building/Nodes/{nodeId}/ChangeStatus
     * @secure
     */
    mvituBuildingNodesChangeStatusCreate: (
      nodeId: string,
      data: ChangeStatusRequest,
      params: RequestParams = {},
    ) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/mvitu/Building/Nodes/${nodeId}/ChangeStatus`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Building
     * @name MvituBuildingNodesCreate
     * @summary Добавление узла
     * @request POST:/api/mvitu/Building/Nodes
     * @secure
     */
    mvituBuildingNodesCreate: (
      data: AddNodeRequest,
      params: RequestParams = {},
    ) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/mvitu/Building/Nodes`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Building
     * @name MvituBuildingNodesDelete
     * @summary Удаление узла из интеграции
     * @request DELETE:/api/mvitu/Building/Nodes/{nodeId}
     * @secure
     */
    mvituBuildingNodesDelete: (nodeId: string, params: RequestParams = {}) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/mvitu/Building/Nodes/${nodeId}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Integrations
     * @name MvituIntegrationsList
     * @summary Статус интеграции. Если настроена - данные по организации: ИНН и Юридическое наименование
     * @request GET:/api/mvitu/Integrations
     * @secure
     */
    mvituIntegrationsList: (params: RequestParams = {}) =>
      this.request<StatusResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/mvitu/Integrations`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Integrations
     * @name MvituIntegrationsDelete
     * @summary Удаление ВСЕХ данных по интеграции
     * @request DELETE:/api/mvitu/Integrations
     * @secure
     */
    mvituIntegrationsDelete: (params: RequestParams = {}) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/mvitu/Integrations`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Integrations
     * @name MvituIntegrationsCreateOrUpdateCreate
     * @summary Cоздание (обновление) данных организации в интеграции
     * @request POST:/api/mvitu/Integrations/CreateOrUpdate
     * @secure
     */
    mvituIntegrationsCreateOrUpdateCreate: (
      data: IntegrationInfoRequest,
      params: RequestParams = {},
    ) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/mvitu/Integrations/CreateOrUpdate`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Integrations
     * @name MvituIntegrationsChangeStatusCreate
     * @summary Смена статуса интеграции
     * @request POST:/api/mvitu/Integrations/ChangeStatus
     * @secure
     */
    mvituIntegrationsChangeStatusCreate: (
      data: ChangeStatusRequest,
      params: RequestParams = {},
    ) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/mvitu/Integrations/ChangeStatus`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Searching
     * @name MvituSearchingNodesList
     * @summary Поиск узлов
     * @request GET:/api/mvitu/Searching/Nodes
     * @secure
     */
    mvituSearchingNodesList: (
      query?: {
        addressCity?: string;
        addressStreet?: string;
        addressHousingStockNumber?: string;
        addressCorpus?: string;
        addressHouseCategory?: EHouseCategory;
        CalculatorSerialNumber?: string;
        Resource?: EResourceType;
        /** @format int32 */
        PageNumber?: number;
        /** @format int32 */
        PageSize?: number;
        OrderBy?: EOrderByRule;
      },
      params: RequestParams = {},
    ) =>
      this.request<NodeListResponsePagedList, ErrorApiResponse>({
        path: `/api/mvitu/Searching/Nodes`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Searching
     * @name MvituSearchingNodesDetail
     * @summary Данные по узлу для формы добавления
     * @request GET:/api/mvitu/Searching/Nodes/{id}
     * @secure
     */
    mvituSearchingNodesDetail: (id: string, params: RequestParams = {}) =>
      this.request<NodeResponse, ErrorApiResponse>({
        path: `/api/mvitu/Searching/Nodes/${id}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),
  };
}
