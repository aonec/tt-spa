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
  /** @format uuid */
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
  address: string | null;
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

export interface Calculator {
  /** @format int32 */
  id?: number;
  model?: string | null;
  serialNumber?: string | null;
  isConnected?: boolean;
}

export interface ChangeStatusRequest {
  expectedStatus?: ChangeStatusType;
}

export enum ChangeStatusType {
  Active = 'Active',
  Pause = 'Pause',
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
}

export interface MvituNodeResponse {
  /** @format int32 */
  id: number;
  nodeServiceZone: NodeServiceZoneResponse | null;
  building: MvituBuildingResponse | null;
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
  /** Метрики по интеграции узла */
  integrationStatus: NodeIntegrationStatus | null;
}

export interface MvituNodeResponsePagedList {
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
  items: MvituNodeResponse[] | null;
}

export interface NodeIntegrationStatus {
  /**
   * Последний переданный архив, null - если передачи еще не происходило
   * @format date-time
   */
  lastTransmittedArchiveTime?: string | null;
  /**
   * Последний готовый к передаче архив, null - если все архивы переданы
   * @format date-time
   */
  lastIsReadyTransmitArchiveTime?: string | null;
  /**
   * Кол-во готовых к передаче архивов
   * @format int32
   */
  isReadyTransmitTotalCount?: number;
}

export interface NodeListResponse {
  /** @format int32 */
  id: number;
  title: string | null;
  resource: EResourceType;
  address: BuildingAddressResponse | null;
  calculator: Calculator | null;
  nodeServiceZone: NodeServiceZoneResponse | null;
}

export interface NodeResponse {
  /** @format int32 */
  id: number;
  title: string | null;
  /** Статус интеграции */
  status: StatusType;
  building: BuildingResponse | null;
  resource: EResourceType;
  nodeServiceZone: NodeServiceZoneResponse | null;
}

export interface NodeSearchResponse {
  nodes: NodeListResponse[] | null;
  hasMore: boolean;
  /** @format int32 */
  totalCount: number;
}

export interface NodeServiceZoneResponse {
  /** @format int32 */
  id: number;
  name: string | null;
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
      const r = response.clone() as HttpResponse<T, E>;
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
     * @tags Integrations
     * @name MvituIntegrationsList
     * @summary Статус интеграции. Если настроена - данные по организации: ИНН и Юридическое наименование
     * @request GET:/api/mvitu/Integrations
     * @secure
     */
    mvituIntegrationsList: (params: RequestParams = {}) =>
      this.request<StatusResponse, ErrorApiResponse>({
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
     * @tags Nodes
     * @name MvituNodesList
     * @summary Список узлов подключенных к интеграции
     * @request GET:/api/mvitu/Nodes
     * @secure
     */
    mvituNodesList: (
      query?: {
        /** Строка адреса для поиска */
        AddressTerm?: string;
        /** Статус интеграции узла */
        Status?: NodeStatusType;
        /** @format int32 */
        PageNumber?: number;
        /** @format int32 */
        PageSize?: number;
        OrderBy?: EOrderByRule;
      },
      params: RequestParams = {},
    ) =>
      this.request<MvituNodeResponsePagedList, ErrorApiResponse>({
        path: `/api/mvitu/Nodes`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Nodes
     * @name MvituNodesCreate
     * @summary Добавление узла
     * @request POST:/api/mvitu/Nodes
     * @secure
     */
    mvituNodesCreate: (data: AddNodeRequest, params: RequestParams = {}) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/mvitu/Nodes`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Nodes
     * @name MvituNodesChangeStatusCreate
     * @summary Смена статуса интеграции для узла
     * @request POST:/api/mvitu/Nodes/{nodeId}/ChangeStatus
     * @secure
     */
    mvituNodesChangeStatusCreate: (
      nodeId: number,
      data: ChangeStatusRequest,
      params: RequestParams = {},
    ) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/mvitu/Nodes/${nodeId}/ChangeStatus`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Nodes
     * @name MvituNodesDelete
     * @summary Удаление узла из интеграции
     * @request DELETE:/api/mvitu/Nodes/{nodeId}
     * @secure
     */
    mvituNodesDelete: (nodeId: number, params: RequestParams = {}) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/mvitu/Nodes/${nodeId}`,
        method: 'DELETE',
        secure: true,
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
        /** Загрузить все результаты */
        LoadAll?: boolean;
        /** Строка адреса для поиска. Разбивается по пробелам, поиск по StartsWith */
        AddressTerm?: string;
        /** Серийный номер вычислителя, поиск по StartsWith */
        CalculatorSerialNumber?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<NodeSearchResponse, ErrorApiResponse>({
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
    mvituSearchingNodesDetail: (id: number, params: RequestParams = {}) =>
      this.request<NodeResponse, ErrorApiResponse>({
        path: `/api/mvitu/Searching/Nodes/${id}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),
  };
}
