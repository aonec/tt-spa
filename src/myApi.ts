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

export interface ApartmentCreateRequest {
  /** @format int32 */
  housingStockId: number;
  number?: string | null;

  /** @format double */
  square?: number;

  /** @format int32 */
  numberOfLiving?: number;
}

export interface HousingStockShortResponse {
  /** @format int32 */
  id: number;
  city: string | null;
  street: string | null;
  number: string | null;
  corpus: string | null;
}

export interface HomeownerListResponse {
  firstName: string | null;
  middleName: string | null;
  lastName: string | null;
  phoneNumber: string | null;
  personalAccountNumber: string | null;
}

export interface ApartmentResponse {
  /** @format int32 */
  id: number;

  /** @format double */
  coefficient: number | null;
  housingStock: HousingStockShortResponse;
  comment: string | null;
  apartmentNumber: string | null;
  status: string | null;
  square: string | null;
  homeowners: HomeownerListResponse[] | null;

  /** @format int32 */
  numberOfLiving: number | null;

  /** @format int32 */
  normativeNumberOfLiving: number | null;
}

export interface ApartmentResponseSuccessApiResponse {
  successResponse: ApartmentResponse;
}

export interface ErrorResponse {
  code: string | null;
  message: string | null;

  /** @format int32 */
  logId: number | null;
  data: Record<string, any>;
}

export interface ErrorApiResponse {
  errorResponse: ErrorResponse;
}

export interface ApartmentListResponse {
  /** @format int32 */
  id: number;
  apartmentNumber: string | null;
  homeownerName: string | null;

  /** @format int32 */
  homeownersCount: number | null;
  personalAccountNumber: string | null;
  status: string | null;
  square: string | null;
}

export interface HousingStockAddressResponse {
  /** @format int32 */
  id: number;
  city: string | null;
  street: string | null;
  housingStockNumber: string | null;
  corpus: string | null;
}

export interface ApartmentPagedList {
  /** @format int32 */
  totalItems: number;

  /** @format int32 */
  pageNumber: number;

  /** @format int32 */
  pageSize: number;
  items: ApartmentListResponse[] | null;

  /** @format int32 */
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;

  /** @format int32 */
  nextPageNumber: number;

  /** @format int32 */
  previousPageNumber: number;
  housingStock: HousingStockAddressResponse;
}

export interface ApartmentPagedListSuccessApiResponse {
  successResponse: ApartmentPagedList;
}

export interface ApartmentUpdateRequest {
  /** @format double */
  square?: number | null;

  /** @format int32 */
  numberOfLiving?: number | null;

  /** @format int32 */
  normativeNumberOfLiving?: number | null;
}

export interface ApartmentStatusResponse {
  name: string | null;
  description: string | null;
}

export interface ApartmentListStatusResponse {
  statuses: ApartmentStatusResponse[] | null;
}

export interface ApartmentListStatusResponseSuccessApiResponse {
  successResponse: ApartmentListStatusResponse;
}

export interface ApartmentStatusSetRequest {
  status: string;

  /** @format date-time */
  fromDate?: string | null;

  /** @format date-time */
  toDate?: string | null;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export enum UserPermission {
  Default = "Default",
  ApartmentsRead = "ApartmentsRead",
  ApartmentsStatusPatch = "ApartmentsStatusPatch",
  ContractorsRead = "ContractorsRead",
  ContractorsCreate = "ContractorsCreate",
  ContractorsUpdate = "ContractorsUpdate",
  DocumentsCreate = "DocumentsCreate",
  DocumentsDelete = "DocumentsDelete",
  HousingStocksRead = "HousingStocksRead",
  MeteringDevicesRead = "MeteringDevicesRead",
  IndividualDeviceReadingsCreate = "IndividualDeviceReadingsCreate",
  ManagingFirmsRead = "ManagingFirmsRead",
  ManagingFirmsUpdate = "ManagingFirmsUpdate",
  ManagingFirmUsersRead = "ManagingFirmUsersRead",
  ManagingFirmUsersCreate = "ManagingFirmUsersCreate",
  ManagingFirmUsersUpdate = "ManagingFirmUsersUpdate",
  TasksRead = "TasksRead",
  TasksExecute = "TasksExecute",
  TaskAssign = "TaskAssign",
  TaskCommentsCreate = "TaskCommentsCreate",
  TaskCommentsUpdate = "TaskCommentsUpdate",
  TaskCommentsDelete = "TaskCommentsDelete",
  TaskDocumentsDelete = "TaskDocumentsDelete",
  UserRolesRead = "UserRolesRead",
  TaskCreate = "TaskCreate",
  MeteringDevicesClose = "MeteringDevicesClose",
  MeteringDevicesCheck = "MeteringDevicesCheck",
  CalculatorCreate = "CalculatorCreate",
  HousingStocksCreate = "HousingStocksCreate",
  HousingStocksUpdate = "HousingStocksUpdate",
  ApartmentCreate = "ApartmentCreate",
  CalculatorUpdate = "CalculatorUpdate",
  IndividualDeviceCreate = "IndividualDeviceCreate",
  IndividualDeviceUpdate = "IndividualDeviceUpdate",
  HousingMeteringDeviceUpdate = "HousingMeteringDeviceUpdate",
  HousingMeteringDeviceCreate = "HousingMeteringDeviceCreate",
  ApartmentUpdate = "ApartmentUpdate",
  CalculatorSwitch = "CalculatorSwitch",
  CalculatorInfoRead = "CalculatorInfoRead",
  HousingMeteringDeviceSwitch = "HousingMeteringDeviceSwitch",
  IndividualDeviceMountPlaceRead = "IndividualDeviceMountPlaceRead",
  HomeownersRead = "HomeownersRead",
  HomeownersCreate = "HomeownersCreate",
  HomeownersUpdate = "HomeownersUpdate",
  IndividualDeviceReadingsRead = "IndividualDeviceReadingsRead",
  IndividualDeviceReadingsUpdate = "IndividualDeviceReadingsUpdate",
  ManagingFirmsReadAll = "ManagingFirmsReadAll",
  TaskDelete = "TaskDelete",
  ReportRead = "ReportRead",
  ReportAdd = "ReportAdd",
  IndividualDeviceClose = "IndividualDeviceClose",
  DataMigration = "DataMigration",
}

export interface TokenResponse {
  token: string | null;
  refreshToken: string | null;
  roles: string[] | null;
  permissions: UserPermission[] | null;
}

export interface TokenResponseSuccessApiResponse {
  successResponse: TokenResponse;
}

export interface RefreshTokenRequest {
  token: string;
  refreshToken: string;
}

export interface RefreshResponse {
  token: string | null;
  refreshToken: string | null;
  permissions: UserPermission[] | null;
}

export interface RefreshResponseSuccessApiResponse {
  successResponse: RefreshResponse;
}

export interface LogoutRequest {
  token: string;
  refreshToken: string;
}

export interface ConfirmRequest {
  token: string;
  password: string;
}

export interface ConfirmResponse {
  /** @format int32 */
  id: number;
  email: string | null;
  password: string | null;
}

export interface ConfirmResponseSuccessApiResponse {
  successResponse: ConfirmResponse;
}

export interface CalculatorInfoListResponse {
  /** @format int32 */
  id: number;
  model: string | null;
}

export interface CalculatorInfoListWrappedResponse {
  items: CalculatorInfoListResponse[] | null;
}

export interface CalculatorInfoListWrappedResponseSuccessApiResponse {
  successResponse: CalculatorInfoListWrappedResponse;
}

export enum ExpiresCheckingDateAt {
  NextMonth = "NextMonth",
  NextTwoMonth = "NextTwoMonth",
  Past = "Past",
}

export enum OrderByDestination {
  Descending = "Descending",
  Ascending = "Ascending",
}

export enum CalculatorOrderBy {
  Street = "Street",
  FutureCheckingDate = "FutureCheckingDate",
}

export interface TimeSpan {
  /** @format int64 */
  ticks?: number;

  /** @format int32 */
  days?: number;

  /** @format int32 */
  hours?: number;

  /** @format int32 */
  milliseconds?: number;

  /** @format int32 */
  minutes?: number;

  /** @format int32 */
  seconds?: number;

  /** @format double */
  totalDays?: number;

  /** @format double */
  totalHours?: number;

  /** @format double */
  totalMilliseconds?: number;

  /** @format double */
  totalMinutes?: number;

  /** @format double */
  totalSeconds?: number;
}

export interface ManagementFirmResponse {
  /** @format int32 */
  id: number;
  name: string | null;
  phoneNumber: string | null;
  information: string | null;
  timeZoneOffset: TimeSpan;
}

export interface MeteringDeviceConnection {
  ipV4?: string | null;

  /** @format int32 */
  port?: number | null;

  /** @format int32 */
  deviceAddress?: number | null;
}

export enum ResourceType {
  None = "None",
  Heat = "Heat",
  HotWaterSupply = "HotWaterSupply",
  ColdWaterSupply = "ColdWaterSupply",
  Electricity = "Electricity",
}

export enum ServiceZone {
  Apartments = "Apartments",
  CommercialPremises = "CommercialPremises",
  TechnicalPremises = "TechnicalPremises",
  CommonUsageAreas = "CommonUsageAreas",
  IntroductoryNode = "IntroductoryNode",
}

export interface HousingMeteringDeviceHubConnectionResponse {
  /** @format int32 */
  entryNumber: number | null;

  /** @format int32 */
  pipeNumber: number | null;
  magistral: string | null;
}

export enum HousingMeteringDeviceType {
  None = "None",
  FlowMeter = "FlowMeter",
  TemperatureSensor = "TemperatureSensor",
  WeatherController = "WeatherController",
  PressureMeter = "PressureMeter",
}

export interface HousingMeteringDeviceListResponse {
  /** @format int32 */
  id: number;
  transactionType: string | null;
  model: string | null;
  serialNumber: string | null;
  managementFirm: ManagementFirmResponse;

  /** @format date-time */
  lastCommercialAccountingDate: string | null;

  /** @format date-time */
  futureCommercialAccountingDate: string | null;

  /** @format date-time */
  lastCheckingDate: string | null;

  /** @format date-time */
  futureCheckingDate: string | null;

  /** @format date-time */
  closingDate: string | null;
  hub: HousingMeteringDeviceHubConnectionResponse;
  diameter: string | null;
  resource: ResourceType;
  housingMeteringDeviceType: HousingMeteringDeviceType;
}

export interface CommunicationPipeResponse {
  /** @format int32 */
  id: number;

  /** @format int32 */
  number: number;

  /** @format int32 */
  entryNumber: number;
  magistral: string | null;
  devices: HousingMeteringDeviceListResponse[] | null;
}

export interface NodeResponse {
  /** @format int32 */
  id: number;

  /** @format int32 */
  number: number;
  nodeStatus: string | null;
  resource: ResourceType;
  serviceZone: ServiceZone;

  /** @format date-time */
  lastCommercialAccountingDate: string | null;

  /** @format date-time */
  futureCommercialAccountingDate: string | null;

  /** @format int32 */
  calculatorId: number | null;

  /** @format int32 */
  housingStockId: number | null;
  communicationPipes: CommunicationPipeResponse[] | null;
}

export interface CalculatorListResponse {
  /** @format int32 */
  id: number;
  transactionType: string | null;
  model: string | null;
  serialNumber: string | null;
  managementFirm: ManagementFirmResponse;

  /** @format date-time */
  lastCommercialAccountingDate: string | null;

  /** @format date-time */
  futureCommercialAccountingDate: string | null;

  /** @format date-time */
  lastCheckingDate: string | null;

  /** @format date-time */
  futureCheckingDate: string | null;

  /** @format date-time */
  closingDate: string | null;
  connection: MeteringDeviceConnection;
  isConnected: boolean | null;
  hasTasks: boolean | null;
  address: HousingStockAddressResponse;
  nodes: NodeResponse[] | null;
}

export interface CalculatorListResponsePagedList {
  /** @format int32 */
  totalItems: number;

  /** @format int32 */
  pageNumber: number;

  /** @format int32 */
  pageSize: number;
  items: CalculatorListResponse[] | null;

  /** @format int32 */
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;

  /** @format int32 */
  nextPageNumber: number;

  /** @format int32 */
  previousPageNumber: number;
}

export interface CalculatorListResponsePagedListSuccessApiResponse {
  successResponse: CalculatorListResponsePagedList;
}

export interface MeteringDeviceConnectionRequest {
  ipV4?: string | null;

  /** @format int32 */
  deviceAddress?: number | null;

  /** @format int32 */
  port?: number | null;
}

export interface CreateCalculatorRequest {
  serialNumber: string;

  /** @format date-time */
  lastCheckingDate?: string | null;

  /** @format date-time */
  futureCheckingDate?: string | null;

  /** @format date-time */
  lastCommercialAccountingDate?: string | null;
  documentsIds?: number[] | null;
  connection?: MeteringDeviceConnectionRequest;
  isConnected?: boolean;

  /** @format date-time */
  futureCommercialAccountingDate: string;

  /** @format int32 */
  housingStockId: number;

  /** @format int32 */
  infoId: number;
}

export interface MeteringDeviceResponse {
  /** @format int32 */
  id: number;

  /** @format int32 */
  housingStockId: number | null;
  model: string | null;
  serialNumber: string | null;
  diameter: string | null;
  connection: MeteringDeviceConnection;
  isConnected: boolean | null;
  type: string | null;
  resource: string | null;
  transactionType: string | null;

  /** @format date-time */
  lastCommercialAccountingDate: string;

  /** @format date-time */
  futureCommercialAccountingDate: string | null;

  /** @format date-time */
  lastCheckingDate: string | null;

  /** @format date-time */
  futureCheckingDate: string | null;

  /** @format date-time */
  closingDate: string | null;
  calculator: MeteringDeviceResponse;
}

export interface MeteringDeviceResponseSuccessApiResponse {
  successResponse: MeteringDeviceResponse;
}

export interface CalculatorResponse {
  /** @format int32 */
  id: number;
  transactionType: string | null;
  model: string | null;
  serialNumber: string | null;

  /** @format date-time */
  lastCommercialAccountingDate: string | null;

  /** @format date-time */
  futureCommercialAccountingDate: string | null;

  /** @format date-time */
  lastCheckingDate: string | null;

  /** @format date-time */
  futureCheckingDate: string | null;

  /** @format date-time */
  closingDate: string | null;
  connection: MeteringDeviceConnection;
  isConnected: boolean | null;
  address: HousingStockAddressResponse;

  /** @format int32 */
  infoId: number | null;
  nodes: NodeResponse[] | null;
}

export interface CalculatorResponseSuccessApiResponse {
  successResponse: CalculatorResponse;
}

export interface UpdateCalculatorRequest {
  serialNumber?: string | null;

  /** @format date-time */
  lastCheckingDate?: string | null;

  /** @format date-time */
  futureCheckingDate?: string | null;

  /** @format date-time */
  lastCommercialAccountingDate?: string | null;

  /** @format date-time */
  futureCommercialAccountingDate?: string | null;
  isConnected?: boolean;

  /** @format int32 */
  housingStockId?: number | null;

  /** @format int32 */
  infoId?: number | null;
  connection?: MeteringDeviceConnectionRequest;
}

export interface SwitchCalculatorRequest {
  /** @format int32 */
  deviceId: number;
  documentsIds?: number[] | null;

  /** @format int32 */
  newDeviceId?: number | null;
  serialNumber?: string | null;

  /** @format date-time */
  lastCheckingDate?: string | null;

  /** @format date-time */
  futureCheckingDate?: string | null;

  /** @format date-time */
  lastCommercialAccountingDate?: string | null;

  /** @format int32 */
  calculatorInfoId?: number | null;
  connection?: MeteringDeviceConnectionRequest;

  /** @format date-time */
  futureCommercialAccountingDate?: string | null;
}

export interface ContractorListResponse {
  /** @format int32 */
  id: number;
  name: string | null;
  email: string | null;
}

export interface PagedContractorResponse {
  /** @format int32 */
  totalCount: number;

  /** @format int32 */
  take: number | null;

  /** @format int32 */
  skip: number | null;
  items: ContractorListResponse[] | null;
}

export interface PagedContractorResponseSuccessApiResponse {
  successResponse: PagedContractorResponse;
}

export interface ContractorCreateRequest {
  /** @format int32 */
  id?: number;
  name?: string | null;
  email?: string | null;
}

export interface ContractorResponse {
  /** @format int32 */
  id: number;
  name: string | null;
  email: string | null;
}

export interface ContractorResponseSuccessApiResponse {
  successResponse: ContractorResponse;
}

export interface ContractorUpdateRequest {
  /** @format int32 */
  id?: number;
  name?: string | null;
  email?: string | null;
}

export enum DataMigrationMethod {
  HousingStockNumberAndCorpus = "HousingStockNumberAndCorpus",
  MeteringDeviceIsConnected = "MeteringDeviceIsConnected",
  CommunicationPipeNumbers = "CommunicationPipeNumbers",
  OldTasks = "OldTasks",
}

export interface DocumentResponse {
  /** @format int32 */
  id: number;
  name: string | null;

  /** @format date-time */
  uploadingTime: string;
  url: string | null;
  author: string | null;
  canBeEdited: boolean;
}

export interface DocumentResponseIEnumerableSuccessApiResponse {
  successResponse: DocumentResponse[] | null;
}

export interface FullAddressResponse {
  /** @format int32 */
  id: number;
  city: string | null;
  street: string | null;
  housingStockNumber: string | null;
  corpus: string | null;

  /** @format int32 */
  apartmentId: number | null;
  apartmentNumber: string | null;
}

export interface HomeownersListResponse {
  /** @format int32 */
  id: number;
  firstName: string | null;
  lastName: string | null;
  middleName: string | null;
  address: FullAddressResponse;
  hasTasks: boolean;
  personalAccountNumber: string | null;
}

export interface HomeownersListResponsePagedList {
  /** @format int32 */
  totalItems: number;

  /** @format int32 */
  pageNumber: number;

  /** @format int32 */
  pageSize: number;
  items: HomeownersListResponse[] | null;

  /** @format int32 */
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;

  /** @format int32 */
  nextPageNumber: number;

  /** @format int32 */
  previousPageNumber: number;
}

export interface HomeownersListResponsePagedListSuccessApiResponse {
  successResponse: HomeownersListResponsePagedList;
}

export interface HomeownersCreateRequest {
  firstName: string;
  lastName: string;
  middleName: string;
  personalAccountNumber: string;

  /** @format int32 */
  apartmentId: number;
}

export interface HomeownersApartmentResponse {
  /** @format int32 */
  apartmentId: number;
  city: string | null;
  street: string | null;
  housingStockNumber: string | null;
  apartmentNumber: string | null;
  personalAccountNumber: string | null;
  paymentCode: string | null;

  /** @format int32 */
  numberOfLiving: number | null;

  /** @format int32 */
  normativeNumberOfLiving: number | null;
  comment: string | null;
  square: string | null;
  ownershipArea: string | null;
}

export interface HomeownersResponse {
  /** @format int32 */
  id: number;
  firstName: string | null;
  lastName: string | null;
  middleName: string | null;
  cellphone: string | null;
  email: string | null;
  payments: HomeownersApartmentResponse[] | null;
}

export interface HomeownersResponseSuccessApiResponse {
  successResponse: HomeownersResponse;
}

export interface HomeownersUpdateRequest {
  firstName?: string | null;
  lastName?: string | null;
  middleName?: string | null;
  cellphone?: string | null;
  email?: string | null;
  apartmentsToRemove?: number[] | null;
}

export enum MagistralType {
  None = "None",
  FeedFlow = "FeedFlow",
  FeedBackFlow = "FeedBackFlow",
}

export interface PipeConnectionRequest {
  /** @format int32 */
  calculatorId: number;

  /** @format int32 */
  entryNumber: number;

  /** @format int32 */
  pipeNumber: number;
  magistral: MagistralType;

  /** @format int32 */
  nodeId: number;
}

export interface UpdateHousingMeteringDeviceRequest {
  serialNumber?: string | null;

  /** @format date-time */
  lastCheckingDate?: string | null;

  /** @format date-time */
  futureCheckingDate?: string | null;

  /** @format date-time */
  lastCommercialAccountingDate?: string | null;

  /** @format date-time */
  futureCommercialAccountingDate?: string | null;
  housingMeteringDeviceType?: HousingMeteringDeviceType;
  resource?: ResourceType;
  model?: string | null;

  /** @format int32 */
  pipeId?: number | null;
  pipe?: PipeConnectionRequest;

  /** @format int32 */
  diameter?: number | null;
}

export interface HousingMeteringDeviceConnectionResponse {
  hub: HousingMeteringDeviceHubConnectionResponse;

  /** @format int32 */
  calculatorId: number;

  /** @format int32 */
  nodeId: number | null;
  calculatorSerialNumber: string | null;
  calculatorModel: string | null;
  calculatorConnection: MeteringDeviceConnection;
}

export interface HousingMeteringDeviceResponse {
  /** @format int32 */
  id: number;
  transactionType: string | null;
  model: string | null;
  serialNumber: string | null;

  /** @format date-time */
  lastCommercialAccountingDate: string | null;

  /** @format date-time */
  futureCommercialAccountingDate: string | null;

  /** @format date-time */
  lastCheckingDate: string | null;

  /** @format date-time */
  futureCheckingDate: string | null;

  /** @format date-time */
  closingDate: string | null;
  diameter: string | null;
  resource: ResourceType;
  housingMeteringDeviceType: HousingMeteringDeviceType;
  address: HousingStockAddressResponse;
  hubConnection: HousingMeteringDeviceConnectionResponse;
}

export interface HousingMeteringDeviceResponseSuccessApiResponse {
  successResponse: HousingMeteringDeviceResponse;
}

export interface CreateHousingMeteringDeviceRequest {
  serialNumber: string;

  /** @format date-time */
  lastCheckingDate?: string | null;

  /** @format date-time */
  futureCheckingDate?: string | null;

  /** @format date-time */
  lastCommercialAccountingDate?: string | null;
  documentsIds?: number[] | null;

  /** @format date-time */
  futureCommercialAccountingDate: string;
  housingMeteringDeviceType: HousingMeteringDeviceType;
  resource: ResourceType;
  model: string;

  /** @format int32 */
  pipeId?: number | null;
  pipe?: PipeConnectionRequest;

  /** @format int32 */
  diameter?: number | null;
}

export interface SwitchHousingMeteringDeviceRequest {
  /** @format int32 */
  deviceId: number;
  documentsIds?: number[] | null;

  /** @format int32 */
  newDeviceId?: number | null;
  serialNumber?: string | null;

  /** @format date-time */
  lastCheckingDate?: string | null;

  /** @format date-time */
  futureCheckingDate?: string | null;

  /** @format date-time */
  lastCommercialAccountingDate?: string | null;
  model?: string | null;

  /** @format date-time */
  futureCommercialAccountingDate?: string | null;
}

export interface Point {
  /** @format double */
  latitude?: number;

  /** @format double */
  longitude?: number;
}

export interface HousingStockAddressRequest {
  city: string;
  street: string;
  number: string;
  corpus?: string | null;
  coordinates?: Point;
  index?: string | null;
  district?: string | null;
}

export interface HousingStockCreateRequest {
  address: HousingStockAddressRequest;
}

export interface HousingStockResponse {
  /** @format int32 */
  id: number;
  index: string | null;
  region: string | null;
  city: string | null;
  district: string | null;
  street: string | null;
  number: string | null;
  corpus: string | null;
  coordinates: Point;
  houseCategory: string | null;

  /** @format int32 */
  numberOfEntrances: number | null;

  /** @format int32 */
  numberOfFloors: number | null;
  isThereElevator: boolean | null;

  /** @format int32 */
  numberOfApartments: number | null;
  totalLivingArea: string | null;
  areaOfNonResidential: string | null;
  houseArea: string | null;
  totalArea: string | null;

  /** @format date-time */
  constructionDate: string | null;
}

export interface HousingStockResponseSuccessApiResponse {
  successResponse: HousingStockResponse;
}

export interface HousingStockListResponse {
  /** @format int32 */
  id: number;
  city: string | null;
  street: string | null;
  number: string | null;
  corpus: string | null;

  /** @format int32 */
  numberOfTasks: number | null;

  /** @format int32 */
  numberOfApartments: number;
}

export interface HousingStockListResponsePagedList {
  /** @format int32 */
  totalItems: number;

  /** @format int32 */
  pageNumber: number;

  /** @format int32 */
  pageSize: number;
  items: HousingStockListResponse[] | null;

  /** @format int32 */
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;

  /** @format int32 */
  nextPageNumber: number;

  /** @format int32 */
  previousPageNumber: number;
}

export interface HousingStockListResponsePagedListSuccessApiResponse {
  successResponse: HousingStockListResponsePagedList;
}

export interface HousingStockUpdateRequest {
  address?: HousingStockAddressRequest;
  houseCategory?: string | null;

  /** @format int32 */
  numberOfEntrances?: number | null;

  /** @format int32 */
  numberOfFloors?: number | null;
  isThereElevator?: boolean | null;

  /** @format int32 */
  numberOfApartments?: number | null;

  /** @format double */
  totalLivingArea?: number | null;

  /** @format double */
  areaOfNonResidential?: number | null;

  /** @format double */
  houseArea?: number | null;

  /** @format double */
  totalArea?: number | null;

  /** @format date-time */
  constructionDate?: string | null;
}

export interface MeteringDeviceListResponse {
  /** @format int32 */
  id: number;

  /** @format int32 */
  housingStockId: number | null;
  ipV4: string | null;

  /** @format int32 */
  port: number | null;

  /** @format int32 */
  deviceAddress: number | null;
  model: string | null;
  serialNumber: string | null;
  type: string | null;
  resource: string | null;

  /** @format date-time */
  closingDate: string | null;

  /** @format date-time */
  futureCheckingDate: string | null;
  timeZoneOffset: TimeSpan;
}

export interface HousingStockDeviceListResponse {
  housingStock: HousingStockListResponse;
  meteringDevice: MeteringDeviceListResponse;
  devices: MeteringDeviceListResponse[] | null;
}

export interface HousingStockDeviceListResponseSuccessApiResponse {
  successResponse: HousingStockDeviceListResponse;
}

export interface HousingStockDeviceResponse {
  housingStock: HousingStockListResponse;
  device: MeteringDeviceResponse;
}

export interface HousingStockDeviceResponseSuccessApiResponse {
  successResponse: HousingStockDeviceResponse;
}

export interface PipesListResponse {
  street: string | null;
  number: string | null;
  city: string | null;
  meteringDevice: MeteringDeviceListResponse;
  pipes: CommunicationPipeResponse[] | null;
}

export interface PipesListResponseSuccessApiResponse {
  successResponse: PipesListResponse;
}

export interface IndividualDeviceMountPlaceListResponse {
  /** @format int32 */
  id: number;
  name: string | null;
  description: string | null;
}

export interface IndividualDeviceMountPlaceListWrappedResponse {
  items: IndividualDeviceMountPlaceListResponse[] | null;
}

export interface IndividualDeviceMountPlaceListWrappedResponseSuccessApiResponse {
  successResponse: IndividualDeviceMountPlaceListWrappedResponse;
}

export interface IndividualDeviceReadingsCreateRequest {
  isForced?: boolean;

  /** @format int32 */
  deviceId: number;

  /** @format double */
  value1: number;

  /** @format double */
  value2?: number | null;

  /** @format double */
  value3?: number | null;

  /** @format double */
  value4?: number | null;

  /** @format date-time */
  readingDate: string;

  /** @format date-time */
  uploadTime?: string | null;
}

export interface IndividualDeviceReadingsCreateResponse {
  status: string | null;
  date: string | null;
  resource: string | null;

  /** @format int32 */
  taskId: number | null;
  message: string | null;
}

export interface IndividualDeviceReadingsCreateListResponse {
  current: IndividualDeviceReadingsCreateResponse;
  modified: IndividualDeviceReadingsCreateResponse[] | null;
}

export interface IndividualDeviceReadingsCreateListResponseSuccessApiResponse {
  successResponse: IndividualDeviceReadingsCreateListResponse;
}

export interface IndividualDeviceReadingsExistingFlagModel {
  /** @format int32 */
  deviceId?: number;
  doesExist?: boolean;
}

export interface IndividualDeviceReadingsExistingFlagModelPagedList {
  /** @format int32 */
  totalItems: number;

  /** @format int32 */
  pageNumber: number;

  /** @format int32 */
  pageSize: number;
  items: IndividualDeviceReadingsExistingFlagModel[] | null;

  /** @format int32 */
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;

  /** @format int32 */
  nextPageNumber: number;

  /** @format int32 */
  previousPageNumber: number;
}

export interface IndividualDeviceReadingsExistingFlagModelPagedListSuccessApiResponse {
  successResponse: IndividualDeviceReadingsExistingFlagModelPagedList;
}

export interface IndividualDeviceReadingsSetEmptyRequest {
  /** @format date-time */
  date: string;
  devicesIds: number[];
}

export enum IndividualDeviceRateType {
  None = "None",
  OneZone = "OneZone",
  TwoZone = "TwoZone",
  ThreeZone = "ThreeZone",
}

export interface IndividualDeviceReadingsResponse {
  /** @format int32 */
  id: number;
  hasError: boolean;
  status: string | null;
  statusMessage: string | null;
  value1: string | null;
  value2: string | null;
  value3: string | null;
  value4: string | null;
  readingDate: string | null;

  /** @format date-time */
  uploadTime: string;
}

export interface IndividualDeviceResponse {
  /** @format int32 */
  id: number;
  transactionType: string | null;
  model: string | null;
  serialNumber: string | null;

  /** @format date-time */
  lastCommercialAccountingDate: string | null;

  /** @format date-time */
  futureCommercialAccountingDate: string | null;

  /** @format date-time */
  lastCheckingDate: string | null;

  /** @format date-time */
  futureCheckingDate: string | null;

  /** @format date-time */
  closingDate: string | null;
  address: FullAddressResponse;
  resource: ResourceType;
  mountPlace: string | null;
  rateType: IndividualDeviceRateType;
  readings: IndividualDeviceReadingsResponse[] | null;
  hasMagneticSeal: boolean;

  /** @format date-time */
  magneticSealInstallationDate: string | null;
}

export interface IndividualDeviceResponseSuccessApiResponse {
  successResponse: IndividualDeviceResponse;
}

export interface UpdateIndividualDeviceRequest {
  serialNumber?: string | null;

  /** @format date-time */
  lastCheckingDate?: string | null;

  /** @format date-time */
  futureCheckingDate?: string | null;

  /** @format date-time */
  lastCommercialAccountingDate?: string | null;

  /** @format date-time */
  futureCommercialAccountingDate?: string | null;
  model?: string | null;

  /** @format int32 */
  mountPlaceId?: number | null;
  resource?: ResourceType;

  /** @format int32 */
  apartmentId?: number | null;
  rateType?: string | null;
}

export interface IndividualDeviceListItemResponse {
  /** @format int32 */
  id: number;
  transactionType: string | null;
  model: string | null;
  serialNumber: string | null;
  managementFirm: ManagementFirmResponse;

  /** @format date-time */
  lastCommercialAccountingDate: string | null;

  /** @format date-time */
  futureCommercialAccountingDate: string | null;

  /** @format date-time */
  lastCheckingDate: string | null;

  /** @format date-time */
  futureCheckingDate: string | null;

  /** @format date-time */
  closingDate: string | null;
  resource: ResourceType;
  mountPlace: string | null;
  rateType: IndividualDeviceRateType;
  readings: IndividualDeviceReadingsResponse[] | null;
  apartmentNumber: string | null;
  homeownerName: string | null;
  personalAccountNumber: string | null;
  hasMagneticSeal: boolean;

  /** @format date-time */
  magneticSealInstallationDate: string | null;
}

export interface IndividualDeviceListItemResponsePagedList {
  /** @format int32 */
  totalItems: number;

  /** @format int32 */
  pageNumber: number;

  /** @format int32 */
  pageSize: number;
  items: IndividualDeviceListItemResponse[] | null;

  /** @format int32 */
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;

  /** @format int32 */
  nextPageNumber: number;

  /** @format int32 */
  previousPageNumber: number;
}

export interface IndividualDeviceListItemResponsePagedListSuccessApiResponse {
  successResponse: IndividualDeviceListItemResponsePagedList;
}

export interface CreateIndividualDeviceRequest {
  serialNumber: string;

  /** @format date-time */
  lastCheckingDate?: string | null;

  /** @format date-time */
  futureCheckingDate?: string | null;

  /** @format date-time */
  lastCommercialAccountingDate?: string | null;
  documentsIds?: number[] | null;
  model?: string | null;

  /** @format int32 */
  apartmentId: number;
  resource: ResourceType;

  /** @format int32 */
  mountPlaceId?: number | null;
  rateType: string;
}

export interface CloseDeviceRequest {
  /** @format int32 */
  deviceId: number;
  documentsIds?: number[] | null;

  /** @format date-time */
  closingDate: string;
}

export interface ManagementFirmResponsePagedList {
  /** @format int32 */
  totalItems: number;

  /** @format int32 */
  pageNumber: number;

  /** @format int32 */
  pageSize: number;
  items: ManagementFirmResponse[] | null;

  /** @format int32 */
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;

  /** @format int32 */
  nextPageNumber: number;

  /** @format int32 */
  previousPageNumber: number;
}

export interface ManagementFirmResponsePagedListSuccessApiResponse {
  successResponse: ManagementFirmResponsePagedList;
}

export interface ManagementFirmResponseSuccessApiResponse {
  successResponse: ManagementFirmResponse;
}

export interface ManagementFirmUpdateRequest {
  name?: string | null;
  phoneNumber?: string | null;
  timeZoneOffset?: TimeSpan;
}

export interface ManagingFirmUserListResponse {
  /** @format int32 */
  id: number;
  email: string | null;
  name: string | null;
  cellphone: string | null;

  /** @format int32 */
  executingTaskCount: number;
}

export interface PagedManagingFirmUserResponse {
  /** @format int32 */
  totalCount: number;

  /** @format int32 */
  take: number | null;

  /** @format int32 */
  skip: number | null;
  items: ManagingFirmUserListResponse[] | null;
}

export interface PagedManagingFirmUserResponseSuccessApiResponse {
  successResponse: PagedManagingFirmUserResponse;
}

export interface ManagingFirmUserCreateRequest {
  email: string;
  firstName: string;
  lastName: string;
  middleName: string;
  cellphone: string;
  department: string;
  position: string;
  number: string;
  userRolesIds: number[];
}

export interface ManagementFirmShortResponse {
  /** @format int32 */
  id: number;
  name: string | null;
}

export interface ManagingFirmUserResponse {
  /** @format int32 */
  id: number;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  middleName: string | null;
  cellphone: string | null;
  department: string | null;
  position: string | null;
  number: string | null;
  managementFirm: ManagementFirmShortResponse;
  userRoleIds: number[] | null;
}

export interface ManagingFirmUserResponseSuccessApiResponse {
  successResponse: ManagingFirmUserResponse;
}

export interface ManagingFirmUserUpdateRequest {
  email?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  middleName?: string | null;
  cellphone?: string | null;
  department?: string | null;
  position?: string | null;
  number?: string | null;
  userRolesIds?: number[] | null;
}

export interface MeteringDeviceListResponsePagedList {
  /** @format int32 */
  totalItems: number;

  /** @format int32 */
  pageNumber: number;

  /** @format int32 */
  pageSize: number;
  items: MeteringDeviceListResponse[] | null;

  /** @format int32 */
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;

  /** @format int32 */
  nextPageNumber: number;

  /** @format int32 */
  previousPageNumber: number;
}

export interface MeteringDeviceListResponsePagedListSuccessApiResponse {
  successResponse: MeteringDeviceListResponsePagedList;
}

export interface MeteringDeviceSearchListResponse {
  /** @format int32 */
  id: number;
  type: string | null;
  isConnected: boolean;
  model: string | null;
  serialNumber: string | null;
  ipV4: string | null;

  /** @format int32 */
  port: number | null;

  /** @format int32 */
  deviceAddress: number | null;
  resource: string | null;
}

export interface MeteringDeviceSearchListResponseIEnumerableSuccessApiResponse {
  successResponse: MeteringDeviceSearchListResponse[] | null;
}

export interface MeteringDeviceListResponseIEnumerableSuccessApiResponse {
  successResponse: MeteringDeviceListResponse[] | null;
}

export interface CheckDeviceRequest {
  /** @format int32 */
  deviceId: number;
  documentsIds?: number[] | null;

  /** @format date-time */
  currentCheckingDate: string;

  /** @format date-time */
  futureCheckingDate: string;
}

export interface NodeResponseListSuccessApiResponse {
  successResponse: NodeResponse[] | null;
}

export interface UpdateNodeRequest {
  /** @format int32 */
  number?: number;
  nodeStatus?: string | null;
  resource?: ResourceType;
  serviceZone?: ServiceZone;

  /** @format date-time */
  lastCommercialAccountingDate?: string | null;

  /** @format date-time */
  futureCommercialAccountingDate?: string | null;

  /** @format int32 */
  calculatorId?: number | null;
}

export interface NodeResponseSuccessApiResponse {
  successResponse: NodeResponse;
}

export interface CommunicationPipeRequest {
  /** @format int32 */
  number?: number;

  /** @format int32 */
  entryNumber?: number;
  magistral?: string | null;
  devices?: CreateHousingMeteringDeviceRequest[] | null;
}

export interface CreateNodeRequest {
  /** @format int32 */
  number?: number;
  nodeStatus?: string | null;
  resource?: ResourceType;
  serviceZone?: ServiceZone;

  /** @format date-time */
  lastCheckingDate?: string | null;

  /** @format date-time */
  futureCheckingDate?: string | null;

  /** @format int32 */
  calculatorId?: number | null;
  communicationPipes?: CommunicationPipeRequest[] | null;
}

export interface ServiceZoneStringDictionaryItem {
  key?: ServiceZone;
  value?: string | null;
}

export interface NodeServiceZonesResponse {
  serviceZones: ServiceZoneStringDictionaryItem[] | null;
}

export interface NodeServiceZonesResponseListSuccessApiResponse {
  successResponse: NodeServiceZonesResponse[] | null;
}

export interface GroupReportResponse {
  /** @format uuid */
  id: string | null;

  /** @format uuid */
  houseManagementId: string | null;
  title: string | null;
}

export interface ResourceTypeStringDictionaryItem {
  key?: ResourceType;
  value?: string | null;
}

export enum NodeCommercialAccountStatus {
  NotRegistered = "NotRegistered",
  Registered = "Registered",
  OnReview = "OnReview",
  Prepared = "Prepared",
}

export interface NodeCommercialAccountStatusStringDictionaryItem {
  key?: NodeCommercialAccountStatus;
  value?: string | null;
}

export interface GroupReportHousingStock {
  /** @format int32 */
  id?: number;
  number?: string | null;
  corpus?: string | null;
  categoryText?: string | null;
}

export interface GroupReportHousingStockGroup {
  street?: string | null;
  housingStocks?: GroupReportHousingStock[] | null;
}

export interface GroupReportContractor {
  /** @format int32 */
  id?: number;
  title?: string | null;
}

export interface GroupReportFormResponse {
  groupReports: GroupReportResponse[] | null;
  nodeResourceTypes: ResourceTypeStringDictionaryItem[] | null;
  nodeStatuses: NodeCommercialAccountStatusStringDictionaryItem[] | null;
  housingStockGroups: GroupReportHousingStockGroup[] | null;
  contractors: GroupReportContractor[] | null;
}

export interface GroupReportFormResponseSuccessApiResponse {
  successResponse: GroupReportFormResponse;
}

export interface CreateGroupReportRequest {
  title?: string | null;
  housingStockIds?: number[] | null;
}

export interface GroupReportResponseSuccessApiResponse {
  successResponse: GroupReportResponse;
}

export enum EmailSubscriptionType {
  Once = "Once",
  OncePerTwoWeeks = "OncePerTwoWeeks",
  OncePerMonth = "OncePerMonth",
  OncePerQuarter = "OncePerQuarter",
}

export enum TaskGroupingFilter {
  Executing = "Executing",
  Observing = "Observing",
  NotArchived = "NotArchived",
  Archived = "Archived",
}

export interface ManagingFirmUserShortResponse {
  /** @format int32 */
  id: number;
  name: string | null;
  email: string | null;
}

export interface StageResponse {
  /** @format int32 */
  id: number;

  /** @format int32 */
  number: number;
  name: string | null;
  perpetrator: ManagingFirmUserShortResponse;
  status: string | null;
  actions: string[] | null;
  allowedDocumentTypes: string[] | null;

  /** @format date-time */
  closingTime: string | null;

  /** @format date-time */
  startingTime: string | null;

  /** @format date-time */
  expectedCompletionTime: string | null;
}

export interface TaskTriggersInformation {
  /** @format date-time */
  triggerTime?: string;

  /** @format int32 */
  previousTriggersCount?: number | null;

  /** @format int32 */
  currentTriggersCount?: number;
}

export interface TaskListResponse {
  /** @format int32 */
  id: number;
  name: string | null;
  currentStage: StageResponse;

  /** @format date-time */
  creationTime: string | null;

  /** @format date-time */
  expectedCompletionTime: string | null;

  /** @format date-time */
  closingTime: string | null;
  address: FullAddressResponse;
  perpetrator: ManagingFirmUserShortResponse;
  isResponsible: boolean;

  /** @format int32 */
  targetId: number | null;
  hasChanged: boolean;
  needsValidation: boolean;
  triggersInformation: TaskTriggersInformation;
  device: MeteringDeviceSearchListResponse;
}

export interface TasksPagedList {
  /** @format int32 */
  totalItems: number;

  /** @format int32 */
  pageNumber: number;

  /** @format int32 */
  pageSize: number;
  items: TaskListResponse[] | null;

  /** @format int32 */
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;

  /** @format int32 */
  nextPageNumber: number;

  /** @format int32 */
  previousPageNumber: number;

  /** @format int32 */
  executingTasksCount: number | null;

  /** @format int32 */
  observingTasksCount: number | null;
}

export interface TasksPagedListSuccessApiResponse {
  successResponse: TasksPagedList;
}

export interface TaskCommentResponse {
  /** @format int32 */
  id: number;
  text: string | null;
  author: string | null;

  /** @format date-time */
  createdAt: string;
  canBeEdited: boolean;
}

export interface StageListResponse {
  /** @format int32 */
  id: number;

  /** @format int32 */
  number: number;
  name: string | null;
  perpetrator: ManagingFirmUserShortResponse;
  status: string | null;
  type: string | null;

  /** @format date-time */
  closingTime: string | null;

  /** @format date-time */
  expectedCompletionTime: string | null;
}

export interface TaskResponse {
  /** @format int32 */
  id: number;
  name: string | null;
  type: string | null;
  creationReason: string | null;
  address: string | null;

  /** @format int32 */
  housingStockId: number;
  perpetrator: ManagingFirmUserShortResponse;

  /** @format date-time */
  creationTime: string | null;

  /** @format date-time */
  expectedCompletionTime: string | null;

  /** @format date-time */
  closingTime: string | null;
  isResponsible: boolean;
  userOperatingStatus: string | null;
  currentStage: StageResponse;
  device: MeteringDeviceResponse;
  apartment: ApartmentResponse;
  documents: DocumentResponse[] | null;
  comments: TaskCommentResponse[] | null;
  stages: StageListResponse[] | null;
}

export interface TaskResponseSuccessApiResponse {
  successResponse: TaskResponse;
}

export enum TaskTargetObjectRequestType {
  None = "None",
  Apartment = "Apartment",
  MeteringDevice = "MeteringDevice",
}

export interface TaskCreationTargetObjectRequest {
  type?: TaskTargetObjectRequestType;

  /** @format int32 */
  id?: number;
}

export interface TaskCreateRequest {
  targetObject: TaskCreationTargetObjectRequest;
  creationReason?: string | null;
  taskType: string;
}

export interface TaskCreateResponse {
  /** @format int32 */
  id: number;
  type: string | null;

  /** @format date-time */
  triggerTime: string;

  /** @format int32 */
  triggersCount: number;
  isValidated: boolean;
}

export interface TaskCreateResponseSuccessApiResponse {
  successResponse: TaskCreateResponse;
}

export interface StageEmailNotifyRequest {
  contractorsIds?: number[] | null;
  message?: string | null;
}

export interface StagePushRequest {
  comment?: string | null;
  emailNotify?: StageEmailNotifyRequest;

  /** @format int32 */
  nextStageId?: number | null;

  /** @format int32 */
  nextPerpetratorId?: number | null;

  /** @format date-time */
  nextStageDeadline?: string | null;
  documentsIds?: number[] | null;
  deviceChecks?: CheckDeviceRequest[] | null;
  deviceCloses?: CloseDeviceRequest[] | null;
  calculatorSwitch?: SwitchCalculatorRequest;
  housingMeteringDeviceSwitch?: SwitchHousingMeteringDeviceRequest;
  readings?: IndividualDeviceReadingsCreateRequest[] | null;
}

export interface StageRevertRequest {
  comment?: string | null;
}

export interface StageListResponseWrappedListResponse {
  items: StageListResponse[] | null;
}

export interface StageListResponseWrappedListResponseSuccessApiResponse {
  successResponse: StageListResponseWrappedListResponse;
}

export interface TaskCommentResponseSuccessApiResponse {
  successResponse: TaskCommentResponse;
}

export interface TaskAssignToMultipleRequest {
  taskIds: number[];

  /** @format int32 */
  nextPerpetratorId: number;
}

export interface UserRoleListResponse {
  /** @format int32 */
  id: number;
  name: string | null;
}

export interface UserRoleListWrappedResponse {
  items: UserRoleListResponse[] | null;
}

export interface UserRoleListWrappedResponseSuccessApiResponse {
  successResponse: UserRoleListWrappedResponse;
}

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, ResponseType } from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
}

export class HttpClient<SecurityDataType = unknown> {
  private instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];

  constructor({ securityWorker, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "" });
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  private mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    return {
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  public request = async <T = any, E = any>({
    secure,
    path,
    type,
    query,
    format = "json",
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams = (secure && this.securityWorker && (await this.securityWorker(this.securityData))) || {};
    const requestParams = this.mergeRequestParams(params, secureParams);

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
        ...(requestParams.headers || {}),
      },
      params: query,
      responseType: format,
      data: body,
      url: path,
    });
  };
}

export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @tags Apartments
     * @name ApartmentsCreate
     * @request POST:/api/Apartments
     * @secure
     */
    apartmentsCreate: (data: ApartmentCreateRequest, params: RequestParams = {}) =>
      this.request<ApartmentResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/Apartments`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Apartments
     * @name ApartmentsList
     * @request GET:/api/Apartments
     * @secure
     */
    apartmentsList: (
      query?: {
        City?: string | null;
        Street?: string | null;
        HousingStockNumber?: string | null;
        ApartmentNumber?: string | null;
        Corpus?: string | null;
        HousingStockId?: number | null;
        PageNumber?: number;
        PageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ApartmentPagedListSuccessApiResponse, ErrorApiResponse>({
        path: `/api/Apartments`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Apartments
     * @name ApartmentsUpdate
     * @request PUT:/api/Apartments/{apartmentId}
     * @secure
     */
    apartmentsUpdate: (apartmentId: number, data: ApartmentUpdateRequest, params: RequestParams = {}) =>
      this.request<ApartmentResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/Apartments/${apartmentId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Apartments
     * @name ApartmentsDetail
     * @request GET:/api/Apartments/{apartmentId}
     * @secure
     */
    apartmentsDetail: (apartmentId: number, params: RequestParams = {}) =>
      this.request<ApartmentResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/Apartments/${apartmentId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Apartments
     * @name ApartmentsApartmentStatusList
     * @request GET:/api/Apartments/ApartmentStatus
     * @secure
     */
    apartmentsApartmentStatusList: (params: RequestParams = {}) =>
      this.request<ApartmentListStatusResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/Apartments/ApartmentStatus`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Apartments
     * @name ApartmentsSetStatusPartialUpdate
     * @request PATCH:/api/Apartments/{apartmentId}/SetStatus
     * @secure
     */
    apartmentsSetStatusPartialUpdate: (
      apartmentId: number,
      data: ApartmentStatusSetRequest,
      params: RequestParams = {},
    ) =>
      this.request<any, ErrorApiResponse>({
        path: `/api/Apartments/${apartmentId}/SetStatus`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthLoginCreate
     * @request POST:/api/Auth/login
     * @secure
     */
    authLoginCreate: (data: LoginRequest, params: RequestParams = {}) =>
      this.request<TokenResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/Auth/login`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthRefreshTokenCreate
     * @request POST:/api/Auth/refreshToken
     * @secure
     */
    authRefreshTokenCreate: (data: RefreshTokenRequest, params: RequestParams = {}) =>
      this.request<RefreshResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/Auth/refreshToken`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthLogoutCreate
     * @request POST:/api/Auth/logout
     * @secure
     */
    authLogoutCreate: (data: LogoutRequest, params: RequestParams = {}) =>
      this.request<any, ErrorApiResponse>({
        path: `/api/Auth/logout`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthConfirmCreate
     * @request POST:/api/Auth/confirm
     * @secure
     */
    authConfirmCreate: (data: ConfirmRequest, params: RequestParams = {}) =>
      this.request<ConfirmResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/Auth/confirm`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags CalculatorInfos
     * @name CalculatorInfosList
     * @request GET:/api/CalculatorInfos
     * @secure
     */
    calculatorInfosList: (params: RequestParams = {}) =>
      this.request<CalculatorInfoListWrappedResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/CalculatorInfos`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Calculators
     * @name CalculatorsList
     * @request GET:/api/Calculators
     * @secure
     */
    calculatorsList: (
      query?: {
        "Filter.DiameterRange.From"?: number | null;
        "Filter.DiameterRange.To"?: number | null;
        "Filter.ExpiresCheckingDateAt"?: ExpiresCheckingDateAt;
        "Filter.Resource"?: string | null;
        "Filter.Model"?: string | null;
        "Filter.CommercialDateRange.From"?: string | null;
        "Filter.CommercialDateRange.To"?: string | null;
        "Filter.Address.City"?: string | null;
        "Filter.Address.Street"?: string | null;
        "Filter.Address.HousingStockNumber"?: string | null;
        "Filter.Address.Corpus"?: string | null;
        "Filter.HousingStockId"?: number | null;
        Question?: string | null;
        "OrderBy.Destination"?: OrderByDestination;
        "OrderBy.Rule"?: CalculatorOrderBy;
        IsConnected?: boolean | null;
        CountTasks?: boolean | null;
        PageNumber?: number;
        PageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<CalculatorListResponsePagedListSuccessApiResponse, ErrorApiResponse>({
        path: `/api/Calculators`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Calculators
     * @name CalculatorsCreate
     * @request POST:/api/Calculators
     * @secure
     */
    calculatorsCreate: (data: CreateCalculatorRequest, params: RequestParams = {}) =>
      this.request<MeteringDeviceResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/Calculators`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Calculators
     * @name CalculatorsDetail
     * @request GET:/api/Calculators/{deviceId}
     * @secure
     */
    calculatorsDetail: (deviceId: number, params: RequestParams = {}) =>
      this.request<CalculatorResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/Calculators/${deviceId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Calculators
     * @name CalculatorsUpdate
     * @request PUT:/api/Calculators/{deviceId}
     * @secure
     */
    calculatorsUpdate: (deviceId: number, data: UpdateCalculatorRequest, params: RequestParams = {}) =>
      this.request<MeteringDeviceResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/Calculators/${deviceId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Calculators
     * @name CalculatorsSwitchCreate
     * @request POST:/api/Calculators/switch
     * @secure
     */
    calculatorsSwitchCreate: (data: SwitchCalculatorRequest, params: RequestParams = {}) =>
      this.request<MeteringDeviceResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/Calculators/switch`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Contractors
     * @name ContractorsList
     * @request GET:/api/Contractors
     * @secure
     */
    contractorsList: (params: RequestParams = {}) =>
      this.request<PagedContractorResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/Contractors`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Contractors
     * @name ContractorsCreate
     * @request POST:/api/Contractors
     * @secure
     */
    contractorsCreate: (data: ContractorCreateRequest, params: RequestParams = {}) =>
      this.request<ContractorResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/Contractors`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Contractors
     * @name ContractorsDetail
     * @request GET:/api/Contractors/{contractorId}
     * @secure
     */
    contractorsDetail: (contractorId: number, params: RequestParams = {}) =>
      this.request<ContractorResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/Contractors/${contractorId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Contractors
     * @name ContractorsUpdate
     * @request PUT:/api/Contractors/{contractorId}
     * @secure
     */
    contractorsUpdate: (contractorId: number, data: ContractorUpdateRequest, params: RequestParams = {}) =>
      this.request<ContractorResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/Contractors/${contractorId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags DataMigrations
     * @name DataMigrationsMigrateList
     * @request GET:/api/DataMigrations/Migrate
     * @secure
     */
    dataMigrationsMigrateList: (
      query?: { method?: DataMigrationMethod; args?: string | null; saveChanges?: boolean },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/DataMigrations/Migrate`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags DataMigrations
     * @name DataMigrationsCreateAdminCreate
     * @request POST:/api/DataMigrations/CreateAdmin
     * @secure
     */
    dataMigrationsCreateAdminCreate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/DataMigrations/CreateAdmin`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Documents
     * @name DocumentsUploadCreate
     * @request POST:/api/Documents/upload
     * @secure
     */
    documentsUploadCreate: (params: RequestParams = {}) =>
      this.request<DocumentResponseIEnumerableSuccessApiResponse, ErrorApiResponse>({
        path: `/api/Documents/upload`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Documents
     * @name DocumentsDelete
     * @request DELETE:/api/Documents/{documentId}
     * @secure
     */
    documentsDelete: (documentId: number, params: RequestParams = {}) =>
      this.request<any, ErrorApiResponse>({
        path: `/api/Documents/${documentId}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Homeowners
     * @name HomeownersList
     * @request GET:/api/Homeowners
     * @secure
     */
    homeownersList: (query?: { PageNumber?: number; PageSize?: number }, params: RequestParams = {}) =>
      this.request<HomeownersListResponsePagedListSuccessApiResponse, ErrorApiResponse>({
        path: `/api/Homeowners`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Homeowners
     * @name HomeownersCreate
     * @request POST:/api/Homeowners
     * @secure
     */
    homeownersCreate: (data: HomeownersCreateRequest, params: RequestParams = {}) =>
      this.request<HomeownersResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/Homeowners`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Homeowners
     * @name HomeownersDetail
     * @request GET:/api/Homeowners/{homeownerId}
     * @secure
     */
    homeownersDetail: (homeownerId: number, params: RequestParams = {}) =>
      this.request<HomeownersResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/Homeowners/${homeownerId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Homeowners
     * @name HomeownersUpdate
     * @request PUT:/api/Homeowners/{homeownerId}
     * @secure
     */
    homeownersUpdate: (homeownerId: number, data: HomeownersUpdateRequest, params: RequestParams = {}) =>
      this.request<HomeownersResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/Homeowners/${homeownerId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HousingMeteringDevices
     * @name HousingMeteringDevicesUpdate
     * @request PUT:/api/HousingMeteringDevices/{deviceId}
     * @secure
     */
    housingMeteringDevicesUpdate: (
      deviceId: number,
      data: UpdateHousingMeteringDeviceRequest,
      params: RequestParams = {},
    ) =>
      this.request<MeteringDeviceResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/HousingMeteringDevices/${deviceId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HousingMeteringDevices
     * @name HousingMeteringDevicesDetail
     * @request GET:/api/HousingMeteringDevices/{deviceId}
     * @secure
     */
    housingMeteringDevicesDetail: (deviceId: number, params: RequestParams = {}) =>
      this.request<HousingMeteringDeviceResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/HousingMeteringDevices/${deviceId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HousingMeteringDevices
     * @name HousingMeteringDevicesCreate
     * @request POST:/api/HousingMeteringDevices
     * @secure
     */
    housingMeteringDevicesCreate: (data: CreateHousingMeteringDeviceRequest, params: RequestParams = {}) =>
      this.request<MeteringDeviceResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/HousingMeteringDevices`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HousingMeteringDevices
     * @name HousingMeteringDevicesSwitchCreate
     * @request POST:/api/HousingMeteringDevices/switch
     * @secure
     */
    housingMeteringDevicesSwitchCreate: (data: SwitchHousingMeteringDeviceRequest, params: RequestParams = {}) =>
      this.request<MeteringDeviceResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/HousingMeteringDevices/switch`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HousingStocks
     * @name HousingStocksCreate
     * @request POST:/api/HousingStocks
     * @secure
     */
    housingStocksCreate: (data: HousingStockCreateRequest, params: RequestParams = {}) =>
      this.request<HousingStockResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/HousingStocks`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HousingStocks
     * @name HousingStocksList
     * @request GET:/api/HousingStocks
     * @secure
     */
    housingStocksList: (
      query?: {
        City?: string | null;
        Street?: string | null;
        HousingStockNumber?: string | null;
        Corpus?: string | null;
        PageNumber?: number;
        PageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<HousingStockListResponsePagedListSuccessApiResponse, ErrorApiResponse>({
        path: `/api/HousingStocks`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HousingStocks
     * @name HousingStocksUpdate
     * @request PUT:/api/HousingStocks/{housingStockId}
     * @secure
     */
    housingStocksUpdate: (housingStockId: number, data: HousingStockUpdateRequest, params: RequestParams = {}) =>
      this.request<HousingStockResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/HousingStocks/${housingStockId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HousingStocks
     * @name HousingStocksDetail
     * @request GET:/api/HousingStocks/{housingStockId}
     * @secure
     */
    housingStocksDetail: (housingStockId: number, params: RequestParams = {}) =>
      this.request<HousingStockResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/HousingStocks/${housingStockId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HousingStocks
     * @name HousingStocksDevicesDetail
     * @request GET:/api/HousingStocks/{housingStockId}/Devices
     * @secure
     */
    housingStocksDevicesDetail: (housingStockId: number, params: RequestParams = {}) =>
      this.request<HousingStockDeviceListResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/HousingStocks/${housingStockId}/Devices`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HousingStocks
     * @name HousingStocksDevicesDetail2
     * @request GET:/api/HousingStocks/{housingStockId}/Devices/{deviceId}
     * @originalName housingStocksDevicesDetail
     * @duplicate
     * @secure
     */
    housingStocksDevicesDetail2: (housingStockId: number, deviceId: number, params: RequestParams = {}) =>
      this.request<HousingStockDeviceResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/HousingStocks/${housingStockId}/Devices/${deviceId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HousingStocks
     * @name HousingStocksDevicesRelatedDetail
     * @request GET:/api/HousingStocks/{housingStockId}/Devices/{deviceId}/Related
     * @secure
     */
    housingStocksDevicesRelatedDetail: (housingStockId: number, deviceId: number, params: RequestParams = {}) =>
      this.request<HousingStockDeviceListResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/HousingStocks/${housingStockId}/Devices/${deviceId}/Related`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HousingStocks
     * @name HousingStocksDevicesCommunicationPipesDetail
     * @request GET:/api/HousingStocks/{housingStockId}/Devices/{deviceId}/CommunicationPipes
     * @secure
     */
    housingStocksDevicesCommunicationPipesDetail: (
      housingStockId: number,
      deviceId: number,
      params: RequestParams = {},
    ) =>
      this.request<PipesListResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/HousingStocks/${housingStockId}/Devices/${deviceId}/CommunicationPipes`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags IndividualDeviceMountPlaces
     * @name IndividualDeviceMountPlacesList
     * @request GET:/api/IndividualDeviceMountPlaces
     * @secure
     */
    individualDeviceMountPlacesList: (params: RequestParams = {}) =>
      this.request<IndividualDeviceMountPlaceListWrappedResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/IndividualDeviceMountPlaces`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags IndividualDeviceReadings
     * @name IndividualDeviceReadingsCreateCreate
     * @request POST:/api/IndividualDeviceReadings/create
     * @secure
     */
    individualDeviceReadingsCreateCreate: (data: IndividualDeviceReadingsCreateRequest, params: RequestParams = {}) =>
      this.request<IndividualDeviceReadingsCreateListResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/IndividualDeviceReadings/create`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags IndividualDeviceReadings
     * @name IndividualDeviceReadingsGetFlagsList
     * @request GET:/api/IndividualDeviceReadings/getFlags
     * @secure
     */
    individualDeviceReadingsGetFlagsList: (
      query: { Date: string; ManagementFirmId?: number | null; PageNumber?: number; PageSize?: number },
      params: RequestParams = {},
    ) =>
      this.request<IndividualDeviceReadingsExistingFlagModelPagedListSuccessApiResponse, ErrorApiResponse>({
        path: `/api/IndividualDeviceReadings/getFlags`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags IndividualDeviceReadings
     * @name IndividualDeviceReadingsSetEmptyCreate
     * @request POST:/api/IndividualDeviceReadings/setEmpty
     * @secure
     */
    individualDeviceReadingsSetEmptyCreate: (
      data: IndividualDeviceReadingsSetEmptyRequest,
      params: RequestParams = {},
    ) =>
      this.request<any, ErrorApiResponse>({
        path: `/api/IndividualDeviceReadings/setEmpty`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags IndividualDevices
     * @name IndividualDevicesDetail
     * @request GET:/api/IndividualDevices/{deviceId}
     * @secure
     */
    individualDevicesDetail: (deviceId: number, params: RequestParams = {}) =>
      this.request<IndividualDeviceResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/IndividualDevices/${deviceId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags IndividualDevices
     * @name IndividualDevicesUpdate
     * @request PUT:/api/IndividualDevices/{deviceId}
     * @secure
     */
    individualDevicesUpdate: (deviceId: number, data: UpdateIndividualDeviceRequest, params: RequestParams = {}) =>
      this.request<MeteringDeviceResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/IndividualDevices/${deviceId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags IndividualDevices
     * @name IndividualDevicesList
     * @request GET:/api/IndividualDevices
     * @secure
     */
    individualDevicesList: (
      query?: {
        ApartmentId?: number | null;
        HousingStockId?: number | null;
        Resource?: string | null;
        LastReadingsMonth?: string | null;
        TakeReadings?: number | null;
        PageNumber?: number;
        PageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<IndividualDeviceListItemResponsePagedListSuccessApiResponse, ErrorApiResponse>({
        path: `/api/IndividualDevices`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags IndividualDevices
     * @name IndividualDevicesCreate
     * @request POST:/api/IndividualDevices
     * @secure
     */
    individualDevicesCreate: (data: CreateIndividualDeviceRequest, params: RequestParams = {}) =>
      this.request<MeteringDeviceResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/IndividualDevices`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags IndividualDevices
     * @name IndividualDevicesCloseCreate
     * @request POST:/api/IndividualDevices/close
     * @secure
     */
    individualDevicesCloseCreate: (data: CloseDeviceRequest, params: RequestParams = {}) =>
      this.request<any, ErrorApiResponse>({
        path: `/api/IndividualDevices/close`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags IndividualDevices
     * @name IndividualDevicesSwitchMagneticSealCreate
     * @request POST:/api/IndividualDevices/{deviceId}/SwitchMagneticSeal
     * @secure
     */
    individualDevicesSwitchMagneticSealCreate: (
      deviceId: number,
      query?: { magneticSealInstallationDate?: string | null },
      params: RequestParams = {},
    ) =>
      this.request<any, ErrorApiResponse>({
        path: `/api/IndividualDevices/${deviceId}/SwitchMagneticSeal`,
        method: "POST",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags ManagingFirms
     * @name ManagingFirmsList
     * @request GET:/api/ManagingFirms
     * @secure
     */
    managingFirmsList: (query?: { PageNumber?: number; PageSize?: number }, params: RequestParams = {}) =>
      this.request<ManagementFirmResponsePagedListSuccessApiResponse, ErrorApiResponse>({
        path: `/api/ManagingFirms`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags ManagingFirms
     * @name ManagingFirmsCurrentList
     * @request GET:/api/ManagingFirms/current
     * @secure
     */
    managingFirmsCurrentList: (params: RequestParams = {}) =>
      this.request<ManagementFirmResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/ManagingFirms/current`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags ManagingFirms
     * @name ManagingFirmsUpdate
     * @request PUT:/api/ManagingFirms/{managingFirmId}
     * @secure
     */
    managingFirmsUpdate: (managingFirmId: number, data: ManagementFirmUpdateRequest, params: RequestParams = {}) =>
      this.request<ManagementFirmResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/ManagingFirms/${managingFirmId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags ManagingFirmUsers
     * @name ManagingFirmUsersList
     * @request GET:/api/ManagingFirmUsers
     * @secure
     */
    managingFirmUsersList: (query?: { RoleNames?: string[] | null }, params: RequestParams = {}) =>
      this.request<PagedManagingFirmUserResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/ManagingFirmUsers`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags ManagingFirmUsers
     * @name ManagingFirmUsersCreate
     * @request POST:/api/ManagingFirmUsers
     * @secure
     */
    managingFirmUsersCreate: (data: ManagingFirmUserCreateRequest, params: RequestParams = {}) =>
      this.request<ManagingFirmUserResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/ManagingFirmUsers`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags ManagingFirmUsers
     * @name ManagingFirmUsersDetail
     * @request GET:/api/ManagingFirmUsers/{userId}
     * @secure
     */
    managingFirmUsersDetail: (userId: number, params: RequestParams = {}) =>
      this.request<ManagingFirmUserResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/ManagingFirmUsers/${userId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags ManagingFirmUsers
     * @name ManagingFirmUsersUpdate
     * @request PUT:/api/ManagingFirmUsers/{userId}
     * @secure
     */
    managingFirmUsersUpdate: (userId: number, data: ManagingFirmUserUpdateRequest, params: RequestParams = {}) =>
      this.request<ManagingFirmUserResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/ManagingFirmUsers/${userId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags ManagingFirmUsers
     * @name ManagingFirmUsersCurrentList
     * @request GET:/api/ManagingFirmUsers/current
     * @secure
     */
    managingFirmUsersCurrentList: (params: RequestParams = {}) =>
      this.request<ManagingFirmUserResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/ManagingFirmUsers/current`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags MeteringDevices
     * @name MeteringDevicesList
     * @request GET:/api/MeteringDevices
     * @secure
     */
    meteringDevicesList: (
      query?: {
        OperationStatus?: string | null;
        PersonalAccountNumber?: string | null;
        SerialNumber?: string | null;
        DeviceTypes?: string[] | null;
        ApartmentId?: number | null;
        HousingStockId?: number | null;
        PageNumber?: number;
        PageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<MeteringDeviceListResponsePagedListSuccessApiResponse, ErrorApiResponse>({
        path: `/api/MeteringDevices`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags MeteringDevices
     * @name MeteringDevicesSearchList
     * @request GET:/api/MeteringDevices/search
     * @secure
     */
    meteringDevicesSearchList: (
      query?: { DeviceType?: string | null; Status?: string | null; Question?: string | null; Take?: number },
      params: RequestParams = {},
    ) =>
      this.request<MeteringDeviceSearchListResponseIEnumerableSuccessApiResponse, ErrorApiResponse>({
        path: `/api/MeteringDevices/search`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags MeteringDevices
     * @name MeteringDevicesDetail
     * @request GET:/api/MeteringDevices/{meteringDeviceId}
     * @secure
     */
    meteringDevicesDetail: (meteringDeviceId: number, params: RequestParams = {}) =>
      this.request<MeteringDeviceResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/MeteringDevices/${meteringDeviceId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags MeteringDevices
     * @name MeteringDevicesRelatedList
     * @request GET:/api/MeteringDevices/related
     * @secure
     */
    meteringDevicesRelatedList: (query: { DeviceId: number; PipeNumber?: number | null }, params: RequestParams = {}) =>
      this.request<MeteringDeviceListResponseIEnumerableSuccessApiResponse, ErrorApiResponse>({
        path: `/api/MeteringDevices/related`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags MeteringDevices
     * @name MeteringDevicesCloseCreate
     * @request POST:/api/MeteringDevices/close
     * @secure
     */
    meteringDevicesCloseCreate: (data: CloseDeviceRequest, params: RequestParams = {}) =>
      this.request<any, ErrorApiResponse>({
        path: `/api/MeteringDevices/close`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags MeteringDevices
     * @name MeteringDevicesCheckCreate
     * @request POST:/api/MeteringDevices/check
     * @secure
     */
    meteringDevicesCheckCreate: (data: CheckDeviceRequest, params: RequestParams = {}) =>
      this.request<any, ErrorApiResponse>({
        path: `/api/MeteringDevices/check`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Nodes
     * @name NodesDetail
     * @request GET:/api/Nodes/{nodeId}
     * @secure
     */
    nodesDetail: (nodeId: number, params: RequestParams = {}) =>
      this.request<NodeResponseListSuccessApiResponse, ErrorApiResponse>({
        path: `/api/Nodes/${nodeId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Nodes
     * @name NodesUpdate
     * @request PUT:/api/Nodes/{nodeId}
     * @secure
     */
    nodesUpdate: (nodeId: number, data: UpdateNodeRequest, params: RequestParams = {}) =>
      this.request<NodeResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/Nodes/${nodeId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Nodes
     * @name NodesList
     * @request GET:/api/Nodes
     * @secure
     */
    nodesList: (query?: { calculatorId?: number }, params: RequestParams = {}) =>
      this.request<NodeResponseListSuccessApiResponse, ErrorApiResponse>({
        path: `/api/Nodes`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Nodes
     * @name NodesCreate
     * @request POST:/api/Nodes
     * @secure
     */
    nodesCreate: (data: CreateNodeRequest, params: RequestParams = {}) =>
      this.request<NodeResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/Nodes`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Nodes
     * @name NodesGetServiceZonesList
     * @request GET:/api/Nodes/GetServiceZones
     * @secure
     */
    nodesGetServiceZonesList: (params: RequestParams = {}) =>
      this.request<NodeServiceZonesResponseListSuccessApiResponse, ErrorApiResponse>({
        path: `/api/Nodes/GetServiceZones`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Reports
     * @name ReportsList
     * @request GET:/api/Reports
     * @secure
     */
    reportsList: (params: RequestParams = {}) =>
      this.request<GroupReportFormResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/Reports`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Reports
     * @name ReportsCreate
     * @request POST:/api/Reports
     * @secure
     */
    reportsCreate: (data: CreateGroupReportRequest, params: RequestParams = {}) =>
      this.request<GroupReportResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/Reports`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Reports
     * @name ReportsGetArchivesList
     * @request GET:/api/Reports/GetArchives
     * @secure
     */
    reportsGetArchivesList: (
      query?: { NodeId?: number | null; ReportType?: string | null; From?: string | null; To?: string | null },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/Reports/GetArchives`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Reports
     * @name ReportsGetReportList
     * @request GET:/api/Reports/GetReport
     * @secure
     */
    reportsGetReportList: (
      query?: { NodeId?: number | null; ReportType?: string | null; From?: string | null; To?: string | null },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/Reports/GetReport`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Reports
     * @name ReportsGetConsolidatedReportList
     * @request GET:/api/Reports/GetConsolidatedReport
     * @secure
     */
    reportsGetConsolidatedReportList: (
      query?: { CalculatorsId?: number[] | null; ReportType?: string | null; From?: string | null; To?: string | null },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/Reports/GetConsolidatedReport`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Reports
     * @name ReportsGetGroupReportList
     * @request GET:/api/Reports/GetGroupReport
     * @secure
     */
    reportsGetGroupReportList: (
      query?: {
        GroupReportId?: string | null;
        HouseManagementId?: string | null;
        NodeResourceTypes?: ResourceType[] | null;
        NodeStatus?: NodeCommercialAccountStatus;
        "Subscription.Email"?: string | null;
        "Subscription.ContractorIds"?: number[] | null;
        "Subscription.TriggerAt"?: string;
        "Subscription.Type"?: EmailSubscriptionType;
        ReportType?: string | null;
        From?: string | null;
        To?: string | null;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/Reports/GetGroupReport`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tasks
     * @name TasksList
     * @request GET:/api/Tasks
     * @secure
     */
    tasksList: (
      query?: {
        TargetType?: string | null;
        TaskId?: number | null;
        TaskType?: string | null;
        GroupType?: TaskGroupingFilter;
        DeviceId?: number | null;
        HousingStockId?: number | null;
        ApartmentId?: number | null;
        HousingStockAddress?: string | null;
        HasChanged?: boolean | null;
        NodeId?: number | null;
        PageNumber?: number;
        PageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<TasksPagedListSuccessApiResponse, ErrorApiResponse>({
        path: `/api/Tasks`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tasks
     * @name TasksDetail
     * @request GET:/api/Tasks/{taskId}
     * @secure
     */
    tasksDetail: (taskId: number, params: RequestParams = {}) =>
      this.request<TaskResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/Tasks/${taskId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tasks
     * @name TasksDelete
     * @request DELETE:/api/Tasks/{taskId}
     * @secure
     */
    tasksDelete: (taskId: number, params: RequestParams = {}) =>
      this.request<any, ErrorApiResponse>({
        path: `/api/Tasks/${taskId}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tasks
     * @name TasksCreateCreate
     * @request POST:/api/Tasks/create
     * @secure
     */
    tasksCreateCreate: (data: TaskCreateRequest, params: RequestParams = {}) =>
      this.request<TaskCreateResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/Tasks/create`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tasks
     * @name TasksPushStageCreate
     * @request POST:/api/Tasks/{taskId}/PushStage
     * @secure
     */
    tasksPushStageCreate: (taskId: number, data: StagePushRequest, params: RequestParams = {}) =>
      this.request<TaskResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/Tasks/${taskId}/PushStage`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tasks
     * @name TasksRevertStageCreate
     * @request POST:/api/Tasks/{taskId}/RevertStage
     * @secure
     */
    tasksRevertStageCreate: (taskId: number, data: StageRevertRequest, params: RequestParams = {}) =>
      this.request<TaskResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/Tasks/${taskId}/RevertStage`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tasks
     * @name TasksNextStagesDetail
     * @request GET:/api/Tasks/{taskId}/NextStages
     * @secure
     */
    tasksNextStagesDetail: (taskId: number, params: RequestParams = {}) =>
      this.request<StageListResponseWrappedListResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/Tasks/${taskId}/NextStages`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tasks
     * @name TasksCommentsCreate
     * @request POST:/api/Tasks/{taskId}/Comments
     * @secure
     */
    tasksCommentsCreate: (taskId: number, data: string | null, params: RequestParams = {}) =>
      this.request<TaskCommentResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/Tasks/${taskId}/Comments`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tasks
     * @name TasksCommentsUpdate
     * @request PUT:/api/Tasks/{taskId}/Comments/{commentId}
     * @secure
     */
    tasksCommentsUpdate: (taskId: number, commentId: number, data: string | null, params: RequestParams = {}) =>
      this.request<TaskCommentResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/Tasks/${taskId}/Comments/${commentId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tasks
     * @name TasksCommentsDelete
     * @request DELETE:/api/Tasks/{taskId}/Comments/{commentId}
     * @secure
     */
    tasksCommentsDelete: (taskId: number, commentId: number, params: RequestParams = {}) =>
      this.request<any, ErrorApiResponse>({
        path: `/api/Tasks/${taskId}/Comments/${commentId}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tasks
     * @name TasksDocumentsDelete
     * @request DELETE:/api/Tasks/{taskId}/Documents/{documentId}
     * @secure
     */
    tasksDocumentsDelete: (taskId: number, documentId: number, params: RequestParams = {}) =>
      this.request<any, ErrorApiResponse>({
        path: `/api/Tasks/${taskId}/Documents/${documentId}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tasks
     * @name TasksAssignMultipleCreate
     * @request POST:/api/Tasks/assignMultiple
     * @secure
     */
    tasksAssignMultipleCreate: (data: TaskAssignToMultipleRequest, params: RequestParams = {}) =>
      this.request<any, ErrorApiResponse>({
        path: `/api/Tasks/assignMultiple`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags UserRoles
     * @name UserRolesList
     * @request GET:/api/UserRoles
     * @secure
     */
    userRolesList: (params: RequestParams = {}) =>
      this.request<UserRoleListWrappedResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/UserRoles`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
}
