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

export interface AddApartmentActRequest {
  /** @format date-time */
  actDateTime?: string | null;
  actType: EActType;
  registryNumber?: string | null;
  actResourceType: EActResourceType;
  /** @format date-time */
  actJobDate: string;
  /** @format int32 */
  apartmentId: number;
  /** @format int32 */
  documentId?: number | null;
  comment?: string | null;
}

export interface AddHeatingStationRequest {
  /** @minLength 1 */
  name: string;
  isThermalChamber?: boolean;
  address: CreateAddressRequest;
}

export interface AddNodeDocumentsRequest {
  documentsIds?: number[] | null;
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

export interface AddOrUpdateNodeWorkingRangeRequest {
  season: ENodeWorkingRangeSeason;
  nodeResourceType: EResourceType;
  typeWorkingRange: ENodeWorkingRangeType;
  /** @format int32 */
  buildingId?: number | null;
  /** @format uuid */
  housingManagementId?: string | null;
  /** @format int32 */
  nodeId?: number | null;
  /** @format float */
  min?: number | null;
  /** @format float */
  max?: number | null;
}

export interface AddOrganizationUserWorkingStatusRequest {
  /** @format int32 */
  userId?: number;
  type?: EOrganizationUserWorkingStatusType;
  /** @format date-time */
  startDate?: string | null;
  /** @format date-time */
  endDate?: string | null;
  reassignments?: OrganizationUserTaskReassignment[] | null;
}

export interface AddressResponse {
  city: string | null;
  street: string | null;
  /** @deprecated */
  housingStockNumber: string | null;
  buildingNumber: string | null;
}

export interface AddressShortResponse {
  /** @format int32 */
  buildingId: number;
  number: string | null;
  corpus: string | null;
}

export interface AllNodeWorkingRangeResponse {
  season: ENodeWorkingRangeSeason;
  nodeResourceType: EResourceType;
  nodeWorkingRanges: ValueNodeWorkingRangeListResponse[] | null;
}

export interface ApartmentActResponse {
  /** @format int32 */
  id: number;
  /** @format date-time */
  actDateTime: string;
  actType: EActType;
  registryNumber: string | null;
  actResourceType: EActResourceType;
  /** @format date-time */
  actJobDate: string;
  /** @format date-time */
  deleteDateTime: string | null;
  apartment: FullAddressResponse | null;
  /** @format int32 */
  taskId: number | null;
  document: DocumentLiteResponse | null;
  comment: string | null;
}

export interface ApartmentActResponsePagedList {
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
  items: ApartmentActResponse[] | null;
}

export interface ApartmentActsConstructedReportResponse {
  /** @format int32 */
  count: number;
  rows: ApartmentActsConstructedReportRowResponse[] | null;
}

export interface ApartmentActsConstructedReportRowResponse {
  houseManagementName: string | null;
  city: string | null;
  street: string | null;
  houseNumber: string | null;
  corpus: string | null;
  apartmentNumber: string | null;
  /** @format date-time */
  actDate: string;
  registryNumber: string | null;
  actType: EActType;
  resourceType: EActResourceType;
  /** @format date-time */
  actJobDate: string;
}

export interface ApartmentAddress {
  city?: string | null;
  street?: string | null;
  houseNumber?: string | null;
  houseCorpus?: string | null;
  apartmentNumber?: string | null;
}

export interface ApartmentByAddressFilterResponse {
  /** @format int32 */
  apartmentId: number;
  apartmentNumber: string | null;
  status: EApartmentStatus;
  deviceIds: number[] | null;
  homeowners: HomeownerAccount[] | null;
}

export interface ApartmentByAddressFilterResponsePagedList {
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
  items: ApartmentByAddressFilterResponse[] | null;
}

export interface ApartmentCheckResponse {
  /** @format int32 */
  id: number;
  /** @format date-time */
  checkingDate: string;
  checkType: ECheckType;
  /** @format int32 */
  taskId: number | null;
  /** @format int32 */
  apartmentId: number;
  registryNumber: string | null;
  checkingAct: DocumentResponse | null;
  actResourceType: EActResourceType;
  comment: string | null;
}

export interface ApartmentCheckResponsePagedList {
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
  items: ApartmentCheckResponse[] | null;
}

export interface ApartmentCreateRequest {
  /** @format int32 */
  housingStockId: number;
  /** @minLength 1 */
  number: string;
  /** @format int32 */
  floor?: number | null;
  /** @format float */
  square?: number | null;
  /** @format int32 */
  numberOfLiving?: number | null;
  /** @format int32 */
  normativeNumberOfLiving?: number | null;
  comment?: string | null;
  /** @format int32 */
  coldWaterRiserCount?: number | null;
  /** @format int32 */
  hotWaterRiserCount?: number | null;
  homeownerAccount: HomeownerAccountCreateUnattachedRequest;
}

export interface ApartmentListResponse {
  /** @format int32 */
  id: number;
  housingStock: BuildingShortResponse | null;
  apartmentNumber: string | null;
  homeownerName: string | null;
  /** @format int32 */
  homeownersCount: number | null;
  personalAccountNumber: string | null;
  status: EApartmentStatus;
  tasksState: ETasksState;
  /** @format int32 */
  numberOfTasks: number;
  /** @format float */
  square: number | null;
  comment: string | null;
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

export interface ApartmentListStatusResponse {
  statuses: ApartmentStatusResponse[] | null;
}

export interface ApartmentResponse {
  /** @format int32 */
  id: number;
  /** @format double */
  coefficient: number | null;
  housingStock: HousingStockListResponse | null;
  comment: string | null;
  apartmentNumber: string | null;
  status: EApartmentStatus;
  /** @format float */
  square: number | null;
  /** @format uuid */
  mainHomeownerAccountId: string | null;
  homeownerAccounts: HomeownerAccountListResponse[] | null;
  /** @format int32 */
  numberOfLiving: number | null;
  /** @format int32 */
  normativeNumberOfLiving: number | null;
  /** @format int32 */
  floor: number | null;
  /** @format int32 */
  coldWaterRiserCount: number | null;
  /** @format int32 */
  hotWaterRiserCount: number | null;
  /** @format date-time */
  stoppedFrom: string | null;
  /** @format date-time */
  stoppedTo: string | null;
  /** @format int32 */
  deniedPermissionsCount: number | null;
  activeTaskIds: number[] | null;
}

export interface ApartmentStatusResponse {
  name: string | null;
  description: string | null;
}

export interface ApartmentStatusSetRequest {
  status: EApartmentStatus;
  /** @format date-time */
  fromDate?: string | null;
  /** @format date-time */
  toDate?: string | null;
  documentIds?: number[] | null;
}

export interface ApartmentUpdateRequest {
  /** @format double */
  square?: number | null;
  /** @format int32 */
  numberOfLiving?: number | null;
  /** @format int32 */
  normativeNumberOfLiving?: number | null;
  /** @format uuid */
  mainHomeownerAccountId?: string | null;
  comment?: string | null;
  /** @format int32 */
  coldWaterRiserCount?: number | null;
  /** @format int32 */
  hotWaterRiserCount?: number | null;
}

export interface ApplicationUserResponse {
  /** @format int32 */
  id: number;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  middleName: string | null;
}

export interface AppointmentAddress {
  /** @format int32 */
  houseId?: number;
  /** @format int32 */
  apartmentId?: number;
  /** @format double */
  latitude?: number | null;
  /** @format double */
  longitude?: number | null;
  city?: string | null;
  street?: string | null;
  houseNumber?: string | null;
  corpus?: string | null;
  apartmentNumber?: string | null;
}

export interface AppointmentCounterResponse {
  /** @format date-time */
  date: string;
  /** @format int32 */
  distributed: number;
  /** @format int32 */
  notDistributed: number;
}

export interface AppointmentCreateRequest {
  /** @format int32 */
  apartmentId: number;
  /** @minLength 1 */
  homeownerFullName: string;
  /** @minLength 1 */
  homeownerPhone: string;
  /** @format date-time */
  date: string;
  /**
   * @format int32
   * @min 1
   * @max 99
   */
  sealCountPlan: number;
  comment?: string | null;
}

export interface AppointmentResponse {
  /** @format uuid */
  id: string;
  address: AppointmentAddress | null;
  /** @format uuid */
  controllerId: string | null;
  /** @format uuid */
  assignmentId: string | null;
  homeownerFullName: string | null;
  homeownerPhone: string | null;
  /** @format date-time */
  date: string;
  /** @format int32 */
  sealCountPlan: number;
  comment: string | null;
  /** @format date-time */
  createDateTimeUtc: string;
  /** @format date-time */
  modifiedDateTimeUtc: string | null;
}

export interface AppointmentUpdateRequest {
  homeownerFullName?: string | null;
  homeownerPhone?: string | null;
  /** @format date-time */
  date?: string | null;
  /**
   * @format int32
   * @min 1
   * @max 99
   */
  sealCountPlan?: number | null;
  comment?: string | null;
}

export interface AppointmentsSetRequest {
  appointmentIds: string[];
  /** @format uuid */
  controllerId: string;
}

export interface AppointmentsSetResponse {
  /** @format uuid */
  assignmentId: string;
}

export interface ArchivesDataGroup {
  header?: string | null;
  measure?: string | null;
  groupType?: ArchivesDataGroupType;
  data?: ArchivesDataGroupValue[] | null;
}

export enum ArchivesDataGroupType {
  Undefined = 'Undefined',
  Volume = 'Volume',
  TemperatureOut = 'TemperatureOut',
  Energy = 'Energy',
  TemperatureIn = 'TemperatureIn',
}

export interface ArchivesDataGroupValue {
  /** @format date-time */
  time?: string;
  /** @format date-time */
  timeUtc?: string;
  /** @format double */
  value?: number;
  hasFault?: boolean;
}

export interface ArchivesDataModel {
  reportType?: string | null;
  resource?: string | null;
  /** @format int32 */
  systemPipeCount?: number;
  /** @format double */
  deltaMassAccuracy?: number | null;
  /** @format double */
  averageDeltaMass?: number | null;
  data?: ArchivesDataGroup[] | null;
}

export interface AssignmentResponse {
  /** @format uuid */
  id: string;
  /** @format date-time */
  date: string;
  /** @format date-time */
  createDateTimeUtc: string;
  /** @format uuid */
  controllerId: string;
  /** @format int32 */
  appointmentsCount: number;
  creatingUser: CreatingUser | null;
}

export interface BaseIndividualDeviceReadingsCreateRequest {
  /** @format date-time */
  readingDate?: string | null;
  /** @format double */
  value1: number;
  /** @format double */
  value2?: number | null;
  /** @format double */
  value3?: number | null;
  /** @format double */
  value4?: number | null;
}

export interface Building {
  /** @format int32 */
  id?: number;
  houseCategory?: EHouseCategory;
  address?: BuildingAddress | null;
}

export interface BuildingAddress {
  city?: string | null;
  street?: string | null;
  houseNumber?: string | null;
  houseCorpus?: string | null;
}

export interface BuildingAddressCreateRequest {
  district?: string | null;
  /** @deprecated */
  city?: string | null;
  /** @minLength 1 */
  street: string;
  number?: string | null;
  corpus?: string | null;
}

export interface BuildingAddressItemResponse {
  /** @format int32 */
  id: number;
  /** @format int32 */
  housingStockId: number;
  municipalDistrict: string | null;
  region: string | null;
  city: string | null;
  district: string | null;
  street: string | null;
  number: string | null;
  corpus: string | null;
}

export interface BuildingAddressResponse {
  mainAddress: BuildingAddressItemResponse | null;
  additionalAddresses: BuildingAddressItemResponse[] | null;
}

export interface BuildingAddressUpdateRequest {
  district?: string | null;
  number?: string | null;
  corpus?: string | null;
}

export interface BuildingByFilterResponse {
  previous: Building | null;
  current: Building | null;
  next: Building | null;
}

export interface BuildingFiltersResponse {
  houseManagements: GuidStringDictionaryItem[] | null;
  houseCategories: EHouseCategoryStringDictionaryItem[] | null;
  totalAreaIntervals: MeasurableIntervalResponse[] | null;
  livingHouseTypes: ELivingHouseTypeStringDictionaryItem[] | null;
  nonResidentialHouseTypes:
    | ENonResidentialHouseTypeStringDictionaryItem[]
    | null;
}

export interface BuildingListResponse {
  /** @format int32 */
  id: number;
  /** @format int32 */
  managingFirmId: number;
  /** @format int32 */
  numberOfTasks: number | null;
  /** @format int32 */
  numberOfApartments: number;
  houseCategory: EHouseCategory;
  managementFirm: ManagementFirmLiteResponse | null;
  address: BuildingAddressResponse | null;
  coordinates: PointResponse | null;
}

export interface BuildingListResponsePagedList {
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
  items: BuildingListResponse[] | null;
}

export interface BuildingShortResponse {
  /** @format int32 */
  id: number;
  /** @format int32 */
  managingFirmId: number;
  houseCategory: EHouseCategory;
  address: BuildingAddressResponse | null;
}

export interface BuildingWithCoordinatesResponse {
  /** @format int32 */
  id: number;
  /** @format int32 */
  managingFirmId: number;
  houseCategory: EHouseCategory;
  address: BuildingAddressResponse | null;
  coordinates: PointResponse | null;
}

export interface BuildingWithCoordinatesResponsePagedList {
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
  items: BuildingWithCoordinatesResponse[] | null;
}

export interface BuildingWithTasksResponse {
  building: BuildingWithCoordinatesResponse | null;
  tasks: TaskShortResponse[] | null;
}

export interface CalculatorCommentBaseRequest {
  text?: string | null;
}

export interface CalculatorCommentResponse {
  /** @format int32 */
  id: number;
  text: string | null;
  /** @format date-time */
  lastModifiedDateTime: string;
  /** @format date-time */
  creationDateTime: string;
  lastModifiedUser: LastModifiedUserResponse | null;
}

export interface CalculatorConnectionInfoResponse {
  connectionStatus: EConnectionStatusType | null;
  /** @format date-time */
  lastDailyArchiveTime: string | null;
  /** @format date-time */
  lastHourlyArchiveTime: string | null;
}

export interface CalculatorConnectionStatisticsResponse {
  address: BuildingShortResponse | null;
  /** @format int32 */
  id: number;
  model: string | null;
  serialNumber: string | null;
  isConnected: boolean | null;
  connection: MeteringDeviceConnection | null;
  connectionInfo: CalculatorConnectionInfoResponse | null;
}

export interface CalculatorConnectionStatisticsResponsePagedList {
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
  items: CalculatorConnectionStatisticsResponse[] | null;
}

export interface CalculatorFilterResponse {
  nodeStatuses:
    | ENodeCommercialAccountStatusNullableStringDictionaryItem[]
    | null;
  houseCategories: EHouseCategoryStringDictionaryItem[] | null;
  resourceTypes: EResourceTypeNullableStringDictionaryItem[] | null;
  cities: string[] | null;
  streets: string[] | null;
}

export interface CalculatorGroupedByConnectionResponse {
  connectionGroupType: ECalculatorConnectionGroupType;
  calculatorConnectionStatisticsList: CalculatorConnectionStatisticsResponsePagedList | null;
}

export interface CalculatorInfoListResponse {
  /** @format int32 */
  id: number;
  model: string | null;
}

export interface CalculatorInfoListWrappedResponse {
  items: CalculatorInfoListResponse[] | null;
}

export interface CalculatorIntoHousingStockResponse {
  /** @format int32 */
  id: number;
  serialNumber: string | null;
  model: string | null;
  /** @format int32 */
  calculatorInfoId: number | null;
}

export interface CalculatorIntoNodeResponse {
  /** @format int32 */
  id: number;
  model: string | null;
  serialNumber: string | null;
  sealNumber: string | null;
  /** @format date-time */
  sealInstallationDate: string | null;
  /** @format int32 */
  managementFirmId: number | null;
  /** @format date-time */
  lastCheckingDate: string | null;
  /** @format date-time */
  futureCheckingDate: string | null;
  /** @format date-time */
  openingDate: string | null;
  /** @format date-time */
  closingDate: string | null;
  closingReason: EClosingReason;
  hasActiveTasks: boolean | null;
  /** @format int32 */
  bitDepth: number | null;
  /** @format double */
  scaleFactor: number | null;
  connection: MeteringDeviceConnection | null;
  isConnected: boolean | null;
  address: BuildingShortResponse | null;
  /** @format int32 */
  infoId: number | null;
  connectionInfo: CalculatorConnectionInfoResponse | null;
}

export interface CalculatorListResponse {
  /** @format int32 */
  id: number;
  model: string | null;
  serialNumber: string | null;
  sealNumber: string | null;
  /** @format date-time */
  sealInstallationDate: string | null;
  managementFirm: OrganizationResponse | null;
  /** @format date-time */
  lastCheckingDate: string | null;
  /** @format date-time */
  futureCheckingDate: string | null;
  /** @format date-time */
  closingDate: string | null;
  closingReason: EClosingReason;
  hasActiveTasks: boolean;
  /** @format int32 */
  bitDepth: number | null;
  /** @format double */
  scaleFactor: number | null;
  connection: MeteringDeviceConnection | null;
  isConnected: boolean | null;
  address: BuildingShortResponse | null;
  nodes: PipeNodeIntoCalculatorResponse[] | null;
  documents: DocumentLiteResponse[] | null;
  /** @format int32 */
  numberOfTasks: number | null;
  comment: CalculatorCommentResponse | null;
  connectionInfo: CalculatorConnectionInfoResponse | null;
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

export interface CalculatorResponse {
  /** @format int32 */
  id: number;
  model: string | null;
  serialNumber: string | null;
  sealNumber: string | null;
  /** @format date-time */
  sealInstallationDate: string | null;
  /** @format int32 */
  managementFirmId: number | null;
  /** @format date-time */
  lastCheckingDate: string | null;
  /** @format date-time */
  futureCheckingDate: string | null;
  /** @format date-time */
  openingDate: string | null;
  /** @format date-time */
  closingDate: string | null;
  closingReason: EClosingReason;
  hasActiveTasks: boolean | null;
  /** @format int32 */
  bitDepth: number | null;
  /** @format double */
  scaleFactor: number | null;
  connection: MeteringDeviceConnection | null;
  isConnected: boolean | null;
  address: BuildingShortResponse | null;
  /** @format int32 */
  infoId: number | null;
  nodes: PipeNodeIntoCalculatorResponse[] | null;
  documents: DocumentResponse[] | null;
  /** @format int32 */
  numberOfTasks: number | null;
  comment: CalculatorCommentResponse | null;
  connectionInfo: CalculatorConnectionInfoResponse | null;
}

export interface CallCenterWorkingConstructedReportResponse {
  managingFirm: string | null;
  houseManagement: string | null;
  /** @format int32 */
  coldWaterSupplyPlan: number;
  /** @format int32 */
  coldWaterSupplyValue: number;
  /** @format int32 */
  hotWaterSupplyPlan: number;
  /** @format int32 */
  hotWaterSupplyValue: number;
  /** @format int32 */
  electricityPlan: number;
  /** @format int32 */
  electricityValue: number;
  /** @format int32 */
  heatPlan: number;
  /** @format int32 */
  heatValue: number;
}

export interface ChannelConfirmRequest {
  token?: string | null;
}

export interface ChannelResponse {
  /** @format uuid */
  id: string;
  type: ChannelType;
  /** @format date-time */
  confirmedAt: string;
}

export enum ChannelType {
  Telegram = 'Telegram',
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

export interface CheckIndividualDeviceRequest {
  /** @format date-time */
  currentCheckingDate: string;
  /** @format date-time */
  futureCheckingDate: string;
  readingsBeforeCheck?: SwitchIndividualDeviceReadingsCreateRequest[] | null;
  readingsAfterCheck?: SwitchIndividualDeviceReadingsCreateRequest[] | null;
}

export interface CloseDeviceRequest {
  /** @format int32 */
  deviceId: number;
  documentsIds?: number[] | null;
  /**
   * @deprecated
   * @format date-time
   */
  closingDate?: string | null;
  /** @format int32 */
  closingMonth?: number | null;
  /** @format int32 */
  closingYear?: number | null;
  closingReason?: EClosingReason | null;
}

export interface CloseIndividualDeviceRequest {
  /**
   * @deprecated
   * @format date-time
   */
  closingDate?: string | null;
  /** @format int32 */
  closingMonth?: number | null;
  /** @format int32 */
  closingYear?: number | null;
  closingReason?: EClosingReason | null;
  documentsIds?: number[] | null;
}

export interface CloseTasksRequest {
  taskIds?: number[] | null;
}

export interface ClosedDeviceOnOneOfRisersConstructedReportResponse {
  status: EConstructedReportDeviceStatus;
  /** @format date-time */
  checkingDate: string | null;
  /** @format date-time */
  closingDate: string | null;
  closingReason: EClosingReason | null;
}

export interface ClosedDevicesConstructedReportResponse {
  status: EConstructedReportDeviceStatus;
  /** @format date-time */
  checkingDate: string | null;
  /** @format date-time */
  closingDate: string | null;
  closingReason: EClosingReason | null;
  homeownerPhoneNumbers: string[] | null;
  /** @deprecated */
  phoneNumber: string | null;
}

export interface CommunicationPipeForAddingDeviceListResponse {
  /** @format int32 */
  nodeId: number;
  /** @format int32 */
  entryNumber: number | null;
  magistralType: EMagistralType;
  pipes: CommunicationPipeForAddingDeviceResponse[] | null;
}

export interface CommunicationPipeForAddingDeviceResponse {
  /** @format int32 */
  id: number;
  /** @format int32 */
  number: number;
}

export interface CommunicationPipeLiteResponse {
  /** @format int32 */
  id: number;
  /** @format int32 */
  number: number;
  magistral: string | null;
  /** @format int32 */
  diameter: number | null;
}

export interface CommunicationPipeResponse {
  /** @format int32 */
  id: number;
  /** @format int32 */
  number: number;
  /** @format int32 */
  entryNumber: number | null;
  magistral: string | null;
  /** @format int32 */
  diameter: number | null;
  devices: PipeHousingMeteringDeviceListResponse[] | null;
}

export interface ComposeGroupReportRequest {
  reportType?: EReportType;
  /** @format date-time */
  from?: string | null;
  /** @format date-time */
  to?: string | null;
  reportFormat?: EReportFormat;
  /** @minLength 1 */
  fileName: string;
  /** @format uuid */
  groupReportId?: string | null;
  /** @format int32 */
  managementFirmId?: number | null;
  /** @format uuid */
  houseManagementId?: string | null;
  buildingIds?: number[] | null;
  nodeResourceTypes?: EResourceType[] | null;
  nodeStatus?: ENodeCommercialAccountStatus | null;
}

export interface ComposeGroupReportServiceModel {
  fileName?: string | null;
  /** @format uuid */
  groupReportId?: string | null;
  /** @format int32 */
  managementFirmId?: number | null;
  /** @format uuid */
  houseManagementId?: string | null;
  buildingIds?: number[] | null;
  nodeResourceTypes?: ResourceType[] | null;
  nodeStatus?: NodeCommercialAccountStatus | null;
  reportType?: ReportType;
  /** @format date-time */
  from?: string | null;
  /** @format date-time */
  to?: string | null;
  reportFormat?: ReportFormat;
}

export interface ConfirmRequest {
  /** @minLength 1 */
  token: string;
  /** @minLength 6 */
  password: string;
}

export interface ConsumptionRateResponse {
  /** @format double */
  minimumConsumptionRatePerPerson: number | null;
  /** @format double */
  minimumConsumptionRate: number | null;
  /** @format double */
  minimumAverageConsumptionOverPastThreeMonth: number | null;
  /** @format double */
  maximumConsumptionRate: number | null;
}

export interface ContractorCreateRequest {
  /** @minLength 2 */
  name?: string | null;
  cellphone?: string | null;
  /** @format email */
  email?: string | null;
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

export interface ContractorResponse {
  /** @format int32 */
  id: number;
  name: string | null;
  cellphone: string | null;
  email: string | null;
}

export interface ContractorUpdateRequest {
  /** @minLength 2 */
  name?: string | null;
  cellphone?: string | null;
  /** @format email */
  email?: string | null;
}

export interface ControllerCreateRequest {
  /** @minLength 1 */
  firstName: string;
  /** @minLength 1 */
  lastName: string;
  middleName?: string | null;
}

export interface ControllerResponse {
  /** @format uuid */
  id: string;
  firstName: string | null;
  lastName: string | null;
  middleName: string | null;
}

export interface ControllerUpdateRequest {
  firstName?: string | null;
  lastName?: string | null;
  middleName?: string | null;
}

export interface CreateAddressRequest {
  /** @minLength 1 */
  city: string;
  /** @minLength 1 */
  street: string;
  /** @minLength 1 */
  number: string;
}

export interface CreateApartmentCheckRequest {
  /** @format date-time */
  checkingDate?: string;
  checkType?: ECheckType;
  /** @format int32 */
  documentId: number;
  registryNumber?: string | null;
  actResourceType?: EActResourceType;
  comment?: string | null;
}

export interface CreateCalculatorRequest {
  /** @minLength 1 */
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
  connection?: MeteringDeviceConnection | null;
  isConnected?: boolean;
  /** @format int32 */
  housingStockId: number;
  /** @format int32 */
  infoId: number;
  model?: string | null;
}

export interface CreateCommunicationPipeRequest {
  /** @format int32 */
  number?: number;
  magistral?: EMagistralType;
  /** @format int32 */
  diameter?: number;
  devices?: CreatePipeHousingMeteringDeviceInNodeRequest[] | null;
}

export interface CreateElectricHousingMeteringDeviceRequest {
  /** @minLength 1 */
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
  housingMeteringDeviceType: EHousingMeteringDeviceType;
  /** @minLength 1 */
  model: string;
  /** @format double */
  minReadingsValue?: number | null;
  /** @format double */
  maxReadingsValue?: number | null;
  /** @format date-time */
  installationDate?: string | null;
  /** @format int32 */
  manufactureYear?: number;
  /** @format int32 */
  stateVerificationYear?: number | null;
  stateVerificationQuarter?: EYearQuarter | null;
  /** @format int32 */
  stateVerificationIntervalYears?: number;
  /** @format int32 */
  nextStateVerificationYear?: number | null;
  phaseNumber: EPhaseNumberType;
  /** @format int32 */
  nodeId?: number | null;
}

export interface CreateElectricNodeRequest {
  /** @format int32 */
  buildingId?: number;
  /** @minLength 1 */
  title: string;
  /** @format int32 */
  nodeServiceZoneId?: number | null;
  registrationType?: ENodeRegistrationType;
  commercialStatusRequest?: NodeSetCommercialStatusRequest | null;
  technicalTypeRequest?: NodeSetTechnicalTypeRequest | null;
  locationName?: string | null;
  counter?: CreateElectricHousingMeteringDeviceRequest | null;
}

export interface CreateGroupReportConfigurationRequest {
  reportConfigurationDetails: GroupReportConfigurationDetailsRequest;
  report: ComposeGroupReportRequest;
}

export interface CreateGroupReportRequest {
  title?: string | null;
  housingStockIds?: number[] | null;
}

export interface CreateHousingMeteringDeviceReadingsRequest {
  /** @format date-time */
  readingDate: string;
  /** @format double */
  value: number;
  /** @format double */
  nonResidentialRoomConsumption?: number | null;
  /** @format int32 */
  deviceId?: number;
}

export interface CreateIndividualDeviceRequest {
  /** @minLength 1 */
  model: string;
  /** @minLength 1 */
  serialNumber: string;
  /**
   * @format int32
   * @min 4
   * @max 10
   */
  bitDepth: number;
  rateType: EIndividualDeviceRateType;
  /** @format date-time */
  lastCheckingDate: string;
  /** @format date-time */
  futureCheckingDate: string;
  sealNumber?: string | null;
  /** @format date-time */
  sealInstallationDate?: string | null;
  /** @format date-time */
  openingDate?: string | null;
  isConnected?: boolean;
  documentsIds?: number[] | null;
  isPolling?: boolean;
  /** @format int32 */
  contractorId?: number | null;
  connection?: MeteringDeviceConnection | null;
  /** @format int32 */
  apartmentId: number;
  resource: EResourceType;
  /** @format int32 */
  mountPlaceId?: number | null;
  startupReadings: BaseIndividualDeviceReadingsCreateRequest;
  defaultReadings?: BaseIndividualDeviceReadingsCreateRequest | null;
}

export interface CreateNodeCheckRequest {
  /** @format date-time */
  checkingDate: string;
  checkType: ENodeCheckType;
  /** @format int32 */
  documentId?: number | null;
  /** @minLength 1 */
  registryNumber: string;
}

export interface CreatePipeHousingMeteringDeviceInNodeRequest {
  /** @minLength 1 */
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
  housingMeteringDeviceType: EHousingMeteringDeviceType;
  /** @minLength 1 */
  model: string;
  /** @format double */
  minReadingsValue?: number | null;
  /** @format double */
  maxReadingsValue?: number | null;
}

export interface CreatePipeHousingMeteringDeviceRequest {
  /** @minLength 1 */
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
  housingMeteringDeviceType: EHousingMeteringDeviceType;
  /** @minLength 1 */
  model: string;
  /** @format double */
  minReadingsValue?: number | null;
  /** @format double */
  maxReadingsValue?: number | null;
  /** @format int32 */
  nodeId?: number;
  /** @format int32 */
  communicationPipeId?: number;
}

export interface CreatePipeNodeRequest {
  /** @format int32 */
  buildingId?: number;
  /** @minLength 1 */
  title: string;
  /** @format int32 */
  nodeServiceZoneId?: number | null;
  registrationType?: ENodeRegistrationType;
  commercialStatusRequest?: NodeSetCommercialStatusRequest | null;
  technicalTypeRequest?: NodeSetTechnicalTypeRequest | null;
  /** @format int32 */
  entryNumber?: number | null;
  /** @format int32 */
  calculatorId?: number | null;
  configuration?: EPipeNodeConfig;
  communicationPipes?: CreateCommunicationPipeRequest[] | null;
}

export interface CreatingUser {
  /** @format int32 */
  id?: number;
  firstName?: string | null;
  lastName?: string | null;
  middleName?: string | null;
}

export interface DashboardBaseTaskItemModel {
  /** @format int32 */
  id?: number;
  label?: string | null;
  /** @format int32 */
  totalTasksCount?: number;
  /** @format int32 */
  expiredTasksCount?: number;
}

export interface DashboardFilterParameters {
  /** @format date-time */
  from?: string | null;
  /** @format date-time */
  to?: string | null;
  city?: string | null;
  /** @format int32 */
  managementFirmId?: number | null;
  buildingIds?: number[] | null;
  resourceType?: ResourceType | null;
  malfunctionType?: ManagingFirmTaskType | null;
  deviationType?: ETemperatureNormativeDeviationType | null;
  isTest?: boolean;
}

export interface DashboardMalfunctionChartItemModel {
  /** @format int32 */
  totalTasksCount?: number;
  /** @format int32 */
  expiredTasksCount?: number;
  malfunctionType?: ManagingFirmTaskType;
}

export interface DashboardMalfunctionDetailChartItemModel {
  /** @format date-time */
  date?: string;
  /** @format int32 */
  value?: number;
  details?: DashboardMalfunctionChartItemModel[] | null;
}

export interface DashboardNavigationBreadCrumbs {
  city?: string | null;
  managingFirmName?: string | null;
  /** @format int32 */
  managingFirmId?: number | null;
}

export interface DashboardResourceChartItemModel {
  /** @format int32 */
  totalTasksCount?: number;
  /** @format int32 */
  expiredTasksCount?: number;
  resourceType?: ResourceType;
}

export interface DashboardResourceDetailChartItemModel {
  /** @format date-time */
  date?: string;
  /** @format int32 */
  value?: number;
  details?: DashboardResourceChartItemModel[] | null;
}

export interface DashboardServiceQualityDetailsModel {
  /** @format int32 */
  totalTasksCount?: number;
  /** @format int32 */
  expiredTasksCount?: number;
  deviationType?: ETemperatureNormativeDeviationType;
  items?: DashboardBaseTaskItemModel[] | null;
}

export interface DashboardSummaryResponse {
  /** @format int32 */
  dashboardTasksCount: number;
  /** @format int32 */
  dashboardPipeRupturesCount: number;
  /** @format double */
  dashboardPipeRupturesPercentage: number;
  /** @format int32 */
  dashboardResourceDisconnectsCount: number;
  /** @format double */
  dashboardResourceDisconnectsPercentage: number;
  /** @format int32 */
  dashboardMalfunctionsCount: number;
  /** @format double */
  dashboardMalfunctionsPercentage: number;
  /** @format double */
  dashboardAverageCompletionTimeValue: number;
  dashboardAverageCompletionTime: string | null;
  /** @format double */
  dashboardAverageCompletionTimePercentage: number;
  /** @format int32 */
  dashboardServiceQualityCount: number;
  /** @format double */
  dashboardServiceQualityPercentage: number;
  filter: DashboardFilterParameters | null;
  breadCrumbs: DashboardNavigationBreadCrumbs | null;
}

export interface DashboardTaskAverageTimeDetailsModel {
  /** @format double */
  averageCompletionTime?: number;
  malfunctionType?: ManagingFirmTaskType;
  malfunctionTypeDescription?: string | null;
  items?: DashboardBaseTaskItemModel[] | null;
}

export interface DashboardTaskAverageTimeResponse {
  title: string | null;
  averageCompletionTime: string | null;
  details: DashboardTaskAverageTimeDetailsModel[] | null;
}

export interface DashboardTaskMalfunctionDetailsModel {
  /** @format int32 */
  totalTasksCount?: number;
  /** @format int32 */
  expiredTasksCount?: number;
  malfunctionType?: ManagingFirmTaskType;
  malfunctionTypeDescription?: string | null;
  items?: DashboardBaseTaskItemModel[] | null;
}

export interface DashboardTaskMalfunctionModel {
  title?: string | null;
  /** @format int32 */
  totalTasksCount?: number;
  /** @format double */
  totalTasksPercentage?: number | null;
  /** @format int32 */
  expiredTasksCount?: number;
  details?: DashboardTaskMalfunctionDetailsModel[] | null;
  chart?: DashboardMalfunctionDetailChartItemModel[] | null;
}

export interface DashboardTaskMalfunctionResponse {
  title: string | null;
  /** @format int32 */
  totalTasksCount: number;
  /** @format double */
  totalTasksPercentage: number | null;
  /** @format int32 */
  expiredTasksCount: number;
  details: DashboardTaskMalfunctionDetailsModel[] | null;
  chart: DashboardMalfunctionDetailChartItemModel[] | null;
}

export interface DashboardTaskQualityResponse {
  title: string | null;
  /** @format int32 */
  totalTasksCount: number;
  /** @format int32 */
  expiredTasksCount: number;
  /** @format int32 */
  totalBuildingCount: number;
  /** @format int32 */
  buildingsWithTasksCount: number;
  /** @format double */
  averageCompletionTime: number;
  details: DashboardServiceQualityDetailsModel[] | null;
}

export interface DashboardTaskResourceDetailsModel {
  /** @format int32 */
  totalTasksCount?: number;
  /** @format int32 */
  expiredTasksCount?: number;
  resourceType?: ResourceType;
  items?: DashboardBaseTaskItemModel[] | null;
}

export interface DashboardTaskResourceModel {
  title?: string | null;
  /** @format int32 */
  totalTasksCount?: number;
  /** @format double */
  totalTasksPercentage?: number | null;
  /** @format int32 */
  expiredTasksCount?: number;
  details?: DashboardTaskResourceDetailsModel[] | null;
  chart?: DashboardResourceDetailChartItemModel[] | null;
}

export interface DashboardTaskResourceResponse {
  title: string | null;
  /** @format int32 */
  totalTasksCount: number;
  /** @format double */
  totalTasksPercentage: number | null;
  /** @format int32 */
  expiredTasksCount: number;
  details: DashboardTaskResourceDetailsModel[] | null;
  chart: DashboardResourceDetailChartItemModel[] | null;
}

export interface DataAfterSplittingHomeownerAccountResponse {
  splittedApartmentHomeownerAccount: HomeownerAccountResponse | null;
  newApartmentHomeownerAccount: HomeownerAccountResponse | null;
}

export interface DateTimeDoubleDictionaryItem {
  /** @format date-time */
  key?: string;
  /** @format double */
  value?: number;
}

export interface DateTimeTaskStatisticsItemArrayDictionaryItem {
  /** @format date-time */
  key?: string;
  value?: TaskStatisticsItem[] | null;
}

export interface DeviceCheckingDateExpirationConstructedReportResponse {
  /** @format date-time */
  lastCheckingDate: string;
  /** @format date-time */
  futureCheckingDate: string;
  lastReading: IndividualDeviceReadingsSlimResponse | null;
  homeownerPhoneNumbers: string[] | null;
  /** @deprecated */
  homeownerPhoneNumber: string | null;
}

export enum DeviceResource {
  Electricity = 'Electricity',
  Heat = 'Heat',
}

export interface DisableNodeWorkingRangeRequest {
  season: ENodeWorkingRangeSeason;
  nodeResourceType: EResourceType;
  typeWorkingRange: ENodeWorkingRangeType;
  /** @format int32 */
  buildingId?: number | null;
  /** @format uuid */
  housingManagementId?: string | null;
  /** @format int32 */
  nodeId?: number | null;
}

export interface DistrictCreateRequest {
  title?: string | null;
  additionalInfo?: string | null;
  houseIds?: number[] | null;
}

export interface DistrictResponse {
  /** @format uuid */
  id: string;
  title: string | null;
  additionalInfo: string | null;
  houses: House[] | null;
}

export interface DistrictUpdateRequest {
  title?: string | null;
  additionalInfo?: string | null;
}

export interface DocumentLiteResponse {
  /** @format int32 */
  id: number;
  name: string | null;
  /** @format date-time */
  uploadingTime: string;
  author: string | null;
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

export enum EActResourceType {
  All = 'All',
  ColdWaterSupply = 'ColdWaterSupply',
  HotWaterSupply = 'HotWaterSupply',
  Electricity = 'Electricity',
  Heat = 'Heat',
}

export interface EActResourceTypeStringDictionaryItem {
  key?: EActResourceType;
  value?: string | null;
}

export enum EActType {
  PlannedCheck = 'PlannedCheck',
  UnplannedCheck = 'UnplannedCheck',
  ResourceDisconnect = 'ResourceDisconnect',
  ResourceConnect = 'ResourceConnect',
  HomeownerAccountCertificate = 'HomeownerAccountCertificate',
  Admission = 'Admission',
  NonAdmission = 'NonAdmission',
}

export interface EActTypeStringDictionaryItem {
  key?: EActType;
  value?: string | null;
}

export enum EApartmentStatus {
  Ok = 'Ok',
  Debtor = 'Debtor',
  Pause = 'Pause',
}

export enum ECalculatorConnectionGroupType {
  Success = 'Success',
  NotPolling = 'NotPolling',
  Error = 'Error',
  NoArchives = 'NoArchives',
}

export enum ECalculatorOrderRule {
  Street = 'Street',
  FutureCheckingDate = 'FutureCheckingDate',
}

export enum ECheckType {
  Planned = 'Planned',
  Unplanned = 'Unplanned',
  Admission = 'Admission',
}

export interface ECheckTypeStringDictionaryItem {
  key?: ECheckType;
  value?: string | null;
}

export enum EClosingReason {
  None = 'None',
  Manually = 'Manually',
  NoReadings = 'NoReadings',
  DeviceBroken = 'DeviceBroken',
  CheckingDate = 'CheckingDate',
  CertificateIssued = 'CertificateIssued',
  MaintainingStopped = 'MaintainingStopped',
  ByLetter = 'ByLetter',
  NoMagneticSeal = 'NoMagneticSeal',
}

export enum EConnectionStatusType {
  Unknown = 'Unknown',
  Success = 'Success',
  NoConnection = 'NoConnection',
  UnstableConnection = 'UnstableConnection',
  DeviceMalfunction = 'DeviceMalfunction',
}

export enum EConstructedReportDeviceStatus {
  Closed = 'Closed',
  Open = 'Open',
}

export enum EDocumentType {
  Common = 'Common',
  DeviceCommissionCheckAct = 'DeviceCommissionCheckAct',
  DeviceCheckAct = 'DeviceCheckAct',
  DeviceCommercialAccountingAct = 'DeviceCommercialAccountingAct',
  DeviceAcceptanceAct = 'DeviceAcceptanceAct',
  DeviceDeploymentAct = 'DeviceDeploymentAct',
  DeviceClosingAct = 'DeviceClosingAct',
  DevicePassport = 'DevicePassport',
  DeviceTestCertificates = 'DeviceTestCertificates',
  ApartmentCheckingAct = 'ApartmentCheckingAct',
  ApartmentAccessDeniedAct = 'ApartmentAccessDeniedAct',
  ApartmentUnauthorizedInterferenceAct = 'ApartmentUnauthorizedInterferenceAct',
  AdditionalMaterials = 'AdditionalMaterials',
  HeatingSeasonStartingOrder = 'HeatingSeasonStartingOrder',
  HeatingSeasonEndingOrder = 'HeatingSeasonEndingOrder',
  HeatingSeasonChangingStatement = 'HeatingSeasonChangingStatement',
  Photo = 'Photo',
  NodeAdmissionAct = 'NodeAdmissionAct',
  ImportedFile = 'ImportedFile',
  ProfilePhoto = 'ProfilePhoto',
  ApartmentStoppingStatement = 'ApartmentStoppingStatement',
}

export interface EDocumentTypeStringDictionaryItem {
  key?: EDocumentType;
  value?: string | null;
}

export enum EExpiresDateAt {
  CurrentMonth = 'CurrentMonth',
  NextMonth = 'NextMonth',
  NextTwoMonth = 'NextTwoMonth',
  Past = 'Past',
}

export enum EHouseCategory {
  Living = 'Living',
  NonResidential = 'NonResidential',
}

export interface EHouseCategoryStringDictionaryItem {
  key?: EHouseCategory;
  value?: string | null;
}

export enum EHousingMeteringDeviceType {
  FlowMeter = 'FlowMeter',
  TemperatureSensor = 'TemperatureSensor',
  WeatherController = 'WeatherController',
  PressureMeter = 'PressureMeter',
  Counter = 'Counter',
}

export enum EHousingStockOrderRule {
  Street = 'Street',
  TaskCount = 'TaskCount',
}

export enum EIndividualDeviceOrderRule {
  Resource = 'Resource',
  ApartmentNumber = 'ApartmentNumber',
  SerialNumber = 'SerialNumber',
  Address = 'Address',
  BitDepth = 'BitDepth',
  CheckingDate = 'CheckingDate',
}

export enum EIndividualDeviceRateType {
  OneZone = 'OneZone',
  TwoZone = 'TwoZone',
  ThreeZone = 'ThreeZone',
}

export enum EIndividualDeviceReadingsSource {
  Archive = 'Archive',
  Ttm = 'Ttm',
  GosUslugi = 'GosUslugi',
  Bank = 'Bank',
  Duplicated = 'Duplicated',
  Erc = 'Erc',
  TtmFromErc = 'TtmFromErc',
  TelegramBot = 'TelegramBot',
  DeviceTelemetry = 'DeviceTelemetry',
  TtmFromGis = 'TtmFromGis',
}

export enum EIndividualDeviceReportOption {
  InvalidCheckingDates = 'InvalidCheckingDates',
  ClosedDeviceOnOneOfRisers = 'ClosedDeviceOnOneOfRisers',
  DeviceCheckingDateExpiration = 'DeviceCheckingDateExpiration',
  ClosedDevices = 'ClosedDevices',
  InvalidBitDepth = 'InvalidBitDepth',
}

export enum ELivingHouseType {
  ApartmentHouse = 'ApartmentHouse',
  Townhouse = 'Townhouse',
  Private = 'Private',
}

export interface ELivingHouseTypeStringDictionaryItem {
  key?: ELivingHouseType;
  value?: string | null;
}

export enum EMagistralType {
  FeedFlow = 'FeedFlow',
  FeedBackFlow = 'FeedBackFlow',
  Recharge = 'Recharge',
}

export interface EMagistralTypeStringDictionaryItem {
  key?: EMagistralType;
  value?: string | null;
}

export enum EManagementFirmEventType {
  Add = 'Add',
  Update = 'Update',
  Delete = 'Delete',
  IndividualDeviceClose = 'IndividualDeviceClose',
  HousingMeteringDeviceClose = 'HousingMeteringDeviceClose',
  MeteringDeviceCheck = 'MeteringDeviceCheck',
  TaskClose = 'TaskClose',
  TaskStagePush = 'TaskStagePush',
  TaskStageRevert = 'TaskStageRevert',
  ApartmentSetStatus = 'ApartmentSetStatus',
  CalculatorSwitch = 'CalculatorSwitch',
  HousingMeterignDeviceSwitch = 'HousingMeterignDeviceSwitch',
  IndividualDeviceSwitchMagneticSeal = 'IndividualDeviceSwitchMagneticSeal',
  CalculatorClose = 'CalculatorClose',
  IndividualDeviceSwitch = 'IndividualDeviceSwitch',
  IndividualDeviceReopen = 'IndividualDeviceReopen',
  TaskReturn = 'TaskReturn',
  HousingMeteringDeviceReadingsRemove = 'HousingMeteringDeviceReadingsRemove',
}

export enum EManagingFirmTaskFilterType {
  CalculatorMalfunctionAny = 'CalculatorMalfunctionAny',
  HousingDeviceMalfunctionAny = 'HousingDeviceMalfunctionAny',
  CalculatorLackOfConnection = 'CalculatorLackOfConnection',
  IndividualDeviceCheck = 'IndividualDeviceCheck',
  PipeRupture = 'PipeRupture',
  IndividualDeviceReadingsCheck = 'IndividualDeviceReadingsCheck',
  MeasurementErrorAny = 'MeasurementErrorAny',
  IndividualDeviceCheckNoReadings = 'IndividualDeviceCheckNoReadings',
  RiserNoReadings = 'RiserNoReadings',
  EmergencyApplication = 'EmergencyApplication',
  CurrentApplication = 'CurrentApplication',
  ResourceDisconnecting = 'ResourceDisconnecting',
  TemperatureNormativeDeviation = 'TemperatureNormativeDeviation',
}

export interface EManagingFirmTaskFilterTypeNullableStringDictionaryItem {
  key?: EManagingFirmTaskFilterType | null;
  value?: string | null;
}

export enum EManagingFirmTaskType {
  CalculatorMalfunction = 'CalculatorMalfunction',
  CalculatorMalfunctionNonCommercial = 'CalculatorMalfunctionNonCommercial',
  HousingDeviceMalfunction = 'HousingDeviceMalfunction',
  HousingDeviceMalfunctionNonCommercial = 'HousingDeviceMalfunctionNonCommercial',
  CalculatorLackOfConnection = 'CalculatorLackOfConnection',
  IndividualDeviceCheck = 'IndividualDeviceCheck',
  PipeRupture = 'PipeRupture',
  CurrentApplication = 'CurrentApplication',
  EmergencyApplication = 'EmergencyApplication',
  IndividualDeviceReadingsCheck = 'IndividualDeviceReadingsCheck',
  MeasurementErrorCommercial = 'MeasurementErrorCommercial',
  MeasurementErrorNonCommercial = 'MeasurementErrorNonCommercial',
  IndividualDeviceCheckNoReadings = 'IndividualDeviceCheckNoReadings',
  RiserNoReadings = 'RiserNoReadings',
  ResourceDisconnecting = 'ResourceDisconnecting',
  CurrentApplicationUnassigned = 'CurrentApplicationUnassigned',
  EmergencyApplicationUnassigned = 'EmergencyApplicationUnassigned',
  TemperatureNormativeDeviation = 'TemperatureNormativeDeviation',
}

export enum EMeteringDeviceType {
  Calculator = 'Calculator',
  HousingPipe = 'HousingPipe',
  Individual = 'Individual',
  HousingElectric = 'HousingElectric',
}

export enum ENodeCheckType {
  PlannedCheck = 'PlannedCheck',
  UnplannedCheck = 'UnplannedCheck',
  AdmissionCheck = 'AdmissionCheck',
}

export enum ENodeCommercialAccountStatus {
  NotRegistered = 'NotRegistered',
  Registered = 'Registered',
  OnReview = 'OnReview',
  Prepared = 'Prepared',
}

export interface ENodeCommercialAccountStatusNullableStringDictionaryItem {
  key?: ENodeCommercialAccountStatus | null;
  value?: string | null;
}

export enum ENodeNetworkDeviceType {
  Calculator = 'Calculator',
  Counter = 'Counter',
}

export enum ENodeRegistrationType {
  Commercial = 'Commercial',
  Technical = 'Technical',
}

export enum ENodeType {
  PipeNode = 'PipeNode',
  ElectricNode = 'ElectricNode',
}

export enum ENodeWorkingRangeSeason {
  HeatingSeason = 'HeatingSeason',
  InterHeating = 'InterHeating',
}

export enum ENodeWorkingRangeType {
  AllowableError = 'AllowableError',
  CriticalError = 'CriticalError',
  MassOfFeedFlowMagistral = 'MassOfFeedFlowMagistral',
  MassOfFeedBackFlowMagistral = 'MassOfFeedBackFlowMagistral',
  DeltaMassOfMagistral = 'DeltaMassOfMagistral',
}

export interface ENodeWorkingRangeTypeStringDictionaryItem {
  key?: ENodeWorkingRangeType;
  value?: string | null;
}

export enum ENonResidentialHouseType {
  None = 'None',
  Social = 'Social',
  Commercial = 'Commercial',
}

export interface ENonResidentialHouseTypeStringDictionaryItem {
  key?: ENonResidentialHouseType;
  value?: string | null;
}

export enum EOrderByRule {
  Ascending = 'Ascending',
  Descending = 'Descending',
}

export enum EOrganizationUserWorkingStatusType {
  Working = 'Working',
  OnVacation = 'OnVacation',
  Sick = 'Sick',
  OnDuty = 'OnDuty',
}

export interface EOrganizationUserWorkingStatusTypeStringDictionaryItem {
  key?: EOrganizationUserWorkingStatusType;
  value?: string | null;
}

export enum EPersonType {
  Natural = 'Natural',
  Juristic = 'Juristic',
}

export enum EPhaseNumberType {
  SinglePhase = 'SinglePhase',
  ThreePhase = 'ThreePhase',
}

export enum EPipeNodeConfig {
  HeatNoRecharge = 'HeatNoRecharge',
  HotWaterSupplyNoBackflow = 'HotWaterSupplyNoBackflow',
  ColdWaterSupply = 'ColdWaterSupply',
  HeatWithRecharge = 'HeatWithRecharge',
  HotWaterSupplyWithBackflow = 'HotWaterSupplyWithBackflow',
  HeatNoHousingMeteringDevice = 'HeatNoHousingMeteringDevice',
  HotWaterNoDevice = 'HotWaterNoDevice',
  ColdWaterNoDevice = 'ColdWaterNoDevice',
}

export enum EPipeNodeValidationMessage {
  ExtraFeed = 'ExtraFeed',
  ExtraBack = 'ExtraBack',
  ExtraRecharge = 'ExtraRecharge',
  NoPipes = 'NoPipes',
  NoFeed = 'NoFeed',
  NoBack = 'NoBack',
  NoRecharge = 'NoRecharge',
  NoDevices = 'NoDevices',
  ExtraFeedFlowMeter = 'ExtraFeedFlowMeter',
  ExtraBackFlowMeter = 'ExtraBackFlowMeter',
  ExtraRechargeFlowMeter = 'ExtraRechargeFlowMeter',
  LackFeedFlowMeter = 'LackFeedFlowMeter',
  LackBackFlowMeter = 'LackBackFlowMeter',
  LackRechargeFlowMeter = 'LackRechargeFlowMeter',
  ExtraFeedTemperatureSensor = 'ExtraFeedTemperatureSensor',
  ExtraBackTemperatureSensor = 'ExtraBackTemperatureSensor',
  ExtraRechargeTemperatureSensor = 'ExtraRechargeTemperatureSensor',
  LackNodeTemperatureSensor = 'LackNodeTemperatureSensor',
}

export interface EPipeNodeValidationMessageStringDictionaryItem {
  key?: EPipeNodeValidationMessage;
  value?: string | null;
}

export enum EPollState {
  Pending = 'Pending',
  Running = 'Running',
  Error = 'Error',
  Done = 'Done',
}

export enum EReportFormat {
  Consumption = 'Consumption',
  Rso = 'Rso',
  Undersupply = 'Undersupply',
  RsoWithUndersupply = 'RsoWithUndersupply',
}

export enum EReportName {
  OperatorsWorkingReport = 'OperatorsWorkingReport',
  InspectorsWorkingReport = 'InspectorsWorkingReport',
  CallCenterWorkingReport = 'CallCenterWorkingReport',
  HouseManagementsReport = 'HouseManagementsReport',
}

export enum EReportType {
  None = 'None',
  Hourly = 'Hourly',
  Daily = 'Daily',
  Monthly = 'Monthly',
  Total = 'Total',
  Current = 'Current',
  TotalCurrent = 'TotalCurrent',
  Events = 'Events',
  Settings = 'Settings',
  Other = 'Other',
}

export enum EResourceDisconnectingOrderRule {
  StartDate = 'StartDate',
  EndDate = 'EndDate',
}

export enum EResourceDisconnectingStatus {
  Future = 'Future',
  Active = 'Active',
  Past = 'Past',
}

export enum EResourceDisconnectingType {
  Other = 'Other',
  Planned = 'Planned',
  Emergency = 'Emergency',
  Preventive = 'Preventive',
  Repair = 'Repair',
  InterHeatingSeason = 'InterHeatingSeason',
}

export interface EResourceDisconnectingTypeNullableStringDictionaryItem {
  key?: EResourceDisconnectingType | null;
  value?: string | null;
}

export enum EResourceType {
  Heat = 'Heat',
  HotWaterSupply = 'HotWaterSupply',
  ColdWaterSupply = 'ColdWaterSupply',
  Electricity = 'Electricity',
}

export interface EResourceTypeConsumptionRateResponseDictionaryItem {
  key?: EResourceType;
  value?: ConsumptionRateResponse | null;
}

export interface EResourceTypeDoubleDictionaryItem {
  key?: EResourceType;
  /** @format double */
  value?: number;
}

export interface EResourceTypeNullableStringDictionaryItem {
  key?: EResourceType | null;
  value?: string | null;
}

export interface EResourceTypeStringDictionaryItem {
  key?: EResourceType;
  value?: string | null;
}

export enum ESecuredIdentityRoleName {
  Administrator = 'Administrator',
  ManagingFirmExecutor = 'ManagingFirmExecutor',
  Operator = 'Operator',
  ManagingFirmSpectator = 'ManagingFirmSpectator',
  ManagingFirmDispatcher = 'ManagingFirmDispatcher',
  Controller = 'Controller',
  SeniorOperator = 'SeniorOperator',
  ManagingFirmSpectatorRestricted = 'ManagingFirmSpectatorRestricted',
  ManagingFirmSpectatingAdministrator = 'ManagingFirmSpectatingAdministrator',
  Supervisor = 'Supervisor',
}

export interface ESecuredIdentityRoleNameStringDictionaryItem {
  key?: ESecuredIdentityRoleName;
  value?: string | null;
}

export enum ESoiReportPeriod {
  Month = 'Month',
  Year = 'Year',
}

export enum EStageActionType {
  AddDocuments = 'AddDocuments',
  AddPerpetrator = 'AddPerpetrator',
  EmailNotify = 'EmailNotify',
  UploadReadings = 'UploadReadings',
  CheckDevice = 'CheckDevice',
  SwitchDevices = 'SwitchDevices',
  SetNextStageDeadline = 'SetNextStageDeadline',
  Completion = 'Completion',
  Switch = 'Switch',
  ChangeApartmentCoefficient = 'ChangeApartmentCoefficient',
  AddEmailTemplate = 'AddEmailTemplate',
  AddPhotos = 'AddPhotos',
  SetApplicationCompletionDate = 'SetApplicationCompletionDate',
  AddComment = 'AddComment',
  AddApartmentCheck = 'AddApartmentCheck',
  FixReading = 'FixReading',
  CompletionOrSwitch = 'CompletionOrSwitch',
  ClearManuallyAttachedParticipants = 'ClearManuallyAttachedParticipants',
  CloseIndividualDevices = 'CloseIndividualDevices',
  CreateResourceDisconnecting = 'CreateResourceDisconnecting',
  SetApplicationPostponeDate = 'SetApplicationPostponeDate',
  SelectApplicationWorker = 'SelectApplicationWorker',
}

export enum EStageStatus {
  Waiting = 'Waiting',
  InProgress = 'InProgress',
  Done = 'Done',
}

export enum EStageTimeStatus {
  Normal = 'Normal',
  RunningOut = 'RunningOut',
  Expired = 'Expired',
}

export enum EStageType {
  Common = 'Common',
  Switch = 'Switch',
  Final = 'Final',
}

export enum ESwitchingReason {
  Manually = 'Manually',
  NoReadings = 'NoReadings',
  DeviceBroken = 'DeviceBroken',
  CheckingDate = 'CheckingDate',
  CertificateIssued = 'CertificateIssued',
  MaintainingStopped = 'MaintainingStopped',
}

export enum ETaskClosingStatus {
  Properly = 'Properly',
  Interrupted = 'Interrupted',
  Forced = 'Forced',
}

export interface ETaskClosingStatusNullableStringDictionaryItem {
  key?: ETaskClosingStatus | null;
  value?: string | null;
}

export enum ETaskConfirmationType {
  Confirm = 'Confirm',
  PipeRuptureNotConfirmAnomaly = 'PipeRuptureNotConfirm_Anomaly',
  PipeRuptureNotConfirmCalculatorMalfunction = 'PipeRuptureNotConfirm_CalculatorMalfunction',
  PipeRuptureNotConfirmPowerMalfunction = 'PipeRuptureNotConfirm_PowerMalfunction',
  ResourceDisconnectingNotConfirm = 'ResourceDisconnectingNotConfirm',
  FeedBackFlowTemperatureErrorNoted = 'FeedBackFlowTemperatureErrorNoted',
}

export interface ETaskConfirmationTypeStringDictionaryItem {
  key?: ETaskConfirmationType;
  value?: string | null;
}

export enum ETaskCreateType {
  CalculatorMalfunction = 'CalculatorMalfunction',
  HousingDeviceMalfunction = 'HousingDeviceMalfunction',
  CalculatorLackOfConnection = 'CalculatorLackOfConnection',
  PipeRupture = 'PipeRupture',
  IndividualDeviceCheck = 'IndividualDeviceCheck',
  IndividualDeviceReadingsCheck = 'IndividualDeviceReadingsCheck',
  MeasurementError = 'MeasurementError',
  IndividualDeviceCheckNoReadings = 'IndividualDeviceCheckNoReadings',
  RiserNoReadings = 'RiserNoReadings',
  EmergencyApplication = 'EmergencyApplication',
  CurrentApplication = 'CurrentApplication',
  ResourceDisconnecting = 'ResourceDisconnecting',
  TemperatureNormativeDeviation = 'TemperatureNormativeDeviation',
}

export enum ETaskEngineeringElement {
  Node = 'Node',
  IndividualDevice = 'IndividualDevice',
  HouseNetwork = 'HouseNetwork',
}

export enum ETaskTargetObjectInfo {
  ColdWaterSupply = 'ColdWaterSupply',
  HotWaterSupply = 'HotWaterSupply',
  Electricity = 'Electricity',
  Heat = 'Heat',
  MultipleResources = 'MultipleResources',
  Calculator = 'Calculator',
}

export enum ETaskTargetObjectRequestType {
  Apartment = 'Apartment',
  MeteringDevice = 'MeteringDevice',
  Node = 'Node',
  Building = 'Building',
  Reading = 'Reading',
  IndividualDevice = 'IndividualDevice',
}

export enum ETaskTargetObjectType {
  IndividualDevice = 'IndividualDevice',
  PipeHousingDevice = 'PipeHousingDevice',
  Calculator = 'Calculator',
  PipeNode = 'PipeNode',
  Application = 'Application',
}

export enum ETaskTargetType {
  Apartment = 'Apartment',
  Calculator = 'Calculator',
  Housing = 'Housing',
  Node = 'Node',
  Application = 'Application',
}

export enum ETasksState {
  NoTasks = 'NoTasks',
  OnTime = 'OnTime',
  MissedDeadline = 'MissedDeadline',
}

export enum ETemperatureNormativeDeviationType {
  Overheating = 'Overheating',
  Underheating = 'Underheating',
}

export enum EValueNodeWorkingRangeRelation {
  Self = 'Self',
  ManagementFirm = 'ManagementFirm',
  HouseManagement = 'HouseManagement',
  Building = 'Building',
}

export enum EYearQuarter {
  First = 'First',
  Second = 'Second',
  Third = 'Third',
  Forth = 'Forth',
}

export interface EditApartmentCheckRequest {
  /** @format date-time */
  checkingDate?: string | null;
  checkType?: ECheckType | null;
  /** @format int32 */
  documentId?: number | null;
  registryNumber?: string | null;
  actResourceType?: EActResourceType | null;
  comment?: string | null;
}

export interface EditIndividualDeviceReadingsHistoryRequest {
  newReadings?: SwitchIndividualDeviceReadingsCreateRequest[] | null;
}

export enum EisTaskReasonType {
  Heat = 'Heat',
  HotWaterSupply = 'HotWaterSupply',
  ColdWaterSupply = 'ColdWaterSupply',
  Electricity = 'Electricity',
}

export enum EisTaskType {
  Current = 'Current',
  Emergency = 'Emergency',
}

export interface ElectricHousingMeteringDeviceResponse {
  /** @format int32 */
  id: number;
  model: string | null;
  serialNumber: string | null;
  sealNumber: string | null;
  /** @format date-time */
  sealInstallationDate: string | null;
  /** @format int32 */
  managementFirmId: number | null;
  /** @format date-time */
  lastCheckingDate: string | null;
  /** @format date-time */
  futureCheckingDate: string | null;
  /** @format date-time */
  openingDate: string | null;
  /** @format date-time */
  closingDate: string | null;
  closingReason: EClosingReason;
  hasActiveTasks: boolean | null;
  /** @format int32 */
  bitDepth: number | null;
  /** @format double */
  scaleFactor: number | null;
  resource: EResourceType;
  housingMeteringDeviceType: EHousingMeteringDeviceType;
  address: BuildingShortResponse | null;
  comment: HousingMeteringDeviceCommentResponse | null;
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

export interface ElectricNodeResponse {
  /** @format int32 */
  id: number;
  title: string | null;
  registrationType: ENodeRegistrationType;
  commercialStatus: NodeCommercialStatusResponse | null;
  resource: EResourceType;
  nodeServiceZone: NodeServiceZoneResponse | null;
  /** @format date-time */
  lastCommercialAccountingDate: string | null;
  /** @format date-time */
  futureCommercialAccountingDate: string | null;
  /** @format date-time */
  commercialAccountingDeregistrationDate: string | null;
  /** @format int32 */
  buildingId: number;
  address: BuildingShortResponse | null;
  documents: DocumentLiteResponse[] | null;
  locationName: string | null;
  counter: ElectricHousingMeteringDeviceResponse | null;
}

export interface ErpApplicationResponse {
  /** @format uuid */
  id: string;
  /** @format uuid */
  erpId: string | null;
  number: string | null;
  type: EisTaskType;
  reason: string | null;
  comment: string | null;
  description: string | null;
  category: string | null;
  source: string | null;
  creator: ApplicationUserResponse | null;
  responsible: ApplicationUserResponse | null;
}

export interface ErpCreateTaskRequest {
  /** @format uuid */
  taskReasonId: string;
  /** @format int32 */
  objectTtmId: number;
  /** @format uuid */
  sourceId: string;
  /** @format date-time */
  sourceDateTime: string;
  taskType: EisTaskType;
  /** @format int32 */
  executorId: number;
  taskDescription?: string | null;
  sourceNumber?: string | null;
  subscriberPhoneNumber?: string | null;
  subscriberFullName?: string | null;
  /** @format date-time */
  taskDeadline?: string | null;
}

export interface ErpExecutorResponse {
  /** @format int32 */
  ttmId: number;
  name: string | null;
}

export interface ErpSourceResponse {
  /** @format uuid */
  id: string;
  name: string | null;
  isSourceNumberRequired: boolean;
  isSubscriberRequired: boolean;
}

export interface ErpTaskDeadlineResponse {
  /** @format int32 */
  deadlineInHours: number | null;
}

export interface ErpTaskReasonGroupResponse {
  id: string | null;
  /** @format int32 */
  orderNumber: number;
  type: EisTaskReasonType;
  name: string | null;
  taskTypes: EisTaskType[] | null;
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

export interface FeatureTogglesResponse {
  sealService: boolean;
  mvituService: boolean;
}

export interface FullAddressResponse {
  /** @format int32 */
  id: number;
  buildingNumber: string | null;
  corpus: string | null;
  street: string | null;
  city: string | null;
  /** @format int32 */
  apartmentId: number | null;
  apartmentNumber: string | null;
  comment: string | null;
}

export interface GetDataForHousingConsumptionPlotResponse {
  housingConsumption: DateTimeDoubleDictionaryItem[] | null;
}

export interface GetDataForIndividualDevicesConsumptionPlotResponse {
  normativeConsumption: DateTimeDoubleDictionaryItem[] | null;
  subscriberConsumption: DateTimeDoubleDictionaryItem[] | null;
}

export interface GetHousingMeteringDeviceReadingsResponse {
  items: HousingMeteringDeviceReadingsIncludingPlacementResponse[] | null;
}

export interface GetIndividualDevicesToClose {
  /** @format int32 */
  expiredCheckingDateCount?: number;
  /** @format int32 */
  withoutReadingsCount?: number;
  /** @format int32 */
  apartmentsOnPauseCount?: number;
}

export interface GetSummaryHousingConsumptionsByResourcesResponse {
  consumptions: EResourceTypeDoubleDictionaryItem[] | null;
}

export interface GroupReportConfigurationDetailsModel {
  organizationUserIds?: number[] | null;
  contractorIds?: number[] | null;
  /** @format date-time */
  initialDate?: string;
  /** @format date-time */
  nextDate?: string | null;
  sendingPeriodType?: GroupReportConfigurationSendingPeriodType;
  reportPeriodType?: GroupReportConfigurationReportPeriodType;
  isActive?: boolean;
}

export interface GroupReportConfigurationDetailsRequest {
  organizationUserIds: number[];
  contractorIds: number[];
  /** @format date-time */
  initialDate: string;
  isActive?: boolean;
  sendingPeriodType: GroupReportConfigurationSendingPeriodType;
}

export enum GroupReportConfigurationReportPeriodType {
  StartMonth = 'StartMonth',
  LastMonth = 'LastMonth',
}

export enum GroupReportConfigurationSendingPeriodType {
  EveryTwoWeeks = 'EveryTwoWeeks',
  EveryMonth = 'EveryMonth',
  EveryQuarter = 'EveryQuarter',
}

export interface GroupReportConfigurationServiceModel {
  /** @format int32 */
  id?: number;
  reportConfigurationDetails?: GroupReportConfigurationDetailsModel | null;
  report?: ComposeGroupReportServiceModel | null;
  /** @format int32 */
  creatorId?: number;
}

export interface GroupReportContractorResponse {
  /** @format int32 */
  id: number;
  title: string | null;
  email: string | null;
}

export interface GroupReportFormResponse {
  groupReports: GroupReportResponse[] | null;
  nodeResourceTypes: EResourceTypeStringDictionaryItem[] | null;
  nodeStatuses:
    | ENodeCommercialAccountStatusNullableStringDictionaryItem[]
    | null;
  housingStockGroups: GroupReportHousingStockGroupResponse[] | null;
  contractors: GroupReportContractorResponse[] | null;
}

export interface GroupReportHousingStockGroupResponse {
  street: string | null;
  housingStocks: GroupReportHousingStockResponse[] | null;
}

export interface GroupReportHousingStockResponse {
  /** @format int32 */
  id: number;
  number: string | null;
  corpus: string | null;
  categoryText: string | null;
}

export interface GroupReportResponse {
  /** @format uuid */
  id: string | null;
  /** @format uuid */
  houseManagementId: string | null;
  title: string | null;
}

export interface GuidStringDictionaryItem {
  /** @format uuid */
  key?: string;
  value?: string | null;
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
  buildingIds: number[] | null;
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
  housingStocks: BuildingShortResponse[] | null;
}

export interface HeatingSeasonHouseManagementListItemResponse {
  /** @format uuid */
  houseManagementId: string;
  houseManagementName: string | null;
  adjustments: HeatingSeasonHouseManagementListItemAdjustmentResponse[] | null;
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

export interface HeatingSeasonPageResponse {
  /** @format uuid */
  heatingSeasonId: string | null;
  items: HeatingSeasonListItemResponse[] | null;
  houseManagementItems: HeatingSeasonHouseManagementListItemResponse[] | null;
}

export interface HeatingSeasonResponse {
  /** @format uuid */
  heatingSeasonId: string;
  /** @format int32 */
  managementFirmId: number;
  adjustments: HeatingSeasonAdjustmentResponse[] | null;
}

export interface HeatingStationResponse {
  /** @format uuid */
  id: string;
  name: string | null;
  isThermalChamber: boolean;
  address: AddressResponse | null;
  housingStocks: BuildingShortResponse[] | null;
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

export interface HeatingStationShortResponse {
  /** @format uuid */
  id: string;
  name: string | null;
  address: AddressResponse | null;
}

export interface HeatingStationWithStreetsResponse {
  /** @format uuid */
  id: string;
  name: string | null;
  streets: StreetWithBuildingNumbersResponse[] | null;
}

export interface HomeownerAccount {
  fullName?: string | null;
  personalAccountNumber?: string | null;
  isMain?: boolean;
}

export interface HomeownerAccountAddPhoneNumberRequest {
  /** @minLength 1 */
  phoneNumber: string;
}

export interface HomeownerAccountCloseRequest {
  /** @format uuid */
  homeownerAccountId: string;
  /** @format date-time */
  closedAt: string;
}

export interface HomeownerAccountCreateRequest {
  /** @minLength 1 */
  personalAccountNumber: string;
  /** @minLength 1 */
  name: string;
  phoneNumbers?: string[] | null;
  personType?: EPersonType;
  /** @format double */
  ownershipArea?: number | null;
  /** @format date-time */
  openAt: string;
  isMainOnApartment?: boolean;
  paymentCode?: string | null;
  /** @format int32 */
  apartmentId: number;
}

export interface HomeownerAccountCreateUnattachedRequest {
  /** @minLength 1 */
  personalAccountNumber: string;
  /** @minLength 1 */
  name: string;
  phoneNumbers?: string[] | null;
  personType?: EPersonType;
  /** @format double */
  ownershipArea?: number | null;
  /** @format date-time */
  openAt: string;
  isMainOnApartment?: boolean;
  paymentCode?: string | null;
}

export interface HomeownerAccountListResponse {
  /** @format uuid */
  id: string;
  phoneNumbers: string[] | null;
  name: string | null;
  personType: EPersonType;
  paymentCode: string | null;
  personalAccountNumber: string | null;
  /** @format double */
  ownershipArea: number;
  /** @format date-time */
  openAt: string;
  /** @format date-time */
  openAtFact: string;
  /** @format date-time */
  closedAt: string | null;
  /** @format date-time */
  editedAt: string | null;
  isMainPersonalAccountNumber: boolean;
  replacedByAccount: ReplacementAccount | null;
}

export interface HomeownerAccountNameResponse {
  /** @format uuid */
  id: string;
  name: string | null;
}

export enum HomeownerAccountOrderRule {
  Street = 'Street',
  HomeownerName = 'HomeownerName',
  PaymentCode = 'PaymentCode',
}

export interface HomeownerAccountRemovePhoneNumberRequest {
  /** @minLength 1 */
  phoneNumber: string;
}

export interface HomeownerAccountReplaceAllPhoneNumbersRequest {
  /** @minLength 1 */
  phoneNumber: string;
}

export interface HomeownerAccountReplacePhoneNumberRequest {
  /** @minLength 1 */
  oldPhoneNumber: string;
  /** @minLength 1 */
  newPhoneNumber: string;
}

export interface HomeownerAccountReplaceRequest {
  /** @format uuid */
  replaceableAccountId: string;
  newHomeownerAccount: HomeownerAccountCreateRequest;
}

export interface HomeownerAccountResponse {
  /** @format uuid */
  id: string;
  phoneNumbers: string[] | null;
  name: string | null;
  personType: EPersonType;
  apartment: FullAddressResponse | null;
  paymentCode: string | null;
  personalAccountNumber: string | null;
  /** @format date-time */
  openAt: string;
  /** @format date-time */
  openAtFact: string;
  /** @format date-time */
  closedAt: string | null;
  /** @format date-time */
  editedAt: string | null;
  /** @format double */
  ownershipArea: number;
  replacedByAccount: ReplacementAccount | null;
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

export interface HomeownerAccountSplitRequest {
  accountForClosing: HomeownerAccountCloseRequest;
  homeownerAccountForSplittedApartment: HomeownerAccountCreateRequest;
  individualDeviceIdsForSwitch?: number[] | null;
  useExistingApartment: boolean;
  newApartment: ApartmentCreateRequest;
}

export interface HomeownerAccountUpdateRequest {
  personalAccountNumber?: string | null;
  paymentCode?: string | null;
  name?: string | null;
  personType?: EPersonType | null;
  /** @format double */
  ownershipArea?: number | null;
  isMainOnApartment?: boolean | null;
}

export interface HomeownerCertificateResponse {
  fullName: string | null;
  address: FullAddressResponse | null;
  individualDevices: IndividualDeviceIntoHomeownerCertificateResponse[] | null;
}

export interface HomeownersConstructedReportResponse {
  houseManagementName: string | null;
  city: string | null;
  street: string | null;
  houseNumber: string | null;
  corpus: string | null;
  apartmentNumber: string | null;
  homeownerFullName: string | null;
  homeownerAccountNumber: string | null;
  homeownerPhoneNumbers: string[] | null;
  /** @deprecated */
  homeownerPhoneNumber: string | null;
}

export interface House {
  /** @format int32 */
  id?: number;
  address?: string | null;
}

export interface HouseManagementConstructedReportResponse {
  houseManagementName: string | null;
  /** @format int32 */
  housingStocksCount: number;
  /** @format int32 */
  apartmentsCount: number;
  /** @format int32 */
  apartmentsWithIMDCount: number;
  /** @format int32 */
  coldWaterSupplyCount: number;
  /** @format int32 */
  hotWaterSupplyCount: number;
  /** @format int32 */
  electricityCount: number;
  /** @format int32 */
  heatCount: number;
}

export interface HouseManagementResponse {
  /** @format uuid */
  id: string;
  name: string | null;
  phone: string | null;
  comment: string | null;
}

export interface HouseManagementWithStreetsResponse {
  /** @format uuid */
  id: string;
  name: string | null;
  streets: StreetWithBuildingNumbersResponse[] | null;
}

export interface HousingDeviceReadingOnRiserResponse {
  /** @format double */
  value: number;
  /** @format date-time */
  readingDate: string;
}

export interface HousingDevicesConstructedReportResponse {
  houseManagementName: string | null;
  city: string | null;
  street: string | null;
  houseNumber: string | null;
  corpus: string | null;
  model: string | null;
  serialNumber: string | null;
  resource: EResourceType;
  /** @format date-time */
  lastCheckingDate: string | null;
  /** @format date-time */
  futureCheckingDate: string | null;
  currentReadings: HousingDeviceReadingOnRiserResponse | null;
  previousReadings: HousingDeviceReadingOnRiserResponse | null;
  /** @format double */
  consumption: number | null;
}

export interface HousingMeteringDeviceAddCommentRequest {
  text?: string | null;
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

export interface HousingMeteringDeviceIncludingReadingsResponse {
  /** @format int32 */
  id: number;
  model: string | null;
  serialNumber: string | null;
  sealNumber: string | null;
  /** @format date-time */
  sealInstallationDate: string | null;
  /** @format int32 */
  managementFirmId: number | null;
  /** @format date-time */
  lastCheckingDate: string | null;
  /** @format date-time */
  futureCheckingDate: string | null;
  /** @format date-time */
  openingDate: string | null;
  /** @format date-time */
  closingDate: string | null;
  closingReason: EClosingReason;
  hasActiveTasks: boolean | null;
  /** @format int32 */
  bitDepth: number | null;
  /** @format double */
  scaleFactor: number | null;
  resource: EResourceType;
  housingMeteringDeviceType: EHousingMeteringDeviceType;
  address: BuildingShortResponse | null;
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

export interface HousingMeteringDeviceReadingsHistoryItemResponse {
  /** @format uuid */
  id: string;
  /** @format double */
  value: number;
  /** @format double */
  nonResidentialRoomConsumption: number | null;
  /** @format date-time */
  readingDate: string;
  /** @format date-time */
  uploadDate: string;
  /** @format uuid */
  previousReadingsId: string | null;
  user: OrganizationUserShortResponse | null;
  isArchived: boolean;
  isRemoved: boolean;
  /** @format date-time */
  removedTime: string | null;
  removedByUser: OrganizationUserShortResponse | null;
  /** @format double */
  consumption: number;
}

export interface HousingMeteringDeviceReadingsHistoryResponse {
  yearReadings: HousingMeteringDeviceReadingsYearHistoryResponse[] | null;
}

export interface HousingMeteringDeviceReadingsIncludingPlacementResponse {
  /** @format uuid */
  id: string;
  /** @format double */
  value: number;
  /** @format double */
  nonResidentialRoomConsumption: number | null;
  /** @format date-time */
  readingDate: string;
  /** @format date-time */
  uploadDate: string;
  /** @format uuid */
  previousReadingsId: string | null;
  user: OrganizationUserShortResponse | null;
  isArchived: boolean;
  isRemoved: boolean;
  /** @format date-time */
  removedTime: string | null;
  removedByUser: OrganizationUserShortResponse | null;
  /** @format int32 */
  nodeId: number;
  /** @format int32 */
  deviceId: number;
  deviceModel: string | null;
  deviceSerialNumber: string | null;
  magistralType: EMagistralType;
}

export interface HousingMeteringDeviceReadingsMonthHistoryResponse {
  /** @format int32 */
  month: number;
  readings: HousingMeteringDeviceReadingsHistoryItemResponse[] | null;
}

export interface HousingMeteringDeviceReadingsResponse {
  /** @format uuid */
  id: string;
  /** @format double */
  value: number;
  /** @format double */
  nonResidentialRoomConsumption: number | null;
  /** @format date-time */
  readingDate: string;
  /** @format date-time */
  uploadDate: string;
  /** @format uuid */
  previousReadingsId: string | null;
  user: OrganizationUserShortResponse | null;
  isArchived: boolean;
  isRemoved: boolean;
  /** @format date-time */
  removedTime: string | null;
  removedByUser: OrganizationUserShortResponse | null;
}

export interface HousingMeteringDeviceReadingsYearHistoryResponse {
  /** @format int32 */
  year: number;
  monthReadings: HousingMeteringDeviceReadingsMonthHistoryResponse[] | null;
}

export interface HousingMeteringDeviceUpdateCommentRequest {
  /** @format int32 */
  deviceId?: number;
  text?: string | null;
}

export interface HousingStockCreateRequest {
  mainAddress: BuildingAddressCreateRequest;
  otherAddresses?: BuildingAddressCreateRequest[] | null;
  /** @format uuid */
  heatingStationId: string;
  coordinates?: PointResponse | null;
  /** @format uuid */
  houseManagementId?: string | null;
  livingHouseType?: ELivingHouseType | null;
  /** @format int32 */
  numberOfEntrances?: number | null;
  /** @format int32 */
  numberOfFloors?: number | null;
  isThereElevator?: boolean | null;
  /**
   * @minLength 6
   * @maxLength 6
   */
  index?: string | null;
  city?: string | null;
  /**
   * @format int32
   * @min 1800
   * @max 2100
   */
  constructionYear?: number | null;
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
  hasIndividualHeatingStation?: boolean;
  /** @format uuid */
  fiasId?: string | null;
}

export interface HousingStockListResponse {
  /** @format int32 */
  id: number;
  /** @format int32 */
  managingFirmId: number;
  managementFirm: ManagementFirmLiteResponse | null;
  address: BuildingAddressResponse | null;
  livingHouseType: ELivingHouseType;
  houseTypeString: string | null;
  houseManagement: HouseManagementResponse | null;
}

export interface HousingStockResponse {
  /** @format int32 */
  id: number;
  /** @format int32 */
  managingFirmId: number;
  /** @format uuid */
  fiasId: string | null;
  index: string | null;
  coordinates: PointResponse | null;
  livingHouseType: ELivingHouseType | null;
  houseTypeString: string | null;
  /** @format int32 */
  numberOfEntrances: number | null;
  /** @format int32 */
  numberOfFloors: number | null;
  isThereElevator: boolean | null;
  /** @format int32 */
  numberOfApartments: number | null;
  /** @format double */
  totalLivingArea: number | null;
  /** @format double */
  areaOfNonResidential: number | null;
  /** @format double */
  houseArea: number | null;
  /** @format double */
  totalArea: number | null;
  hasIndividualHeatingStation: boolean;
  heatingStation: HeatingStationShortResponse | null;
  managementFirmName: string | null;
  managementFirmInfo: string | null;
  houseManagement: HouseManagementResponse | null;
  /** @format int32 */
  inspectorId: number | null;
  /** @format int32 */
  inspectedDay: number | null;
  address: BuildingAddressResponse | null;
  /** @format int32 */
  numberOfTasks: number;
  /** @format int32 */
  constructionYear: number | null;
}

export interface HousingStockUpdateRequest {
  /** @format uuid */
  heatingStationId?: string | null;
  hasIndividualHeatingStation?: boolean | null;
  coordinates?: PointResponse | null;
  /** @format uuid */
  houseManagementId?: string | null;
  /** @format int32 */
  numberOfEntrances?: number | null;
  /** @format int32 */
  numberOfFloors?: number | null;
  isThereElevator?: boolean | null;
  /**
   * @minLength 6
   * @maxLength 6
   */
  index?: string | null;
  /**
   * @format int32
   * @min 1800
   * @max 2100
   */
  constructionYear?: number | null;
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
  /** @format uuid */
  fiasId?: string | null;
}

export interface HousingStockWithCoordinatesResponse {
  /** @format int32 */
  id: number;
  /** @format int32 */
  managingFirmId: number;
  address: BuildingAddressResponse | null;
  coordinates: PointResponse | null;
}

export interface HousingStockWithTasksResponse {
  housingStock: HousingStockWithCoordinatesResponse | null;
  tasks: TaskShortResponse[] | null;
}

export enum IPStatus {
  Success = 'Success',
  DestinationNetworkUnreachable = 'DestinationNetworkUnreachable',
  DestinationHostUnreachable = 'DestinationHostUnreachable',
  DestinationProtocolUnreachable = 'DestinationProtocolUnreachable',
  DestinationPortUnreachable = 'DestinationPortUnreachable',
  NoResources = 'NoResources',
  BadOption = 'BadOption',
  HardwareError = 'HardwareError',
  PacketTooBig = 'PacketTooBig',
  TimedOut = 'TimedOut',
  BadRoute = 'BadRoute',
  TtlExpired = 'TtlExpired',
  TtlReassemblyTimeExceeded = 'TtlReassemblyTimeExceeded',
  ParameterProblem = 'ParameterProblem',
  SourceQuench = 'SourceQuench',
  BadDestination = 'BadDestination',
  DestinationUnreachable = 'DestinationUnreachable',
  TimeExceeded = 'TimeExceeded',
  BadHeader = 'BadHeader',
  UnrecognizedNextHeader = 'UnrecognizedNextHeader',
  IcmpError = 'IcmpError',
  DestinationScopeMismatch = 'DestinationScopeMismatch',
  Unknown = 'Unknown',
}

export interface IndividualDeviceConsumption {
  /** @format double */
  consumption?: number;
  /** @format date-time */
  readingDate?: string;
}

export interface IndividualDeviceConsumptionResponse {
  /** @format double */
  consumption: number | null;
  /** @format date-time */
  date: string;
}

export interface IndividualDeviceIntoHomeownerCertificateResponse {
  resourceDescription: string | null;
  mountPlaceDescription: string | null;
  model: string | null;
  serialNumber: string | null;
  lastReadings: string | null;
  lastReadingsDate: string | null;
}

export interface IndividualDeviceListItemResponse {
  /** @format int32 */
  id: number;
  model: string | null;
  serialNumber: string | null;
  sealNumber: string | null;
  /** @format date-time */
  sealInstallationDate: string | null;
  managementFirm: OrganizationResponse | null;
  /** @format date-time */
  lastCheckingDate: string | null;
  /** @format date-time */
  futureCheckingDate: string | null;
  /** @format date-time */
  closingDate: string | null;
  closingReason: EClosingReason;
  hasActiveTasks: boolean;
  /** @format int32 */
  bitDepth: number | null;
  /** @format double */
  scaleFactor: number | null;
  resource: EResourceType;
  /** @deprecated */
  mountPlace: string | null;
  deviceMountPlace: IndividualDeviceMountPlaceListResponse | null;
  rateType: EIndividualDeviceRateType;
  readings: IndividualDeviceReadingsResponse[] | null;
  hasMagneticSeal: boolean;
  /** @format date-time */
  magneticSealInstallationDate: string | null;
  magneticSealTypeName: string | null;
  isPolling: boolean;
  apartmentNumber: string | null;
  /** @format int32 */
  apartmentId: number;
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

export interface IndividualDeviceListResponseFromDevicePage {
  /** @format int32 */
  id?: number;
  model?: string | null;
  serialNumber?: string | null;
  /** @format date-time */
  closingDate?: string | null;
  closingReason?: EClosingReason | null;
  resourceType?: EResourceType;
  mountPlace?: string | null;
  /** @format date-time */
  lastCheckingDate?: string;
  /** @format date-time */
  futureCheckingDate?: string;
  /** @format int32 */
  bitDepth?: number | null;
  /** @format int32 */
  housingStockId?: number;
  /** @format int32 */
  apartmentId?: number;
  address?: ApartmentAddress | null;
  homeowners?: HomeownerAccount[] | null;
}

export interface IndividualDeviceListResponseFromDevicePagePagedList {
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
  items: IndividualDeviceListResponseFromDevicePage[] | null;
}

export interface IndividualDeviceMountPlaceForFilterResponse {
  name: string | null;
  description: string | null;
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

export interface IndividualDeviceOnTaskResponse {
  /** @format int32 */
  id: number;
  model: string | null;
  serialNumber: string | null;
  sealNumber: string | null;
  /** @format date-time */
  sealInstallationDate: string | null;
  /** @format int32 */
  managementFirmId: number | null;
  /** @format date-time */
  lastCheckingDate: string | null;
  /** @format date-time */
  futureCheckingDate: string | null;
  /** @format date-time */
  openingDate: string | null;
  /** @format date-time */
  closingDate: string | null;
  closingReason: EClosingReason;
  hasActiveTasks: boolean | null;
  /** @format int32 */
  bitDepth: number | null;
  /** @format double */
  scaleFactor: number | null;
  address: FullAddressResponse | null;
  resource: EResourceType;
  mountPlace: IndividualDeviceMountPlaceListResponse | null;
  rateType: EIndividualDeviceRateType;
  invalidReading: IndividualDeviceReadingsResponse | null;
  fixedReading: IndividualDeviceReadingsResponse | null;
  measurableUnitString: string | null;
}

export interface IndividualDeviceReadingsCreateListResponse {
  current: IndividualDeviceReadingsCreateResponse | null;
  modified: IndividualDeviceReadingsCreateResponse[] | null;
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
  /** @format date-time */
  readingDate: string;
  /** @format int32 */
  deviceId: number;
  /** @format date-time */
  uploadTime?: string | null;
}

export interface IndividualDeviceReadingsCreateResponse {
  /** @format int32 */
  readingId: number;
  date: string | null;
  resource: string | null;
  /** @format int32 */
  taskId: number | null;
  message: string | null;
  /** @format date-time */
  uploadDate: string;
  source: EIndividualDeviceReadingsSource;
  user: OrganizationUserShortResponse | null;
}

export interface IndividualDeviceReadingsHistoryResponse {
  yearReadings: IndividualDeviceReadingsYearHistoryResponse[] | null;
}

export interface IndividualDeviceReadingsItemHistoryResponse {
  /** @format int32 */
  id: number;
  value1: string | null;
  value2: string | null;
  value3: string | null;
  value4: string | null;
  /** @deprecated */
  readingDate: string | null;
  /**
   * @deprecated
   * @format date-time
   */
  readingDateTime: string;
  /** @format date-time */
  actualReadingDate: string;
  /** @format date-time */
  uploadTime: string;
  /** @format date-time */
  entryDate: string;
  source: EIndividualDeviceReadingsSource;
  user: OrganizationUserShortResponse | null;
  isRemoved: boolean;
  /** @format date-time */
  removedTime: string | null;
  removedByUser: OrganizationUserShortResponse | null;
  isArchived: boolean;
  consumption1: string | null;
  consumption2: string | null;
  consumption3: string | null;
  consumption4: string | null;
  averageConsumption1: string | null;
  averageConsumption2: string | null;
  averageConsumption3: string | null;
  averageConsumption4: string | null;
}

export interface IndividualDeviceReadingsMonthHistoryResponse {
  /** @format int32 */
  month: number;
  readings: IndividualDeviceReadingsItemHistoryResponse[] | null;
}

export interface IndividualDeviceReadingsResponse {
  /** @format int32 */
  id: number;
  value1: string | null;
  value2: string | null;
  value3: string | null;
  value4: string | null;
  /** @deprecated */
  readingDate: string | null;
  /**
   * @deprecated
   * @format date-time
   */
  readingDateTime: string;
  /** @format date-time */
  actualReadingDate: string;
  /** @format date-time */
  uploadTime: string;
  /** @format date-time */
  entryDate: string;
  source: EIndividualDeviceReadingsSource;
  user: OrganizationUserShortResponse | null;
  isRemoved: boolean;
  /** @format date-time */
  removedTime: string | null;
  removedByUser: OrganizationUserShortResponse | null;
}

export interface IndividualDeviceReadingsSlimResponse {
  /** @format int32 */
  id: number;
  value1: string | null;
  value2: string | null;
  value3: string | null;
  value4: string | null;
  /** @format date-time */
  actualReadingDate: string;
  /** @format date-time */
  uploadTime: string;
  /** @format date-time */
  entryDate: string;
  source: EIndividualDeviceReadingsSource;
  user: OrganizationUserShortResponse | null;
}

export interface IndividualDeviceReadingsYearHistoryResponse {
  /** @format int32 */
  year: number;
  monthReadings: IndividualDeviceReadingsMonthHistoryResponse[] | null;
}

export interface IndividualDeviceResponse {
  /** @format int32 */
  id: number;
  model: string | null;
  serialNumber: string | null;
  sealNumber: string | null;
  /** @format date-time */
  sealInstallationDate: string | null;
  /** @format int32 */
  managementFirmId: number | null;
  /** @format date-time */
  lastCheckingDate: string | null;
  /** @format date-time */
  futureCheckingDate: string | null;
  /** @format date-time */
  openingDate: string | null;
  /** @format date-time */
  closingDate: string | null;
  closingReason: EClosingReason;
  hasActiveTasks: boolean | null;
  /** @format int32 */
  bitDepth: number | null;
  /** @format double */
  scaleFactor: number | null;
  address: FullAddressResponse | null;
  resource: EResourceType;
  /** @deprecated */
  mountPlace: string | null;
  deviceMountPlace: IndividualDeviceMountPlaceListResponse | null;
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
  connection: MeteringDeviceConnection | null;
  isConnected: boolean;
}

export interface IndividualDeviceResponseFromDevicePage {
  /** @format int32 */
  id?: number;
  model?: string | null;
  serialNumber?: string | null;
  resource?: EResourceType;
  /** @format date-time */
  closingDate?: string | null;
  mountPlace?: string | null;
  /** @format date-time */
  lastCheckingDate?: string;
  /** @format date-time */
  futureCheckingDate?: string;
  consumption?: IndividualDeviceConsumption | null;
  sealNumber?: string | null;
  /** @format date-time */
  sealInstallationDate?: string | null;
  /** @format int32 */
  bitDepth?: number | null;
}

export interface IndividualDeviceWithExpiredCheckingDateListResponse {
  devices: IndividualDeviceWithExpiredCheckingDateResponse[] | null;
}

export interface IndividualDeviceWithExpiredCheckingDateResponse {
  /** @format int32 */
  id: number;
  model: string | null;
  serialNumber: string | null;
  sealNumber: string | null;
  /** @format date-time */
  sealInstallationDate: string | null;
  /** @format int32 */
  managementFirmId: number | null;
  /** @format date-time */
  lastCheckingDate: string | null;
  /** @format date-time */
  futureCheckingDate: string | null;
  /** @format date-time */
  openingDate: string | null;
  /** @format date-time */
  closingDate: string | null;
  closingReason: EClosingReason;
  hasActiveTasks: boolean | null;
  /** @format int32 */
  bitDepth: number | null;
  /** @format double */
  scaleFactor: number | null;
  resource: EResourceType;
  rateType: EIndividualDeviceRateType;
}

export interface IndividualDevicesConstructedReportResponse {
  city: string | null;
  street: string | null;
  houseNumber: string | null;
  corpus: string | null;
  apartmentNumber: string | null;
  /** @format int32 */
  apartmentId: number;
  resource: EResourceType;
  serialNumber: string | null;
  model: string | null;
  invalidCheckingDatesOption: InvalidCheckingDatesConstructedReportResponse | null;
  closedDeviceOnOneOfRisersOption: ClosedDeviceOnOneOfRisersConstructedReportResponse | null;
  deviceCheckingDateExpirationOption: DeviceCheckingDateExpirationConstructedReportResponse | null;
  closedDevicesOption: ClosedDevicesConstructedReportResponse | null;
  invalidBitDepthOption: InvalidBitDepthConstructedReportResponse | null;
}

export interface InspectorCreateRequest {
  /** @minLength 1 */
  fullName: string;
}

export interface InspectorOnBuildingResponse {
  /** @format int32 */
  buildingId: number;
  street: string | null;
  corpus: string | null;
  number: string | null;
  /** @format uuid */
  houseManagementId: string | null;
  houseManagementName: string | null;
  /** @format int32 */
  inspectedDay: number | null;
  /** @format int32 */
  inspectorId: number | null;
}

export interface InspectorReassignAllAddressesRequest {
  /** @format int32 */
  newInspectorId?: number;
}

export interface InspectorResponse {
  /** @format int32 */
  id: number;
  fullName: string | null;
}

export interface InspectorResponsePagedList {
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
  items: InspectorResponse[] | null;
}

export interface InspectorUpdateRequest {
  fullName?: string | null;
}

export interface InspectorsConstructedReportResponse {
  name: string | null;
  /**
   * @deprecated
   * @format int32
   */
  dayPlan: number;
  counts: number[] | null;
}

export interface InvalidBitDepthConstructedReportResponse {
  /** @format int32 */
  deviceId: number;
  /** @format int32 */
  bitDepth: number | null;
  /** @format double */
  scaleFactor: number | null;
}

export interface InvalidCheckingDatesConstructedReportResponse {
  /** @format date-time */
  lastCheckingDate: string;
  /** @format date-time */
  futureCheckingDate: string;
}

export interface LastModifiedUserResponse {
  /** @format int32 */
  id: number;
  firstName: string | null;
  lastName: string | null;
}

export interface LoginRequest {
  /** @minLength 1 */
  email: string;
  /** @minLength 1 */
  password: string;
}

export interface LogoutRequest {
  /** @minLength 1 */
  token: string;
  /** @minLength 1 */
  refreshToken: string;
}

export interface ManagementFirmCompetenceResponse {
  /** @format uuid */
  id: string;
  title: string | null;
  relatedUsers: ManagementFirmCompetenceUserResponse[] | null;
}

export interface ManagementFirmCompetenceUserResponse {
  /** @format int32 */
  userId: number;
}

export interface ManagementFirmCompetencesListResponse {
  competences: ManagementFirmCompetenceResponse[] | null;
}

export interface ManagementFirmEventDataApartmentResponse {
  /** @format int32 */
  id: number;
  number: string | null;
}

export interface ManagementFirmEventDataChangingResponse {
  fieldName: string | null;
  oldValue: string | null;
  newValue: string | null;
}

export interface ManagementFirmEventDataDeviceResponse {
  /** @format int32 */
  id: number;
  serialNumber: string | null;
  model: string | null;
  resource: EResourceType;
}

export interface ManagementFirmEventDataElectricNodeResponse {
  /** @format int32 */
  id: number;
  title: string | null;
  resource: EResourceType;
}

export interface ManagementFirmEventDataHousingStockResponse {
  /** @format int32 */
  id: number;
  city: string | null;
  street: string | null;
  number: string | null;
  corpus: string | null;
}

export interface ManagementFirmEventDataIdResponse {
  id: string | null;
  name: string | null;
}

export interface ManagementFirmEventDataPipeNodeResponse {
  /** @format int32 */
  id: number;
  title: string | null;
  resource: EResourceType;
  /** @format int32 */
  entryNumber: number | null;
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

export interface ManagementFirmEventDataTaskResponse {
  /** @format int32 */
  id: number;
  title: string | null;
  type: EManagingFirmTaskType;
}

export interface ManagementFirmFiltersConfigurationResponse {
  hasHousingStockCorpuses: boolean;
  pipeDiameters: number[] | null;
}

export interface ManagementFirmLiteResponse {
  /** @format int32 */
  id: number;
  name: string | null;
  phoneNumber: string | null;
  information: string | null;
  email: string | null;
  workingTime: string | null;
}

export enum ManagingFirmTaskType {
  CalculatorMalfunction = 'CalculatorMalfunction',
  CalculatorMalfunctionNonCommercial = 'CalculatorMalfunctionNonCommercial',
  HousingDeviceMalfunction = 'HousingDeviceMalfunction',
  HousingDeviceMalfunctionNonCommercial = 'HousingDeviceMalfunctionNonCommercial',
  CalculatorLackOfConnection = 'CalculatorLackOfConnection',
  IndividualDeviceCheck = 'IndividualDeviceCheck',
  PipeRupture = 'PipeRupture',
  CurrentApplication = 'CurrentApplication',
  EmergencyApplication = 'EmergencyApplication',
  IndividualDeviceReadingsCheck = 'IndividualDeviceReadingsCheck',
  MeasurementErrorCommercial = 'MeasurementErrorCommercial',
  MeasurementErrorNonCommercial = 'MeasurementErrorNonCommercial',
  IndividualDeviceCheckNoReadings = 'IndividualDeviceCheckNoReadings',
  RiserNoReadings = 'RiserNoReadings',
  ResourceDisconnecting = 'ResourceDisconnecting',
  CurrentApplicationUnassigned = 'CurrentApplicationUnassigned',
  EmergencyApplicationUnassigned = 'EmergencyApplicationUnassigned',
  TemperatureNormativeDeviation = 'TemperatureNormativeDeviation',
}

export interface MeasurableIntervalResponse {
  /** @format double */
  maxValue: number | null;
  /** @format double */
  minValue: number | null;
  measurableUnit: string | null;
}

export interface MeteringDeviceConnection {
  ipV4?: string | null;
  /** @format int32 */
  port?: number | null;
  /** @format int32 */
  deviceAddress?: number | null;
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

export interface MeteringDeviceResponse {
  /** @format int32 */
  id: number;
  model: string | null;
  serialNumber: string | null;
  sealNumber: string | null;
  /** @format date-time */
  sealInstallationDate: string | null;
  /** @format int32 */
  managementFirmId: number | null;
  /** @format date-time */
  lastCheckingDate: string | null;
  /** @format date-time */
  futureCheckingDate: string | null;
  /** @format date-time */
  openingDate: string | null;
  /** @format date-time */
  closingDate: string | null;
  closingReason: EClosingReason;
  hasActiveTasks: boolean | null;
  /** @format int32 */
  bitDepth: number | null;
  /** @format double */
  scaleFactor: number | null;
  /** @format int32 */
  housingStockId: number | null;
  /** @format int32 */
  nodeId: number | null;
  /** @format int32 */
  diameter: number | null;
  connection: MeteringDeviceConnection | null;
  isConnected: boolean | null;
  type: string | null;
  typeName: string | null;
  resource: EResourceType | null;
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
  resource: EResourceType | null;
}

export interface NodeCheckResponse {
  /** @format int32 */
  id: number;
  /** @format date-time */
  checkingDate: string;
  checkType: ENodeCheckType;
  registryNumber: string | null;
  checkingAct: DocumentResponse | null;
}

export interface NodeCheckResponsePagedList {
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
  items: NodeCheckResponse[] | null;
}

export enum NodeCommercialAccountStatus {
  NotRegistered = 'NotRegistered',
  Registered = 'Registered',
  OnReview = 'OnReview',
  Prepared = 'Prepared',
}

export interface NodeCommercialStatusResponse {
  value: ENodeCommercialAccountStatus;
  description: string | null;
}

export interface NodeNetworkDeviceResponse {
  /** @format int32 */
  id: number;
  model: string | null;
  serialNumber: string | null;
  type: ENodeNetworkDeviceType;
  hasActiveTasks: boolean;
}

export interface NodeOnHousingStockResponse {
  /** @format int32 */
  id: number;
  title: string | null;
  /** @format int32 */
  entryNumber: number | null;
  status: ENodeCommercialAccountStatus;
  resource: EResourceType;
  type: ENodeType;
  pipeNodeValidationStatus: PipeNodeValidationStatusResponse | null;
  serviceZone: NodeServiceZoneResponse | null;
  networkDevice: NodeNetworkDeviceResponse | null;
}

export interface NodeServiceZoneListResponse {
  nodeServiceZones: NodeServiceZoneResponse[] | null;
}

export interface NodeServiceZoneRequest {
  name?: string | null;
}

export interface NodeServiceZoneResponse {
  /** @format int32 */
  id: number;
  name: string | null;
}

export interface NodeServiceZoneWithNodeCountResponse {
  /** @format int32 */
  id: number;
  name: string | null;
  /** @format int32 */
  nodeCount: number;
}

export interface NodeSetCommercialStatusRequest {
  commercialStatus?: ENodeCommercialAccountStatus;
  /** @format date-time */
  commercialAccountingDeregistrationDate?: string | null;
  /** @format date-time */
  commercialStatusChangingDate?: string | null;
  /** @format int32 */
  documentId?: number | null;
  /** @format date-time */
  startCommercialAccountingDate?: string | null;
  /** @format date-time */
  endCommercialAccountingDate?: string | null;
}

export interface NodeSetNotRegisteredRequest {
  /** @format int32 */
  documentId?: number | null;
  /** @format date-time */
  endCommercialAccountingDate?: string | null;
}

export interface NodeSetRegisteredRequest {
  /** @format int32 */
  documentId?: number;
  /** @format date-time */
  startCommercialAccountingDate?: string;
  /** @format date-time */
  endCommercialAccountingDate?: string;
}

export interface NodeSetRegistrationTypeRequest {
  registrationType?: ENodeRegistrationType;
  commercialStatusRequest?: NodeSetCommercialStatusRequest | null;
  technicalTypeRequest?: NodeSetTechnicalTypeRequest | null;
}

export interface NodeSetTechnicalTypeRequest {
  /** @format date-time */
  commercialAccountingDeregistrationDate?: string;
  /** @format int32 */
  documentId?: number | null;
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

export interface NonResidentialBuildingCreateRequest {
  mainAddress: BuildingAddressCreateRequest;
  otherAddresses?: BuildingAddressCreateRequest[] | null;
  /** @format uuid */
  heatingStationId: string;
  coordinates?: PointResponse | null;
  nonResidentialHouseType?: ENonResidentialHouseType | null;
  /** @format int32 */
  numberOfFloors?: number | null;
  isThereElevator?: boolean | null;
  consumer?: string | null;
  /**
   * @minLength 6
   * @maxLength 6
   */
  index?: string | null;
  city?: string | null;
  /**
   * @format int32
   * @min 1800
   * @max 2100
   */
  constructionYear?: number | null;
  /** @format double */
  houseArea?: number | null;
  /** @format double */
  totalArea?: number | null;
  hasIndividualHeatingStation?: boolean;
  /** @format uuid */
  fiasId?: string | null;
}

export interface NonResidentialBuildingResponse {
  /** @format int32 */
  id: number;
  /** @format int32 */
  managingFirmId: number;
  /** @format uuid */
  fiasId: string | null;
  consumer: string | null;
  index: string | null;
  coordinates: PointResponse | null;
  houseTypeString: string | null;
  /** @format int32 */
  numberOfFloors: number | null;
  isThereElevator: boolean | null;
  /** @format double */
  houseArea: number | null;
  /** @format double */
  totalArea: number | null;
  hasIndividualHeatingStation: boolean;
  heatingStation: HeatingStationShortResponse | null;
  managementFirmName: string | null;
  managementFirmInfo: string | null;
  /** @format int32 */
  inspectorId: number | null;
  /** @format int32 */
  inspectedDay: number | null;
  address: BuildingAddressResponse | null;
  /** @format int32 */
  numberOfTasks: number;
  /** @format int32 */
  constructionYear: number | null;
}

export interface NonResidentialBuildingUpdateRequest {
  /** @format uuid */
  heatingStationId?: string | null;
  hasIndividualHeatingStation?: boolean | null;
  coordinates?: PointResponse | null;
  /** @format int32 */
  numberOfFloors?: number | null;
  isThereElevator?: boolean | null;
  consumer?: string | null;
  /**
   * @minLength 6
   * @maxLength 6
   */
  index?: string | null;
  /**
   * @format int32
   * @min 1800
   * @max 2100
   */
  constructionYear?: number | null;
  /** @format double */
  houseArea?: number | null;
  /** @format double */
  totalArea?: number | null;
  /** @format uuid */
  fiasId?: string | null;
}

export interface NumberIdResponse {
  /** @format int32 */
  id: number;
  number: string | null;
}

export interface OperatorsConstructedReportResponse {
  name: string | null;
  /** @format int32 */
  hotWaterSupplyCount: number;
  /** @format int32 */
  coldWaterSupplyCount: number;
  /** @format int32 */
  electricityCount: number;
  /** @format int32 */
  heatCount: number;
}

export enum OrderByRule {
  Ascending = 'Ascending',
  Descending = 'Descending',
}

export interface OrganizationAddressResponse {
  city: string | null;
  street: string | null;
  houseNumber: string | null;
  corpus: string | null;
}

export interface OrganizationResponse {
  /** @format int32 */
  id: number;
  name: string | null;
  legalName: string | null;
  phoneNumber: string | null;
  information: string | null;
  email: string | null;
  inn: string | null;
  workingTime: string | null;
  address: OrganizationAddressResponse | null;
  filtersConfiguration: ManagementFirmFiltersConfigurationResponse | null;
  platformConfiguration: PlatformConfigurationResponse | null;
  /** @format double */
  latitude: number | null;
  /** @format double */
  longitude: number | null;
  type: OrganizationType;
}

export interface OrganizationResponsePagedList {
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
  items: OrganizationResponse[] | null;
}

export enum OrganizationType {
  ManagementFirm = 'ManagementFirm',
  CallCenter = 'CallCenter',
  ControllerFirm = 'ControllerFirm',
  HeadManagement = 'HeadManagement',
}

export interface OrganizationUpdateRequest {
  name?: string | null;
  city?: string | null;
  street?: string | null;
  houseNumber?: string | null;
  corpus?: string | null;
  email?: string | null;
  phoneNumber?: string | null;
}

export interface OrganizationUserCreateRequest {
  /** @format email */
  email?: string | null;
  /** @minLength 2 */
  firstName?: string | null;
  lastName?: string | null;
  middleName?: string | null;
  cellphone?: string | null;
  department?: string | null;
  position?: string | null;
  number?: string | null;
  password?: string | null;
  roleTypes?: ESecuredIdentityRoleName[] | null;
  competenceIds?: string[] | null;
  housingStockIds?: number[] | null;
}

export interface OrganizationUserEventResponse {
  title: string | null;
  eventType: EManagementFirmEventType;
  /** @format date-time */
  eventTime: string;
  data: ManagementFirmEventDataResponse | null;
}

export interface OrganizationUserListResponse {
  /** @format int32 */
  id: number;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  middleName: string | null;
  cellphone: string | null;
  /** @format int32 */
  executingTaskCount: number;
  status: UserStatusResponse | null;
  roles: ESecuredIdentityRoleNameStringDictionaryItem[] | null;
}

export interface OrganizationUserListResponsePagedList {
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
  items: OrganizationUserListResponse[] | null;
}

export interface OrganizationUserResponse {
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
  status: UserStatusResponse | null;
  competences: UserCompetenceResponse[] | null;
  roles: ESecuredIdentityRoleNameStringDictionaryItem[] | null;
  buildings: BuildingShortResponse[] | null;
}

export interface OrganizationUserShortResponse {
  /** @format int32 */
  id: number;
  name: string | null;
  email: string | null;
}

export interface OrganizationUserStatisticsResponse {
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
  events: OrganizationUserEventResponse[] | null;
}

export interface OrganizationUserTaskReassignment {
  role?: ESecuredIdentityRoleName;
  /** @format int32 */
  userId?: number;
}

export interface OrganizationUserUpdateRequest {
  /** @minLength 2 */
  firstName?: string | null;
  lastName?: string | null;
  middleName?: string | null;
  cellphone?: string | null;
  department?: string | null;
  position?: string | null;
  number?: string | null;
  roleTypes?: ESecuredIdentityRoleName[] | null;
  competenceIds?: string[] | null;
  housingStockIds?: number[] | null;
}

export interface OrganizationUserWorkingStatusResponse {
  type: EOrganizationUserWorkingStatusType;
  /** @format date-time */
  startDate: string | null;
  /** @format date-time */
  endDate: string | null;
}

export interface PingDeviceResponse {
  status: IPStatus;
  description: string | null;
}

export interface PipeHousingMeteringDeviceConnectionResponse {
  hub: PipeHousingMeteringDeviceHubConnectionResponse | null;
  /** @format int32 */
  calculatorId: number | null;
  /**
   * @deprecated
   * @format int32
   */
  nodeId: number | null;
  node: PipeHousingMeteringDeviceNodeResponse | null;
  calculatorSerialNumber: string | null;
  calculatorModel: string | null;
  /** @format date-time */
  lastCheckingDate: string | null;
  /** @format date-time */
  futureCheckingDate: string | null;
  isActive: boolean | null;
  calculatorConnection: MeteringDeviceConnection | null;
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
  model: string | null;
  serialNumber: string | null;
  sealNumber: string | null;
  /** @format date-time */
  sealInstallationDate: string | null;
  managementFirm: OrganizationResponse | null;
  /** @format date-time */
  lastCheckingDate: string | null;
  /** @format date-time */
  futureCheckingDate: string | null;
  /** @format date-time */
  closingDate: string | null;
  closingReason: EClosingReason;
  hasActiveTasks: boolean;
  /** @format int32 */
  bitDepth: number | null;
  /** @format double */
  scaleFactor: number | null;
  resource: EResourceType;
  housingMeteringDeviceType: EHousingMeteringDeviceType;
  hub: PipeHousingMeteringDeviceHubConnectionResponse | null;
  diameter: string | null;
}

export interface PipeHousingMeteringDeviceNodeResponse {
  /** @format int32 */
  id: number;
  title: string | null;
}

export interface PipeHousingMeteringDeviceResponse {
  /** @format int32 */
  id: number;
  model: string | null;
  serialNumber: string | null;
  sealNumber: string | null;
  /** @format date-time */
  sealInstallationDate: string | null;
  /** @format int32 */
  managementFirmId: number | null;
  /** @format date-time */
  lastCheckingDate: string | null;
  /** @format date-time */
  futureCheckingDate: string | null;
  /** @format date-time */
  openingDate: string | null;
  /** @format date-time */
  closingDate: string | null;
  closingReason: EClosingReason;
  hasActiveTasks: boolean | null;
  /** @format int32 */
  bitDepth: number | null;
  /** @format double */
  scaleFactor: number | null;
  resource: EResourceType;
  housingMeteringDeviceType: EHousingMeteringDeviceType;
  address: BuildingShortResponse | null;
  comment: HousingMeteringDeviceCommentResponse | null;
  /** @format int32 */
  diameter: number | null;
  communicationPipe: CommunicationPipeLiteResponse | null;
  hubConnection: PipeHousingMeteringDeviceConnectionResponse | null;
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

export interface PipeNodeIntoCalculatorResponse {
  /** @format int32 */
  id: number;
  title: string | null;
  /** @format int32 */
  entryNumber: number | null;
  commercialStatus: NodeCommercialStatusResponse | null;
  resource: EResourceType;
  nodeServiceZone: NodeServiceZoneResponse | null;
  heatingSeason: PipeNodeHeatingSeasonListResponse | null;
  /** @format date-time */
  lastCommercialAccountingDate: string | null;
  /** @format date-time */
  futureCommercialAccountingDate: string | null;
  communicationPipes: CommunicationPipeResponse[] | null;
  validationResult: PipeNodeValidationResultResponse | null;
}

export interface PipeNodeMeteringDeviceResponse {
  /** @format int32 */
  id: number;
  model: string | null;
  serialNumber: string | null;
  hasActiveTasks: boolean;
  /** @format int32 */
  pipeNumber: number;
  magistral: EMagistralType;
}

export interface PipeNodeResponse {
  /** @format int32 */
  id: number;
  title: string | null;
  registrationType: ENodeRegistrationType;
  commercialStatus: NodeCommercialStatusResponse | null;
  resource: EResourceType;
  nodeServiceZone: NodeServiceZoneResponse | null;
  /** @format date-time */
  lastCommercialAccountingDate: string | null;
  /** @format date-time */
  futureCommercialAccountingDate: string | null;
  /** @format date-time */
  commercialAccountingDeregistrationDate: string | null;
  /** @format int32 */
  buildingId: number;
  address: BuildingShortResponse | null;
  documents: DocumentLiteResponse[] | null;
  heatingSeason: PipeNodeHeatingSeasonListResponse | null;
  /** @format int32 */
  calculatorId: number | null;
  calculator: CalculatorIntoNodeResponse | null;
  configuration: EPipeNodeConfig;
  /** @format int32 */
  entryNumber: number | null;
  communicationPipes: CommunicationPipeResponse[] | null;
  validationResult: PipeNodeValidationResultResponse | null;
  /** @format int32 */
  numberOfTasks: number;
}

export interface PipeNodeValidationResultResponse {
  errors: EPipeNodeValidationMessageStringDictionaryItem[] | null;
  warnings: EPipeNodeValidationMessageStringDictionaryItem[] | null;
}

export interface PipeNodeValidationStatusResponse {
  configuration: EPipeNodeConfig;
  validationResult: PipeNodeValidationResultResponse | null;
}

export interface PlatformConfigurationResponse {
  featureToggles: FeatureTogglesResponse | null;
  defaultCity: string | null;
}

export interface PointResponse {
  /** @format double */
  latitude: number;
  /** @format double */
  longitude: number;
}

export enum PollActionType {
  DuplicateReadings = 'DuplicateReadings',
  IndividualCreateTasksWithoutReadings = 'IndividualCreateTasksWithoutReadings',
  IndividualCloseWithoutReadings = 'IndividualCloseWithoutReadings',
  IndividualCloseByCheckDate = 'IndividualCloseByCheckDate',
  HousingCloseByCheckDate = 'HousingCloseByCheckDate',
  IndividualExport = 'IndividualExport',
  HousingExport = 'HousingExport',
  MilurExport = 'MilurExport',
  OpenIndividualDevicesReport = 'OpenIndividualDevicesReport',
  RunnersReports = 'RunnersReports',
}

export enum PollCommand {
  GetById = 'GetById',
  GetLast = 'GetLast',
  Create = 'Create',
}

export interface PollResponse {
  /** @format int32 */
  id: number;
  /** @format date-time */
  createdAt: string;
  /** @format int32 */
  userId: number;
  /** @format int32 */
  organizationId: number;
  status: EPollState;
  /** @format date-time */
  runningAt: string | null;
  /** @format date-time */
  doneAt: string | null;
  actionType: PollActionType;
  hasFile: boolean;
  errorMessage: string | null;
}

export interface PollResponsePagedList {
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
  items: PollResponse[] | null;
}

export interface ProblemDetails {
  type?: string | null;
  title?: string | null;
  /** @format int32 */
  status?: number | null;
  detail?: string | null;
  instance?: string | null;
  [key: string]: any;
}

export interface ReassignTasksRequest {
  taskIds?: number[] | null;
  /** @format int32 */
  newPerpetratorId?: number;
}

export interface RefreshResponse {
  token: string | null;
  refreshToken: string | null;
  permissions: string[] | null;
  maintenanceMessage: string | null;
}

export interface RefreshTokenRequest {
  /** @minLength 1 */
  token: string;
  /** @minLength 1 */
  refreshToken: string;
}

export interface ReplacementAccount {
  /** @format uuid */
  id?: string;
  personalAccountNumber?: string | null;
  /** @format date-time */
  openAt?: string;
  /** @format date-time */
  openAtFact?: string;
}

export interface ReportDataModel {
  columns?: ReportHeader[] | null;
  rows?: ReportEntry[] | null;
}

export interface ReportEntry {
  dateTimeText?: string | null;
  /** @format date-time */
  dateTime?: string;
  values?: ReportEntryValue[] | null;
}

export interface ReportEntryValue {
  text?: string | null;
  /** @format double */
  doubleValue?: number | null;
}

export enum ReportFormat {
  Consumption = 'Consumption',
  Rso = 'Rso',
  Undersupply = 'Undersupply',
  RsoWithUndersupply = 'RsoWithUndersupply',
}

export interface ReportHeader {
  text?: string | null;
  group?: string | null;
}

export interface ReportRequestHistoryPagedList {
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
  items: ReportRequestHistoryResponse[] | null;
  /** @format int32 */
  totalActualReports: number | null;
  /** @format int32 */
  totalDeprecatedReports: number | null;
  /** @format int32 */
  totalReports: number | null;
}

export interface ReportRequestHistoryResponse {
  /** @format int32 */
  id: number;
  /** @format int32 */
  userId: number;
  /** @format date-time */
  timeStamp: string;
  reportName: EReportName;
  reportNameText: string | null;
  parameters: Record<string, string>;
  isActual: boolean;
}

export enum ReportType {
  None = 'None',
  Hourly = 'Hourly',
  Daily = 'Daily',
  Monthly = 'Monthly',
  Total = 'Total',
  Current = 'Current',
  TotalCurrent = 'TotalCurrent',
  Events = 'Events',
  Settings = 'Settings',
  Other = 'Other',
}

export interface ResourceDisconnectingCreateRequest {
  resource: EResourceType;
  /** @minLength 1 */
  sender: string;
  /** @format uuid */
  heatingStationId?: string | null;
  disconnectingType: EResourceDisconnectingType;
  housingStockIds: number[];
  /** @format date-time */
  startDate: string;
  /** @format date-time */
  endDate?: string | null;
  /** @format int32 */
  documentId?: number | null;
}

export interface ResourceDisconnectingFilterResponse {
  disconnectingTypes:
    | EResourceDisconnectingTypeNullableStringDictionaryItem[]
    | null;
  resourceTypes: EResourceTypeNullableStringDictionaryItem[] | null;
  cities: string[] | null;
}

export interface ResourceDisconnectingResponse {
  /** @format uuid */
  id: string;
  resource: EResourceType;
  disconnectingType: ResourceDisconnectingTypeResponse | null;
  /** @format date-time */
  startDate: string;
  /** @format date-time */
  endDate: string | null;
  sender: string | null;
  heatingStation: HeatingStationShortResponse | null;
  /** @format int32 */
  managementFirmId: number;
  buildings: BuildingShortResponse[] | null;
  document: DocumentResponse | null;
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

export interface ResourceDisconnectingTypeResponse {
  value: EResourceDisconnectingType;
  description: string | null;
}

export interface ResourceDisconnectingUpdateRequest {
  disconnectingType?: EResourceDisconnectingType | null;
  housingStockIds: number[];
  /** @format date-time */
  startDate: string;
  /** @format date-time */
  endDate?: string | null;
  sender?: string | null;
  /** @format int32 */
  documentId?: number | null;
}

export enum ResourceType {
  Heat = 'Heat',
  HotWaterSupply = 'HotWaterSupply',
  ColdWaterSupply = 'ColdWaterSupply',
  Electricity = 'Electricity',
  None = 'None',
}

export interface SendGroupReportRequest {
  /**
   * @format email
   * @minLength 1
   */
  email: string;
  report: ComposeGroupReportRequest;
}

export interface SetMagneticSealRequest {
  /** @format date-time */
  magneticSealInstallationDate?: string | null;
  magneticSealTypeName?: string | null;
  isInstalled?: boolean;
}

export interface StageEmailNotifyRequest {
  contractorsIds?: number[] | null;
  message?: string | null;
}

export interface StageListResponse {
  /** @format int32 */
  id: number;
  /** @format int32 */
  number: number;
  name: string | null;
  hint: string | null;
  perpetrator: OrganizationUserShortResponse | null;
  status: EStageStatus;
  type: EStageType;
  /** @format date-time */
  closingTime: string | null;
  /** @format date-time */
  expectedCompletionTime: string | null;
  requiredUserRoles: string[] | null;
}

export interface StageListResponseWrappedListResponse {
  items: StageListResponse[] | null;
}

export interface StagePushRequest {
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
  resourceDisconnecting?: ResourceDisconnectingCreateRequest | null;
  readings?: IndividualDeviceReadingsCreateRequest[] | null;
  fixedReading?: IndividualDeviceReadingsCreateRequest | null;
  /** @format date-time */
  apartmentCheckDate?: string | null;
  taskConfirmation?: TaskConfirmationRequest | null;
  /** @format date-time */
  applicationPostponeDate?: string | null;
  /** @maxLength 1024 */
  comment?: string | null;
}

export interface StageResponse {
  /** @format int32 */
  id: number;
  potentialNextStageIds: number[] | null;
  name: string | null;
  perpetrator: OrganizationUserShortResponse | null;
  status: EStageStatus;
  actions: EStageActionType[] | null;
  additionalActions: EStageActionType[] | null;
  allowedDocumentTypes: EDocumentType[] | null;
  /** @format date-time */
  closingTime: string | null;
  /** @format date-time */
  startingTime: string | null;
  /** @format date-time */
  expectedCompletionTime: string | null;
  timeStatus: EStageTimeStatus;
  /** @format double */
  timeProgress: number;
  isEntryPoint: boolean;
}

export interface StageRevertRequest {
  /** @maxLength 1024 */
  comment?: string | null;
}

export enum StatusType {
  All = 'All',
  Closed = 'Closed',
  NotClosed = 'NotClosed',
}

export interface StreetWithBuildingNumbersResponse {
  street: string | null;
  addresses: AddressShortResponse[] | null;
}

export interface StreetWithBuildingNumbersResponsePagedList {
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
  items: StreetWithBuildingNumbersResponse[] | null;
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

export interface SubscriberStatisticsСonsumptionResponse {
  apartmentNumber: string | null;
  /** @format double */
  coldWaterSupplyConsumption: number | null;
  /** @format double */
  hotWaterSupplyConsumption: number | null;
  /**
   * @deprecated
   * @format double
   */
  electricitySupplyConsumption: number | null;
  /** @format double */
  electricityConsumption: number | null;
  /** @format double */
  heatConsumption: number | null;
  /** @format date-time */
  dateLastTransmissionOfReading: string;
  /** @format date-time */
  dateLastCheck: string | null;
  lastCheckComment: string | null;
  /** @format int32 */
  housingStockId: number;
  /** @format int32 */
  apartmentId: number;
  homeownerAccountFullName: string | null;
  homeownerAccountPhoneNumbers: string[] | null;
  /** @deprecated */
  homeownerAccountPhoneNumber: string | null;
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
  openingDate?: string | null;
  /** @format int32 */
  contractorId?: number | null;
  oldDeviceClosingReason?: EClosingReason;
  /** @format int32 */
  calculatorInfoId?: number | null;
  connection?: MeteringDeviceConnection | null;
}

export interface SwitchElectricHousingDeviceRequest {
  /** @format int32 */
  deviceId: number;
  /** @minLength 1 */
  model: string;
  /** @minLength 1 */
  serialNumber: string;
  /** @format int32 */
  bitDepth: number;
  /** @format double */
  scaleFactor: number;
  /** @format date-time */
  openingDate: string;
  /** @format int32 */
  manufactureYear: number;
  stateVerificationQuarter?: EYearQuarter | null;
  /** @format int32 */
  stateVerificationYear?: number | null;
  /** @format int32 */
  nextStateVerificationYear?: number | null;
  /** @format int32 */
  stateVerificationIntervalYears: number;
  oldDeviceClosingReason?: EClosingReason;
  sealNumber?: string | null;
  /** @format date-time */
  sealInstallationDate?: string | null;
  /** @format date-time */
  lastCheckingDate?: string | null;
  /** @format date-time */
  futureCheckingDate?: string | null;
  /** @format int32 */
  contractorId?: number | null;
  oldDeviceReadings?: SwitchHousingDeviceReadingsCreateRequest[] | null;
  newDeviceReadings: SwitchHousingDeviceReadingsCreateRequest[];
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

export interface SwitchHousingDeviceReadingsCreateRequest {
  /** @format date-time */
  readingDate: string;
  /** @format double */
  value: number;
  /** @format double */
  nonResidentialRoomConsumption?: number | null;
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
  openingDate?: string | null;
  /** @format int32 */
  contractorId?: number | null;
  oldDeviceClosingReason?: EClosingReason;
  /** @format int32 */
  bitDepth?: number | null;
  /** @format double */
  scaleFactor?: number | null;
  model?: string | null;
}

export interface SwitchIndividualDeviceReadingsCreateRequest {
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
}

export interface SwitchIndividualDeviceRequest {
  /** @minLength 1 */
  model: string;
  /** @minLength 1 */
  serialNumber: string;
  /**
   * @format int32
   * @min 4
   * @max 10
   */
  bitDepth: number;
  rateType: EIndividualDeviceRateType;
  /** @format date-time */
  lastCheckingDate: string;
  /** @format date-time */
  futureCheckingDate: string;
  sealNumber?: string | null;
  /** @format date-time */
  sealInstallationDate?: string | null;
  /** @format date-time */
  openingDate?: string | null;
  isConnected?: boolean;
  documentsIds?: number[] | null;
  isPolling?: boolean;
  /** @format int32 */
  contractorId?: number | null;
  connection?: MeteringDeviceConnection | null;
  /** @format double */
  scaleFactor: number;
  oldDeviceClosingReason?: ESwitchingReason;
  /** @format int32 */
  newDeviceMountPlaceId?: number | null;
  oldDeviceReadings?: SwitchIndividualDeviceReadingsCreateRequest[] | null;
  newDeviceReadings: SwitchIndividualDeviceReadingsCreateRequest[];
}

export interface SwitchMagneticSealRequest {
  /** @format date-time */
  magneticSealInstallationDate?: string | null;
  magneticSealTypeName?: string | null;
}

export interface TaskCloseStatusModel {
  /** @format int32 */
  id?: number;
  isSuccess?: boolean;
  errorDescription?: string | null;
}

export interface TaskCommentRequest {
  comment?: string | null;
}

export interface TaskCommentResponse {
  /** @format int32 */
  id: number;
  text: string | null;
  author: string | null;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string | null;
  canBeEdited: boolean;
}

export interface TaskConfirmationRequest {
  /** @minLength 1 */
  type: string;
  comment?: string | null;
}

export interface TaskConfirmationResponse {
  type: ETaskConfirmationType;
  description: string | null;
  comment: string | null;
}

export interface TaskCreateRequest {
  targetObject?: TaskCreationTargetObject | null;
  creationReason?: string | null;
  taskType?: ETaskCreateType;
  /** @format date-time */
  activationTriggerDateTimeUtc?: string | null;
  /** @format uuid */
  activationTriggerGuid?: string | null;
}

export interface TaskCreateResponse {
  /** @format int32 */
  id: number;
  type: EManagingFirmTaskType;
}

export interface TaskCreationTargetObject {
  type?: ETaskTargetObjectRequestType;
  /** @format int32 */
  id?: number;
}

export interface TaskFilterResponse {
  taskTypes: EManagingFirmTaskFilterTypeNullableStringDictionaryItem[] | null;
  closingStatuses: ETaskClosingStatusNullableStringDictionaryItem[] | null;
}

export enum TaskGroupingFilter {
  Executing = 'Executing',
  Observing = 'Observing',
  NotArchived = 'NotArchived',
  Archived = 'Archived',
  Revertable = 'Revertable',
}

export interface TaskListAddress {
  buildingNumber?: string | null;
  corpus?: string | null;
  street?: string | null;
  city?: string | null;
  apartmentNumber?: string | null;
}

export interface TaskListResponse {
  /** @format int32 */
  id: number;
  name: string | null;
  type: EManagingFirmTaskType;
  creationReason: string | null;
  /** @format date-time */
  creationTime: string | null;
  /** @format date-time */
  expectedCompletionTime: string | null;
  /** @format date-time */
  closingTime: string | null;
  closingStatus: ETaskClosingStatus | null;
  currentStage: StageResponse | null;
  address: TaskListAddress | null;
  targetObject: TaskTargetObjectResponse | null;
  taskConfirmation: TaskConfirmationResponse | null;
}

export enum TaskPaginationOrderRule {
  CreationTime = 'CreationTime',
  ConfirmationTime = 'ConfirmationTime',
  TimeStatus = 'TimeStatus',
}

export interface TaskResponse {
  /** @format int32 */
  id: number;
  name: string | null;
  type: EManagingFirmTaskType;
  creationReason: string | null;
  address: string | null;
  /** @format int32 */
  buildingId: number;
  houseCategory: EHouseCategory;
  isPerpetrator: boolean;
  perpetrator: OrganizationUserShortResponse | null;
  /** @format date-time */
  creationTime: string | null;
  /** @format date-time */
  expectedCompletionTime: string | null;
  /** @format date-time */
  closingTime: string | null;
  closingStatus: ETaskClosingStatus | null;
  userOperatingStatus: string | null;
  currentStage: StageResponse | null;
  device: MeteringDeviceResponse | null;
  apartment: ApartmentResponse | null;
  pipeNode: PipeNodeResponse | null;
  pipeNodeDevices: MeteringDeviceResponse[] | null;
  individualDevices: IndividualDeviceOnTaskResponse[] | null;
  documents: DocumentResponse[] | null;
  comments: TaskCommentResponse[] | null;
  stages: StageListResponse[] | null;
  taskConfirmation: TaskConfirmationResponse | null;
  allowableConfirmationTypes:
    | ETaskConfirmationTypeStringDictionaryItem[]
    | null;
  buildingCoordinates: PointResponse | null;
  canBeReverted: boolean;
  isApplicationTask: boolean;
  /** @format date-time */
  firstTrigger: string;
  /** @format date-time */
  lastTrigger: string | null;
}

export interface TaskShortResponse {
  /** @format int32 */
  id: number;
  type: EManagingFirmTaskType;
  typeString: string | null;
  creationReason: string | null;
  /** @format date-time */
  creationDate: string;
  targetObject: ETaskTargetObjectType;
  resourceTypes: EResourceType[] | null;
  executor: OrganizationUserShortResponse | null;
  apartmentNumber: string | null;
}

export interface TaskStatisticsItem {
  /** @format int32 */
  id?: number;
  isEmergency?: boolean;
  isClosed?: boolean;
  creationReason?: string | null;
  /** @format date-time */
  creationTime?: string;
  /** @format date-time */
  firstTriggerTime?: string;
  /** @format date-time */
  lastTriggerTime?: string | null;
}

export interface TaskStatisticsResponse {
  tasks: DateTimeTaskStatisticsItemArrayDictionaryItem[] | null;
}

export interface TaskTargetObjectResponse {
  targetObjectInfo: ETaskTargetObjectInfo;
  title: string | null;
  model: string | null;
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
  /** @format int32 */
  activeTasksCount: number | null;
  /** @format int32 */
  runningOutTasksCount: number | null;
  /** @format int32 */
  expiredTasksCount: number | null;
}

export interface TemperatureNormativeDeleteRequest {
  outdoorTemperatures?: number[] | null;
  all?: boolean;
}

export interface TemperatureNormativeResponse {
  /** @format int32 */
  upTemperatureDeviationPercentLimit: number;
  /** @format int32 */
  downTemperatureDeviationPercentLimit: number;
  rows: TemperatureNormativeRow[] | null;
}

export interface TemperatureNormativeRow {
  /** @format int32 */
  outdoorTemperature?: number;
  /** @format double */
  dayFeedFlowTemperature?: number;
  /** @format double */
  nightFeedFlowTemperature?: number;
  /** @format double */
  dayFeedBackFlowTemperature?: number;
  /** @format double */
  nightFeedBackFlowTemperature?: number;
  /** @format double */
  heatFeedFlowTemperature?: number;
}

export interface TemperatureNormativeRowUpdate {
  /** @format int32 */
  outdoorTemperature: number;
  /** @format double */
  dayFeedFlowTemperature: number;
  /** @format double */
  nightFeedFlowTemperature: number;
  /** @format double */
  dayFeedBackFlowTemperature: number;
  /** @format double */
  nightFeedBackFlowTemperature: number;
  /** @format double */
  heatFeedFlowTemperature: number;
}

export interface TemperatureNormativeUpdateRequest {
  /** @format int32 */
  upTemperatureDeviationPercentLimit?: number | null;
  /** @format int32 */
  downTemperatureDeviationPercentLimit?: number | null;
  updateRows?: TemperatureNormativeRowUpdate[] | null;
}

export interface TokenResponse {
  token: string | null;
  refreshToken: string | null;
  roles: string[] | null;
  permissions: string[] | null;
  maintenanceMessage: string | null;
}

export interface TotalAppointmentCounterResponse {
  /** @format date-time */
  date: string;
  /** @format int32 */
  distributed: number;
  /** @format int32 */
  notDistributed: number;
  districtIds: string[] | null;
}

export interface UpdateApartmentActRequest {
  actType?: EActType | null;
  registryNumber?: string | null;
  actResourceType?: EActResourceType | null;
  /** @format date-time */
  actJobDate?: string | null;
  /** @format int32 */
  apartmentId?: number | null;
  /** @format int32 */
  documentId?: number | null;
  comment?: string | null;
}

export interface UpdateCalculatorRequest {
  serialNumber?: string | null;
  isConnected?: boolean | null;
  connection?: MeteringDeviceConnection | null;
  /** @format date-time */
  lastCheckingDate?: string | null;
  /** @format date-time */
  futureCheckingDate?: string | null;
}

export interface UpdateCommunicationPipeRequest {
  /** @format int32 */
  communicationPipeId?: number;
  /** @format int32 */
  number?: number | null;
  /** @format int32 */
  diameter?: number | null;
}

export interface UpdateElectricHousingMeteringDeviceRequest {
  serialNumber?: string | null;
  sealNumber?: string | null;
  /** @format date-time */
  sealInstallationDate?: string | null;
  /** @format int32 */
  bitDepth?: number | null;
  /** @format double */
  scaleFactor?: number | null;
  /** @format date-time */
  lastCheckingDate?: string | null;
  /** @format date-time */
  futureCheckingDate?: string | null;
  housingMeteringDeviceType?: EHousingMeteringDeviceType | null;
  resource?: EResourceType | null;
  model?: string | null;
  /** @format date-time */
  installationDate?: string | null;
  /** @format int32 */
  manufactureYear?: number | null;
  /** @format int32 */
  stateVerificationYear?: number | null;
  stateVerificationQuarter?: EYearQuarter | null;
  /** @format int32 */
  stateVerificationIntervalYears?: number | null;
  /** @format int32 */
  nextStateVerificationYear?: number | null;
  phaseNumber?: EPhaseNumberType | null;
}

export interface UpdateElectricNodeRequest {
  title?: string | null;
  /** @format int32 */
  nodeServiceZoneId?: number | null;
  locationName?: string | null;
}

export interface UpdateGroupReportConfigurationRequest {
  /** @format int32 */
  id?: number;
  reportConfigurationDetails: GroupReportConfigurationDetailsRequest;
  report: ComposeGroupReportRequest;
}

export interface UpdateHeatingStationRequest {
  name?: string | null;
  isThermalChamber?: boolean;
}

export interface UpdateHouseManagementRequest {
  phone?: string | null;
  comment?: string | null;
}

export interface UpdateHousingMeteringDeviceReadingsRequest {
  /** @format uuid */
  id?: string;
  /** @format double */
  nonResidentialRoomConsumption?: number;
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
  /** @format date-time */
  lastCheckingDate?: string | null;
  /** @format date-time */
  futureCheckingDate?: string | null;
  model?: string | null;
  /** @format int32 */
  mountPlaceId?: number | null;
  resource?: EResourceType | null;
  isPolling?: boolean | null;
  /** @format int32 */
  contractorId?: number | null;
  connection?: MeteringDeviceConnection | null;
  isConnected?: boolean;
  /** @format date-time */
  closingDate?: string | null;
}

export interface UpdateIndividualDeviceSealRequest {
  /** @minLength 1 */
  serialNumber: string;
  /** @minLength 1 */
  sealNumber: string;
  /** @format date-time */
  sealInstallationDate: string;
}

export interface UpdateInspectorOnBuildingRequest {
  /** @format int32 */
  inspectorId: number;
  /** @format int32 */
  inspectedDay?: number | null;
}

export interface UpdateNodeCheckRequest {
  /** @format date-time */
  checkingDate?: string | null;
  checkType?: ENodeCheckType | null;
  /** @format int32 */
  documentId?: number | null;
  registryNumber?: string | null;
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
  /** @format date-time */
  lastCheckingDate?: string | null;
  /** @format date-time */
  futureCheckingDate?: string | null;
  housingMeteringDeviceType?: EHousingMeteringDeviceType | null;
  resource?: EResourceType | null;
  model?: string | null;
  /** @format int32 */
  communicationPipeId?: number;
}

export interface UpdatePipeNodeRequest {
  title?: string | null;
  /** @format int32 */
  nodeServiceZoneId?: number | null;
  communicationPipes?: UpdateCommunicationPipeRequest[] | null;
  /** @format int32 */
  entryNumber?: number | null;
  /** @format int32 */
  calculatorId?: number | null;
  disconnectFromCalculator?: boolean;
}

export interface UserCompetenceResponse {
  /** @format uuid */
  id: string;
  title: string | null;
}

export interface UserStatusResponse {
  title: string | null;
  type: EOrganizationUserWorkingStatusType;
  /** @format date-time */
  startDate: string | null;
  /** @format date-time */
  endDate: string | null;
}

export interface ValueNodeWorkingRangeListResponse {
  nodeWorkingRangeType: ENodeWorkingRangeType;
  measureUnit: string | null;
  relationType: EValueNodeWorkingRangeRelation;
  /** @format float */
  min: number | null;
  /** @format float */
  max: number | null;
}

export interface ValueNodeWorkingRangeResponse {
  season: ENodeWorkingRangeSeason;
  nodeResourceType: EResourceType;
  nodeWorkingRangeType: ENodeWorkingRangeType;
  measureUnit: string | null;
  /** @format float */
  min: number | null;
  /** @format float */
  max: number | null;
}

export enum YearRangeType {
  FirstHalf = 'FirstHalf',
  SecondHalf = 'SecondHalf',
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
 * @title Transparent Management Api
 * @version 1.0
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li>
     *
     * @tags ApartmentActs
     * @name ApartmentActsList
     * @summary ApartmentActRead
     * @request GET:/api/ApartmentActs
     * @secure
     */
    apartmentActsList: (
      query?: {
        City?: string;
        Street?: string;
        HousingStockNumber?: string;
        Corpus?: string;
        /** @format int32 */
        ApartmentId?: number;
        ApartmentNumber?: string;
        ActTypes?: EActType[];
        ActResourceTypes?: EActResourceType[];
        ActDateOrderBy?: EOrderByRule;
        ActJobDateOrderBy?: EOrderByRule;
        RegistryNumberOrderBy?: EOrderByRule;
        AddressOrderBy?: EOrderByRule;
        /** @format int32 */
        PageNumber?: number;
        /** @format int32 */
        PageSize?: number;
        OrderBy?: EOrderByRule;
      },
      params: RequestParams = {},
    ) =>
      this.request<ApartmentActResponsePagedList, ErrorApiResponse>({
        path: `/api/ApartmentActs`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Администратор УК без назначений задач</li>
     *
     * @tags ApartmentActs
     * @name ApartmentActsCreate
     * @summary ApartmentActCreate
     * @request POST:/api/ApartmentActs
     * @secure
     */
    apartmentActsCreate: (
      data: AddApartmentActRequest,
      params: RequestParams = {},
    ) =>
      this.request<ApartmentActResponse, ErrorApiResponse>({
        path: `/api/ApartmentActs`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Администратор УК без назначений задач</li>
     *
     * @tags ApartmentActs
     * @name ApartmentActsUpdate
     * @summary ApartmentActEdit
     * @request PUT:/api/ApartmentActs/{actId}
     * @secure
     */
    apartmentActsUpdate: (
      actId: number,
      data: UpdateApartmentActRequest,
      params: RequestParams = {},
    ) =>
      this.request<ApartmentActResponse, ErrorApiResponse>({
        path: `/api/ApartmentActs/${actId}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Администратор УК без назначений задач</li>
     *
     * @tags ApartmentActs
     * @name ApartmentActsDelete
     * @summary ApartmentActRemove
     * @request DELETE:/api/ApartmentActs/{actId}
     * @secure
     */
    apartmentActsDelete: (actId: number, params: RequestParams = {}) =>
      this.request<ApartmentActResponse, ErrorApiResponse>({
        path: `/api/ApartmentActs/${actId}`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Администратор УК без назначений задач</li>
     *
     * @tags ApartmentActs
     * @name ApartmentActsDeleteDocumentCreate
     * @summary ApartmentActEdit
     * @request POST:/api/ApartmentActs/{actId}/DeleteDocument
     * @secure
     */
    apartmentActsDeleteDocumentCreate: (
      actId: number,
      params: RequestParams = {},
    ) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/ApartmentActs/${actId}/DeleteDocument`,
        method: 'POST',
        secure: true,
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li>
     *
     * @tags ApartmentActs
     * @name ApartmentActsActTypesList
     * @summary ApartmentActRead
     * @request GET:/api/ApartmentActs/ActTypes
     * @secure
     */
    apartmentActsActTypesList: (params: RequestParams = {}) =>
      this.request<EActTypeStringDictionaryItem[], ErrorApiResponse>({
        path: `/api/ApartmentActs/ActTypes`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li>
     *
     * @tags ApartmentActs
     * @name ApartmentActsActResourceTypesList
     * @summary ApartmentActRead
     * @request GET:/api/ApartmentActs/ActResourceTypes
     * @secure
     */
    apartmentActsActResourceTypesList: (params: RequestParams = {}) =>
      this.request<EActResourceTypeStringDictionaryItem[], ErrorApiResponse>({
        path: `/api/ApartmentActs/ActResourceTypes`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags Apartments
     * @name ApartmentsCreate
     * @summary ApartmentCreate
     * @request POST:/api/Apartments
     * @secure
     */
    apartmentsCreate: (
      data: ApartmentCreateRequest,
      params: RequestParams = {},
    ) =>
      this.request<ApartmentResponse, ErrorApiResponse>({
        path: `/api/Apartments`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Контролёр</li>
     *
     * @tags Apartments
     * @name ApartmentsList
     * @summary ApartmentsRead
     * @request GET:/api/Apartments
     * @secure
     */
    apartmentsList: (
      query?: {
        City?: string;
        Street?: string;
        HousingStockNumber?: string;
        Corpus?: string;
        ApartmentNumber?: string;
        /** @format int32 */
        HousingStockId?: number;
        Question?: string;
        IndividualDeviceSerialNumber?: string;
        /** @format int32 */
        PageNumber?: number;
        /** @format int32 */
        PageSize?: number;
        OrderBy?: EOrderByRule;
      },
      params: RequestParams = {},
    ) =>
      this.request<ApartmentListResponsePagedList, ErrorApiResponse>({
        path: `/api/Apartments`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Старший оператор</li><li>Оператор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags Apartments
     * @name ApartmentsUpdate
     * @summary ApartmentUpdate
     * @request PUT:/api/Apartments/{apartmentId}
     * @secure
     */
    apartmentsUpdate: (
      apartmentId: number,
      data: ApartmentUpdateRequest,
      params: RequestParams = {},
    ) =>
      this.request<ApartmentResponse, ErrorApiResponse>({
        path: `/api/Apartments/${apartmentId}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Контролёр</li>
     *
     * @tags Apartments
     * @name ApartmentsDetail
     * @summary ApartmentsRead
     * @request GET:/api/Apartments/{apartmentId}
     * @secure
     */
    apartmentsDetail: (apartmentId: number, params: RequestParams = {}) =>
      this.request<ApartmentResponse, ErrorApiResponse>({
        path: `/api/Apartments/${apartmentId}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Контролёр</li>
     *
     * @tags Apartments
     * @name ApartmentsApartmentStatusList
     * @summary ApartmentsRead
     * @request GET:/api/Apartments/ApartmentStatus
     * @secure
     */
    apartmentsApartmentStatusList: (params: RequestParams = {}) =>
      this.request<ApartmentListStatusResponse, ErrorApiResponse>({
        path: `/api/Apartments/ApartmentStatus`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Контролёр</li>
     *
     * @tags Apartments
     * @name ApartmentsHomeownerAccountsDetail
     * @summary HomeownersRead
     * @request GET:/api/Apartments/{apartmentId}/HomeownerAccounts
     * @secure
     */
    apartmentsHomeownerAccountsDetail: (
      apartmentId: number,
      query?: {
        IsClosed?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<HomeownerAccountResponse[], ErrorApiResponse>({
        path: `/api/Apartments/${apartmentId}/HomeownerAccounts`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Контролёр</li>
     *
     * @tags Apartments
     * @name ApartmentsHomeownerAccountNamesDetail
     * @summary HomeownersRead
     * @request GET:/api/Apartments/{apartmentId}/HomeownerAccountNames
     * @secure
     */
    apartmentsHomeownerAccountNamesDetail: (
      apartmentId: number,
      query?: {
        /** @default false */
        isAlsoClosed?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<HomeownerAccountNameResponse[], ErrorApiResponse>({
        path: `/api/Apartments/${apartmentId}/HomeownerAccountNames`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Контролёр</li>
     *
     * @tags Apartments
     * @name ApartmentsApartmentChecksDetail
     * @summary ApartmentsRead
     * @request GET:/api/Apartments/{apartmentId}/ApartmentChecks
     * @secure
     */
    apartmentsApartmentChecksDetail: (
      apartmentId: number,
      query?: {
        /** @format int32 */
        PageNumber?: number;
        /** @format int32 */
        PageSize?: number;
        OrderBy?: EOrderByRule;
      },
      params: RequestParams = {},
    ) =>
      this.request<ApartmentCheckResponsePagedList, ErrorApiResponse>({
        path: `/api/Apartments/${apartmentId}/ApartmentChecks`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Контролёр</li>
     *
     * @tags Apartments
     * @name ApartmentsActsDetail
     * @summary ApartmentsRead
     * @request GET:/api/Apartments/{apartmentId}/Acts
     * @secure
     */
    apartmentsActsDetail: (apartmentId: number, params: RequestParams = {}) =>
      this.request<ApartmentCheckResponse[], ErrorApiResponse>({
        path: `/api/Apartments/${apartmentId}/Acts`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Старший оператор</li><li>Оператор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags Apartments
     * @name ApartmentsSetStatusProblemDevicesDetail
     * @summary ApartmentsStatusPatch
     * @request GET:/api/Apartments/{apartmentId}/SetStatusProblemDevices
     * @secure
     */
    apartmentsSetStatusProblemDevicesDetail: (
      apartmentId: number,
      query: {
        Status: EApartmentStatus;
        /** @format date-time */
        FromDate?: string;
        /** @format date-time */
        ToDate?: string;
        DocumentIds?: number[];
      },
      params: RequestParams = {},
    ) =>
      this.request<
        IndividualDeviceWithExpiredCheckingDateListResponse,
        ErrorApiResponse
      >({
        path: `/api/Apartments/${apartmentId}/SetStatusProblemDevices`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Старший оператор</li><li>Оператор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags Apartments
     * @name ApartmentsSetStatusPartialUpdate
     * @summary ApartmentsStatusPatch
     * @request PATCH:/api/Apartments/{apartmentId}/SetStatus
     * @secure
     */
    apartmentsSetStatusPartialUpdate: (
      apartmentId: number,
      data: ApartmentStatusSetRequest,
      params: RequestParams = {},
    ) =>
      this.request<
        IndividualDeviceWithExpiredCheckingDateListResponse,
        ErrorApiResponse
      >({
        path: `/api/Apartments/${apartmentId}/SetStatus`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Администратор УК без назначений задач</li><li>Контролёр</li>
     *
     * @tags Apartments
     * @name ApartmentsAddCheckCreate
     * @summary ApartmentCheckCreate
     * @request POST:/api/Apartments/{apartmentId}/AddCheck
     * @secure
     */
    apartmentsAddCheckCreate: (
      apartmentId: number,
      data: CreateApartmentCheckRequest,
      params: RequestParams = {},
    ) =>
      this.request<ApartmentCheckResponse, ErrorApiResponse>({
        path: `/api/Apartments/${apartmentId}/AddCheck`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Администратор УК без назначений задач</li><li>Контролёр</li>
     *
     * @tags Apartments
     * @name ApartmentsEditCheckUpdate
     * @summary ApartmentCheckEdit
     * @request PUT:/api/Apartments/{apartmentId}/EditCheck/{apartmentCheckId}
     * @secure
     */
    apartmentsEditCheckUpdate: (
      apartmentId: number,
      apartmentCheckId: number,
      data: EditApartmentCheckRequest,
      params: RequestParams = {},
    ) =>
      this.request<ApartmentCheckResponse, ErrorApiResponse>({
        path: `/api/Apartments/${apartmentId}/EditCheck/${apartmentCheckId}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Администратор УК без назначений задач</li><li>Контролёр</li>
     *
     * @tags Apartments
     * @name ApartmentsRemoveCheckDelete
     * @summary ApartmentCheckRemove
     * @request DELETE:/api/Apartments/{apartmentId}/RemoveCheck/{apartmentCheckId}
     * @secure
     */
    apartmentsRemoveCheckDelete: (
      apartmentId: number,
      apartmentCheckId: number,
      params: RequestParams = {},
    ) =>
      this.request<ApartmentCheckResponse, ErrorApiResponse>({
        path: `/api/Apartments/${apartmentId}/RemoveCheck/${apartmentCheckId}`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Администратор УК без назначений задач</li><li>Контролёр</li><li>Супервайзер</li>
     *
     * @tags Apartments
     * @name ApartmentsDocumentsDetail
     * @summary DocumentsRead
     * @request GET:/api/Apartments/{apartmentId}/Documents
     * @secure
     */
    apartmentsDocumentsDetail: (
      apartmentId: number,
      params: RequestParams = {},
    ) =>
      this.request<DocumentResponse[], ErrorApiResponse>({
        path: `/api/Apartments/${apartmentId}/Documents`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Старший оператор</li><li>Оператор</li>
     *
     * @tags Apartments
     * @name ApartmentsDuplicateReadingsCreate
     * @summary IndividualDeviceReadingsCreate
     * @request POST:/api/Apartments/DuplicateReadings
     * @secure
     */
    apartmentsDuplicateReadingsCreate: (
      query?: {
        Command?: PollCommand;
        /** @format int32 */
        PollId?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<PollResponse, ErrorApiResponse>({
        path: `/api/Apartments/DuplicateReadings`,
        method: 'POST',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Контролёр</li>
     *
     * @tags Apartments
     * @name ApartmentsFindApartmentIdList
     * @summary ApartmentsRead
     * @request GET:/api/Apartments/FindApartmentId
     * @secure
     */
    apartmentsFindApartmentIdList: (
      query: {
        City: string;
        Street: string;
        HousingNumber: string;
        HousingCorpus?: string;
        ApartmentNumber: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<number, ErrorApiResponse>({
        path: `/api/Apartments/FindApartmentId`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Контролёр</li>
     *
     * @tags Apartments
     * @name ApartmentsCheckTypesList
     * @summary ApartmentsRead
     * @request GET:/api/Apartments/CheckTypes
     * @secure
     */
    apartmentsCheckTypesList: (params: RequestParams = {}) =>
      this.request<ECheckTypeStringDictionaryItem[], ErrorApiResponse>({
        path: `/api/Apartments/CheckTypes`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Старший оператор</li><li>Оператор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags Appointments
     * @name IndividualSealAppointmentsList
     * @summary IndividualSealRead
     * @request GET:/api/IndividualSeal/Appointments
     * @secure
     */
    individualSealAppointmentsList: (
      query: {
        /** @format int32 */
        ApartmentId?: number;
        /** @format uuid */
        districtFilterDistrictId: string;
        /** @format date-time */
        districtFilterDate: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<AppointmentResponse[], ErrorApiResponse>({
        path: `/api/IndividualSeal/Appointments`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Старший оператор</li><li>Оператор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags Appointments
     * @name IndividualSealAppointmentsCreate
     * @summary IndividualSealReadWrite
     * @request POST:/api/IndividualSeal/Appointments
     * @secure
     */
    individualSealAppointmentsCreate: (
      data: AppointmentCreateRequest,
      params: RequestParams = {},
    ) =>
      this.request<string, ErrorApiResponse>({
        path: `/api/IndividualSeal/Appointments`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Старший оператор</li><li>Оператор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags Appointments
     * @name IndividualSealAppointmentsDetail
     * @summary IndividualSealRead
     * @request GET:/api/IndividualSeal/Appointments/{appointmentId}
     * @secure
     */
    individualSealAppointmentsDetail: (
      appointmentId: string,
      params: RequestParams = {},
    ) =>
      this.request<AppointmentResponse, ErrorApiResponse>({
        path: `/api/IndividualSeal/Appointments/${appointmentId}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Старший оператор</li><li>Оператор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags Appointments
     * @name IndividualSealAppointmentsUpdate
     * @summary IndividualSealRead
     * @request PUT:/api/IndividualSeal/Appointments/{appointmentId}
     * @secure
     */
    individualSealAppointmentsUpdate: (
      appointmentId: string,
      data: AppointmentUpdateRequest,
      params: RequestParams = {},
    ) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/IndividualSeal/Appointments/${appointmentId}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Старший оператор</li><li>Оператор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags Appointments
     * @name IndividualSealAppointmentsDelete
     * @summary IndividualSealRead
     * @request DELETE:/api/IndividualSeal/Appointments/{appointmentId}
     * @secure
     */
    individualSealAppointmentsDelete: (
      appointmentId: string,
      params: RequestParams = {},
    ) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/IndividualSeal/Appointments/${appointmentId}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Старший оператор</li><li>Оператор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags Appointments
     * @name IndividualSealAppointmentsPlanningList
     * @summary IndividualSealRead
     * @request GET:/api/IndividualSeal/Appointments/Planning
     * @secure
     */
    individualSealAppointmentsPlanningList: (
      query: {
        /** @format uuid */
        districtId: string;
        /** @format date-time */
        from: string;
        /** @format date-time */
        to: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<AppointmentCounterResponse[], ErrorApiResponse>({
        path: `/api/IndividualSeal/Appointments/Planning`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Старший оператор</li><li>Оператор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags Appointments
     * @name IndividualSealAppointmentsNearestList
     * @summary IndividualSealRead
     * @request GET:/api/IndividualSeal/Appointments/Nearest
     * @secure
     */
    individualSealAppointmentsNearestList: (params: RequestParams = {}) =>
      this.request<TotalAppointmentCounterResponse, ErrorApiResponse>({
        path: `/api/IndividualSeal/Appointments/Nearest`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Старший оператор</li><li>Оператор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags Appointments
     * @name IndividualSealAppointmentsCountingList
     * @summary IndividualSealRead
     * @request GET:/api/IndividualSeal/Appointments/Counting
     * @secure
     */
    individualSealAppointmentsCountingList: (
      query: {
        /** @format uuid */
        districtId: string;
        /** @format date-time */
        date: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<AppointmentCounterResponse, ErrorApiResponse>({
        path: `/api/IndividualSeal/Appointments/Counting`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Старший оператор</li><li>Оператор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags Appointments
     * @name IndividualSealAppointmentsSetCreate
     * @summary IndividualSealReadWrite
     * @request POST:/api/IndividualSeal/Appointments/Set
     * @secure
     */
    individualSealAppointmentsSetCreate: (
      data: AppointmentsSetRequest,
      params: RequestParams = {},
    ) =>
      this.request<AppointmentsSetResponse, ErrorApiResponse>({
        path: `/api/IndividualSeal/Appointments/Set`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Старший оператор</li><li>Оператор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags Assignments
     * @name IndividualSealAssignmentsList
     * @summary IndividualSealRead
     * @request GET:/api/IndividualSeal/Assignments
     * @secure
     */
    individualSealAssignmentsList: (
      query: {
        /**
         * Начальная дата, включительно
         * @format date-time
         */
        from: string;
        /**
         * Конечная дата, включительно. Может не указываться
         * @format date-time
         */
        to?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<AssignmentResponse[], ErrorApiResponse>({
        path: `/api/IndividualSeal/Assignments`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Старший оператор</li><li>Оператор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags Assignments
     * @name IndividualSealAssignmentsDetail
     * @summary IndividualSealRead
     * @request GET:/api/IndividualSeal/Assignments/{assignmentId}
     * @secure
     */
    individualSealAssignmentsDetail: (
      assignmentId: string,
      params: RequestParams = {},
    ) =>
      this.request<AssignmentResponse, ErrorApiResponse | ProblemDetails>({
        path: `/api/IndividualSeal/Assignments/${assignmentId}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Старший оператор</li><li>Оператор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags Assignments
     * @name IndividualSealAssignmentsDelete
     * @summary IndividualSealReadWrite
     * @request DELETE:/api/IndividualSeal/Assignments/{assignmentId}
     * @secure
     */
    individualSealAssignmentsDelete: (
      assignmentId: string,
      params: RequestParams = {},
    ) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/IndividualSeal/Assignments/${assignmentId}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Старший оператор</li><li>Оператор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags Assignments
     * @name IndividualSealAssignmentsFileDetail
     * @summary IndividualSealRead
     * @request GET:/api/IndividualSeal/Assignments/{assignmentId}/File
     * @secure
     */
    individualSealAssignmentsFileDetail: (
      assignmentId: string,
      params: RequestParams = {},
    ) =>
      this.request<void, ErrorApiResponse | ProblemDetails>({
        path: `/api/IndividualSeal/Assignments/${assignmentId}/File`,
        method: 'GET',
        secure: true,
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
      this.request<TokenResponse, ErrorApiResponse>({
        path: `/api/Auth/login`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
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
    authRefreshTokenCreate: (
      data: RefreshTokenRequest,
      params: RequestParams = {},
    ) =>
      this.request<RefreshResponse, ErrorApiResponse>({
        path: `/api/Auth/refreshToken`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
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
      this.request<void, ErrorApiResponse>({
        path: `/api/Auth/logout`,
        method: 'POST',
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
        method: 'POST',
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
    authResetPasswordCreate: (data: string, params: RequestParams = {}) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/Auth/resetPassword`,
        method: 'POST',
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
    authChangePasswordCreate: (
      data: ConfirmRequest,
      params: RequestParams = {},
    ) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/Auth/changePassword`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Контролёр</li><li>Супервайзер</li>
     *
     * @tags Buildings
     * @name BuildingsDetail
     * @summary HousingStocksRead
     * @request GET:/api/Buildings/{buildingId}
     * @secure
     */
    buildingsDetail: (buildingId: number, params: RequestParams = {}) =>
      this.request<BuildingShortResponse, ErrorApiResponse>({
        path: `/api/Buildings/${buildingId}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Контролёр</li><li>Супервайзер</li>
     *
     * @tags Buildings
     * @name BuildingsExistingCitiesList
     * @summary HousingStocksRead
     * @request GET:/api/Buildings/ExistingCities
     * @secure
     */
    buildingsExistingCitiesList: (
      query?: {
        City?: string;
        /** @format int32 */
        PageNumber?: number;
        /** @format int32 */
        PageSize?: number;
        OrderBy?: EOrderByRule;
      },
      params: RequestParams = {},
    ) =>
      this.request<StringPagedList, ErrorApiResponse>({
        path: `/api/Buildings/ExistingCities`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Контролёр</li><li>Супервайзер</li>
     *
     * @tags Buildings
     * @name BuildingsExistingStreetsList
     * @summary HousingStocksRead
     * @request GET:/api/Buildings/ExistingStreets
     * @secure
     */
    buildingsExistingStreetsList: (
      query: {
        City: string;
        Street?: string;
        /** @format int32 */
        PageNumber?: number;
        /** @format int32 */
        PageSize?: number;
        OrderBy?: EOrderByRule;
      },
      params: RequestParams = {},
    ) =>
      this.request<StringPagedList, ErrorApiResponse>({
        path: `/api/Buildings/ExistingStreets`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Контролёр</li><li>Супервайзер</li>
     *
     * @tags Buildings
     * @name BuildingsExistingBuildingNumbersList
     * @summary HousingStocksRead
     * @request GET:/api/Buildings/ExistingBuildingNumbers
     * @secure
     */
    buildingsExistingBuildingNumbersList: (
      query: {
        city: string;
        street: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<NumberIdResponse[], ErrorApiResponse>({
        path: `/api/Buildings/ExistingBuildingNumbers`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Контролёр</li><li>Супервайзер</li>
     *
     * @tags Buildings
     * @name BuildingsExistingStreetsWithBuildingNumbersList
     * @summary HousingStocksRead
     * @request GET:/api/Buildings/ExistingStreetsWithBuildingNumbers
     * @secure
     */
    buildingsExistingStreetsWithBuildingNumbersList: (
      query: {
        City: string;
        Street?: string;
        /** @format int32 */
        PageNumber?: number;
        /** @format int32 */
        PageSize?: number;
        OrderBy?: EOrderByRule;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        StreetWithBuildingNumbersResponsePagedList,
        ErrorApiResponse
      >({
        path: `/api/Buildings/ExistingStreetsWithBuildingNumbers`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Контролёр</li><li>Супервайзер</li>
     *
     * @tags Buildings
     * @name BuildingsExistingStreetsWithBuildingNumbersWithHouseManagementList
     * @summary HousingStocksRead
     * @request GET:/api/Buildings/ExistingStreetsWithBuildingNumbersWithHouseManagement
     * @secure
     */
    buildingsExistingStreetsWithBuildingNumbersWithHouseManagementList: (
      query?: {
        city?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<HouseManagementWithStreetsResponse[], ErrorApiResponse>({
        path: `/api/Buildings/ExistingStreetsWithBuildingNumbersWithHouseManagement`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Контролёр</li><li>Супервайзер</li>
     *
     * @tags Buildings
     * @name BuildingsExistingStreetsWithBuildingNumbersWithHeatingStationList
     * @summary HousingStocksRead
     * @request GET:/api/Buildings/ExistingStreetsWithBuildingNumbersWithHeatingStation
     * @secure
     */
    buildingsExistingStreetsWithBuildingNumbersWithHeatingStationList: (
      params: RequestParams = {},
    ) =>
      this.request<HeatingStationWithStreetsResponse[], ErrorApiResponse>({
        path: `/api/Buildings/ExistingStreetsWithBuildingNumbersWithHeatingStation`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Контролёр</li><li>Супервайзер</li>
     *
     * @tags Buildings
     * @name BuildingsLiteList
     * @summary HousingStocksRead
     * @request GET:/api/Buildings/Lite
     * @secure
     */
    buildingsLiteList: (
      query?: {
        OrderRule?: EHousingStockOrderRule;
        City?: string;
        Street?: string;
        BuildingNumber?: string;
        Corpus?: string;
        /** @format uuid */
        HeatingStationId?: string;
        /** @format double */
        totalAreaMaxValue?: number;
        /** @format double */
        totalAreaMinValue?: number;
        totalAreaMeasurableUnit?: string;
        /** @format uuid */
        HouseManagementId?: string;
        HouseCategory?: EHouseCategory;
        /** @format int32 */
        ManagementFirmId?: number;
        /** @format int32 */
        PageNumber?: number;
        /** @format int32 */
        PageSize?: number;
        OrderBy?: EOrderByRule;
      },
      params: RequestParams = {},
    ) =>
      this.request<BuildingWithCoordinatesResponsePagedList, ErrorApiResponse>({
        path: `/api/Buildings/Lite`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Контролёр</li><li>Супервайзер</li>
     *
     * @tags Buildings
     * @name BuildingsList
     * @summary HousingStocksRead
     * @request GET:/api/Buildings
     * @secure
     */
    buildingsList: (
      query?: {
        OrderRule?: EHousingStockOrderRule;
        City?: string;
        Street?: string;
        BuildingNumber?: string;
        Corpus?: string;
        /** @format uuid */
        HeatingStationId?: string;
        /** @format double */
        totalAreaMaxValue?: number;
        /** @format double */
        totalAreaMinValue?: number;
        totalAreaMeasurableUnit?: string;
        /** @format uuid */
        HouseManagementId?: string;
        HouseCategory?: EHouseCategory;
        /** @format int32 */
        ManagementFirmId?: number;
        /** @format int32 */
        PageNumber?: number;
        /** @format int32 */
        PageSize?: number;
        OrderBy?: EOrderByRule;
      },
      params: RequestParams = {},
    ) =>
      this.request<BuildingListResponsePagedList, ErrorApiResponse>({
        path: `/api/Buildings`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Контролёр</li><li>Супервайзер</li>
     *
     * @tags Buildings
     * @name BuildingsInspectorsList
     * @summary HousingStocksRead
     * @request GET:/api/Buildings/inspectors
     * @secure
     */
    buildingsInspectorsList: (
      query?: {
        City?: string;
        Street?: string;
        BuildingNumber?: string;
        HouseManagementName?: string;
        /** @format int32 */
        InspectorId?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<InspectorOnBuildingResponse[], ErrorApiResponse>({
        path: `/api/Buildings/inspectors`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Старший оператор</li><li>Оператор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags Buildings
     * @name BuildingsInspectorPartialUpdate
     * @summary HousingStocksUpdate
     * @request PATCH:/api/Buildings/{buildingId}/inspector
     * @secure
     */
    buildingsInspectorPartialUpdate: (
      buildingId: number,
      data: UpdateInspectorOnBuildingRequest,
      params: RequestParams = {},
    ) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/Buildings/${buildingId}/inspector`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Старший оператор</li><li>Оператор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags Buildings
     * @name BuildingsInspectorDelete
     * @summary HousingStocksUpdate
     * @request DELETE:/api/Buildings/{buildingId}/inspector
     * @secure
     */
    buildingsInspectorDelete: (
      buildingId: number,
      params: RequestParams = {},
    ) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/Buildings/${buildingId}/inspector`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Контролёр</li><li>Супервайзер</li>
     *
     * @tags Buildings
     * @name BuildingsFiltersList
     * @summary HousingStocksRead
     * @request GET:/api/Buildings/filters
     * @secure
     */
    buildingsFiltersList: (params: RequestParams = {}) =>
      this.request<BuildingFiltersResponse, ErrorApiResponse>({
        path: `/api/Buildings/filters`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Контролёр</li><li>Супервайзер</li>
     *
     * @tags Buildings
     * @name BuildingsControllerDetail
     * @summary HousingStocksRead
     * @request GET:/api/Buildings/{buildingId}/Controller
     * @secure
     */
    buildingsControllerDetail: (
      buildingId: number,
      params: RequestParams = {},
    ) =>
      this.request<OrganizationUserShortResponse, ErrorApiResponse>({
        path: `/api/Buildings/${buildingId}/Controller`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Старший оператор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags Buildings
     * @name BuildingsReassignControllerCreate
     * @summary ControllerUpdate
     * @request POST:/api/Buildings/{buildingId}/ReassignController/{controllerId}
     * @secure
     */
    buildingsReassignControllerCreate: (
      buildingId: number,
      controllerId: number,
      params: RequestParams = {},
    ) =>
      this.request<OrganizationUserShortResponse, ErrorApiResponse>({
        path: `/api/Buildings/${buildingId}/ReassignController/${controllerId}`,
        method: 'POST',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags Buildings
     * @name BuildingsAddressesCreate
     * @summary HousingStocksCreate
     * @request POST:/api/Buildings/{buildingId}/Addresses
     * @secure
     */
    buildingsAddressesCreate: (
      buildingId: number,
      data: BuildingAddressCreateRequest,
      params: RequestParams = {},
    ) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/Buildings/${buildingId}/Addresses`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Старший оператор</li><li>Оператор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags Buildings
     * @name BuildingsAddressesUpdate
     * @summary HousingStocksUpdate
     * @request PUT:/api/Buildings/{buildingId}/Addresses/{addressId}
     * @secure
     */
    buildingsAddressesUpdate: (
      buildingId: number,
      addressId: number,
      data: BuildingAddressUpdateRequest,
      params: RequestParams = {},
    ) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/Buildings/${buildingId}/Addresses/${addressId}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Старший оператор</li><li>Оператор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags Buildings
     * @name BuildingsAddressesDelete
     * @summary HousingStocksUpdate
     * @request DELETE:/api/Buildings/{buildingId}/Addresses/{addressId}
     * @secure
     */
    buildingsAddressesDelete: (
      buildingId: number,
      addressId: number,
      params: RequestParams = {},
    ) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/Buildings/${buildingId}/Addresses/${addressId}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Контролёр</li><li>Супервайзер</li>
     *
     * @tags Buildings
     * @name BuildingsNodesDetail
     * @summary HousingStocksRead
     * @request GET:/api/Buildings/{buildingId}/Nodes
     * @secure
     */
    buildingsNodesDetail: (buildingId: number, params: RequestParams = {}) =>
      this.request<NodeOnHousingStockResponse[], ErrorApiResponse>({
        path: `/api/Buildings/${buildingId}/Nodes`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Контролёр</li><li>Супервайзер</li>
     *
     * @tags Buildings
     * @name BuildingsCalculatorsDetail
     * @summary MeteringDevicesRead
     * @request GET:/api/Buildings/{buildingId}/Calculators
     * @secure
     */
    buildingsCalculatorsDetail: (
      buildingId: number,
      params: RequestParams = {},
    ) =>
      this.request<CalculatorIntoHousingStockResponse[], ErrorApiResponse>({
        path: `/api/Buildings/${buildingId}/Calculators`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Контролёр</li><li>Супервайзер</li>
     *
     * @tags Buildings
     * @name BuildingsBuildingsWithTasksList
     * @summary HousingStocksRead
     * @request GET:/api/Buildings/BuildingsWithTasks
     * @secure
     */
    buildingsBuildingsWithTasksList: (
      query?: {
        EngineeringElement?: ETaskEngineeringElement;
        ResourceTypes?: EResourceType[];
        TimeStatus?: EStageTimeStatus;
        TaskType?: EManagingFirmTaskFilterType;
        /** @format int32 */
        ExecutorId?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<BuildingWithTasksResponse[], ErrorApiResponse>({
        path: `/api/Buildings/BuildingsWithTasks`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Контролёр</li><li>Супервайзер</li>
     *
     * @tags Buildings
     * @name BuildingsBuildingsByAddressList
     * @summary MeteringDevicesRead
     * @request GET:/api/Buildings/BuildingsByAddress
     * @secure
     */
    buildingsBuildingsByAddressList: (
      query: {
        City: string;
        Street: string;
        Number: string;
        Corpus?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<BuildingByFilterResponse, ErrorApiResponse>({
        path: `/api/Buildings/BuildingsByAddress`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Наблюдатель УК</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Супервайзер</li>
     *
     * @tags CalculatorInfos
     * @name CalculatorInfosList
     * @summary CalculatorInfoRead
     * @request GET:/api/CalculatorInfos
     * @secure
     */
    calculatorInfosList: (params: RequestParams = {}) =>
      this.request<CalculatorInfoListWrappedResponse, ErrorApiResponse>({
        path: `/api/CalculatorInfos`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Контролёр</li><li>Супервайзер</li>
     *
     * @tags Calculators
     * @name CalculatorsExportLiteList
     * @summary MeteringDevicesRead
     * @request GET:/api/Calculators/ExportLite
     * @secure
     */
    calculatorsExportLiteList: (params: RequestParams = {}) =>
      this.request<File, ErrorApiResponse>({
        path: `/api/Calculators/ExportLite`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Контролёр</li><li>Супервайзер</li>
     *
     * @tags Calculators
     * @name CalculatorsExportList
     * @summary MeteringDevicesRead
     * @request GET:/api/Calculators/Export
     * @secure
     */
    calculatorsExportList: (
      query?: {
        filterPipeDiameters?: number[];
        filterExpiresCheckingDateAt?: EExpiresDateAt;
        filterExpiresAdmissionActDateAt?: EExpiresDateAt;
        filterResource?: EResourceType;
        filterModel?: string;
        /** @format date-time */
        filterCommercialDateRangeFrom?: string;
        /** @format date-time */
        filterCommercialDateRangeTo?: string;
        filterAddressCity?: string;
        filterAddressStreet?: string;
        filterAddressHousingStockNumber?: string;
        filterAddressCorpus?: string;
        filterAddressHouseCategory?: EHouseCategory;
        /**
         * @deprecated
         * @format int32
         */
        filterHousingStockId?: number;
        filterNodeStatus?: ENodeCommercialAccountStatus;
        filterNodeRegistrationType?: ENodeRegistrationType;
        filterConnectionStatus?: EConnectionStatusType;
        filterConnectionGroupType?: ECalculatorConnectionGroupType;
        Question?: string;
        OrderRule?: ECalculatorOrderRule;
        IsConnected?: boolean;
        CountTasks?: boolean;
        IsClosed?: boolean;
        FileName?: string;
        /** @format int32 */
        PageNumber?: number;
        /** @format int32 */
        PageSize?: number;
        OrderBy?: EOrderByRule;
      },
      params: RequestParams = {},
    ) =>
      this.request<File, ErrorApiResponse>({
        path: `/api/Calculators/Export`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Контролёр</li><li>Супервайзер</li>
     *
     * @tags Calculators
     * @name CalculatorsList
     * @summary MeteringDevicesRead
     * @request GET:/api/Calculators
     * @secure
     */
    calculatorsList: (
      query?: {
        filterPipeDiameters?: number[];
        filterExpiresCheckingDateAt?: EExpiresDateAt;
        filterExpiresAdmissionActDateAt?: EExpiresDateAt;
        filterResource?: EResourceType;
        filterModel?: string;
        /** @format date-time */
        filterCommercialDateRangeFrom?: string;
        /** @format date-time */
        filterCommercialDateRangeTo?: string;
        filterAddressCity?: string;
        filterAddressStreet?: string;
        filterAddressHousingStockNumber?: string;
        filterAddressCorpus?: string;
        filterAddressHouseCategory?: EHouseCategory;
        /**
         * @deprecated
         * @format int32
         */
        filterHousingStockId?: number;
        filterNodeStatus?: ENodeCommercialAccountStatus;
        filterNodeRegistrationType?: ENodeRegistrationType;
        filterConnectionStatus?: EConnectionStatusType;
        filterConnectionGroupType?: ECalculatorConnectionGroupType;
        Question?: string;
        OrderRule?: ECalculatorOrderRule;
        IsConnected?: boolean;
        CountTasks?: boolean;
        IsClosed?: boolean;
        FileName?: string;
        /** @format int32 */
        PageNumber?: number;
        /** @format int32 */
        PageSize?: number;
        OrderBy?: EOrderByRule;
      },
      params: RequestParams = {},
    ) =>
      this.request<CalculatorListResponsePagedList, ErrorApiResponse>({
        path: `/api/Calculators`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Администратор УК без назначений задач</li>
     *
     * @tags Calculators
     * @name CalculatorsCreate
     * @summary CalculatorCreate
     * @request POST:/api/Calculators
     * @secure
     */
    calculatorsCreate: (
      data: CreateCalculatorRequest,
      params: RequestParams = {},
    ) =>
      this.request<MeteringDeviceResponse, ErrorApiResponse>({
        path: `/api/Calculators`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Контролёр</li><li>Супервайзер</li>
     *
     * @tags Calculators
     * @name CalculatorsDetail
     * @summary MeteringDevicesRead
     * @request GET:/api/Calculators/{deviceId}
     * @secure
     */
    calculatorsDetail: (deviceId: number, params: RequestParams = {}) =>
      this.request<CalculatorResponse, ErrorApiResponse>({
        path: `/api/Calculators/${deviceId}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Администратор УК без назначений задач</li>
     *
     * @tags Calculators
     * @name CalculatorsUpdate
     * @summary CalculatorUpdate
     * @request PUT:/api/Calculators/{deviceId}
     * @secure
     */
    calculatorsUpdate: (
      deviceId: number,
      data: UpdateCalculatorRequest,
      params: RequestParams = {},
    ) =>
      this.request<MeteringDeviceResponse, ErrorApiResponse>({
        path: `/api/Calculators/${deviceId}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Администратор УК без назначений задач</li>
     *
     * @tags Calculators
     * @name CalculatorsCommentCreate
     * @summary CalculatorUpdate
     * @request POST:/api/Calculators/{deviceId}/comment
     * @secure
     */
    calculatorsCommentCreate: (
      deviceId: number,
      data: CalculatorCommentBaseRequest,
      params: RequestParams = {},
    ) =>
      this.request<CalculatorCommentResponse, ErrorApiResponse>({
        path: `/api/Calculators/${deviceId}/comment`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Администратор УК без назначений задач</li>
     *
     * @tags Calculators
     * @name CalculatorsCommentUpdate
     * @summary CalculatorUpdate
     * @request PUT:/api/Calculators/{deviceId}/comment
     * @secure
     */
    calculatorsCommentUpdate: (
      deviceId: number,
      data: CalculatorCommentBaseRequest,
      params: RequestParams = {},
    ) =>
      this.request<CalculatorCommentResponse, ErrorApiResponse>({
        path: `/api/Calculators/${deviceId}/comment`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Администратор УК без назначений задач</li>
     *
     * @tags Calculators
     * @name CalculatorsCommentDelete
     * @summary CalculatorUpdate
     * @request DELETE:/api/Calculators/{deviceId}/comment
     * @secure
     */
    calculatorsCommentDelete: (deviceId: number, params: RequestParams = {}) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/Calculators/${deviceId}/comment`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Администратор УК без назначений задач</li>
     *
     * @tags Calculators
     * @name CalculatorsSwitchCreate
     * @summary CalculatorSwitch
     * @request POST:/api/Calculators/switch
     * @secure
     */
    calculatorsSwitchCreate: (
      data: SwitchCalculatorRequest,
      params: RequestParams = {},
    ) =>
      this.request<MeteringDeviceResponse, ErrorApiResponse>({
        path: `/api/Calculators/switch`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Контролёр</li><li>Супервайзер</li>
     *
     * @tags Calculators
     * @name CalculatorsFiltersList
     * @summary MeteringDevicesRead
     * @request GET:/api/Calculators/filters
     * @secure
     */
    calculatorsFiltersList: (params: RequestParams = {}) =>
      this.request<CalculatorFilterResponse, ErrorApiResponse>({
        path: `/api/Calculators/filters`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Контролёр</li><li>Супервайзер</li>
     *
     * @tags Calculators
     * @name CalculatorsPingdeviceDetail
     * @summary MeteringDevicesRead
     * @request GET:/api/Calculators/pingdevice/{deviceId}
     * @secure
     */
    calculatorsPingdeviceDetail: (
      deviceId: number,
      query?: {
        /**
         * Время на опрос устройства(ms)
         * @format int32
         * @default 3000
         */
        timeout?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<PingDeviceResponse, ErrorApiResponse>({
        path: `/api/Calculators/pingdevice/${deviceId}`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Контролёр</li><li>Супервайзер</li>
     *
     * @tags CalculatorsStatistics
     * @name CalculatorsStatisticsList
     * @summary MeteringDevicesRead
     * @request GET:/api/CalculatorsStatistics
     * @secure
     */
    calculatorsStatisticsList: (
      query?: {
        filterPipeDiameters?: number[];
        filterExpiresCheckingDateAt?: EExpiresDateAt;
        filterExpiresAdmissionActDateAt?: EExpiresDateAt;
        filterResource?: EResourceType;
        filterModel?: string;
        /** @format date-time */
        filterCommercialDateRangeFrom?: string;
        /** @format date-time */
        filterCommercialDateRangeTo?: string;
        filterAddressCity?: string;
        filterAddressStreet?: string;
        filterAddressHousingStockNumber?: string;
        filterAddressCorpus?: string;
        filterAddressHouseCategory?: EHouseCategory;
        /**
         * @deprecated
         * @format int32
         */
        filterHousingStockId?: number;
        filterNodeStatus?: ENodeCommercialAccountStatus;
        filterNodeRegistrationType?: ENodeRegistrationType;
        filterConnectionStatus?: EConnectionStatusType;
        filterConnectionGroupType?: ECalculatorConnectionGroupType;
        Question?: string;
        OrderRule?: ECalculatorOrderRule;
        IsConnected?: boolean;
        CountTasks?: boolean;
        IsClosed?: boolean;
        FileName?: string;
        /** @format int32 */
        PageNumber?: number;
        /** @format int32 */
        PageSize?: number;
        OrderBy?: EOrderByRule;
      },
      params: RequestParams = {},
    ) =>
      this.request<CalculatorGroupedByConnectionResponse[], ErrorApiResponse>({
        path: `/api/CalculatorsStatistics`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Контролёр</li><li>Супервайзер</li>
     *
     * @tags CalculatorsStatistics
     * @name CalculatorsStatisticsExportList
     * @summary MeteringDevicesRead
     * @request GET:/api/CalculatorsStatistics/export
     * @secure
     */
    calculatorsStatisticsExportList: (
      query?: {
        filterPipeDiameters?: number[];
        filterExpiresCheckingDateAt?: EExpiresDateAt;
        filterExpiresAdmissionActDateAt?: EExpiresDateAt;
        filterResource?: EResourceType;
        filterModel?: string;
        /** @format date-time */
        filterCommercialDateRangeFrom?: string;
        /** @format date-time */
        filterCommercialDateRangeTo?: string;
        filterAddressCity?: string;
        filterAddressStreet?: string;
        filterAddressHousingStockNumber?: string;
        filterAddressCorpus?: string;
        filterAddressHouseCategory?: EHouseCategory;
        /**
         * @deprecated
         * @format int32
         */
        filterHousingStockId?: number;
        filterNodeStatus?: ENodeCommercialAccountStatus;
        filterNodeRegistrationType?: ENodeRegistrationType;
        filterConnectionStatus?: EConnectionStatusType;
        filterConnectionGroupType?: ECalculatorConnectionGroupType;
        Question?: string;
        OrderRule?: ECalculatorOrderRule;
        IsConnected?: boolean;
        CountTasks?: boolean;
        IsClosed?: boolean;
        FileName?: string;
        /** @format int32 */
        PageNumber?: number;
        /** @format int32 */
        PageSize?: number;
        OrderBy?: EOrderByRule;
      },
      params: RequestParams = {},
    ) =>
      this.request<File, ErrorApiResponse>({
        path: `/api/CalculatorsStatistics/export`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Channels
     * @name NotificationsChannelsList
     * @request GET:/api/Notifications/Channels
     * @secure
     */
    notificationsChannelsList: (params: RequestParams = {}) =>
      this.request<ChannelResponse[], ErrorApiResponse>({
        path: `/api/Notifications/Channels`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Channels
     * @name NotificationsChannelsConfirmCreate
     * @request POST:/api/Notifications/Channels/confirm
     * @secure
     */
    notificationsChannelsConfirmCreate: (
      data: ChannelConfirmRequest,
      params: RequestParams = {},
    ) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/Notifications/Channels/confirm`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Channels
     * @name NotificationsChannelsDelete
     * @request DELETE:/api/Notifications/Channels/{channelId}
     * @secure
     */
    notificationsChannelsDelete: (
      channelId: string,
      params: RequestParams = {},
    ) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/Notifications/Channels/${channelId}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Контролёр</li><li>Супервайзер</li>
     *
     * @tags Contractors
     * @name ContractorsList
     * @summary ContractorsRead
     * @request GET:/api/Contractors
     * @secure
     */
    contractorsList: (params: RequestParams = {}) =>
      this.request<ContractorListResponsePagedList, ErrorApiResponse>({
        path: `/api/Contractors`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags Contractors
     * @name ContractorsCreate
     * @summary ContractorsCreate
     * @request POST:/api/Contractors
     * @secure
     */
    contractorsCreate: (
      data: ContractorCreateRequest,
      params: RequestParams = {},
    ) =>
      this.request<ContractorResponse, ErrorApiResponse>({
        path: `/api/Contractors`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Контролёр</li><li>Супервайзер</li>
     *
     * @tags Contractors
     * @name ContractorsDetail
     * @summary ContractorsRead
     * @request GET:/api/Contractors/{contractorId}
     * @secure
     */
    contractorsDetail: (contractorId: number, params: RequestParams = {}) =>
      this.request<ContractorResponse, ErrorApiResponse>({
        path: `/api/Contractors/${contractorId}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags Contractors
     * @name ContractorsUpdate
     * @summary ContractorsUpdate
     * @request PUT:/api/Contractors/{contractorId}
     * @secure
     */
    contractorsUpdate: (
      contractorId: number,
      data: ContractorUpdateRequest,
      params: RequestParams = {},
    ) =>
      this.request<ContractorResponse, ErrorApiResponse>({
        path: `/api/Contractors/${contractorId}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags Contractors
     * @name ContractorsDelete
     * @summary ContractorsDelete
     * @request DELETE:/api/Contractors/{contractorId}
     * @secure
     */
    contractorsDelete: (contractorId: number, params: RequestParams = {}) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/Contractors/${contractorId}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Старший оператор</li><li>Оператор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags Controllers
     * @name IndividualSealControllersCreate
     * @summary IndividualSealReadWrite
     * @request POST:/api/IndividualSeal/Controllers
     * @secure
     */
    individualSealControllersCreate: (
      data: ControllerCreateRequest,
      params: RequestParams = {},
    ) =>
      this.request<string, ErrorApiResponse>({
        path: `/api/IndividualSeal/Controllers`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Старший оператор</li><li>Оператор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags Controllers
     * @name IndividualSealControllersList
     * @summary IndividualSealRead
     * @request GET:/api/IndividualSeal/Controllers
     * @secure
     */
    individualSealControllersList: (params: RequestParams = {}) =>
      this.request<ControllerResponse[], ErrorApiResponse>({
        path: `/api/IndividualSeal/Controllers`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Старший оператор</li><li>Оператор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags Controllers
     * @name IndividualSealControllersUpdate
     * @summary IndividualSealReadWrite
     * @request PUT:/api/IndividualSeal/Controllers/{controllerId}
     * @secure
     */
    individualSealControllersUpdate: (
      controllerId: string,
      data: ControllerUpdateRequest,
      params: RequestParams = {},
    ) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/IndividualSeal/Controllers/${controllerId}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Старший оператор</li><li>Оператор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags Controllers
     * @name IndividualSealControllersDelete
     * @summary IndividualSealReadWrite
     * @request DELETE:/api/IndividualSeal/Controllers/{controllerId}
     * @secure
     */
    individualSealControllersDelete: (
      controllerId: string,
      params: RequestParams = {},
    ) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/IndividualSeal/Controllers/${controllerId}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Старший оператор</li><li>Оператор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags Controllers
     * @name IndividualSealControllersWorkDetail
     * @summary IndividualSealRead
     * @request GET:/api/IndividualSeal/Controllers/{controllerId}/Work
     * @secure
     */
    individualSealControllersWorkDetail: (
      controllerId: string,
      query: {
        /** @format date-time */
        date: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<AppointmentResponse[], ErrorApiResponse>({
        path: `/api/IndividualSeal/Controllers/${controllerId}/Work`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Старший оператор</li><li>Оператор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags Controllers
     * @name IndividualSealControllersWorkFileDetail
     * @summary IndividualSealRead
     * @request GET:/api/IndividualSeal/Controllers/{controllerId}/WorkFile
     * @secure
     */
    individualSealControllersWorkFileDetail: (
      controllerId: string,
      query: {
        /** @format date-time */
        date: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/IndividualSeal/Controllers/${controllerId}/WorkFile`,
        method: 'GET',
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Старший оператор</li><li>Оператор</li><li>Супервайзер</li>
     *
     * @tags Dashboard
     * @name DashboardFilterOrganizationsList
     * @summary OrganizationsReadAll
     * @request GET:/api/Dashboard/filter/organizations
     * @secure
     */
    dashboardFilterOrganizationsList: (
      query?: {
        /** @format date-time */
        From?: string;
        /** @format date-time */
        To?: string;
        City?: string;
        /** @format int32 */
        ManagementFirmId?: number;
        BuildingIds?: number[];
        ResourceType?: ResourceType;
        MalfunctionType?: ManagingFirmTaskType;
        DeviationType?: ETemperatureNormativeDeviationType;
        IsTest?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<OrganizationResponsePagedList, ErrorApiResponse>({
        path: `/api/Dashboard/filter/organizations`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Супервайзер</li>
     *
     * @tags Dashboard
     * @name DashboardCurrentSummaryList
     * @summary DashboardView
     * @request GET:/api/Dashboard/current/summary
     * @secure
     */
    dashboardCurrentSummaryList: (
      query?: {
        /** @format date-time */
        From?: string;
        /** @format date-time */
        To?: string;
        City?: string;
        /** @format int32 */
        ManagementFirmId?: number;
        BuildingIds?: number[];
        ResourceType?: ResourceType;
        MalfunctionType?: ManagingFirmTaskType;
        DeviationType?: ETemperatureNormativeDeviationType;
        IsTest?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<DashboardSummaryResponse[], ErrorApiResponse>({
        path: `/api/Dashboard/current/summary`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Супервайзер</li>
     *
     * @tags Dashboard
     * @name DashboardCurrentPiperupturesList
     * @summary DashboardView
     * @request GET:/api/Dashboard/current/piperuptures
     * @secure
     */
    dashboardCurrentPiperupturesList: (
      query?: {
        /** @format date-time */
        From?: string;
        /** @format date-time */
        To?: string;
        City?: string;
        /** @format int32 */
        ManagementFirmId?: number;
        BuildingIds?: number[];
        ResourceType?: ResourceType;
        MalfunctionType?: ManagingFirmTaskType;
        DeviationType?: ETemperatureNormativeDeviationType;
        IsTest?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<DashboardTaskResourceResponse[], ErrorApiResponse>({
        path: `/api/Dashboard/current/piperuptures`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Супервайзер</li>
     *
     * @tags Dashboard
     * @name DashboardCurrentPiperupturesCityList
     * @summary DashboardView
     * @request GET:/api/Dashboard/current/piperuptures/city
     * @secure
     */
    dashboardCurrentPiperupturesCityList: (
      query?: {
        /** @format date-time */
        From?: string;
        /** @format date-time */
        To?: string;
        City?: string;
        /** @format int32 */
        ManagementFirmId?: number;
        BuildingIds?: number[];
        ResourceType?: ResourceType;
        MalfunctionType?: ManagingFirmTaskType;
        DeviationType?: ETemperatureNormativeDeviationType;
        IsTest?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<DashboardTaskResourceModel[], ErrorApiResponse>({
        path: `/api/Dashboard/current/piperuptures/city`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Супервайзер</li>
     *
     * @tags Dashboard
     * @name DashboardCurrentPiperupturesDetailList
     * @summary DashboardView
     * @request GET:/api/Dashboard/current/piperuptures/detail
     * @secure
     */
    dashboardCurrentPiperupturesDetailList: (
      query?: {
        /** @format date-time */
        From?: string;
        /** @format date-time */
        To?: string;
        City?: string;
        /** @format int32 */
        ManagementFirmId?: number;
        BuildingIds?: number[];
        ResourceType?: ResourceType;
        MalfunctionType?: ManagingFirmTaskType;
        DeviationType?: ETemperatureNormativeDeviationType;
        IsTest?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<DashboardTaskResourceResponse, ErrorApiResponse>({
        path: `/api/Dashboard/current/piperuptures/detail`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Супервайзер</li>
     *
     * @tags Dashboard
     * @name DashboardCurrentResourcedisconnectsList
     * @summary DashboardView
     * @request GET:/api/Dashboard/current/resourcedisconnects
     * @secure
     */
    dashboardCurrentResourcedisconnectsList: (
      query?: {
        /** @format date-time */
        From?: string;
        /** @format date-time */
        To?: string;
        City?: string;
        /** @format int32 */
        ManagementFirmId?: number;
        BuildingIds?: number[];
        ResourceType?: ResourceType;
        MalfunctionType?: ManagingFirmTaskType;
        DeviationType?: ETemperatureNormativeDeviationType;
        IsTest?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<DashboardTaskResourceResponse[], ErrorApiResponse>({
        path: `/api/Dashboard/current/resourcedisconnects`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Супервайзер</li>
     *
     * @tags Dashboard
     * @name DashboardCurrentResourcedisconnectsCityList
     * @summary DashboardView
     * @request GET:/api/Dashboard/current/resourcedisconnects/city
     * @secure
     */
    dashboardCurrentResourcedisconnectsCityList: (
      query?: {
        /** @format date-time */
        From?: string;
        /** @format date-time */
        To?: string;
        City?: string;
        /** @format int32 */
        ManagementFirmId?: number;
        BuildingIds?: number[];
        ResourceType?: ResourceType;
        MalfunctionType?: ManagingFirmTaskType;
        DeviationType?: ETemperatureNormativeDeviationType;
        IsTest?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<DashboardTaskResourceResponse[], ErrorApiResponse>({
        path: `/api/Dashboard/current/resourcedisconnects/city`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Супервайзер</li>
     *
     * @tags Dashboard
     * @name DashboardCurrentResourcedisconnectsDetailList
     * @summary DashboardView
     * @request GET:/api/Dashboard/current/resourcedisconnects/detail
     * @secure
     */
    dashboardCurrentResourcedisconnectsDetailList: (
      query?: {
        /** @format date-time */
        From?: string;
        /** @format date-time */
        To?: string;
        City?: string;
        /** @format int32 */
        ManagementFirmId?: number;
        BuildingIds?: number[];
        ResourceType?: ResourceType;
        MalfunctionType?: ManagingFirmTaskType;
        DeviationType?: ETemperatureNormativeDeviationType;
        IsTest?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<DashboardTaskResourceResponse, ErrorApiResponse>({
        path: `/api/Dashboard/current/resourcedisconnects/detail`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Супервайзер</li>
     *
     * @tags Dashboard
     * @name DashboardCurrentMalfunctionsList
     * @summary DashboardView
     * @request GET:/api/Dashboard/current/malfunctions
     * @secure
     */
    dashboardCurrentMalfunctionsList: (
      query?: {
        /** @format date-time */
        From?: string;
        /** @format date-time */
        To?: string;
        City?: string;
        /** @format int32 */
        ManagementFirmId?: number;
        BuildingIds?: number[];
        ResourceType?: ResourceType;
        MalfunctionType?: ManagingFirmTaskType;
        DeviationType?: ETemperatureNormativeDeviationType;
        IsTest?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<DashboardTaskMalfunctionResponse[], ErrorApiResponse>({
        path: `/api/Dashboard/current/malfunctions`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Супервайзер</li>
     *
     * @tags Dashboard
     * @name DashboardCurrentMalfunctionsCityList
     * @summary DashboardView
     * @request GET:/api/Dashboard/current/malfunctions/city
     * @secure
     */
    dashboardCurrentMalfunctionsCityList: (
      query?: {
        /** @format date-time */
        From?: string;
        /** @format date-time */
        To?: string;
        City?: string;
        /** @format int32 */
        ManagementFirmId?: number;
        BuildingIds?: number[];
        ResourceType?: ResourceType;
        MalfunctionType?: ManagingFirmTaskType;
        DeviationType?: ETemperatureNormativeDeviationType;
        IsTest?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<DashboardTaskMalfunctionResponse[], ErrorApiResponse>({
        path: `/api/Dashboard/current/malfunctions/city`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Супервайзер</li>
     *
     * @tags Dashboard
     * @name DashboardCurrentMalfunctionsDetailList
     * @summary DashboardView
     * @request GET:/api/Dashboard/current/malfunctions/detail
     * @secure
     */
    dashboardCurrentMalfunctionsDetailList: (
      query?: {
        /** @format date-time */
        From?: string;
        /** @format date-time */
        To?: string;
        City?: string;
        /** @format int32 */
        ManagementFirmId?: number;
        BuildingIds?: number[];
        ResourceType?: ResourceType;
        MalfunctionType?: ManagingFirmTaskType;
        DeviationType?: ETemperatureNormativeDeviationType;
        IsTest?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<DashboardTaskMalfunctionResponse, ErrorApiResponse>({
        path: `/api/Dashboard/current/malfunctions/detail`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Супервайзер</li>
     *
     * @tags Dashboard
     * @name DashboardCurrentAveragetimeList
     * @summary DashboardView
     * @request GET:/api/Dashboard/current/averagetime
     * @secure
     */
    dashboardCurrentAveragetimeList: (
      query?: {
        /** @format date-time */
        From?: string;
        /** @format date-time */
        To?: string;
        City?: string;
        /** @format int32 */
        ManagementFirmId?: number;
        BuildingIds?: number[];
        ResourceType?: ResourceType;
        MalfunctionType?: ManagingFirmTaskType;
        DeviationType?: ETemperatureNormativeDeviationType;
        IsTest?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<DashboardTaskAverageTimeResponse[], ErrorApiResponse>({
        path: `/api/Dashboard/current/averagetime`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Супервайзер</li>
     *
     * @tags Dashboard
     * @name DashboardCurrentAveragetimeCityList
     * @summary DashboardView
     * @request GET:/api/Dashboard/current/averagetime/city
     * @secure
     */
    dashboardCurrentAveragetimeCityList: (
      query?: {
        /** @format date-time */
        From?: string;
        /** @format date-time */
        To?: string;
        City?: string;
        /** @format int32 */
        ManagementFirmId?: number;
        BuildingIds?: number[];
        ResourceType?: ResourceType;
        MalfunctionType?: ManagingFirmTaskType;
        DeviationType?: ETemperatureNormativeDeviationType;
        IsTest?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<DashboardTaskAverageTimeResponse[], ErrorApiResponse>({
        path: `/api/Dashboard/current/averagetime/city`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Супервайзер</li>
     *
     * @tags Dashboard
     * @name DashboardCurrentAveragetimeDetailList
     * @summary DashboardView
     * @request GET:/api/Dashboard/current/averagetime/detail
     * @secure
     */
    dashboardCurrentAveragetimeDetailList: (
      query?: {
        /** @format date-time */
        From?: string;
        /** @format date-time */
        To?: string;
        City?: string;
        /** @format int32 */
        ManagementFirmId?: number;
        BuildingIds?: number[];
        ResourceType?: ResourceType;
        MalfunctionType?: ManagingFirmTaskType;
        DeviationType?: ETemperatureNormativeDeviationType;
        IsTest?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<DashboardTaskAverageTimeResponse, ErrorApiResponse>({
        path: `/api/Dashboard/current/averagetime/detail`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Супервайзер</li>
     *
     * @tags Dashboard
     * @name DashboardCurrentServicequalityList
     * @summary DashboardView
     * @request GET:/api/Dashboard/current/servicequality
     * @secure
     */
    dashboardCurrentServicequalityList: (
      query?: {
        /** @format date-time */
        From?: string;
        /** @format date-time */
        To?: string;
        City?: string;
        /** @format int32 */
        ManagementFirmId?: number;
        BuildingIds?: number[];
        ResourceType?: ResourceType;
        MalfunctionType?: ManagingFirmTaskType;
        DeviationType?: ETemperatureNormativeDeviationType;
        IsTest?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<DashboardTaskQualityResponse[], ErrorApiResponse>({
        path: `/api/Dashboard/current/servicequality`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Супервайзер</li>
     *
     * @tags Dashboard
     * @name DashboardCurrentServicequalityCityList
     * @summary DashboardView
     * @request GET:/api/Dashboard/current/servicequality/city
     * @secure
     */
    dashboardCurrentServicequalityCityList: (
      query?: {
        /** @format date-time */
        From?: string;
        /** @format date-time */
        To?: string;
        City?: string;
        /** @format int32 */
        ManagementFirmId?: number;
        BuildingIds?: number[];
        ResourceType?: ResourceType;
        MalfunctionType?: ManagingFirmTaskType;
        DeviationType?: ETemperatureNormativeDeviationType;
        IsTest?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<DashboardTaskQualityResponse[], ErrorApiResponse>({
        path: `/api/Dashboard/current/servicequality/city`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Супервайзер</li>
     *
     * @tags Dashboard
     * @name DashboardCurrentServicequalityDetailList
     * @summary DashboardView
     * @request GET:/api/Dashboard/current/servicequality/detail
     * @secure
     */
    dashboardCurrentServicequalityDetailList: (
      query?: {
        /** @format date-time */
        From?: string;
        /** @format date-time */
        To?: string;
        City?: string;
        /** @format int32 */
        ManagementFirmId?: number;
        BuildingIds?: number[];
        ResourceType?: ResourceType;
        MalfunctionType?: ManagingFirmTaskType;
        DeviationType?: ETemperatureNormativeDeviationType;
        IsTest?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<DashboardTaskQualityResponse, ErrorApiResponse>({
        path: `/api/Dashboard/current/servicequality/detail`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Супервайзер</li>
     *
     * @tags Dashboard
     * @name DashboardCommonSummaryList
     * @summary DashboardView
     * @request GET:/api/Dashboard/common/summary
     * @secure
     */
    dashboardCommonSummaryList: (
      query?: {
        /** @format date-time */
        From?: string;
        /** @format date-time */
        To?: string;
        City?: string;
        /** @format int32 */
        ManagementFirmId?: number;
        BuildingIds?: number[];
        ResourceType?: ResourceType;
        MalfunctionType?: ManagingFirmTaskType;
        DeviationType?: ETemperatureNormativeDeviationType;
        IsTest?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<DashboardSummaryResponse[], ErrorApiResponse>({
        path: `/api/Dashboard/common/summary`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Супервайзер</li>
     *
     * @tags Dashboard
     * @name DashboardCommonPiperupturesList
     * @summary DashboardView
     * @request GET:/api/Dashboard/common/piperuptures
     * @secure
     */
    dashboardCommonPiperupturesList: (
      query?: {
        /** @format date-time */
        From?: string;
        /** @format date-time */
        To?: string;
        City?: string;
        /** @format int32 */
        ManagementFirmId?: number;
        BuildingIds?: number[];
        ResourceType?: ResourceType;
        MalfunctionType?: ManagingFirmTaskType;
        DeviationType?: ETemperatureNormativeDeviationType;
        IsTest?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<DashboardTaskResourceResponse[], ErrorApiResponse>({
        path: `/api/Dashboard/common/piperuptures`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Супервайзер</li>
     *
     * @tags Dashboard
     * @name DashboardCommonPiperupturesDetailList
     * @summary DashboardView
     * @request GET:/api/Dashboard/common/piperuptures/detail
     * @secure
     */
    dashboardCommonPiperupturesDetailList: (
      query?: {
        /** @format date-time */
        From?: string;
        /** @format date-time */
        To?: string;
        City?: string;
        /** @format int32 */
        ManagementFirmId?: number;
        BuildingIds?: number[];
        ResourceType?: ResourceType;
        MalfunctionType?: ManagingFirmTaskType;
        DeviationType?: ETemperatureNormativeDeviationType;
        IsTest?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<DashboardTaskResourceModel, ErrorApiResponse>({
        path: `/api/Dashboard/common/piperuptures/detail`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Супервайзер</li>
     *
     * @tags Dashboard
     * @name DashboardCommonResourcedisconnectsList
     * @summary DashboardView
     * @request GET:/api/Dashboard/common/resourcedisconnects
     * @secure
     */
    dashboardCommonResourcedisconnectsList: (
      query?: {
        /** @format date-time */
        From?: string;
        /** @format date-time */
        To?: string;
        City?: string;
        /** @format int32 */
        ManagementFirmId?: number;
        BuildingIds?: number[];
        ResourceType?: ResourceType;
        MalfunctionType?: ManagingFirmTaskType;
        DeviationType?: ETemperatureNormativeDeviationType;
        IsTest?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<DashboardTaskResourceResponse[], ErrorApiResponse>({
        path: `/api/Dashboard/common/resourcedisconnects`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Супервайзер</li>
     *
     * @tags Dashboard
     * @name DashboardCommonResourcedisconnectsDetailList
     * @summary DashboardView
     * @request GET:/api/Dashboard/common/resourcedisconnects/detail
     * @secure
     */
    dashboardCommonResourcedisconnectsDetailList: (
      query?: {
        /** @format date-time */
        From?: string;
        /** @format date-time */
        To?: string;
        City?: string;
        /** @format int32 */
        ManagementFirmId?: number;
        BuildingIds?: number[];
        ResourceType?: ResourceType;
        MalfunctionType?: ManagingFirmTaskType;
        DeviationType?: ETemperatureNormativeDeviationType;
        IsTest?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<DashboardTaskResourceModel, ErrorApiResponse>({
        path: `/api/Dashboard/common/resourcedisconnects/detail`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Супервайзер</li>
     *
     * @tags Dashboard
     * @name DashboardCommonMalfunctionsList
     * @summary DashboardView
     * @request GET:/api/Dashboard/common/malfunctions
     * @secure
     */
    dashboardCommonMalfunctionsList: (
      query?: {
        /** @format date-time */
        From?: string;
        /** @format date-time */
        To?: string;
        City?: string;
        /** @format int32 */
        ManagementFirmId?: number;
        BuildingIds?: number[];
        ResourceType?: ResourceType;
        MalfunctionType?: ManagingFirmTaskType;
        DeviationType?: ETemperatureNormativeDeviationType;
        IsTest?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<DashboardTaskMalfunctionResponse[], ErrorApiResponse>({
        path: `/api/Dashboard/common/malfunctions`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Супервайзер</li>
     *
     * @tags Dashboard
     * @name DashboardCommonMalfunctionsDetailList
     * @summary DashboardView
     * @request GET:/api/Dashboard/common/malfunctions/detail
     * @secure
     */
    dashboardCommonMalfunctionsDetailList: (
      query?: {
        /** @format date-time */
        From?: string;
        /** @format date-time */
        To?: string;
        City?: string;
        /** @format int32 */
        ManagementFirmId?: number;
        BuildingIds?: number[];
        ResourceType?: ResourceType;
        MalfunctionType?: ManagingFirmTaskType;
        DeviationType?: ETemperatureNormativeDeviationType;
        IsTest?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<DashboardTaskMalfunctionModel, ErrorApiResponse>({
        path: `/api/Dashboard/common/malfunctions/detail`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Старший оператор</li><li>Оператор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags Districts
     * @name IndividualSealDistrictsList
     * @summary IndividualSealRead
     * @request GET:/api/IndividualSeal/Districts
     * @secure
     */
    individualSealDistrictsList: (
      query?: {
        /** @format int32 */
        HouseId?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<DistrictResponse[], ErrorApiResponse>({
        path: `/api/IndividualSeal/Districts`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Старший оператор</li>
     *
     * @tags Districts
     * @name IndividualSealDistrictsCreate
     * @summary IndividualSealDistrictReadWrite
     * @request POST:/api/IndividualSeal/Districts
     * @secure
     */
    individualSealDistrictsCreate: (
      data: DistrictCreateRequest,
      params: RequestParams = {},
    ) =>
      this.request<string, ErrorApiResponse>({
        path: `/api/IndividualSeal/Districts`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Старший оператор</li>
     *
     * @tags Districts
     * @name IndividualSealDistrictsDelete
     * @summary IndividualSealDistrictReadWrite
     * @request DELETE:/api/IndividualSeal/Districts/{districtId}
     * @secure
     */
    individualSealDistrictsDelete: (
      districtId: string,
      query?: {
        /**
         * Удалить вместе с домами
         * @default false
         */
        forced?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/IndividualSeal/Districts/${districtId}`,
        method: 'DELETE',
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Старший оператор</li>
     *
     * @tags Districts
     * @name IndividualSealDistrictsUpdate
     * @summary IndividualSealDistrictReadWrite
     * @request PUT:/api/IndividualSeal/Districts/{districtId}
     * @secure
     */
    individualSealDistrictsUpdate: (
      districtId: string,
      data: DistrictUpdateRequest,
      params: RequestParams = {},
    ) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/IndividualSeal/Districts/${districtId}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Старший оператор</li>
     *
     * @tags Districts
     * @name IndividualSealDistrictsAddHouseCreate
     * @summary IndividualSealDistrictReadWrite
     * @request POST:/api/IndividualSeal/Districts/{districtId}/AddHouse
     * @secure
     */
    individualSealDistrictsAddHouseCreate: (
      districtId: string,
      data: number,
      params: RequestParams = {},
    ) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/IndividualSeal/Districts/${districtId}/AddHouse`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Старший оператор</li>
     *
     * @tags Districts
     * @name IndividualSealDistrictsDeleteHouseCreate
     * @summary IndividualSealDistrictReadWrite
     * @request POST:/api/IndividualSeal/Districts/{districtId}/DeleteHouse
     * @secure
     */
    individualSealDistrictsDeleteHouseCreate: (
      districtId: string,
      data: number,
      params: RequestParams = {},
    ) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/IndividualSeal/Districts/${districtId}/DeleteHouse`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Администратор УК без назначений задач</li><li>Контролёр</li><li>Супервайзер</li>
     *
     * @tags Documents
     * @name DocumentsTypesList
     * @summary DocumentsRead
     * @request GET:/api/Documents/types
     * @secure
     */
    documentsTypesList: (params: RequestParams = {}) =>
      this.request<EDocumentTypeStringDictionaryItem[], ErrorApiResponse>({
        path: `/api/Documents/types`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Администратор УК без назначений задач</li><li>Контролёр</li>
     *
     * @tags Documents
     * @name DocumentsUploadCreate
     * @summary DocumentsCreate
     * @request POST:/api/Documents/upload
     * @secure
     */
    documentsUploadCreate: (
      data: {
        /** @minItems 1 */
        file?: File[];
        /** @default "Common" */
        type?: EDocumentType;
      },
      params: RequestParams = {},
    ) =>
      this.request<DocumentResponse[], ErrorApiResponse>({
        path: `/api/Documents/upload`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Администратор УК без назначений задач</li><li>Контролёр</li><li>Супервайзер</li>
     *
     * @tags Documents
     * @name DocumentsDetail
     * @summary DocumentsRead
     * @request GET:/api/Documents/{documentId}
     * @secure
     */
    documentsDetail: (documentId: number, params: RequestParams = {}) =>
      this.request<string, ErrorApiResponse>({
        path: `/api/Documents/${documentId}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Администратор УК без назначений задач</li><li>Контролёр</li>
     *
     * @tags Documents
     * @name DocumentsDelete
     * @summary DocumentsDelete
     * @request DELETE:/api/Documents/{documentId}
     * @secure
     */
    documentsDelete: (documentId: number, params: RequestParams = {}) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/Documents/${documentId}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Администратор УК без назначений задач</li><li>Контролёр</li><li>Супервайзер</li>
     *
     * @tags Documents
     * @name DocumentsPollArtifactDetail
     * @summary IndividualDeviceReadingsRead
     * @request GET:/api/Documents/poll/{id}/artifact
     * @secure
     */
    documentsPollArtifactDetail: (id: number, params: RequestParams = {}) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/Documents/poll/${id}/artifact`,
        method: 'GET',
        secure: true,
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Контролёр</li><li>Супервайзер</li>
     *
     * @tags ElectricHousingMeteringDevices
     * @name ElectricHousingMeteringDevicesDetail
     * @summary MeteringDevicesRead
     * @request GET:/api/ElectricHousingMeteringDevices/{deviceId}
     * @secure
     */
    electricHousingMeteringDevicesDetail: (
      deviceId: number,
      params: RequestParams = {},
    ) =>
      this.request<ElectricHousingMeteringDeviceResponse, ErrorApiResponse>({
        path: `/api/ElectricHousingMeteringDevices/${deviceId}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags ElectricHousingMeteringDevices
     * @name ElectricHousingMeteringDevicesUpdate
     * @summary HousingMeteringDeviceUpdate
     * @request PUT:/api/ElectricHousingMeteringDevices/{deviceId}
     * @secure
     */
    electricHousingMeteringDevicesUpdate: (
      deviceId: number,
      data: UpdateElectricHousingMeteringDeviceRequest,
      params: RequestParams = {},
    ) =>
      this.request<ElectricHousingMeteringDeviceResponse, ErrorApiResponse>({
        path: `/api/ElectricHousingMeteringDevices/${deviceId}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags ElectricHousingMeteringDevices
     * @name ElectricHousingMeteringDevicesCreate
     * @summary HousingMeteringDeviceCreate
     * @request POST:/api/ElectricHousingMeteringDevices
     * @secure
     */
    electricHousingMeteringDevicesCreate: (
      data: CreateElectricHousingMeteringDeviceRequest,
      params: RequestParams = {},
    ) =>
      this.request<ElectricHousingMeteringDeviceResponse, ErrorApiResponse>({
        path: `/api/ElectricHousingMeteringDevices`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags ElectricHousingMeteringDevices
     * @name ElectricHousingMeteringDevicesSwitchCreate
     * @summary HousingMeteringDeviceCreate
     * @request POST:/api/ElectricHousingMeteringDevices/switch
     * @secure
     */
    electricHousingMeteringDevicesSwitchCreate: (
      data: SwitchElectricHousingDeviceRequest,
      params: RequestParams = {},
    ) =>
      this.request<ElectricHousingMeteringDeviceResponse, ErrorApiResponse>({
        path: `/api/ElectricHousingMeteringDevices/switch`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Супервайзер</li>
     *
     * @tags ElectricNodes
     * @name ElectricNodesDetail
     * @summary NodeRead
     * @request GET:/api/ElectricNodes/{electricNodeId}
     * @secure
     */
    electricNodesDetail: (electricNodeId: number, params: RequestParams = {}) =>
      this.request<ElectricNodeResponse, ErrorApiResponse>({
        path: `/api/ElectricNodes/${electricNodeId}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Администратор УК без назначений задач</li>
     *
     * @tags ElectricNodes
     * @name ElectricNodesUpdate
     * @summary NodeUpdate
     * @request PUT:/api/ElectricNodes/{electricNodeId}
     * @secure
     */
    electricNodesUpdate: (
      electricNodeId: number,
      data: UpdateElectricNodeRequest,
      params: RequestParams = {},
    ) =>
      this.request<ElectricNodeResponse, ErrorApiResponse>({
        path: `/api/ElectricNodes/${electricNodeId}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Администратор УК без назначений задач</li>
     *
     * @tags ElectricNodes
     * @name ElectricNodesCreate
     * @summary NodeCreate
     * @request POST:/api/ElectricNodes
     * @secure
     */
    electricNodesCreate: (
      data: CreateElectricNodeRequest,
      params: RequestParams = {},
    ) =>
      this.request<ElectricNodeResponse, ErrorApiResponse>({
        path: `/api/ElectricNodes`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Администратор УК без назначений задач</li>
     *
     * @tags ElectricNodes
     * @name ElectricNodesSetRegisteredStatusCreate
     * @summary NodeUpdate
     * @request POST:/api/ElectricNodes/{electricNodeId}/SetRegisteredStatus
     * @secure
     */
    electricNodesSetRegisteredStatusCreate: (
      electricNodeId: number,
      data: NodeSetRegisteredRequest,
      params: RequestParams = {},
    ) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/ElectricNodes/${electricNodeId}/SetRegisteredStatus`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Администратор УК без назначений задач</li>
     *
     * @tags ElectricNodes
     * @name ElectricNodesSetNotRegisteredStatusCreate
     * @summary NodeUpdate
     * @request POST:/api/ElectricNodes/{electricNodeId}/SetNotRegisteredStatus
     * @secure
     */
    electricNodesSetNotRegisteredStatusCreate: (
      electricNodeId: number,
      data: NodeSetNotRegisteredRequest,
      params: RequestParams = {},
    ) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/ElectricNodes/${electricNodeId}/SetNotRegisteredStatus`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Старший оператор</li>
     *
     * @tags Exports
     * @name ExportsMilurDevicesList
     * @summary ErcExport
     * @request GET:/api/Exports/MilurDevices
     * @secure
     */
    exportsMilurDevicesList: (
      query?: {
        /** @format date-time */
        StartDate?: string;
        /** @format date-time */
        EndDate?: string;
        ManagementFirmIds?: number[];
        Command?: PollCommand;
        /** @format int32 */
        PollId?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<PollResponse, ErrorApiResponse>({
        path: `/api/Exports/MilurDevices`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Старший оператор</li>
     *
     * @tags Exports
     * @name ExportsIndividualDeviceReadingsList
     * @summary ErcExport
     * @request GET:/api/Exports/IndividualDeviceReadings
     * @secure
     */
    exportsIndividualDeviceReadingsList: (
      query?: {
        /** @format int32 */
        Year?: number;
        /** @format int32 */
        Month?: number;
        ManagementFirmIds?: number[];
        Command?: PollCommand;
        /** @format int32 */
        PollId?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<PollResponse, ErrorApiResponse>({
        path: `/api/Exports/IndividualDeviceReadings`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Старший оператор</li>
     *
     * @tags Exports
     * @name ExportsHousingDeviceReadingsList
     * @summary ErcExport
     * @request GET:/api/Exports/HousingDeviceReadings
     * @secure
     */
    exportsHousingDeviceReadingsList: (
      query?: {
        /** @format int32 */
        Year?: number;
        /** @format int32 */
        Month?: number;
        ManagementFirmIds?: number[];
        Command?: PollCommand;
        /** @format int32 */
        PollId?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<PollResponse, ErrorApiResponse>({
        path: `/api/Exports/HousingDeviceReadings`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Администратор УК без назначений задач</li><li>Супервайзер</li>
     *
     * @tags HeatingSeasons
     * @name HeatingSeasonsList
     * @summary HeatingSeasonsRead
     * @request GET:/api/HeatingSeasons
     * @secure
     */
    heatingSeasonsList: (params: RequestParams = {}) =>
      this.request<HeatingSeasonPageResponse, ErrorApiResponse>({
        path: `/api/HeatingSeasons`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags HeatingSeasons
     * @name HeatingSeasonsUpdate
     * @summary HeatingSeasonsUpdate
     * @request PUT:/api/HeatingSeasons
     * @secure
     */
    heatingSeasonsUpdate: (
      query?: {
        /** @format date-time */
        StartDate?: string;
        /** @format date-time */
        EndDate?: string;
        HouseCategory?: EHouseCategory;
        LivingHouseType?: ELivingHouseType;
        NonResidentialHouseType?: ENonResidentialHouseType;
      },
      params: RequestParams = {},
    ) =>
      this.request<HeatingSeasonResponse, ErrorApiResponse>({
        path: `/api/HeatingSeasons`,
        method: 'PUT',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags HeatingSeasons
     * @name HeatingSeasonsSwitchCreate
     * @summary HeatingSeasonsCreate
     * @request POST:/api/HeatingSeasons/Switch
     * @secure
     */
    heatingSeasonsSwitchCreate: (
      data: SwitchHeatingSeasonRequest,
      params: RequestParams = {},
    ) =>
      this.request<HeatingSeasonResponse, ErrorApiResponse>({
        path: `/api/HeatingSeasons/Switch`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags HeatingSeasons
     * @name HeatingSeasonsAddOrUpdateForHouseManagementCreate
     * @summary HeatingSeasonsCreate
     * @request POST:/api/HeatingSeasons/AddOrUpdateForHouseManagement
     * @secure
     */
    heatingSeasonsAddOrUpdateForHouseManagementCreate: (
      data: AddOrUpdateHeatingSeasonForHouseManagementRequest,
      params: RequestParams = {},
    ) =>
      this.request<HeatingSeasonResponse, ErrorApiResponse>({
        path: `/api/HeatingSeasons/AddOrUpdateForHouseManagement`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Администратор УК без назначений задач</li><li>Супервайзер</li>
     *
     * @tags HeatingStation
     * @name HeatingStationList
     * @summary HeatingStationRead
     * @request GET:/api/HeatingStation
     * @secure
     */
    heatingStationList: (params: RequestParams = {}) =>
      this.request<HeatingStationResponsePagedList, ErrorApiResponse>({
        path: `/api/HeatingStation`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags HeatingStation
     * @name HeatingStationCreate
     * @summary HeatingStationCreate
     * @request POST:/api/HeatingStation
     * @secure
     */
    heatingStationCreate: (
      data: AddHeatingStationRequest,
      params: RequestParams = {},
    ) =>
      this.request<HeatingStationResponse, ErrorApiResponse>({
        path: `/api/HeatingStation`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Администратор УК без назначений задач</li><li>Супервайзер</li>
     *
     * @tags HeatingStation
     * @name HeatingStationDetail
     * @summary HeatingStationRead
     * @request GET:/api/HeatingStation/{id}
     * @secure
     */
    heatingStationDetail: (id: string, params: RequestParams = {}) =>
      this.request<HeatingStationResponse, ErrorApiResponse>({
        path: `/api/HeatingStation/${id}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags HeatingStation
     * @name HeatingStationUpdate
     * @summary HeatingStationUpdate
     * @request PUT:/api/HeatingStation/{id}
     * @secure
     */
    heatingStationUpdate: (
      id: string,
      data: UpdateHeatingStationRequest,
      params: RequestParams = {},
    ) =>
      this.request<HeatingStationResponse, ErrorApiResponse>({
        path: `/api/HeatingStation/${id}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags HeatingStation
     * @name HeatingStationDelete
     * @summary HeatingStationDelete
     * @request DELETE:/api/HeatingStation/{id}
     * @secure
     */
    heatingStationDelete: (id: string, params: RequestParams = {}) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/HeatingStation/${id}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Контролёр</li>
     *
     * @tags HomeownerAccounts
     * @name HomeownerAccountsList
     * @summary HomeownersRead
     * @request GET:/api/HomeownerAccounts
     * @secure
     */
    homeownerAccountsList: (
      query?: {
        Question?: string;
        PaymentCode?: string;
        OrderRule?: HomeownerAccountOrderRule;
        Status?: StatusType;
        /** @format int32 */
        PageNumber?: number;
        /** @format int32 */
        PageSize?: number;
        OrderBy?: OrderByRule;
        /** @format int32 */
        Skip?: number;
        /** @format int32 */
        Take?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<HomeownerAccountResponsePagedList, ErrorApiResponse>({
        path: `/api/HomeownerAccounts`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Старший оператор</li><li>Оператор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags HomeownerAccounts
     * @name HomeownerAccountsCreate
     * @summary HomeownersCreate
     * @request POST:/api/HomeownerAccounts
     * @secure
     */
    homeownerAccountsCreate: (
      data: HomeownerAccountCreateRequest,
      query?: {
        isForced?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<HomeownerAccountResponse, ErrorApiResponse>({
        path: `/api/HomeownerAccounts`,
        method: 'POST',
        query: query,
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Контролёр</li>
     *
     * @tags HomeownerAccounts
     * @name HomeownerAccountsDetail
     * @summary HomeownersRead
     * @request GET:/api/HomeownerAccounts/{id}
     * @secure
     */
    homeownerAccountsDetail: (id: string, params: RequestParams = {}) =>
      this.request<HomeownerAccountResponse, ErrorApiResponse>({
        path: `/api/HomeownerAccounts/${id}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Старший оператор</li><li>Оператор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags HomeownerAccounts
     * @name HomeownerAccountsUpdate
     * @summary HomeownersUpdate
     * @request PUT:/api/HomeownerAccounts/{id}
     * @secure
     */
    homeownerAccountsUpdate: (
      id: string,
      data: HomeownerAccountUpdateRequest,
      query?: {
        isForced?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<HomeownerAccountResponse, ErrorApiResponse>({
        path: `/api/HomeownerAccounts/${id}`,
        method: 'PUT',
        query: query,
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Старший оператор</li><li>Оператор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags HomeownerAccounts
     * @name HomeownerAccountsAddPhoneCreate
     * @summary HomeownersUpdate
     * @request POST:/api/HomeownerAccounts/{id}/AddPhone
     * @secure
     */
    homeownerAccountsAddPhoneCreate: (
      id: string,
      data: HomeownerAccountAddPhoneNumberRequest,
      params: RequestParams = {},
    ) =>
      this.request<string[], ErrorApiResponse>({
        path: `/api/HomeownerAccounts/${id}/AddPhone`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Старший оператор</li><li>Оператор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags HomeownerAccounts
     * @name HomeownerAccountsRemovePhoneCreate
     * @summary HomeownersUpdate
     * @request POST:/api/HomeownerAccounts/{id}/RemovePhone
     * @secure
     */
    homeownerAccountsRemovePhoneCreate: (
      id: string,
      data: HomeownerAccountRemovePhoneNumberRequest,
      params: RequestParams = {},
    ) =>
      this.request<string[], ErrorApiResponse>({
        path: `/api/HomeownerAccounts/${id}/RemovePhone`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Старший оператор</li><li>Оператор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags HomeownerAccounts
     * @name HomeownerAccountsReplacePhoneCreate
     * @summary HomeownersUpdate
     * @request POST:/api/HomeownerAccounts/{id}/ReplacePhone
     * @secure
     */
    homeownerAccountsReplacePhoneCreate: (
      id: string,
      data: HomeownerAccountReplacePhoneNumberRequest,
      params: RequestParams = {},
    ) =>
      this.request<string[], ErrorApiResponse>({
        path: `/api/HomeownerAccounts/${id}/ReplacePhone`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Старший оператор</li><li>Оператор</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li>
     *
     * @tags HomeownerAccounts
     * @name HomeownerAccountsReplaceAllPhonesCreate
     * @summary HomeownerReplaceAllPhones
     * @request POST:/api/HomeownerAccounts/{id}/ReplaceAllPhones
     * @secure
     */
    homeownerAccountsReplaceAllPhonesCreate: (
      id: string,
      data: HomeownerAccountReplaceAllPhoneNumbersRequest,
      params: RequestParams = {},
    ) =>
      this.request<string[], ErrorApiResponse>({
        path: `/api/HomeownerAccounts/${id}/ReplaceAllPhones`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Старший оператор</li><li>Оператор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags HomeownerAccounts
     * @name HomeownerAccountsCloseCreate
     * @summary HomeownersCreate
     * @request POST:/api/HomeownerAccounts/Close
     * @secure
     */
    homeownerAccountsCloseCreate: (
      data: HomeownerAccountCloseRequest,
      params: RequestParams = {},
    ) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/HomeownerAccounts/Close`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Старший оператор</li><li>Оператор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags HomeownerAccounts
     * @name HomeownerAccountsReplaceCreate
     * @summary HomeownersCreate
     * @request POST:/api/HomeownerAccounts/Replace
     * @secure
     */
    homeownerAccountsReplaceCreate: (
      data: HomeownerAccountReplaceRequest,
      query?: {
        isForced?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<HomeownerAccountResponse, ErrorApiResponse>({
        path: `/api/HomeownerAccounts/Replace`,
        method: 'POST',
        query: query,
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Контролёр</li>
     *
     * @tags HomeownerAccounts
     * @name HomeownerAccountsCertificateDetail
     * @summary HomeownersRead
     * @request GET:/api/HomeownerAccounts/{id}/Certificate
     * @secure
     */
    homeownerAccountsCertificateDetail: (
      id: string,
      params: RequestParams = {},
    ) =>
      this.request<HomeownerCertificateResponse, ErrorApiResponse>({
        path: `/api/HomeownerAccounts/${id}/Certificate`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Старший оператор</li><li>Оператор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags HomeownerAccounts
     * @name HomeownerAccountsSplitCreate
     * @summary HomeownersCreate
     * @request POST:/api/HomeownerAccounts/Split
     * @secure
     */
    homeownerAccountsSplitCreate: (
      data: HomeownerAccountSplitRequest,
      query?: {
        isForced?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        DataAfterSplittingHomeownerAccountResponse,
        ErrorApiResponse
      >({
        path: `/api/HomeownerAccounts/Split`,
        method: 'POST',
        query: query,
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Старший оператор</li><li>Оператор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags HouseManagements
     * @name HouseManagementsCreate
     * @summary HouseManagementUpdate
     * @request POST:/api/HouseManagements/{houseManagementId}
     * @secure
     */
    houseManagementsCreate: (
      houseManagementId: string,
      data: UpdateHouseManagementRequest,
      params: RequestParams = {},
    ) =>
      this.request<HouseManagementResponse, ErrorApiResponse>({
        path: `/api/HouseManagements/${houseManagementId}`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Контролёр</li><li>Супервайзер</li>
     *
     * @tags HouseManagements
     * @name HouseManagementsList
     * @summary HousingStocksRead
     * @request GET:/api/HouseManagements
     * @secure
     */
    houseManagementsList: (
      query?: {
        City?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<HouseManagementResponse[], ErrorApiResponse>({
        path: `/api/HouseManagements`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Старший оператор</li><li>Оператор</li><li>Администратор УК без назначений задач</li><li>Супервайзер</li>
     *
     * @tags HousingMeteringDeviceReadings
     * @name HousingMeteringDeviceReadingsList
     * @summary HousingMeteringDeviceReadingsRead
     * @request GET:/api/HousingMeteringDeviceReadings
     * @secure
     */
    housingMeteringDeviceReadingsList: (
      query?: {
        /** @format int32 */
        nodeId?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<GetHousingMeteringDeviceReadingsResponse, ErrorApiResponse>({
        path: `/api/HousingMeteringDeviceReadings`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Старший оператор</li><li>Оператор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags HousingMeteringDeviceReadings
     * @name HousingMeteringDeviceReadingsCreate
     * @summary HousingMeteringDeviceReadingsCreate
     * @request POST:/api/HousingMeteringDeviceReadings
     * @secure
     */
    housingMeteringDeviceReadingsCreate: (
      data: CreateHousingMeteringDeviceReadingsRequest,
      params: RequestParams = {},
    ) =>
      this.request<
        HousingMeteringDeviceReadingsIncludingPlacementResponse,
        ErrorApiResponse
      >({
        path: `/api/HousingMeteringDeviceReadings`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Старший оператор</li><li>Оператор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags HousingMeteringDeviceReadings
     * @name HousingMeteringDeviceReadingsUpdate
     * @summary HousingMeteringDeviceReadingsUpdate
     * @request PUT:/api/HousingMeteringDeviceReadings
     * @secure
     */
    housingMeteringDeviceReadingsUpdate: (
      data: UpdateHousingMeteringDeviceReadingsRequest,
      params: RequestParams = {},
    ) =>
      this.request<
        HousingMeteringDeviceReadingsIncludingPlacementResponse,
        ErrorApiResponse
      >({
        path: `/api/HousingMeteringDeviceReadings`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Старший оператор</li><li>Оператор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags HousingMeteringDeviceReadings
     * @name HousingMeteringDeviceReadingsRemoveCreate
     * @summary HousingMeteringDeviceReadingsUpdate
     * @request POST:/api/HousingMeteringDeviceReadings/{readingId}/remove
     * @secure
     */
    housingMeteringDeviceReadingsRemoveCreate: (
      readingId: string,
      params: RequestParams = {},
    ) =>
      this.request<HousingMeteringDeviceReadingsResponse, ErrorApiResponse>({
        path: `/api/HousingMeteringDeviceReadings/${readingId}/remove`,
        method: 'POST',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Старший оператор</li><li>Оператор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags HousingMeteringDeviceReadings
     * @name HousingMeteringDeviceReadingsSyncReadingsFromArchivesCreate
     * @summary HousingMeteringDeviceReadingsCreate
     * @request POST:/api/HousingMeteringDeviceReadings/SyncReadingsFromArchives
     * @secure
     */
    housingMeteringDeviceReadingsSyncReadingsFromArchivesCreate: (
      query?: {
        /** @format date-time */
        from?: string;
        /** @format date-time */
        to?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, ErrorApiResponse>({
        path: `/api/HousingMeteringDeviceReadings/SyncReadingsFromArchives`,
        method: 'POST',
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Контролёр</li><li>Супервайзер</li>
     *
     * @tags HousingMeteringDevices
     * @name HousingMeteringDevicesList
     * @summary MeteringDevicesRead
     * @request GET:/api/HousingMeteringDevices
     * @secure
     */
    housingMeteringDevicesList: (
      query?: {
        City?: string;
        Street?: string;
        HousingStockNumber?: string;
        Corpus?: string;
        Resource?: EResourceType;
        /** @format int32 */
        PageNumber?: number;
        /** @format int32 */
        PageSize?: number;
        OrderBy?: EOrderByRule;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        HousingMeteringDeviceIncludingReadingsResponsePagedList,
        ErrorApiResponse
      >({
        path: `/api/HousingMeteringDevices`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Контролёр</li><li>Супервайзер</li>
     *
     * @tags HousingMeteringDevices
     * @name HousingMeteringDevicesCommentDetail
     * @summary MeteringDevicesRead
     * @request GET:/api/HousingMeteringDevices/{deviceId}/comment
     * @secure
     */
    housingMeteringDevicesCommentDetail: (
      deviceId: number,
      params: RequestParams = {},
    ) =>
      this.request<HousingMeteringDeviceCommentResponse, ErrorApiResponse>({
        path: `/api/HousingMeteringDevices/${deviceId}/comment`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags HousingMeteringDevices
     * @name HousingMeteringDevicesCommentCreate
     * @summary HousingMeteringDeviceUpdate
     * @request POST:/api/HousingMeteringDevices/{deviceId}/comment
     * @secure
     */
    housingMeteringDevicesCommentCreate: (
      deviceId: number,
      data: HousingMeteringDeviceAddCommentRequest,
      params: RequestParams = {},
    ) =>
      this.request<HousingMeteringDeviceCommentResponse, ErrorApiResponse>({
        path: `/api/HousingMeteringDevices/${deviceId}/comment`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags HousingMeteringDevices
     * @name HousingMeteringDevicesCommentUpdate
     * @summary HousingMeteringDeviceUpdate
     * @request PUT:/api/HousingMeteringDevices/{deviceId}/comment
     * @secure
     */
    housingMeteringDevicesCommentUpdate: (
      deviceId: number,
      data: HousingMeteringDeviceUpdateCommentRequest,
      params: RequestParams = {},
    ) =>
      this.request<HousingMeteringDeviceCommentResponse, ErrorApiResponse>({
        path: `/api/HousingMeteringDevices/${deviceId}/comment`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags HousingMeteringDevices
     * @name HousingMeteringDevicesCommentDelete
     * @summary HousingMeteringDeviceUpdate
     * @request DELETE:/api/HousingMeteringDevices/{deviceId}/comment
     * @secure
     */
    housingMeteringDevicesCommentDelete: (
      deviceId: number,
      params: RequestParams = {},
    ) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/HousingMeteringDevices/${deviceId}/comment`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Старший оператор</li><li>Оператор</li><li>Администратор УК без назначений задач</li><li>Супервайзер</li>
     *
     * @tags HousingMeteringDevices
     * @name HousingMeteringDevicesReadingsHistoryDetail
     * @summary HousingMeteringDeviceReadingsRead
     * @request GET:/api/HousingMeteringDevices/{deviceId}/readingsHistory
     * @secure
     */
    housingMeteringDevicesReadingsHistoryDetail: (
      deviceId: number,
      params: RequestParams = {},
    ) =>
      this.request<
        HousingMeteringDeviceReadingsHistoryResponse,
        ErrorApiResponse
      >({
        path: `/api/HousingMeteringDevices/${deviceId}/readingsHistory`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Старший оператор</li><li>Оператор</li>
     *
     * @tags HousingMeteringDevices
     * @name HousingMeteringDevicesCloseDevicesByCheckingDateCreate
     * @summary IndividualDeviceClose
     * @request POST:/api/HousingMeteringDevices/closeDevicesByCheckingDate
     * @secure
     */
    housingMeteringDevicesCloseDevicesByCheckingDateCreate: (
      query?: {
        Command?: PollCommand;
        /** @format int32 */
        PollId?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<PollResponse, ErrorApiResponse>({
        path: `/api/HousingMeteringDevices/closeDevicesByCheckingDate`,
        method: 'POST',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags HousingStocks
     * @name HousingStocksCreate
     * @summary HousingStocksCreate
     * @request POST:/api/HousingStocks
     * @secure
     */
    housingStocksCreate: (
      data: HousingStockCreateRequest,
      params: RequestParams = {},
    ) =>
      this.request<HousingStockResponse, ErrorApiResponse>({
        path: `/api/HousingStocks`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Старший оператор</li><li>Оператор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags HousingStocks
     * @name HousingStocksUpdate
     * @summary HousingStocksUpdate
     * @request PUT:/api/HousingStocks/{housingStockId}
     * @secure
     */
    housingStocksUpdate: (
      housingStockId: number,
      data: HousingStockUpdateRequest,
      params: RequestParams = {},
    ) =>
      this.request<HousingStockResponse, ErrorApiResponse>({
        path: `/api/HousingStocks/${housingStockId}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Контролёр</li><li>Супервайзер</li>
     *
     * @tags HousingStocks
     * @name HousingStocksDetail
     * @summary HousingStocksRead
     * @request GET:/api/HousingStocks/{housingStockId}
     * @secure
     */
    housingStocksDetail: (housingStockId: number, params: RequestParams = {}) =>
      this.request<HousingStockResponse, ErrorApiResponse>({
        path: `/api/HousingStocks/${housingStockId}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags HousingStocks
     * @name HousingStocksDelete
     * @summary HousingStocksDelete
     * @request DELETE:/api/HousingStocks/{housingStockId}
     * @secure
     */
    housingStocksDelete: (housingStockId: number, params: RequestParams = {}) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/HousingStocks/${housingStockId}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags HousingStocks
     * @name HousingStocksAddressesCreate
     * @summary HousingStocksCreate
     * @request POST:/api/HousingStocks/{housingStockId}/Addresses
     * @deprecated
     * @secure
     */
    housingStocksAddressesCreate: (
      housingStockId: number,
      data: BuildingAddressCreateRequest,
      params: RequestParams = {},
    ) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/HousingStocks/${housingStockId}/Addresses`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Старший оператор</li><li>Оператор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags HousingStocks
     * @name HousingStocksAddressesUpdate
     * @summary HousingStocksUpdate
     * @request PUT:/api/HousingStocks/{housingStockId}/Addresses/{addressId}
     * @deprecated
     * @secure
     */
    housingStocksAddressesUpdate: (
      housingStockId: number,
      addressId: number,
      data: BuildingAddressUpdateRequest,
      params: RequestParams = {},
    ) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/HousingStocks/${housingStockId}/Addresses/${addressId}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Старший оператор</li><li>Оператор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags HousingStocks
     * @name HousingStocksAddressesDelete
     * @summary HousingStocksUpdate
     * @request DELETE:/api/HousingStocks/{housingStockId}/Addresses/{addressId}
     * @deprecated
     * @secure
     */
    housingStocksAddressesDelete: (
      housingStockId: number,
      addressId: number,
      params: RequestParams = {},
    ) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/HousingStocks/${housingStockId}/Addresses/${addressId}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Контролёр</li><li>Супервайзер</li>
     *
     * @tags HousingStocks
     * @name HousingStocksNodesDetail
     * @summary HousingStocksRead
     * @request GET:/api/HousingStocks/{housingStockId}/Nodes
     * @deprecated
     * @secure
     */
    housingStocksNodesDetail: (
      housingStockId: number,
      params: RequestParams = {},
    ) =>
      this.request<NodeOnHousingStockResponse[], ErrorApiResponse>({
        path: `/api/HousingStocks/${housingStockId}/Nodes`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Контролёр</li><li>Супервайзер</li>
     *
     * @tags HousingStocks
     * @name HousingStocksCalculatorsDetail
     * @summary MeteringDevicesRead
     * @request GET:/api/HousingStocks/{housingStockId}/Calculators
     * @deprecated
     * @secure
     */
    housingStocksCalculatorsDetail: (
      housingStockId: number,
      params: RequestParams = {},
    ) =>
      this.request<CalculatorIntoHousingStockResponse[], ErrorApiResponse>({
        path: `/api/HousingStocks/${housingStockId}/Calculators`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Контролёр</li>
     *
     * @tags HousingStocks
     * @name HousingStocksExistingApartmentNumberDetail
     * @summary ApartmentsRead
     * @request GET:/api/HousingStocks/{housingStockId}/ExistingApartmentNumber
     * @secure
     */
    housingStocksExistingApartmentNumberDetail: (
      housingStockId: number,
      params: RequestParams = {},
    ) =>
      this.request<NumberIdResponse[], ErrorApiResponse>({
        path: `/api/HousingStocks/${housingStockId}/ExistingApartmentNumber`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Контролёр</li><li>Супервайзер</li>
     *
     * @tags HousingStocks
     * @name HousingStocksDoesApartmentExistDetail
     * @summary HousingStocksRead
     * @request GET:/api/HousingStocks/{housingStockId}/doesApartmentExist/{apartmentNumber}
     * @secure
     */
    housingStocksDoesApartmentExistDetail: (
      housingStockId: number,
      apartmentNumber: string,
      params: RequestParams = {},
    ) =>
      this.request<number, ErrorApiResponse>({
        path: `/api/HousingStocks/${housingStockId}/doesApartmentExist/${apartmentNumber}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Контролёр</li><li>Супервайзер</li>
     *
     * @tags HousingStocks
     * @name HousingStocksHousingStockWithTasksList
     * @summary HousingStocksRead
     * @request GET:/api/HousingStocks/HousingStockWithTasks
     * @deprecated
     * @secure
     */
    housingStocksHousingStockWithTasksList: (
      query?: {
        EngineeringElement?: ETaskEngineeringElement;
        ResourceTypes?: EResourceType[];
        TimeStatus?: EStageTimeStatus;
        TaskType?: EManagingFirmTaskFilterType;
        /** @format int32 */
        ExecutorId?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<HousingStockWithTasksResponse[], ErrorApiResponse>({
        path: `/api/HousingStocks/HousingStockWithTasks`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Контролёр</li><li>Супервайзер</li>
     *
     * @tags Individual
     * @name DevicesIndividualHouseList
     * @summary MeteringDevicesRead
     * @request GET:/api/Devices/Individual/House
     * @secure
     */
    devicesIndividualHouseList: (
      query: {
        City: string;
        Street: string;
        Number: string;
        Corpus?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<BuildingByFilterResponse, ErrorApiResponse>({
        path: `/api/Devices/Individual/House`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Контролёр</li><li>Супервайзер</li>
     *
     * @tags Individual
     * @name DevicesIndividualApartmentsList
     * @summary MeteringDevicesRead
     * @request GET:/api/Devices/Individual/Apartments
     * @secure
     */
    devicesIndividualApartmentsList: (
      query: {
        /** @format int32 */
        HousingStockId: number;
        ApartmentNumber?: string;
        deviceFilterResource?: EResourceType;
        deviceFilterModel?: string;
        deviceFilterClosingReason?: EClosingReason;
        deviceFilterMountPlace?: string;
        deviceFilterApartmentStatus?: EApartmentStatus;
        deviceFilterExpiresCheckingDateAt?: EExpiresDateAt;
        deviceFilterIsAlsoClosing?: boolean;
        /** @format int32 */
        PageNumber?: number;
        /** @format int32 */
        PageSize?: number;
        OrderBy?: EOrderByRule;
      },
      params: RequestParams = {},
    ) =>
      this.request<ApartmentByAddressFilterResponsePagedList, ErrorApiResponse>(
        {
          path: `/api/Devices/Individual/Apartments`,
          method: 'GET',
          query: query,
          secure: true,
          format: 'json',
          ...params,
        },
      ),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Контролёр</li><li>Супервайзер</li>
     *
     * @tags Individual
     * @name DevicesIndividualApartmentsDevicesDetail
     * @summary MeteringDevicesRead
     * @request GET:/api/Devices/Individual/Apartments/{apartmentId}/Devices
     * @secure
     */
    devicesIndividualApartmentsDevicesDetail: (
      apartmentId: number,
      params: RequestParams = {},
    ) =>
      this.request<IndividualDeviceResponseFromDevicePage[], ErrorApiResponse>({
        path: `/api/Devices/Individual/Apartments/${apartmentId}/Devices`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Контролёр</li><li>Супервайзер</li>
     *
     * @tags Individual
     * @name DevicesIndividualDetail
     * @summary MeteringDevicesRead
     * @request GET:/api/Devices/Individual/{deviceId}
     * @secure
     */
    devicesIndividualDetail: (deviceId: number, params: RequestParams = {}) =>
      this.request<
        IndividualDeviceResponseFromDevicePage,
        ErrorApiResponse | ProblemDetails
      >({
        path: `/api/Devices/Individual/${deviceId}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Контролёр</li><li>Супервайзер</li>
     *
     * @tags Individual
     * @name DevicesIndividualList
     * @summary MeteringDevicesRead
     * @request GET:/api/Devices/Individual
     * @secure
     */
    devicesIndividualList: (
      query?: {
        City?: string;
        Street?: string;
        HouseNumber?: string;
        HouseCorpus?: string;
        Model?: string;
        SerialNumber?: string;
        MountPlace?: string;
        Resource?: EResourceType;
        ApartmentStatus?: EApartmentStatus;
        ClosingReason?: EClosingReason;
        ExpiresCheckingDateAt?: EExpiresDateAt;
        IsAlsoClosing?: boolean;
        OrderRule?: EIndividualDeviceOrderRule;
        /** @format int32 */
        PageNumber?: number;
        /** @format int32 */
        PageSize?: number;
        OrderBy?: EOrderByRule;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        IndividualDeviceListResponseFromDevicePagePagedList,
        ErrorApiResponse
      >({
        path: `/api/Devices/Individual`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Контролёр</li><li>Супервайзер</li>
     *
     * @tags IndividualDeviceMountPlaces
     * @name IndividualDeviceMountPlacesList
     * @summary IndividualDeviceMountPlaceRead
     * @request GET:/api/IndividualDeviceMountPlaces
     * @secure
     */
    individualDeviceMountPlacesList: (
      query: {
        /** @format int32 */
        apartmentId: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        IndividualDeviceMountPlaceListWrappedResponse,
        ErrorApiResponse
      >({
        path: `/api/IndividualDeviceMountPlaces`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Контролёр</li><li>Супервайзер</li>
     *
     * @tags IndividualDeviceMountPlaces
     * @name IndividualDeviceMountPlacesAllList
     * @summary IndividualDeviceMountPlaceRead
     * @request GET:/api/IndividualDeviceMountPlaces/All
     * @secure
     */
    individualDeviceMountPlacesAllList: (params: RequestParams = {}) =>
      this.request<
        IndividualDeviceMountPlaceForFilterResponse[],
        ErrorApiResponse
      >({
        path: `/api/IndividualDeviceMountPlaces/All`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Старший оператор</li><li>Оператор</li>
     *
     * @tags IndividualDeviceReadings
     * @name IndividualDeviceReadingsCreateLiteCreate
     * @summary IndividualDeviceReadingsCreate
     * @request POST:/api/IndividualDeviceReadings/createLite
     * @secure
     */
    individualDeviceReadingsCreateLiteCreate: (
      data: IndividualDeviceReadingsCreateRequest,
      params: RequestParams = {},
    ) =>
      this.request<IndividualDeviceReadingsResponse, ErrorApiResponse>({
        path: `/api/IndividualDeviceReadings/createLite`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Старший оператор</li><li>Оператор</li>
     *
     * @tags IndividualDeviceReadings
     * @name IndividualDeviceReadingsCreateCreate
     * @summary IndividualDeviceReadingsCreate
     * @request POST:/api/IndividualDeviceReadings/create
     * @secure
     */
    individualDeviceReadingsCreateCreate: (
      data: IndividualDeviceReadingsCreateRequest,
      params: RequestParams = {},
    ) =>
      this.request<
        IndividualDeviceReadingsCreateListResponse,
        ErrorApiResponse
      >({
        path: `/api/IndividualDeviceReadings/create`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Старший оператор</li><li>Оператор</li>
     *
     * @tags IndividualDeviceReadings
     * @name IndividualDeviceReadingsRemoveCreate
     * @summary IndividualDeviceReadingsUpdate
     * @request POST:/api/IndividualDeviceReadings/{readingId}/remove
     * @secure
     */
    individualDeviceReadingsRemoveCreate: (
      readingId: number,
      params: RequestParams = {},
    ) =>
      this.request<IndividualDeviceReadingsResponse, ErrorApiResponse>({
        path: `/api/IndividualDeviceReadings/${readingId}/remove`,
        method: 'POST',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Супервайзер</li>
     *
     * @tags IndividualDeviceReadings
     * @name IndividualDeviceReadingsDataForSubscriberAndNormativeConsumptionPlotList
     * @summary DataForConsumptionPlotRead
     * @request GET:/api/IndividualDeviceReadings/DataForSubscriberAndNormativeConsumptionPlot
     * @secure
     */
    individualDeviceReadingsDataForSubscriberAndNormativeConsumptionPlotList: (
      query: {
        HousingStockIds: number[];
        ResourceType: EResourceType;
        /** @format date-time */
        From: string;
        /** @format date-time */
        To: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        GetDataForIndividualDevicesConsumptionPlotResponse,
        ErrorApiResponse
      >({
        path: `/api/IndividualDeviceReadings/DataForSubscriberAndNormativeConsumptionPlot`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Контролёр</li><li>Супервайзер</li>
     *
     * @tags IndividualDevices
     * @name IndividualDevicesDetail
     * @summary MeteringDevicesRead
     * @request GET:/api/IndividualDevices/{deviceId}
     * @secure
     */
    individualDevicesDetail: (deviceId: number, params: RequestParams = {}) =>
      this.request<IndividualDeviceResponse, ErrorApiResponse>({
        path: `/api/IndividualDevices/${deviceId}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags IndividualDevices
     * @name IndividualDevicesUpdate
     * @summary IndividualDeviceUpdate
     * @request PUT:/api/IndividualDevices/{deviceId}
     * @secure
     */
    individualDevicesUpdate: (
      deviceId: number,
      data: UpdateIndividualDeviceRequest,
      params: RequestParams = {},
    ) =>
      this.request<IndividualDeviceResponse, ErrorApiResponse>({
        path: `/api/IndividualDevices/${deviceId}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Контролёр</li><li>Супервайзер</li>
     *
     * @tags IndividualDevices
     * @name IndividualDevicesList
     * @summary MeteringDevicesRead
     * @request GET:/api/IndividualDevices
     * @secure
     */
    individualDevicesList: (
      query?: {
        /** @format int32 */
        ApartmentId?: number;
        /** @format int32 */
        HousingStockId?: number;
        Resource?: EResourceType;
        /** @format date-time */
        LastReadingsMonth?: string;
        /** @format int32 */
        TakeReadings?: number;
        ApartmentIds?: number[];
        IsOpened?: boolean;
        SerialNumber?: string;
        OrderRule?: EIndividualDeviceOrderRule;
        /** @format int32 */
        PageNumber?: number;
        /** @format int32 */
        PageSize?: number;
        OrderBy?: EOrderByRule;
      },
      params: RequestParams = {},
    ) =>
      this.request<IndividualDeviceListItemResponsePagedList, ErrorApiResponse>(
        {
          path: `/api/IndividualDevices`,
          method: 'GET',
          query: query,
          secure: true,
          format: 'json',
          ...params,
        },
      ),

    /**
     * @description Роли:<li>Администратор</li><li>Старший оператор</li><li>Оператор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags IndividualDevices
     * @name IndividualDevicesCreate
     * @summary IndividualDeviceCreate
     * @request POST:/api/IndividualDevices
     * @secure
     */
    individualDevicesCreate: (
      data: CreateIndividualDeviceRequest,
      params: RequestParams = {},
    ) =>
      this.request<IndividualDeviceResponse, ErrorApiResponse>({
        path: `/api/IndividualDevices`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Контролёр</li><li>Супервайзер</li>
     *
     * @tags IndividualDevices
     * @name IndividualDevicesGetAllClosingList
     * @summary MeteringDevicesRead
     * @request GET:/api/IndividualDevices/getAllClosing
     * @secure
     */
    individualDevicesGetAllClosingList: (params: RequestParams = {}) =>
      this.request<GetIndividualDevicesToClose, ErrorApiResponse>({
        path: `/api/IndividualDevices/getAllClosing`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Исполнитель УК</li>
     *
     * @tags IndividualDevices
     * @name IndividualDevicesSealUpdate
     * @summary IndividualDeviceUpdateSeal
     * @request PUT:/api/IndividualDevices/{deviceId}/seal
     * @secure
     */
    individualDevicesSealUpdate: (
      deviceId: number,
      data: UpdateIndividualDeviceSealRequest,
      params: RequestParams = {},
    ) =>
      this.request<IndividualDeviceResponse, ErrorApiResponse>({
        path: `/api/IndividualDevices/${deviceId}/seal`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Старший оператор</li><li>Оператор</li>
     *
     * @tags IndividualDevices
     * @name IndividualDevicesCloseCreate
     * @summary IndividualDeviceClose
     * @request POST:/api/IndividualDevices/{deviceId}/close
     * @secure
     */
    individualDevicesCloseCreate: (
      deviceId: number,
      data: CloseIndividualDeviceRequest,
      params: RequestParams = {},
    ) =>
      this.request<IndividualDeviceResponse, ErrorApiResponse>({
        path: `/api/IndividualDevices/${deviceId}/close`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Старший оператор</li><li>Оператор</li>
     *
     * @tags IndividualDevices
     * @name IndividualDevicesReopenCreate
     * @summary IndividualDeviceReopen
     * @request POST:/api/IndividualDevices/{deviceId}/reopen
     * @secure
     */
    individualDevicesReopenCreate: (
      deviceId: number,
      params: RequestParams = {},
    ) =>
      this.request<IndividualDeviceResponse, ErrorApiResponse>({
        path: `/api/IndividualDevices/${deviceId}/reopen`,
        method: 'POST',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags IndividualDevices
     * @name IndividualDevicesSwitchMagneticSealCreate
     * @summary IndividualDeviceUpdate
     * @request POST:/api/IndividualDevices/{deviceId}/SwitchMagneticSeal
     * @secure
     */
    individualDevicesSwitchMagneticSealCreate: (
      deviceId: number,
      data: SwitchMagneticSealRequest,
      params: RequestParams = {},
    ) =>
      this.request<IndividualDeviceResponse, ErrorApiResponse>({
        path: `/api/IndividualDevices/${deviceId}/SwitchMagneticSeal`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags IndividualDevices
     * @name IndividualDevicesSetMagneticSealCreate
     * @summary IndividualDeviceUpdate
     * @request POST:/api/IndividualDevices/{deviceId}/SetMagneticSeal
     * @secure
     */
    individualDevicesSetMagneticSealCreate: (
      deviceId: number,
      data: SetMagneticSealRequest,
      params: RequestParams = {},
    ) =>
      this.request<IndividualDeviceResponse, ErrorApiResponse>({
        path: `/api/IndividualDevices/${deviceId}/SetMagneticSeal`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Старший оператор</li><li>Оператор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags IndividualDevices
     * @name IndividualDevicesSwitchCreate
     * @summary IndividualDeviceCreate
     * @request POST:/api/IndividualDevices/{deviceId}/switch
     * @secure
     */
    individualDevicesSwitchCreate: (
      deviceId: number,
      data: SwitchIndividualDeviceRequest,
      params: RequestParams = {},
    ) =>
      this.request<IndividualDeviceResponse, ErrorApiResponse>({
        path: `/api/IndividualDevices/${deviceId}/switch`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags IndividualDevices
     * @name IndividualDevicesCheckCreate
     * @summary IndividualDeviceUpdate
     * @request POST:/api/IndividualDevices/{deviceId}/check
     * @secure
     */
    individualDevicesCheckCreate: (
      deviceId: number,
      data: CheckIndividualDeviceRequest,
      params: RequestParams = {},
    ) =>
      this.request<IndividualDeviceResponse, ErrorApiResponse>({
        path: `/api/IndividualDevices/${deviceId}/check`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Администратор УК без назначений задач</li><li>Контролёр</li><li>Супервайзер</li>
     *
     * @tags IndividualDevices
     * @name IndividualDevicesReadingsHistoryDetail
     * @summary IndividualDeviceReadingsRead
     * @request GET:/api/IndividualDevices/{deviceId}/readingsHistory
     * @secure
     */
    individualDevicesReadingsHistoryDetail: (
      deviceId: number,
      params: RequestParams = {},
    ) =>
      this.request<IndividualDeviceReadingsHistoryResponse, ErrorApiResponse>({
        path: `/api/IndividualDevices/${deviceId}/readingsHistory`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Старший оператор</li>
     *
     * @tags IndividualDevices
     * @name IndividualDevicesEditReadingsHistoryCreate
     * @summary IndividualDeviceReadingsHistoryUpdate
     * @request POST:/api/IndividualDevices/{deviceId}/editReadingsHistory
     * @secure
     */
    individualDevicesEditReadingsHistoryCreate: (
      deviceId: number,
      data: EditIndividualDeviceReadingsHistoryRequest,
      params: RequestParams = {},
    ) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/IndividualDevices/${deviceId}/editReadingsHistory`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Роли:<li>Старший оператор</li><li>Оператор</li>
     *
     * @tags IndividualDevices
     * @name IndividualDevicesCreateTaskForDeviceWithoutReadingsCreate
     * @summary IndividualDeviceClose
     * @request POST:/api/IndividualDevices/createTaskForDeviceWithoutReadings
     * @secure
     */
    individualDevicesCreateTaskForDeviceWithoutReadingsCreate: (
      query?: {
        /** @format date-time */
        FromDate?: string;
        ExceptedHmIds?: string[];
        HmIds?: string[];
        Command?: PollCommand;
        /** @format int32 */
        PollId?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<PollResponse, ErrorApiResponse>({
        path: `/api/IndividualDevices/createTaskForDeviceWithoutReadings`,
        method: 'POST',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Старший оператор</li><li>Оператор</li>
     *
     * @tags IndividualDevices
     * @name IndividualDevicesCloseDevicesWithoutReadingsCreate
     * @summary IndividualDeviceClose
     * @request POST:/api/IndividualDevices/closeDevicesWithoutReadings
     * @secure
     */
    individualDevicesCloseDevicesWithoutReadingsCreate: (
      query?: {
        ExceptedHmIds?: string[];
        HmIds?: string[];
        ManagementFirmIds?: number[];
        /**
         * Кол-во месяцев без показаний от текущего
         * @format int32
         */
        MonthsToCloseDevice?: number;
        Command?: PollCommand;
        /** @format int32 */
        PollId?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<PollResponse, ErrorApiResponse>({
        path: `/api/IndividualDevices/closeDevicesWithoutReadings`,
        method: 'POST',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Старший оператор</li><li>Оператор</li>
     *
     * @tags IndividualDevices
     * @name IndividualDevicesCloseDevicesByCheckingDateCreate
     * @summary IndividualDeviceClose
     * @request POST:/api/IndividualDevices/closeDevicesByCheckingDate
     * @secure
     */
    individualDevicesCloseDevicesByCheckingDateCreate: (
      query?: {
        Command?: PollCommand;
        /** @format int32 */
        PollId?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<PollResponse, ErrorApiResponse>({
        path: `/api/IndividualDevices/closeDevicesByCheckingDate`,
        method: 'POST',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Старший оператор</li>
     *
     * @tags IndividualDevices
     * @name IndividualDevicesDeleteCreate
     * @summary IndividualDeviceDelete
     * @request POST:/api/IndividualDevices/{deviceId}/Delete
     * @secure
     */
    individualDevicesDeleteCreate: (
      deviceId: number,
      params: RequestParams = {},
    ) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/IndividualDevices/${deviceId}/Delete`,
        method: 'POST',
        secure: true,
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Администратор УК без назначений задач</li><li>Контролёр</li><li>Супервайзер</li>
     *
     * @tags IndividualDevices
     * @name IndividualDevicesConsumptionDetail
     * @summary IndividualDeviceReadingsRead
     * @request GET:/api/IndividualDevices/{deviceId}/Consumption
     * @secure
     */
    individualDevicesConsumptionDetail: (
      deviceId: number,
      params: RequestParams = {},
    ) =>
      this.request<IndividualDeviceConsumptionResponse[], ErrorApiResponse>({
        path: `/api/IndividualDevices/${deviceId}/Consumption`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Администратор УК без назначений задач</li><li>Контролёр</li><li>Супервайзер</li>
     *
     * @tags IndividualDevices
     * @name IndividualDevicesLastReadingDetail
     * @summary IndividualDeviceReadingsRead
     * @request GET:/api/IndividualDevices/{deviceId}/LastReading
     * @secure
     */
    individualDevicesLastReadingDetail: (
      deviceId: number,
      params: RequestParams = {},
    ) =>
      this.request<IndividualDeviceReadingsSlimResponse, ErrorApiResponse>({
        path: `/api/IndividualDevices/${deviceId}/LastReading`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Старший оператор</li><li>Оператор</li><li>Администратор УК без назначений задач</li><li>Супервайзер</li>
     *
     * @tags Inspectors
     * @name InspectorsList
     * @summary InspectorRead
     * @request GET:/api/Inspectors
     * @secure
     */
    inspectorsList: (params: RequestParams = {}) =>
      this.request<InspectorResponse[], ErrorApiResponse>({
        path: `/api/Inspectors`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Старший оператор</li><li>Оператор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags Inspectors
     * @name InspectorsCreate
     * @summary InspectorCreate
     * @request POST:/api/Inspectors
     * @secure
     */
    inspectorsCreate: (
      data: InspectorCreateRequest,
      params: RequestParams = {},
    ) =>
      this.request<InspectorResponse, ErrorApiResponse>({
        path: `/api/Inspectors`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Старший оператор</li><li>Оператор</li><li>Администратор УК без назначений задач</li><li>Супервайзер</li>
     *
     * @tags Inspectors
     * @name InspectorsDetail
     * @summary InspectorRead
     * @request GET:/api/Inspectors/{inspectorId}
     * @secure
     */
    inspectorsDetail: (inspectorId: number, params: RequestParams = {}) =>
      this.request<InspectorResponsePagedList, ErrorApiResponse>({
        path: `/api/Inspectors/${inspectorId}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Старший оператор</li><li>Оператор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags Inspectors
     * @name InspectorsPartialUpdate
     * @summary InspectorUpdate
     * @request PATCH:/api/Inspectors/{inspectorId}
     * @secure
     */
    inspectorsPartialUpdate: (
      inspectorId: number,
      data: InspectorUpdateRequest,
      params: RequestParams = {},
    ) =>
      this.request<InspectorResponse, ErrorApiResponse>({
        path: `/api/Inspectors/${inspectorId}`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Старший оператор</li><li>Оператор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags Inspectors
     * @name InspectorsDelete
     * @summary InspectorDelete
     * @request DELETE:/api/Inspectors/{inspectorId}
     * @secure
     */
    inspectorsDelete: (inspectorId: number, params: RequestParams = {}) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/Inspectors/${inspectorId}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Старший оператор</li><li>Оператор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags Inspectors
     * @name InspectorsHousingStocksPartialUpdate
     * @summary InspectorUpdate
     * @request PATCH:/api/Inspectors/{inspectorId}/housingStocks
     * @secure
     */
    inspectorsHousingStocksPartialUpdate: (
      inspectorId: number,
      data: InspectorReassignAllAddressesRequest,
      params: RequestParams = {},
    ) =>
      this.request<InspectorResponse, ErrorApiResponse>({
        path: `/api/Inspectors/${inspectorId}/housingStocks`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Старший оператор</li><li>Оператор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags Inspectors
     * @name InspectorsHousingStocksDelete
     * @summary InspectorUpdate
     * @request DELETE:/api/Inspectors/{inspectorId}/housingStocks
     * @secure
     */
    inspectorsHousingStocksDelete: (
      inspectorId: number,
      params: RequestParams = {},
    ) =>
      this.request<InspectorResponse, ErrorApiResponse>({
        path: `/api/Inspectors/${inspectorId}/housingStocks`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Контролёр</li><li>Супервайзер</li>
     *
     * @tags ManagingFirms
     * @name ManagingFirmsConsumptionRatesDetail
     * @summary OrganizationsRead
     * @request GET:/api/ManagingFirms/{managingFirmId}/ConsumptionRates
     * @secure
     */
    managingFirmsConsumptionRatesDetail: (
      managingFirmId: number,
      params: RequestParams = {},
    ) =>
      this.request<
        EResourceTypeConsumptionRateResponseDictionaryItem[],
        ErrorApiResponse
      >({
        path: `/api/ManagingFirms/${managingFirmId}/ConsumptionRates`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Администратор УК без назначений задач</li><li>Супервайзер</li>
     *
     * @tags ManagingFirms
     * @name ManagingFirmsTemperatureNormativesList
     * @summary TemperatureNormativeRead
     * @request GET:/api/ManagingFirms/TemperatureNormatives
     * @secure
     */
    managingFirmsTemperatureNormativesList: (params: RequestParams = {}) =>
      this.request<TemperatureNormativeResponse, ErrorApiResponse>({
        path: `/api/ManagingFirms/TemperatureNormatives`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags ManagingFirms
     * @name ManagingFirmsTemperatureNormativesDelete
     * @summary TemperatureNormativeWrite
     * @request DELETE:/api/ManagingFirms/TemperatureNormatives
     * @secure
     */
    managingFirmsTemperatureNormativesDelete: (
      data: TemperatureNormativeDeleteRequest,
      params: RequestParams = {},
    ) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/ManagingFirms/TemperatureNormatives`,
        method: 'DELETE',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags ManagingFirms
     * @name ManagingFirmsTemperatureNormativesCreateOrUpdateCreate
     * @summary TemperatureNormativeWrite
     * @request POST:/api/ManagingFirms/TemperatureNormatives/CreateOrUpdate
     * @secure
     */
    managingFirmsTemperatureNormativesCreateOrUpdateCreate: (
      data: TemperatureNormativeUpdateRequest,
      params: RequestParams = {},
    ) =>
      this.request<TemperatureNormativeResponse, ErrorApiResponse>({
        path: `/api/ManagingFirms/TemperatureNormatives/CreateOrUpdate`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags ManagingFirms
     * @name ManagingFirmsTemperatureNormativesCreateOrUpdateFromFileCreate
     * @summary TemperatureNormativeWrite
     * @request POST:/api/ManagingFirms/TemperatureNormatives/CreateOrUpdateFromFile
     * @secure
     */
    managingFirmsTemperatureNormativesCreateOrUpdateFromFileCreate: (
      data: {
        /** @format binary */
        file: File;
      },
      params: RequestParams = {},
    ) =>
      this.request<TemperatureNormativeResponse, ErrorApiResponse>({
        path: `/api/ManagingFirms/TemperatureNormatives/CreateOrUpdateFromFile`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Администратор УК без назначений задач</li><li>Супервайзер</li>
     *
     * @tags ManagingFirms
     * @name ManagingFirmsTemperatureNormativesTemplateFileList
     * @summary TemperatureNormativeRead
     * @request GET:/api/ManagingFirms/TemperatureNormatives/TemplateFile
     * @secure
     */
    managingFirmsTemperatureNormativesTemplateFileList: (
      params: RequestParams = {},
    ) =>
      this.request<File, ErrorApiResponse>({
        path: `/api/ManagingFirms/TemperatureNormatives/TemplateFile`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Контролёр</li><li>Супервайзер</li>
     *
     * @tags MeteringDevices
     * @name MeteringDevicesList
     * @summary MeteringDevicesRead
     * @request GET:/api/MeteringDevices
     * @secure
     */
    meteringDevicesList: (
      query?: {
        OperationStatus?: string;
        PersonalAccountNumber?: string;
        SerialNumber?: string;
        SealNumber?: string;
        /** @format date-time */
        SealInstallationDate?: string;
        DeviceTypes?: string[];
        /** @format int32 */
        ApartmentId?: number;
        /** @format int32 */
        HousingStockId?: number;
        /** @format int32 */
        PageNumber?: number;
        /** @format int32 */
        PageSize?: number;
        OrderBy?: EOrderByRule;
      },
      params: RequestParams = {},
    ) =>
      this.request<MeteringDeviceListResponsePagedList, ErrorApiResponse>({
        path: `/api/MeteringDevices`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Контролёр</li><li>Супервайзер</li>
     *
     * @tags MeteringDevices
     * @name MeteringDevicesSearchList
     * @summary MeteringDevicesRead
     * @request GET:/api/MeteringDevices/search
     * @secure
     */
    meteringDevicesSearchList: (
      query?: {
        DeviceType?: string;
        Status?: string;
        Question?: string;
        /** @format int32 */
        Take?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<MeteringDeviceSearchListResponse[], ErrorApiResponse>({
        path: `/api/MeteringDevices/search`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Контролёр</li><li>Супервайзер</li>
     *
     * @tags MeteringDevices
     * @name MeteringDevicesDetail
     * @summary MeteringDevicesRead
     * @request GET:/api/MeteringDevices/{meteringDeviceId}
     * @secure
     */
    meteringDevicesDetail: (
      meteringDeviceId: number,
      params: RequestParams = {},
    ) =>
      this.request<MeteringDeviceResponse, ErrorApiResponse>({
        path: `/api/MeteringDevices/${meteringDeviceId}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Контролёр</li><li>Супервайзер</li>
     *
     * @tags MeteringDevices
     * @name MeteringDevicesRelatedList
     * @summary MeteringDevicesRead
     * @request GET:/api/MeteringDevices/related
     * @secure
     */
    meteringDevicesRelatedList: (
      query: {
        /** @format int32 */
        DeviceId: number;
        /** @format int32 */
        PipeNumber?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<MeteringDeviceListResponse[], ErrorApiResponse>({
        path: `/api/MeteringDevices/related`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Администратор УК без назначений задач</li>
     *
     * @tags MeteringDevices
     * @name MeteringDevicesCloseCreate
     * @summary MeteringDevicesClose
     * @request POST:/api/MeteringDevices/close
     * @secure
     */
    meteringDevicesCloseCreate: (
      data: CloseDeviceRequest,
      params: RequestParams = {},
    ) =>
      this.request<any, ErrorApiResponse>({
        path: `/api/MeteringDevices/close`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Администратор УК без назначений задач</li>
     *
     * @tags MeteringDevices
     * @name MeteringDevicesCheckCreate
     * @summary MeteringDevicesCheck
     * @request POST:/api/MeteringDevices/check
     * @secure
     */
    meteringDevicesCheckCreate: (
      data: CheckDeviceRequest,
      params: RequestParams = {},
    ) =>
      this.request<any, ErrorApiResponse>({
        path: `/api/MeteringDevices/check`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Контролёр</li><li>Супервайзер</li>
     *
     * @tags MeteringDevices
     * @name MeteringDevicesExistingModelsList
     * @summary MeteringDevicesRead
     * @request GET:/api/MeteringDevices/ExistingModels
     * @secure
     */
    meteringDevicesExistingModelsList: (
      query?: {
        Type?: EMeteringDeviceType;
        Text?: string;
        /** @format int32 */
        PageNumber?: number;
        /** @format int32 */
        PageSize?: number;
        OrderBy?: EOrderByRule;
      },
      params: RequestParams = {},
    ) =>
      this.request<StringPagedList, ErrorApiResponse>({
        path: `/api/MeteringDevices/ExistingModels`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Супервайзер</li>
     *
     * @tags Nodes
     * @name NodesList
     * @summary NodeRead
     * @request GET:/api/Nodes
     * @secure
     */
    nodesList: (
      query?: {
        /** @format int32 */
        CalculatorId?: number;
        IsConnected?: boolean;
        HasInvalidConfiguration?: boolean;
        /** @format int32 */
        BuildingId?: number;
        addressCity?: string;
        addressStreet?: string;
        addressHousingStockNumber?: string;
        addressCorpus?: string;
        addressHouseCategory?: EHouseCategory;
        Type?: ENodeType;
        Resource?: EResourceType;
        RegistrationType?: ENodeRegistrationType;
        CommercialStatus?: ENodeCommercialAccountStatus;
        devicesFilterExpiresCheckingDateAt?: EExpiresDateAt;
        devicesFilterModel?: string;
        devicesFilterQuestion?: string;
        devicesFilterPipeDiameters?: number[];
        /** @format date-time */
        commercialDateRangeFrom?: string;
        /** @format date-time */
        commercialDateRangeTo?: string;
        ExpiresAdmissionActDateAt?: EExpiresDateAt;
        /** @format int32 */
        PageNumber?: number;
        /** @format int32 */
        PageSize?: number;
        OrderBy?: EOrderByRule;
      },
      params: RequestParams = {},
    ) =>
      this.request<NodesPagedList, ErrorApiResponse>({
        path: `/api/Nodes`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Администратор УК без назначений задач</li>
     *
     * @tags Nodes
     * @name NodesDocumentsCreate
     * @summary NodeUpdate
     * @request POST:/api/Nodes/{nodeId}/Documents
     * @secure
     */
    nodesDocumentsCreate: (
      nodeId: number,
      data: AddNodeDocumentsRequest,
      params: RequestParams = {},
    ) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/Nodes/${nodeId}/Documents`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Супервайзер</li>
     *
     * @tags Nodes
     * @name NodesChecksDetail
     * @summary NodeCheckRead
     * @request GET:/api/Nodes/{nodeId}/Checks
     * @secure
     */
    nodesChecksDetail: (
      nodeId: number,
      query?: {
        /** @format int32 */
        PageNumber?: number;
        /** @format int32 */
        PageSize?: number;
        OrderBy?: EOrderByRule;
      },
      params: RequestParams = {},
    ) =>
      this.request<NodeCheckResponsePagedList, ErrorApiResponse>({
        path: `/api/Nodes/${nodeId}/Checks`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li>
     *
     * @tags Nodes
     * @name NodesChecksCreate
     * @summary NodeCheckCreate
     * @request POST:/api/Nodes/{nodeId}/Checks
     * @secure
     */
    nodesChecksCreate: (
      nodeId: number,
      data: CreateNodeCheckRequest,
      params: RequestParams = {},
    ) =>
      this.request<NodeCheckResponse, ErrorApiResponse>({
        path: `/api/Nodes/${nodeId}/Checks`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li>
     *
     * @tags Nodes
     * @name NodesChecksUpdate
     * @summary NodeCheckUpdate
     * @request PUT:/api/Nodes/{nodeId}/Checks/{checkId}
     * @secure
     */
    nodesChecksUpdate: (
      nodeId: number,
      checkId: number,
      data: UpdateNodeCheckRequest,
      params: RequestParams = {},
    ) =>
      this.request<NodeCheckResponse, ErrorApiResponse>({
        path: `/api/Nodes/${nodeId}/Checks/${checkId}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li>
     *
     * @tags Nodes
     * @name NodesChecksDelete
     * @summary NodeCheckDelete
     * @request DELETE:/api/Nodes/{nodeId}/Checks/{checkId}
     * @secure
     */
    nodesChecksDelete: (
      nodeId: number,
      checkId: number,
      params: RequestParams = {},
    ) =>
      this.request<NodeCheckResponse, ErrorApiResponse>({
        path: `/api/Nodes/${nodeId}/Checks/${checkId}`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Администратор УК без назначений задач</li><li>Супервайзер</li>
     *
     * @tags Nodes
     * @name NodesStatisticsDetail
     * @summary ReportRead
     * @request GET:/api/Nodes/{nodeId}/Statistics
     * @secure
     */
    nodesStatisticsDetail: (
      nodeId: number,
      query?: {
        ReportType?: EReportType;
        /** @format date-time */
        From?: string;
        /** @format date-time */
        To?: string;
        ReportFormat?: EReportFormat;
      },
      params: RequestParams = {},
    ) =>
      this.request<ArchivesDataModel, ErrorApiResponse>({
        path: `/api/Nodes/${nodeId}/Statistics`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Администратор УК без назначений задач</li><li>Супервайзер</li>
     *
     * @tags Nodes
     * @name NodesTaskStatisticsDetail
     * @summary ReportRead
     * @request GET:/api/Nodes/{nodeId}/TaskStatistics
     * @secure
     */
    nodesTaskStatisticsDetail: (
      nodeId: number,
      query?: {
        ReportType?: EReportType;
        /** @format date-time */
        From?: string;
        /** @format date-time */
        To?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<TaskStatisticsResponse, ErrorApiResponse>({
        path: `/api/Nodes/${nodeId}/TaskStatistics`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Супервайзер</li>
     *
     * @tags Nodes
     * @name NodesDataForHousingConsumptionPlotList
     * @summary DataForConsumptionPlotRead
     * @request GET:/api/Nodes/DataForHousingConsumptionPlot
     * @secure
     */
    nodesDataForHousingConsumptionPlotList: (
      query: {
        BuildingIds?: number[];
        ResourceType: EResourceType;
        /** @format date-time */
        From: string;
        /** @format date-time */
        To: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<GetDataForHousingConsumptionPlotResponse, ErrorApiResponse>({
        path: `/api/Nodes/DataForHousingConsumptionPlot`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Супервайзер</li>
     *
     * @tags Nodes
     * @name NodesSummaryHousingConsumptionsByResourcesList
     * @summary DataForConsumptionPlotRead
     * @request GET:/api/Nodes/SummaryHousingConsumptionsByResources
     * @secure
     */
    nodesSummaryHousingConsumptionsByResourcesList: (
      query: {
        BuildingIds?: number[];
        /** @format date-time */
        From: string;
        /** @format date-time */
        To: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        GetSummaryHousingConsumptionsByResourcesResponse,
        ErrorApiResponse
      >({
        path: `/api/Nodes/SummaryHousingConsumptionsByResources`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Контролёр</li><li>Супервайзер</li>
     *
     * @tags NodeServiceZones
     * @name NodeServiceZonesList
     * @summary MeteringDevicesRead
     * @request GET:/api/NodeServiceZones
     * @secure
     */
    nodeServiceZonesList: (params: RequestParams = {}) =>
      this.request<NodeServiceZoneListResponse, ErrorApiResponse>({
        path: `/api/NodeServiceZones`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Администратор УК без назначений задач</li>
     *
     * @tags NodeServiceZones
     * @name NodeServiceZonesCreate
     * @summary CalculatorUpdate
     * @request POST:/api/NodeServiceZones
     * @secure
     */
    nodeServiceZonesCreate: (
      data: NodeServiceZoneRequest,
      params: RequestParams = {},
    ) =>
      this.request<NodeServiceZoneResponse, ErrorApiResponse>({
        path: `/api/NodeServiceZones`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Контролёр</li><li>Супервайзер</li>
     *
     * @tags NodeServiceZones
     * @name NodeServiceZonesDetail
     * @summary MeteringDevicesRead
     * @request GET:/api/NodeServiceZones/{nodeServiceZoneId}
     * @secure
     */
    nodeServiceZonesDetail: (
      nodeServiceZoneId: number,
      params: RequestParams = {},
    ) =>
      this.request<NodeServiceZoneWithNodeCountResponse, ErrorApiResponse>({
        path: `/api/NodeServiceZones/${nodeServiceZoneId}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Администратор УК без назначений задач</li>
     *
     * @tags NodeServiceZones
     * @name NodeServiceZonesUpdate
     * @summary CalculatorUpdate
     * @request PUT:/api/NodeServiceZones/{nodeServiceZoneId}
     * @secure
     */
    nodeServiceZonesUpdate: (
      nodeServiceZoneId: number,
      data: NodeServiceZoneRequest,
      params: RequestParams = {},
    ) =>
      this.request<NodeServiceZoneResponse, ErrorApiResponse>({
        path: `/api/NodeServiceZones/${nodeServiceZoneId}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Администратор УК без назначений задач</li>
     *
     * @tags NodeServiceZones
     * @name NodeServiceZonesDelete
     * @summary CalculatorUpdate
     * @request DELETE:/api/NodeServiceZones/{nodeServiceZoneId}
     * @secure
     */
    nodeServiceZonesDelete: (
      nodeServiceZoneId: number,
      params: RequestParams = {},
    ) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/NodeServiceZones/${nodeServiceZoneId}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Супервайзер</li>
     *
     * @tags NodeWorkingRange
     * @name NodeWorkingRangeList
     * @summary NodeWorkingRangeRead
     * @request GET:/api/NodeWorkingRange
     * @secure
     */
    nodeWorkingRangeList: (
      query: {
        nodeResourceType: EResourceType;
        season: ENodeWorkingRangeSeason;
      },
      params: RequestParams = {},
    ) =>
      this.request<AllNodeWorkingRangeResponse, ErrorApiResponse>({
        path: `/api/NodeWorkingRange`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Супервайзер</li>
     *
     * @tags NodeWorkingRange
     * @name NodeWorkingRangeHouseManagementDetail
     * @summary NodeWorkingRangeRead
     * @request GET:/api/NodeWorkingRange/HouseManagement/{houseManagementId}
     * @secure
     */
    nodeWorkingRangeHouseManagementDetail: (
      houseManagementId: string,
      query: {
        nodeResourceType: EResourceType;
        season: ENodeWorkingRangeSeason;
      },
      params: RequestParams = {},
    ) =>
      this.request<AllNodeWorkingRangeResponse, ErrorApiResponse>({
        path: `/api/NodeWorkingRange/HouseManagement/${houseManagementId}`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Супервайзер</li>
     *
     * @tags NodeWorkingRange
     * @name NodeWorkingRangeHousingStockDetail
     * @summary NodeWorkingRangeRead
     * @request GET:/api/NodeWorkingRange/HousingStock/{housingStockId}
     * @secure
     */
    nodeWorkingRangeHousingStockDetail: (
      housingStockId: number,
      query: {
        nodeResourceType: EResourceType;
        season: ENodeWorkingRangeSeason;
      },
      params: RequestParams = {},
    ) =>
      this.request<AllNodeWorkingRangeResponse, ErrorApiResponse>({
        path: `/api/NodeWorkingRange/HousingStock/${housingStockId}`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Супервайзер</li>
     *
     * @tags NodeWorkingRange
     * @name NodeWorkingRangeNodeDetail
     * @summary NodeWorkingRangeRead
     * @request GET:/api/NodeWorkingRange/Node/{nodeId}
     * @secure
     */
    nodeWorkingRangeNodeDetail: (
      nodeId: number,
      query: {
        season: ENodeWorkingRangeSeason;
      },
      params: RequestParams = {},
    ) =>
      this.request<AllNodeWorkingRangeResponse, ErrorApiResponse>({
        path: `/api/NodeWorkingRange/Node/${nodeId}`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags NodeWorkingRange
     * @name NodeWorkingRangeAddOrUpdateCreate
     * @summary NodeWorkingRangeAddOrUpdate
     * @request POST:/api/NodeWorkingRange/AddOrUpdate
     * @secure
     */
    nodeWorkingRangeAddOrUpdateCreate: (
      data: AddOrUpdateNodeWorkingRangeRequest,
      params: RequestParams = {},
    ) =>
      this.request<ValueNodeWorkingRangeResponse, ErrorApiResponse>({
        path: `/api/NodeWorkingRange/AddOrUpdate`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags NodeWorkingRange
     * @name NodeWorkingRangeDisableDelete
     * @summary NodeWorkingRangeAddOrUpdate
     * @request DELETE:/api/NodeWorkingRange/Disable
     * @secure
     */
    nodeWorkingRangeDisableDelete: (
      data: DisableNodeWorkingRangeRequest,
      params: RequestParams = {},
    ) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/NodeWorkingRange/Disable`,
        method: 'DELETE',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Супервайзер</li>
     *
     * @tags NodeWorkingRange
     * @name NodeWorkingRangeTypesList
     * @summary NodeWorkingRangeRead
     * @request GET:/api/NodeWorkingRange/Types
     * @secure
     */
    nodeWorkingRangeTypesList: (params: RequestParams = {}) =>
      this.request<
        ENodeWorkingRangeTypeStringDictionaryItem[],
        ErrorApiResponse
      >({
        path: `/api/NodeWorkingRange/Types`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags NonResidentialBuildings
     * @name NonResidentialBuildingsCreate
     * @summary HousingStocksCreate
     * @request POST:/api/NonResidentialBuildings
     * @secure
     */
    nonResidentialBuildingsCreate: (
      data: NonResidentialBuildingCreateRequest,
      params: RequestParams = {},
    ) =>
      this.request<NonResidentialBuildingResponse, ErrorApiResponse>({
        path: `/api/NonResidentialBuildings`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Старший оператор</li><li>Оператор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags NonResidentialBuildings
     * @name NonResidentialBuildingsUpdate
     * @summary HousingStocksUpdate
     * @request PUT:/api/NonResidentialBuildings/{buildingId}
     * @secure
     */
    nonResidentialBuildingsUpdate: (
      buildingId: number,
      data: NonResidentialBuildingUpdateRequest,
      params: RequestParams = {},
    ) =>
      this.request<NonResidentialBuildingResponse, ErrorApiResponse>({
        path: `/api/NonResidentialBuildings/${buildingId}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Контролёр</li><li>Супервайзер</li>
     *
     * @tags NonResidentialBuildings
     * @name NonResidentialBuildingsDetail
     * @summary HousingStocksRead
     * @request GET:/api/NonResidentialBuildings/{buildingId}
     * @secure
     */
    nonResidentialBuildingsDetail: (
      buildingId: number,
      params: RequestParams = {},
    ) =>
      this.request<NonResidentialBuildingResponse, ErrorApiResponse>({
        path: `/api/NonResidentialBuildings/${buildingId}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags NonResidentialBuildings
     * @name NonResidentialBuildingsDelete
     * @summary NonResidentialBuildingsDelete
     * @request DELETE:/api/NonResidentialBuildings/{buildingId}
     * @secure
     */
    nonResidentialBuildingsDelete: (
      buildingId: number,
      params: RequestParams = {},
    ) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/NonResidentialBuildings/${buildingId}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Супервайзер</li>
     *
     * @tags OrganizationCompetences
     * @name OrganizationCompetencesList
     * @summary OrganizationCompetenceRead
     * @request GET:/api/OrganizationCompetences
     * @secure
     */
    organizationCompetencesList: (params: RequestParams = {}) =>
      this.request<ManagementFirmCompetencesListResponse, ErrorApiResponse>({
        path: `/api/OrganizationCompetences`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags OrganizationCompetences
     * @name OrganizationCompetencesDelete
     * @summary OrganizationCompetenceUpdate
     * @request DELETE:/api/OrganizationCompetences/{id}
     * @secure
     */
    organizationCompetencesDelete: (id: string, params: RequestParams = {}) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/OrganizationCompetences/${id}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Старший оператор</li><li>Оператор</li><li>Супервайзер</li>
     *
     * @tags Organizations
     * @name OrganizationsList
     * @summary OrganizationsReadAll
     * @request GET:/api/Organizations
     * @secure
     */
    organizationsList: (
      query?: {
        HeadManagementIncluded?: boolean;
        /** @format int32 */
        PageNumber?: number;
        /** @format int32 */
        PageSize?: number;
        OrderBy?: EOrderByRule;
      },
      params: RequestParams = {},
    ) =>
      this.request<OrganizationResponsePagedList, ErrorApiResponse>({
        path: `/api/Organizations`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Контролёр</li><li>Супервайзер</li>
     *
     * @tags Organizations
     * @name OrganizationsCurrentList
     * @summary OrganizationsRead
     * @request GET:/api/Organizations/current
     * @secure
     */
    organizationsCurrentList: (params: RequestParams = {}) =>
      this.request<OrganizationResponse, ErrorApiResponse>({
        path: `/api/Organizations/current`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags Organizations
     * @name OrganizationsUpdate
     * @summary OrganizationsUpdate
     * @request PUT:/api/Organizations/{managingFirmId}
     * @secure
     */
    organizationsUpdate: (
      managingFirmId: number,
      data: OrganizationUpdateRequest,
      params: RequestParams = {},
    ) =>
      this.request<OrganizationResponse, ErrorApiResponse>({
        path: `/api/Organizations/${managingFirmId}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Контролёр</li><li>Супервайзер</li>
     *
     * @tags OrganizationUsers
     * @name OrganizationUsersList
     * @summary OrganizationUsersRead
     * @request GET:/api/OrganizationUsers
     * @secure
     */
    organizationUsersList: (
      query?: {
        Name?: string;
        IsSuspended?: boolean;
        RoleNames?: ESecuredIdentityRoleName[];
        WorkingStatusType?: EOrganizationUserWorkingStatusType;
        /** @format int32 */
        PageNumber?: number;
        /** @format int32 */
        PageSize?: number;
        OrderBy?: EOrderByRule;
      },
      params: RequestParams = {},
    ) =>
      this.request<OrganizationUserListResponsePagedList, ErrorApiResponse>({
        path: `/api/OrganizationUsers`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags OrganizationUsers
     * @name OrganizationUsersCreate
     * @summary OrganizationUsersCreate
     * @request POST:/api/OrganizationUsers
     * @secure
     */
    organizationUsersCreate: (
      data: OrganizationUserCreateRequest,
      params: RequestParams = {},
    ) =>
      this.request<OrganizationUserResponse, ErrorApiResponse>({
        path: `/api/OrganizationUsers`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Контролёр</li><li>Супервайзер</li>
     *
     * @tags OrganizationUsers
     * @name OrganizationUsersDetail
     * @summary OrganizationUsersRead
     * @request GET:/api/OrganizationUsers/{userId}
     * @secure
     */
    organizationUsersDetail: (userId: number, params: RequestParams = {}) =>
      this.request<OrganizationUserResponse, ErrorApiResponse>({
        path: `/api/OrganizationUsers/${userId}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags OrganizationUsers
     * @name OrganizationUsersUpdate
     * @summary OrganizationUsersUpdate
     * @request PUT:/api/OrganizationUsers/{userId}
     * @secure
     */
    organizationUsersUpdate: (
      userId: number,
      data: OrganizationUserUpdateRequest,
      params: RequestParams = {},
    ) =>
      this.request<OrganizationUserResponse, ErrorApiResponse>({
        path: `/api/OrganizationUsers/${userId}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Контролёр</li><li>Супервайзер</li>
     *
     * @tags OrganizationUsers
     * @name OrganizationUsersTasksDetail
     * @summary OrganizationUsersRead
     * @request GET:/api/OrganizationUsers/{userId}/Tasks
     * @secure
     */
    organizationUsersTasksDetail: (
      userId: number,
      query?: {
        CurrentStageRequiredUserRole?: ESecuredIdentityRoleName;
        /** @format int32 */
        PageNumber?: number;
        /** @format int32 */
        PageSize?: number;
        OrderBy?: EOrderByRule;
      },
      params: RequestParams = {},
    ) =>
      this.request<TasksPagedList, ErrorApiResponse>({
        path: `/api/OrganizationUsers/${userId}/Tasks`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Старший оператор</li><li>Оператор</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li>
     *
     * @tags OrganizationUsers
     * @name OrganizationUsersReassignTasksCreate
     * @summary TaskAssign
     * @request POST:/api/OrganizationUsers/ReassignTasks
     * @secure
     */
    organizationUsersReassignTasksCreate: (
      data: ReassignTasksRequest,
      params: RequestParams = {},
    ) =>
      this.request<any, ErrorApiResponse>({
        path: `/api/OrganizationUsers/ReassignTasks`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Контролёр</li><li>Супервайзер</li>
     *
     * @tags OrganizationUsers
     * @name OrganizationUsersCurrentList
     * @summary OrganizationUsersRead
     * @request GET:/api/OrganizationUsers/current
     * @secure
     */
    organizationUsersCurrentList: (params: RequestParams = {}) =>
      this.request<OrganizationUserResponse, ErrorApiResponse>({
        path: `/api/OrganizationUsers/current`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags OrganizationUsers
     * @name OrganizationUsersSuspendCreate
     * @summary OrganizationUsersUpdate
     * @request POST:/api/OrganizationUsers/{userId}/suspend
     * @secure
     */
    organizationUsersSuspendCreate: (
      userId: number,
      params: RequestParams = {},
    ) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/OrganizationUsers/${userId}/suspend`,
        method: 'POST',
        secure: true,
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags OrganizationUsers
     * @name OrganizationUsersAddressesResetCreate
     * @summary OrganizationUsersUpdate
     * @request POST:/api/OrganizationUsers/addressesReset
     * @secure
     */
    organizationUsersAddressesResetCreate: (params: RequestParams = {}) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/OrganizationUsers/addressesReset`,
        method: 'POST',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags OrganizationUsers
     * @name OrganizationUsersRoleTypesList
     * @request GET:/api/OrganizationUsers/RoleTypes
     * @secure
     */
    organizationUsersRoleTypesList: (params: RequestParams = {}) =>
      this.request<
        ESecuredIdentityRoleNameStringDictionaryItem[],
        ErrorApiResponse
      >({
        path: `/api/OrganizationUsers/RoleTypes`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Контролёр</li><li>Супервайзер</li>
     *
     * @tags OrganizationUsers
     * @name OrganizationUsersStatisticsDetail
     * @summary OrganizationUsersRead
     * @request GET:/api/OrganizationUsers/{userId}/statistics
     * @secure
     */
    organizationUsersStatisticsDetail: (
      userId: number,
      query?: {
        /** @format date-time */
        From?: string;
        /** @format date-time */
        To?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<OrganizationUserStatisticsResponse, ErrorApiResponse>({
        path: `/api/OrganizationUsers/${userId}/statistics`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Супервайзер</li>
     *
     * @tags OrganizationUserWorkingStatuses
     * @name OrganizationUserWorkingStatusesList
     * @summary OrganizationUserWorkingStatusRead
     * @request GET:/api/OrganizationUserWorkingStatuses
     * @secure
     */
    organizationUserWorkingStatusesList: (params: RequestParams = {}) =>
      this.request<
        EOrganizationUserWorkingStatusTypeStringDictionaryItem[],
        ErrorApiResponse
      >({
        path: `/api/OrganizationUserWorkingStatuses`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags OrganizationUserWorkingStatuses
     * @name OrganizationUserWorkingStatusesCreate
     * @summary OrganizationUserWorkingStatusCreate
     * @request POST:/api/OrganizationUserWorkingStatuses
     * @secure
     */
    organizationUserWorkingStatusesCreate: (
      data: AddOrganizationUserWorkingStatusRequest,
      params: RequestParams = {},
    ) =>
      this.request<OrganizationUserWorkingStatusResponse, ErrorApiResponse>({
        path: `/api/OrganizationUserWorkingStatuses`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Контролёр</li><li>Супервайзер</li>
     *
     * @tags PipeHousingMeteringDevices
     * @name PipeHousingMeteringDevicesDetail
     * @summary MeteringDevicesRead
     * @request GET:/api/PipeHousingMeteringDevices/{deviceId}
     * @secure
     */
    pipeHousingMeteringDevicesDetail: (
      deviceId: number,
      params: RequestParams = {},
    ) =>
      this.request<PipeHousingMeteringDeviceResponse, ErrorApiResponse>({
        path: `/api/PipeHousingMeteringDevices/${deviceId}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags PipeHousingMeteringDevices
     * @name PipeHousingMeteringDevicesUpdate
     * @summary HousingMeteringDeviceUpdate
     * @request PUT:/api/PipeHousingMeteringDevices/{deviceId}
     * @secure
     */
    pipeHousingMeteringDevicesUpdate: (
      deviceId: number,
      data: UpdatePipeHousingMeteringDeviceRequest,
      params: RequestParams = {},
    ) =>
      this.request<MeteringDeviceResponse, ErrorApiResponse>({
        path: `/api/PipeHousingMeteringDevices/${deviceId}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags PipeHousingMeteringDevices
     * @name PipeHousingMeteringDevicesDelete
     * @summary HousingMeteringDeviceDelete
     * @request DELETE:/api/PipeHousingMeteringDevices/{deviceId}
     * @secure
     */
    pipeHousingMeteringDevicesDelete: (
      deviceId: number,
      params: RequestParams = {},
    ) =>
      this.request<any, ErrorApiResponse>({
        path: `/api/PipeHousingMeteringDevices/${deviceId}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags PipeHousingMeteringDevices
     * @name PipeHousingMeteringDevicesCreate
     * @summary HousingMeteringDeviceCreate
     * @request POST:/api/PipeHousingMeteringDevices
     * @secure
     */
    pipeHousingMeteringDevicesCreate: (
      data: CreatePipeHousingMeteringDeviceRequest,
      params: RequestParams = {},
    ) =>
      this.request<MeteringDeviceResponse, ErrorApiResponse>({
        path: `/api/PipeHousingMeteringDevices`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Супервайзер</li>
     *
     * @tags PipeNodes
     * @name PipeNodesDetail
     * @summary NodeRead
     * @request GET:/api/PipeNodes/{pipeNodeId}
     * @secure
     */
    pipeNodesDetail: (pipeNodeId: number, params: RequestParams = {}) =>
      this.request<PipeNodeResponse, ErrorApiResponse>({
        path: `/api/PipeNodes/${pipeNodeId}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Администратор УК без назначений задач</li>
     *
     * @tags PipeNodes
     * @name PipeNodesUpdate
     * @summary NodeUpdate
     * @request PUT:/api/PipeNodes/{pipeNodeId}
     * @secure
     */
    pipeNodesUpdate: (
      pipeNodeId: number,
      data: UpdatePipeNodeRequest,
      params: RequestParams = {},
    ) =>
      this.request<PipeNodeResponse, ErrorApiResponse>({
        path: `/api/PipeNodes/${pipeNodeId}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Супервайзер</li>
     *
     * @tags PipeNodes
     * @name PipeNodesValidateCreate
     * @summary NodeRead
     * @request POST:/api/PipeNodes/validate
     * @secure
     */
    pipeNodesValidateCreate: (
      data: CreatePipeNodeRequest,
      params: RequestParams = {},
    ) =>
      this.request<PipeNodeValidationResultResponse, ErrorApiResponse>({
        path: `/api/PipeNodes/validate`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Администратор УК без назначений задач</li>
     *
     * @tags PipeNodes
     * @name PipeNodesCreate
     * @summary NodeCreate
     * @request POST:/api/PipeNodes
     * @secure
     */
    pipeNodesCreate: (
      data: CreatePipeNodeRequest,
      params: RequestParams = {},
    ) =>
      this.request<PipeNodeResponse, ErrorApiResponse>({
        path: `/api/PipeNodes`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Администратор УК без назначений задач</li>
     *
     * @tags PipeNodes
     * @name PipeNodesSetCommercialStatusCreate
     * @summary NodeUpdate
     * @request POST:/api/PipeNodes/{pipeNodeId}/SetCommercialStatus
     * @secure
     */
    pipeNodesSetCommercialStatusCreate: (
      pipeNodeId: number,
      data: NodeSetCommercialStatusRequest,
      params: RequestParams = {},
    ) =>
      this.request<any, ErrorApiResponse>({
        path: `/api/PipeNodes/${pipeNodeId}/SetCommercialStatus`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Администратор УК без назначений задач</li>
     *
     * @tags PipeNodes
     * @name PipeNodesSetRegistrationTypeCreate
     * @summary NodeUpdate
     * @request POST:/api/PipeNodes/{pipeNodeId}/SetRegistrationType
     * @secure
     */
    pipeNodesSetRegistrationTypeCreate: (
      pipeNodeId: number,
      data: NodeSetRegistrationTypeRequest,
      params: RequestParams = {},
    ) =>
      this.request<any, ErrorApiResponse>({
        path: `/api/PipeNodes/${pipeNodeId}/SetRegistrationType`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Супервайзер</li>
     *
     * @tags PipeNodes
     * @name PipeNodesPipesForAddingDeviceDetail
     * @summary NodeRead
     * @request GET:/api/PipeNodes/{pipeNodeId}/PipesForAddingDevice
     * @secure
     */
    pipeNodesPipesForAddingDeviceDetail: (
      pipeNodeId: number,
      query: {
        /** @format int32 */
        entryNumber: number;
        magistralType: EMagistralType;
        housingMeteringDeviceType: EHousingMeteringDeviceType;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        CommunicationPipeForAddingDeviceListResponse,
        ErrorApiResponse
      >({
        path: `/api/PipeNodes/${pipeNodeId}/PipesForAddingDevice`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Супервайзер</li>
     *
     * @tags PipeNodes
     * @name PipeNodesPipeMagistralTypesList
     * @summary NodeRead
     * @request GET:/api/PipeNodes/PipeMagistralTypes
     * @secure
     */
    pipeNodesPipeMagistralTypesList: (
      query?: {
        resource?: EResourceType;
      },
      params: RequestParams = {},
    ) =>
      this.request<EMagistralTypeStringDictionaryItem[], ErrorApiResponse>({
        path: `/api/PipeNodes/PipeMagistralTypes`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Супервайзер</li>
     *
     * @tags PipeNodes
     * @name PipeNodesMeteringDevicesDetail
     * @summary NodeRead
     * @request GET:/api/PipeNodes/{pipeNodeId}/MeteringDevices
     * @secure
     */
    pipeNodesMeteringDevicesDetail: (
      pipeNodeId: number,
      params: RequestParams = {},
    ) =>
      this.request<PipeNodeMeteringDeviceResponse[], ErrorApiResponse>({
        path: `/api/PipeNodes/${pipeNodeId}/MeteringDevices`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Супервайзер</li>
     *
     * @tags PipeNodes
     * @name PipeNodesPipesDetail
     * @summary NodeRead
     * @request GET:/api/PipeNodes/{pipeNodeId}/Pipes
     * @secure
     */
    pipeNodesPipesDetail: (pipeNodeId: number, params: RequestParams = {}) =>
      this.request<CommunicationPipeLiteResponse[], ErrorApiResponse>({
        path: `/api/PipeNodes/${pipeNodeId}/Pipes`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Администратор УК без назначений задач</li><li>Супервайзер</li>
     *
     * @tags Reports
     * @name ReportsList
     * @summary ReportRead
     * @request GET:/api/Reports
     * @secure
     */
    reportsList: (params: RequestParams = {}) =>
      this.request<GroupReportFormResponse, ErrorApiResponse>({
        path: `/api/Reports`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags Reports
     * @name ReportsCreate
     * @summary ReportAdd
     * @request POST:/api/Reports
     * @secure
     */
    reportsCreate: (
      data: CreateGroupReportRequest,
      params: RequestParams = {},
    ) =>
      this.request<GroupReportResponse, ErrorApiResponse>({
        path: `/api/Reports`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Администратор УК без назначений задач</li><li>Супервайзер</li>
     *
     * @tags Reports
     * @name ReportsReportDataList
     * @summary ReportRead
     * @request GET:/api/Reports/ReportData
     * @secure
     */
    reportsReportDataList: (
      query?: {
        /** @format int32 */
        NodeId?: number;
        ReportType?: EReportType;
        /** @format date-time */
        From?: string;
        /** @format date-time */
        To?: string;
        ReportFormat?: EReportFormat;
      },
      params: RequestParams = {},
    ) =>
      this.request<ReportDataModel, ErrorApiResponse>({
        path: `/api/Reports/ReportData`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Администратор УК без назначений задач</li><li>Супервайзер</li>
     *
     * @tags Reports
     * @name ReportsReportList
     * @summary ReportRead
     * @request GET:/api/Reports/Report
     * @secure
     */
    reportsReportList: (
      query?: {
        /** @format int32 */
        NodeId?: number;
        ReportType?: EReportType;
        /** @format date-time */
        From?: string;
        /** @format date-time */
        To?: string;
        ReportFormat?: EReportFormat;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/Reports/Report`,
        method: 'GET',
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Администратор УК без назначений задач</li><li>Супервайзер</li>
     *
     * @tags Reports
     * @name ReportsConsolidatedReportList
     * @summary ReportRead
     * @request GET:/api/Reports/ConsolidatedReport
     * @secure
     */
    reportsConsolidatedReportList: (
      query: {
        CalculatorsId: number[];
        ReportType?: EReportType;
        /** @format date-time */
        From?: string;
        /** @format date-time */
        To?: string;
        ReportFormat?: EReportFormat;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/Reports/ConsolidatedReport`,
        method: 'GET',
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Администратор УК без назначений задач</li><li>Супервайзер</li>
     *
     * @tags Reports
     * @name ReportsGroupReportList
     * @summary ReportRead
     * @request GET:/api/Reports/GroupReport
     * @secure
     */
    reportsGroupReportList: (
      query: {
        FileName: string;
        /** @format uuid */
        GroupReportId?: string;
        /** @format int32 */
        ManagementFirmId?: number;
        /** @format uuid */
        HouseManagementId?: string;
        BuildingIds?: number[];
        NodeResourceTypes?: EResourceType[];
        NodeStatus?: ENodeCommercialAccountStatus;
        ReportType?: EReportType;
        /** @format date-time */
        From?: string;
        /** @format date-time */
        To?: string;
        ReportFormat?: EReportFormat;
      },
      params: RequestParams = {},
    ) =>
      this.request<File, ErrorApiResponse>({
        path: `/api/Reports/GroupReport`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Администратор УК без назначений задач</li><li>Супервайзер</li>
     *
     * @tags Reports
     * @name ReportsSendGroupReportCreate
     * @summary ReportRead
     * @request POST:/api/Reports/SendGroupReport
     * @secure
     */
    reportsSendGroupReportCreate: (
      data: SendGroupReportRequest,
      params: RequestParams = {},
    ) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/Reports/SendGroupReport`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags Reports
     * @name ReportsCreategroupreportconfigurationCreate
     * @summary GroupReportConfigurationAdd
     * @request POST:/api/Reports/creategroupreportconfiguration
     * @secure
     */
    reportsCreategroupreportconfigurationCreate: (
      data: CreateGroupReportConfigurationRequest,
      params: RequestParams = {},
    ) =>
      this.request<GroupReportConfigurationServiceModel, ErrorApiResponse>({
        path: `/api/Reports/creategroupreportconfiguration`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags Reports
     * @name ReportsGetgroupreportconfigurationsList
     * @summary GroupReportConfigurationRead
     * @request GET:/api/Reports/getgroupreportconfigurations
     * @secure
     */
    reportsGetgroupreportconfigurationsList: (params: RequestParams = {}) =>
      this.request<GroupReportConfigurationServiceModel[], ErrorApiResponse>({
        path: `/api/Reports/getgroupreportconfigurations`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags Reports
     * @name ReportsUpdategroupreportconfigurationCreate
     * @summary GroupReportConfigurationUpdate
     * @request POST:/api/Reports/updategroupreportconfiguration
     * @secure
     */
    reportsUpdategroupreportconfigurationCreate: (
      data: UpdateGroupReportConfigurationRequest,
      params: RequestParams = {},
    ) =>
      this.request<GroupReportConfigurationServiceModel, ErrorApiResponse>({
        path: `/api/Reports/updategroupreportconfiguration`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags Reports
     * @name ReportsRemovegroupreportconfigurationDelete
     * @summary GroupReportConfigurationDelete
     * @request DELETE:/api/Reports/removegroupreportconfiguration/{id}
     * @secure
     */
    reportsRemovegroupreportconfigurationDelete: (
      id: number,
      params: RequestParams = {},
    ) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/Reports/removegroupreportconfiguration/${id}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * @description Роли:<li>Старший оператор</li><li>Оператор</li>
     *
     * @tags Reports
     * @name ReportsCheckingDatesReportXlsxList
     * @summary ReadingReportForOperator
     * @request GET:/api/Reports/CheckingDatesReportXlsx
     * @deprecated
     * @secure
     */
    reportsCheckingDatesReportXlsxList: (
      query: {
        /** @format date-time */
        To?: string;
        /** @format date-time */
        From?: string;
        Resources: EResourceType[];
      },
      params: RequestParams = {},
    ) =>
      this.request<File, ErrorApiResponse>({
        path: `/api/Reports/CheckingDatesReportXlsx`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Старший оператор</li><li>Оператор</li>
     *
     * @tags Reports
     * @name ReportsClosedDevicesReportXlsxList
     * @summary ReadingReportForOperator
     * @request GET:/api/Reports/ClosedDevicesReportXlsx
     * @deprecated
     * @secure
     */
    reportsClosedDevicesReportXlsxList: (
      query?: {
        /** @format int32 */
        ManagementFirmId?: number;
        /** @format uuid */
        HouseManagementId?: string;
        /** @format int32 */
        HousingStockId?: number;
        Resources?: EResourceType[];
        ClosingReasons?: EClosingReason[];
        /** @format date-time */
        From?: string;
        /** @format date-time */
        To?: string;
        WithoutApartmentsWithOpenDevicesByResources?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<File, ErrorApiResponse>({
        path: `/api/Reports/ClosedDevicesReportXlsx`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Старший оператор</li><li>Оператор</li>
     *
     * @tags Reports
     * @name ReportsApartmentsWithPreviousBrokenDevicesReportList
     * @summary ReadingReportForOperator
     * @request GET:/api/Reports/ApartmentsWithPreviousBrokenDevicesReport
     * @secure
     */
    reportsApartmentsWithPreviousBrokenDevicesReportList: (
      params: RequestParams = {},
    ) =>
      this.request<File, ErrorApiResponse>({
        path: `/api/Reports/ApartmentsWithPreviousBrokenDevicesReport`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Старший оператор</li><li>Оператор</li>
     *
     * @tags Reports
     * @name ReportsRunnerReportsList
     * @summary ReadingReportForOperator
     * @request GET:/api/Reports/RunnerReports
     * @secure
     */
    reportsRunnerReportsList: (
      query?: {
        YearRange?: YearRangeType;
        Resource?: DeviceResource;
        HmIds?: string[];
        /** @format int32 */
        ManagementFirmId?: number;
        HouseIds?: number[];
        Command?: PollCommand;
        /** @format int32 */
        PollId?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<File, ErrorApiResponse>({
        path: `/api/Reports/RunnerReports`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li>
     *
     * @tags Reports
     * @name ReportsSoiReportList
     * @summary SoiReportCreate
     * @request GET:/api/Reports/SoiReport
     * @secure
     */
    reportsSoiReportList: (
      query?: {
        /** @format uuid */
        HouseManagementId?: string;
        /** @format int32 */
        HousingStockId?: number;
        Resource?: EResourceType;
        /** @format int32 */
        Month?: number;
        /** @format int32 */
        Year?: number;
        Period?: ESoiReportPeriod;
        /** @format double */
        NormativePerPerson?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<File, ErrorApiResponse>({
        path: `/api/Reports/SoiReport`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Наблюдатель УК</li><li>Администратор УК без назначений задач</li>
     *
     * @tags Reports
     * @name ReportsFeedBackFlowTemperatureReportList
     * @summary FeedBackFlowTemperatureReportCreate
     * @request GET:/api/Reports/FeedBackFlowTemperatureReport
     * @secure
     */
    reportsFeedBackFlowTemperatureReportList: (
      query?: {
        /** @format uuid */
        HouseManagementId?: string;
        /** @format double */
        OutdoorTemperature?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<File, ErrorApiResponse>({
        path: `/api/Reports/FeedBackFlowTemperatureReport`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Старший оператор</li><li>Оператор</li>
     *
     * @tags Reports
     * @name ReportsReportRequestsHistoryList
     * @summary ReadingReportForOperator
     * @request GET:/api/Reports/ReportRequestsHistory
     * @secure
     */
    reportsReportRequestsHistoryList: (
      query?: {
        ReportNameText?: string;
        ReportName?: EReportName;
        IsActual?: boolean;
        /** @format int32 */
        PageNumber?: number;
        /** @format int32 */
        PageSize?: number;
        OrderBy?: EOrderByRule;
      },
      params: RequestParams = {},
    ) =>
      this.request<ReportRequestHistoryPagedList, ErrorApiResponse>({
        path: `/api/Reports/ReportRequestsHistory`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags Reports
     * @name ReportsHeatIndividualDevicesReportList
     * @summary IndividualDevicesReportCreate
     * @request GET:/api/Reports/HeatIndividualDevicesReport
     * @secure
     */
    reportsHeatIndividualDevicesReportList: (
      query: {
        HousingStockIds: number[];
        /** @format int32 */
        Month: number;
        /** @format int32 */
        Year: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<File, ErrorApiResponse>({
        path: `/api/Reports/HeatIndividualDevicesReport`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Наблюдатель УК</li><li>Администратор УК без назначений задач</li>
     *
     * @tags Reports
     * @name ReportsFeedFlowPipeTemperatureReportList
     * @summary FeedFlowPipeTemperatureReportCreate
     * @request GET:/api/Reports/FeedFlowPipeTemperatureReport
     * @secure
     */
    reportsFeedFlowPipeTemperatureReportList: (
      query?: {
        /** @format uuid */
        HouseManagementId?: string;
        /** @format double */
        LimitTemperature?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<File, ErrorApiResponse>({
        path: `/api/Reports/FeedFlowPipeTemperatureReport`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Reports
     * @name ReportsDevicesWithLastReadingReportList
     * @summary Выгрузка показаний ИПУ в формате отчета для Вахитова 14
     * @request GET:/api/Reports/DevicesWithLastReadingReport
     * @secure
     */
    reportsDevicesWithLastReadingReportList: (
      query?: {
        /** @format uuid */
        HouseManagementId?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<File, ErrorApiResponse>({
        path: `/api/Reports/DevicesWithLastReadingReport`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags Reports
     * @name ReportsOpenIndividualDevicesReportList
     * @summary IndividualDevicesReportCreate
     * @request GET:/api/Reports/OpenIndividualDevicesReport
     * @secure
     */
    reportsOpenIndividualDevicesReportList: (
      query?: {
        Command?: PollCommand;
        /** @format int32 */
        PollId?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<PollResponse, ErrorApiResponse>({
        path: `/api/Reports/OpenIndividualDevicesReport`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags Reports
     * @name ReportsIndividualDevicesReportArchivesList
     * @summary IndividualDevicesReportCreate
     * @request GET:/api/Reports/IndividualDevicesReportArchives
     * @secure
     */
    reportsIndividualDevicesReportArchivesList: (
      query?: {
        /** @format int32 */
        PageNumber?: number;
        /** @format int32 */
        PageSize?: number;
        OrderBy?: OrderByRule;
        /** @format int32 */
        Skip?: number;
        /** @format int32 */
        Take?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/Reports/IndividualDevicesReportArchives`,
        method: 'GET',
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * @description Роли:<li>Старший оператор</li><li>Оператор</li>
     *
     * @tags Reports
     * @name ReportsApartmentActsReportList
     * @summary ReadingReportForOperator
     * @request GET:/api/Reports/ApartmentActsReport
     * @secure
     */
    reportsApartmentActsReportList: (
      query?: {
        /** @format int32 */
        ManagementFirmId?: number;
        /** @format uuid */
        HouseManagementId?: string;
        /** @format int32 */
        HousingStockId?: number;
        Resources?: EActResourceType[];
        ActType?: EActType;
        /** @format date-time */
        From?: string;
        /** @format date-time */
        To?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ApartmentActsConstructedReportResponse, ErrorApiResponse>({
        path: `/api/Reports/ApartmentActsReport`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Старший оператор</li><li>Оператор</li>
     *
     * @tags Reports
     * @name ReportsApartmentActsReportXlsxList
     * @summary ReadingReportForOperator
     * @request GET:/api/Reports/ApartmentActsReportXlsx
     * @secure
     */
    reportsApartmentActsReportXlsxList: (
      query?: {
        /** @format int32 */
        ManagementFirmId?: number;
        /** @format uuid */
        HouseManagementId?: string;
        /** @format int32 */
        HousingStockId?: number;
        Resources?: EActResourceType[];
        ActType?: EActType;
        /** @format date-time */
        From?: string;
        /** @format date-time */
        To?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<File, ErrorApiResponse>({
        path: `/api/Reports/ApartmentActsReportXlsx`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Старший оператор</li><li>Оператор</li>
     *
     * @tags Reports
     * @name ReportsHousingDevicesReportList
     * @summary ReadingReportForOperator
     * @request GET:/api/Reports/HousingDevicesReport
     * @secure
     */
    reportsHousingDevicesReportList: (
      query: {
        /** @format int32 */
        ManagementFirmId?: number;
        /** @format uuid */
        HouseManagementId?: string;
        /** @format int32 */
        HousingStockId?: number;
        Resources?: EResourceType[];
        /** @format date-time */
        From: string;
        /** @format date-time */
        To: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<HousingDevicesConstructedReportResponse[], ErrorApiResponse>(
        {
          path: `/api/Reports/HousingDevicesReport`,
          method: 'GET',
          query: query,
          secure: true,
          format: 'json',
          ...params,
        },
      ),

    /**
     * @description Роли:<li>Старший оператор</li><li>Оператор</li>
     *
     * @tags Reports
     * @name ReportsHousingDevicesReportXlsxList
     * @summary ReadingReportForOperator
     * @request GET:/api/Reports/HousingDevicesReportXlsx
     * @secure
     */
    reportsHousingDevicesReportXlsxList: (
      query: {
        /** @format int32 */
        ManagementFirmId?: number;
        /** @format uuid */
        HouseManagementId?: string;
        /** @format int32 */
        HousingStockId?: number;
        Resources?: EResourceType[];
        /** @format date-time */
        From: string;
        /** @format date-time */
        To: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<File, ErrorApiResponse>({
        path: `/api/Reports/HousingDevicesReportXlsx`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Старший оператор</li><li>Оператор</li>
     *
     * @tags Reports
     * @name ReportsHomeownersReportList
     * @summary ReadingReportForOperator
     * @request GET:/api/Reports/HomeownersReport
     * @secure
     */
    reportsHomeownersReportList: (
      query: {
        /** @format int32 */
        ManagementFirmId?: number;
        /** @format uuid */
        HouseManagementId?: string;
        /** @format int32 */
        HousingStockId?: number;
        ShowOnlyDuplicates: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<HomeownersConstructedReportResponse, ErrorApiResponse>({
        path: `/api/Reports/HomeownersReport`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Старший оператор</li><li>Оператор</li>
     *
     * @tags Reports
     * @name ReportsHomeownersReportXlsxList
     * @summary ReadingReportForOperator
     * @request GET:/api/Reports/HomeownersReportXlsx
     * @secure
     */
    reportsHomeownersReportXlsxList: (
      query: {
        /** @format int32 */
        ManagementFirmId?: number;
        /** @format uuid */
        HouseManagementId?: string;
        /** @format int32 */
        HousingStockId?: number;
        ShowOnlyDuplicates: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<File, ErrorApiResponse>({
        path: `/api/Reports/HomeownersReportXlsx`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Старший оператор</li><li>Оператор</li>
     *
     * @tags Reports
     * @name ReportsIndividualDevicesReportList
     * @summary ReadingReportForOperator
     * @request GET:/api/Reports/IndividualDevicesReport
     * @secure
     */
    reportsIndividualDevicesReportList: (
      query: {
        /** @format int32 */
        ManagementFirmId?: number;
        /** @format uuid */
        HouseManagementId?: string;
        /** @format int32 */
        HousingStockId?: number;
        ReportOption: EIndividualDeviceReportOption;
        Resources?: EResourceType[];
        /** @format date-time */
        From?: string;
        /** @format date-time */
        To?: string;
        ClosingReasons?: EClosingReason[];
        WithoutApartmentsWithOpenDevicesByResources?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        IndividualDevicesConstructedReportResponse[],
        ErrorApiResponse
      >({
        path: `/api/Reports/IndividualDevicesReport`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Старший оператор</li><li>Оператор</li>
     *
     * @tags Reports
     * @name ReportsIndividualDevicesReportXlsxList
     * @summary ReadingReportForOperator
     * @request GET:/api/Reports/IndividualDevicesReportXlsx
     * @secure
     */
    reportsIndividualDevicesReportXlsxList: (
      query: {
        /** @format int32 */
        ManagementFirmId?: number;
        /** @format uuid */
        HouseManagementId?: string;
        /** @format int32 */
        HousingStockId?: number;
        ReportOption: EIndividualDeviceReportOption;
        Resources?: EResourceType[];
        /** @format date-time */
        From?: string;
        /** @format date-time */
        To?: string;
        ClosingReasons?: EClosingReason[];
        WithoutApartmentsWithOpenDevicesByResources?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<File, ErrorApiResponse>({
        path: `/api/Reports/IndividualDevicesReportXlsx`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Старший оператор</li><li>Оператор</li>
     *
     * @tags Reports
     * @name ReportsOperatorsWorkingReportList
     * @summary ReadingReportForOperator
     * @request GET:/api/Reports/OperatorsWorkingReport
     * @secure
     */
    reportsOperatorsWorkingReportList: (
      query?: {
        /** @format date-time */
        From?: string;
        /** @format date-time */
        To?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<OperatorsConstructedReportResponse[], ErrorApiResponse>({
        path: `/api/Reports/OperatorsWorkingReport`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Старший оператор</li><li>Оператор</li>
     *
     * @tags Reports
     * @name ReportsOperatorsWorkingReportXlsxList
     * @summary ReadingReportForOperator
     * @request GET:/api/Reports/OperatorsWorkingReportXlsx
     * @secure
     */
    reportsOperatorsWorkingReportXlsxList: (
      query?: {
        /** @format date-time */
        From?: string;
        /** @format date-time */
        To?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<File, ErrorApiResponse>({
        path: `/api/Reports/OperatorsWorkingReportXlsx`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Старший оператор</li><li>Оператор</li>
     *
     * @tags Reports
     * @name ReportsInspectorsWorkingReportList
     * @summary ReadingReportForOperator
     * @request GET:/api/Reports/InspectorsWorkingReport
     * @secure
     */
    reportsInspectorsWorkingReportList: (
      query?: {
        /** @format date-time */
        From?: string;
        /** @format date-time */
        To?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<InspectorsConstructedReportResponse[], ErrorApiResponse>({
        path: `/api/Reports/InspectorsWorkingReport`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Старший оператор</li><li>Оператор</li>
     *
     * @tags Reports
     * @name ReportsInspectorsWorkingReportXlsxList
     * @summary ReadingReportForOperator
     * @request GET:/api/Reports/InspectorsWorkingReportXlsx
     * @secure
     */
    reportsInspectorsWorkingReportXlsxList: (
      query?: {
        /** @format date-time */
        From?: string;
        /** @format date-time */
        To?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<File, ErrorApiResponse>({
        path: `/api/Reports/InspectorsWorkingReportXlsx`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Старший оператор</li><li>Оператор</li>
     *
     * @tags Reports
     * @name ReportsCallCenterWorkingReportList
     * @summary ReadingReportForOperator
     * @request GET:/api/Reports/CallCenterWorkingReport
     * @secure
     */
    reportsCallCenterWorkingReportList: (
      query?: {
        /** @format date-time */
        From?: string;
        /** @format date-time */
        To?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        CallCenterWorkingConstructedReportResponse[],
        ErrorApiResponse
      >({
        path: `/api/Reports/CallCenterWorkingReport`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Старший оператор</li><li>Оператор</li>
     *
     * @tags Reports
     * @name ReportsCallCenterWorkingReportXlsxList
     * @summary ReadingReportForOperator
     * @request GET:/api/Reports/CallCenterWorkingReportXlsx
     * @secure
     */
    reportsCallCenterWorkingReportXlsxList: (
      query?: {
        /** @format date-time */
        From?: string;
        /** @format date-time */
        To?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<File, ErrorApiResponse>({
        path: `/api/Reports/CallCenterWorkingReportXlsx`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Старший оператор</li><li>Оператор</li>
     *
     * @tags Reports
     * @name ReportsHouseManagementsReportList
     * @summary ReadingReportForOperator
     * @request GET:/api/Reports/HouseManagementsReport
     * @secure
     */
    reportsHouseManagementsReportList: (
      query?: {
        /** @format date-time */
        From?: string;
        /** @format date-time */
        To?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        HouseManagementConstructedReportResponse[],
        ErrorApiResponse
      >({
        path: `/api/Reports/HouseManagementsReport`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Старший оператор</li><li>Оператор</li>
     *
     * @tags Reports
     * @name ReportsHouseManagementsReportXlsxList
     * @summary ReadingReportForOperator
     * @request GET:/api/Reports/HouseManagementsReportXlsx
     * @secure
     */
    reportsHouseManagementsReportXlsxList: (
      query?: {
        /** @format date-time */
        From?: string;
        /** @format date-time */
        To?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<File, ErrorApiResponse>({
        path: `/api/Reports/HouseManagementsReportXlsx`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Супервайзер</li>
     *
     * @tags ResourceDisconnecting
     * @name ResourceDisconnectingList
     * @summary ResourceDisconnectingRead
     * @request GET:/api/ResourceDisconnecting
     * @secure
     */
    resourceDisconnectingList: (
      query?: {
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
      },
      params: RequestParams = {},
    ) =>
      this.request<ResourceDisconnectingResponsePagedList, ErrorApiResponse>({
        path: `/api/ResourceDisconnecting`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags ResourceDisconnecting
     * @name ResourceDisconnectingCreate
     * @summary ResourceDisconnectingCreate
     * @request POST:/api/ResourceDisconnecting
     * @secure
     */
    resourceDisconnectingCreate: (
      data: ResourceDisconnectingCreateRequest,
      params: RequestParams = {},
    ) =>
      this.request<ResourceDisconnectingResponse, ErrorApiResponse>({
        path: `/api/ResourceDisconnecting`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Супервайзер</li>
     *
     * @tags ResourceDisconnecting
     * @name ResourceDisconnectingExportList
     * @summary ResourceDisconnectingRead
     * @request GET:/api/ResourceDisconnecting/Export
     * @secure
     */
    resourceDisconnectingExportList: (
      query?: {
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
      },
      params: RequestParams = {},
    ) =>
      this.request<File, ErrorApiResponse>({
        path: `/api/ResourceDisconnecting/Export`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Супервайзер</li>
     *
     * @tags ResourceDisconnecting
     * @name ResourceDisconnectingDetail
     * @summary ResourceDisconnectingRead
     * @request GET:/api/ResourceDisconnecting/{id}
     * @secure
     */
    resourceDisconnectingDetail: (id: string, params: RequestParams = {}) =>
      this.request<ResourceDisconnectingResponse, ErrorApiResponse>({
        path: `/api/ResourceDisconnecting/${id}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags ResourceDisconnecting
     * @name ResourceDisconnectingCreate2
     * @summary ResourceDisconnectingUpdate
     * @request POST:/api/ResourceDisconnecting/{id}
     * @originalName resourceDisconnectingCreate
     * @duplicate
     * @secure
     */
    resourceDisconnectingCreate2: (
      id: string,
      data: ResourceDisconnectingUpdateRequest,
      params: RequestParams = {},
    ) =>
      this.request<ResourceDisconnectingResponse, ErrorApiResponse>({
        path: `/api/ResourceDisconnecting/${id}`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags ResourceDisconnecting
     * @name ResourceDisconnectingDelete
     * @summary ResourceDisconnectingDelete
     * @request DELETE:/api/ResourceDisconnecting/{id}
     * @secure
     */
    resourceDisconnectingDelete: (id: string, params: RequestParams = {}) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/ResourceDisconnecting/${id}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags ResourceDisconnecting
     * @name ResourceDisconnectingAddDocumentCreate
     * @summary ResourceDisconnectingUpdate
     * @request POST:/api/ResourceDisconnecting/{id}/AddDocument/{documentId}
     * @secure
     */
    resourceDisconnectingAddDocumentCreate: (
      id: string,
      documentId: number,
      params: RequestParams = {},
    ) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/ResourceDisconnecting/${id}/AddDocument/${documentId}`,
        method: 'POST',
        secure: true,
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags ResourceDisconnecting
     * @name ResourceDisconnectingDeleteDocumentCreate
     * @summary ResourceDisconnectingUpdate
     * @request POST:/api/ResourceDisconnecting/{id}/DeleteDocument
     * @secure
     */
    resourceDisconnectingDeleteDocumentCreate: (
      id: string,
      params: RequestParams = {},
    ) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/ResourceDisconnecting/${id}/DeleteDocument`,
        method: 'POST',
        secure: true,
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags ResourceDisconnecting
     * @name ResourceDisconnectingCompleteCreate
     * @summary ResourceDisconnectingUpdate
     * @request POST:/api/ResourceDisconnecting/{id}/Complete
     * @secure
     */
    resourceDisconnectingCompleteCreate: (
      id: string,
      params: RequestParams = {},
    ) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/ResourceDisconnecting/${id}/Complete`,
        method: 'POST',
        secure: true,
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Супервайзер</li>
     *
     * @tags ResourceDisconnecting
     * @name ResourceDisconnectingFiltersList
     * @summary ResourceDisconnectingRead
     * @request GET:/api/ResourceDisconnecting/filters
     * @secure
     */
    resourceDisconnectingFiltersList: (params: RequestParams = {}) =>
      this.request<ResourceDisconnectingFilterResponse, ErrorApiResponse>({
        path: `/api/ResourceDisconnecting/filters`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Администратор УК без назначений задач</li><li>Супервайзер</li>
     *
     * @tags SubscriberStatistics
     * @name SubscriberStatisticsList
     * @summary SubscriberStatisticsRead
     * @request GET:/api/SubscriberStatistics
     * @secure
     */
    subscriberStatisticsList: (
      query: {
        /** @format int32 */
        HousingStockId: number;
        /** @format int32 */
        MonthOfLastTransmission?: number;
        /** @format int32 */
        YearOfLastTransmission?: number;
        /** @format date-time */
        DateLastCheckFrom?: string;
        /** @format date-time */
        DateLastCheckTo?: string;
        /**
         * @deprecated
         * @format double
         */
        HotWaterSupplyConsumptionFrom?: number;
        /**
         * @deprecated
         * @format double
         */
        HotWaterSupplyConsumptionTo?: number;
        /**
         * @deprecated
         * @format double
         */
        ColdWaterSupplyConsumptionFrom?: number;
        /**
         * @deprecated
         * @format double
         */
        ColdWaterSupplyConsumptionTo?: number;
        /**
         * @deprecated
         * @format double
         */
        ElectricitySupplyConsumptionFrom?: number;
        /**
         * @deprecated
         * @format double
         */
        ElectricitySupplyConsumptionTo?: number;
        /** @format double */
        hotWaterSupplyFilterFrom?: number;
        /** @format double */
        hotWaterSupplyFilterTo?: number;
        /** @format double */
        coldWaterSupplyFilterFrom?: number;
        /** @format double */
        coldWaterSupplyFilterTo?: number;
        /** @format double */
        electricityFilterFrom?: number;
        /** @format double */
        electricityFilterTo?: number;
        /** @format double */
        heatFilterFrom?: number;
        /** @format double */
        heatFilterTo?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<SubscriberStatisticsСonsumptionResponse[], ErrorApiResponse>(
        {
          path: `/api/SubscriberStatistics`,
          method: 'GET',
          query: query,
          secure: true,
          format: 'json',
          ...params,
        },
      ),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Администратор УК без назначений задач</li><li>Супервайзер</li>
     *
     * @tags SubscriberStatistics
     * @name SubscriberStatisticsExportList
     * @summary SubscriberStatisticsRead
     * @request GET:/api/SubscriberStatistics/Export
     * @secure
     */
    subscriberStatisticsExportList: (
      query: {
        /** @format int32 */
        HousingStockId: number;
        /** @format int32 */
        MonthOfLastTransmission?: number;
        /** @format int32 */
        YearOfLastTransmission?: number;
        /** @format date-time */
        DateLastCheckFrom?: string;
        /** @format date-time */
        DateLastCheckTo?: string;
        /**
         * @deprecated
         * @format double
         */
        HotWaterSupplyConsumptionFrom?: number;
        /**
         * @deprecated
         * @format double
         */
        HotWaterSupplyConsumptionTo?: number;
        /**
         * @deprecated
         * @format double
         */
        ColdWaterSupplyConsumptionFrom?: number;
        /**
         * @deprecated
         * @format double
         */
        ColdWaterSupplyConsumptionTo?: number;
        /**
         * @deprecated
         * @format double
         */
        ElectricitySupplyConsumptionFrom?: number;
        /**
         * @deprecated
         * @format double
         */
        ElectricitySupplyConsumptionTo?: number;
        /** @format double */
        hotWaterSupplyFilterFrom?: number;
        /** @format double */
        hotWaterSupplyFilterTo?: number;
        /** @format double */
        coldWaterSupplyFilterFrom?: number;
        /** @format double */
        coldWaterSupplyFilterTo?: number;
        /** @format double */
        electricityFilterFrom?: number;
        /** @format double */
        electricityFilterTo?: number;
        /** @format double */
        heatFilterFrom?: number;
        /** @format double */
        heatFilterTo?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<File, ErrorApiResponse>({
        path: `/api/SubscriberStatistics/Export`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Контролёр</li><li>Супервайзер</li>
     *
     * @tags Tasks
     * @name TasksList
     * @summary TasksRead
     * @request GET:/api/Tasks
     * @secure
     */
    tasksList: (
      query?: {
        TargetType?: ETaskTargetType;
        /** @format int32 */
        TaskId?: number;
        TaskType?: EManagingFirmTaskFilterType;
        GroupType?: TaskGroupingFilter;
        /** @format uuid */
        HouseManagementId?: string;
        /** @format int32 */
        DeviceId?: number;
        /** @format int32 */
        HousingStockId?: number;
        /** @format int32 */
        ApartmentId?: number;
        HasChanged?: boolean;
        /** @format int32 */
        PipeNodeId?: number;
        ClosingStatuses?: ETaskClosingStatus[];
        TimeStatus?: EStageTimeStatus;
        Resource?: EResourceType;
        EngineeringElement?: ETaskEngineeringElement;
        City?: string;
        Street?: string;
        HousingStockNumber?: string;
        Corpus?: string;
        ApartmentNumber?: string;
        /** @format int32 */
        PerpetratorId?: number;
        OrderRule?: TaskPaginationOrderRule;
        /** @format int32 */
        PageNumber?: number;
        /** @format int32 */
        PageSize?: number;
        OrderBy?: EOrderByRule;
      },
      params: RequestParams = {},
    ) =>
      this.request<TasksPagedList, ErrorApiResponse>({
        path: `/api/Tasks`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Контролёр</li><li>Супервайзер</li>
     *
     * @tags Tasks
     * @name TasksDetail
     * @summary TasksRead
     * @request GET:/api/Tasks/{taskId}
     * @secure
     */
    tasksDetail: (taskId: number, params: RequestParams = {}) =>
      this.request<TaskResponse, ErrorApiResponse>({
        path: `/api/Tasks/${taskId}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Диспетчер УК</li>
     *
     * @tags Tasks
     * @name TasksCreateCreate
     * @summary TaskCreate
     * @request POST:/api/Tasks/create
     * @secure
     */
    tasksCreateCreate: (data: TaskCreateRequest, params: RequestParams = {}) =>
      this.request<TaskCreateResponse, ErrorApiResponse>({
        path: `/api/Tasks/create`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Старший оператор</li><li>Диспетчер УК</li>
     *
     * @tags Tasks
     * @name TasksCloseCreate
     * @summary TaskDelete
     * @request POST:/api/Tasks/{taskId}/close
     * @secure
     */
    tasksCloseCreate: (taskId: number, params: RequestParams = {}) =>
      this.request<TaskResponse, ErrorApiResponse>({
        path: `/api/Tasks/${taskId}/close`,
        method: 'POST',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Старший оператор</li><li>Диспетчер УК</li>
     *
     * @tags Tasks
     * @name TasksCloseAllCreate
     * @summary TaskDelete
     * @request POST:/api/Tasks/CloseAll
     * @secure
     */
    tasksCloseAllCreate: (
      data: CloseTasksRequest,
      params: RequestParams = {},
    ) =>
      this.request<TaskCloseStatusModel[], ErrorApiResponse>({
        path: `/api/Tasks/CloseAll`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Контролёр</li>
     *
     * @tags Tasks
     * @name TasksPushStageCreate
     * @summary TasksExecute
     * @request POST:/api/Tasks/{taskId}/PushStage
     * @secure
     */
    tasksPushStageCreate: (
      taskId: number,
      data: StagePushRequest,
      params: RequestParams = {},
    ) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/Tasks/${taskId}/PushStage`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Контролёр</li>
     *
     * @tags Tasks
     * @name TasksRevertStageCreate
     * @summary TasksExecute
     * @request POST:/api/Tasks/{taskId}/RevertStage
     * @secure
     */
    tasksRevertStageCreate: (
      taskId: number,
      data: StageRevertRequest,
      params: RequestParams = {},
    ) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/Tasks/${taskId}/RevertStage`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Контролёр</li><li>Супервайзер</li>
     *
     * @tags Tasks
     * @name TasksNextStagesDetail
     * @summary TasksRead
     * @request GET:/api/Tasks/{taskId}/NextStages
     * @secure
     */
    tasksNextStagesDetail: (taskId: number, params: RequestParams = {}) =>
      this.request<StageListResponseWrappedListResponse, ErrorApiResponse>({
        path: `/api/Tasks/${taskId}/NextStages`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Контролёр</li><li>Супервайзер</li>
     *
     * @tags Tasks
     * @name TasksCommentsCreate
     * @summary TaskCommentsCreate
     * @request POST:/api/Tasks/{taskId}/Comments
     * @secure
     */
    tasksCommentsCreate: (
      taskId: number,
      data: TaskCommentRequest,
      params: RequestParams = {},
    ) =>
      this.request<TaskCommentResponse, ErrorApiResponse>({
        path: `/api/Tasks/${taskId}/Comments`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Контролёр</li><li>Супервайзер</li>
     *
     * @tags Tasks
     * @name TasksCommentsUpdate
     * @summary TaskCommentsUpdate
     * @request PUT:/api/Tasks/{taskId}/Comments/{commentId}
     * @secure
     */
    tasksCommentsUpdate: (
      taskId: number,
      commentId: number,
      data: TaskCommentRequest,
      params: RequestParams = {},
    ) =>
      this.request<TaskCommentResponse, ErrorApiResponse>({
        path: `/api/Tasks/${taskId}/Comments/${commentId}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Контролёр</li>
     *
     * @tags Tasks
     * @name TasksCommentsDelete
     * @summary TaskCommentsDelete
     * @request DELETE:/api/Tasks/{taskId}/Comments/{commentId}
     * @secure
     */
    tasksCommentsDelete: (
      taskId: number,
      commentId: number,
      params: RequestParams = {},
    ) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/Tasks/${taskId}/Comments/${commentId}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * @description Роли:<li>Исполнитель УК</li><li>Диспетчер УК</li><li>Контролёр</li>
     *
     * @tags Tasks
     * @name TasksDocumentsDelete
     * @summary TaskDocumentsDelete
     * @request DELETE:/api/Tasks/{taskId}/Documents/{documentId}
     * @secure
     */
    tasksDocumentsDelete: (
      taskId: number,
      documentId: number,
      params: RequestParams = {},
    ) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/Tasks/${taskId}/Documents/${documentId}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Контролёр</li><li>Супервайзер</li>
     *
     * @tags Tasks
     * @name TasksFiltersList
     * @summary TasksRead
     * @request GET:/api/Tasks/filters
     * @secure
     */
    tasksFiltersList: (params: RequestParams = {}) =>
      this.request<TaskFilterResponse, ErrorApiResponse>({
        path: `/api/Tasks/filters`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Контролёр</li><li>Супервайзер</li>
     *
     * @tags Tasks
     * @name TasksExportLiteList
     * @summary TasksRead
     * @request GET:/api/Tasks/ExportLite
     * @secure
     */
    tasksExportLiteList: (
      query?: {
        TargetType?: ETaskTargetType;
        /** @format int32 */
        TaskId?: number;
        TaskType?: EManagingFirmTaskFilterType;
        GroupType?: TaskGroupingFilter;
        /** @format uuid */
        HouseManagementId?: string;
        /** @format int32 */
        DeviceId?: number;
        /** @format int32 */
        HousingStockId?: number;
        /** @format int32 */
        ApartmentId?: number;
        HasChanged?: boolean;
        /** @format int32 */
        PipeNodeId?: number;
        ClosingStatuses?: ETaskClosingStatus[];
        TimeStatus?: EStageTimeStatus;
        Resource?: EResourceType;
        EngineeringElement?: ETaskEngineeringElement;
        City?: string;
        Street?: string;
        HousingStockNumber?: string;
        Corpus?: string;
        ApartmentNumber?: string;
        /** @format int32 */
        PerpetratorId?: number;
        OrderRule?: TaskPaginationOrderRule;
        /** @format int32 */
        PageNumber?: number;
        /** @format int32 */
        PageSize?: number;
        OrderBy?: EOrderByRule;
      },
      params: RequestParams = {},
    ) =>
      this.request<File, ErrorApiResponse>({
        path: `/api/Tasks/ExportLite`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Контролёр</li><li>Супервайзер</li>
     *
     * @tags Tasks
     * @name TasksErpSourcesList
     * @summary TasksRead
     * @request GET:/api/Tasks/ErpSources
     * @secure
     */
    tasksErpSourcesList: (params: RequestParams = {}) =>
      this.request<ErpSourceResponse[], ErrorApiResponse>({
        path: `/api/Tasks/ErpSources`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Контролёр</li><li>Супервайзер</li>
     *
     * @tags Tasks
     * @name TasksErpTaskReasonsList
     * @summary TasksRead
     * @request GET:/api/Tasks/ErpTaskReasons
     * @secure
     */
    tasksErpTaskReasonsList: (params: RequestParams = {}) =>
      this.request<ErpTaskReasonGroupResponse[], ErrorApiResponse>({
        path: `/api/Tasks/ErpTaskReasons`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Контролёр</li><li>Супервайзер</li>
     *
     * @tags Tasks
     * @name TasksApplicationDetail
     * @summary TasksRead
     * @request GET:/api/Tasks/{taskId}/application
     * @secure
     */
    tasksApplicationDetail: (taskId: number, params: RequestParams = {}) =>
      this.request<ErpApplicationResponse, ErrorApiResponse>({
        path: `/api/Tasks/${taskId}/application`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Контролёр</li><li>Супервайзер</li>
     *
     * @tags Tasks
     * @name TasksApplicationBrigadeDetail
     * @summary TasksRead
     * @request GET:/api/Tasks/{taskId}/application/brigade
     * @secure
     */
    tasksApplicationBrigadeDetail: (
      taskId: number,
      params: RequestParams = {},
    ) =>
      this.request<ErpExecutorResponse[], ErrorApiResponse>({
        path: `/api/Tasks/${taskId}/application/brigade`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Контролёр</li><li>Супервайзер</li>
     *
     * @tags Tasks
     * @name TasksErpTaskDeadlineList
     * @summary TasksRead
     * @request GET:/api/Tasks/ErpTaskDeadline
     * @secure
     */
    tasksErpTaskDeadlineList: (
      query: {
        /** @format uuid */
        TaskReasonId: string;
        TaskType: EisTaskType;
      },
      params: RequestParams = {},
    ) =>
      this.request<ErpTaskDeadlineResponse, ErrorApiResponse>({
        path: `/api/Tasks/ErpTaskDeadline`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Администратор УК без назначений задач</li><li>Контролёр</li><li>Супервайзер</li>
     *
     * @tags Tasks
     * @name TasksErpTaskExecutorsList
     * @summary TasksRead
     * @request GET:/api/Tasks/ErpTaskExecutors
     * @secure
     */
    tasksErpTaskExecutorsList: (
      query: {
        /** @format uuid */
        TaskReasonId: string;
        TaskType: EisTaskType;
      },
      params: RequestParams = {},
    ) =>
      this.request<ErpExecutorResponse[], ErrorApiResponse>({
        path: `/api/Tasks/ErpTaskExecutors`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Диспетчер УК</li>
     *
     * @tags Tasks
     * @name TasksErpCreateTaskCreate
     * @summary TaskCreate
     * @request POST:/api/Tasks/ErpCreateTask
     * @secure
     */
    tasksErpCreateTaskCreate: (
      data: ErpCreateTaskRequest,
      params: RequestParams = {},
    ) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/Tasks/ErpCreateTask`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Роли:<li>Диспетчер УК</li>
     *
     * @tags Tasks
     * @name TasksErpTaskDelete
     * @summary ErpTaskDelete
     * @request DELETE:/api/Tasks/ErpTask/{taskId}
     * @secure
     */
    tasksErpTaskDelete: (taskId: number, params: RequestParams = {}) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/Tasks/ErpTask/${taskId}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Администратор УК без назначений задач</li><li>Супервайзер</li>
     *
     * @tags TemperatureNormative
     * @name TemperatureNormativeList
     * @summary TemperatureNormativeRead
     * @request GET:/api/TemperatureNormative
     * @deprecated
     * @secure
     */
    temperatureNormativeList: (params: RequestParams = {}) =>
      this.request<TemperatureNormativeResponse, ErrorApiResponse>({
        path: `/api/TemperatureNormative`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Администратор УК без назначений задач</li>
     *
     * @tags TemperatureNormative
     * @name TemperatureNormativeUpdate
     * @summary TemperatureNormativeWrite
     * @request PUT:/api/TemperatureNormative
     * @deprecated
     * @secure
     */
    temperatureNormativeUpdate: (
      data: TemperatureNormativeUpdateRequest,
      params: RequestParams = {},
    ) =>
      this.request<TemperatureNormativeResponse, ErrorApiResponse>({
        path: `/api/TemperatureNormative`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),
  };
}
