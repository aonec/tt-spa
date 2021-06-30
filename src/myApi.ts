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

export enum EApartmentStatus {
  Ok = "Ok",
  Debtor = "Debtor",
  Pause = "Pause",
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
  status: EApartmentStatus;
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
  housingStock: HousingStockListResponse;
}

export interface ApartmentListResponsePagedList {
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
}

export interface ApartmentListResponsePagedListSuccessApiResponse {
  successResponse: ApartmentListResponsePagedList;
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
  status: EApartmentStatus;

  /** @format date-time */
  fromDate?: string | null;

  /** @format date-time */
  toDate?: string | null;
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
}

export interface TokenResponse {
  token: string | null;
  refreshToken: string | null;
  roles: string[] | null;
  permissions: EUserPermission[] | null;
  maintenanceMessage: string | null;
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
  permissions: EUserPermission[] | null;
  maintenanceMessage: string | null;
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

export enum EExpiresCheckingDateAt {
  NextMonth = "NextMonth",
  NextTwoMonth = "NextTwoMonth",
  Past = "Past",
}

export enum EResourceType {
  Heat = "Heat",
  HotWaterSupply = "HotWaterSupply",
  ColdWaterSupply = "ColdWaterSupply",
  Electricity = "Electricity",
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
  address: ManagementFirmAddressResponse;
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

export interface NodeHeatingSeasonListItemResponse {
  /** @format uuid */
  id: string;

  /** @format date-time */
  startDate: string;

  /** @format date-time */
  endDate: string | null;
}

export interface NodeHeatingSeasonListResponse {
  isCurrentlyEnabled: boolean;
  items: NodeHeatingSeasonListItemResponse[] | null;
}

export interface HousingMeteringDeviceHubConnectionResponse {
  /** @format int32 */
  entryNumber: number | null;

  /** @format int32 */
  pipeNumber: number | null;
  magistral: string | null;
}

export enum EHousingMeteringDeviceType {
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
  isActive: boolean;
  hub: HousingMeteringDeviceHubConnectionResponse;
  diameter: string | null;
  resource: EResourceType;
  housingMeteringDeviceType: EHousingMeteringDeviceType;
}

export interface CommunicationPipeResponse {
  /** @format int32 */
  id: number;

  /** @format int32 */
  number: number;

  /** @format int32 */
  entryNumber: number | null;
  magistral: string | null;
  devices: HousingMeteringDeviceListResponse[] | null;
}

export interface NodeIntoCalculatorResponse {
  /** @format int32 */
  id: number;

  /** @format int32 */
  number: number;
  nodeStatus: NodeCommercialStatusResponse;
  resource: EResourceType;
  nodeServiceZone: NodeServiceZoneResponse;
  heatingSeason: NodeHeatingSeasonListResponse;

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
  isActive: boolean;
  connection: MeteringDeviceConnection;
  isConnected: boolean | null;
  hasTasks: boolean | null;
  address: HousingStockAddressResponse;
  nodes: NodeIntoCalculatorResponse[] | null;
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

export interface CreateCalculatorRequest {
  serialNumber: string;

  /** @format date-time */
  lastCheckingDate?: string | null;

  /** @format date-time */
  futureCheckingDate?: string | null;

  /** @format date-time */
  lastCommercialAccountingDate?: string | null;
  documentsIds?: number[] | null;
  connection?: MeteringDeviceConnection;
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
  isActive: boolean | null;

  /** @format int32 */
  housingStockId: number | null;
  diameter: string | null;
  connection: MeteringDeviceConnection;
  isConnected: boolean | null;
  type: string | null;
  resource: EResourceType;
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
  isActive: boolean | null;
  connection: MeteringDeviceConnection;
  isConnected: boolean | null;
  address: HousingStockAddressResponse;

  /** @format int32 */
  infoId: number | null;
  nodes: NodeIntoCalculatorResponse[] | null;
}

export interface CalculatorResponseSuccessApiResponse {
  successResponse: CalculatorResponse;
}

export interface UpdateCalculatorRequest {
  /** @format int32 */
  id?: number;
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
  infoId?: number | null;
  connection?: MeteringDeviceConnection;
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
  connection?: MeteringDeviceConnection;

  /** @format date-time */
  futureCommercialAccountingDate?: string | null;
}

export interface ENodeCommercialAccountStatusNullableStringDictionaryItem {
  key?: ENodeCommercialAccountStatus;
  value?: string | null;
}

export interface EHouseCategoryStringDictionaryItem {
  key?: EHouseCategory;
  value?: string | null;
}

export interface EResourceTypeNullableStringDictionaryItem {
  key?: EResourceType;
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
  successResponse: CalculatorFilterResponse;
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
  items: ContractorListResponse[] | null;

  /** @format int32 */
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;

  /** @format int32 */
  nextPageNumber: number;

  /** @format int32 */
  previousPageNumber: number;
}

export interface ContractorListResponsePagedListSuccessApiResponse {
  successResponse: ContractorListResponsePagedList;
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
  successResponse: ContractorResponse;
}

export interface ContractorUpdateRequest {
  name?: string | null;
  cellphone?: string | null;

  /** @format email */
  email?: string | null;
}

export enum DataMigrationMethod {
  HeatingStationFill = "HeatingStationFill",
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

export interface DocumentResponseIEnumerableSuccessApiResponse {
  successResponse: DocumentResponse[] | null;
}

export interface StringSuccessApiResponse {
  successResponse: string | null;
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
  houseCategory: EHouseCategory;
  livingHouseType: ELivingHouseType;
  nonResidentialHouseType: ENonResidentialHouseType;
}

export interface HeatingSeasonHouseManagementListItemAdjustmentResponse {
  /** @format uuid */
  adjustmentId: string;
  titleParts: string[] | null;
  isOpening: boolean;

  /** @format date-time */
  triggerDate: string;
  houseCategory: EHouseCategory;
  livingHouseType: ELivingHouseType;
  nonResidentialHouseType: ENonResidentialHouseType;
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
  successResponse: HeatingSeasonPageResponse;
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
  houseCategory: EHouseCategory;
  livingHouseType: ELivingHouseType;
  nonResidentialHouseType: ENonResidentialHouseType;

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
  successResponse: HeatingSeasonResponse;
}

export interface SwitchHeatingSeasonRequest {
  /** @format int32 */
  documentId?: number;
  isOpening?: boolean;

  /** @format date-time */
  triggerDate?: string;
  houseCategory?: EHouseCategory;
  livingHouseType?: ELivingHouseType;
  nonResidentialHouseType?: ENonResidentialHouseType;
}

export interface AddOrUpdateHeatingSeasonForHouseManagementRequest {
  /** @format date-time */
  startDate?: string;

  /** @format date-time */
  endDate?: string | null;
  houseCategory?: EHouseCategory;
  livingHouseType?: ELivingHouseType;
  nonResidentialHouseType?: ENonResidentialHouseType;

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
  address: AddressResponse;
  housingStocks: HousingStockShortResponse[] | null;
}

export interface HeatingStationResponsePagedList {
  /** @format int32 */
  totalItems: number;

  /** @format int32 */
  pageNumber: number;

  /** @format int32 */
  pageSize: number;
  items: HeatingStationResponse[] | null;

  /** @format int32 */
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;

  /** @format int32 */
  nextPageNumber: number;

  /** @format int32 */
  previousPageNumber: number;
}

export interface HeatingStationResponsePagedListSuccessApiResponse {
  successResponse: HeatingStationResponsePagedList;
}

export interface AddressRequest {
  city: string;
  street: string;
  number: string;
}

export interface AddHeatingStationRequest {
  name: string;
  isThermalChamber?: boolean;
  address?: AddressRequest;
}

export interface HeatingStationResponseSuccessApiResponse {
  successResponse: HeatingStationResponse;
}

export interface UpdateHeatingStationRequest {
  name?: string | null;
  isThermalChamber?: boolean;
  address?: AddressRequest;
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
  /** @format int32 */
  id?: number;
  firstName?: string | null;
  lastName?: string | null;
  middleName?: string | null;
  cellphone?: string | null;
  email?: string | null;
  apartmentsToRemove?: number[] | null;
}

export enum EMagistralType {
  None = "None",
  FeedFlow = "FeedFlow",
  FeedBackFlow = "FeedBackFlow",
}

export interface HousingMeteringDeviceReadingsResponse {
  /** @format uuid */
  id: string | null;

  /** @format uuid */
  previousReadingsId: string | null;

  /** @format double */
  value: number | null;

  /** @format int32 */
  nodeId: number;

  /** @format int32 */
  deviceId: number;
  deviceModel: string | null;
  deviceSerialNumber: string | null;

  /** @format date-time */
  createDate: string;

  /** @format date-time */
  updateDate: string | null;
  magistralType: EMagistralType;

  /** @format int32 */
  year: number;
  month: string | null;
  isActual: boolean;
}

export interface GetHousingMeteringDeviceReadingsResponse {
  items: HousingMeteringDeviceReadingsResponse[] | null;
}

export interface GetHousingMeteringDeviceReadingsResponseSuccessApiResponse {
  successResponse: GetHousingMeteringDeviceReadingsResponse;
}

export interface CreateHousingMeteringDeviceReadingsRequest {
  /** @format double */
  value?: number;

  /** @format int32 */
  deviceId?: number;
}

export interface HousingMeteringDeviceReadingsResponseSuccessApiResponse {
  successResponse: HousingMeteringDeviceReadingsResponse;
}

export interface UpdateHousingMeteringDeviceReadingsRequest {
  /** @format uuid */
  id?: string;

  /** @format double */
  value?: number;
}

export interface CreatePipeConnectionRequest {
  /** @format int32 */
  pipeNumber: number;
  magistral: EMagistralType;

  /** @format int32 */
  nodeId: number;
}

export enum EMeasuringUnit {
  CubicMeter = "CubicMeter",
  KiloWatt = "KiloWatt",
}

export interface UpdateHousingMeteringDeviceRequest {
  /** @format int32 */
  id?: number;
  serialNumber?: string | null;

  /** @format date-time */
  lastCheckingDate?: string | null;

  /** @format date-time */
  futureCheckingDate?: string | null;

  /** @format date-time */
  lastCommercialAccountingDate?: string | null;

  /** @format date-time */
  futureCommercialAccountingDate?: string | null;
  housingMeteringDeviceType?: EHousingMeteringDeviceType;
  resource?: EResourceType;
  model?: string | null;
  pipe?: CreatePipeConnectionRequest;

  /** @format int32 */
  diameter?: number | null;
  measuringUnit?: EMeasuringUnit;

  /** @format double */
  minReadingsValue?: number | null;

  /** @format double */
  maxReadingsValue?: number | null;
}

export interface HousingMeteringDeviceConnectionResponse {
  hub: HousingMeteringDeviceHubConnectionResponse;

  /** @format int32 */
  calculatorId: number | null;

  /** @format int32 */
  nodeId: number | null;
  calculatorSerialNumber: string | null;
  calculatorModel: string | null;
  calculatorConnection: MeteringDeviceConnection;
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
  lastModifiedUser: LastModifiedUserResponse;
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
  isActive: boolean | null;
  diameter: string | null;
  resource: EResourceType;
  housingMeteringDeviceType: EHousingMeteringDeviceType;
  address: HousingStockAddressResponse;
  hubConnection: HousingMeteringDeviceConnectionResponse;
  measuringUnit: EMeasuringUnit;

  /** @format double */
  minReadingsValue: number | null;

  /** @format double */
  maxReadingsValue: number | null;
  comment: HousingMeteringDeviceCommentResponse;
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
  housingMeteringDeviceType: EHousingMeteringDeviceType;
  resource: EResourceType;
  model: string;
  pipe?: CreatePipeConnectionRequest;

  /** @format int32 */
  diameter?: number | null;
  measuringUnit?: EMeasuringUnit;

  /** @format double */
  minReadingsValue?: number | null;

  /** @format double */
  maxReadingsValue?: number | null;
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

export interface HousingMeteringDeviceCommentResponseSuccessApiResponse {
  successResponse: HousingMeteringDeviceCommentResponse;
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

  /** @format uuid */
  heatingStationId: string;
  hasIndividualHeatingStation?: boolean;
}

export interface HeatingStationShortResponse {
  /** @format uuid */
  id: string;
  name: string | null;
  address: AddressResponse;
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
  hasIndividualHeatingStation: boolean;
  heatingStation: HeatingStationShortResponse;
}

export interface HousingStockResponseSuccessApiResponse {
  successResponse: HousingStockResponse;
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
  houseCategory?: EHouseCategory;

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
  successResponse: HousingStockFilterResponse;
}

export interface GuidSuccessApiResponse {
  /** @format uuid */
  successResponse: string;
}

export enum EImportedEntityType {
  IndividualDeviceReadings = "IndividualDeviceReadings",
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
  importErrors: string[] | null;
}

export interface ImportLogResponse {
  /** @format uuid */
  id: string;
  entityType: EImportedEntityType;
  document: DocumentResponse;
  parseResult: ParseResultResponse;
  importResult: ImportResultResponse;
}

export interface ImportLogListResponse {
  importLogs: ImportLogResponse[] | null;
}

export interface ImportLogListResponseSuccessApiResponse {
  successResponse: ImportLogListResponse;
}

export interface ImportLogResponseSuccessApiResponse {
  successResponse: ImportLogResponse;
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

export enum EIndividualDeviceRateType {
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
  isActive: boolean | null;
  address: FullAddressResponse;
  resource: EResourceType;
  mountPlace: string | null;
  rateType: EIndividualDeviceRateType;
  readings: IndividualDeviceReadingsResponse[] | null;
  hasMagneticSeal: boolean;

  /** @format date-time */
  magneticSealInstallationDate: string | null;
}

export interface IndividualDeviceResponseSuccessApiResponse {
  successResponse: IndividualDeviceResponse;
}

export interface UpdateIndividualDeviceRequest {
  /** @format int32 */
  id?: number;
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
  resource?: EResourceType;

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
  isActive: boolean;
  resource: EResourceType;
  mountPlace: string | null;
  rateType: EIndividualDeviceRateType;
  readings: IndividualDeviceReadingsResponse[] | null;
  hasMagneticSeal: boolean;

  /** @format date-time */
  magneticSealInstallationDate: string | null;
  apartmentNumber: string | null;
  homeownerName: string | null;
  personalAccountNumber: string | null;
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
  resource: EResourceType;

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

export interface ECompetenceTypeStringDictionaryItem {
  key?: ECompetenceType;
  value?: string | null;
}

export interface ECompetenceTypeStringDictionaryItemListSuccessApiResponse {
  successResponse: ECompetenceTypeStringDictionaryItem[] | null;
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

export interface ManagementFirmCompetenceUserResponse {
  /** @format int32 */
  userId: number;
}

export interface ManagementFirmCompetenceResponse {
  /** @format uuid */
  id: string;
  competence: CompetenceResponse;
  relatedUsers: ManagementFirmCompetenceUserResponse[] | null;
}

export interface ManagementFirmCompetencesListResponse {
  /** @format int32 */
  managementFirmId: number;
  items: ManagementFirmCompetenceResponse[] | null;
}

export interface ManagementFirmCompetencesListResponseSuccessApiResponse {
  successResponse: ManagementFirmCompetencesListResponse;
}

export interface AddManagementFirmCompetenceRequest {
  type?: ECompetenceType;
}

export interface ManagementFirmCompetenceResponseSuccessApiResponse {
  successResponse: ManagementFirmCompetenceResponse;
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
  status: UserStatusResponse;
}

export interface ManagingFirmUserListResponsePagedList {
  /** @format int32 */
  totalItems: number;

  /** @format int32 */
  pageNumber: number;

  /** @format int32 */
  pageSize: number;
  items: ManagingFirmUserListResponse[] | null;

  /** @format int32 */
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;

  /** @format int32 */
  nextPageNumber: number;

  /** @format int32 */
  previousPageNumber: number;
}

export interface ManagingFirmUserListResponsePagedListSuccessApiResponse {
  successResponse: ManagingFirmUserListResponsePagedList;
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

  /** @format date-time */
  hireDate: string | null;

  /** @format date-time */
  dismissalDate: string | null;

  /** @format date-time */
  suspendedFromDate: string | null;
  managementFirm: ManagementFirmShortResponse;
  status: UserStatusResponse;
  competences: UserCompetenceResponse[] | null;
  userRoles: UserRoleResponse[] | null;
}

export interface ManagingFirmUserResponseSuccessApiResponse {
  successResponse: ManagingFirmUserResponse;
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
}

export interface ManagementFirmEventDataDeviceResponse {
  /** @format int32 */
  id: number;
  serialNumber: string | null;
  model: string | null;
  resource: EResourceType;
}

export interface ManagementFirmEventDataNodeResponse {
  /** @format int32 */
  id: number;

  /** @format int32 */
  number: number;

  /** @format int32 */
  entryNumber: number | null;
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
  switchedDevice: ManagementFirmEventDataDeviceResponse;
  device: ManagementFirmEventDataDeviceResponse;
  node: ManagementFirmEventDataNodeResponse;
  apartment: ManagementFirmEventDataApartmentResponse;
  housingStock: ManagementFirmEventDataHousingStockResponse;
  task: ManagementFirmEventDataTaskResponse;
  ids: ManagementFirmEventDataIdResponse[] | null;
  changings: ManagementFirmEventDataChangingResponse[] | null;
}

export interface ManagingFirmUserEventResponse {
  title: string | null;
  eventType: EManagementFirmEventType;

  /** @format date-time */
  eventTime: string;
  data: ManagementFirmEventDataResponse;
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
  successResponse: ManagingFirmUserStatisticsResponse;
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
  successResponse: ManagingFirmUserWorkingStatusResponse;
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

export interface CalculatorIntoNodeResponse {
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
  isActive: boolean | null;
  connection: MeteringDeviceConnection;
  isConnected: boolean | null;
  address: HousingStockAddressResponse;

  /** @format int32 */
  infoId: number | null;
}

export interface DocumentLiteResponse {
  /** @format int32 */
  id: number;
  name: string | null;

  /** @format date-time */
  uploadingTime: string;
  author: string | null;
}

export interface NodeResponse {
  /** @format int32 */
  id: number;

  /** @format int32 */
  number: number;
  nodeStatus: NodeCommercialStatusResponse;
  resource: EResourceType;
  nodeServiceZone: NodeServiceZoneResponse;
  heatingSeason: NodeHeatingSeasonListResponse;

  /** @format date-time */
  lastCommercialAccountingDate: string | null;

  /** @format date-time */
  futureCommercialAccountingDate: string | null;

  /** @format int32 */
  calculatorId: number | null;
  calculator: CalculatorIntoNodeResponse;

  /** @format int32 */
  entryNumber: number | null;

  /** @format int32 */
  housingStockId: number;
  address: HousingStockAddressResponse;
  communicationPipes: CommunicationPipeResponse[] | null;
  documents: DocumentLiteResponse[] | null;
}

export interface NodeResponseSuccessApiResponse {
  successResponse: NodeResponse;
}

export interface NodeAdmissionActRequest {
  /** @format int32 */
  documentId?: number;

  /** @format date-time */
  startCommercialAccountingDate?: string;

  /** @format date-time */
  endCommercialAccountingDate?: string;
}

export interface UpdateNodeRequest {
  /** @format int32 */
  entryNumber?: number | null;

  /** @format int32 */
  number?: number;
  nodeStatus?: ENodeCommercialAccountStatus;
  resource?: EResourceType;

  /** @format int32 */
  nodeServiceZoneId?: number | null;

  /** @format int32 */
  calculatorId?: number | null;
  admissionAct?: NodeAdmissionActRequest;
}

export interface NodeResponsePagedList {
  /** @format int32 */
  totalItems: number;

  /** @format int32 */
  pageNumber: number;

  /** @format int32 */
  pageSize: number;
  items: NodeResponse[] | null;

  /** @format int32 */
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;

  /** @format int32 */
  nextPageNumber: number;

  /** @format int32 */
  previousPageNumber: number;
}

export interface NodeResponsePagedListSuccessApiResponse {
  successResponse: NodeResponsePagedList;
}

export interface CreateCommunicationPipeRequest {
  /** @format int32 */
  number?: number;
  magistral?: string | null;
  devices?: CreateHousingMeteringDeviceRequest[] | null;
}

export interface CreateNodeRequest {
  /** @format int32 */
  entryNumber?: number | null;

  /** @format int32 */
  number?: number;
  nodeStatus?: ENodeCommercialAccountStatus;
  resource?: EResourceType;

  /** @format int32 */
  nodeServiceZoneId?: number;

  /** @format int32 */
  calculatorId?: number | null;

  /** @format int32 */
  housingStockId?: number;
  communicationPipes?: CreateCommunicationPipeRequest[] | null;
  admissionAct?: NodeAdmissionActRequest;
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
  successResponse: CommunicationPipeForAddingDeviceListResponse;
}

export interface NodeServiceZoneListResponse {
  nodeServiceZones: NodeServiceZoneResponse[] | null;
}

export interface NodeServiceZoneListResponseSuccessApiResponse {
  successResponse: NodeServiceZoneListResponse;
}

export interface NodeServiceZoneRequest {
  name?: string | null;
}

export interface NodeServiceZoneResponseSuccessApiResponse {
  successResponse: NodeServiceZoneResponse;
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
  successResponse: ValueNodeWorkingRangeResponse;
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
  successResponse: AllNodeWorkingRangeResponse;
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
  successResponse: GroupReportFormResponse;
}

export interface CreateGroupReportRequest {
  title?: string | null;
  housingStockIds?: number[] | null;
}

export interface GroupReportResponseSuccessApiResponse {
  successResponse: GroupReportResponse;
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
  disconnectingType: ResourceDisconnectingTypeResponse;

  /** @format date-time */
  startDate: string;

  /** @format date-time */
  endDate: string;
  sender: string | null;
  heatingStation: HeatingStationShortResponse;

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
  items: ResourceDisconnectingResponse[] | null;

  /** @format int32 */
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;

  /** @format int32 */
  nextPageNumber: number;

  /** @format int32 */
  previousPageNumber: number;
}

export interface ResourceDisconnectingResponsePagedListSuccessApiResponse {
  successResponse: ResourceDisconnectingResponsePagedList;
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
  successResponse: ResourceDisconnectingResponse;
}

export interface EResourceDisconnectingTypeNullableStringDictionaryItem {
  key?: EResourceDisconnectingType;
  value?: string | null;
}

export interface ResourceDisconnectingFilterResponse {
  disconnectingTypes: EResourceDisconnectingTypeNullableStringDictionaryItem[] | null;
  resourceTypes: EResourceTypeNullableStringDictionaryItem[] | null;
  cities: string[] | null;
}

export interface ResourceDisconnectingFilterResponseSuccessApiResponse {
  successResponse: ResourceDisconnectingFilterResponse;
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

export interface ManagingFirmUserShortResponse {
  /** @format int32 */
  id: number;
  name: string | null;
  email: string | null;
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
  source: TaskApplicationSourceResponse;
  status: ETaskApplicationStatus;
  type: ETaskApplicationType;
  competence: ECompetenceType;
  nomenclatures: ENomenclatureType[] | null;
  address: FullAddressResponse;
  comment: string | null;
  executor: ManagingFirmUserShortResponse;
}

export interface TaskApplicationResponseSuccessApiResponse {
  successResponse: TaskApplicationResponse;
}

export interface TaskApplicationSourceListResponse {
  sources: TaskApplicationSourceResponse[] | null;
}

export interface TaskApplicationSourceListResponseSuccessApiResponse {
  successResponse: TaskApplicationSourceListResponse;
}

export interface TaskApplicationSourceRequest {
  name?: string | null;
}

export interface TaskApplicationSourceResponseSuccessApiResponse {
  successResponse: TaskApplicationSourceResponse;
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

export interface TaskApplicationForTaskResponse {
  /** @format int32 */
  id: number;
  number: string | null;

  /** @format date-time */
  applicationDate: string;
  source: TaskApplicationSourceResponse;
  type: ETaskApplicationType;
  competence: ECompetenceType;
  nomenclatures: ENomenclatureType[] | null;
  comment: string | null;
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
  closingStatus: ETaskClosingStatus;
  address: FullAddressResponse;
  perpetrator: ManagingFirmUserShortResponse;
  isResponsible: boolean;

  /** @format int32 */
  targetId: number | null;
  hasChanged: boolean;
  needsValidation: boolean;
  triggersInformation: TaskTriggersInformation;
  device: MeteringDeviceSearchListResponse;
  node: NodeResponse;
  applications: TaskApplicationForTaskResponse[] | null;
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
  closingStatus: ETaskClosingStatus;
  isResponsible: boolean;
  userOperatingStatus: string | null;
  currentStage: StageResponse;
  device: MeteringDeviceResponse;
  apartment: ApartmentResponse;
  node: NodeResponse;
  documents: DocumentResponse[] | null;
  comments: TaskCommentResponse[] | null;
  stages: StageListResponse[] | null;
  applications: TaskApplicationForTaskResponse[] | null;
  consumableMaterials: string | null;
}

export interface TaskResponseSuccessApiResponse {
  successResponse: TaskResponse;
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
  targetObject?: TaskCreationTargetObject;
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
  consumableMaterials?: string | null;
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

export interface TaskCommentRequest {
  comment?: string | null;
}

export interface TaskCommentResponseSuccessApiResponse {
  successResponse: TaskCommentResponse;
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
  successResponse: TaskFilterResponse;
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
        Corpus?: string | null;
        ApartmentNumber?: string | null;
        HousingStockId?: number | null;
        Question?: string | null;
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
    authChangePasswordCreate: (data: ConfirmRequest, params: RequestParams = {}) =>
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
        "Filter.ExpiresCheckingDateAt"?: EExpiresCheckingDateAt;
        "Filter.Resource"?: EResourceType;
        "Filter.Model"?: string | null;
        "Filter.CommercialDateRange.From"?: string | null;
        "Filter.CommercialDateRange.To"?: string | null;
        "Filter.Address.City"?: string | null;
        "Filter.Address.Street"?: string | null;
        "Filter.Address.HousingStockNumber"?: string | null;
        "Filter.Address.Corpus"?: string | null;
        "Filter.Address.HouseCategory"?: EHouseCategory;
        "Filter.HousingStockId"?: number | null;
        "Filter.NodeStatus"?: ENodeCommercialAccountStatus;
        Question?: string | null;
        OrderRule?: ECalculatorOrderRule;
        IsConnected?: boolean | null;
        CountTasks?: boolean | null;
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
        "Filter.ExpiresCheckingDateAt"?: EExpiresCheckingDateAt;
        "Filter.Resource"?: EResourceType;
        "Filter.Model"?: string | null;
        "Filter.CommercialDateRange.From"?: string | null;
        "Filter.CommercialDateRange.To"?: string | null;
        "Filter.Address.City"?: string | null;
        "Filter.Address.Street"?: string | null;
        "Filter.Address.HousingStockNumber"?: string | null;
        "Filter.Address.Corpus"?: string | null;
        "Filter.Address.HouseCategory"?: EHouseCategory;
        "Filter.HousingStockId"?: number | null;
        "Filter.NodeStatus"?: ENodeCommercialAccountStatus;
        Question?: string | null;
        OrderRule?: ECalculatorOrderRule;
        IsConnected?: boolean | null;
        CountTasks?: boolean | null;
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
        HouseCategory?: EHouseCategory;
        LivingHouseType?: ELivingHouseType;
        NonResidentialHouseType?: ENonResidentialHouseType;
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
    heatingSeasonsSwitchCreate: (data: SwitchHeatingSeasonRequest, params: RequestParams = {}) =>
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
      data: AddOrUpdateHeatingSeasonForHouseManagementRequest,
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
    heatingStationCreate: (data: AddHeatingStationRequest, params: RequestParams = {}) =>
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
    heatingStationUpdate: (id: string, data: UpdateHeatingStationRequest, params: RequestParams = {}) =>
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
     * @tags Homeowners
     * @name HomeownersList
     * @request GET:/api/Homeowners
     * @secure
     */
    homeownersList: (
      query?: { PageNumber?: number; PageSize?: number; OrderBy?: EOrderByRule },
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
      data: CreateHousingMeteringDeviceReadingsRequest,
      params: RequestParams = {},
    ) =>
      this.request<HousingMeteringDeviceReadingsResponseSuccessApiResponse, ErrorApiResponse>({
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
      data: UpdateHousingMeteringDeviceReadingsRequest,
      params: RequestParams = {},
    ) =>
      this.request<HousingMeteringDeviceReadingsResponseSuccessApiResponse, ErrorApiResponse>({
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
      data: CreateHousingMeteringDeviceReadingsRequest,
      params: RequestParams = {},
    ) =>
      this.request<HousingMeteringDeviceReadingsResponseSuccessApiResponse, ErrorApiResponse>({
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
      data: HousingMeteringDeviceAddCommentRequest,
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
      data: HousingMeteringDeviceUpdateCommentRequest,
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
        HouseCategory?: EHouseCategory;
        HouseManagementId?: string | null;
        HeatingStationId?: string | null;
        "TotalArea.MaxValue"?: number | null;
        "TotalArea.MinValue"?: number | null;
        "TotalArea.MeasurableUnit"?: string | null;
        LivingHouseType?: ELivingHouseType;
        NonResidentialHouseType?: ENonResidentialHouseType;
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
     * @tags ImportReadings
     * @name ImportReadingsImportCreate
     * @request POST:/api/ImportReadings/import
     * @secure
     */
    importReadingsImportCreate: (
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
        path: `/api/ImportReadings/import`,
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
     * @tags ManagementFirmCompetences
     * @name ManagementFirmCompetencesCatalogList
     * @request GET:/api/ManagementFirmCompetences/Catalog
     * @secure
     */
    managementFirmCompetencesCatalogList: (params: RequestParams = {}) =>
      this.request<ECompetenceTypeStringDictionaryItemListSuccessApiResponse, ErrorApiResponse>({
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
    managementFirmCompetencesCreate: (data: AddManagementFirmCompetenceRequest, params: RequestParams = {}) =>
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
     * @tags ManagingFirmUsers
     * @name ManagingFirmUsersSuspendCreate
     * @request POST:/api/ManagingFirmUsers/{userId}/suspend
     * @secure
     */
    managingFirmUsersSuspendCreate: (userId: number, params: RequestParams = {}) =>
      this.request<any, ErrorApiResponse>({
        path: `/api/ManagingFirmUsers/${userId}/suspend`,
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
      data: AddManagingFirmUserWorkingStatusRequest,
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
      this.request<NodeResponseSuccessApiResponse, ErrorApiResponse>({
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
    nodesList: (
      query?: {
        CalculatorId?: number | null;
        IsConnected?: boolean | null;
        HousingStockId?: number | null;
        "Address.City"?: string | null;
        "Address.Street"?: string | null;
        "Address.HousingStockNumber"?: string | null;
        "Address.Corpus"?: string | null;
        "Address.HouseCategory"?: EHouseCategory;
        Resource?: EResourceType;
        NodeStatus?: ENodeCommercialAccountStatus;
        "DevicesFilter.DiameterRange.From"?: number | null;
        "DevicesFilter.DiameterRange.To"?: number | null;
        "DevicesFilter.ExpiresCheckingDateAt"?: EExpiresCheckingDateAt;
        "DevicesFilter.Model"?: string | null;
        "DevicesFilter.CommercialDateRange.From"?: string | null;
        "DevicesFilter.CommercialDateRange.To"?: string | null;
        "DevicesFilter.Question"?: string | null;
        PageNumber?: number;
        PageSize?: number;
        OrderBy?: EOrderByRule;
      },
      params: RequestParams = {},
    ) =>
      this.request<NodeResponsePagedListSuccessApiResponse, ErrorApiResponse>({
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
     * @name NodesAddAdmissionActCreate
     * @request POST:/api/Nodes/{nodeId}/AddAdmissionAct
     * @secure
     */
    nodesAddAdmissionActCreate: (nodeId: number, data: NodeAdmissionActRequest, params: RequestParams = {}) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/Nodes/${nodeId}/AddAdmissionAct`,
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
     * @name NodesPipesForAddingDeviceDetail
     * @request GET:/api/Nodes/{nodeId}/PipesForAddingDevice
     * @secure
     */
    nodesPipesForAddingDeviceDetail: (
      nodeId: number,
      query: {
        entryNumber: number;
        magistralType: EMagistralType;
        housingMeteringDeviceType: EHousingMeteringDeviceType;
      },
      params: RequestParams = {},
    ) =>
      this.request<CommunicationPipeForAddingDeviceListResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/Nodes/${nodeId}/PipesForAddingDevice`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
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
    nodeServiceZonesCreate: (data: NodeServiceZoneRequest, params: RequestParams = {}) =>
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
    nodeServiceZonesUpdate: (nodeServiceZoneId: number, data: NodeServiceZoneRequest, params: RequestParams = {}) =>
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
    nodeWorkingRangeAddOrUpdateCreate: (data: AddOrUpdateNodeWorkingRangeRequest, params: RequestParams = {}) =>
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
    nodeWorkingRangeGetList: (data: GetNodeWorkingRangeRequest, params: RequestParams = {}) =>
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
    nodeWorkingRangeGetAllList: (data: GetAllNodeWorkingRangeRequest, params: RequestParams = {}) =>
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
        NodeStatus?: ENodeCommercialAccountStatus;
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
        Resource?: EResourceType;
        DisconnectingType?: EResourceDisconnectingType;
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
    resourceDisconnectingCreate: (data: ResourceDisconnectingCreateRequest, params: RequestParams = {}) =>
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
        DisconnectingType?: EResourceDisconnectingType;
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
    taskApplicationsLinkCreate: (taskId: number, data: CreateTaskApplicationRequest, params: RequestParams = {}) =>
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
      this.request<TaskApplicationResponseSuccessApiResponse, ErrorApiResponse>({
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
    taskApplicationsCreate: (data: CreateTaskApplicationRequest, params: RequestParams = {}) =>
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
    taskApplicationSourcesCreate: (data: TaskApplicationSourceRequest, params: RequestParams = {}) =>
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
    taskApplicationSourcesUpdate: (sourceId: string, data: TaskApplicationSourceRequest, params: RequestParams = {}) =>
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
        TargetType?: ETaskTargetType;
        TaskId?: number | null;
        TaskType?: EManagingFirmTaskFilterType;
        GroupType?: TaskGroupingFilter;
        DeviceId?: number | null;
        HousingStockId?: number | null;
        ApartmentId?: number | null;
        HousingStockAddress?: string | null;
        HasChanged?: boolean | null;
        NodeId?: number | null;
        ClosingStatuses?: ETaskClosingStatus[] | null;
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
    tasksCommentsCreate: (taskId: number, data: TaskCommentRequest, params: RequestParams = {}) =>
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
    tasksCommentsUpdate: (taskId: number, commentId: number, data: TaskCommentRequest, params: RequestParams = {}) =>
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
