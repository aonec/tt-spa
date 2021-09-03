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
  number: string;

  /** @format double */
  square?: number;

  /** @format int32 */
  numberOfLiving?: number;
  comment?: string | null;

  /** @format int32 */
  coldWaterRiserCount?: number | null;

  /** @format int32 */
  hotWaterRiserCount?: number | null;
}

export interface HousingStockShortResponse {
  /** @format int32 */
  id: number;
  city: string | null;
  street: string | null;
  number: string | null;
  corpus: string | null;
}

export enum EApartmentStatus {
  Ok = "Ok",
  Debtor = "Debtor",
  Pause = "Pause",
}

export enum EPersonType {
  Natural = "Natural",
  Juristic = "Juristic",
}

export interface HomeownerListResponse {
  /** @format int32 */
  id: number;
  firstName: string | null;
  lastName: string | null;
  middleName: string | null;
  fullName: string | null;
  personType: EPersonType;

  /** @format uuid */
  homeownerAccountId: string;
  isMainPersonalAccountNumber: boolean;
  phoneNumber: string | null;
  personalAccountNumber: string | null;
  paymentCode: string | null;
}

export interface ApartmentResponse {
  /** @format int32 */
  id: number;

  /** @format double */
  coefficient: number | null;
  housingStock: HousingStockShortResponse | null;
  comment: string | null;
  apartmentNumber: string | null;
  status: EApartmentStatus;
  square: string | null;

  /** @format uuid */
  mainHomeownerAccountId: string | null;
  homeowners: HomeownerListResponse[] | null;

  /** @format int32 */
  numberOfLiving: number | null;

  /** @format int32 */
  normativeNumberOfLiving: number | null;

  /** @format int32 */
  coldWaterRiserCount: number | null;

  /** @format int32 */
  hotWaterRiserCount: number | null;

  /** @format date-time */
  stoppedFrom: string | null;

  /** @format date-time */
  stoppedTo: string | null;
}

export interface ApartmentResponseSuccessApiResponse {
  successResponse: ApartmentResponse | null;
}

export interface ErrorResponse {
  code: string | null;
  message: string | null;
  data: Record<string, any>;
}

export interface ErrorApiResponse {
  errorResponse: ErrorResponse | null;
}

export enum EOrderByRule {
  Ascending = "Ascending",
  Descending = "Descending",
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
  comment: string | null;
  housingStock: HousingStockListResponse | null;
}

export interface ApartmentListResponsePagedList {
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
  items: ApartmentListResponse[] | null;
}

export interface ApartmentListResponsePagedListSuccessApiResponse {
  successResponse: ApartmentListResponsePagedList | null;
}

export interface ApartmentStatusResponse {
  name: string | null;
  description: string | null;
}

export interface ApartmentListStatusResponse {
  statuses: ApartmentStatusResponse[] | null;
}

export interface ApartmentListStatusResponseSuccessApiResponse {
  successResponse: ApartmentListStatusResponse | null;
}

export interface HomeownersShortResponse {
  /** @format int32 */
  id: number;
  firstName: string | null;
  lastName: string | null;
  middleName: string | null;
  fullName: string | null;
  personType: EPersonType;
  cellphone: string | null;
  email: string | null;
}

export interface FullAddressResponse {
  city: string | null;
  street: string | null;
  housingStockNumber: string | null;

  /** @format int32 */
  id: number;
  corpus: string | null;

  /** @format int32 */
  apartmentId: number | null;
  apartmentNumber: string | null;
}

export interface HomeownerAccountResponse {
  /** @format uuid */
  id: string;
  user: HomeownersShortResponse | null;
  apartment: FullAddressResponse | null;
  paymentCode: string | null;
  personalAccountNumber: string | null;

  /** @format date-time */
  openAt: string;

  /** @format date-time */
  closedAt: string | null;

  /** @format double */
  ownershipArea: number;
}

export interface HomeownerAccountResponseICollectionSuccessApiResponse {
  successResponse: HomeownerAccountResponse[] | null;
}

export enum OrderByRule {
  Ascending = "Ascending",
  Descending = "Descending",
}

export enum EDocumentType {
  Common = "Common",
  DeviceCommissionCheckAct = "DeviceCommissionCheckAct",
  DeviceCheckAct = "DeviceCheckAct",
  DeviceCommercialAccountingAct = "DeviceCommercialAccountingAct",
  DeviceAcceptanceAct = "DeviceAcceptanceAct",
  DeviceDeploymentAct = "DeviceDeploymentAct",
  DeviceClosingAct = "DeviceClosingAct",
  DevicePassport = "DevicePassport",
  DeviceTestCertificates = "DeviceTestCertificates",
  ApartmentCheckingAct = "ApartmentCheckingAct",
  ApartmentAccessDeniedAct = "ApartmentAccessDeniedAct",
  ApartmentUnauthorizedInterferenceAct = "ApartmentUnauthorizedInterferenceAct",
  AdditionalMaterials = "AdditionalMaterials",
  HeatingSeasonStartingOrder = "HeatingSeasonStartingOrder",
  HeatingSeasonEndingOrder = "HeatingSeasonEndingOrder",
  HeatingSeasonChangingStatement = "HeatingSeasonChangingStatement",
  Photo = "Photo",
  NodeAdmissionAct = "NodeAdmissionAct",
  ImportedFile = "ImportedFile",
  ProfilePhoto = "ProfilePhoto",
  ApartmentStoppingStatement = "ApartmentStoppingStatement",
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
  type: EDocumentType;
}

export interface DocumentResponsePagedList {
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
  items: DocumentResponse[] | null;
}

export interface DocumentResponsePagedListSuccessApiResponse {
  successResponse: DocumentResponsePagedList | null;
}

export enum EClosingReason {
  None = "None",
  Manually = "Manually",
  NoReadings = "NoReadings",
}

export enum EResourceType {
  Heat = "Heat",
  HotWaterSupply = "HotWaterSupply",
  ColdWaterSupply = "ColdWaterSupply",
  Electricity = "Electricity",
}

export enum EIndividualDeviceRateType {
  None = "None",
  OneZone = "OneZone",
  TwoZone = "TwoZone",
  ThreeZone = "ThreeZone",
}

export interface IndividualDeviceWithExpiredCheckingDateResponse {
  /** @format int32 */
  id: number;
  transactionType: string | null;
  model: string | null;
  serialNumber: string | null;
  sealNumber: string | null;

  /** @format date-time */
  sealInstallationDate: string | null;

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
  closingReason: EClosingReason;
  isActive: boolean | null;

  /** @format int32 */
  bitDepth: number | null;

  /** @format double */
  scaleFactor: number | null;

  /** @format int32 */
  checkingNumber: number;
  resource: EResourceType;
  rateType: EIndividualDeviceRateType;
}

export interface IndividualDeviceWithExpiredCheckingDateListResponse {
  devices: IndividualDeviceWithExpiredCheckingDateResponse[] | null;
}

export interface IndividualDeviceWithExpiredCheckingDateListResponseSuccessApiResponse {
  successResponse: IndividualDeviceWithExpiredCheckingDateListResponse | null;
}

export interface ApartmentStatusSetRequest {
  status: EApartmentStatus;

  /** @format date-time */
  fromDate?: string | null;

  /** @format date-time */
  toDate?: string | null;
  documentIds?: number[] | null;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export enum EUserPermission {
  Default = "Default",
  ApartmentsRead = "ApartmentsRead",
  ApartmentsStatusPatch = "ApartmentsStatusPatch",
  ContractorsRead = "ContractorsRead",
  ContractorsCreate = "ContractorsCreate",
  ContractorsUpdate = "ContractorsUpdate",
  ContractorsDelete = "ContractorsDelete",
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
  NodeWorkingRangeAddOrUpdate = "NodeWorkingRangeAddOrUpdate",
  NodeWorkingRangeRead = "NodeWorkingRangeRead",
  HeatingSeasonsRead = "HeatingSeasonsRead",
  HeatingSeasonsCreate = "HeatingSeasonsCreate",
  HeatingSeasonsUpdate = "HeatingSeasonsUpdate",
  ManagementFirmCompetenceRead = "ManagementFirmCompetenceRead",
  ManagementFirmCompetenceCreate = "ManagementFirmCompetenceCreate",
  ManagementFirmCompetenceUpdate = "ManagementFirmCompetenceUpdate",
  ManagementFirmUserWorkingStatusRead = "ManagementFirmUserWorkingStatusRead",
  ManagementFirmUserWorkingStatusCreate = "ManagementFirmUserWorkingStatusCreate",
  ManagementFirmUserWorkingStatusUpdate = "ManagementFirmUserWorkingStatusUpdate",
  ManagingFirmUserCompetenceRead = "ManagingFirmUserCompetenceRead",
  ManagingFirmUserCompetenceCreate = "ManagingFirmUserCompetenceCreate",
  ManagingFirmUserCompetenceUpdate = "ManagingFirmUserCompetenceUpdate",
  HeatingStationRead = "HeatingStationRead",
  HeatingStationCreate = "HeatingStationCreate",
  HeatingStationUpdate = "HeatingStationUpdate",
  HeatingStationDelete = "HeatingStationDelete",
  NodeRead = "NodeRead",
  NodeCreate = "NodeCreate",
  NodeUpdate = "NodeUpdate",
  NodeDelete = "NodeDelete",
  ResourceDisconnectingRead = "ResourceDisconnectingRead",
  ResourceDisconnectingCreate = "ResourceDisconnectingCreate",
  ResourceDisconnectingUpdate = "ResourceDisconnectingUpdate",
  TaskApplicationCreate = "TaskApplicationCreate",
  TaskApplicationRead = "TaskApplicationRead",
  TaskApplicationUpdate = "TaskApplicationUpdate",
  TaskApplicationDelete = "TaskApplicationDelete",
  DocumentsRead = "DocumentsRead",
  HouseManagementUpdate = "HouseManagementUpdate",
  CurrentTransformerCreate = "CurrentTransformerCreate",
  CurrentTransformerRead = "CurrentTransformerRead",
  CurrentTransformerUpdate = "CurrentTransformerUpdate",
  IndividualDeviceReopen = "IndividualDeviceReopen",
  HousingMeteringDeviceReadingsRead = "HousingMeteringDeviceReadingsRead",
  HousingMeteringDeviceReadingsCreate = "HousingMeteringDeviceReadingsCreate",
  HousingMeteringDeviceReadingsUpdate = "HousingMeteringDeviceReadingsUpdate",
}

export interface TokenResponse {
  token: string | null;
  refreshToken: string | null;
  roles: string[] | null;
  permissions: EUserPermission[] | null;
  maintenanceMessage: string | null;
}

export interface TokenResponseSuccessApiResponse {
  successResponse: TokenResponse | null;
}

export interface RefreshTokenRequest {
  token: string;
  refreshToken: string;
}

export interface RefreshResponse {
  token: string | null;
  refreshToken: string | null;
  permissions: EUserPermission[] | null;
  maintenanceMessage: string | null;
}

export interface RefreshResponseSuccessApiResponse {
  successResponse: RefreshResponse | null;
}

export interface LogoutRequest {
  token: string;
  refreshToken: string;
}

export interface ConfirmRequest {
  token: string;
  password: string;
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
  successResponse: CalculatorInfoListWrappedResponse | null;
}

export enum EExpiresCheckingDateAt {
  NextMonth = "NextMonth",
  NextTwoMonth = "NextTwoMonth",
  Past = "Past",
}

export enum EHouseCategory {
  Living = "Living",
  NonResidential = "NonResidential",
}

export enum ENodeCommercialAccountStatus {
  NotRegistered = "NotRegistered",
  Registered = "Registered",
  OnReview = "OnReview",
  Prepared = "Prepared",
}

export enum ECalculatorOrderRule {
  Street = "Street",
  FutureCheckingDate = "FutureCheckingDate",
}

export interface FileContentResultSuccessApiResponse {
  /** @format binary */
  successResponse: File | null;
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

export interface ManagementFirmAddressResponse {
  city: string | null;
  street: string | null;
  houseNumber: string | null;
  corpus: string | null;
}

export interface ManagementFirmResponse {
  /** @format int32 */
  id: number;
  name: string | null;
  phoneNumber: string | null;
  information: string | null;
  timeZoneOffset: TimeSpan;
  email: string | null;
  address: ManagementFirmAddressResponse | null;
}

export interface MeteringDeviceConnection {
  ipV4?: string | null;

  /** @format int32 */
  port?: number | null;

  /** @format int32 */
  deviceAddress?: number | null;
}

export interface HousingStockAddressResponse {
  city: string | null;
  street: string | null;
  housingStockNumber: string | null;

  /** @format int32 */
  id: number;
  corpus: string | null;
}

export interface NodeCommercialStatusResponse {
  value: ENodeCommercialAccountStatus;
  description: string | null;
}

export interface NodeServiceZoneResponse {
  /** @format int32 */
  id: number;
  name: string | null;
}

export interface PipeNodeHeatingSeasonListItemResponse {
  /** @format uuid */
  id: string;

  /** @format date-time */
  startDate: string;

  /** @format date-time */
  endDate: string | null;
}

export interface PipeNodeHeatingSeasonListResponse {
  isCurrentlyEnabled: boolean;
  items: PipeNodeHeatingSeasonListItemResponse[] | null;
}

export enum EHousingMeteringDeviceType {
  FlowMeter = "FlowMeter",
  TemperatureSensor = "TemperatureSensor",
  WeatherController = "WeatherController",
  PressureMeter = "PressureMeter",
  Counter = "Counter",
}

export interface PipeHousingMeteringDeviceHubConnectionResponse {
  /** @format int32 */
  entryNumber: number | null;

  /** @format int32 */
  pipeNumber: number | null;
  magistral: string | null;
}

export interface PipeHousingMeteringDeviceListResponse {
  /** @format int32 */
  id: number;
  transactionType: string | null;
  model: string | null;
  serialNumber: string | null;
  sealNumber: string | null;

  /** @format date-time */
  sealInstallationDate: string | null;
  managementFirm: ManagementFirmResponse | null;

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
  closingReason: EClosingReason;
  isActive: boolean;

  /** @format int32 */
  bitDepth: number | null;

  /** @format double */
  scaleFactor: number | null;

  /** @format int32 */
  checkingNumber: number;
  resource: EResourceType;
  housingMeteringDeviceType: EHousingMeteringDeviceType;
  hub: PipeHousingMeteringDeviceHubConnectionResponse | null;
  diameter: string | null;
}

export interface CommunicationPipeResponse {
  /** @format int32 */
  id: number;

  /** @format int32 */
  number: number;

  /** @format int32 */
  entryNumber: number | null;
  magistral: string | null;
  devices: PipeHousingMeteringDeviceListResponse[] | null;
}

export interface PipeNodeIntoCalculatorResponse {
  /** @format int32 */
  id: number;

  /** @format int32 */
  number: number;
  nodeStatus: NodeCommercialStatusResponse | null;
  resource: EResourceType;
  nodeServiceZone: NodeServiceZoneResponse | null;
  heatingSeason: PipeNodeHeatingSeasonListResponse | null;

  /** @format date-time */
  lastCommercialAccountingDate: string | null;

  /** @format date-time */
  futureCommercialAccountingDate: string | null;
  communicationPipes: CommunicationPipeResponse[] | null;
}

export interface CalculatorListResponse {
  /** @format int32 */
  id: number;
  transactionType: string | null;
  model: string | null;
  serialNumber: string | null;
  sealNumber: string | null;

  /** @format date-time */
  sealInstallationDate: string | null;
  managementFirm: ManagementFirmResponse | null;

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
  closingReason: EClosingReason;
  isActive: boolean;

  /** @format int32 */
  bitDepth: number | null;

  /** @format double */
  scaleFactor: number | null;

  /** @format int32 */
  checkingNumber: number;
  connection: MeteringDeviceConnection | null;
  isConnected: boolean | null;
  hasTasks: boolean | null;
  address: HousingStockAddressResponse | null;
  nodes: PipeNodeIntoCalculatorResponse[] | null;
}

export interface CalculatorListResponsePagedList {
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
  items: CalculatorListResponse[] | null;
}

export interface CalculatorListResponsePagedListSuccessApiResponse {
  successResponse: CalculatorListResponsePagedList | null;
}

export interface CreateCalculatorRequest {
  serialNumber: string;
  sealNumber?: string | null;

  /** @format date-time */
  sealInstallationDate?: string | null;

  /** @format date-time */
  lastCheckingDate?: string | null;

  /** @format date-time */
  futureCheckingDate?: string | null;
  documentsIds?: number[] | null;

  /** @format int32 */
  bitDepth?: number | null;

  /** @format double */
  scaleFactor?: number | null;

  /** @format date-time */
  openingDate?: string | null;

  /** @format int32 */
  checkingNumber?: number | null;
  connection?: MeteringDeviceConnection | null;
  isConnected?: boolean;

  /** @format int32 */
  housingStockId: number;

  /** @format int32 */
  infoId: number;

  /** @format date-time */
  futureCommercialAccountingDate: string;

  /** @format date-time */
  lastCommercialAccountingDate?: string | null;
}

export interface MeteringDeviceResponse {
  /** @format int32 */
  id: number;
  transactionType: string | null;
  model: string | null;
  serialNumber: string | null;
  sealNumber: string | null;

  /** @format date-time */
  sealInstallationDate: string | null;

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
  closingReason: EClosingReason;
  isActive: boolean | null;

  /** @format int32 */
  bitDepth: number | null;

  /** @format double */
  scaleFactor: number | null;

  /** @format int32 */
  checkingNumber: number;

  /** @format int32 */
  housingStockId: number | null;
  diameter: string | null;
  connection: MeteringDeviceConnection | null;
  isConnected: boolean | null;
  type: string | null;
  resource: EResourceType;
}

export interface MeteringDeviceResponseSuccessApiResponse {
  successResponse: MeteringDeviceResponse | null;
}

export interface CalculatorResponse {
  /** @format int32 */
  id: number;
  transactionType: string | null;
  model: string | null;
  serialNumber: string | null;
  sealNumber: string | null;

  /** @format date-time */
  sealInstallationDate: string | null;

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
  closingReason: EClosingReason;
  isActive: boolean | null;

  /** @format int32 */
  bitDepth: number | null;

  /** @format double */
  scaleFactor: number | null;

  /** @format int32 */
  checkingNumber: number;
  connection: MeteringDeviceConnection | null;
  isConnected: boolean | null;
  address: HousingStockAddressResponse | null;

  /** @format int32 */
  infoId: number | null;
  nodes: PipeNodeIntoCalculatorResponse[] | null;
}

export interface CalculatorResponseSuccessApiResponse {
  successResponse: CalculatorResponse | null;
}

export interface UpdateCalculatorRequest {
  serialNumber?: string | null;
  sealNumber?: string | null;

  /** @format date-time */
  sealInstallationDate?: string | null;

  /** @format int32 */
  bitDepth?: number | null;

  /** @format double */
  scaleFactor?: number | null;

  /** @format int32 */
  checkingNumber?: number | null;

  /** @format date-time */
  lastCheckingDate?: string | null;

  /** @format date-time */
  futureCheckingDate?: string | null;
  isConnected?: boolean;

  /** @format int32 */
  infoId?: number | null;
  connection?: MeteringDeviceConnection | null;

  /** @format date-time */
  lastCommercialAccountingDate?: string | null;

  /** @format date-time */
  futureCommercialAccountingDate?: string | null;
}

export interface SwitchCalculatorRequest {
  /** @format int32 */
  deviceId: number;
  documentsIds?: number[] | null;

  /** @format int32 */
  newDeviceId?: number | null;
  serialNumber?: string | null;
  sealNumber?: string | null;

  /** @format date-time */
  sealInstallationDate?: string | null;

  /** @format date-time */
  lastCheckingDate?: string | null;

  /** @format date-time */
  futureCheckingDate?: string | null;

  /** @format date-time */
  futureCommercialAccountingDate?: string | null;

  /** @format date-time */
  lastCommercialAccountingDate?: string | null;

  /** @format date-time */
  openingDate?: string | null;

  /** @format int32 */
  contractorId?: number | null;

  /** @format int32 */
  checkingNumber?: number | null;

  /** @format int32 */
  calculatorInfoId?: number | null;
  connection?: MeteringDeviceConnection | null;
}

export interface ENodeCommercialAccountStatusNullableStringDictionaryItem {
  key?: ENodeCommercialAccountStatus | null;
  value?: string | null;
}

export interface EHouseCategoryStringDictionaryItem {
  key?: EHouseCategory;
  value?: string | null;
}

export interface EResourceTypeNullableStringDictionaryItem {
  key?: EResourceType | null;
  value?: string | null;
}

export interface CalculatorFilterResponse {
  nodeStatuses: ENodeCommercialAccountStatusNullableStringDictionaryItem[] | null;
  houseCategories: EHouseCategoryStringDictionaryItem[] | null;
  resourceTypes: EResourceTypeNullableStringDictionaryItem[] | null;
  cities: string[] | null;
  streets: string[] | null;
}

export interface CalculatorFilterResponseSuccessApiResponse {
  successResponse: CalculatorFilterResponse | null;
}

export interface ContractorListResponse {
  /** @format int32 */
  id: number;
  name: string | null;
  cellphone: string | null;
  email: string | null;
}

export interface ContractorListResponsePagedList {
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
  items: ContractorListResponse[] | null;
}

export interface ContractorListResponsePagedListSuccessApiResponse {
  successResponse: ContractorListResponsePagedList | null;
}

export interface ContractorCreateRequest {
  name?: string | null;
  cellphone?: string | null;

  /** @format email */
  email?: string | null;
}

export interface ContractorResponse {
  /** @format int32 */
  id: number;
  name: string | null;
  cellphone: string | null;
  email: string | null;
}

export interface ContractorResponseSuccessApiResponse {
  successResponse: ContractorResponse | null;
}

export interface ContractorUpdateRequest {
  name?: string | null;
  cellphone?: string | null;

  /** @format email */
  email?: string | null;
}

export enum EYearQuarter {
  First = "First",
  Second = "Second",
  Third = "Third",
  Forth = "Forth",
}

export enum EPhaseType {
  A = "A",
  B = "B",
  C = "C",
}

export interface CurrentTransformerResponse {
  /** @format uuid */
  id: string;

  /** @format date-time */
  installationDate: string | null;

  /** @format int32 */
  manufactureYear: number;

  /** @format date-time */
  lastCheckingDate: string | null;

  /** @format date-time */
  futureCheckingDate: string | null;

  /** @format int32 */
  stateVerificationYear: number;
  stateVerificationQuarter: EYearQuarter;

  /** @format int32 */
  nextStateVerificationYear: number;

  /** @format int32 */
  stateVerificationIntervalYears: number;
  typeName: string | null;
  phase: EPhaseType;
  number: string | null;

  /** @format int32 */
  primaryCurrentRatingAmperes: number;

  /** @format int32 */
  secondaryCurrentRatingAmperes: number;

  /** @format int32 */
  coefficient: number;

  /** @format date-time */
  lastCommercialAccountingDate: string | null;

  /** @format date-time */
  futureCommercialAccountingDate: string | null;
  sealNumber: string | null;

  /** @format date-time */
  sealInstallationDate: string | null;

  /** @format date-time */
  closingDate: string | null;

  /** @format int32 */
  nodeId: number | null;
}

export interface CurrentTransformerResponseSuccessApiResponse {
  successResponse: CurrentTransformerResponse | null;
}

export interface CreateCurrentTransformerRequest {
  /** @format date-time */
  installationDate?: string | null;

  /** @format int32 */
  manufactureYear?: number;

  /** @format int32 */
  stateVerificationYear?: number;
  stateVerificationQuarter?: EYearQuarter;

  /** @format int32 */
  stateVerificationIntervalYears?: number;

  /** @format int32 */
  nextStateVerificationYear?: number;
  typeName?: string | null;
  phase?: EPhaseType;
  number?: string | null;

  /** @format int32 */
  primaryCurrentRatingAmperes?: number;

  /** @format int32 */
  secondaryCurrentRatingAmperes?: number;

  /** @format int32 */
  coefficient?: number;

  /** @format int32 */
  nodeId?: number | null;
  documentIds?: number[] | null;
  sealNumber?: string | null;

  /** @format date-time */
  sealInstallationDate?: string | null;
}

export interface CloseCurrentTransformerRequest {
  /** @format date-time */
  closingDate: string;
  documentIds?: number[] | null;
}

export interface CheckCurrentTransformerRequest {
  /** @format date-time */
  currentCheckingDate: string;

  /** @format date-time */
  futureCheckingDate: string;
}

export interface DocumentResponseIEnumerableSuccessApiResponse {
  successResponse: DocumentResponse[] | null;
}

export interface StringSuccessApiResponse {
  successResponse: string | null;
}

export enum EMeasuringUnit {
  CubicMeter = "CubicMeter",
  KiloWatt = "KiloWatt",
}

export interface LastModifiedUserResponse {
  /** @format int32 */
  id: number;
  firstName: string | null;
  lastName: string | null;
}

export interface HousingMeteringDeviceCommentResponse {
  /** @format int32 */
  id: number;
  text: string | null;

  /** @format date-time */
  lastModifiedDateTime: string;

  /** @format date-time */
  creationDateTime: string;
  lastModifiedUser: LastModifiedUserResponse | null;
}

export enum EPhaseNumberType {
  SinglePhase = "SinglePhase",
  ThreePhase = "ThreePhase",
}

export interface ElectricHousingMeteringDeviceResponse {
  /** @format int32 */
  id: number;
  transactionType: string | null;
  model: string | null;
  serialNumber: string | null;
  sealNumber: string | null;

  /** @format date-time */
  sealInstallationDate: string | null;

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
  closingReason: EClosingReason;
  isActive: boolean | null;

  /** @format int32 */
  bitDepth: number | null;

  /** @format double */
  scaleFactor: number | null;

  /** @format int32 */
  checkingNumber: number;
  resource: EResourceType;
  housingMeteringDeviceType: EHousingMeteringDeviceType;
  address: HousingStockAddressResponse | null;
  measuringUnit: EMeasuringUnit;

  /** @format double */
  minReadingsValue: number | null;

  /** @format double */
  maxReadingsValue: number | null;
  comment: HousingMeteringDeviceCommentResponse | null;

  /** @format date-time */
  installationDate: string | null;

  /** @format int32 */
  manufactureYear: number;

  /** @format int32 */
  stateVerificationYear: number;
  stateVerificationQuarter: EYearQuarter;

  /** @format int32 */
  stateVerificationIntervalYears: number;

  /** @format int32 */
  nextStateVerificationYear: number;
  phaseNumber: EPhaseNumberType;

  /** @format int32 */
  nodeId: number | null;
}

export interface ElectricHousingMeteringDeviceResponseSuccessApiResponse {
  successResponse: ElectricHousingMeteringDeviceResponse | null;
}

export interface CreateElectricHousingMeteringDeviceRequest {
  serialNumber: string;
  sealNumber?: string | null;

  /** @format date-time */
  sealInstallationDate?: string | null;

  /** @format date-time */
  lastCheckingDate?: string | null;

  /** @format date-time */
  futureCheckingDate?: string | null;
  documentsIds?: number[] | null;

  /** @format int32 */
  bitDepth?: number | null;

  /** @format double */
  scaleFactor?: number | null;

  /** @format date-time */
  openingDate?: string | null;

  /** @format int32 */
  checkingNumber?: number | null;
  housingMeteringDeviceType: EHousingMeteringDeviceType;
  resource: EResourceType;
  model: string;
  measuringUnit?: EMeasuringUnit;

  /** @format double */
  minReadingsValue?: number | null;

  /** @format double */
  maxReadingsValue?: number | null;

  /** @format date-time */
  futureCommercialAccountingDate: string;

  /** @format date-time */
  lastCommercialAccountingDate?: string | null;

  /** @format date-time */
  installationDate?: string | null;

  /** @format int32 */
  manufactureYear?: number;

  /** @format int32 */
  stateVerificationYear?: number;
  stateVerificationQuarter?: EYearQuarter;

  /** @format int32 */
  stateVerificationIntervalYears?: number;

  /** @format int32 */
  nextStateVerificationYear?: number;
  phaseNumber?: EPhaseNumberType;

  /** @format int32 */
  nodeId?: number | null;
}

export interface DocumentLiteResponse {
  /** @format int32 */
  id: number;
  name: string | null;

  /** @format date-time */
  uploadingTime: string;
  author: string | null;
}

export interface ElectricNodeResponse {
  /** @format int32 */
  id: number;

  /** @format int32 */
  number: number;
  nodeStatus: NodeCommercialStatusResponse | null;
  resource: EResourceType;
  nodeServiceZone: NodeServiceZoneResponse | null;

  /** @format date-time */
  lastCommercialAccountingDate: string | null;

  /** @format date-time */
  futureCommercialAccountingDate: string | null;

  /** @format int32 */
  housingStockId: number;
  address: HousingStockAddressResponse | null;
  documents: DocumentLiteResponse[] | null;
  locationName: string | null;
  counter: ElectricHousingMeteringDeviceResponse | null;
  currentTransformers: CurrentTransformerResponse[] | null;
}

export interface ElectricNodeResponseSuccessApiResponse {
  successResponse: ElectricNodeResponse | null;
}

export interface NodeAdmissionActRequest {
  /** @format int32 */
  documentId?: number;

  /** @format date-time */
  startCommercialAccountingDate?: string;

  /** @format date-time */
  endCommercialAccountingDate?: string;
}

export interface CreateElectricNodeRequest {
  /** @format int32 */
  number?: number;
  nodeStatus?: ENodeCommercialAccountStatus;
  resource?: EResourceType;

  /** @format int32 */
  nodeServiceZoneId?: number;

  /** @format int32 */
  housingStockId?: number;
  admissionAct?: NodeAdmissionActRequest | null;
  locationName?: string | null;
  counter?: CreateElectricHousingMeteringDeviceRequest | null;
  currentTransformers?: CreateCurrentTransformerRequest[] | null;
}

export interface UpdateElectricNodeRequest {
  /** @format int32 */
  number?: number;
  nodeStatus?: ENodeCommercialAccountStatus;
  resource?: EResourceType;

  /** @format int32 */
  nodeServiceZoneId?: number | null;

  /** @format date-time */
  startCommercialAccountingDate?: string | null;

  /** @format date-time */
  endCommercialAccountingDate?: string | null;
  locationName?: string | null;
}

export enum EImportedEntityType {
  IndividualDeviceReadings = "IndividualDeviceReadings",
  PersonalAccountNumber = "PersonalAccountNumber",
}

export interface InvalidRowResponse {
  /** @format int32 */
  index: number;
  errorMessage: string | null;
}

export interface ParseResultResponse {
  isValid: boolean;
  invalidRows: InvalidRowResponse[] | null;
}

export interface ImportResultResponse {
  isValid: boolean;
  importLogs: string[] | null;
  importErrors: string[] | null;
}

export interface ImportLogResponse {
  /** @format uuid */
  id: string;
  entityType: EImportedEntityType;
  document: DocumentResponse | null;
  parseResult: ParseResultResponse | null;
  importResult: ImportResultResponse | null;
}

export interface ImportLogResponseSuccessApiResponse {
  successResponse: ImportLogResponse | null;
}

export enum ELivingHouseType {
  ApartmentHouse = "ApartmentHouse",
  Townhouse = "Townhouse",
  Private = "Private",
}

export enum ENonResidentialHouseType {
  Social = "Social",
  Commercial = "Commercial",
}

export interface HeatingSeasonListItemResponse {
  isInherited: boolean;

  /** @format uuid */
  adjustmentId: string | null;
  title: string | null;

  /** @format int32 */
  housingStocksCount: number;
  isOpening: boolean;

  /** @format date-time */
  triggerDate: string | null;
  houseCategory: EHouseCategory | null;
  livingHouseType: ELivingHouseType | null;
  nonResidentialHouseType: ENonResidentialHouseType | null;
}

export interface HeatingSeasonHouseManagementListItemAdjustmentResponse {
  /** @format uuid */
  adjustmentId: string;
  titleParts: string[] | null;
  isOpening: boolean;

  /** @format date-time */
  triggerDate: string;
  houseCategory: EHouseCategory | null;
  livingHouseType: ELivingHouseType | null;
  nonResidentialHouseType: ENonResidentialHouseType | null;
  housingStocks: HousingStockAddressResponse[] | null;
}

export interface HeatingSeasonHouseManagementListItemResponse {
  /** @format uuid */
  houseManagementId: string;
  houseManagementName: string | null;
  adjustments: HeatingSeasonHouseManagementListItemAdjustmentResponse[] | null;
}

export interface HeatingSeasonPageResponse {
  /** @format uuid */
  heatingSeasonId: string | null;
  items: HeatingSeasonListItemResponse[] | null;
  houseManagementItems: HeatingSeasonHouseManagementListItemResponse[] | null;
}

export interface HeatingSeasonPageResponseSuccessApiResponse {
  successResponse: HeatingSeasonPageResponse | null;
}

export interface HeatingSeasonAdjustmentResponse {
  /** @format uuid */
  heatingSeasonId: string;

  /** @format uuid */
  adjustmentId: string;

  /** @format date-time */
  startsFrom: string;

  /** @format date-time */
  endsAt: string | null;
  houseCategory: EHouseCategory | null;
  livingHouseType: ELivingHouseType | null;
  nonResidentialHouseType: ENonResidentialHouseType | null;

  /** @format uuid */
  houseManagementId: string | null;
  housingStockIds: number[] | null;
}

export interface HeatingSeasonResponse {
  /** @format uuid */
  heatingSeasonId: string;

  /** @format int32 */
  managementFirmId: number;
  adjustments: HeatingSeasonAdjustmentResponse[] | null;
}

export interface HeatingSeasonResponseSuccessApiResponse {
  successResponse: HeatingSeasonResponse | null;
}

export interface SwitchHeatingSeasonRequest {
  /** @format int32 */
  documentId?: number;
  isOpening?: boolean;

  /** @format date-time */
  triggerDate?: string;
  houseCategory?: EHouseCategory | null;
  livingHouseType?: ELivingHouseType | null;
  nonResidentialHouseType?: ENonResidentialHouseType | null;
}

export interface AddOrUpdateHeatingSeasonForHouseManagementRequest {
  /** @format date-time */
  startDate?: string;

  /** @format date-time */
  endDate?: string | null;
  houseCategory?: EHouseCategory | null;
  livingHouseType?: ELivingHouseType | null;
  nonResidentialHouseType?: ENonResidentialHouseType | null;

  /** @format int32 */
  documentId?: number;

  /** @format uuid */
  houseManagementId?: string;
  housingStockIds?: number[] | null;
}

export interface AddressResponse {
  city: string | null;
  street: string | null;
  housingStockNumber: string | null;
}

export interface HeatingStationResponse {
  /** @format uuid */
  id: string;
  name: string | null;
  address: AddressResponse | null;
  housingStocks: HousingStockShortResponse[] | null;
}

export interface HeatingStationResponsePagedList {
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
  items: HeatingStationResponse[] | null;
}

export interface HeatingStationResponsePagedListSuccessApiResponse {
  successResponse: HeatingStationResponsePagedList | null;
}

export interface AddressRequest {
  city: string;
  street: string;
  number: string;
}

export interface AddHeatingStationRequest {
  name: string;
  isThermalChamber?: boolean;
  address?: AddressRequest | null;
}

export interface HeatingStationResponseSuccessApiResponse {
  successResponse: HeatingStationResponse | null;
}

export interface UpdateHeatingStationRequest {
  name?: string | null;
  isThermalChamber?: boolean;
  address?: AddressRequest | null;
}

export enum HomeownerAccountOrderRule {
  Street = "Street",
  HomeownerName = "HomeownerName",
  PaymentCode = "PaymentCode",
}

export enum StatusType {
  All = "All",
  Closed = "Closed",
  NotClosed = "NotClosed",
}

export interface HomeownerAccountResponsePagedList {
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
  items: HomeownerAccountResponse[] | null;
}

export interface HomeownerAccountResponsePagedListSuccessApiResponse {
  successResponse: HomeownerAccountResponsePagedList | null;
}

export interface HomeownerAccountCreateServiceModel {
  /** @format int32 */
  apartmentId?: number;
  paymentCode?: string | null;
  personalAccountNumber?: string | null;

  /** @format double */
  ownershipArea?: number;
}

export interface HomeownerAccountResponseSuccessApiResponse {
  successResponse: HomeownerAccountResponse | null;
}

export interface HomeownerCreateRequest {
  firstName: string;
  lastName: string;
  middleName: string;
  fullName?: string | null;
  email?: string | null;
  phone?: string | null;
  personType?: EPersonType;
}

export interface IndividualDeviceIntoHomeownerCertificateResponse {
  resourceDescription: string | null;
  mountPlaceDescription: string | null;
  model: string | null;
  serialNumber: string | null;
  lastReadings: string | null;
  lastReadingsDate: string | null;
}

export interface HomeownerCertificateResponse {
  fullName: string | null;
  address: FullAddressResponse | null;
  individualDevices: IndividualDeviceIntoHomeownerCertificateResponse[] | null;
}

export interface HomeownerCertificateResponseSuccessApiResponse {
  successResponse: HomeownerCertificateResponse | null;
}

export interface HomeownersListResponse {
  /** @format int32 */
  id: number;
  firstName: string | null;
  lastName: string | null;
  middleName: string | null;
  fullName: string | null;
  personType: EPersonType;
  address: FullAddressResponse | null;
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

  /** @format int32 */
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;

  /** @format int32 */
  nextPageNumber: number;

  /** @format int32 */
  previousPageNumber: number;
  items: HomeownersListResponse[] | null;
}

export interface HomeownersListResponsePagedListSuccessApiResponse {
  successResponse: HomeownersListResponsePagedList | null;
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
  fullName: string | null;
  personType: EPersonType;
  cellphone: string | null;
  email: string | null;
  payments: HomeownersApartmentResponse[] | null;
}

export interface HomeownersResponseSuccessApiResponse {
  successResponse: HomeownersResponse | null;
}

export interface HomeownerUpdateRequest {
  firstName?: string | null;
  lastName?: string | null;
  middleName?: string | null;
  fullName?: string | null;
  cellphone?: string | null;
  email?: string | null;
  personType?: EPersonType | null;
}

export interface UpdateHouseManagementRequest {
  phone?: string | null;
  comment?: string | null;
}

export interface HouseManagementResponse {
  /** @format uuid */
  id: string;
  name: string | null;
  phone: string | null;
  comment: string | null;
}

export interface HouseManagementResponseSuccessApiResponse {
  successResponse: HouseManagementResponse | null;
}

export interface ManagingFirmUserShortResponse {
  /** @format int32 */
  id: number;
  name: string | null;
  email: string | null;
}

export enum EMagistralType {
  None = "None",
  FeedFlow = "FeedFlow",
  FeedBackFlow = "FeedBackFlow",
}

export interface HousingMeteringDeviceReadingsIncludingPlacementResponse {
  /** @format uuid */
  id: string | null;

  /** @format double */
  value: number;

  /** @format uuid */
  previousReadingsId: string | null;

  /** @format date-time */
  readingDate: string;

  /** @format date-time */
  uploadDate: string;

  /** @format int32 */
  year: number;
  month: string | null;
  isCurrentMonth: boolean;

  /** @format double */
  nonResidentialRoomConsumption: number | null;
  user: ManagingFirmUserShortResponse | null;
  isArchived: boolean;

  /** @format int32 */
  nodeId: number;

  /** @format int32 */
  deviceId: number;
  deviceModel: string | null;
  deviceSerialNumber: string | null;
  magistralType: EMagistralType;
}

export interface GetHousingMeteringDeviceReadingsResponse {
  items: HousingMeteringDeviceReadingsIncludingPlacementResponse[] | null;
}

export interface GetHousingMeteringDeviceReadingsResponseSuccessApiResponse {
  successResponse: GetHousingMeteringDeviceReadingsResponse | null;
}

export interface CreateHousingMeteringDeviceReadingsRequest {
  /** @format double */
  value?: number;

  /** @format int32 */
  deviceId?: number;

  /** @format double */
  nonResidentialRoomConsumption?: number | null;
}

export interface HousingMeteringDeviceReadingsIncludingPlacementResponseSuccessApiResponse {
  successResponse: HousingMeteringDeviceReadingsIncludingPlacementResponse | null;
}

export interface UpdateHousingMeteringDeviceReadingsRequest {
  /** @format uuid */
  id?: string;

  /** @format double */
  value?: number;

  /** @format double */
  nonResidentialRoomConsumption?: number | null;
}

export interface HousingMeteringDeviceReadingsResponse {
  /** @format uuid */
  id: string | null;

  /** @format double */
  value: number;

  /** @format uuid */
  previousReadingsId: string | null;

  /** @format date-time */
  readingDate: string;

  /** @format date-time */
  uploadDate: string;

  /** @format int32 */
  year: number;
  month: string | null;
  isCurrentMonth: boolean;

  /** @format double */
  nonResidentialRoomConsumption: number | null;
  user: ManagingFirmUserShortResponse | null;
  isArchived: boolean;
}

export interface HousingMeteringDeviceIncludingReadingsResponse {
  /** @format int32 */
  id: number;
  transactionType: string | null;
  model: string | null;
  serialNumber: string | null;
  sealNumber: string | null;

  /** @format date-time */
  sealInstallationDate: string | null;

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
  closingReason: EClosingReason;
  isActive: boolean | null;

  /** @format int32 */
  bitDepth: number | null;

  /** @format double */
  scaleFactor: number | null;

  /** @format int32 */
  checkingNumber: number;
  resource: EResourceType;
  housingMeteringDeviceType: EHousingMeteringDeviceType;
  address: HousingStockAddressResponse | null;
  measuringUnit: EMeasuringUnit;

  /** @format double */
  minReadingsValue: number | null;

  /** @format double */
  maxReadingsValue: number | null;
  comment: HousingMeteringDeviceCommentResponse | null;
  readings: HousingMeteringDeviceReadingsResponse[] | null;
}

export interface HousingMeteringDeviceIncludingReadingsResponsePagedList {
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
  items: HousingMeteringDeviceIncludingReadingsResponse[] | null;
}

export interface HousingMeteringDeviceIncludingReadingsResponsePagedListSuccessApiResponse {
  successResponse: HousingMeteringDeviceIncludingReadingsResponsePagedList | null;
}

export interface SwitchHousingMeteringDeviceRequest {
  /** @format int32 */
  deviceId: number;
  documentsIds?: number[] | null;

  /** @format int32 */
  newDeviceId?: number | null;
  serialNumber?: string | null;
  sealNumber?: string | null;

  /** @format date-time */
  sealInstallationDate?: string | null;

  /** @format date-time */
  lastCheckingDate?: string | null;

  /** @format date-time */
  futureCheckingDate?: string | null;

  /** @format date-time */
  futureCommercialAccountingDate?: string | null;

  /** @format date-time */
  lastCommercialAccountingDate?: string | null;

  /** @format date-time */
  openingDate?: string | null;

  /** @format int32 */
  contractorId?: number | null;

  /** @format int32 */
  checkingNumber?: number | null;

  /** @format int32 */
  bitDepth?: number | null;

  /** @format double */
  scaleFactor?: number | null;
  model?: string | null;
}

export interface HousingMeteringDeviceCommentResponseSuccessApiResponse {
  successResponse: HousingMeteringDeviceCommentResponse | null;
}

export interface HousingMeteringDeviceAddCommentRequest {
  /** @format int32 */
  deviceId?: number;
  text?: string | null;
}

export interface HousingMeteringDeviceUpdateCommentRequest {
  /** @format int32 */
  deviceId?: number;
  text?: string | null;
}

export interface HousingMeteringDeviceReadingsHistoryItemResponse {
  /** @format uuid */
  id: string | null;

  /** @format double */
  value: number;

  /** @format uuid */
  previousReadingsId: string | null;

  /** @format date-time */
  readingDate: string;

  /** @format date-time */
  uploadDate: string;

  /** @format int32 */
  year: number;
  month: string | null;
  isCurrentMonth: boolean;

  /** @format double */
  nonResidentialRoomConsumption: number | null;
  user: ManagingFirmUserShortResponse | null;
  isArchived: boolean;

  /** @format double */
  consumption: number;
}

export interface HousingMeteringDeviceReadingsMonthHistoryResponse {
  /** @format int32 */
  month: number;
  readings: HousingMeteringDeviceReadingsHistoryItemResponse[] | null;
}

export interface HousingMeteringDeviceReadingsYearHistoryResponse {
  /** @format int32 */
  year: number;
  monthReadings: HousingMeteringDeviceReadingsMonthHistoryResponse[] | null;
}

export interface HousingMeteringDeviceReadingsHistoryResponse {
  yearReadings: HousingMeteringDeviceReadingsYearHistoryResponse[] | null;
}

export interface HousingMeteringDeviceReadingsHistoryResponseSuccessApiResponse {
  successResponse: HousingMeteringDeviceReadingsHistoryResponse | null;
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
  coordinates?: Point | null;
  index?: string | null;
  district?: string | null;
}

export interface HousingStockCreateRequest {
  address: HousingStockAddressRequest;

  /** @format uuid */
  heatingStationId: string;
  hasIndividualHeatingStation?: boolean;
}

export interface HeatingStationShortResponse {
  /** @format uuid */
  id: string;
  name: string | null;
  address: AddressResponse | null;
}

export interface HousingStockResponse {
  /** @format int32 */
  id: number;

  /** @format uuid */
  fiasId: string | null;
  index: string | null;
  region: string | null;
  city: string | null;
  district: string | null;
  street: string | null;
  number: string | null;
  corpus: string | null;
  coordinates: Point | null;
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
  hasIndividualHeatingStation: boolean;
  heatingStation: HeatingStationShortResponse | null;
  managementFirmName: string | null;
  managementFirmInfo: string | null;
  houseManagement: HouseManagementResponse | null;
}

export interface HousingStockResponseSuccessApiResponse {
  successResponse: HousingStockResponse | null;
}

export interface HousingStockListResponsePagedList {
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
  items: HousingStockListResponse[] | null;
}

export interface HousingStockListResponsePagedListSuccessApiResponse {
  successResponse: HousingStockListResponsePagedList | null;
}

export interface HousingStockUpdateRequest {
  address?: HousingStockAddressRequest | null;
  houseCategory?: EHouseCategory | null;

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
  hasIndividualHeatingStation?: boolean | null;

  /** @format uuid */
  heatingStationId?: string | null;

  /** @format uuid */
  houseManagementId?: string | null;
}

export interface ManagingFirmUserShortResponseSuccessApiResponse {
  successResponse: ManagingFirmUserShortResponse | null;
}

export interface MeteringDeviceListResponse {
  /** @format int32 */
  id: number;
  ipV4: string | null;

  /** @format int32 */
  port: number | null;

  /** @format int32 */
  deviceAddress: number | null;
  model: string | null;
  serialNumber: string | null;
  sealNumber: string | null;

  /** @format date-time */
  sealInstallationDate: string | null;
  type: string | null;
  resource: string | null;

  /** @format date-time */
  closingDate: string | null;

  /** @format date-time */
  futureCheckingDate: string | null;
  timeZoneOffset: TimeSpan;
}

export interface HousingStockDeviceListResponse {
  housingStock: HousingStockListResponse | null;
  meteringDevice: MeteringDeviceListResponse | null;
  devices: MeteringDeviceListResponse[] | null;
}

export interface HousingStockDeviceListResponseSuccessApiResponse {
  successResponse: HousingStockDeviceListResponse | null;
}

export interface HousingStockDeviceResponse {
  housingStock: HousingStockListResponse | null;
  device: MeteringDeviceResponse | null;
}

export interface HousingStockDeviceResponseSuccessApiResponse {
  successResponse: HousingStockDeviceResponse | null;
}

export interface PipesListResponse {
  street: string | null;
  number: string | null;
  city: string | null;
  meteringDevice: MeteringDeviceListResponse | null;
  pipes: CommunicationPipeResponse[] | null;
}

export interface PipesListResponseSuccessApiResponse {
  successResponse: PipesListResponse | null;
}

export interface GuidStringDictionaryItem {
  /** @format uuid */
  key?: string;
  value?: string | null;
}

export interface MeasurableIntervalResponse {
  /** @format double */
  maxValue: number | null;

  /** @format double */
  minValue: number | null;
  measurableUnit: string | null;
}

export interface ELivingHouseTypeStringDictionaryItem {
  key?: ELivingHouseType;
  value?: string | null;
}

export interface ENonResidentialHouseTypeStringDictionaryItem {
  key?: ENonResidentialHouseType;
  value?: string | null;
}

export interface HousingStockFilterResponse {
  houseManagements: GuidStringDictionaryItem[] | null;
  houseCategories: EHouseCategoryStringDictionaryItem[] | null;
  totalAreaIntervals: MeasurableIntervalResponse[] | null;
  livingHouseTypes: ELivingHouseTypeStringDictionaryItem[] | null;
  nonResidentialHouseTypes: ENonResidentialHouseTypeStringDictionaryItem[] | null;
}

export interface HousingStockFilterResponseSuccessApiResponse {
  successResponse: HousingStockFilterResponse | null;
}

export interface GuidSuccessApiResponse {
  /** @format uuid */
  successResponse: string;
}

export interface StringPagedList {
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
  items: string[] | null;
}

export interface StringPagedListSuccessApiResponse {
  successResponse: StringPagedList | null;
}

export interface ImportLogListResponse {
  importLogs: ImportLogResponse[] | null;
}

export interface ImportLogListResponseSuccessApiResponse {
  successResponse: ImportLogListResponse | null;
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
  successResponse: IndividualDeviceMountPlaceListWrappedResponse | null;
}

export interface IndividualDeviceReadingsCreateRequest {
  /** @format double */
  value1: number;

  /** @format double */
  value2?: number | null;

  /** @format double */
  value3?: number | null;

  /** @format double */
  value4?: number | null;
  isForced?: boolean;

  /** @format int32 */
  deviceId: number;

  /** @format date-time */
  readingDate: string;

  /** @format date-time */
  uploadTime?: string | null;
}

export enum EIndividualDeviceReadingsSource {
  Archive = "Archive",
  Ttm = "Ttm",
  GosUslugi = "GosUslugi",
  Bank = "Bank",
  Sputnik = "Sputnik",
  Duplicated = "Duplicated",
  Erc = "Erc",
  TtmFromErc = "TtmFromErc",
}

export interface IndividualDeviceReadingsCreateResponse {
  status: string | null;
  date: string | null;
  resource: string | null;

  /** @format int32 */
  taskId: number | null;
  message: string | null;

  /** @format date-time */
  uploadDate: string;
  source: EIndividualDeviceReadingsSource;
  user: ManagingFirmUserShortResponse | null;
}

export interface IndividualDeviceReadingsCreateListResponse {
  current: IndividualDeviceReadingsCreateResponse | null;
  modified: IndividualDeviceReadingsCreateResponse[] | null;
}

export interface IndividualDeviceReadingsCreateListResponseSuccessApiResponse {
  successResponse: IndividualDeviceReadingsCreateListResponse | null;
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

  /** @format int32 */
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;

  /** @format int32 */
  nextPageNumber: number;

  /** @format int32 */
  previousPageNumber: number;
  items: IndividualDeviceReadingsExistingFlagModel[] | null;
}

export interface IndividualDeviceReadingsExistingFlagModelPagedListSuccessApiResponse {
  successResponse: IndividualDeviceReadingsExistingFlagModelPagedList | null;
}

export interface IndividualDeviceReadingsSetEmptyRequest {
  /** @format date-time */
  date: string;
  devicesIds: number[];
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
  readingDateTime: string;

  /** @format date-time */
  uploadTime: string;
  source: EIndividualDeviceReadingsSource;
  user: ManagingFirmUserShortResponse | null;
}

export interface IndividualDeviceResponse {
  /** @format int32 */
  id: number;
  transactionType: string | null;
  model: string | null;
  serialNumber: string | null;
  sealNumber: string | null;

  /** @format date-time */
  sealInstallationDate: string | null;

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
  closingReason: EClosingReason;
  isActive: boolean | null;

  /** @format int32 */
  bitDepth: number | null;

  /** @format double */
  scaleFactor: number | null;

  /** @format int32 */
  checkingNumber: number;
  address: FullAddressResponse | null;
  resource: EResourceType;
  mountPlace: string | null;
  rateType: EIndividualDeviceRateType;
  readings: IndividualDeviceReadingsResponse[] | null;
  hasMagneticSeal: boolean;

  /** @format date-time */
  magneticSealInstallationDate: string | null;
  magneticSealTypeName: string | null;
  measurableUnitString: string | null;
  isPolling: boolean;

  /** @format int32 */
  contractorId: number | null;
}

export interface IndividualDeviceResponseSuccessApiResponse {
  successResponse: IndividualDeviceResponse | null;
}

export interface UpdateIndividualDeviceRequest {
  serialNumber?: string | null;
  sealNumber?: string | null;

  /** @format date-time */
  sealInstallationDate?: string | null;

  /** @format int32 */
  bitDepth?: number | null;

  /** @format double */
  scaleFactor?: number | null;

  /** @format int32 */
  checkingNumber?: number | null;

  /** @format date-time */
  lastCheckingDate?: string | null;

  /** @format date-time */
  futureCheckingDate?: string | null;
  model?: string | null;

  /** @format int32 */
  mountPlaceId?: number | null;
  resource?: EResourceType | null;

  /** @format int32 */
  apartmentId?: number | null;
  rateType?: EIndividualDeviceRateType | null;
  isPolling?: boolean | null;

  /** @format int32 */
  contractorId?: number | null;
}

export interface IndividualDeviceListItemResponse {
  /** @format int32 */
  id: number;
  transactionType: string | null;
  model: string | null;
  serialNumber: string | null;
  sealNumber: string | null;

  /** @format date-time */
  sealInstallationDate: string | null;
  managementFirm: ManagementFirmResponse | null;

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
  closingReason: EClosingReason;
  isActive: boolean;

  /** @format int32 */
  bitDepth: number | null;

  /** @format double */
  scaleFactor: number | null;

  /** @format int32 */
  checkingNumber: number;
  resource: EResourceType;
  mountPlace: string | null;
  rateType: EIndividualDeviceRateType;
  readings: IndividualDeviceReadingsResponse[] | null;
  hasMagneticSeal: boolean;

  /** @format date-time */
  magneticSealInstallationDate: string | null;
  magneticSealTypeName: string | null;
  isPolling: boolean;
  apartmentNumber: string | null;
  homeownerName: string | null;
  personalAccountNumber: string | null;

  /** @format int32 */
  contractorId: number | null;
}

export interface IndividualDeviceListItemResponsePagedList {
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
  items: IndividualDeviceListItemResponse[] | null;
}

export interface IndividualDeviceListItemResponsePagedListSuccessApiResponse {
  successResponse: IndividualDeviceListItemResponsePagedList | null;
}

export interface BaseIndividualDeviceReadingsCreateRequest {
  /** @format double */
  value1: number;

  /** @format double */
  value2?: number | null;

  /** @format double */
  value3?: number | null;

  /** @format double */
  value4?: number | null;
}

export interface CreateIndividualDeviceRequest {
  serialNumber: string;
  sealNumber?: string | null;

  /** @format date-time */
  sealInstallationDate?: string | null;

  /** @format date-time */
  lastCheckingDate?: string | null;

  /** @format date-time */
  futureCheckingDate?: string | null;
  documentsIds?: number[] | null;

  /** @format int32 */
  bitDepth?: number | null;

  /** @format double */
  scaleFactor?: number | null;

  /** @format date-time */
  openingDate?: string | null;

  /** @format int32 */
  checkingNumber?: number | null;
  model?: string | null;

  /** @format int32 */
  apartmentId: number;
  resource: EResourceType;

  /** @format int32 */
  mountPlaceId?: number | null;
  rateType: EIndividualDeviceRateType;
  startupReadings?: BaseIndividualDeviceReadingsCreateRequest | null;
  defaultReadings?: BaseIndividualDeviceReadingsCreateRequest | null;
  isPolling?: boolean;

  /** @format int32 */
  contractorId?: number | null;
}

export interface CloseDeviceRequest {
  /** @format int32 */
  deviceId: number;
  documentsIds?: number[] | null;

  /** @format date-time */
  closingDate: string;
}

export interface ReopenDeviceRequest {
  /** @format date-time */
  lastCheckingDate?: string | null;

  /** @format date-time */
  futureCheckingDate?: string | null;
  documentsIds?: number[] | null;
}

export interface SwitchMagneticSealRequest {
  /** @format date-time */
  magneticSealInstallationDate?: string | null;
  magneticSealTypeName?: string | null;
}

export interface SetMagneticSealRequest {
  /** @format date-time */
  magneticSealInstallationDate?: string | null;
  magneticSealTypeName?: string | null;
  isInstalled?: boolean;
}

export interface SwitchIndividualDeviceRequest {
  /** @format int32 */
  deviceId: number;
  documentsIds?: number[] | null;

  /** @format int32 */
  newDeviceId?: number | null;
  serialNumber?: string | null;
  sealNumber?: string | null;

  /** @format date-time */
  sealInstallationDate?: string | null;

  /** @format date-time */
  lastCheckingDate?: string | null;

  /** @format date-time */
  futureCheckingDate?: string | null;

  /** @format date-time */
  futureCommercialAccountingDate?: string | null;

  /** @format date-time */
  lastCommercialAccountingDate?: string | null;

  /** @format date-time */
  openingDate?: string | null;

  /** @format int32 */
  contractorId?: number | null;

  /** @format int32 */
  checkingNumber?: number | null;

  /** @format int32 */
  bitDepth?: number | null;

  /** @format double */
  scaleFactor?: number | null;
  model?: string | null;
  rateType?: EIndividualDeviceRateType;
  newDeviceStartupReadings?: BaseIndividualDeviceReadingsCreateRequest | null;
  newDeviceDefaultReadings?: BaseIndividualDeviceReadingsCreateRequest | null;
  previousDeviceFinishingReadings?: BaseIndividualDeviceReadingsCreateRequest | null;
}

export interface IndividualDeviceReadingsItemHistoryResponse {
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
  readingDateTime: string;

  /** @format date-time */
  uploadTime: string;
  source: EIndividualDeviceReadingsSource;
  user: ManagingFirmUserShortResponse | null;
  isArchived: boolean;
  consumption1: string | null;
  consumption2: string | null;
  consumption3: string | null;
  consumption4: string | null;
}

export interface IndividualDeviceReadingsMonthHistoryResponse {
  /** @format int32 */
  month: number;
  readings: IndividualDeviceReadingsItemHistoryResponse[] | null;
}

export interface IndividualDeviceReadingsYearHistoryResponse {
  /** @format int32 */
  year: number;
  monthReadings: IndividualDeviceReadingsMonthHistoryResponse[] | null;
}

export interface IndividualDeviceReadingsHistoryResponse {
  yearReadings: IndividualDeviceReadingsYearHistoryResponse[] | null;
}

export interface IndividualDeviceReadingsHistoryResponseSuccessApiResponse {
  successResponse: IndividualDeviceReadingsHistoryResponse | null;
}

export interface CheckIndividualDeviceRequest {
  /** @format int32 */
  deviceId: number;
  documentsIds?: number[] | null;

  /** @format date-time */
  currentCheckingDate: string;

  /** @format date-time */
  futureCheckingDate: string;
  sealNumber?: string | null;

  /** @format date-time */
  sealInstallationDate?: string | null;
  newDeviceStartupReadings?: BaseIndividualDeviceReadingsCreateRequest | null;
  newDeviceDefaultReadings?: BaseIndividualDeviceReadingsCreateRequest | null;
  previousDeviceFinishingReadings?: BaseIndividualDeviceReadingsCreateRequest | null;

  /** @format int32 */
  contractorId?: number | null;
}

export enum ECompetenceType {
  HousingStockElectricityDevice = "HousingStockElectricityDevice",
  HousingStockHeatControlDevice = "HousingStockHeatControlDevice",
  HousingStockWaterAndHeatDevice = "HousingStockWaterAndHeatDevice",
  OutdoorLighting = "OutdoorLighting",
  TrafficRegulation = "TrafficRegulation",
  IntraHouseElectricalNetwork = "IntraHouseElectricalNetwork",
  ElectricityIndividualDevice = "ElectricityIndividualDevice",
  WaterAndHeatIndividualDevice = "WaterAndHeatIndividualDevice",
}

export enum ENomenclatureType {
  InstallingPowerSupplyDevices = "InstallingPowerSupplyDevices",
  InstallingCounter = "InstallingCounter",
  UninstallingDevice = "UninstallingDevice",
  WorkTitle = "WorkTitle",
}

export interface NomenclatureResponse {
  title: string | null;
  type: ENomenclatureType;
}

export interface CompetenceResponse {
  title: string | null;
  type: ECompetenceType;
  nomenclatures: NomenclatureResponse[] | null;
}

export interface CompetenceListResponse {
  competences: CompetenceResponse[] | null;
}

export interface CompetenceListResponseSuccessApiResponse {
  successResponse: CompetenceListResponse | null;
}

export interface ManagementFirmCompetenceUserResponse {
  /** @format int32 */
  userId: number;
}

export interface ManagementFirmCompetenceResponse {
  /** @format uuid */
  id: string;
  competence: CompetenceResponse | null;
  relatedUsers: ManagementFirmCompetenceUserResponse[] | null;
}

export interface ManagementFirmCompetencesListResponse {
  /** @format int32 */
  managementFirmId: number;
  items: ManagementFirmCompetenceResponse[] | null;
}

export interface ManagementFirmCompetencesListResponseSuccessApiResponse {
  successResponse: ManagementFirmCompetencesListResponse | null;
}

export interface AddManagementFirmCompetenceRequest {
  type?: ECompetenceType;
}

export interface ManagementFirmCompetenceResponseSuccessApiResponse {
  successResponse: ManagementFirmCompetenceResponse | null;
}

export interface ManagementFirmResponsePagedList {
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
  items: ManagementFirmResponse[] | null;
}

export interface ManagementFirmResponsePagedListSuccessApiResponse {
  successResponse: ManagementFirmResponsePagedList | null;
}

export interface ManagementFirmResponseSuccessApiResponse {
  successResponse: ManagementFirmResponse | null;
}

export interface ManagementFirmUpdateRequest {
  name?: string | null;
  phoneNumber?: string | null;
  timeZoneOffset?: TimeSpan | null;
}

export enum EManagingFirmUserWorkingStatusType {
  Working = "Working",
  OnVacation = "OnVacation",
  Sick = "Sick",
  OnDuty = "OnDuty",
}

export interface UserStatusResponse {
  /** @format uuid */
  id: string | null;
  title: string | null;
  type: EManagingFirmUserWorkingStatusType;

  /** @format date-time */
  startDate: string | null;

  /** @format date-time */
  endDate: string | null;
}

export interface ManagingFirmUserListResponse {
  /** @format int32 */
  id: number;
  email: string | null;
  name: string | null;
  cellphone: string | null;

  /** @format int32 */
  executingTaskCount: number;
  status: UserStatusResponse | null;
}

export interface ManagingFirmUserListResponsePagedList {
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
  items: ManagingFirmUserListResponse[] | null;
}

export interface ManagingFirmUserListResponsePagedListSuccessApiResponse {
  successResponse: ManagingFirmUserListResponsePagedList | null;
}

export interface ManagingFirmUserCreateRequest {
  /** @format email */
  email?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  middleName?: string | null;
  cellphone?: string | null;
  department?: string | null;
  position?: string | null;
  number?: string | null;
  password?: string | null;
  userRoleIds?: number[] | null;
  firmCompetenceIds?: string[] | null;
  housingStockIds?: number[] | null;
}

export interface ManagementFirmShortResponse {
  /** @format int32 */
  id: number;
  name: string | null;
}

export interface UserCompetenceResponse {
  /** @format uuid */
  id: string;
  title: string | null;
  type: ECompetenceType;
}

export enum ESecuredIdentityRoleName {
  ManagingFirmAdministrator = "ManagingFirmAdministrator",
  ManagingFirmExecutor = "ManagingFirmExecutor",
  Homeowner = "Homeowner",
  ManagingFirmOperator = "ManagingFirmOperator",
  ErcService = "ErcService",
  ScadaService = "ScadaService",
  Admin = "Admin",
  Worker = "Worker",
  ManagingFirmSpectator = "ManagingFirmSpectator",
  ManagingFirmDispatcher = "ManagingFirmDispatcher",
  Controller = "Controller",
}

export interface UserRoleResponse {
  /** @format int32 */
  id: number;
  type: ESecuredIdentityRoleName;
  title: string | null;
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
  profilePhoto: DocumentResponse | null;

  /** @format date-time */
  hireDate: string | null;

  /** @format date-time */
  dismissalDate: string | null;

  /** @format date-time */
  suspendedFromDate: string | null;
  managementFirm: ManagementFirmShortResponse | null;
  status: UserStatusResponse | null;
  competences: UserCompetenceResponse[] | null;
  userRoles: UserRoleResponse[] | null;
  housingStocks: HousingStockShortResponse[] | null;
}

export interface ManagingFirmUserResponseSuccessApiResponse {
  successResponse: ManagingFirmUserResponse | null;
}

export enum EManagementFirmEventType {
  Add = "Add",
  Update = "Update",
  Delete = "Delete",
  IndividualDeviceClose = "IndividualDeviceClose",
  HousingMeteringDeviceClose = "HousingMeteringDeviceClose",
  MeteringDeviceCheck = "MeteringDeviceCheck",
  TaskClose = "TaskClose",
  TaskStagePush = "TaskStagePush",
  TaskStageRevert = "TaskStageRevert",
  ApartmentSetStatus = "ApartmentSetStatus",
  CalculatorSwitch = "CalculatorSwitch",
  HousingMeterignDeviceSwitch = "HousingMeterignDeviceSwitch",
  IndividualDeviceSwitchMagneticSeal = "IndividualDeviceSwitchMagneticSeal",
  CalculatorClose = "CalculatorClose",
  IndividualDeviceSwitch = "IndividualDeviceSwitch",
  IndividualDeviceReopen = "IndividualDeviceReopen",
  TaskReturn = "TaskReturn",
}

export interface ManagementFirmEventDataDeviceResponse {
  /** @format int32 */
  id: number;
  serialNumber: string | null;
  model: string | null;
  resource: EResourceType;
}

export interface ManagementFirmEventDataPipeNodeResponse {
  /** @format int32 */
  id: number;

  /** @format int32 */
  number: number;
  resource: EResourceType;

  /** @format int32 */
  entryNumber: number | null;
}

export interface ManagementFirmEventDataElectricNodeResponse {
  /** @format int32 */
  id: number;

  /** @format int32 */
  number: number;
  resource: EResourceType;
}

export interface ManagementFirmEventDataApartmentResponse {
  /** @format int32 */
  id: number;
  number: string | null;
}

export interface ManagementFirmEventDataHousingStockResponse {
  /** @format int32 */
  id: number;
  city: string | null;
  street: string | null;
  number: string | null;
  corpus: string | null;
}

export enum EManagingFirmTaskType {
  CalculatorMalfunction = "CalculatorMalfunction",
  CalculatorMalfunctionNonComercial = "CalculatorMalfunctionNonComercial",
  HousingDeviceMalfunction = "HousingDeviceMalfunction",
  HousingDeviceMalfunctionNonComercial = "HousingDeviceMalfunctionNonComercial",
  CalculatorLackOfConnection = "CalculatorLackOfConnection",
  IndividualDeviceCheck = "IndividualDeviceCheck",
  PipeRupture = "PipeRupture",
  CurrentApplication = "CurrentApplication",
  EmergencyApplication = "EmergencyApplication",
}

export interface ManagementFirmEventDataTaskResponse {
  /** @format int32 */
  id: number;
  title: string | null;
  type: EManagingFirmTaskType;
}

export interface ManagementFirmEventDataIdResponse {
  id: string | null;
  name: string | null;
}

export interface ManagementFirmEventDataChangingResponse {
  fieldName: string | null;
  oldValue: string | null;
  newValue: string | null;
}

export interface ManagementFirmEventDataResponse {
  switchedDevice: ManagementFirmEventDataDeviceResponse | null;
  device: ManagementFirmEventDataDeviceResponse | null;
  pipeNode: ManagementFirmEventDataPipeNodeResponse | null;
  electricNode: ManagementFirmEventDataElectricNodeResponse | null;
  apartment: ManagementFirmEventDataApartmentResponse | null;
  housingStock: ManagementFirmEventDataHousingStockResponse | null;
  task: ManagementFirmEventDataTaskResponse | null;
  ids: ManagementFirmEventDataIdResponse[] | null;
  changings: ManagementFirmEventDataChangingResponse[] | null;
}

export interface ManagingFirmUserEventResponse {
  title: string | null;
  eventType: EManagementFirmEventType;

  /** @format date-time */
  eventTime: string;
  data: ManagementFirmEventDataResponse | null;
}

export interface ManagingFirmUserStatisticsResponse {
  /** @format int32 */
  userId: number;

  /** @format int32 */
  openedTasksCount: number;

  /** @format int32 */
  closedTasksCount: number;

  /** @format int32 */
  expiredTasksCount: number;

  /** @format double */
  inTimeClosedTasksPercent: number;
  events: ManagingFirmUserEventResponse[] | null;
}

export interface ManagingFirmUserStatisticsResponseSuccessApiResponse {
  successResponse: ManagingFirmUserStatisticsResponse | null;
}

export interface ManagingFirmUserUpdateRequest {
  /** @format email */
  email?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  middleName?: string | null;
  cellphone?: string | null;
  department?: string | null;
  position?: string | null;
  number?: string | null;
  userRoleIds?: number[] | null;
  firmCompetenceIds?: string[] | null;
  housingStockIds?: number[] | null;
}

export interface EManagingFirmUserWorkingStatusTypeStringDictionaryItem {
  key?: EManagingFirmUserWorkingStatusType;
  value?: string | null;
}

export interface EManagingFirmUserWorkingStatusTypeStringDictionaryItemListSuccessApiResponse {
  successResponse: EManagingFirmUserWorkingStatusTypeStringDictionaryItem[] | null;
}

export interface AddManagingFirmUserWorkingStatusRequest {
  /** @format int32 */
  userId?: number;
  type?: EManagingFirmUserWorkingStatusType;

  /** @format date-time */
  startDate?: string | null;

  /** @format date-time */
  endDate?: string | null;
}

export interface ManagingFirmUserWorkingStatusResponse {
  /** @format uuid */
  id: string | null;
  type: EManagingFirmUserWorkingStatusType;

  /** @format date-time */
  startDate: string | null;

  /** @format date-time */
  endDate: string | null;
}

export interface ManagingFirmUserWorkingStatusResponseSuccessApiResponse {
  successResponse: ManagingFirmUserWorkingStatusResponse | null;
}

export interface MeteringDeviceListResponsePagedList {
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
  items: MeteringDeviceListResponse[] | null;
}

export interface MeteringDeviceListResponsePagedListSuccessApiResponse {
  successResponse: MeteringDeviceListResponsePagedList | null;
}

export interface MeteringDeviceSearchListResponse {
  /** @format int32 */
  id: number;
  type: string | null;
  isConnected: boolean;
  model: string | null;
  serialNumber: string | null;
  sealNumber: string | null;

  /** @format date-time */
  sealInstallationDate: string | null;
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

export enum EMeteringDeviceType {
  Calculator = "Calculator",
  HousingPipe = "HousingPipe",
  Individual = "Individual",
  HousingElectric = "HousingElectric",
}

export interface CalculatorIntoNodeResponse {
  /** @format int32 */
  id: number;
  transactionType: string | null;
  model: string | null;
  serialNumber: string | null;
  sealNumber: string | null;

  /** @format date-time */
  sealInstallationDate: string | null;

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
  closingReason: EClosingReason;
  isActive: boolean | null;

  /** @format int32 */
  bitDepth: number | null;

  /** @format double */
  scaleFactor: number | null;

  /** @format int32 */
  checkingNumber: number;
  connection: MeteringDeviceConnection | null;
  isConnected: boolean | null;
  address: HousingStockAddressResponse | null;

  /** @format int32 */
  infoId: number | null;
}

export interface PipeNodeResponse {
  /** @format int32 */
  id: number;

  /** @format int32 */
  number: number;
  nodeStatus: NodeCommercialStatusResponse | null;
  resource: EResourceType;
  nodeServiceZone: NodeServiceZoneResponse | null;

  /** @format date-time */
  lastCommercialAccountingDate: string | null;

  /** @format date-time */
  futureCommercialAccountingDate: string | null;

  /** @format int32 */
  housingStockId: number;
  address: HousingStockAddressResponse | null;
  documents: DocumentLiteResponse[] | null;
  heatingSeason: PipeNodeHeatingSeasonListResponse | null;

  /** @format int32 */
  calculatorId: number | null;
  calculator: CalculatorIntoNodeResponse | null;

  /** @format int32 */
  entryNumber: number | null;
  communicationPipes: CommunicationPipeResponse[] | null;
}

export interface NodesPagedList {
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
  pipeNodes: PipeNodeResponse[] | null;
  electricNodes: ElectricNodeResponse[] | null;
}

export interface NodesPagedListSuccessApiResponse {
  successResponse: NodesPagedList | null;
}

export interface AddNodeDocumentsRequest {
  documentsIds?: number[] | null;
}

export interface NodeServiceZoneListResponse {
  nodeServiceZones: NodeServiceZoneResponse[] | null;
}

export interface NodeServiceZoneListResponseSuccessApiResponse {
  successResponse: NodeServiceZoneListResponse | null;
}

export interface NodeServiceZoneRequest {
  name?: string | null;
}

export interface NodeServiceZoneResponseSuccessApiResponse {
  successResponse: NodeServiceZoneResponse | null;
}

export enum ENodeWorkingRangeSeason {
  HeatingSeason = "HeatingSeason",
  InterHeating = "InterHeating",
}

export enum ENodeWorkingRangesType {
  AllowableError = "AllowableError",
  CriticalError = "CriticalError",
  MassOfFeedFlowMagistral = "MassOfFeedFlowMagistral",
  MassOfFeedBackFlowMagistral = "MassOfFeedBackFlowMagistral",
  DeltaMassOfMagistral = "DeltaMassOfMagistral",
}

export interface AddOrUpdateNodeWorkingRangeRequest {
  season?: ENodeWorkingRangeSeason;
  nodeResourceType?: EResourceType;

  /** @format uuid */
  housingManagementId?: string | null;

  /** @format int32 */
  nodeId?: number | null;
  typeWorkingRange?: ENodeWorkingRangesType;

  /** @format float */
  min?: number | null;

  /** @format float */
  max?: number | null;
}

export interface ValueNodeWorkingRangeResponse {
  /** @format uuid */
  nodeWorkingRangeId: string;
  season: ENodeWorkingRangeSeason;
  nodeResourceType: EResourceType;
  nodeWorkingRangesType: ENodeWorkingRangesType;
  unit: string | null;

  /** @format float */
  min: number | null;

  /** @format float */
  max: number | null;

  /** @format int32 */
  managementFirmId: number;

  /** @format uuid */
  houseManagementId: string;

  /** @format int32 */
  nodeId: number;
}

export interface ValueNodeWorkingRangeResponseSuccessApiResponse {
  successResponse: ValueNodeWorkingRangeResponse | null;
}

export interface GetNodeWorkingRangeRequest {
  season?: ENodeWorkingRangeSeason;
  nodeResourceType?: EResourceType;

  /** @format uuid */
  housingManagementId?: string | null;

  /** @format int32 */
  nodeId?: number | null;
  typeWorkingRange?: ENodeWorkingRangesType;
}

export interface GetAllNodeWorkingRangeRequest {
  season?: ENodeWorkingRangeSeason;
  nodeResourceType?: EResourceType;

  /** @format uuid */
  housingManagementId?: string | null;

  /** @format int32 */
  nodeId?: number | null;
}

export interface AllNodeWorkingRangeResponse {
  season: ENodeWorkingRangeSeason;
  nodeResourceType: EResourceType;
  nodeWorkingRanges: ValueNodeWorkingRangeResponse[] | null;
}

export interface AllNodeWorkingRangeResponseSuccessApiResponse {
  successResponse: AllNodeWorkingRangeResponse | null;
}

export interface PipeHousingMeteringDeviceConnectionResponse {
  hub: PipeHousingMeteringDeviceHubConnectionResponse | null;

  /** @format int32 */
  calculatorId: number | null;

  /** @format int32 */
  nodeId: number | null;
  calculatorSerialNumber: string | null;
  calculatorModel: string | null;
  calculatorConnection: MeteringDeviceConnection | null;
}

export interface PipeHousingMeteringDeviceResponse {
  /** @format int32 */
  id: number;
  transactionType: string | null;
  model: string | null;
  serialNumber: string | null;
  sealNumber: string | null;

  /** @format date-time */
  sealInstallationDate: string | null;

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
  closingReason: EClosingReason;
  isActive: boolean | null;

  /** @format int32 */
  bitDepth: number | null;

  /** @format double */
  scaleFactor: number | null;

  /** @format int32 */
  checkingNumber: number;
  resource: EResourceType;
  housingMeteringDeviceType: EHousingMeteringDeviceType;
  address: HousingStockAddressResponse | null;
  measuringUnit: EMeasuringUnit;

  /** @format double */
  minReadingsValue: number | null;

  /** @format double */
  maxReadingsValue: number | null;
  comment: HousingMeteringDeviceCommentResponse | null;
  diameter: string | null;
  hubConnection: PipeHousingMeteringDeviceConnectionResponse | null;
}

export interface PipeHousingMeteringDeviceResponseSuccessApiResponse {
  successResponse: PipeHousingMeteringDeviceResponse | null;
}

export interface CreatePipeConnectionRequest {
  /** @format int32 */
  pipeNumber: number;
  magistral: EMagistralType;

  /** @format int32 */
  nodeId: number;
}

export interface UpdatePipeHousingMeteringDeviceRequest {
  serialNumber?: string | null;
  sealNumber?: string | null;

  /** @format date-time */
  sealInstallationDate?: string | null;

  /** @format int32 */
  bitDepth?: number | null;

  /** @format double */
  scaleFactor?: number | null;

  /** @format int32 */
  checkingNumber?: number | null;

  /** @format date-time */
  lastCheckingDate?: string | null;

  /** @format date-time */
  futureCheckingDate?: string | null;
  housingMeteringDeviceType?: EHousingMeteringDeviceType | null;
  resource?: EResourceType | null;
  model?: string | null;
  measuringUnit?: EMeasuringUnit | null;

  /** @format double */
  minReadingsValue?: number | null;

  /** @format double */
  maxReadingsValue?: number | null;

  /** @format date-time */
  lastCommercialAccountingDate?: string | null;

  /** @format date-time */
  futureCommercialAccountingDate?: string | null;
  pipe?: CreatePipeConnectionRequest | null;

  /** @format int32 */
  diameter?: number | null;
}

export interface CreatePipeHousingMeteringDeviceRequest {
  serialNumber: string;
  sealNumber?: string | null;

  /** @format date-time */
  sealInstallationDate?: string | null;

  /** @format date-time */
  lastCheckingDate?: string | null;

  /** @format date-time */
  futureCheckingDate?: string | null;
  documentsIds?: number[] | null;

  /** @format int32 */
  bitDepth?: number | null;

  /** @format double */
  scaleFactor?: number | null;

  /** @format date-time */
  openingDate?: string | null;

  /** @format int32 */
  checkingNumber?: number | null;
  housingMeteringDeviceType: EHousingMeteringDeviceType;
  resource: EResourceType;
  model: string;
  measuringUnit?: EMeasuringUnit;

  /** @format double */
  minReadingsValue?: number | null;

  /** @format double */
  maxReadingsValue?: number | null;

  /** @format date-time */
  futureCommercialAccountingDate: string;

  /** @format date-time */
  lastCommercialAccountingDate?: string | null;
  pipe?: CreatePipeConnectionRequest | null;

  /** @format int32 */
  diameter?: number | null;
}

export interface PipeNodeResponseSuccessApiResponse {
  successResponse: PipeNodeResponse | null;
}

export interface UpdatePipeNodeRequest {
  /** @format int32 */
  number?: number;
  nodeStatus?: ENodeCommercialAccountStatus;
  resource?: EResourceType;

  /** @format int32 */
  nodeServiceZoneId?: number | null;

  /** @format date-time */
  startCommercialAccountingDate?: string | null;

  /** @format date-time */
  endCommercialAccountingDate?: string | null;

  /** @format int32 */
  entryNumber?: number | null;

  /** @format int32 */
  calculatorId?: number | null;
}

export interface CreateCommunicationPipeRequest {
  /** @format int32 */
  number?: number;
  magistral?: string | null;
  devices?: CreatePipeHousingMeteringDeviceRequest[] | null;
}

export interface CreatePipeNodeRequest {
  /** @format int32 */
  number?: number;
  nodeStatus?: ENodeCommercialAccountStatus;
  resource?: EResourceType;

  /** @format int32 */
  nodeServiceZoneId?: number;

  /** @format int32 */
  housingStockId?: number;
  admissionAct?: NodeAdmissionActRequest | null;

  /** @format int32 */
  entryNumber?: number | null;

  /** @format int32 */
  calculatorId?: number | null;
  communicationPipes?: CreateCommunicationPipeRequest[] | null;
}

export interface CommunicationPipeForAddingDeviceResponse {
  /** @format int32 */
  id: number;

  /** @format int32 */
  number: number;
}

export interface CommunicationPipeForAddingDeviceListResponse {
  /** @format int32 */
  nodeId: number;

  /** @format int32 */
  entryNumber: number | null;
  magistralType: EMagistralType;
  pipes: CommunicationPipeForAddingDeviceResponse[] | null;
}

export interface CommunicationPipeForAddingDeviceListResponseSuccessApiResponse {
  successResponse: CommunicationPipeForAddingDeviceListResponse | null;
}

export interface GroupReportResponse {
  /** @format uuid */
  id: string | null;

  /** @format uuid */
  houseManagementId: string | null;
  title: string | null;
}

export interface EResourceTypeStringDictionaryItem {
  key?: EResourceType;
  value?: string | null;
}

export interface GroupReportHousingStockResponse {
  /** @format int32 */
  id: number;
  number: string | null;
  corpus: string | null;
  categoryText: string | null;
}

export interface GroupReportHousingStockGroupResponse {
  street: string | null;
  housingStocks: GroupReportHousingStockResponse[] | null;
}

export interface GroupReportContractorResponse {
  /** @format int32 */
  id: number;
  title: string | null;
}

export interface GroupReportFormResponse {
  groupReports: GroupReportResponse[] | null;
  nodeResourceTypes: EResourceTypeStringDictionaryItem[] | null;
  nodeStatuses: ENodeCommercialAccountStatusNullableStringDictionaryItem[] | null;
  housingStockGroups: GroupReportHousingStockGroupResponse[] | null;
  contractors: GroupReportContractorResponse[] | null;
}

export interface GroupReportFormResponseSuccessApiResponse {
  successResponse: GroupReportFormResponse | null;
}

export interface CreateGroupReportRequest {
  title?: string | null;
  housingStockIds?: number[] | null;
}

export interface GroupReportResponseSuccessApiResponse {
  successResponse: GroupReportResponse | null;
}

export enum EEmailSubscriptionType {
  Once = "Once",
  OncePerTwoWeeks = "OncePerTwoWeeks",
  OncePerMonth = "OncePerMonth",
  OncePerQuarter = "OncePerQuarter",
}

export enum EResourceDisconnectingType {
  Other = "Other",
  Planned = "Planned",
  Emergency = "Emergency",
  Preventive = "Preventive",
  Repair = "Repair",
}

export enum EResourceDisconnectingOrderRule {
  StartDate = "StartDate",
  EndDate = "EndDate",
}

export interface ResourceDisconnectingTypeResponse {
  value: EResourceDisconnectingType;
  description: string | null;
}

export interface ResourceDisconnectingResponse {
  /** @format uuid */
  id: string;
  resource: EResourceType;
  disconnectingType: ResourceDisconnectingTypeResponse | null;

  /** @format date-time */
  startDate: string;

  /** @format date-time */
  endDate: string;
  sender: string | null;
  heatingStation: HeatingStationShortResponse | null;

  /** @format int32 */
  managementFirmId: number;
  housingStocks: HousingStockAddressResponse[] | null;
}

export interface ResourceDisconnectingResponsePagedList {
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
  items: ResourceDisconnectingResponse[] | null;
}

export interface ResourceDisconnectingResponsePagedListSuccessApiResponse {
  successResponse: ResourceDisconnectingResponsePagedList | null;
}

export interface ResourceDisconnectingCreateRequest {
  resource: EResourceType;
  sender: string;

  /** @format uuid */
  heatingStationId?: string | null;
  disconnectingType: EResourceDisconnectingType;
  housingStockIds: number[];

  /** @format date-time */
  startDate: string;

  /** @format date-time */
  endDate: string;
}

export interface ResourceDisconnectingResponseSuccessApiResponse {
  successResponse: ResourceDisconnectingResponse | null;
}

export interface EResourceDisconnectingTypeNullableStringDictionaryItem {
  key?: EResourceDisconnectingType | null;
  value?: string | null;
}

export interface ResourceDisconnectingFilterResponse {
  disconnectingTypes: EResourceDisconnectingTypeNullableStringDictionaryItem[] | null;
  resourceTypes: EResourceTypeNullableStringDictionaryItem[] | null;
  cities: string[] | null;
}

export interface ResourceDisconnectingFilterResponseSuccessApiResponse {
  successResponse: ResourceDisconnectingFilterResponse | null;
}

export enum ETaskApplicationType {
  Emergency = "Emergency",
  Current = "Current",
}

export interface CreateTaskApplicationRequest {
  number?: string | null;

  /** @format date-time */
  applicationDate?: string;

  /** @format uuid */
  sourceId?: string;
  type?: ETaskApplicationType;
  competence?: ECompetenceType;
  nomenclatures?: ENomenclatureType[] | null;

  /** @format int32 */
  apartmentId?: number | null;

  /** @format int32 */
  housingStockId?: number | null;
  comment?: string | null;

  /** @format int32 */
  executorId?: number;
}

export interface TaskApplicationSourceResponse {
  /** @format uuid */
  id: string;
  name: string | null;
}

export enum ETaskApplicationStatus {
  Open = "Open",
  Closed = "Closed",
}

export interface TaskApplicationResponse {
  /** @format int32 */
  id: number;

  /** @format int32 */
  taskId: number;
  number: string | null;

  /** @format date-time */
  applicationDate: string;

  /** @format date-time */
  closingDate: string | null;
  source: TaskApplicationSourceResponse | null;
  status: ETaskApplicationStatus;
  type: ETaskApplicationType;
  competence: ECompetenceType;
  nomenclatures: ENomenclatureType[] | null;
  address: FullAddressResponse | null;
  comment: string | null;
  executor: ManagingFirmUserShortResponse | null;
}

export interface TaskApplicationResponseSuccessApiResponse {
  successResponse: TaskApplicationResponse | null;
}

export interface TaskApplicationListResponse {
  applications: TaskApplicationResponse[] | null;
}

export interface TaskApplicationListResponseSuccessApiResponse {
  successResponse: TaskApplicationListResponse | null;
}

export interface TaskApplicationTypeResponse {
  title: string | null;
  type: ETaskApplicationType;
}

export interface TaskApplicationTypeListResponse {
  types: TaskApplicationTypeResponse[] | null;
}

export interface TaskApplicationTypeListResponseSuccessApiResponse {
  successResponse: TaskApplicationTypeListResponse | null;
}

export interface TaskApplicationSourceListResponse {
  sources: TaskApplicationSourceResponse[] | null;
}

export interface TaskApplicationSourceListResponseSuccessApiResponse {
  successResponse: TaskApplicationSourceListResponse | null;
}

export interface TaskApplicationSourceRequest {
  name?: string | null;
}

export interface TaskApplicationSourceResponseSuccessApiResponse {
  successResponse: TaskApplicationSourceResponse | null;
}

export enum ETaskTargetType {
  Apartment = "Apartment",
  Calculator = "Calculator",
  Housing = "Housing",
  Node = "Node",
  Application = "Application",
}

export enum EManagingFirmTaskFilterType {
  CalculatorMalfunctionAny = "CalculatorMalfunctionAny",
  HousingDeviceMalfunctionAny = "HousingDeviceMalfunctionAny",
  CalculatorLackOfConnection = "CalculatorLackOfConnection",
  IndividualDeviceCheck = "IndividualDeviceCheck",
  PipeRupture = "PipeRupture",
  CurrentApplication = "CurrentApplication",
  EmergencyApplication = "EmergencyApplication",
}

export enum TaskGroupingFilter {
  Executing = "Executing",
  Observing = "Observing",
  NotArchived = "NotArchived",
  Archived = "Archived",
  Returnable = "Returnable",
}

export enum ETaskClosingStatus {
  Properly = "Properly",
  Interrupted = "Interrupted",
}

export interface StageResponse {
  /** @format int32 */
  id: number;

  /** @format int32 */
  number: number;
  name: string | null;
  perpetrator: ManagingFirmUserShortResponse | null;
  status: string | null;
  actions: string[] | null;
  additionalActions: string[] | null;
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

export interface TaskApplicationForTaskResponse {
  /** @format int32 */
  id: number;
  number: string | null;

  /** @format date-time */
  applicationDate: string;
  source: TaskApplicationSourceResponse | null;
  type: ETaskApplicationType;
  competence: ECompetenceType;
  nomenclatures: ENomenclatureType[] | null;
  comment: string | null;
}

export interface TaskListResponse {
  /** @format int32 */
  id: number;
  name: string | null;
  currentStage: StageResponse | null;

  /** @format date-time */
  creationTime: string | null;

  /** @format date-time */
  expectedCompletionTime: string | null;

  /** @format date-time */
  closingTime: string | null;
  closingStatus: ETaskClosingStatus | null;
  address: FullAddressResponse | null;
  perpetrator: ManagingFirmUserShortResponse | null;
  isResponsible: boolean;

  /** @format int32 */
  targetId: number | null;
  hasChanged: boolean;
  needsValidation: boolean;
  triggersInformation: TaskTriggersInformation | null;
  device: MeteringDeviceSearchListResponse | null;
  pipeNode: PipeNodeResponse | null;
  applications: TaskApplicationForTaskResponse[] | null;
  mainHomeowner: HomeownersShortResponse | null;

  /** @format int32 */
  totalHomeownersCount: number;
}

export interface TasksPagedList {
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
  items: TaskListResponse[] | null;

  /** @format int32 */
  executingTasksCount: number | null;

  /** @format int32 */
  observingTasksCount: number | null;
}

export interface TasksPagedListSuccessApiResponse {
  successResponse: TasksPagedList | null;
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
  perpetrator: ManagingFirmUserShortResponse | null;
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
  perpetrator: ManagingFirmUserShortResponse | null;

  /** @format date-time */
  creationTime: string | null;

  /** @format date-time */
  expectedCompletionTime: string | null;

  /** @format date-time */
  closingTime: string | null;
  closingStatus: ETaskClosingStatus | null;
  isResponsible: boolean;
  userOperatingStatus: string | null;
  currentStage: StageResponse | null;
  device: MeteringDeviceResponse | null;
  apartment: ApartmentResponse | null;
  pipeNode: PipeNodeResponse | null;
  documents: DocumentResponse[] | null;
  comments: TaskCommentResponse[] | null;
  stages: StageListResponse[] | null;
  applications: TaskApplicationForTaskResponse[] | null;
  consumableMaterials: string | null;
}

export interface TaskResponseSuccessApiResponse {
  successResponse: TaskResponse | null;
}

export enum ETaskTargetObjectRequestType {
  Apartment = "Apartment",
  MeteringDevice = "MeteringDevice",
  Node = "Node",
  Application = "Application",
}

export interface TaskCreationTargetObject {
  type?: ETaskTargetObjectRequestType;

  /** @format int32 */
  id?: number;
}

export enum ETaskCreateType {
  CalculatorMalfunction = "CalculatorMalfunction",
  HousingDeviceMalfunction = "HousingDeviceMalfunction",
  CalculatorLackOfConnection = "CalculatorLackOfConnection",
  PipeRupture = "PipeRupture",
}

export interface TaskCreateRequest {
  targetObject?: TaskCreationTargetObject | null;
  creationReason?: string | null;
  taskType?: ETaskCreateType;
}

export interface TaskCreateResponse {
  /** @format int32 */
  id: number;
  type: EManagingFirmTaskType;

  /** @format date-time */
  triggerTime: string;

  /** @format int32 */
  triggersCount: number;
  isValidated: boolean;
}

export interface TaskCreateResponseSuccessApiResponse {
  successResponse: TaskCreateResponse | null;
}

export interface StageEmailNotifyRequest {
  contractorsIds?: number[] | null;
  message?: string | null;
}

export interface StagePushRequest {
  comment?: string | null;
  emailNotify?: StageEmailNotifyRequest | null;

  /** @format int32 */
  nextStageId?: number | null;

  /** @format int32 */
  nextPerpetratorId?: number | null;

  /** @format date-time */
  nextStageDeadline?: string | null;
  documentsIds?: number[] | null;
  deviceChecks?: CheckDeviceRequest[] | null;
  deviceCloses?: CloseDeviceRequest[] | null;
  calculatorSwitch?: SwitchCalculatorRequest | null;
  housingMeteringDeviceSwitch?: SwitchHousingMeteringDeviceRequest | null;
  readings?: IndividualDeviceReadingsCreateRequest[] | null;
  consumableMaterials?: string | null;
}

export interface StageRevertRequest {
  comment?: string | null;
}

export interface StageListResponseWrappedListResponse {
  items: StageListResponse[] | null;
}

export interface StageListResponseWrappedListResponseSuccessApiResponse {
  successResponse: StageListResponseWrappedListResponse | null;
}

export interface TaskCommentRequest {
  comment?: string | null;
}

export interface TaskCommentResponseSuccessApiResponse {
  successResponse: TaskCommentResponse | null;
}

export interface TaskAssignToMultipleRequest {
  taskIds: number[];

  /** @format int32 */
  nextPerpetratorId: number;
}

export interface EManagingFirmTaskFilterTypeStringDictionaryItem {
  key?: EManagingFirmTaskFilterType;
  value?: string | null;
}

export interface ETaskClosingStatusStringDictionaryItem {
  key?: ETaskClosingStatus;
  value?: string | null;
}

export interface TaskFilterResponse {
  taskTypes: EManagingFirmTaskFilterTypeStringDictionaryItem[] | null;
  closingStatuses: ETaskClosingStatusStringDictionaryItem[] | null;
}

export interface TaskFilterResponseSuccessApiResponse {
  successResponse: TaskFilterResponse | null;
}

export interface UserRoleListResponse {
  /** @format int32 */
  id: number;
  type: ESecuredIdentityRoleName;
  title: string | null;
}

export interface UserRoleListWrappedResponse {
  items: UserRoleListResponse[] | null;
}

export interface UserRoleListWrappedResponseSuccessApiResponse {
  successResponse: UserRoleListWrappedResponse | null;
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
    apartmentsCreate: (data: ApartmentCreateRequest | null, params: RequestParams = {}) =>
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
        Corpus?: string | null;
        ApartmentNumber?: string | null;
        HousingStockId?: number | null;
        Question?: string | null;
        IndividualDeviceSerialNumber?: string | null;
        PageNumber?: number;
        PageSize?: number;
        OrderBy?: EOrderByRule;
      },
      params: RequestParams = {},
    ) =>
      this.request<ApartmentListResponsePagedListSuccessApiResponse, ErrorApiResponse>({
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
    apartmentsUpdate: (
      apartmentId: number,
      query?: {
        Square?: number | null;
        NumberOfLiving?: number | null;
        NormativeNumberOfLiving?: number | null;
        MainHomeownerAccountId?: string | null;
        Comment?: string | null;
        ColdWaterRiserCount?: number | null;
        HotWaterRiserCount?: number | null;
      },
      params: RequestParams = {},
    ) =>
      this.request<ApartmentResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/Apartments/${apartmentId}`,
        method: "PUT",
        query: query,
        secure: true,
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
     * @name ApartmentsHomeownerAccountsDetail
     * @request GET:/api/Apartments/{apartmentId}/HomeownerAccounts
     * @secure
     */
    apartmentsHomeownerAccountsDetail: (
      apartmentId: number,
      query?: { IsClosed?: boolean | null },
      params: RequestParams = {},
    ) =>
      this.request<HomeownerAccountResponseICollectionSuccessApiResponse, ErrorApiResponse>({
        path: `/api/Apartments/${apartmentId}/HomeownerAccounts`,
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
     * @name ApartmentsIndividualDeviceCheckDocumentsDetail
     * @request GET:/api/Apartments/{apartmentId}/IndividualDeviceCheckDocuments
     * @secure
     */
    apartmentsIndividualDeviceCheckDocumentsDetail: (
      apartmentId: number,
      query?: { PageNumber?: number; PageSize?: number; OrderBy?: OrderByRule },
      params: RequestParams = {},
    ) =>
      this.request<DocumentResponsePagedListSuccessApiResponse, ErrorApiResponse>({
        path: `/api/Apartments/${apartmentId}/IndividualDeviceCheckDocuments`,
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
     * @name ApartmentsSetStatusProblemDevicesDetail
     * @request GET:/api/Apartments/{apartmentId}/SetStatusProblemDevices
     * @secure
     */
    apartmentsSetStatusProblemDevicesDetail: (
      apartmentId: number,
      query: {
        Status: EApartmentStatus;
        FromDate?: string | null;
        ToDate?: string | null;
        DocumentIds?: number[] | null;
      },
      params: RequestParams = {},
    ) =>
      this.request<IndividualDeviceWithExpiredCheckingDateListResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/Apartments/${apartmentId}/SetStatusProblemDevices`,
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
     * @name ApartmentsSetStatusPartialUpdate
     * @request PATCH:/api/Apartments/{apartmentId}/SetStatus
     * @secure
     */
    apartmentsSetStatusPartialUpdate: (
      apartmentId: number,
      data: ApartmentStatusSetRequest | null,
      params: RequestParams = {},
    ) =>
      this.request<IndividualDeviceWithExpiredCheckingDateListResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/Apartments/${apartmentId}/SetStatus`,
        method: "PATCH",
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
     * @name AuthLoginCreate
     * @request POST:/api/Auth/login
     * @secure
     */
    authLoginCreate: (data: LoginRequest | null, params: RequestParams = {}) =>
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
    authRefreshTokenCreate: (data: RefreshTokenRequest | null, params: RequestParams = {}) =>
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
    authLogoutCreate: (data: LogoutRequest | null, params: RequestParams = {}) =>
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
    authConfirmCreate: (data: ConfirmRequest | null, params: RequestParams = {}) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/Auth/confirm`,
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
     * @name AuthResetPasswordCreate
     * @request POST:/api/Auth/resetPassword
     * @secure
     */
    authResetPasswordCreate: (data: string | null, params: RequestParams = {}) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/Auth/resetPassword`,
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
     * @name AuthChangePasswordCreate
     * @request POST:/api/Auth/changePassword
     * @secure
     */
    authChangePasswordCreate: (data: ConfirmRequest | null, params: RequestParams = {}) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/Auth/changePassword`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
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
     * @name CalculatorsExportList
     * @request GET:/api/Calculators/Export
     * @secure
     */
    calculatorsExportList: (
      query?: {
        "Filter.DiameterRange.From"?: number | null;
        "Filter.DiameterRange.To"?: number | null;
        "Filter.ExpiresCheckingDateAt"?: EExpiresCheckingDateAt | null;
        "Filter.Resource"?: EResourceType | null;
        "Filter.Model"?: string | null;
        "Filter.CommercialDateRange.From"?: string | null;
        "Filter.CommercialDateRange.To"?: string | null;
        "Filter.Address.City"?: string | null;
        "Filter.Address.Street"?: string | null;
        "Filter.Address.HousingStockNumber"?: string | null;
        "Filter.Address.Corpus"?: string | null;
        "Filter.Address.HouseCategory"?: EHouseCategory | null;
        "Filter.HousingStockId"?: number | null;
        "Filter.NodeStatus"?: ENodeCommercialAccountStatus | null;
        Question?: string | null;
        OrderRule?: ECalculatorOrderRule;
        IsConnected?: boolean | null;
        CountTasks?: boolean | null;
        IsClosed?: boolean | null;
        PageNumber?: number;
        PageSize?: number;
        OrderBy?: EOrderByRule;
      },
      params: RequestParams = {},
    ) =>
      this.request<FileContentResultSuccessApiResponse, ErrorApiResponse>({
        path: `/api/Calculators/Export`,
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
     * @name CalculatorsList
     * @request GET:/api/Calculators
     * @secure
     */
    calculatorsList: (
      query?: {
        "Filter.DiameterRange.From"?: number | null;
        "Filter.DiameterRange.To"?: number | null;
        "Filter.ExpiresCheckingDateAt"?: EExpiresCheckingDateAt | null;
        "Filter.Resource"?: EResourceType | null;
        "Filter.Model"?: string | null;
        "Filter.CommercialDateRange.From"?: string | null;
        "Filter.CommercialDateRange.To"?: string | null;
        "Filter.Address.City"?: string | null;
        "Filter.Address.Street"?: string | null;
        "Filter.Address.HousingStockNumber"?: string | null;
        "Filter.Address.Corpus"?: string | null;
        "Filter.Address.HouseCategory"?: EHouseCategory | null;
        "Filter.HousingStockId"?: number | null;
        "Filter.NodeStatus"?: ENodeCommercialAccountStatus | null;
        Question?: string | null;
        OrderRule?: ECalculatorOrderRule;
        IsConnected?: boolean | null;
        CountTasks?: boolean | null;
        IsClosed?: boolean | null;
        PageNumber?: number;
        PageSize?: number;
        OrderBy?: EOrderByRule;
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
     * @tags Calculators
     * @name CalculatorsFiltersList
     * @request GET:/api/Calculators/filters
     * @secure
     */
    calculatorsFiltersList: (params: RequestParams = {}) =>
      this.request<CalculatorFilterResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/Calculators/filters`,
        method: "GET",
        secure: true,
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
      this.request<ContractorListResponsePagedListSuccessApiResponse, ErrorApiResponse>({
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
    contractorsCreate: (data: ContractorCreateRequest | null, params: RequestParams = {}) =>
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
    contractorsUpdate: (contractorId: number, data: ContractorUpdateRequest | null, params: RequestParams = {}) =>
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
     * @tags Contractors
     * @name ContractorsDelete
     * @request DELETE:/api/Contractors/{contractorId}
     * @secure
     */
    contractorsDelete: (contractorId: number, params: RequestParams = {}) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/Contractors/${contractorId}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags CurrentTransformers
     * @name CurrentTransformersDetail
     * @request GET:/api/CurrentTransformers/{currentTransformerId}
     * @secure
     */
    currentTransformersDetail: (currentTransformerId: string, params: RequestParams = {}) =>
      this.request<CurrentTransformerResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/CurrentTransformers/${currentTransformerId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags CurrentTransformers
     * @name CurrentTransformersUpdate
     * @request PUT:/api/CurrentTransformers/{currentTransformerId}
     * @secure
     */
    currentTransformersUpdate: (
      currentTransformerId: string,
      query?: {
        InstallationDate?: string | null;
        ManufactureYear?: number | null;
        StateVerificationYear?: number | null;
        StateVerificationQuarter?: EYearQuarter | null;
        StateVerificationIntervalYears?: number | null;
        NextStateVerificationYear?: number | null;
        TypeName?: string | null;
        Phase?: EPhaseType | null;
        Number?: string | null;
        PrimaryCurrentRatingAmperes?: number | null;
        SecondaryCurrentRatingAmperes?: number | null;
        Coefficient?: number | null;
        LastCommercialAccountingDate?: string | null;
        FutureCommercialAccountingDate?: string | null;
        SealNumber?: string | null;
        SealInstallationDate?: string | null;
      },
      params: RequestParams = {},
    ) =>
      this.request<CurrentTransformerResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/CurrentTransformers/${currentTransformerId}`,
        method: "PUT",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags CurrentTransformers
     * @name CurrentTransformersCreate
     * @request POST:/api/CurrentTransformers
     * @secure
     */
    currentTransformersCreate: (data: CreateCurrentTransformerRequest | null, params: RequestParams = {}) =>
      this.request<CurrentTransformerResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/CurrentTransformers`,
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
     * @tags CurrentTransformers
     * @name CurrentTransformersCloseCreate
     * @request POST:/api/CurrentTransformers/{currentTransformerId}/close
     * @secure
     */
    currentTransformersCloseCreate: (
      currentTransformerId: string,
      data: CloseCurrentTransformerRequest | null,
      params: RequestParams = {},
    ) =>
      this.request<CurrentTransformerResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/CurrentTransformers/${currentTransformerId}/close`,
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
     * @tags CurrentTransformers
     * @name CurrentTransformersCheckCreate
     * @request POST:/api/CurrentTransformers/{currentTransformerId}/check
     * @secure
     */
    currentTransformersCheckCreate: (
      currentTransformerId: string,
      data: CheckCurrentTransformerRequest | null,
      params: RequestParams = {},
    ) =>
      this.request<CurrentTransformerResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/CurrentTransformers/${currentTransformerId}/check`,
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
     * @tags DataMigrations
     * @name DataMigrationsRemoveApartmentTasksCreate
     * @request POST:/api/DataMigrations/RemoveApartmentTasks
     * @secure
     */
    dataMigrationsRemoveApartmentTasksCreate: (query?: { managementFirmId?: number }, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/DataMigrations/RemoveApartmentTasks`,
        method: "POST",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags DataMigrations
     * @name DataMigrationsHousingStockAddFiasIdCreate
     * @request POST:/api/DataMigrations/HousingStockAddFiasId
     * @secure
     */
    dataMigrationsHousingStockAddFiasIdCreate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/DataMigrations/HousingStockAddFiasId`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags DataMigrations
     * @name DataMigrationsHousingStockAddErcIdCreate
     * @request POST:/api/DataMigrations/HousingStockAddErcId
     * @secure
     */
    dataMigrationsHousingStockAddErcIdCreate: (
      data: {
        ContentType?: string | null;
        ContentDisposition?: string | null;
        Headers?: Record<string, string[]>;
        Length?: number;
        Name?: string | null;
        FileName?: string | null;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/DataMigrations/HousingStockAddErcId`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        ...params,
      }),

    /**
     * No description
     *
     * @tags DataMigrations
     * @name DataMigrationsAddCallCenterCreate
     * @request POST:/api/DataMigrations/AddCallCenter
     * @secure
     */
    dataMigrationsAddCallCenterCreate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/DataMigrations/AddCallCenter`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags DataMigrations
     * @name DataMigrationsMakeDemoCreate
     * @request POST:/api/DataMigrations/MakeDemo
     * @secure
     */
    dataMigrationsMakeDemoCreate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/DataMigrations/MakeDemo`,
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
    documentsUploadCreate: (data: { file?: File[] | null; type?: EDocumentType }, params: RequestParams = {}) =>
      this.request<DocumentResponseIEnumerableSuccessApiResponse, ErrorApiResponse>({
        path: `/api/Documents/upload`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Documents
     * @name DocumentsDetail
     * @request GET:/api/Documents/{documentId}
     * @secure
     */
    documentsDetail: (documentId: number, params: RequestParams = {}) =>
      this.request<StringSuccessApiResponse, ErrorApiResponse>({
        path: `/api/Documents/${documentId}`,
        method: "GET",
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
      this.request<void, ErrorApiResponse>({
        path: `/api/Documents/${documentId}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags ElectricHousingMeteringDevices
     * @name ElectricHousingMeteringDevicesDetail
     * @request GET:/api/ElectricHousingMeteringDevices/{deviceId}
     * @secure
     */
    electricHousingMeteringDevicesDetail: (deviceId: number, params: RequestParams = {}) =>
      this.request<ElectricHousingMeteringDeviceResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/ElectricHousingMeteringDevices/${deviceId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags ElectricHousingMeteringDevices
     * @name ElectricHousingMeteringDevicesUpdate
     * @request PUT:/api/ElectricHousingMeteringDevices/{deviceId}
     * @secure
     */
    electricHousingMeteringDevicesUpdate: (
      deviceId: number,
      query?: {
        InstallationDate?: string | null;
        ManufactureYear?: number | null;
        StateVerificationYear?: number | null;
        StateVerificationQuarter?: EYearQuarter | null;
        StateVerificationIntervalYears?: number | null;
        NextStateVerificationYear?: number | null;
        PhaseNumber?: EPhaseNumberType | null;
        HousingMeteringDeviceType?: EHousingMeteringDeviceType | null;
        Resource?: EResourceType | null;
        Model?: string | null;
        MeasuringUnit?: EMeasuringUnit | null;
        MinReadingsValue?: number | null;
        MaxReadingsValue?: number | null;
        LastCommercialAccountingDate?: string | null;
        FutureCommercialAccountingDate?: string | null;
        SerialNumber?: string | null;
        SealNumber?: string | null;
        SealInstallationDate?: string | null;
        BitDepth?: number | null;
        ScaleFactor?: number | null;
        CheckingNumber?: number | null;
        LastCheckingDate?: string | null;
        FutureCheckingDate?: string | null;
      },
      params: RequestParams = {},
    ) =>
      this.request<ElectricHousingMeteringDeviceResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/ElectricHousingMeteringDevices/${deviceId}`,
        method: "PUT",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags ElectricHousingMeteringDevices
     * @name ElectricHousingMeteringDevicesCreate
     * @request POST:/api/ElectricHousingMeteringDevices
     * @secure
     */
    electricHousingMeteringDevicesCreate: (
      data: CreateElectricHousingMeteringDeviceRequest | null,
      params: RequestParams = {},
    ) =>
      this.request<ElectricHousingMeteringDeviceResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/ElectricHousingMeteringDevices`,
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
     * @tags ElectricNodes
     * @name ElectricNodesDetail
     * @request GET:/api/ElectricNodes/{nodeId}
     * @secure
     */
    electricNodesDetail: (nodeId: number, params: RequestParams = {}) =>
      this.request<ElectricNodeResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/ElectricNodes/${nodeId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags ElectricNodes
     * @name ElectricNodesCreate
     * @request POST:/api/ElectricNodes
     * @secure
     */
    electricNodesCreate: (data: CreateElectricNodeRequest | null, params: RequestParams = {}) =>
      this.request<ElectricNodeResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/ElectricNodes`,
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
     * @tags ElectricNodes
     * @name ElectricNodesUpdate
     * @request PUT:/api/ElectricNodes/{electricNodeId}
     * @secure
     */
    electricNodesUpdate: (electricNodeId: number, data: UpdateElectricNodeRequest | null, params: RequestParams = {}) =>
      this.request<ElectricNodeResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/ElectricNodes/${electricNodeId}`,
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
     * @tags ElectricNodes
     * @name ElectricNodesAddAdmissionActCreate
     * @request POST:/api/ElectricNodes/{electricNodeId}/AddAdmissionAct
     * @secure
     */
    electricNodesAddAdmissionActCreate: (
      electricNodeId: number,
      data: NodeAdmissionActRequest | null,
      params: RequestParams = {},
    ) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/ElectricNodes/${electricNodeId}/AddAdmissionAct`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Exports
     * @name ExportsMilurDevicesList
     * @request GET:/api/Exports/MilurDevices
     * @secure
     */
    exportsMilurDevicesList: (query?: { startDate?: string; endDate?: string }, params: RequestParams = {}) =>
      this.request<ImportLogResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/Exports/MilurDevices`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Exports
     * @name ExportsIndividualDeviceReadingsList
     * @request GET:/api/Exports/IndividualDeviceReadings
     * @secure
     */
    exportsIndividualDeviceReadingsList: (query?: { year?: number; month?: number }, params: RequestParams = {}) =>
      this.request<ImportLogResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/Exports/IndividualDeviceReadings`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Exports
     * @name ExportsHousingDeviceReadingsList
     * @request GET:/api/Exports/HousingDeviceReadings
     * @secure
     */
    exportsHousingDeviceReadingsList: (query?: { year?: number; month?: number }, params: RequestParams = {}) =>
      this.request<ImportLogResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/Exports/HousingDeviceReadings`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HeatingSeasons
     * @name HeatingSeasonsList
     * @request GET:/api/HeatingSeasons
     * @secure
     */
    heatingSeasonsList: (params: RequestParams = {}) =>
      this.request<HeatingSeasonPageResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/HeatingSeasons`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HeatingSeasons
     * @name HeatingSeasonsUpdate
     * @request PUT:/api/HeatingSeasons
     * @secure
     */
    heatingSeasonsUpdate: (
      query?: {
        StartDate?: string;
        EndDate?: string | null;
        HouseCategory?: EHouseCategory | null;
        LivingHouseType?: ELivingHouseType | null;
        NonResidentialHouseType?: ENonResidentialHouseType | null;
      },
      params: RequestParams = {},
    ) =>
      this.request<HeatingSeasonResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/HeatingSeasons`,
        method: "PUT",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HeatingSeasons
     * @name HeatingSeasonsSwitchCreate
     * @request POST:/api/HeatingSeasons/Switch
     * @secure
     */
    heatingSeasonsSwitchCreate: (data: SwitchHeatingSeasonRequest | null, params: RequestParams = {}) =>
      this.request<HeatingSeasonResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/HeatingSeasons/Switch`,
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
     * @tags HeatingSeasons
     * @name HeatingSeasonsAddOrUpdateForHouseManagementCreate
     * @request POST:/api/HeatingSeasons/AddOrUpdateForHouseManagement
     * @secure
     */
    heatingSeasonsAddOrUpdateForHouseManagementCreate: (
      data: AddOrUpdateHeatingSeasonForHouseManagementRequest | null,
      params: RequestParams = {},
    ) =>
      this.request<HeatingSeasonResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/HeatingSeasons/AddOrUpdateForHouseManagement`,
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
     * @tags HeatingStation
     * @name HeatingStationList
     * @request GET:/api/HeatingStation
     * @secure
     */
    heatingStationList: (params: RequestParams = {}) =>
      this.request<HeatingStationResponsePagedListSuccessApiResponse, ErrorApiResponse>({
        path: `/api/HeatingStation`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HeatingStation
     * @name HeatingStationCreate
     * @request POST:/api/HeatingStation
     * @secure
     */
    heatingStationCreate: (data: AddHeatingStationRequest | null, params: RequestParams = {}) =>
      this.request<HeatingStationResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/HeatingStation`,
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
     * @tags HeatingStation
     * @name HeatingStationDetail
     * @request GET:/api/HeatingStation/{id}
     * @secure
     */
    heatingStationDetail: (id: string, params: RequestParams = {}) =>
      this.request<HeatingStationResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/HeatingStation/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HeatingStation
     * @name HeatingStationUpdate
     * @request PUT:/api/HeatingStation/{id}
     * @secure
     */
    heatingStationUpdate: (id: string, data: UpdateHeatingStationRequest | null, params: RequestParams = {}) =>
      this.request<HeatingStationResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/HeatingStation/${id}`,
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
     * @tags HeatingStation
     * @name HeatingStationDelete
     * @request DELETE:/api/HeatingStation/{id}
     * @secure
     */
    heatingStationDelete: (id: string, params: RequestParams = {}) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/HeatingStation/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags HomeownerAccount
     * @name HomeownerAccountList
     * @request GET:/api/HomeownerAccount
     * @secure
     */
    homeownerAccountList: (
      query?: {
        Question?: string | null;
        PaymentCode?: string | null;
        OrderRule?: HomeownerAccountOrderRule;
        Status?: StatusType;
        PageNumber?: number;
        PageSize?: number;
        OrderBy?: OrderByRule;
      },
      params: RequestParams = {},
    ) =>
      this.request<HomeownerAccountResponsePagedListSuccessApiResponse, ErrorApiResponse>({
        path: `/api/HomeownerAccount`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HomeownerAccount
     * @name HomeownerAccountCreate
     * @request POST:/api/HomeownerAccount
     * @secure
     */
    homeownerAccountCreate: (data: HomeownerAccountCreateServiceModel | null, params: RequestParams = {}) =>
      this.request<HomeownerAccountResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/HomeownerAccount`,
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
     * @tags HomeownerAccount
     * @name HomeownerAccountDetail
     * @request GET:/api/HomeownerAccount/{homeownerAccId}
     * @secure
     */
    homeownerAccountDetail: (homeownerAccId: string, params: RequestParams = {}) =>
      this.request<HomeownerAccountResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/HomeownerAccount/${homeownerAccId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HomeownerAccount
     * @name HomeownerAccountAttachNewHomeownerCreate
     * @request POST:/api/HomeownerAccount/{id}/AttachNewHomeowner
     * @secure
     */
    homeownerAccountAttachNewHomeownerCreate: (
      id: string,
      data: HomeownerCreateRequest | null,
      params: RequestParams = {},
    ) =>
      this.request<HomeownerAccountResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/HomeownerAccount/${id}/AttachNewHomeowner`,
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
     * @tags HomeownerAccount
     * @name HomeownerAccountAttachHomeownerCreate
     * @request POST:/api/HomeownerAccount/{id}/AttachHomeowner
     * @secure
     */
    homeownerAccountAttachHomeownerCreate: (id: string, data: number, params: RequestParams = {}) =>
      this.request<HomeownerAccountResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/HomeownerAccount/${id}/AttachHomeowner`,
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
     * @tags HomeownerAccount
     * @name HomeownerAccountCloseCreate
     * @request POST:/api/HomeownerAccount/{id}/Close
     * @secure
     */
    homeownerAccountCloseCreate: (id: string, params: RequestParams = {}) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/HomeownerAccount/${id}/Close`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags HomeownerAccount
     * @name HomeownerAccountCertificateDetail
     * @request GET:/api/HomeownerAccount/{id}/Certificate
     * @secure
     */
    homeownerAccountCertificateDetail: (id: string, params: RequestParams = {}) =>
      this.request<HomeownerCertificateResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/HomeownerAccount/${id}/Certificate`,
        method: "GET",
        secure: true,
        format: "json",
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
    homeownersList: (
      query?: { FullName?: string | null; PageNumber?: number; PageSize?: number; OrderBy?: EOrderByRule },
      params: RequestParams = {},
    ) =>
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
    homeownersUpdate: (homeownerId: number, data: HomeownerUpdateRequest | null, params: RequestParams = {}) =>
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
     * @tags Homeowners
     * @name HomeownersHomeownerAccountsDetail
     * @request GET:/api/Homeowners/{homeownerId}/HomeownerAccounts
     * @secure
     */
    homeownersHomeownerAccountsDetail: (
      homeownerId: number,
      query?: { IsClosed?: boolean | null },
      params: RequestParams = {},
    ) =>
      this.request<HomeownerAccountResponseICollectionSuccessApiResponse, ErrorApiResponse>({
        path: `/api/Homeowners/${homeownerId}/HomeownerAccounts`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HouseManagements
     * @name HouseManagementsCreate
     * @request POST:/api/HouseManagements/{houseManagementId}
     * @secure
     */
    houseManagementsCreate: (
      houseManagementId: string,
      data: UpdateHouseManagementRequest,
      params: RequestParams = {},
    ) =>
      this.request<HouseManagementResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/HouseManagements/${houseManagementId}`,
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
     * @tags HousingMeteringDeviceReadings
     * @name HousingMeteringDeviceReadingsList
     * @request GET:/api/HousingMeteringDeviceReadings
     * @secure
     */
    housingMeteringDeviceReadingsList: (query?: { nodeId?: number }, params: RequestParams = {}) =>
      this.request<GetHousingMeteringDeviceReadingsResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/HousingMeteringDeviceReadings`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HousingMeteringDeviceReadings
     * @name HousingMeteringDeviceReadingsCreate
     * @request POST:/api/HousingMeteringDeviceReadings
     * @secure
     */
    housingMeteringDeviceReadingsCreate: (
      data: CreateHousingMeteringDeviceReadingsRequest | null,
      params: RequestParams = {},
    ) =>
      this.request<HousingMeteringDeviceReadingsIncludingPlacementResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/HousingMeteringDeviceReadings`,
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
     * @tags HousingMeteringDeviceReadings
     * @name HousingMeteringDeviceReadingsUpdate
     * @request PUT:/api/HousingMeteringDeviceReadings
     * @secure
     */
    housingMeteringDeviceReadingsUpdate: (
      data: UpdateHousingMeteringDeviceReadingsRequest | null,
      params: RequestParams = {},
    ) =>
      this.request<HousingMeteringDeviceReadingsIncludingPlacementResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/HousingMeteringDeviceReadings`,
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
     * @tags HousingMeteringDeviceReadings
     * @name HousingMeteringDeviceReadingsDelete
     * @request DELETE:/api/HousingMeteringDeviceReadings
     * @secure
     */
    housingMeteringDeviceReadingsDelete: (query?: { id?: string }, params: RequestParams = {}) =>
      this.request<any, ErrorApiResponse>({
        path: `/api/HousingMeteringDeviceReadings`,
        method: "DELETE",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags HousingMeteringDeviceReadings
     * @name HousingMeteringDeviceReadingsCreateOrUpdateLastCreate
     * @request POST:/api/HousingMeteringDeviceReadings/CreateOrUpdateLast
     * @secure
     */
    housingMeteringDeviceReadingsCreateOrUpdateLastCreate: (
      data: CreateHousingMeteringDeviceReadingsRequest | null,
      params: RequestParams = {},
    ) =>
      this.request<HousingMeteringDeviceReadingsIncludingPlacementResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/HousingMeteringDeviceReadings/CreateOrUpdateLast`,
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
     * @name HousingMeteringDevicesList
     * @request GET:/api/HousingMeteringDevices
     * @secure
     */
    housingMeteringDevicesList: (
      query?: {
        City?: string | null;
        Street?: string | null;
        HousingStockNumber?: string | null;
        Corpus?: string | null;
        Resource?: EResourceType | null;
        PageNumber?: number;
        PageSize?: number;
        OrderBy?: EOrderByRule;
      },
      params: RequestParams = {},
    ) =>
      this.request<HousingMeteringDeviceIncludingReadingsResponsePagedListSuccessApiResponse, ErrorApiResponse>({
        path: `/api/HousingMeteringDevices`,
        method: "GET",
        query: query,
        secure: true,
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
    housingMeteringDevicesSwitchCreate: (data: SwitchHousingMeteringDeviceRequest | null, params: RequestParams = {}) =>
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
     * @tags HousingMeteringDevices
     * @name HousingMeteringDevicesCommentDetail
     * @request GET:/api/HousingMeteringDevices/{deviceId}/comment
     * @secure
     */
    housingMeteringDevicesCommentDetail: (deviceId: number, params: RequestParams = {}) =>
      this.request<HousingMeteringDeviceCommentResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/HousingMeteringDevices/${deviceId}/comment`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HousingMeteringDevices
     * @name HousingMeteringDevicesCommentCreate
     * @request POST:/api/HousingMeteringDevices/{deviceId}/comment
     * @secure
     */
    housingMeteringDevicesCommentCreate: (
      deviceId: number,
      data: HousingMeteringDeviceAddCommentRequest | null,
      params: RequestParams = {},
    ) =>
      this.request<HousingMeteringDeviceCommentResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/HousingMeteringDevices/${deviceId}/comment`,
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
     * @name HousingMeteringDevicesCommentUpdate
     * @request PUT:/api/HousingMeteringDevices/{deviceId}/comment
     * @secure
     */
    housingMeteringDevicesCommentUpdate: (
      deviceId: number,
      data: HousingMeteringDeviceUpdateCommentRequest | null,
      params: RequestParams = {},
    ) =>
      this.request<HousingMeteringDeviceCommentResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/HousingMeteringDevices/${deviceId}/comment`,
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
     * @name HousingMeteringDevicesCommentDelete
     * @request DELETE:/api/HousingMeteringDevices/{deviceId}/comment
     * @secure
     */
    housingMeteringDevicesCommentDelete: (deviceId: number, params: RequestParams = {}) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/HousingMeteringDevices/${deviceId}/comment`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags HousingMeteringDevices
     * @name HousingMeteringDevicesReadingsHistoryDetail
     * @request GET:/api/HousingMeteringDevices/{deviceId}/readingsHistory
     * @secure
     */
    housingMeteringDevicesReadingsHistoryDetail: (deviceId: number, params: RequestParams = {}) =>
      this.request<HousingMeteringDeviceReadingsHistoryResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/HousingMeteringDevices/${deviceId}/readingsHistory`,
        method: "GET",
        secure: true,
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
        HouseCategory?: EHouseCategory | null;
        HouseManagementId?: string | null;
        HeatingStationId?: string | null;
        "TotalArea.MaxValue"?: number | null;
        "TotalArea.MinValue"?: number | null;
        "TotalArea.MeasurableUnit"?: string | null;
        LivingHouseType?: ELivingHouseType | null;
        NonResidentialHouseType?: ENonResidentialHouseType | null;
        PageNumber?: number;
        PageSize?: number;
        OrderBy?: EOrderByRule;
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
     * @name HousingStocksControllerDetail
     * @request GET:/api/HousingStocks/{housingStockId}/Controller
     * @secure
     */
    housingStocksControllerDetail: (housingStockId: number, params: RequestParams = {}) =>
      this.request<ManagingFirmUserShortResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/HousingStocks/${housingStockId}/Controller`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HousingStocks
     * @name HousingStocksReassignControllerCreate
     * @request POST:/api/HousingStocks/{housingStockId}/ReassignController/{controllerId}
     * @secure
     */
    housingStocksReassignControllerCreate: (housingStockId: number, controllerId: number, params: RequestParams = {}) =>
      this.request<ManagingFirmUserShortResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/HousingStocks/${housingStockId}/ReassignController/${controllerId}`,
        method: "POST",
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
     * @tags HousingStocks
     * @name HousingStocksFiltersList
     * @request GET:/api/HousingStocks/filters
     * @secure
     */
    housingStocksFiltersList: (params: RequestParams = {}) =>
      this.request<HousingStockFilterResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/HousingStocks/filters`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HousingStocks
     * @name HousingStocksGetFiasIdList
     * @request GET:/api/HousingStocks/GetFiasId
     * @secure
     */
    housingStocksGetFiasIdList: (
      query: {
        Region: string;
        Area: string;
        City: string;
        Street: string;
        HouseNumber: string;
        HouseCorpus?: string | null;
      },
      params: RequestParams = {},
    ) =>
      this.request<GuidSuccessApiResponse, ErrorApiResponse>({
        path: `/api/HousingStocks/GetFiasId`,
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
     * @name HousingStocksExistingCitiesList
     * @request GET:/api/HousingStocks/ExistingCities
     * @secure
     */
    housingStocksExistingCitiesList: (
      query?: { City?: string | null; PageNumber?: number; PageSize?: number; OrderBy?: EOrderByRule },
      params: RequestParams = {},
    ) =>
      this.request<StringPagedListSuccessApiResponse, ErrorApiResponse>({
        path: `/api/HousingStocks/ExistingCities`,
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
     * @name HousingStocksExistingStreetsList
     * @request GET:/api/HousingStocks/ExistingStreets
     * @secure
     */
    housingStocksExistingStreetsList: (
      query?: { Street?: string | null; PageNumber?: number; PageSize?: number; OrderBy?: EOrderByRule },
      params: RequestParams = {},
    ) =>
      this.request<StringPagedListSuccessApiResponse, ErrorApiResponse>({
        path: `/api/HousingStocks/ExistingStreets`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags ImportLogs
     * @name ImportLogsList
     * @request GET:/api/ImportLogs
     * @secure
     */
    importLogsList: (params: RequestParams = {}) =>
      this.request<ImportLogListResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/ImportLogs`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags ImportLogs
     * @name ImportLogsDetail
     * @request GET:/api/ImportLogs/{id}
     * @secure
     */
    importLogsDetail: (id: string, params: RequestParams = {}) =>
      this.request<ImportLogResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/ImportLogs/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Imports
     * @name ImportsIndividualDevicesCreate
     * @request POST:/api/Imports/IndividualDevices
     * @secure
     */
    importsIndividualDevicesCreate: (
      data: {
        ContentType?: string | null;
        ContentDisposition?: string | null;
        Headers?: Record<string, string[]>;
        Length?: number;
        Name?: string | null;
        FileName?: string | null;
      },
      params: RequestParams = {},
    ) =>
      this.request<ImportLogResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/Imports/IndividualDevices`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Imports
     * @name ImportsReadingsFromErcCreate
     * @request POST:/api/Imports/ReadingsFromErc
     * @secure
     */
    importsReadingsFromErcCreate: (
      data: {
        ContentType?: string | null;
        ContentDisposition?: string | null;
        Headers?: Record<string, string[]>;
        Length?: number;
        Name?: string | null;
        FileName?: string | null;
        isForced?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<ImportLogResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/Imports/ReadingsFromErc`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Imports
     * @name ImportsReadingsCreate
     * @request POST:/api/Imports/Readings
     * @secure
     */
    importsReadingsCreate: (
      data: {
        ContentType?: string | null;
        ContentDisposition?: string | null;
        Headers?: Record<string, string[]>;
        Length?: number;
        Name?: string | null;
        FileName?: string | null;
      },
      params: RequestParams = {},
    ) =>
      this.request<ImportLogResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/Imports/Readings`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Imports
     * @name ImportsPersonalAccountNumbersCreate
     * @request POST:/api/Imports/PersonalAccountNumbers
     * @secure
     */
    importsPersonalAccountNumbersCreate: (
      data: {
        ContentType?: string | null;
        ContentDisposition?: string | null;
        Headers?: Record<string, string[]>;
        Length?: number;
        Name?: string | null;
        FileName?: string | null;
      },
      params: RequestParams = {},
    ) =>
      this.request<ImportLogResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/Imports/PersonalAccountNumbers`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
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
    individualDeviceMountPlacesList: (query: { apartmentId: number }, params: RequestParams = {}) =>
      this.request<IndividualDeviceMountPlaceListWrappedResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/IndividualDeviceMountPlaces`,
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
      query: {
        Date: string;
        ManagementFirmId?: number | null;
        PageNumber?: number;
        PageSize?: number;
        OrderBy?: EOrderByRule;
      },
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
        ApartmentIds?: number[] | null;
        PageNumber?: number;
        PageSize?: number;
        OrderBy?: EOrderByRule;
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
      this.request<IndividualDeviceResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/IndividualDevices/close`,
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
     * @name IndividualDevicesReopenCreate
     * @request POST:/api/IndividualDevices/{deviceId}/reopen
     * @secure
     */
    individualDevicesReopenCreate: (deviceId: number, data: ReopenDeviceRequest, params: RequestParams = {}) =>
      this.request<IndividualDeviceResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/IndividualDevices/${deviceId}/reopen`,
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
     * @name IndividualDevicesSwitchMagneticSealCreate
     * @request POST:/api/IndividualDevices/{deviceId}/SwitchMagneticSeal
     * @secure
     */
    individualDevicesSwitchMagneticSealCreate: (
      deviceId: number,
      data: SwitchMagneticSealRequest | null,
      params: RequestParams = {},
    ) =>
      this.request<IndividualDeviceResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/IndividualDevices/${deviceId}/SwitchMagneticSeal`,
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
     * @name IndividualDevicesSetMagneticSealCreate
     * @request POST:/api/IndividualDevices/{deviceId}/SetMagneticSeal
     * @secure
     */
    individualDevicesSetMagneticSealCreate: (
      deviceId: number,
      data: SetMagneticSealRequest | null,
      params: RequestParams = {},
    ) =>
      this.request<IndividualDeviceResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/IndividualDevices/${deviceId}/SetMagneticSeal`,
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
     * @name IndividualDevicesSwitchCreate
     * @request POST:/api/IndividualDevices/switch
     * @secure
     */
    individualDevicesSwitchCreate: (data: SwitchIndividualDeviceRequest | null, params: RequestParams = {}) =>
      this.request<MeteringDeviceResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/IndividualDevices/switch`,
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
     * @name IndividualDevicesReadingsHistoryDetail
     * @request GET:/api/IndividualDevices/{deviceId}/readingsHistory
     * @secure
     */
    individualDevicesReadingsHistoryDetail: (deviceId: number, params: RequestParams = {}) =>
      this.request<IndividualDeviceReadingsHistoryResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/IndividualDevices/${deviceId}/readingsHistory`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags IndividualDevices
     * @name IndividualDevicesCheckCreate
     * @request POST:/api/IndividualDevices/check
     * @secure
     */
    individualDevicesCheckCreate: (data: CheckIndividualDeviceRequest | null, params: RequestParams = {}) =>
      this.request<MeteringDeviceResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/IndividualDevices/check`,
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
     * @tags ManagementFirmCompetences
     * @name ManagementFirmCompetencesCatalogList
     * @request GET:/api/ManagementFirmCompetences/Catalog
     * @secure
     */
    managementFirmCompetencesCatalogList: (params: RequestParams = {}) =>
      this.request<CompetenceListResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/ManagementFirmCompetences/Catalog`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags ManagementFirmCompetences
     * @name ManagementFirmCompetencesList
     * @request GET:/api/ManagementFirmCompetences
     * @secure
     */
    managementFirmCompetencesList: (params: RequestParams = {}) =>
      this.request<ManagementFirmCompetencesListResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/ManagementFirmCompetences`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags ManagementFirmCompetences
     * @name ManagementFirmCompetencesCreate
     * @request POST:/api/ManagementFirmCompetences
     * @secure
     */
    managementFirmCompetencesCreate: (data: AddManagementFirmCompetenceRequest | null, params: RequestParams = {}) =>
      this.request<ManagementFirmCompetenceResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/ManagementFirmCompetences`,
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
     * @tags ManagementFirmCompetences
     * @name ManagementFirmCompetencesDelete
     * @request DELETE:/api/ManagementFirmCompetences/{id}
     * @secure
     */
    managementFirmCompetencesDelete: (id: string, params: RequestParams = {}) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/ManagementFirmCompetences/${id}`,
        method: "DELETE",
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
    managingFirmsList: (
      query?: { PageNumber?: number; PageSize?: number; OrderBy?: EOrderByRule },
      params: RequestParams = {},
    ) =>
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
    managingFirmsUpdate: (
      managingFirmId: number,
      data: ManagementFirmUpdateRequest | null,
      params: RequestParams = {},
    ) =>
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
    managingFirmUsersList: (
      query?: {
        Name?: string | null;
        IsSuspended?: boolean | null;
        RoleNames?: string[] | null;
        PageNumber?: number;
        PageSize?: number;
        OrderBy?: EOrderByRule;
      },
      params: RequestParams = {},
    ) =>
      this.request<ManagingFirmUserListResponsePagedListSuccessApiResponse, ErrorApiResponse>({
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
    managingFirmUsersCreate: (data: ManagingFirmUserCreateRequest | null, params: RequestParams = {}) =>
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
     * @name ManagingFirmUsersStatisticsDetail
     * @request GET:/api/ManagingFirmUsers/{userId}/statistics
     * @secure
     */
    managingFirmUsersStatisticsDetail: (
      userId: number,
      query?: { From?: string | null; To?: string | null },
      params: RequestParams = {},
    ) =>
      this.request<ManagingFirmUserStatisticsResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/ManagingFirmUsers/${userId}/statistics`,
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
    managingFirmUsersUpdate: (userId: number, data: ManagingFirmUserUpdateRequest | null, params: RequestParams = {}) =>
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
     * @tags ManagingFirmUsers
     * @name ManagingFirmUsersSuspendCreate
     * @request POST:/api/ManagingFirmUsers/{userId}/suspend
     * @secure
     */
    managingFirmUsersSuspendCreate: (userId: number, params: RequestParams = {}) =>
      this.request<ManagingFirmUserResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/ManagingFirmUsers/${userId}/suspend`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags ManagingFirmUsers
     * @name ManagingFirmUsersAddressesResetCreate
     * @request POST:/api/ManagingFirmUsers/addressesReset
     * @secure
     */
    managingFirmUsersAddressesResetCreate: (params: RequestParams = {}) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/ManagingFirmUsers/addressesReset`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags ManagingFirmUserWorkingStatuses
     * @name ManagingFirmUserWorkingStatusesList
     * @request GET:/api/ManagingFirmUserWorkingStatuses
     * @secure
     */
    managingFirmUserWorkingStatusesList: (params: RequestParams = {}) =>
      this.request<EManagingFirmUserWorkingStatusTypeStringDictionaryItemListSuccessApiResponse, ErrorApiResponse>({
        path: `/api/ManagingFirmUserWorkingStatuses`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags ManagingFirmUserWorkingStatuses
     * @name ManagingFirmUserWorkingStatusesCreate
     * @request POST:/api/ManagingFirmUserWorkingStatuses
     * @secure
     */
    managingFirmUserWorkingStatusesCreate: (
      data: AddManagingFirmUserWorkingStatusRequest | null,
      params: RequestParams = {},
    ) =>
      this.request<ManagingFirmUserWorkingStatusResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/ManagingFirmUserWorkingStatuses`,
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
        SealNumber?: string | null;
        SealInstallationDate?: string | null;
        DeviceTypes?: string[] | null;
        ApartmentId?: number | null;
        HousingStockId?: number | null;
        PageNumber?: number;
        PageSize?: number;
        OrderBy?: EOrderByRule;
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
    meteringDevicesCloseCreate: (data: CloseDeviceRequest | null, params: RequestParams = {}) =>
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
    meteringDevicesCheckCreate: (data: CheckDeviceRequest | null, params: RequestParams = {}) =>
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
     * @tags MeteringDevices
     * @name MeteringDevicesExistingModelsList
     * @request GET:/api/MeteringDevices/ExistingModels
     * @secure
     */
    meteringDevicesExistingModelsList: (
      query?: {
        Type?: EMeteringDeviceType;
        Text?: string | null;
        PageNumber?: number;
        PageSize?: number;
        OrderBy?: EOrderByRule;
      },
      params: RequestParams = {},
    ) =>
      this.request<StringPagedListSuccessApiResponse, ErrorApiResponse>({
        path: `/api/MeteringDevices/ExistingModels`,
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
     * @name NodesList
     * @request GET:/api/Nodes
     * @secure
     */
    nodesList: (
      query?: {
        CalculatorId?: number | null;
        IsConnected?: boolean | null;
        HousingStockId?: number | null;
        "Address.City"?: string | null;
        "Address.Street"?: string | null;
        "Address.HousingStockNumber"?: string | null;
        "Address.Corpus"?: string | null;
        "Address.HouseCategory"?: EHouseCategory | null;
        Resource?: EResourceType | null;
        NodeStatus?: ENodeCommercialAccountStatus | null;
        "DevicesFilter.ExpiresCheckingDateAt"?: EExpiresCheckingDateAt | null;
        "DevicesFilter.Model"?: string | null;
        "DevicesFilter.Question"?: string | null;
        "DevicesFilter.DiameterRange.From"?: number | null;
        "DevicesFilter.DiameterRange.To"?: number | null;
        "CommercialDateRange.From"?: string | null;
        "CommercialDateRange.To"?: string | null;
        PageNumber?: number;
        PageSize?: number;
        OrderBy?: EOrderByRule;
      },
      params: RequestParams = {},
    ) =>
      this.request<NodesPagedListSuccessApiResponse, ErrorApiResponse>({
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
     * @name NodesDocumentsCreate
     * @request POST:/api/Nodes/{nodeId}/Documents
     * @secure
     */
    nodesDocumentsCreate: (nodeId: number, data: AddNodeDocumentsRequest | null, params: RequestParams = {}) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/Nodes/${nodeId}/Documents`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags NodeServiceZones
     * @name NodeServiceZonesList
     * @request GET:/api/NodeServiceZones
     * @secure
     */
    nodeServiceZonesList: (params: RequestParams = {}) =>
      this.request<NodeServiceZoneListResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/NodeServiceZones`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags NodeServiceZones
     * @name NodeServiceZonesCreate
     * @request POST:/api/NodeServiceZones
     * @secure
     */
    nodeServiceZonesCreate: (data: NodeServiceZoneRequest | null, params: RequestParams = {}) =>
      this.request<NodeServiceZoneResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/NodeServiceZones`,
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
     * @tags NodeServiceZones
     * @name NodeServiceZonesDetail
     * @request GET:/api/NodeServiceZones/{nodeServiceZoneId}
     * @secure
     */
    nodeServiceZonesDetail: (nodeServiceZoneId: number, params: RequestParams = {}) =>
      this.request<NodeServiceZoneResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/NodeServiceZones/${nodeServiceZoneId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags NodeServiceZones
     * @name NodeServiceZonesUpdate
     * @request PUT:/api/NodeServiceZones/{nodeServiceZoneId}
     * @secure
     */
    nodeServiceZonesUpdate: (
      nodeServiceZoneId: number,
      data: NodeServiceZoneRequest | null,
      params: RequestParams = {},
    ) =>
      this.request<NodeServiceZoneResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/NodeServiceZones/${nodeServiceZoneId}`,
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
     * @tags NodeServiceZones
     * @name NodeServiceZonesDelete
     * @request DELETE:/api/NodeServiceZones/{nodeServiceZoneId}
     * @secure
     */
    nodeServiceZonesDelete: (nodeServiceZoneId: number, params: RequestParams = {}) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/NodeServiceZones/${nodeServiceZoneId}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags NodeWorkingRange
     * @name NodeWorkingRangeAddOrUpdateCreate
     * @request POST:/api/NodeWorkingRange/AddOrUpdate
     * @secure
     */
    nodeWorkingRangeAddOrUpdateCreate: (data: AddOrUpdateNodeWorkingRangeRequest | null, params: RequestParams = {}) =>
      this.request<ValueNodeWorkingRangeResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/NodeWorkingRange/AddOrUpdate`,
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
     * @tags NodeWorkingRange
     * @name NodeWorkingRangeGetList
     * @request GET:/api/NodeWorkingRange/Get
     * @secure
     */
    nodeWorkingRangeGetList: (data: GetNodeWorkingRangeRequest | null, params: RequestParams = {}) =>
      this.request<ValueNodeWorkingRangeResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/NodeWorkingRange/Get`,
        method: "GET",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags NodeWorkingRange
     * @name NodeWorkingRangeGetAllList
     * @request GET:/api/NodeWorkingRange/GetAll
     * @secure
     */
    nodeWorkingRangeGetAllList: (data: GetAllNodeWorkingRangeRequest | null, params: RequestParams = {}) =>
      this.request<AllNodeWorkingRangeResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/NodeWorkingRange/GetAll`,
        method: "GET",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags PipeHousingMeteringDevices
     * @name PipeHousingMeteringDevicesDetail
     * @request GET:/api/PipeHousingMeteringDevices/{deviceId}
     * @secure
     */
    pipeHousingMeteringDevicesDetail: (deviceId: number, params: RequestParams = {}) =>
      this.request<PipeHousingMeteringDeviceResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/PipeHousingMeteringDevices/${deviceId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags PipeHousingMeteringDevices
     * @name PipeHousingMeteringDevicesUpdate
     * @request PUT:/api/PipeHousingMeteringDevices/{deviceId}
     * @secure
     */
    pipeHousingMeteringDevicesUpdate: (
      deviceId: number,
      data: UpdatePipeHousingMeteringDeviceRequest,
      params: RequestParams = {},
    ) =>
      this.request<MeteringDeviceResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/PipeHousingMeteringDevices/${deviceId}`,
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
     * @tags PipeHousingMeteringDevices
     * @name PipeHousingMeteringDevicesCreate
     * @request POST:/api/PipeHousingMeteringDevices
     * @secure
     */
    pipeHousingMeteringDevicesCreate: (
      data: CreatePipeHousingMeteringDeviceRequest | null,
      params: RequestParams = {},
    ) =>
      this.request<MeteringDeviceResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/PipeHousingMeteringDevices`,
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
     * @tags PipeNodes
     * @name PipeNodesDetail
     * @request GET:/api/PipeNodes/{pipeNodeId}
     * @secure
     */
    pipeNodesDetail: (pipeNodeId: number, params: RequestParams = {}) =>
      this.request<PipeNodeResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/PipeNodes/${pipeNodeId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags PipeNodes
     * @name PipeNodesUpdate
     * @request PUT:/api/PipeNodes/{pipeNodeId}
     * @secure
     */
    pipeNodesUpdate: (pipeNodeId: number, data: UpdatePipeNodeRequest | null, params: RequestParams = {}) =>
      this.request<PipeNodeResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/PipeNodes/${pipeNodeId}`,
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
     * @tags PipeNodes
     * @name PipeNodesCreate
     * @request POST:/api/PipeNodes
     * @secure
     */
    pipeNodesCreate: (data: CreatePipeNodeRequest | null, params: RequestParams = {}) =>
      this.request<PipeNodeResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/PipeNodes`,
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
     * @tags PipeNodes
     * @name PipeNodesAddAdmissionActCreate
     * @request POST:/api/PipeNodes/{pipeNodeId}/AddAdmissionAct
     * @secure
     */
    pipeNodesAddAdmissionActCreate: (pipeNodeId: number, data: NodeAdmissionActRequest, params: RequestParams = {}) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/PipeNodes/${pipeNodeId}/AddAdmissionAct`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags PipeNodes
     * @name PipeNodesPipesForAddingDeviceDetail
     * @request GET:/api/PipeNodes/{pipeNodeId}/PipesForAddingDevice
     * @secure
     */
    pipeNodesPipesForAddingDeviceDetail: (
      pipeNodeId: number,
      query: {
        entryNumber: number;
        magistralType: EMagistralType;
        housingMeteringDeviceType: EHousingMeteringDeviceType;
      },
      params: RequestParams = {},
    ) =>
      this.request<CommunicationPipeForAddingDeviceListResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/PipeNodes/${pipeNodeId}/PipesForAddingDevice`,
        method: "GET",
        query: query,
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
    reportsCreate: (data: CreateGroupReportRequest | null, params: RequestParams = {}) =>
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
     * @name ReportsArchivesList
     * @request GET:/api/Reports/Archives
     * @secure
     */
    reportsArchivesList: (
      query?: { NodeId?: number | null; ReportType?: string | null; From?: string | null; To?: string | null },
      params: RequestParams = {},
    ) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/Reports/Archives`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Reports
     * @name ReportsReportList
     * @request GET:/api/Reports/Report
     * @secure
     */
    reportsReportList: (
      query?: { NodeId?: number | null; ReportType?: string | null; From?: string | null; To?: string | null },
      params: RequestParams = {},
    ) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/Reports/Report`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Reports
     * @name ReportsConsolidatedReportList
     * @request GET:/api/Reports/ConsolidatedReport
     * @secure
     */
    reportsConsolidatedReportList: (
      query?: { CalculatorsId?: number[] | null; ReportType?: string | null; From?: string | null; To?: string | null },
      params: RequestParams = {},
    ) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/Reports/ConsolidatedReport`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Reports
     * @name ReportsGroupReportList
     * @request GET:/api/Reports/GroupReport
     * @secure
     */
    reportsGroupReportList: (
      query?: {
        GroupReportId?: string | null;
        HouseManagementId?: string | null;
        NodeResourceTypes?: EResourceType[] | null;
        NodeStatus?: ENodeCommercialAccountStatus | null;
        "Subscription.Email"?: string | null;
        "Subscription.ContractorIds"?: number[] | null;
        "Subscription.TriggerAt"?: string;
        "Subscription.Type"?: EEmailSubscriptionType;
        DelayedEmailTarget?: string | null;
        ReportType?: string | null;
        From?: string | null;
        To?: string | null;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/Reports/GroupReport`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags ResourceDisconnecting
     * @name ResourceDisconnectingList
     * @request GET:/api/ResourceDisconnecting
     * @secure
     */
    resourceDisconnectingList: (
      query?: {
        City?: string | null;
        Resource?: EResourceType | null;
        DisconnectingType?: EResourceDisconnectingType | null;
        OrderRule?: EResourceDisconnectingOrderRule;
        PageNumber?: number;
        PageSize?: number;
        OrderBy?: EOrderByRule;
      },
      params: RequestParams = {},
    ) =>
      this.request<ResourceDisconnectingResponsePagedListSuccessApiResponse, ErrorApiResponse>({
        path: `/api/ResourceDisconnecting`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags ResourceDisconnecting
     * @name ResourceDisconnectingCreate
     * @request POST:/api/ResourceDisconnecting
     * @secure
     */
    resourceDisconnectingCreate: (data: ResourceDisconnectingCreateRequest | null, params: RequestParams = {}) =>
      this.request<ResourceDisconnectingResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/ResourceDisconnecting`,
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
     * @tags ResourceDisconnecting
     * @name ResourceDisconnectingDetail
     * @request GET:/api/ResourceDisconnecting/{id}
     * @secure
     */
    resourceDisconnectingDetail: (id: string, params: RequestParams = {}) =>
      this.request<ResourceDisconnectingResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/ResourceDisconnecting/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags ResourceDisconnecting
     * @name ResourceDisconnectingUpdate
     * @request PUT:/api/ResourceDisconnecting/{id}
     * @secure
     */
    resourceDisconnectingUpdate: (
      id: string,
      query: {
        DisconnectingType?: EResourceDisconnectingType | null;
        HousingStockIds: number[];
        StartDate?: string | null;
        EndDate?: string | null;
      },
      params: RequestParams = {},
    ) =>
      this.request<ResourceDisconnectingResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/ResourceDisconnecting/${id}`,
        method: "PUT",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags ResourceDisconnecting
     * @name ResourceDisconnectingFiltersList
     * @request GET:/api/ResourceDisconnecting/filters
     * @secure
     */
    resourceDisconnectingFiltersList: (params: RequestParams = {}) =>
      this.request<ResourceDisconnectingFilterResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/ResourceDisconnecting/filters`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Statistics
     * @name StatisticsTasksFileDetail
     * @request GET:/api/Statistics/{managementFirmId}/tasks/file
     * @secure
     */
    statisticsTasksFileDetail: (
      managementFirmId: number,
      query?: { from?: string; to?: string | null },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/Statistics/${managementFirmId}/tasks/file`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Statistics
     * @name StatisticsConsumptionsFileDetail
     * @request GET:/api/Statistics/{managementFirmId}/consumptions/file
     * @secure
     */
    statisticsConsumptionsFileDetail: (
      managementFirmId: number,
      query?: { from?: string; to?: string | null },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/Statistics/${managementFirmId}/consumptions/file`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Statistics
     * @name StatisticsReadingsFileDetail
     * @request GET:/api/Statistics/{managementFirmId}/readings/file
     * @secure
     */
    statisticsReadingsFileDetail: (
      managementFirmId: number,
      query?: { from?: string; to?: string | null },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/Statistics/${managementFirmId}/readings/file`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags TaskApplications
     * @name TaskApplicationsLinkCreate
     * @request POST:/api/TaskApplications/link/{taskId}
     * @secure
     */
    taskApplicationsLinkCreate: (
      taskId: number,
      data: CreateTaskApplicationRequest | null,
      params: RequestParams = {},
    ) =>
      this.request<TaskApplicationResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/TaskApplications/link/${taskId}`,
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
     * @tags TaskApplications
     * @name TaskApplicationsSimilarList
     * @request GET:/api/TaskApplications/similar
     * @secure
     */
    taskApplicationsSimilarList: (
      query?: {
        Type?: ETaskApplicationType;
        Competence?: ECompetenceType;
        Nomenclatures?: ENomenclatureType[] | null;
        ApartmentId?: number | null;
        HousingStockId?: number | null;
      },
      params: RequestParams = {},
    ) =>
      this.request<TaskApplicationListResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/TaskApplications/similar`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags TaskApplications
     * @name TaskApplicationsCreate
     * @request POST:/api/TaskApplications
     * @secure
     */
    taskApplicationsCreate: (data: CreateTaskApplicationRequest | null, params: RequestParams = {}) =>
      this.request<TaskApplicationResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/TaskApplications`,
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
     * @tags TaskApplications
     * @name TaskApplicationsManagingFirmUsersList
     * @request GET:/api/TaskApplications/managingFirmUsers
     * @secure
     */
    taskApplicationsManagingFirmUsersList: (
      query?: { Type?: ETaskApplicationType; Competence?: ECompetenceType | null; HousingStockId?: number | null },
      params: RequestParams = {},
    ) =>
      this.request<ManagingFirmUserListResponsePagedListSuccessApiResponse, ErrorApiResponse>({
        path: `/api/TaskApplications/managingFirmUsers`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags TaskApplications
     * @name TaskApplicationsTypesList
     * @request GET:/api/TaskApplications/types
     * @secure
     */
    taskApplicationsTypesList: (params: RequestParams = {}) =>
      this.request<TaskApplicationTypeListResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/TaskApplications/types`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags TaskApplicationSources
     * @name TaskApplicationSourcesList
     * @request GET:/api/TaskApplicationSources
     * @secure
     */
    taskApplicationSourcesList: (params: RequestParams = {}) =>
      this.request<TaskApplicationSourceListResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/TaskApplicationSources`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags TaskApplicationSources
     * @name TaskApplicationSourcesCreate
     * @request POST:/api/TaskApplicationSources
     * @secure
     */
    taskApplicationSourcesCreate: (data: TaskApplicationSourceRequest | null, params: RequestParams = {}) =>
      this.request<TaskApplicationSourceResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/TaskApplicationSources`,
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
     * @tags TaskApplicationSources
     * @name TaskApplicationSourcesDetail
     * @request GET:/api/TaskApplicationSources/{sourceId}
     * @secure
     */
    taskApplicationSourcesDetail: (sourceId: string, params: RequestParams = {}) =>
      this.request<TaskApplicationSourceResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/TaskApplicationSources/${sourceId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags TaskApplicationSources
     * @name TaskApplicationSourcesUpdate
     * @request PUT:/api/TaskApplicationSources/{sourceId}
     * @secure
     */
    taskApplicationSourcesUpdate: (
      sourceId: string,
      data: TaskApplicationSourceRequest | null,
      params: RequestParams = {},
    ) =>
      this.request<TaskApplicationSourceResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/TaskApplicationSources/${sourceId}`,
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
     * @tags TaskApplicationSources
     * @name TaskApplicationSourcesDelete
     * @request DELETE:/api/TaskApplicationSources/{sourceId}
     * @secure
     */
    taskApplicationSourcesDelete: (sourceId: string, params: RequestParams = {}) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/TaskApplicationSources/${sourceId}`,
        method: "DELETE",
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
        SearchingFilter?: string | null;
        TargetType?: ETaskTargetType | null;
        TaskId?: number | null;
        TaskType?: EManagingFirmTaskFilterType | null;
        GroupType?: TaskGroupingFilter | null;
        DeviceId?: number | null;
        HousingStockId?: number | null;
        ApartmentId?: number | null;
        HousingStockAddress?: string | null;
        HasChanged?: boolean | null;
        PipeNodeId?: number | null;
        ClosingStatuses?: ETaskClosingStatus[] | null;
        ApplicationCompetenceType?: ECompetenceType | null;
        PageNumber?: number;
        PageSize?: number;
        OrderBy?: EOrderByRule;
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
      this.request<void, ErrorApiResponse>({
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
     * @name TasksCloseCreate
     * @request POST:/api/Tasks/{taskId}/close
     * @secure
     */
    tasksCloseCreate: (taskId: number, params: RequestParams = {}) =>
      this.request<TaskResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/Tasks/${taskId}/close`,
        method: "POST",
        secure: true,
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
    tasksPushStageCreate: (taskId: number, data: StagePushRequest | null, params: RequestParams = {}) =>
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
    tasksRevertStageCreate: (taskId: number, data: StageRevertRequest | null, params: RequestParams = {}) =>
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
    tasksCommentsCreate: (taskId: number, data: TaskCommentRequest | null, params: RequestParams = {}) =>
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
    tasksCommentsUpdate: (
      taskId: number,
      commentId: number,
      data: TaskCommentRequest | null,
      params: RequestParams = {},
    ) =>
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
      this.request<void, ErrorApiResponse>({
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
      this.request<void, ErrorApiResponse>({
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
    tasksAssignMultipleCreate: (data: TaskAssignToMultipleRequest | null, params: RequestParams = {}) =>
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
     * @tags Tasks
     * @name TasksFiltersList
     * @request GET:/api/Tasks/filters
     * @secure
     */
    tasksFiltersList: (params: RequestParams = {}) =>
      this.request<TaskFilterResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/Tasks/filters`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tasks
     * @name TasksReturnCreate
     * @request POST:/api/Tasks/{taskId}/return
     * @secure
     */
    tasksReturnCreate: (taskId: number, params: RequestParams = {}) =>
      this.request<TaskResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/Tasks/${taskId}/return`,
        method: "POST",
        secure: true,
        format: "json",
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

    /**
     * No description
     *
     * @tags UserRoles
     * @name UserRolesForManagementFirmList
     * @request GET:/api/UserRoles/ForManagementFirm
     * @secure
     */
    userRolesForManagementFirmList: (params: RequestParams = {}) =>
      this.request<UserRoleListWrappedResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/UserRoles/ForManagementFirm`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
}
