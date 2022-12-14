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
}

export interface AddHeatingStationRequest {
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
  housingStockId?: number | null;

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
}

export interface AddressResponse {
  city: string | null;
  street: string | null;
  housingStockNumber: string | null;
}

export interface AddressShortResponse {
  /** @format int32 */
  housingStockId: number;
  housingStockNumber: string | null;
}

export interface AllNodeWorkingRangeResponse {
  season: ENodeWorkingRangeSeason;
  nodeResourceType: EResourceType;
  nodeWorkingRanges: ValueNodeWorkingRangeListResponse[] | null;
}

export interface AllNodeWorkingRangeResponseSuccessApiResponse {
  successResponse: AllNodeWorkingRangeResponse | null;
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

export interface ApartmentActResponsePagedListSuccessApiResponse {
  successResponse: ApartmentActResponsePagedList | null;
}

export interface ApartmentActResponseSuccessApiResponse {
  successResponse: ApartmentActResponse | null;
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

export interface ApartmentByAddressFilterResponsePagedListSuccessApiResponse {
  successResponse: ApartmentByAddressFilterResponsePagedList | null;
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
}

export interface ApartmentCheckResponseListSuccessApiResponse {
  successResponse: ApartmentCheckResponse[] | null;
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

export interface ApartmentCheckResponsePagedListSuccessApiResponse {
  successResponse: ApartmentCheckResponsePagedList | null;
}

export interface ApartmentCheckResponseSuccessApiResponse {
  successResponse: ApartmentCheckResponse | null;
}

export interface ApartmentCreateRequest {
  /** @format int32 */
  housingStockId: number;
  number: string;

  /** @format int32 */
  floor?: number | null;

  /** @format float */
  square?: number | null;

  /** @format int32 */
  numberOfLiving?: number | null;

  /** @format int32 */
  normativeNumberOfLiving?: number | null;
  mainHomeownerAccountNumber?: string | null;
  comment?: string | null;

  /** @format int32 */
  coldWaterRiserCount?: number | null;

  /** @format int32 */
  hotWaterRiserCount?: number | null;
}

export interface ApartmentListResponse {
  /** @format int32 */
  id: number;
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

export interface ApartmentListStatusResponse {
  statuses: ApartmentStatusResponse[] | null;
}

export interface ApartmentListStatusResponseSuccessApiResponse {
  successResponse: ApartmentListStatusResponse | null;
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

export interface ApartmentResponseSuccessApiResponse {
  successResponse: ApartmentResponse | null;
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

export interface ArchivesDataGroup {
  header?: string | null;
  measure?: string | null;
  groupType?: ArchivesDataGroupType;
  data?: ArchivesDataGroupValue[] | null;
}

export enum ArchivesDataGroupType {
  Undefined = "Undefined",
  Volume = "Volume",
  TemperatureOut = "TemperatureOut",
}

export interface ArchivesDataGroupValue {
  /** @format date-time */
  time?: string;

  /** @format double */
  value?: number;
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

export interface CalculatorIntoHousingStockResponse {
  /** @format int32 */
  id: number;
  serialNumber: string | null;
  model: string | null;

  /** @format int32 */
  calculatorInfoId: number | null;
}

export interface CalculatorIntoHousingStockResponseArraySuccessApiResponse {
  successResponse: CalculatorIntoHousingStockResponse[] | null;
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
  isActive: boolean | null;

  /** @format int32 */
  bitDepth: number | null;

  /** @format double */
  scaleFactor: number | null;
  connection: MeteringDeviceConnection | null;
  isConnected: boolean | null;
  address: HousingStockShortResponse | null;

  /** @format int32 */
  infoId: number | null;
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
  managementFirm: OrganizationResponse | null;

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
  connection: MeteringDeviceConnection | null;
  isConnected: boolean | null;
  hasTasks: boolean | null;
  address: HousingStockShortResponse | null;
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

export interface CalculatorResponse {
  /** @format int32 */
  id: number;
  transactionType: string | null;
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
  isActive: boolean | null;

  /** @format int32 */
  bitDepth: number | null;

  /** @format double */
  scaleFactor: number | null;
  connection: MeteringDeviceConnection | null;
  isConnected: boolean | null;
  address: HousingStockShortResponse | null;

  /** @format int32 */
  infoId: number | null;
  nodes: PipeNodeIntoCalculatorResponse[] | null;
}

export interface CalculatorResponseSuccessApiResponse {
  successResponse: CalculatorResponse | null;
}

export interface CheckCurrentTransformerRequest {
  /** @format date-time */
  currentCheckingDate: string;

  /** @format date-time */
  futureCheckingDate: string;
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

export interface CloseCurrentTransformerRequest {
  /** @format date-time */
  closingDate: string;
  documentIds?: number[] | null;
}

export interface CloseDeviceRequest {
  /** @format int32 */
  deviceId: number;
  documentsIds?: number[] | null;

  /** @format date-time */
  closingDate?: string | null;
  closingReason?: EClosingReason | null;
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

export interface CommunicationPipeForAddingDeviceResponse {
  /** @format int32 */
  id: number;

  /** @format int32 */
  number: number;
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

export interface ConfirmRequest {
  token: string;
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

export interface ContractorListResponsePagedListSuccessApiResponse {
  successResponse: ContractorListResponsePagedList | null;
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

export interface CreateAddressRequest {
  city: string;
  street: string;
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
  housingMeteringDeviceType: EHousingMeteringDeviceType;
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
  number?: number;
  nodeStatus?: ENodeCommercialAccountStatus;

  /** @format int32 */
  nodeServiceZoneId?: number;

  /** @format int32 */
  housingStockId?: number;

  /** @format date-time */
  startCommercialAccountingDate?: string | null;

  /** @format date-time */
  endCommercialAccountingDate?: string | null;
  locationName?: string | null;
  counter?: CreateElectricHousingMeteringDeviceRequest | null;
  currentTransformers?: CreateCurrentTransformerRequest[] | null;
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
  model: string;
  serialNumber: string;

  /** @format date-time */
  lastCheckingDate: string;

  /** @format date-time */
  futureCheckingDate: string;
  sealNumber?: string | null;

  /** @format date-time */
  sealInstallationDate?: string | null;

  /** @format int32 */
  bitDepth: number;

  /** @format double */
  scaleFactor: number;

  /** @format date-time */
  openingDate?: string | null;

  /** @format int32 */
  apartmentId: number;
  resource: EResourceType;

  /** @format int32 */
  mountPlaceId?: number | null;
  rateType: EIndividualDeviceRateType;
  startupReadings: BaseIndividualDeviceReadingsCreateRequest;
  defaultReadings?: BaseIndividualDeviceReadingsCreateRequest | null;
  connection?: MeteringDeviceConnection | null;
  isConnected?: boolean;
  isPolling?: boolean;

  /** @format int32 */
  contractorId?: number | null;
  documentsIds?: number[] | null;
}

export interface CreateNodeCheckRequest {
  /** @format date-time */
  checkingDate: string;
  checkType: ENodeCheckType;

  /** @format int32 */
  documentId?: number | null;
  registryNumber: string;
}

export interface CreatePipeConnectionRequest {
  /** @format int32 */
  pipeNumber: number;
  magistral: EMagistralType;

  /** @format int32 */
  nodeId?: number;

  /** @format int32 */
  diameter?: number;
}

export interface CreatePipeHousingMeteringDeviceInNodeRequest {
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
  model: string;

  /** @format double */
  minReadingsValue?: number | null;

  /** @format double */
  maxReadingsValue?: number | null;
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
  housingMeteringDeviceType: EHousingMeteringDeviceType;
  model: string;

  /** @format double */
  minReadingsValue?: number | null;

  /** @format double */
  maxReadingsValue?: number | null;
  pipe?: CreatePipeConnectionRequest | null;
}

export interface CreatePipeNodeRequest {
  /** @format int32 */
  number?: number;
  nodeStatus?: ENodeCommercialAccountStatus;

  /** @format int32 */
  nodeServiceZoneId?: number;

  /** @format int32 */
  housingStockId?: number;

  /** @format date-time */
  startCommercialAccountingDate?: string | null;

  /** @format date-time */
  endCommercialAccountingDate?: string | null;

  /** @format int32 */
  entryNumber?: number | null;

  /** @format int32 */
  calculatorId?: number | null;
  resource?: EResourceType;
  communicationPipes?: CreateCommunicationPipeRequest[] | null;
}

export interface CreateTaskApplicationRequest {
  number?: string | null;

  /** @format date-time */
  applicationDate?: string;

  /** @format uuid */
  sourceId?: string;
  type?: ETaskApplicationType;

  /** @format uuid */
  competenceId?: string;
  workNomenclatureIds?: string[] | null;

  /** @format int32 */
  apartmentId?: number | null;

  /** @format int32 */
  housingStockId?: number | null;
  comment?: string | null;

  /** @format int32 */
  executorId?: number;
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

export interface DataAfterSplittingHomeownerAccountResponse {
  splittedApartmentHomeownerAccount: HomeownerAccountResponse | null;
  newApartmentHomeownerAccount: HomeownerAccountResponse | null;
}

export interface DataAfterSplittingHomeownerAccountResponseSuccessApiResponse {
  successResponse: DataAfterSplittingHomeownerAccountResponse | null;
}

export interface DateTimeDoubleDictionaryItem {
  /** @format date-time */
  key?: string;

  /** @format double */
  value?: number;
}

export interface DisableNodeWorkingRangeRequest {
  season: ENodeWorkingRangeSeason;
  nodeResourceType: EResourceType;
  typeWorkingRange: ENodeWorkingRangeType;

  /** @format int32 */
  housingStockId?: number | null;

  /** @format uuid */
  housingManagementId?: string | null;

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

export enum EActResourceType {
  All = "All",
  ColdWaterSupply = "ColdWaterSupply",
  HotWaterSupply = "HotWaterSupply",
  Electricity = "Electricity",
  Heat = "Heat",
}

export interface EActResourceTypeStringDictionaryItem {
  key?: EActResourceType;
  value?: string | null;
}

export interface EActResourceTypeStringDictionaryItemListSuccessApiResponse {
  successResponse: EActResourceTypeStringDictionaryItem[] | null;
}

export enum EActType {
  PlannedCheck = "PlannedCheck",
  UnplannedCheck = "UnplannedCheck",
  ResourceDisconnect = "ResourceDisconnect",
  ResourceConnect = "ResourceConnect",
  HomeownerAccountCertificate = "HomeownerAccountCertificate",
  Admission = "Admission",
  NonAdmission = "NonAdmission",
}

export interface EActTypeStringDictionaryItem {
  key?: EActType;
  value?: string | null;
}

export interface EActTypeStringDictionaryItemListSuccessApiResponse {
  successResponse: EActTypeStringDictionaryItem[] | null;
}

export enum EApartmentStatus {
  Ok = "Ok",
  Debtor = "Debtor",
  Pause = "Pause",
}

export enum ECalculatorOrderRule {
  Street = "Street",
  FutureCheckingDate = "FutureCheckingDate",
}

export enum ECheckType {
  Planned = "Planned",
  Unplanned = "Unplanned",
  Admission = "Admission",
}

export interface ECheckTypeStringDictionaryItem {
  key?: ECheckType;
  value?: string | null;
}

export interface ECheckTypeStringDictionaryItemListSuccessApiResponse {
  successResponse: ECheckTypeStringDictionaryItem[] | null;
}

export enum EClosingReason {
  None = "None",
  Manually = "Manually",
  NoReadings = "NoReadings",
  DeviceBroken = "DeviceBroken",
  CheckingDate = "CheckingDate",
  CertificateIssued = "CertificateIssued",
  MaintainingStopped = "MaintainingStopped",
  ByLetter = "ByLetter",
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

export enum EEmailSubscriptionType {
  Once = "Once",
  OncePerTwoWeeks = "OncePerTwoWeeks",
  OncePerMonth = "OncePerMonth",
  OncePerQuarter = "OncePerQuarter",
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

export interface EHouseCategoryStringDictionaryItem {
  key?: EHouseCategory;
  value?: string | null;
}

export enum EHousingMeteringDeviceType {
  FlowMeter = "FlowMeter",
  TemperatureSensor = "TemperatureSensor",
  WeatherController = "WeatherController",
  PressureMeter = "PressureMeter",
  Counter = "Counter",
}

export enum EHousingStockOrderRule {
  Street = "Street",
  TaskCount = "TaskCount",
}

export enum EImportedEntityType {
  IndividualDeviceReadings = "IndividualDeviceReadings",
  PersonalAccountNumber = "PersonalAccountNumber",
}

export enum EIndividualDeviceOrderRule {
  Resource = "Resource",
  ApartmentNumber = "ApartmentNumber",
  SerialNumber = "SerialNumber",
}

export enum EIndividualDeviceRateType {
  OneZone = "OneZone",
  TwoZone = "TwoZone",
  ThreeZone = "ThreeZone",
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
  TelegramBot = "TelegramBot",
  DeviceTelemetry = "DeviceTelemetry",
}

export enum ELivingHouseType {
  None = "None",
  ApartmentHouse = "ApartmentHouse",
  Townhouse = "Townhouse",
  Private = "Private",
}

export interface ELivingHouseTypeStringDictionaryItem {
  key?: ELivingHouseType;
  value?: string | null;
}

export enum EMagistralType {
  FeedFlow = "FeedFlow",
  FeedBackFlow = "FeedBackFlow",
  Recharge = "Recharge",
}

export interface EMagistralTypeStringDictionaryItem {
  key?: EMagistralType;
  value?: string | null;
}

export interface EMagistralTypeStringDictionaryItemListSuccessApiResponse {
  successResponse: EMagistralTypeStringDictionaryItem[] | null;
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
  HousingMeteringDeviceReadingsRemove = "HousingMeteringDeviceReadingsRemove",
}

export enum EManagingFirmTaskFilterType {
  CalculatorMalfunctionAny = "CalculatorMalfunctionAny",
  HousingDeviceMalfunctionAny = "HousingDeviceMalfunctionAny",
  CalculatorLackOfConnection = "CalculatorLackOfConnection",
  IndividualDeviceCheck = "IndividualDeviceCheck",
  PipeRupture = "PipeRupture",
  IndividualDeviceReadingsCheck = "IndividualDeviceReadingsCheck",
  MeasurementErrorAny = "MeasurementErrorAny",
  IndividualDeviceCheckNoReadings = "IndividualDeviceCheckNoReadings",
  RiserNoReadings = "RiserNoReadings",
}

export interface EManagingFirmTaskFilterTypeNullableStringDictionaryItem {
  key?: EManagingFirmTaskFilterType | null;
  value?: string | null;
}

export enum EManagingFirmTaskType {
  CalculatorMalfunction = "CalculatorMalfunction",
  CalculatorMalfunctionNonCommercial = "CalculatorMalfunctionNonCommercial",
  HousingDeviceMalfunction = "HousingDeviceMalfunction",
  HousingDeviceMalfunctionNonCommercial = "HousingDeviceMalfunctionNonCommercial",
  CalculatorLackOfConnection = "CalculatorLackOfConnection",
  IndividualDeviceCheck = "IndividualDeviceCheck",
  PipeRupture = "PipeRupture",
  CurrentApplication = "CurrentApplication",
  EmergencyApplication = "EmergencyApplication",
  IndividualDeviceReadingsCheck = "IndividualDeviceReadingsCheck",
  PlannedApplication = "PlannedApplication",
  MeasurementErrorCommercial = "MeasurementErrorCommercial",
  MeasurementErrorNonCommercial = "MeasurementErrorNonCommercial",
  IndividualDeviceCheckNoReadings = "IndividualDeviceCheckNoReadings",
  RiserNoReadings = "RiserNoReadings",
}

export enum EMeteringDeviceType {
  Calculator = "Calculator",
  HousingPipe = "HousingPipe",
  Individual = "Individual",
  HousingElectric = "HousingElectric",
}

export enum ENodeCheckType {
  PlannedCheck = "PlannedCheck",
  UnplannedCheck = "UnplannedCheck",
  AdmissionCheck = "AdmissionCheck",
}

export enum ENodeCommercialAccountStatus {
  NotRegistered = "NotRegistered",
  Registered = "Registered",
  OnReview = "OnReview",
  Prepared = "Prepared",
}

export interface ENodeCommercialAccountStatusNullableStringDictionaryItem {
  key?: ENodeCommercialAccountStatus | null;
  value?: string | null;
}

export enum ENodeNetworkDeviceType {
  Calculator = "Calculator",
  Counter = "Counter",
}

export enum ENodeType {
  PipeNode = "PipeNode",
  ElectricNode = "ElectricNode",
}

export enum ENodeWorkingRangeSeason {
  HeatingSeason = "HeatingSeason",
  InterHeating = "InterHeating",
}

export enum ENodeWorkingRangeType {
  AllowableError = "AllowableError",
  CriticalError = "CriticalError",
  MassOfFeedFlowMagistral = "MassOfFeedFlowMagistral",
  MassOfFeedBackFlowMagistral = "MassOfFeedBackFlowMagistral",
  DeltaMassOfMagistral = "DeltaMassOfMagistral",
}

export interface ENodeWorkingRangeTypeStringDictionaryItem {
  key?: ENodeWorkingRangeType;
  value?: string | null;
}

export interface ENodeWorkingRangeTypeStringDictionaryItemListSuccessApiResponse {
  successResponse: ENodeWorkingRangeTypeStringDictionaryItem[] | null;
}

export enum ENonResidentialHouseType {
  None = "None",
  Social = "Social",
  Commercial = "Commercial",
}

export interface ENonResidentialHouseTypeStringDictionaryItem {
  key?: ENonResidentialHouseType;
  value?: string | null;
}

export enum EOrderByRule {
  Ascending = "Ascending",
  Descending = "Descending",
}

export enum EOrganizationUserWorkingStatusType {
  Working = "Working",
  OnVacation = "OnVacation",
  Sick = "Sick",
  OnDuty = "OnDuty",
}

export interface EOrganizationUserWorkingStatusTypeStringDictionaryItem {
  key?: EOrganizationUserWorkingStatusType;
  value?: string | null;
}

export interface EOrganizationUserWorkingStatusTypeStringDictionaryItemListSuccessApiResponse {
  successResponse: EOrganizationUserWorkingStatusTypeStringDictionaryItem[] | null;
}

export enum EPersonType {
  Natural = "Natural",
  Juristic = "Juristic",
}

export enum EPhaseNumberType {
  SinglePhase = "SinglePhase",
  ThreePhase = "ThreePhase",
}

export enum EPhaseType {
  A = "A",
  B = "B",
  C = "C",
}

export enum EReportFormat {
  Consumption = "Consumption",
  Rso = "Rso",
}

export enum EReportName {
  OperatorsWorkingReport = "OperatorsWorkingReport",
  InspectorsWorkingReport = "InspectorsWorkingReport",
  CallCenterWorkingReport = "CallCenterWorkingReport",
  HouseManagementsReport = "HouseManagementsReport",
  CheckingDatesReport = "CheckingDatesReport",
  ClosedDevicesReport = "ClosedDevicesReport",
}

export enum EReportType {
  None = "None",
  Hourly = "Hourly",
  Daily = "Daily",
  Monthly = "Monthly",
  Total = "Total",
  Current = "Current",
  TotalCurrent = "TotalCurrent",
  Events = "Events",
  Settings = "Settings",
  Other = "Other",
}

export enum EResourceDisconnectingOrderRule {
  StartDate = "StartDate",
  EndDate = "EndDate",
}

export enum EResourceDisconnectingStatus {
  Future = "Future",
  Active = "Active",
  Past = "Past",
}

export enum EResourceDisconnectingType {
  Other = "Other",
  Planned = "Planned",
  Emergency = "Emergency",
  Preventive = "Preventive",
  Repair = "Repair",
  InterHeatingSeason = "InterHeatingSeason",
}

export interface EResourceDisconnectingTypeNullableStringDictionaryItem {
  key?: EResourceDisconnectingType | null;
  value?: string | null;
}

export enum EResourceType {
  Heat = "Heat",
  HotWaterSupply = "HotWaterSupply",
  ColdWaterSupply = "ColdWaterSupply",
  Electricity = "Electricity",
}

export interface EResourceTypeConsumptionRateResponseDictionaryItem {
  key?: EResourceType;
  value?: ConsumptionRateResponse | null;
}

export interface EResourceTypeConsumptionRateResponseDictionaryItemListSuccessApiResponse {
  successResponse: EResourceTypeConsumptionRateResponseDictionaryItem[] | null;
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
  Administrator = "Administrator",
  ManagingFirmExecutor = "ManagingFirmExecutor",
  Homeowner = "Homeowner",
  Operator = "Operator",
  ErcService = "ErcService",
  Admin = "Admin",
  Worker = "Worker",
  ManagingFirmSpectator = "ManagingFirmSpectator",
  ManagingFirmDispatcher = "ManagingFirmDispatcher",
  Controller = "Controller",
  SeniorOperator = "SeniorOperator",
  ManagingFirmSpectatorRestricted = "ManagingFirmSpectatorRestricted",
}

export interface ESecuredIdentityRoleNameStringDictionaryItem {
  key?: ESecuredIdentityRoleName;
  value?: string | null;
}

export interface ESecuredIdentityRoleNameStringDictionaryItemListSuccessApiResponse {
  successResponse: ESecuredIdentityRoleNameStringDictionaryItem[] | null;
}

export enum ESoiReportPeriod {
  Month = "Month",
  Year = "Year",
}

export enum EStageActionType {
  AddDocuments = "AddDocuments",
  AddPerpetrator = "AddPerpetrator",
  EmailNotify = "EmailNotify",
  UploadReadings = "UploadReadings",
  CheckDevice = "CheckDevice",
  SwitchDevices = "SwitchDevices",
  SetNextStageDeadline = "SetNextStageDeadline",
  Completion = "Completion",
  Switch = "Switch",
  ChangeApartmentCoefficient = "ChangeApartmentCoefficient",
  AddEmailTemplate = "AddEmailTemplate",
  AddPhotos = "AddPhotos",
  AddConsumableMaterials = "AddConsumableMaterials",
  Returnable = "Returnable",
  AddComment = "AddComment",
  AddApartmentCheck = "AddApartmentCheck",
  FixReading = "FixReading",
  CompletionOrSwitch = "CompletionOrSwitch",
  ClearManuallyAttachedParticipants = "ClearManuallyAttachedParticipants",
  CloseIndividualDevices = "CloseIndividualDevices",
}

export enum EStageStatus {
  Waiting = "Waiting",
  InProgress = "InProgress",
  Done = "Done",
}

export enum EStageTimeStatus {
  Normal = "Normal",
  RunningOut = "RunningOut",
  Expired = "Expired",
}

export enum EStageType {
  Common = "Common",
  Switch = "Switch",
  Final = "Final",
}

export enum ETaskApplicationStatus {
  Open = "Open",
  Closed = "Closed",
}

export enum ETaskApplicationType {
  Emergency = "Emergency",
  Current = "Current",
  Planned = "Planned",
}

export enum ETaskClosingStatus {
  Properly = "Properly",
  Interrupted = "Interrupted",
}

export interface ETaskClosingStatusNullableStringDictionaryItem {
  key?: ETaskClosingStatus | null;
  value?: string | null;
}

export enum ETaskConfirmationType {
  Confirm = "Confirm",
  PipeRuptureNotConfirmAnomaly = "PipeRuptureNotConfirm_Anomaly",
  PipeRuptureNotConfirmCalculatorMalfunction = "PipeRuptureNotConfirm_CalculatorMalfunction",
  PipeRuptureNotConfirmPowerMalfunction = "PipeRuptureNotConfirm_PowerMalfunction",
}

export interface ETaskConfirmationTypeStringDictionaryItem {
  key?: ETaskConfirmationType;
  value?: string | null;
}

export enum ETaskCreateType {
  CalculatorMalfunction = "CalculatorMalfunction",
  HousingDeviceMalfunction = "HousingDeviceMalfunction",
  CalculatorLackOfConnection = "CalculatorLackOfConnection",
  PipeRupture = "PipeRupture",
  IndividualDeviceCheck = "IndividualDeviceCheck",
  IndividualDeviceReadingsCheck = "IndividualDeviceReadingsCheck",
  MeasurementError = "MeasurementError",
  IndividualDeviceCheckNoReadings = "IndividualDeviceCheckNoReadings",
  RiserNoReadings = "RiserNoReadings",
}

export enum ETaskEngineeringElement {
  Node = "Node",
  IndividualDevice = "IndividualDevice",
  HouseNetwork = "HouseNetwork",
}

export enum ETaskTargetObjectRequestType {
  Apartment = "Apartment",
  MeteringDevice = "MeteringDevice",
  Node = "Node",
  Application = "Application",
  Reading = "Reading",
  IndividualDevice = "IndividualDevice",
}

export enum ETaskTargetType {
  Apartment = "Apartment",
  Calculator = "Calculator",
  Housing = "Housing",
  Node = "Node",
  Application = "Application",
}

export enum ETasksState {
  NoTasks = "NoTasks",
  OnTime = "OnTime",
  MissedDeadline = "MissedDeadline",
}

export enum EValueNodeWorkingRangeRelation {
  Self = "Self",
  ManagementFirm = "ManagementFirm",
  HouseManagement = "HouseManagement",
  HousingStock = "HousingStock",
}

export enum EYearQuarter {
  First = "First",
  Second = "Second",
  Third = "Third",
  Forth = "Forth",
}

export interface EditApartmentCheckRequest {
  /** @format date-time */
  checkingDate?: string | null;
  checkType?: ECheckType | null;

  /** @format int32 */
  documentId?: number | null;
  registryNumber?: string | null;
  actResourceType?: EActResourceType | null;
}

export interface EditIndividualDeviceReadingsHistoryRequest {
  newReadings?: SwitchIndividualDeviceReadingsCreateRequest[] | null;
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
  isActive: boolean | null;

  /** @format int32 */
  bitDepth: number | null;

  /** @format double */
  scaleFactor: number | null;
  resource: EResourceType;
  housingMeteringDeviceType: EHousingMeteringDeviceType;
  address: HousingStockShortResponse | null;
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

export interface ElectricHousingMeteringDeviceResponseSuccessApiResponse {
  successResponse: ElectricHousingMeteringDeviceResponse | null;
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

  /** @format date-time */
  commercialAccountingDeregistrationDate: string | null;

  /** @format int32 */
  housingStockId: number;
  address: HousingStockShortResponse | null;
  documents: DocumentLiteResponse[] | null;
  locationName: string | null;
  counter: ElectricHousingMeteringDeviceResponse | null;
  currentTransformers: CurrentTransformerResponse[] | null;
}

export interface ElectricNodeResponseSuccessApiResponse {
  successResponse: ElectricNodeResponse | null;
}

export interface ErrorApiResponse {
  errorResponse: ErrorResponse | null;
}

export interface ErrorResponse {
  code: string | null;
  message: string | null;
  text: string | null;
  data: Record<string, any>;
  requestId: string | null;
}

export interface FileContentResultSuccessApiResponse {
  /** @format binary */
  successResponse: File | null;
}

export interface FullAddressResponse {
  /** @format int32 */
  id: number;
  housingStockNumber: string | null;
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

export interface GetDataForHousingConsumptionPlotResponseSuccessApiResponse {
  successResponse: GetDataForHousingConsumptionPlotResponse | null;
}

export interface GetDataForIndividualDevicesConsumptionPlotResponse {
  normativeConsumption: DateTimeDoubleDictionaryItem[] | null;
  subscriberConsumption: DateTimeDoubleDictionaryItem[] | null;
}

export interface GetDataForIndividualDevicesConsumptionPlotResponseSuccessApiResponse {
  successResponse: GetDataForIndividualDevicesConsumptionPlotResponse | null;
}

export interface GetHousingMeteringDeviceReadingsResponse {
  items: HousingMeteringDeviceReadingsIncludingPlacementResponse[] | null;
}

export interface GetHousingMeteringDeviceReadingsResponseSuccessApiResponse {
  successResponse: GetHousingMeteringDeviceReadingsResponse | null;
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

export interface GroupReportResponseSuccessApiResponse {
  successResponse: GroupReportResponse | null;
}

export interface GuidStringDictionaryItem {
  /** @format uuid */
  key?: string;
  value?: string | null;
}

export interface GuidSuccessApiResponse {
  /** @format uuid */
  successResponse: string;
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
  housingStocks: HousingStockShortResponse[] | null;
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

export interface HeatingSeasonPageResponseSuccessApiResponse {
  successResponse: HeatingSeasonPageResponse | null;
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

export interface HeatingStationResponse {
  /** @format uuid */
  id: string;
  name: string | null;
  isThermalChamber: boolean;
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

export interface HeatingStationResponseSuccessApiResponse {
  successResponse: HeatingStationResponse | null;
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
  streets: StreetWithHousingStockNumbersResponse[] | null;
}

export interface HeatingStationWithStreetsResponseIEnumerableSuccessApiResponse {
  successResponse: HeatingStationWithStreetsResponse[] | null;
}

export interface HomeownerAccount {
  fullName?: string | null;
  personalAccountNumber?: string | null;
  isMain?: boolean;
}

export interface HomeownerAccountCloseRequest {
  /** @format uuid */
  homeownerAccountId: string;

  /** @format date-time */
  closedAt: string;
}

export interface HomeownerAccountCreateRequest {
  personalAccountNumber: string;
  name: string;
  phoneNumber?: string | null;
  personType?: EPersonType;

  /** @format double */
  ownershipArea?: number | null;

  /** @format date-time */
  openAt: string;
  isMainOnApartment?: boolean;

  /** @format int32 */
  apartmentId: number;
}

export interface HomeownerAccountCreateServiceModel {
  /** @format int32 */
  apartmentId?: number;
  personalAccountNumber?: string | null;
  paymentCode?: string | null;
  name?: string | null;
  phoneNumber?: string | null;
  personType?: PersonType;

  /** @format date-time */
  openAt?: string;

  /** @format float */
  ownershipArea?: number;
  isMainOnApartment?: boolean;
}

export interface HomeownerAccountCreateUnattachedRequest {
  personalAccountNumber: string;
  name: string;
  phoneNumber?: string | null;
  personType?: EPersonType;

  /** @format double */
  ownershipArea?: number | null;

  /** @format date-time */
  openAt: string;
  isMainOnApartment?: boolean;
}

export interface HomeownerAccountListResponse {
  /** @format uuid */
  id: string;
  phoneNumber: string | null;
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

export enum HomeownerAccountOrderRule {
  Street = "Street",
  HomeownerName = "HomeownerName",
  PaymentCode = "PaymentCode",
}

export interface HomeownerAccountReplaceRequest {
  /** @format uuid */
  replaceableAccountId: string;
  newHomeownerAccount: HomeownerAccountCreateRequest;
}

export interface HomeownerAccountResponse {
  /** @format uuid */
  id: string;
  phoneNumber: string | null;
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

export interface HomeownerAccountResponseICollectionSuccessApiResponse {
  successResponse: HomeownerAccountResponse[] | null;
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

export interface HomeownerAccountResponseSuccessApiResponse {
  successResponse: HomeownerAccountResponse | null;
}

export interface HomeownerAccountSplitRequest {
  accountForClosing: HomeownerAccountCloseRequest;
  homeownerAccountForSplittedApartment: HomeownerAccountCreateRequest;
  newHomeownerAccount: HomeownerAccountCreateUnattachedRequest;
  individualDeviceIdsForSwitch?: number[] | null;
  useExistingApartment: boolean;
  newApartment: ApartmentCreateRequest;
}

export interface HomeownerAccountUpdateRequest {
  personalAccountNumber?: string | null;
  paymentCode?: string | null;
  name?: string | null;
  phoneNumber?: string | null;
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

export interface HomeownerCertificateResponseSuccessApiResponse {
  successResponse: HomeownerCertificateResponse | null;
}

export interface HouseAddress {
  city?: string | null;
  street?: string | null;
  houseNumber?: string | null;
  houseCorpus?: string | null;
}

export interface HouseManagementResponse {
  /** @format uuid */
  id: string;
  name: string | null;
  phone: string | null;
  comment: string | null;
}

export interface HouseManagementResponseListSuccessApiResponse {
  successResponse: HouseManagementResponse[] | null;
}

export interface HouseManagementResponseSuccessApiResponse {
  successResponse: HouseManagementResponse | null;
}

export interface HouseManagementWithStreetsResponse {
  /** @format uuid */
  id: string;
  name: string | null;
  streets: StreetWithHousingStockNumbersResponse[] | null;
}

export interface HouseManagementWithStreetsResponseIEnumerableSuccessApiResponse {
  successResponse: HouseManagementWithStreetsResponse[] | null;
}

export interface HousingByFilterResponse {
  previous: HousingStock | null;
  current: HousingStock | null;
  next: HousingStock | null;
}

export interface HousingByFilterResponseSuccessApiResponse {
  successResponse: HousingByFilterResponse | null;
}

export interface HousingMeteringDeviceAddCommentRequest {
  /** @format int32 */
  deviceId?: number;
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

export interface HousingMeteringDeviceCommentResponseSuccessApiResponse {
  successResponse: HousingMeteringDeviceCommentResponse | null;
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
  isActive: boolean | null;

  /** @format int32 */
  bitDepth: number | null;

  /** @format double */
  scaleFactor: number | null;
  resource: EResourceType;
  housingMeteringDeviceType: EHousingMeteringDeviceType;
  address: HousingStockShortResponse | null;
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

export interface HousingMeteringDeviceReadingsHistoryResponseSuccessApiResponse {
  successResponse: HousingMeteringDeviceReadingsHistoryResponse | null;
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

export interface HousingMeteringDeviceReadingsIncludingPlacementResponseSuccessApiResponse {
  successResponse: HousingMeteringDeviceReadingsIncludingPlacementResponse | null;
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

export interface HousingMeteringDeviceReadingsResponseSuccessApiResponse {
  successResponse: HousingMeteringDeviceReadingsResponse | null;
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

export interface HousingStock {
  /** @format int32 */
  id?: number;
  address?: HouseAddress | null;
}

export interface HousingStockAddressCreateRequest {
  district?: string | null;
  city: string;
  street: string;
  number: string;
  corpus?: string | null;
}

export interface HousingStockAddressItemResponse {
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

export interface HousingStockAddressResponse {
  mainAddress: HousingStockAddressItemResponse | null;
  additionalAddresses: HousingStockAddressItemResponse[] | null;
}

export interface HousingStockCreateRequest {
  /** @format uuid */
  heatingStationId: string;
  mainAddress: HousingStockAddressCreateRequest;
  otherAddresses?: HousingStockAddressCreateRequest[] | null;
  coordinates?: Point | null;

  /** @format uuid */
  houseManagementId: string;
  houseCategory: EHouseCategory;
  livingHouseType?: ELivingHouseType | null;
  nonResidentialHouseType?: ENonResidentialHouseType | null;

  /** @format int32 */
  numberOfFloors?: number | null;

  /** @format int32 */
  numberOfEntrances?: number | null;
  isThereElevator?: boolean | null;
  index?: string | null;
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

export interface HousingStockListResponse {
  /** @format int32 */
  id: number;

  /** @format int32 */
  managingFirmId: number;
  houseCategory: EHouseCategory;
  livingHouseType: ELivingHouseType;
  nonResidentialHouseType: ENonResidentialHouseType;
  houseCategoryString: string | null;
  houseTypeString: string | null;

  /** @format int32 */
  numberOfTasks: number | null;

  /** @format int32 */
  numberOfApartments: number;
  houseManagement: HouseManagementResponse | null;
  address: HousingStockAddressResponse | null;
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

export interface HousingStockResponse {
  /** @format int32 */
  id: number;

  /** @format int32 */
  managingFirmId: number;

  /** @format uuid */
  fiasId: string | null;
  index: string | null;
  coordinates: Point | null;
  houseCategory: EHouseCategory;
  livingHouseType: ELivingHouseType | null;
  nonResidentialHouseType: ENonResidentialHouseType | null;
  houseCategoryString: string | null;
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

  /** @format date-time */
  constructionDate: string | null;
  hasIndividualHeatingStation: boolean;
  heatingStation: HeatingStationShortResponse | null;
  managementFirmName: string | null;
  managementFirmInfo: string | null;
  houseManagement: HouseManagementResponse | null;

  /** @format int32 */
  inspectorId: number | null;

  /** @format int32 */
  inspectedDay: number | null;
  address: HousingStockAddressResponse | null;

  /** @format int32 */
  numberOfTasks: number;
}

export interface HousingStockResponseSuccessApiResponse {
  successResponse: HousingStockResponse | null;
}

export interface HousingStockShortResponse {
  /** @format int32 */
  id: number;

  /** @format int32 */
  managingFirmId: number;
  address: HousingStockAddressResponse | null;
}

export interface HousingStockUpdateRequest {
  houseCategory?: EHouseCategory | null;
  livingHouseType?: ELivingHouseType | null;
  nonResidentialHouseType?: ENonResidentialHouseType | null;

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

  /** @format int32 */
  inspectorId?: number | null;

  /** @format int32 */
  inspectedDay?: number | null;
  coordinates?: Point | null;
  index?: string | null;
}

export interface ImportLogListResponse {
  importLogs: ImportLogResponse[] | null;
}

export interface ImportLogListResponseSuccessApiResponse {
  successResponse: ImportLogListResponse | null;
}

export interface ImportLogResponse {
  /** @format uuid */
  id: string;
  entityType: EImportedEntityType;
  document: DocumentResponse | null;
  parseResult: ParseResultResponse | null;
  importResult: ImportResultResponse | null;
}

export interface ImportLogResponseArraySuccessApiResponse {
  successResponse: ImportLogResponse[] | null;
}

export interface ImportLogResponseSuccessApiResponse {
  successResponse: ImportLogResponse | null;
}

export interface ImportResultResponse {
  isValid: boolean;
  importLogs: string[] | null;
  importWarnings: string[] | null;
  importErrors: string[] | null;
}

export interface ImportResultServiceModel {
  importLogs?: string[] | null;
  importWarnings?: string[] | null;
  importErrors?: string[] | null;
  isValid?: boolean;
  wasSaved?: boolean;
}

export interface ImportResultServiceModelSuccessApiResponse {
  successResponse: ImportResultServiceModel | null;
}

export interface IndividualDeviceConsumption {
  /** @format double */
  consumption?: number;

  /** @format date-time */
  readingDate?: string;
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
  transactionType: string | null;
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
  isActive: boolean;

  /** @format int32 */
  bitDepth: number | null;

  /** @format double */
  scaleFactor: number | null;
  resource: EResourceType;
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

export interface IndividualDeviceListItemResponsePagedListSuccessApiResponse {
  successResponse: IndividualDeviceListItemResponsePagedList | null;
}

export interface IndividualDeviceListResponseFromDevicePage {
  /** @format int32 */
  id?: number;
  model?: string | null;
  serialNumber?: string | null;

  /** @format date-time */
  closingDate?: string | null;

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

export interface IndividualDeviceListResponseFromDevicePagePagedListSuccessApiResponse {
  successResponse: IndividualDeviceListResponseFromDevicePagePagedList | null;
}

export interface IndividualDeviceMountPlaceForFilterResponse {
  name: string | null;
  description: string | null;
}

export interface IndividualDeviceMountPlaceForFilterResponseListSuccessApiResponse {
  successResponse: IndividualDeviceMountPlaceForFilterResponse[] | null;
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

export interface IndividualDeviceOnTaskResponse {
  /** @format int32 */
  id: number;
  transactionType: string | null;
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
  isActive: boolean | null;

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

export interface IndividualDeviceReadingsCreateListResponseSuccessApiResponse {
  successResponse: IndividualDeviceReadingsCreateListResponse | null;
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

export interface IndividualDeviceReadingsHistoryResponseSuccessApiResponse {
  successResponse: IndividualDeviceReadingsHistoryResponse | null;
}

export interface IndividualDeviceReadingsItemHistoryResponse {
  /** @format int32 */
  id: number;
  value1: string | null;
  value2: string | null;
  value3: string | null;
  value4: string | null;
  readingDate: string | null;

  /** @format date-time */
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
  readingDate: string | null;

  /** @format date-time */
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

export interface IndividualDeviceReadingsResponseSuccessApiResponse {
  successResponse: IndividualDeviceReadingsResponse | null;
}

export interface IndividualDeviceReadingsYearHistoryResponse {
  /** @format int32 */
  year: number;
  monthReadings: IndividualDeviceReadingsMonthHistoryResponse[] | null;
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
  isActive: boolean | null;

  /** @format int32 */
  bitDepth: number | null;

  /** @format double */
  scaleFactor: number | null;
  address: FullAddressResponse | null;
  resource: EResourceType;
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
}

export interface IndividualDeviceResponseFromDevicePageSuccessApiResponse {
  successResponse: IndividualDeviceResponseFromDevicePage | null;
}

export interface IndividualDeviceResponseSuccessApiResponse {
  successResponse: IndividualDeviceResponse | null;
}

export interface IndividualDeviceWithExpiredCheckingDateListResponse {
  devices: IndividualDeviceWithExpiredCheckingDateResponse[] | null;
}

export interface IndividualDeviceWithExpiredCheckingDateListResponseSuccessApiResponse {
  successResponse: IndividualDeviceWithExpiredCheckingDateListResponse | null;
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
  isActive: boolean | null;

  /** @format int32 */
  bitDepth: number | null;

  /** @format double */
  scaleFactor: number | null;
  resource: EResourceType;
  rateType: EIndividualDeviceRateType;
}

export interface InspectorCreateRequest {
  fullName: string;

  /** @format int32 */
  readoutPlan: number;
}

export interface InspectorOnHousingStockResponse {
  /** @format int32 */
  housingStockId: number;
  street: string | null;
  corpus: string | null;
  number: string | null;

  /** @format uuid */
  houseManagementId: string;
  houseManagement: string | null;

  /** @format int32 */
  inspectedDay: number | null;

  /** @format int32 */
  inspectorId: number | null;
}

export interface InspectorOnHousingStockResponseListSuccessApiResponse {
  successResponse: InspectorOnHousingStockResponse[] | null;
}

export interface InspectorReassignAllAddressesRequest {
  /** @format int32 */
  newInspectorId?: number;
}

export interface InspectorResponse {
  /** @format int32 */
  id: number;
  fullName: string | null;

  /** @format int32 */
  readoutPlan: number;
}

export interface InspectorResponseListSuccessApiResponse {
  successResponse: InspectorResponse[] | null;
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

export interface InspectorResponsePagedListSuccessApiResponse {
  successResponse: InspectorResponsePagedList | null;
}

export interface InspectorResponseSuccessApiResponse {
  successResponse: InspectorResponse | null;
}

export interface InspectorUpdateRequest {
  fullName?: string | null;

  /** @format int32 */
  readoutPlan?: number | null;
}

export interface Int32NullableSuccessApiResponse {
  /** @format int32 */
  successResponse: number | null;
}

export interface Int32SuccessApiResponse {
  /** @format int32 */
  successResponse: number;
}

export interface InvalidRowResponse {
  /** @format int32 */
  index: number;
  errorMessage: string | null;
}

export interface LastModifiedUserResponse {
  /** @format int32 */
  id: number;
  firstName: string | null;
  lastName: string | null;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LogoutRequest {
  token: string;
  refreshToken: string;
}

export interface ManagementFirmCompetenceResponse {
  /** @format uuid */
  id: string;
  title: string | null;
  relatedUsers: ManagementFirmCompetenceUserResponse[] | null;
  nomenclatures: WorkNomenclatureResponse[] | null;
}

export interface ManagementFirmCompetenceUserResponse {
  /** @format int32 */
  userId: number;
}

export interface ManagementFirmCompetencesListResponse {
  competences: ManagementFirmCompetenceResponse[] | null;
}

export interface ManagementFirmCompetencesListResponseSuccessApiResponse {
  successResponse: ManagementFirmCompetencesListResponse | null;
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

  /** @format int32 */
  number: number;
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

  /** @format int32 */
  number: number;
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
  /** @format int32 */
  id: number;

  /** @format int32 */
  managementFirmId: number;
  hasHousingStockCorpuses: boolean;
  pipeDiameters: number[] | null;
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

export interface MeteringDeviceListResponseIEnumerableSuccessApiResponse {
  successResponse: MeteringDeviceListResponse[] | null;
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

export interface MeteringDeviceResponse {
  /** @format int32 */
  id: number;
  transactionType: string | null;
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
  isActive: boolean | null;

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

export interface MeteringDeviceResponseSuccessApiResponse {
  successResponse: MeteringDeviceResponse | null;
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

export interface MeteringDeviceSearchListResponseIEnumerableSuccessApiResponse {
  successResponse: MeteringDeviceSearchListResponse[] | null;
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

export interface NodeCheckResponsePagedListSuccessApiResponse {
  successResponse: NodeCheckResponsePagedList | null;
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

  /** @format int32 */
  number: number;
  status: ENodeCommercialAccountStatus;
  resource: EResourceType;
  type: ENodeType;
  serviceZone: NodeServiceZoneResponse | null;
  networkDevice: NodeNetworkDeviceResponse | null;
}

export interface NodeOnHousingStockResponseListSuccessApiResponse {
  successResponse: NodeOnHousingStockResponse[] | null;
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

export interface NodeServiceZoneResponse {
  /** @format int32 */
  id: number;
  name: string | null;
}

export interface NodeServiceZoneResponseSuccessApiResponse {
  successResponse: NodeServiceZoneResponse | null;
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

export interface NumberIdResponse {
  /** @format int32 */
  id: number;
  number: string | null;
}

export interface NumberIdResponseArraySuccessApiResponse {
  successResponse: NumberIdResponse[] | null;
}

export enum OrderByRule {
  Ascending = "Ascending",
  Descending = "Descending",
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
  phoneNumber: string | null;
  information: string | null;
  email: string | null;
  workingTime: string | null;
  address: OrganizationAddressResponse | null;
  filtersConfiguration: ManagementFirmFiltersConfigurationResponse | null;
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

export interface OrganizationResponsePagedListSuccessApiResponse {
  successResponse: OrganizationResponsePagedList | null;
}

export interface OrganizationResponseSuccessApiResponse {
  successResponse: OrganizationResponse | null;
}

export interface OrganizationUpdateRequest {
  name?: string | null;
  phoneNumber?: string | null;
}

export interface OrganizationUserCreateRequest {
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

export interface OrganizationUserListResponseListSuccessApiResponse {
  successResponse: OrganizationUserListResponse[] | null;
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

export interface OrganizationUserListResponsePagedListSuccessApiResponse {
  successResponse: OrganizationUserListResponsePagedList | null;
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
  organization: OrganizationResponse | null;
  status: UserStatusResponse | null;
  competences: UserCompetenceResponse[] | null;
  roles: ESecuredIdentityRoleNameStringDictionaryItem[] | null;
  housingStocks: HousingStockShortResponse[] | null;
}

export interface OrganizationUserResponseSuccessApiResponse {
  successResponse: OrganizationUserResponse | null;
}

export interface OrganizationUserShortResponse {
  /** @format int32 */
  id: number;
  name: string | null;
  email: string | null;
}

export interface OrganizationUserShortResponseSuccessApiResponse {
  successResponse: OrganizationUserShortResponse | null;
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

export interface OrganizationUserStatisticsResponseSuccessApiResponse {
  successResponse: OrganizationUserStatisticsResponse | null;
}

export interface OrganizationUserUpdateRequest {
  /** @format email */
  email?: string | null;
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
  /** @format uuid */
  id: string | null;
  type: EOrganizationUserWorkingStatusType;

  /** @format date-time */
  startDate: string | null;

  /** @format date-time */
  endDate: string | null;
}

export interface OrganizationUserWorkingStatusResponseSuccessApiResponse {
  successResponse: OrganizationUserWorkingStatusResponse | null;
}

export interface ParseResultResponse {
  isValid: boolean;
  invalidRows: InvalidRowResponse[] | null;
}

export enum PersonType {
  Natural = "Natural",
  Juristic = "Juristic",
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
  managementFirm: OrganizationResponse | null;

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
  resource: EResourceType;
  housingMeteringDeviceType: EHousingMeteringDeviceType;
  hub: PipeHousingMeteringDeviceHubConnectionResponse | null;
  diameter: string | null;
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
  isActive: boolean | null;

  /** @format int32 */
  bitDepth: number | null;

  /** @format double */
  scaleFactor: number | null;
  resource: EResourceType;
  housingMeteringDeviceType: EHousingMeteringDeviceType;
  address: HousingStockShortResponse | null;
  comment: HousingMeteringDeviceCommentResponse | null;

  /** @format int32 */
  diameter: number | null;
  hubConnection: PipeHousingMeteringDeviceConnectionResponse | null;
}

export interface PipeHousingMeteringDeviceResponseSuccessApiResponse {
  successResponse: PipeHousingMeteringDeviceResponse | null;
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

export interface PipeNodeMeteringDeviceResponse {
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

  /** @format int32 */
  number: number;
  nodeStatus: NodeCommercialStatusResponse | null;
  resource: EResourceType;
  nodeServiceZone: NodeServiceZoneResponse | null;

  /** @format date-time */
  lastCommercialAccountingDate: string | null;

  /** @format date-time */
  futureCommercialAccountingDate: string | null;

  /** @format date-time */
  commercialAccountingDeregistrationDate: string | null;

  /** @format int32 */
  housingStockId: number;
  address: HousingStockShortResponse | null;
  documents: DocumentLiteResponse[] | null;
  heatingSeason: PipeNodeHeatingSeasonListResponse | null;

  /** @format int32 */
  calculatorId: number | null;
  calculator: CalculatorIntoNodeResponse | null;

  /** @format int32 */
  entryNumber: number | null;
  communicationPipes: CommunicationPipeResponse[] | null;
}

export interface PipeNodeResponseSuccessApiResponse {
  successResponse: PipeNodeResponse | null;
}

export interface PipeRuptureDateTimeRangeRequest {
  /** @format date-time */
  start: string;

  /** @format date-time */
  end: string;
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

export interface Point {
  /** @format double */
  latitude?: number;

  /** @format double */
  longitude?: number;
}

export interface ProblemDetails {
  type?: string | null;
  title?: string | null;

  /** @format int32 */
  status?: number | null;
  detail?: string | null;
  instance?: string | null;
}

export interface RefreshResponse {
  token: string | null;
  refreshToken: string | null;
  permissions: string[] | null;
  maintenanceMessage: string | null;
}

export interface RefreshResponseSuccessApiResponse {
  successResponse: RefreshResponse | null;
}

export interface RefreshTokenRequest {
  token: string;
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
  endDate?: string | null;

  /** @format int32 */
  documentId?: number | null;
}

export interface ResourceDisconnectingFilterResponse {
  disconnectingTypes: EResourceDisconnectingTypeNullableStringDictionaryItem[] | null;
  resourceTypes: EResourceTypeNullableStringDictionaryItem[] | null;
  cities: string[] | null;
}

export interface ResourceDisconnectingFilterResponseSuccessApiResponse {
  successResponse: ResourceDisconnectingFilterResponse | null;
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
  housingStocks: HousingStockShortResponse[] | null;
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

export interface ResourceDisconnectingResponsePagedListSuccessApiResponse {
  successResponse: ResourceDisconnectingResponsePagedList | null;
}

export interface ResourceDisconnectingResponseSuccessApiResponse {
  successResponse: ResourceDisconnectingResponse | null;
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
}

export enum ResourceType {
  None = "None",
  Heat = "Heat",
  HotWaterSupply = "HotWaterSupply",
  ColdWaterSupply = "ColdWaterSupply",
  Electricity = "Electricity",
}

export interface SamoletArchiveResponse {
  /** @format date-time */
  timestamp: string;

  /** @format double */
  t1: number;

  /** @format double */
  t2: number;

  /** @format double */
  td: number;

  /** @format double */
  v1: number;

  /** @format double */
  v2: number;

  /** @format double */
  vd: number;

  /** @format double */
  p1: number;

  /** @format double */
  p2: number;

  /** @format double */
  q: number;

  /** @format double */
  workingTime: number;
  hasFaults: boolean;
}

export interface SamoletCalculatorResponse {
  serialNumber: string | null;
  model: string | null;
  address: string | null;
  resourceType: string | null;
  archives: SamoletArchiveResponse[] | null;
}

export interface SamoletCalculatorResponseIEnumerableSuccessApiResponse {
  successResponse: SamoletCalculatorResponse[] | null;
}

export interface SamoletGetAllConnectedResponse {
  /** @format int32 */
  id: number;
  serialNumber: string | null;
  model: string | null;
  address: string | null;
  resources: string[] | null;
}

export interface SamoletGetAllConnectedResponseListSuccessApiResponse {
  successResponse: SamoletGetAllConnectedResponse[] | null;
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

export interface StageListResponseWrappedListResponseSuccessApiResponse {
  successResponse: StageListResponseWrappedListResponse | null;
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
  fixedReading?: IndividualDeviceReadingsCreateRequest | null;
  consumableMaterials?: string | null;

  /** @format date-time */
  apartmentCheckDate?: string | null;
  taskConfirmation?: TaskConfirmationRequest | null;
}

export interface StageResponse {
  /** @format int32 */
  id: number;
  potentialNextStageIds: number[] | null;

  /** @format int32 */
  number: number;
  name: string | null;
  perpetrator: OrganizationUserShortResponse | null;
  status: EStageStatus;
  actions: EStageActionType[] | null;
  additionalActions: EStageActionType[] | null;
  allowedDocumentTypes: string[] | null;

  /** @format date-time */
  closingTime: string | null;

  /** @format date-time */
  startingTime: string | null;

  /** @format date-time */
  expectedCompletionTime: string | null;
  timeStatus: EStageTimeStatus;

  /** @format double */
  timeProgress: number;
}

export interface StageRevertRequest {
  comment?: string | null;
}

export enum StatusType {
  All = "All",
  Closed = "Closed",
  NotClosed = "NotClosed",
}

export interface StreetWithHousingStockNumbersResponse {
  street: string | null;
  addresses: AddressShortResponse[] | null;
}

export interface StreetWithHousingStockNumbersResponsePagedList {
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
  items: StreetWithHousingStockNumbersResponse[] | null;
}

export interface StreetWithHousingStockNumbersResponsePagedListSuccessApiResponse {
  successResponse: StreetWithHousingStockNumbersResponsePagedList | null;
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

export interface StringSuccessApiResponse {
  successResponse: string | null;
}

export interface SubscriberStatisticsСonsumptionResponse {
  apartmentNumber: string | null;

  /** @format double */
  coldWaterSupplyConsumption: number | null;

  /** @format double */
  hotWaterSupplyConsumption: number | null;

  /** @format double */
  electricitySupplyConsumption: number | null;

  /** @format date-time */
  dateLastTransmissionOfReading: string;

  /** @format date-time */
  dateLastCheck: string | null;

  /** @format int32 */
  housingStockId: number;

  /** @format int32 */
  apartmentId: number;
  homeownerAccountFullName: string | null;
  homeownerAccountPhoneNumber: string | null;
}

export interface SubscriberStatisticsСonsumptionResponseListSuccessApiResponse {
  successResponse: SubscriberStatisticsСonsumptionResponse[] | null;
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
  model: string;
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
  /** @format int32 */
  deviceId: number;
  model: string;
  serialNumber: string;

  /** @format int32 */
  bitDepth: number;

  /** @format double */
  scaleFactor: number;
  rateType?: EIndividualDeviceRateType;
  sealNumber?: string | null;

  /** @format date-time */
  sealInstallationDate?: string | null;

  /** @format date-time */
  lastCheckingDate: string;

  /** @format date-time */
  futureCheckingDate: string;

  /** @format date-time */
  openingDate?: string | null;

  /** @format int32 */
  contractorId?: number | null;
  oldDeviceClosingReason?: EClosingReason;

  /** @format int32 */
  newDeviceMountPlaceId?: number | null;
  oldDeviceReadings?: SwitchIndividualDeviceReadingsCreateRequest[] | null;
  newDeviceReadings: SwitchIndividualDeviceReadingsCreateRequest[];
  connection?: MeteringDeviceConnection | null;
  isConnected?: boolean;
  documentsIds?: number[] | null;
  isPolling?: boolean;
}

export interface SwitchMagneticSealRequest {
  /** @format date-time */
  magneticSealInstallationDate?: string | null;
  magneticSealTypeName?: string | null;
}

export interface TaskApplicationAddressResponse {
  /** @format int32 */
  apartmentId: number | null;
  apartmentNumber: string | null;

  /** @format int32 */
  housingStockId: number;
  housingStockNumber: string | null;
  corpus: string | null;
  street: string | null;
  city: string | null;
}

export interface TaskApplicationCompetenceResponse {
  /** @format uuid */
  id: string;
  title: string | null;
}

export interface TaskApplicationForTaskCompetenceResponse {
  /** @format uuid */
  id: string;
  title: string | null;
  nomenclatures: WorkNomenclatureResponse[] | null;
}

export interface TaskApplicationForTaskResponse {
  /** @format int32 */
  id: number;
  number: string | null;

  /** @format date-time */
  applicationDate: string;
  source: TaskApplicationSourceResponse | null;
  type: ETaskApplicationType;
  competence: TaskApplicationForTaskCompetenceResponse | null;
  nomenclatures: WorkNomenclatureResponse[] | null;
  comment: string | null;
}

export interface TaskApplicationListResponse {
  applications: TaskApplicationResponse[] | null;
}

export interface TaskApplicationListResponseSuccessApiResponse {
  successResponse: TaskApplicationListResponse | null;
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
  competence: TaskApplicationCompetenceResponse | null;
  nomenclatures: WorkNomenclatureResponse[] | null;
  address: TaskApplicationAddressResponse | null;
  comment: string | null;
  executor: OrganizationUserShortResponse | null;
}

export interface TaskApplicationResponseSuccessApiResponse {
  successResponse: TaskApplicationResponse | null;
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

export interface TaskApplicationSourceResponse {
  /** @format uuid */
  id: string;
  name: string | null;
}

export interface TaskApplicationSourceResponseSuccessApiResponse {
  successResponse: TaskApplicationSourceResponse | null;
}

export interface TaskApplicationTypeListResponse {
  types: TaskApplicationTypeResponse[] | null;
}

export interface TaskApplicationTypeListResponseSuccessApiResponse {
  successResponse: TaskApplicationTypeListResponse | null;
}

export interface TaskApplicationTypeResponse {
  title: string | null;
  type: ETaskApplicationType;
}

export interface TaskAssignToMultipleRequest {
  taskIds: number[];

  /** @format int32 */
  nextPerpetratorId: number;
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
  canBeEdited: boolean;
}

export interface TaskCommentResponseSuccessApiResponse {
  successResponse: TaskCommentResponse | null;
}

export interface TaskConfirmationRequest {
  type: string;
  comment?: string | null;
}

export interface TaskConfirmationResponse {
  type: ETaskConfirmationType;
  description: string | null;
  comment: string | null;
}

export interface TaskCreateRequest {
  /** @format int32 */
  key?: number;
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

export interface TaskCreateResponseSuccessApiResponse {
  successResponse: TaskCreateResponse | null;
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

export interface TaskFilterResponseSuccessApiResponse {
  successResponse: TaskFilterResponse | null;
}

export enum TaskGroupingFilter {
  Executing = "Executing",
  Observing = "Observing",
  NotArchived = "NotArchived",
  Archived = "Archived",
  Returnable = "Returnable",
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
  perpetrator: OrganizationUserShortResponse | null;
  isResponsible: boolean;
  hasChanged: boolean;
  needsValidation: boolean;
  devices: MeteringDeviceSearchListResponse[] | null;
  pipeNode: PipeNodeResponse | null;
  applications: TaskApplicationForTaskResponse[] | null;
  mainHomeowner: HomeownerAccountListResponse | null;

  /** @format int32 */
  totalHomeownersCount: number;
}

export interface TaskResponse {
  /** @format int32 */
  id: number;
  name: string | null;
  type: EManagingFirmTaskType;
  creationReason: string | null;
  address: string | null;

  /** @format int32 */
  housingStockId: number;
  isPerpetrator: boolean;
  perpetrator: OrganizationUserShortResponse | null;

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
  individualDevices: IndividualDeviceOnTaskResponse[] | null;
  documents: DocumentResponse[] | null;
  comments: TaskCommentResponse[] | null;
  stages: StageListResponse[] | null;
  applications: TaskApplicationForTaskResponse[] | null;
  consumableMaterials: string | null;
  taskConfirmation: TaskConfirmationResponse | null;
  allowableConfirmationTypes: ETaskConfirmationTypeStringDictionaryItem[] | null;
}

export interface TaskResponseSuccessApiResponse {
  successResponse: TaskResponse | null;
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

export interface TokenResponse {
  token: string | null;
  refreshToken: string | null;
  roles: string[] | null;
  permissions: string[] | null;
  maintenanceMessage: string | null;
}

export interface TokenResponseSuccessApiResponse {
  successResponse: TokenResponse | null;
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
  isConnected?: boolean;

  /** @format int32 */
  infoId?: number | null;
  connection?: MeteringDeviceConnection | null;

  /** @format date-time */
  lastCheckingDate?: string | null;

  /** @format date-time */
  futureCheckingDate?: string | null;
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
  housingMeteringDeviceType?: EHousingMeteringDeviceType | null;
  resource?: EResourceType | null;
  model?: string | null;

  /** @format date-time */
  lastCheckingDate?: string | null;

  /** @format date-time */
  futureCheckingDate?: string | null;

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
  /** @format int32 */
  number?: number | null;

  /** @format int32 */
  nodeServiceZoneId?: number | null;
  locationName?: string | null;
}

export interface UpdateHeatingStationRequest {
  name?: string | null;
  isThermalChamber?: boolean;
  address?: CreateAddressRequest | null;
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
  model?: string | null;

  /** @format int32 */
  mountPlaceId?: number | null;
  resource?: EResourceType | null;
  isPolling?: boolean | null;

  /** @format int32 */
  contractorId?: number | null;
  connection?: MeteringDeviceConnection | null;
  isConnected?: boolean;
}

export interface UpdateInspectorOnHousingStockRequest {
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
  housingMeteringDeviceType?: EHousingMeteringDeviceType | null;
  resource?: EResourceType | null;
  model?: string | null;

  /** @format date-time */
  lastCheckingDate?: string | null;

  /** @format date-time */
  futureCheckingDate?: string | null;
  pipe?: CreatePipeConnectionRequest | null;
}

export interface UpdatePipeNodeRequest {
  /** @format int32 */
  number?: number | null;

  /** @format int32 */
  nodeServiceZoneId?: number | null;

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
  /** @format uuid */
  id: string | null;
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

export interface ValueNodeWorkingRangeResponseSuccessApiResponse {
  successResponse: ValueNodeWorkingRangeResponse | null;
}

export interface WorkNomenclatureResponse {
  /** @format uuid */
  id: string;
  title: string | null;
}

export enum YearRangeType {
  FirstHalf = "FirstHalf",
  SecondHalf = "SecondHalf",
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
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li>
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
        ApartmentId?: number;
        ApartmentNumber?: string;
        ActTypes?: EActType[];
        ActResourceTypes?: EActResourceType[];
        ActDateOrderBy?: EOrderByRule;
        ActJobDateOrderBy?: EOrderByRule;
        RegistryNumberOrderBy?: EOrderByRule;
        AddressOrderBy?: EOrderByRule;
        PageNumber?: number;
        PageSize?: number;
        OrderBy?: EOrderByRule;
        Skip?: number;
        Take?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ApartmentActResponsePagedListSuccessApiResponse, ErrorApiResponse>({
        path: `/api/ApartmentActs`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Наблюдатель УК</li>
     *
     * @tags ApartmentActs
     * @name ApartmentActsCreate
     * @summary ApartmentActCreate
     * @request POST:/api/ApartmentActs
     * @secure
     */
    apartmentActsCreate: (data: AddApartmentActRequest, params: RequestParams = {}) =>
      this.request<ApartmentActResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/ApartmentActs`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Наблюдатель УК</li>
     *
     * @tags ApartmentActs
     * @name ApartmentActsUpdate
     * @summary ApartmentActEdit
     * @request PUT:/api/ApartmentActs/{actId}
     * @secure
     */
    apartmentActsUpdate: (actId: number, data: UpdateApartmentActRequest, params: RequestParams = {}) =>
      this.request<ApartmentActResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/ApartmentActs/${actId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Наблюдатель УК</li>
     *
     * @tags ApartmentActs
     * @name ApartmentActsDelete
     * @summary ApartmentActRemove
     * @request DELETE:/api/ApartmentActs/{actId}
     * @secure
     */
    apartmentActsDelete: (actId: number, params: RequestParams = {}) =>
      this.request<ApartmentActResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/ApartmentActs/${actId}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Наблюдатель УК</li>
     *
     * @tags ApartmentActs
     * @name ApartmentActsDeleteDocumentCreate
     * @summary ApartmentActEdit
     * @request POST:/api/ApartmentActs/{actId}/DeleteDocument
     * @secure
     */
    apartmentActsDeleteDocumentCreate: (actId: number, params: RequestParams = {}) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/ApartmentActs/${actId}/DeleteDocument`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li>
     *
     * @tags ApartmentActs
     * @name ApartmentActsActTypesList
     * @summary ApartmentActRead
     * @request GET:/api/ApartmentActs/ActTypes
     * @secure
     */
    apartmentActsActTypesList: (params: RequestParams = {}) =>
      this.request<EActTypeStringDictionaryItemListSuccessApiResponse, ErrorApiResponse>({
        path: `/api/ApartmentActs/ActTypes`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li>
     *
     * @tags ApartmentActs
     * @name ApartmentActsActResourceTypesList
     * @summary ApartmentActRead
     * @request GET:/api/ApartmentActs/ActResourceTypes
     * @secure
     */
    apartmentActsActResourceTypesList: (params: RequestParams = {}) =>
      this.request<EActResourceTypeStringDictionaryItemListSuccessApiResponse, ErrorApiResponse>({
        path: `/api/ApartmentActs/ActResourceTypes`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li>
     *
     * @tags Apartments
     * @name ApartmentsCreate
     * @summary ApartmentCreate
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
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Сервис ЕРЦ</li><li>Контролёр</li>
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
        HousingStockId?: number;
        Question?: string;
        IndividualDeviceSerialNumber?: string;
        PageNumber?: number;
        PageSize?: number;
        OrderBy?: EOrderByRule;
        Skip?: number;
        Take?: number;
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
     * @description Роли:<li>Администратор</li><li>Старший оператор</li><li>Оператор</li>
     *
     * @tags Apartments
     * @name ApartmentsUpdate
     * @summary ApartmentUpdate
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
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Сервис ЕРЦ</li><li>Контролёр</li>
     *
     * @tags Apartments
     * @name ApartmentsDetail
     * @summary ApartmentsRead
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
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Сервис ЕРЦ</li><li>Контролёр</li>
     *
     * @tags Apartments
     * @name ApartmentsApartmentStatusList
     * @summary ApartmentsRead
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
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Контролёр</li>
     *
     * @tags Apartments
     * @name ApartmentsHomeownerAccountsDetail
     * @summary HomeownersRead
     * @request GET:/api/Apartments/{apartmentId}/HomeownerAccounts
     * @secure
     */
    apartmentsHomeownerAccountsDetail: (
      apartmentId: number,
      query?: { IsClosed?: boolean },
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
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Сервис ЕРЦ</li><li>Контролёр</li>
     *
     * @tags Apartments
     * @name ApartmentsApartmentChecksDetail
     * @summary ApartmentsRead
     * @request GET:/api/Apartments/{apartmentId}/ApartmentChecks
     * @secure
     */
    apartmentsApartmentChecksDetail: (
      apartmentId: number,
      query?: { PageNumber?: number; PageSize?: number; OrderBy?: EOrderByRule; Skip?: number; Take?: number },
      params: RequestParams = {},
    ) =>
      this.request<ApartmentCheckResponsePagedListSuccessApiResponse, ErrorApiResponse>({
        path: `/api/Apartments/${apartmentId}/ApartmentChecks`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Сервис ЕРЦ</li><li>Контролёр</li>
     *
     * @tags Apartments
     * @name ApartmentsActsDetail
     * @summary ApartmentsRead
     * @request GET:/api/Apartments/{apartmentId}/Acts
     * @secure
     */
    apartmentsActsDetail: (apartmentId: number, params: RequestParams = {}) =>
      this.request<ApartmentCheckResponseListSuccessApiResponse, any>({
        path: `/api/Apartments/${apartmentId}/Acts`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Старший оператор</li><li>Оператор</li>
     *
     * @tags Apartments
     * @name ApartmentsSetStatusProblemDevicesDetail
     * @summary ApartmentsStatusPatch
     * @request GET:/api/Apartments/{apartmentId}/SetStatusProblemDevices
     * @secure
     */
    apartmentsSetStatusProblemDevicesDetail: (
      apartmentId: number,
      query: { Status: EApartmentStatus; FromDate?: string; ToDate?: string; DocumentIds?: number[] },
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
     * @description Роли:<li>Администратор</li><li>Старший оператор</li><li>Оператор</li>
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
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Контролёр</li>
     *
     * @tags Apartments
     * @name ApartmentsAddCheckCreate
     * @summary ApartmentCheckCreate
     * @request POST:/api/Apartments/{apartmentId}/AddCheck
     * @secure
     */
    apartmentsAddCheckCreate: (apartmentId: number, data: CreateApartmentCheckRequest, params: RequestParams = {}) =>
      this.request<ApartmentCheckResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/Apartments/${apartmentId}/AddCheck`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Контролёр</li>
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
      this.request<ApartmentCheckResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/Apartments/${apartmentId}/EditCheck/${apartmentCheckId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Контролёр</li>
     *
     * @tags Apartments
     * @name ApartmentsRemoveCheckDelete
     * @summary ApartmentCheckRemove
     * @request DELETE:/api/Apartments/{apartmentId}/RemoveCheck/{apartmentCheckId}
     * @secure
     */
    apartmentsRemoveCheckDelete: (apartmentId: number, apartmentCheckId: number, params: RequestParams = {}) =>
      this.request<ApartmentCheckResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/Apartments/${apartmentId}/RemoveCheck/${apartmentCheckId}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Контролёр</li>
     *
     * @tags Apartments
     * @name ApartmentsDocumentsDetail
     * @summary DocumentsRead
     * @request GET:/api/Apartments/{apartmentId}/Documents
     * @secure
     */
    apartmentsDocumentsDetail: (apartmentId: number, params: RequestParams = {}) =>
      this.request<DocumentResponseIEnumerableSuccessApiResponse, ErrorApiResponse>({
        path: `/api/Apartments/${apartmentId}/Documents`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Старший оператор</li><li>Оператор</li><li>Сервис ЕРЦ</li><li>Фоновый рабочий</li>
     *
     * @tags Apartments
     * @name ApartmentsDuplicateReadingsCreate
     * @summary IndividualDeviceReadingsCreate
     * @request POST:/api/Apartments/DuplicateReadings
     * @secure
     */
    apartmentsDuplicateReadingsCreate: (params: RequestParams = {}) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/Apartments/DuplicateReadings`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Сервис ЕРЦ</li><li>Контролёр</li>
     *
     * @tags Apartments
     * @name ApartmentsFindApartmentIdList
     * @summary ApartmentsRead
     * @request GET:/api/Apartments/FindApartmentId
     * @secure
     */
    apartmentsFindApartmentIdList: (
      query: { City: string; Street: string; HousingNumber: string; HousingCorpus?: string; ApartmentNumber: string },
      params: RequestParams = {},
    ) =>
      this.request<Int32SuccessApiResponse, ErrorApiResponse>({
        path: `/api/Apartments/FindApartmentId`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Сервис ЕРЦ</li><li>Контролёр</li>
     *
     * @tags Apartments
     * @name ApartmentsCheckTypesList
     * @summary ApartmentsRead
     * @request GET:/api/Apartments/CheckTypes
     * @secure
     */
    apartmentsCheckTypesList: (params: RequestParams = {}) =>
      this.request<ECheckTypeStringDictionaryItemListSuccessApiResponse, ErrorApiResponse>({
        path: `/api/Apartments/CheckTypes`,
        method: "GET",
        secure: true,
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
    authResetPasswordCreate: (data: string, params: RequestParams = {}) =>
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
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Наблюдатель УК</li><li>Диспетчер УК</li>
     *
     * @tags CalculatorInfos
     * @name CalculatorInfosList
     * @summary CalculatorInfoRead
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
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Сервис ЕРЦ</li><li>Контролёр</li>
     *
     * @tags Calculators
     * @name CalculatorsExportLiteList
     * @summary MeteringDevicesRead
     * @request GET:/api/Calculators/ExportLite
     * @secure
     */
    calculatorsExportLiteList: (params: RequestParams = {}) =>
      this.request<FileContentResultSuccessApiResponse, ErrorApiResponse>({
        path: `/api/Calculators/ExportLite`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Сервис ЕРЦ</li><li>Контролёр</li>
     *
     * @tags Calculators
     * @name CalculatorsExportList
     * @summary MeteringDevicesRead
     * @request GET:/api/Calculators/Export
     * @secure
     */
    calculatorsExportList: (
      query?: {
        "Filter.DiameterRange.From"?: number;
        "Filter.DiameterRange.To"?: number;
        "Filter.PipeDiameters"?: number[];
        "Filter.ExpiresCheckingDateAt"?: EExpiresCheckingDateAt;
        "Filter.Resource"?: EResourceType;
        "Filter.Model"?: string;
        "Filter.CommercialDateRange.From"?: string;
        "Filter.CommercialDateRange.To"?: string;
        "Filter.Address.City"?: string;
        "Filter.Address.Street"?: string;
        "Filter.Address.HousingStockNumber"?: string;
        "Filter.Address.Corpus"?: string;
        "Filter.Address.HouseCategory"?: EHouseCategory;
        "Filter.HousingStockId"?: number;
        "Filter.NodeStatus"?: ENodeCommercialAccountStatus;
        Question?: string;
        OrderRule?: ECalculatorOrderRule;
        IsConnected?: boolean;
        CountTasks?: boolean;
        IsClosed?: boolean;
        FileName?: string;
        PageNumber?: number;
        PageSize?: number;
        OrderBy?: EOrderByRule;
        Skip?: number;
        Take?: number;
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
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Сервис ЕРЦ</li><li>Контролёр</li>
     *
     * @tags Calculators
     * @name CalculatorsList
     * @summary MeteringDevicesRead
     * @request GET:/api/Calculators
     * @secure
     */
    calculatorsList: (
      query?: {
        "Filter.DiameterRange.From"?: number;
        "Filter.DiameterRange.To"?: number;
        "Filter.PipeDiameters"?: number[];
        "Filter.ExpiresCheckingDateAt"?: EExpiresCheckingDateAt;
        "Filter.Resource"?: EResourceType;
        "Filter.Model"?: string;
        "Filter.CommercialDateRange.From"?: string;
        "Filter.CommercialDateRange.To"?: string;
        "Filter.Address.City"?: string;
        "Filter.Address.Street"?: string;
        "Filter.Address.HousingStockNumber"?: string;
        "Filter.Address.Corpus"?: string;
        "Filter.Address.HouseCategory"?: EHouseCategory;
        "Filter.HousingStockId"?: number;
        "Filter.NodeStatus"?: ENodeCommercialAccountStatus;
        Question?: string;
        OrderRule?: ECalculatorOrderRule;
        IsConnected?: boolean;
        CountTasks?: boolean;
        IsClosed?: boolean;
        FileName?: string;
        PageNumber?: number;
        PageSize?: number;
        OrderBy?: EOrderByRule;
        Skip?: number;
        Take?: number;
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
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li>
     *
     * @tags Calculators
     * @name CalculatorsCreate
     * @summary CalculatorCreate
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
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Сервис ЕРЦ</li><li>Контролёр</li>
     *
     * @tags Calculators
     * @name CalculatorsDetail
     * @summary MeteringDevicesRead
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
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li>
     *
     * @tags Calculators
     * @name CalculatorsUpdate
     * @summary CalculatorUpdate
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
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li>
     *
     * @tags Calculators
     * @name CalculatorsSwitchCreate
     * @summary CalculatorSwitch
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
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Сервис ЕРЦ</li><li>Контролёр</li>
     *
     * @tags Calculators
     * @name CalculatorsFiltersList
     * @summary MeteringDevicesRead
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
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Контролёр</li>
     *
     * @tags Contractors
     * @name ContractorsList
     * @summary ContractorsRead
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
     * @description Роли:<li>Администратор</li>
     *
     * @tags Contractors
     * @name ContractorsCreate
     * @summary ContractorsCreate
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
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Контролёр</li>
     *
     * @tags Contractors
     * @name ContractorsDetail
     * @summary ContractorsRead
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
     * @description Роли:<li>Администратор</li>
     *
     * @tags Contractors
     * @name ContractorsUpdate
     * @summary ContractorsUpdate
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
     * @description Роли:<li>Администратор</li>
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
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Старший оператор</li><li>Оператор</li>
     *
     * @tags CurrentTransformers
     * @name CurrentTransformersDetail
     * @summary CurrentTransformerRead
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
     * @description Роли:<li>Администратор</li>
     *
     * @tags CurrentTransformers
     * @name CurrentTransformersUpdate
     * @summary CurrentTransformerUpdate
     * @request PUT:/api/CurrentTransformers/{currentTransformerId}
     * @secure
     */
    currentTransformersUpdate: (
      currentTransformerId: string,
      query?: {
        InstallationDate?: string;
        ManufactureYear?: number;
        StateVerificationYear?: number;
        StateVerificationQuarter?: EYearQuarter;
        StateVerificationIntervalYears?: number;
        NextStateVerificationYear?: number;
        TypeName?: string;
        Phase?: EPhaseType;
        Number?: string;
        PrimaryCurrentRatingAmperes?: number;
        SecondaryCurrentRatingAmperes?: number;
        Coefficient?: number;
        SealNumber?: string;
        SealInstallationDate?: string;
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
     * @description Роли:<li>Администратор</li>
     *
     * @tags CurrentTransformers
     * @name CurrentTransformersCreate
     * @summary CurrentTransformerCreate
     * @request POST:/api/CurrentTransformers
     * @secure
     */
    currentTransformersCreate: (data: CreateCurrentTransformerRequest, params: RequestParams = {}) =>
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
     * @description Роли:<li>Администратор</li>
     *
     * @tags CurrentTransformers
     * @name CurrentTransformersCloseCreate
     * @summary CurrentTransformerUpdate
     * @request POST:/api/CurrentTransformers/{currentTransformerId}/close
     * @secure
     */
    currentTransformersCloseCreate: (
      currentTransformerId: string,
      data: CloseCurrentTransformerRequest,
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
     * @description Роли:<li>Администратор</li>
     *
     * @tags CurrentTransformers
     * @name CurrentTransformersCheckCreate
     * @summary CurrentTransformerUpdate
     * @request POST:/api/CurrentTransformers/{currentTransformerId}/check
     * @secure
     */
    currentTransformersCheckCreate: (
      currentTransformerId: string,
      data: CheckCurrentTransformerRequest,
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
     * @description Роли:<li>Администратор системы</li>
     *
     * @tags DataMigrations
     * @name DataMigrationsDisableIndividualDevicesMaintenanceCreate
     * @summary DataMigration
     * @request POST:/api/DataMigrations/DisableIndividualDevicesMaintenance
     * @secure
     */
    dataMigrationsDisableIndividualDevicesMaintenanceCreate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/DataMigrations/DisableIndividualDevicesMaintenance`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор системы</li>
     *
     * @tags DataMigrations
     * @name DataMigrationsChangeHousingStockManagingFirmCreate
     * @summary DataMigration
     * @request POST:/api/DataMigrations/ChangeHousingStockManagingFirm
     * @secure
     */
    dataMigrationsChangeHousingStockManagingFirmCreate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/DataMigrations/ChangeHousingStockManagingFirm`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags DataMigrations
     * @name DataMigrationsChangeF4AssignmentCreate
     * @request POST:/api/DataMigrations/ChangeF4Assignment
     * @secure
     */
    dataMigrationsChangeF4AssignmentCreate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/DataMigrations/ChangeF4Assignment`,
        method: "POST",
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
     * @description Роли:<li>Администратор системы</li>
     *
     * @tags DataMigrations
     * @name DataMigrationsHousingStockAddFiasIdCreate
     * @summary DataMigration
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
     * @description Роли:<li>Администратор системы</li>
     *
     * @tags DataMigrations
     * @name DataMigrationsAddFirmUsersCreate
     * @summary DataMigration
     * @request POST:/api/DataMigrations/AddFirmUsers
     * @secure
     */
    dataMigrationsAddFirmUsersCreate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/DataMigrations/AddFirmUsers`,
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
     * @description Роли:<li>Администратор системы</li>
     *
     * @tags DataMigrations
     * @name DataMigrationsCheckReadingsHistoryCreate
     * @summary DataMigration
     * @request POST:/api/DataMigrations/CheckReadingsHistory
     * @secure
     */
    dataMigrationsCheckReadingsHistoryCreate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/DataMigrations/CheckReadingsHistory`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор системы</li>
     *
     * @tags DataMigrations
     * @name DataMigrationsImportHousingStockInfoCreate
     * @summary DataMigration
     * @request POST:/api/DataMigrations/ImportHousingStockInfo
     * @secure
     */
    dataMigrationsImportHousingStockInfoCreate: (
      data: {
        ContentType?: string;
        ContentDisposition?: string;
        Headers?: Record<string, string[]>;
        Length?: number;
        Name?: string;
        FileName?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/DataMigrations/ImportHousingStockInfo`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор системы</li>
     *
     * @tags DataMigrations
     * @name DataMigrationsImportNumberOfLivingCreate
     * @summary DataMigration
     * @request POST:/api/DataMigrations/ImportNumberOfLiving
     * @secure
     */
    dataMigrationsImportNumberOfLivingCreate: (
      data: {
        ContentType?: string;
        ContentDisposition?: string;
        Headers?: Record<string, string[]>;
        Length?: number;
        Name?: string;
        FileName?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/DataMigrations/ImportNumberOfLiving`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор системы</li>
     *
     * @tags DataMigrations
     * @name DataMigrationsF4TasksRecoveringList
     * @summary DataMigration
     * @request GET:/api/DataMigrations/F4TasksRecovering
     * @secure
     */
    dataMigrationsF4TasksRecoveringList: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/DataMigrations/F4TasksRecovering`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags DataMigrations
     * @name DataMigrationsUpdateFiltersConfigurationsCreate
     * @request POST:/api/DataMigrations/UpdateFiltersConfigurations
     * @secure
     */
    dataMigrationsUpdateFiltersConfigurationsCreate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/DataMigrations/UpdateFiltersConfigurations`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор системы</li>
     *
     * @tags DataMigrations
     * @name DataMigrationsImportTemperatureNormativesCreate
     * @summary DataMigration
     * @request POST:/api/DataMigrations/ImportTemperatureNormatives
     * @secure
     */
    dataMigrationsImportTemperatureNormativesCreate: (
      data: {
        ContentType?: string;
        ContentDisposition?: string;
        Headers?: Record<string, string[]>;
        Length?: number;
        Name?: string;
        FileName?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/DataMigrations/ImportTemperatureNormatives`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Контролёр</li>
     *
     * @tags Documents
     * @name DocumentsUploadCreate
     * @summary DocumentsCreate
     * @request POST:/api/Documents/upload
     * @secure
     */
    documentsUploadCreate: (data: { file?: File[]; type?: EDocumentType }, params: RequestParams = {}) =>
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
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Контролёр</li>
     *
     * @tags Documents
     * @name DocumentsDetail
     * @summary DocumentsRead
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
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Контролёр</li>
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
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Сервис ЕРЦ</li><li>Контролёр</li>
     *
     * @tags ElectricHousingMeteringDevices
     * @name ElectricHousingMeteringDevicesDetail
     * @summary MeteringDevicesRead
     * @request GET:/api/ElectricHousingMeteringDevices/{deviceId}
     * @secure
     */
    electricHousingMeteringDevicesDetail: (deviceId: number, params: RequestParams = {}) =>
      this.request<ElectricHousingMeteringDeviceResponseSuccessApiResponse, any>({
        path: `/api/ElectricHousingMeteringDevices/${deviceId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li>
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
      this.request<ElectricHousingMeteringDeviceResponseSuccessApiResponse, any>({
        path: `/api/ElectricHousingMeteringDevices/${deviceId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li>
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
      this.request<ElectricHousingMeteringDeviceResponseSuccessApiResponse, any>({
        path: `/api/ElectricHousingMeteringDevices`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li>
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
      this.request<ElectricHousingMeteringDeviceResponseSuccessApiResponse, any>({
        path: `/api/ElectricHousingMeteringDevices/switch`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Диспетчер УК</li>
     *
     * @tags ElectricNodes
     * @name ElectricNodesDetail
     * @summary NodeRead
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
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li>
     *
     * @tags ElectricNodes
     * @name ElectricNodesCreate
     * @summary NodeCreate
     * @request POST:/api/ElectricNodes
     * @secure
     */
    electricNodesCreate: (data: CreateElectricNodeRequest, params: RequestParams = {}) =>
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
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li>
     *
     * @tags ElectricNodes
     * @name ElectricNodesUpdate
     * @summary NodeUpdate
     * @request PUT:/api/ElectricNodes/{electricNodeId}
     * @secure
     */
    electricNodesUpdate: (electricNodeId: number, data: UpdateElectricNodeRequest, params: RequestParams = {}) =>
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
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li>
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
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li>
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
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Фоновый рабочий</li><li>Контролёр</li>
     *
     * @tags Exports
     * @name ExportsMilurDevicesList
     * @summary IndividualDeviceReadingsRead
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
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Фоновый рабочий</li><li>Контролёр</li>
     *
     * @tags Exports
     * @name ExportsIndividualDeviceReadingsList
     * @summary IndividualDeviceReadingsRead
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
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Фоновый рабочий</li><li>Контролёр</li>
     *
     * @tags Exports
     * @name ExportsHousingDeviceReadingsList
     * @summary IndividualDeviceReadingsRead
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
     * @description Роли:<li>Администратор</li>
     *
     * @tags HeatingSeasons
     * @name HeatingSeasonsList
     * @summary HeatingSeasonsRead
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
     * @description Роли:<li>Администратор</li>
     *
     * @tags HeatingSeasons
     * @name HeatingSeasonsUpdate
     * @summary HeatingSeasonsUpdate
     * @request PUT:/api/HeatingSeasons
     * @secure
     */
    heatingSeasonsUpdate: (
      query?: {
        StartDate?: string;
        EndDate?: string;
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
     * @description Роли:<li>Администратор</li>
     *
     * @tags HeatingSeasons
     * @name HeatingSeasonsSwitchCreate
     * @summary HeatingSeasonsCreate
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
     * @description Роли:<li>Администратор</li>
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
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li>
     *
     * @tags HeatingStation
     * @name HeatingStationList
     * @summary HeatingStationRead
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
     * @description Роли:<li>Администратор</li>
     *
     * @tags HeatingStation
     * @name HeatingStationCreate
     * @summary HeatingStationCreate
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
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li>
     *
     * @tags HeatingStation
     * @name HeatingStationDetail
     * @summary HeatingStationRead
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
     * @description Роли:<li>Администратор</li>
     *
     * @tags HeatingStation
     * @name HeatingStationUpdate
     * @summary HeatingStationUpdate
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
     * @description Роли:<li>Администратор</li>
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
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Контролёр</li>
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
        PageNumber?: number;
        PageSize?: number;
        OrderBy?: OrderByRule;
        Skip?: number;
        Take?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<HomeownerAccountResponsePagedListSuccessApiResponse, ErrorApiResponse>({
        path: `/api/HomeownerAccounts`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Старший оператор</li><li>Оператор</li>
     *
     * @tags HomeownerAccounts
     * @name HomeownerAccountsCreate
     * @summary HomeownersCreate
     * @request POST:/api/HomeownerAccounts
     * @secure
     */
    homeownerAccountsCreate: (data: HomeownerAccountCreateServiceModel, params: RequestParams = {}) =>
      this.request<HomeownerAccountResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/HomeownerAccounts`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Контролёр</li>
     *
     * @tags HomeownerAccounts
     * @name HomeownerAccountsDetail
     * @summary HomeownersRead
     * @request GET:/api/HomeownerAccounts/{homeownerAccId}
     * @secure
     */
    homeownerAccountsDetail: (homeownerAccId: string, params: RequestParams = {}) =>
      this.request<HomeownerAccountResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/HomeownerAccounts/${homeownerAccId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Старший оператор</li><li>Оператор</li>
     *
     * @tags HomeownerAccounts
     * @name HomeownerAccountsUpdate
     * @summary HomeownersCreate
     * @request PUT:/api/HomeownerAccounts/{id}
     * @secure
     */
    homeownerAccountsUpdate: (id: string, data: HomeownerAccountUpdateRequest, params: RequestParams = {}) =>
      this.request<HomeownerAccountResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/HomeownerAccounts/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Старший оператор</li><li>Оператор</li>
     *
     * @tags HomeownerAccounts
     * @name HomeownerAccountsCloseCreate
     * @summary HomeownersCreate
     * @request POST:/api/HomeownerAccounts/Close
     * @secure
     */
    homeownerAccountsCloseCreate: (data: HomeownerAccountCloseRequest, params: RequestParams = {}) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/HomeownerAccounts/Close`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Старший оператор</li><li>Оператор</li>
     *
     * @tags HomeownerAccounts
     * @name HomeownerAccountsReplaceCreate
     * @summary HomeownersCreate
     * @request POST:/api/HomeownerAccounts/Replace
     * @secure
     */
    homeownerAccountsReplaceCreate: (data: HomeownerAccountReplaceRequest, params: RequestParams = {}) =>
      this.request<HomeownerAccountResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/HomeownerAccounts/Replace`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Контролёр</li>
     *
     * @tags HomeownerAccounts
     * @name HomeownerAccountsCertificateDetail
     * @summary HomeownersRead
     * @request GET:/api/HomeownerAccounts/{id}/Certificate
     * @secure
     */
    homeownerAccountsCertificateDetail: (id: string, params: RequestParams = {}) =>
      this.request<HomeownerCertificateResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/HomeownerAccounts/${id}/Certificate`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Старший оператор</li><li>Оператор</li>
     *
     * @tags HomeownerAccounts
     * @name HomeownerAccountsSplitCreate
     * @summary HomeownersCreate
     * @request POST:/api/HomeownerAccounts/Split
     * @secure
     */
    homeownerAccountsSplitCreate: (data: HomeownerAccountSplitRequest, params: RequestParams = {}) =>
      this.request<DataAfterSplittingHomeownerAccountResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/HomeownerAccounts/Split`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Старший оператор</li><li>Оператор</li>
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
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Контролёр</li>
     *
     * @tags HouseManagements
     * @name HouseManagementsList
     * @summary HousingStocksRead
     * @request GET:/api/HouseManagements
     * @secure
     */
    houseManagementsList: (query?: { City?: string }, params: RequestParams = {}) =>
      this.request<HouseManagementResponseListSuccessApiResponse, ErrorApiResponse>({
        path: `/api/HouseManagements`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Старший оператор</li><li>Оператор</li>
     *
     * @tags HousingMeteringDeviceReadings
     * @name HousingMeteringDeviceReadingsList
     * @summary HousingMeteringDeviceReadingsRead
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
     * @description Роли:<li>Администратор</li><li>Старший оператор</li><li>Оператор</li>
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
      this.request<HousingMeteringDeviceReadingsIncludingPlacementResponseSuccessApiResponse, any>({
        path: `/api/HousingMeteringDeviceReadings`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Старший оператор</li><li>Оператор</li>
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
      this.request<HousingMeteringDeviceReadingsIncludingPlacementResponseSuccessApiResponse, any>({
        path: `/api/HousingMeteringDeviceReadings`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Старший оператор</li><li>Оператор</li>
     *
     * @tags HousingMeteringDeviceReadings
     * @name HousingMeteringDeviceReadingsRemoveCreate
     * @summary HousingMeteringDeviceReadingsUpdate
     * @request POST:/api/HousingMeteringDeviceReadings/{readingId}/remove
     * @secure
     */
    housingMeteringDeviceReadingsRemoveCreate: (readingId: string, params: RequestParams = {}) =>
      this.request<HousingMeteringDeviceReadingsResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/HousingMeteringDeviceReadings/${readingId}/remove`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Старший оператор</li><li>Оператор</li>
     *
     * @tags HousingMeteringDeviceReadings
     * @name HousingMeteringDeviceReadingsSyncReadingsFromArchivesCreate
     * @summary HousingMeteringDeviceReadingsCreate
     * @request POST:/api/HousingMeteringDeviceReadings/SyncReadingsFromArchives
     * @secure
     */
    housingMeteringDeviceReadingsSyncReadingsFromArchivesCreate: (
      query?: { from?: string; to?: string },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/HousingMeteringDeviceReadings/SyncReadingsFromArchives`,
        method: "POST",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Сервис ЕРЦ</li><li>Контролёр</li>
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
        PageNumber?: number;
        PageSize?: number;
        OrderBy?: EOrderByRule;
        Skip?: number;
        Take?: number;
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
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li>
     *
     * @tags HousingMeteringDevices
     * @name HousingMeteringDevicesSwitchCreate
     * @summary HousingMeteringDeviceSwitch
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
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Сервис ЕРЦ</li><li>Контролёр</li>
     *
     * @tags HousingMeteringDevices
     * @name HousingMeteringDevicesCommentDetail
     * @summary MeteringDevicesRead
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
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li>
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
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li>
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
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li>
     *
     * @tags HousingMeteringDevices
     * @name HousingMeteringDevicesCommentDelete
     * @summary HousingMeteringDeviceUpdate
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
     * @description Роли:<li>Администратор</li><li>Старший оператор</li><li>Оператор</li>
     *
     * @tags HousingMeteringDevices
     * @name HousingMeteringDevicesReadingsHistoryDetail
     * @summary HousingMeteringDeviceReadingsRead
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
     * @description Роли:<li>Старший оператор</li><li>Оператор</li>
     *
     * @tags HousingMeteringDevices
     * @name HousingMeteringDevicesCloseDevicesByCheckingDateCreate
     * @summary IndividualDeviceClose
     * @request POST:/api/HousingMeteringDevices/closeDevicesByCheckingDate
     * @secure
     */
    housingMeteringDevicesCloseDevicesByCheckingDateCreate: (params: RequestParams = {}) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/HousingMeteringDevices/closeDevicesByCheckingDate`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li>
     *
     * @tags HousingStocks
     * @name HousingStocksCreate
     * @summary HousingStocksCreate
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
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Контролёр</li>
     *
     * @tags HousingStocks
     * @name HousingStocksList
     * @summary HousingStocksRead
     * @request GET:/api/HousingStocks
     * @secure
     */
    housingStocksList: (
      query?: {
        OrderRule?: EHousingStockOrderRule;
        City?: string;
        Street?: string;
        HousingStockNumber?: string;
        Corpus?: string;
        HouseCategory?: EHouseCategory;
        HouseManagementId?: string;
        HeatingStationId?: string;
        "TotalArea.MaxValue"?: number;
        "TotalArea.MinValue"?: number;
        "TotalArea.MeasurableUnit"?: string;
        LivingHouseType?: ELivingHouseType;
        NonResidentialHouseType?: ENonResidentialHouseType;
        PageNumber?: number;
        PageSize?: number;
        OrderBy?: EOrderByRule;
        Skip?: number;
        Take?: number;
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
     * @description Роли:<li>Администратор</li><li>Старший оператор</li><li>Оператор</li>
     *
     * @tags HousingStocks
     * @name HousingStocksUpdate
     * @summary HousingStocksUpdate
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
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Контролёр</li>
     *
     * @tags HousingStocks
     * @name HousingStocksDetail
     * @summary HousingStocksRead
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
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Контролёр</li>
     *
     * @tags HousingStocks
     * @name HousingStocksControllerDetail
     * @summary HousingStocksRead
     * @request GET:/api/HousingStocks/{housingStockId}/Controller
     * @secure
     */
    housingStocksControllerDetail: (housingStockId: number, params: RequestParams = {}) =>
      this.request<OrganizationUserShortResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/HousingStocks/${housingStockId}/Controller`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Контролёр</li>
     *
     * @tags HousingStocks
     * @name HousingStocksNodesDetail
     * @summary HousingStocksRead
     * @request GET:/api/HousingStocks/{housingStockId}/Nodes
     * @secure
     */
    housingStocksNodesDetail: (housingStockId: number, params: RequestParams = {}) =>
      this.request<NodeOnHousingStockResponseListSuccessApiResponse, ErrorApiResponse>({
        path: `/api/HousingStocks/${housingStockId}/Nodes`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Старший оператор</li>
     *
     * @tags HousingStocks
     * @name HousingStocksReassignControllerCreate
     * @summary ControllerUpdate
     * @request POST:/api/HousingStocks/{housingStockId}/ReassignController/{controllerId}
     * @secure
     */
    housingStocksReassignControllerCreate: (housingStockId: number, controllerId: number, params: RequestParams = {}) =>
      this.request<OrganizationUserShortResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/HousingStocks/${housingStockId}/ReassignController/${controllerId}`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Сервис ЕРЦ</li><li>Контролёр</li>
     *
     * @tags HousingStocks
     * @name HousingStocksCalculatorsDetail
     * @summary MeteringDevicesRead
     * @request GET:/api/HousingStocks/{housingStockId}/Calculators
     * @secure
     */
    housingStocksCalculatorsDetail: (housingStockId: number, params: RequestParams = {}) =>
      this.request<CalculatorIntoHousingStockResponseArraySuccessApiResponse, any>({
        path: `/api/HousingStocks/${housingStockId}/Calculators`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Контролёр</li>
     *
     * @tags HousingStocks
     * @name HousingStocksDevicesDetail
     * @summary HousingStocksRead
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
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Сервис ЕРЦ</li><li>Контролёр</li>
     *
     * @tags HousingStocks
     * @name HousingStocksDevicesDetail2
     * @summary MeteringDevicesRead
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
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Сервис ЕРЦ</li><li>Контролёр</li>
     *
     * @tags HousingStocks
     * @name HousingStocksDevicesRelatedDetail
     * @summary MeteringDevicesRead
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
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Сервис ЕРЦ</li><li>Контролёр</li>
     *
     * @tags HousingStocks
     * @name HousingStocksDevicesCommunicationPipesDetail
     * @summary MeteringDevicesRead
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
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Контролёр</li>
     *
     * @tags HousingStocks
     * @name HousingStocksFiltersList
     * @summary HousingStocksRead
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
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Контролёр</li>
     *
     * @tags HousingStocks
     * @name HousingStocksGetFiasIdList
     * @summary HousingStocksRead
     * @request GET:/api/HousingStocks/GetFiasId
     * @secure
     */
    housingStocksGetFiasIdList: (
      query: { Region: string; Area: string; City: string; Street: string; HouseNumber: string; HouseCorpus?: string },
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
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Контролёр</li>
     *
     * @tags HousingStocks
     * @name HousingStocksExistingCitiesList
     * @summary HousingStocksRead
     * @request GET:/api/HousingStocks/ExistingCities
     * @secure
     */
    housingStocksExistingCitiesList: (
      query?: {
        City?: string;
        PageNumber?: number;
        PageSize?: number;
        OrderBy?: EOrderByRule;
        Skip?: number;
        Take?: number;
      },
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
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Контролёр</li>
     *
     * @tags HousingStocks
     * @name HousingStocksExistingStreetsList
     * @summary HousingStocksRead
     * @request GET:/api/HousingStocks/ExistingStreets
     * @secure
     */
    housingStocksExistingStreetsList: (
      query?: {
        Street?: string;
        City?: string;
        PageNumber?: number;
        PageSize?: number;
        OrderBy?: EOrderByRule;
        Skip?: number;
        Take?: number;
      },
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
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Контролёр</li>
     *
     * @tags HousingStocks
     * @name HousingStocksExistingHousingStockNumberList
     * @summary HousingStocksRead
     * @request GET:/api/HousingStocks/ExistingHousingStockNumber
     * @secure
     */
    housingStocksExistingHousingStockNumberList: (
      query: { city: string; street: string },
      params: RequestParams = {},
    ) =>
      this.request<NumberIdResponseArraySuccessApiResponse, ErrorApiResponse>({
        path: `/api/HousingStocks/ExistingHousingStockNumber`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Контролёр</li>
     *
     * @tags HousingStocks
     * @name HousingStocksExistingStreetsWithHousingStockNumbersList
     * @summary HousingStocksRead
     * @request GET:/api/HousingStocks/ExistingStreetsWithHousingStockNumbers
     * @secure
     */
    housingStocksExistingStreetsWithHousingStockNumbersList: (
      query?: {
        Street?: string;
        City?: string;
        PageNumber?: number;
        PageSize?: number;
        OrderBy?: EOrderByRule;
        Skip?: number;
        Take?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<StreetWithHousingStockNumbersResponsePagedListSuccessApiResponse, ErrorApiResponse>({
        path: `/api/HousingStocks/ExistingStreetsWithHousingStockNumbers`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Контролёр</li>
     *
     * @tags HousingStocks
     * @name HousingStocksExistingStreetsWithHousingStockNumbersWithHouseManagementList
     * @summary HousingStocksRead
     * @request GET:/api/HousingStocks/ExistingStreetsWithHousingStockNumbersWithHouseManagement
     * @secure
     */
    housingStocksExistingStreetsWithHousingStockNumbersWithHouseManagementList: (params: RequestParams = {}) =>
      this.request<HouseManagementWithStreetsResponseIEnumerableSuccessApiResponse, ErrorApiResponse>({
        path: `/api/HousingStocks/ExistingStreetsWithHousingStockNumbersWithHouseManagement`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Контролёр</li>
     *
     * @tags HousingStocks
     * @name HousingStocksExistingStreetsWithHousingStockNumbersWithHeatingStationList
     * @summary HousingStocksRead
     * @request GET:/api/HousingStocks/ExistingStreetsWithHousingStockNumbersWithHeatingStation
     * @secure
     */
    housingStocksExistingStreetsWithHousingStockNumbersWithHeatingStationList: (params: RequestParams = {}) =>
      this.request<HeatingStationWithStreetsResponseIEnumerableSuccessApiResponse, ErrorApiResponse>({
        path: `/api/HousingStocks/ExistingStreetsWithHousingStockNumbersWithHeatingStation`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Сервис ЕРЦ</li><li>Контролёр</li>
     *
     * @tags HousingStocks
     * @name HousingStocksExistingApartmentNumberDetail
     * @summary ApartmentsRead
     * @request GET:/api/HousingStocks/{housingStockId}/ExistingApartmentNumber
     * @secure
     */
    housingStocksExistingApartmentNumberDetail: (housingStockId: number, params: RequestParams = {}) =>
      this.request<NumberIdResponseArraySuccessApiResponse, ErrorApiResponse>({
        path: `/api/HousingStocks/${housingStockId}/ExistingApartmentNumber`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Контролёр</li>
     *
     * @tags HousingStocks
     * @name HousingStocksInspectorsList
     * @summary HousingStocksRead
     * @request GET:/api/HousingStocks/inspectors
     * @secure
     */
    housingStocksInspectorsList: (
      query?: {
        City?: string;
        Street?: string;
        HousingStockNumber?: string;
        HouseManagement?: string;
        InspectorId?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<InspectorOnHousingStockResponseListSuccessApiResponse, ErrorApiResponse>({
        path: `/api/HousingStocks/inspectors`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Старший оператор</li><li>Оператор</li>
     *
     * @tags HousingStocks
     * @name HousingStocksInspectorPartialUpdate
     * @summary HousingStocksUpdate
     * @request PATCH:/api/HousingStocks/{housingStockId}/inspector
     * @secure
     */
    housingStocksInspectorPartialUpdate: (
      housingStockId: number,
      data: UpdateInspectorOnHousingStockRequest,
      params: RequestParams = {},
    ) =>
      this.request<HousingStockResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/HousingStocks/${housingStockId}/inspector`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Старший оператор</li><li>Оператор</li>
     *
     * @tags HousingStocks
     * @name HousingStocksInspectorDelete
     * @summary HousingStocksUpdate
     * @request DELETE:/api/HousingStocks/{housingStockId}/inspector
     * @secure
     */
    housingStocksInspectorDelete: (housingStockId: number, params: RequestParams = {}) =>
      this.request<HousingStockResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/HousingStocks/${housingStockId}/inspector`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Контролёр</li>
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
      this.request<Int32NullableSuccessApiResponse, ErrorApiResponse>({
        path: `/api/HousingStocks/${housingStockId}/doesApartmentExist/${apartmentNumber}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Фоновый рабочий</li><li>Контролёр</li>
     *
     * @tags ImportLogs
     * @name ImportLogsList
     * @summary IndividualDeviceReadingsRead
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
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Фоновый рабочий</li><li>Контролёр</li>
     *
     * @tags ImportLogs
     * @name ImportLogsDetail
     * @summary IndividualDeviceReadingsRead
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
     * @description Роли:<li>Старший оператор</li><li>Оператор</li><li>Сервис ЕРЦ</li><li>Фоновый рабочий</li>
     *
     * @tags Imports
     * @name ImportsReadingsFromErcMultipleCreate
     * @summary IndividualDeviceReadingsCreate
     * @request POST:/api/Imports/ReadingsFromErcMultiple
     * @secure
     */
    importsReadingsFromErcMultipleCreate: (
      data: {
        files: File[];
        isCreateAndCloseDevice?: boolean;
        isIgnoreErrors?: boolean;
        isSphere?: boolean;
        isSave?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<ImportLogResponseArraySuccessApiResponse, ErrorApiResponse>({
        path: `/api/Imports/ReadingsFromErcMultiple`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Старший оператор</li><li>Оператор</li><li>Сервис ЕРЦ</li><li>Фоновый рабочий</li>
     *
     * @tags Imports
     * @name ImportsReadingsFromErcCreate
     * @summary IndividualDeviceReadingsCreate
     * @request POST:/api/Imports/ReadingsFromErc
     * @secure
     */
    importsReadingsFromErcCreate: (
      data: {
        ContentType?: string;
        ContentDisposition?: string;
        Headers?: Record<string, string[]>;
        Length?: number;
        Name?: string;
        FileName?: string;
        isCreateAndCloseDevice?: boolean;
        isIgnoreErrors?: boolean;
        isSphere?: boolean;
        isSave?: boolean;
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
     * @description Роли:<li>Администратор</li><li>Старший оператор</li><li>Оператор</li>
     *
     * @tags Imports
     * @name ImportsPersonalAccountNumbersCreate
     * @summary HomeownersCreate
     * @request POST:/api/Imports/PersonalAccountNumbers
     * @secure
     */
    importsPersonalAccountNumbersCreate: (
      data: {
        ContentType?: string;
        ContentDisposition?: string;
        Headers?: Record<string, string[]>;
        Length?: number;
        Name?: string;
        FileName?: string;
      },
      query?: { save?: boolean; createApartment?: boolean; dateOfImport?: string },
      params: RequestParams = {},
    ) =>
      this.request<ImportResultServiceModelSuccessApiResponse, ErrorApiResponse>({
        path: `/api/Imports/PersonalAccountNumbers`,
        method: "POST",
        query: query,
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор системы</li>
     *
     * @tags Imports
     * @name ImportsImportOrganizationCreate
     * @summary DataMigration
     * @request POST:/api/Imports/ImportOrganization
     * @secure
     */
    importsImportOrganizationCreate: (
      data: {
        ContentType?: string;
        ContentDisposition?: string;
        Headers?: Record<string, string[]>;
        Length?: number;
        Name?: string;
        FileName?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/Imports/ImportOrganization`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор системы</li>
     *
     * @tags Imports
     * @name ImportsImportOrganizationWithoutNodesCreate
     * @summary DataMigration
     * @request POST:/api/Imports/ImportOrganizationWithoutNodes
     * @secure
     */
    importsImportOrganizationWithoutNodesCreate: (
      data: {
        ContentType?: string;
        ContentDisposition?: string;
        Headers?: Record<string, string[]>;
        Length?: number;
        Name?: string;
        FileName?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/Imports/ImportOrganizationWithoutNodes`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Старший оператор</li><li>Оператор</li>
     *
     * @tags Imports
     * @name ImportsImportHouseManagementsCreate
     * @summary HouseManagementUpdate
     * @request POST:/api/Imports/ImportHouseManagements
     * @secure
     */
    importsImportHouseManagementsCreate: (
      data: {
        ContentType?: string;
        ContentDisposition?: string;
        Headers?: Record<string, string[]>;
        Length?: number;
        Name?: string;
        FileName?: string;
      },
      query?: { managementFirmId?: number },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/Imports/ImportHouseManagements`,
        method: "POST",
        query: query,
        body: data,
        secure: true,
        type: ContentType.FormData,
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Сервис ЕРЦ</li><li>Контролёр</li>
     *
     * @tags Individual
     * @name DevicesIndividualHouseList
     * @summary MeteringDevicesRead
     * @request GET:/api/Devices/Individual/House
     * @secure
     */
    devicesIndividualHouseList: (
      query: { City: string; Street: string; Number: string; Corpus?: string },
      params: RequestParams = {},
    ) =>
      this.request<HousingByFilterResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/Devices/Individual/House`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Сервис ЕРЦ</li><li>Контролёр</li>
     *
     * @tags Individual
     * @name DevicesIndividualApartmentsList
     * @summary MeteringDevicesRead
     * @request GET:/api/Devices/Individual/Apartments
     * @secure
     */
    devicesIndividualApartmentsList: (
      query: {
        HousingStockId: number;
        ApartmentNumber?: string;
        "DeviceFilter.Resource"?: EResourceType;
        "DeviceFilter.Model"?: string;
        "DeviceFilter.ClosingReason"?: EClosingReason;
        "DeviceFilter.MountPlace"?: string;
        "DeviceFilter.ApartmentStatus"?: EApartmentStatus;
        "DeviceFilter.ExpiresCheckingDateAt"?: EExpiresCheckingDateAt;
        "DeviceFilter.IsAlsoClosing"?: boolean;
        PageNumber?: number;
        PageSize?: number;
        OrderBy?: EOrderByRule;
        Skip?: number;
        Take?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ApartmentByAddressFilterResponsePagedListSuccessApiResponse, ErrorApiResponse>({
        path: `/api/Devices/Individual/Apartments`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Сервис ЕРЦ</li><li>Контролёр</li>
     *
     * @tags Individual
     * @name DevicesIndividualDetail
     * @summary MeteringDevicesRead
     * @request GET:/api/Devices/Individual/{deviceId}
     * @secure
     */
    devicesIndividualDetail: (deviceId: number, params: RequestParams = {}) =>
      this.request<IndividualDeviceResponseFromDevicePageSuccessApiResponse, ProblemDetails | ErrorApiResponse>({
        path: `/api/Devices/Individual/${deviceId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Сервис ЕРЦ</li><li>Контролёр</li>
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
        ExpiresCheckingDateAt?: EExpiresCheckingDateAt;
        IsAlsoClosing?: boolean;
        PageNumber?: number;
        PageSize?: number;
        OrderBy?: EOrderByRule;
        Skip?: number;
        Take?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<IndividualDeviceListResponseFromDevicePagePagedListSuccessApiResponse, ErrorApiResponse>({
        path: `/api/Devices/Individual`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Контролёр</li>
     *
     * @tags IndividualDeviceMountPlaces
     * @name IndividualDeviceMountPlacesList
     * @summary IndividualDeviceMountPlaceRead
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
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Контролёр</li>
     *
     * @tags IndividualDeviceMountPlaces
     * @name IndividualDeviceMountPlacesAllList
     * @summary IndividualDeviceMountPlaceRead
     * @request GET:/api/IndividualDeviceMountPlaces/All
     * @secure
     */
    individualDeviceMountPlacesAllList: (params: RequestParams = {}) =>
      this.request<IndividualDeviceMountPlaceForFilterResponseListSuccessApiResponse, ErrorApiResponse>({
        path: `/api/IndividualDeviceMountPlaces/All`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Старший оператор</li><li>Оператор</li><li>Сервис ЕРЦ</li><li>Фоновый рабочий</li>
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
      this.request<IndividualDeviceReadingsResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/IndividualDeviceReadings/createLite`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Старший оператор</li><li>Оператор</li><li>Сервис ЕРЦ</li><li>Фоновый рабочий</li>
     *
     * @tags IndividualDeviceReadings
     * @name IndividualDeviceReadingsCreateCreate
     * @summary IndividualDeviceReadingsCreate
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
     * @description Роли:<li>Старший оператор</li><li>Оператор</li><li>Фоновый рабочий</li>
     *
     * @tags IndividualDeviceReadings
     * @name IndividualDeviceReadingsRemoveCreate
     * @summary IndividualDeviceReadingsUpdate
     * @request POST:/api/IndividualDeviceReadings/{readingId}/remove
     * @secure
     */
    individualDeviceReadingsRemoveCreate: (readingId: number, params: RequestParams = {}) =>
      this.request<IndividualDeviceReadingsResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/IndividualDeviceReadings/${readingId}/remove`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Фоновый рабочий</li><li>Контролёр</li>
     *
     * @tags IndividualDeviceReadings
     * @name IndividualDeviceReadingsDataForSubscriberAndNormativeConsumptionPlotList
     * @summary IndividualDeviceReadingsRead
     * @request GET:/api/IndividualDeviceReadings/DataForSubscriberAndNormativeConsumptionPlot
     * @secure
     */
    individualDeviceReadingsDataForSubscriberAndNormativeConsumptionPlotList: (
      query: { HousingStockId: number; ResourceType: EResourceType; From: string; To: string },
      params: RequestParams = {},
    ) =>
      this.request<GetDataForIndividualDevicesConsumptionPlotResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/IndividualDeviceReadings/DataForSubscriberAndNormativeConsumptionPlot`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Сервис ЕРЦ</li><li>Контролёр</li>
     *
     * @tags IndividualDevices
     * @name IndividualDevicesDetail
     * @summary MeteringDevicesRead
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
     * @description Роли:<li>Администратор</li><li>Старший оператор</li><li>Оператор</li>
     *
     * @tags IndividualDevices
     * @name IndividualDevicesUpdate
     * @summary IndividualDeviceUpdate
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
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Сервис ЕРЦ</li><li>Контролёр</li>
     *
     * @tags IndividualDevices
     * @name IndividualDevicesList
     * @summary MeteringDevicesRead
     * @request GET:/api/IndividualDevices
     * @secure
     */
    individualDevicesList: (
      query?: {
        ApartmentId?: number;
        HousingStockId?: number;
        Resource?: EResourceType;
        LastReadingsMonth?: string;
        TakeReadings?: number;
        ApartmentIds?: number[];
        IsOpened?: boolean;
        SerialNumber?: string;
        OrderRule?: EIndividualDeviceOrderRule;
        PageNumber?: number;
        PageSize?: number;
        OrderBy?: EOrderByRule;
        Skip?: number;
        Take?: number;
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
     * @description Роли:<li>Администратор</li><li>Старший оператор</li><li>Оператор</li><li>Сервис ЕРЦ</li>
     *
     * @tags IndividualDevices
     * @name IndividualDevicesCreate
     * @summary IndividualDeviceCreate
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
     * @description Роли:<li>Старший оператор</li><li>Оператор</li>
     *
     * @tags IndividualDevices
     * @name IndividualDevicesCloseCreate
     * @summary IndividualDeviceClose
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
     * @description Роли:<li>Старший оператор</li><li>Оператор</li>
     *
     * @tags IndividualDevices
     * @name IndividualDevicesReopenCreate
     * @summary IndividualDeviceReopen
     * @request POST:/api/IndividualDevices/{deviceId}/reopen
     * @secure
     */
    individualDevicesReopenCreate: (deviceId: number, params: RequestParams = {}) =>
      this.request<IndividualDeviceResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/IndividualDevices/${deviceId}/reopen`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Старший оператор</li><li>Оператор</li>
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
     * @description Роли:<li>Администратор</li><li>Старший оператор</li><li>Оператор</li>
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
     * @description Роли:<li>Администратор</li><li>Старший оператор</li><li>Оператор</li><li>Сервис ЕРЦ</li>
     *
     * @tags IndividualDevices
     * @name IndividualDevicesSwitchCreate
     * @summary IndividualDeviceCreate
     * @request POST:/api/IndividualDevices/switch
     * @secure
     */
    individualDevicesSwitchCreate: (data: SwitchIndividualDeviceRequest, params: RequestParams = {}) =>
      this.request<IndividualDeviceResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/IndividualDevices/switch`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Старший оператор</li><li>Оператор</li>
     *
     * @tags IndividualDevices
     * @name IndividualDevicesCheckCreate
     * @summary IndividualDeviceUpdate
     * @request POST:/api/IndividualDevices/{deviceId}/check
     * @secure
     */
    individualDevicesCheckCreate: (deviceId: number, data: CheckIndividualDeviceRequest, params: RequestParams = {}) =>
      this.request<IndividualDeviceResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/IndividualDevices/${deviceId}/check`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Фоновый рабочий</li><li>Контролёр</li>
     *
     * @tags IndividualDevices
     * @name IndividualDevicesReadingsHistoryDetail
     * @summary IndividualDeviceReadingsRead
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
        method: "POST",
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
      query?: { fromDate?: string },
      params: RequestParams = {},
    ) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/IndividualDevices/createTaskForDeviceWithoutReadings`,
        method: "POST",
        query: query,
        secure: true,
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
    individualDevicesCloseDevicesWithoutReadingsCreate: (params: RequestParams = {}) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/IndividualDevices/closeDevicesWithoutReadings`,
        method: "POST",
        secure: true,
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
    individualDevicesCloseDevicesByCheckingDateCreate: (params: RequestParams = {}) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/IndividualDevices/closeDevicesByCheckingDate`,
        method: "POST",
        secure: true,
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
    individualDevicesDeleteCreate: (deviceId: number, params: RequestParams = {}) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/IndividualDevices/${deviceId}/Delete`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Оператор</li>
     *
     * @tags Inspectors
     * @name InspectorsList
     * @summary InspectorRead
     * @request GET:/api/Inspectors
     * @secure
     */
    inspectorsList: (params: RequestParams = {}) =>
      this.request<InspectorResponseListSuccessApiResponse, ErrorApiResponse>({
        path: `/api/Inspectors`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Оператор</li>
     *
     * @tags Inspectors
     * @name InspectorsCreate
     * @summary InspectorCreate
     * @request POST:/api/Inspectors
     * @secure
     */
    inspectorsCreate: (data: InspectorCreateRequest, params: RequestParams = {}) =>
      this.request<InspectorResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/Inspectors`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Оператор</li>
     *
     * @tags Inspectors
     * @name InspectorsDetail
     * @summary InspectorRead
     * @request GET:/api/Inspectors/{inspectorId}
     * @secure
     */
    inspectorsDetail: (inspectorId: number, params: RequestParams = {}) =>
      this.request<InspectorResponsePagedListSuccessApiResponse, ErrorApiResponse>({
        path: `/api/Inspectors/${inspectorId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Оператор</li>
     *
     * @tags Inspectors
     * @name InspectorsPartialUpdate
     * @summary InspectorUpdate
     * @request PATCH:/api/Inspectors/{inspectorId}
     * @secure
     */
    inspectorsPartialUpdate: (inspectorId: number, data: InspectorUpdateRequest, params: RequestParams = {}) =>
      this.request<InspectorResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/Inspectors/${inspectorId}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Оператор</li>
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
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Оператор</li>
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
      this.request<InspectorResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/Inspectors/${inspectorId}/housingStocks`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Оператор</li>
     *
     * @tags Inspectors
     * @name InspectorsHousingStocksDelete
     * @summary InspectorUpdate
     * @request DELETE:/api/Inspectors/{inspectorId}/housingStocks
     * @secure
     */
    inspectorsHousingStocksDelete: (inspectorId: number, params: RequestParams = {}) =>
      this.request<InspectorResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/Inspectors/${inspectorId}/housingStocks`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Контролёр</li>
     *
     * @tags ManagingFirms
     * @name ManagingFirmsConsumptionRatesDetail
     * @summary OrganizationsRead
     * @request GET:/api/ManagingFirms/{managingFirmId}/ConsumptionRates
     * @secure
     */
    managingFirmsConsumptionRatesDetail: (managingFirmId: number, params: RequestParams = {}) =>
      this.request<EResourceTypeConsumptionRateResponseDictionaryItemListSuccessApiResponse, ErrorApiResponse>({
        path: `/api/ManagingFirms/${managingFirmId}/ConsumptionRates`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Сервис ЕРЦ</li><li>Контролёр</li>
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
        SealInstallationDate?: string;
        DeviceTypes?: string[];
        ApartmentId?: number;
        HousingStockId?: number;
        PageNumber?: number;
        PageSize?: number;
        OrderBy?: EOrderByRule;
        Skip?: number;
        Take?: number;
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
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Сервис ЕРЦ</li><li>Контролёр</li>
     *
     * @tags MeteringDevices
     * @name MeteringDevicesSearchList
     * @summary MeteringDevicesRead
     * @request GET:/api/MeteringDevices/search
     * @secure
     */
    meteringDevicesSearchList: (
      query?: { DeviceType?: string; Status?: string; Question?: string; Take?: number },
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
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Сервис ЕРЦ</li><li>Контролёр</li>
     *
     * @tags MeteringDevices
     * @name MeteringDevicesDetail
     * @summary MeteringDevicesRead
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
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Сервис ЕРЦ</li><li>Контролёр</li>
     *
     * @tags MeteringDevices
     * @name MeteringDevicesRelatedList
     * @summary MeteringDevicesRead
     * @request GET:/api/MeteringDevices/related
     * @secure
     */
    meteringDevicesRelatedList: (query: { DeviceId: number; PipeNumber?: number }, params: RequestParams = {}) =>
      this.request<MeteringDeviceListResponseIEnumerableSuccessApiResponse, ErrorApiResponse>({
        path: `/api/MeteringDevices/related`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Сервис ЕРЦ</li>
     *
     * @tags MeteringDevices
     * @name MeteringDevicesCloseCreate
     * @summary MeteringDevicesClose
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
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li>
     *
     * @tags MeteringDevices
     * @name MeteringDevicesCheckCreate
     * @summary MeteringDevicesCheck
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
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Сервис ЕРЦ</li><li>Контролёр</li>
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
        PageNumber?: number;
        PageSize?: number;
        OrderBy?: EOrderByRule;
        Skip?: number;
        Take?: number;
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
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Диспетчер УК</li>
     *
     * @tags Nodes
     * @name NodesList
     * @summary NodeRead
     * @request GET:/api/Nodes
     * @secure
     */
    nodesList: (
      query?: {
        CalculatorId?: number;
        IsConnected?: boolean;
        HousingStockId?: number;
        "Address.City"?: string;
        "Address.Street"?: string;
        "Address.HousingStockNumber"?: string;
        "Address.Corpus"?: string;
        "Address.HouseCategory"?: EHouseCategory;
        Resource?: EResourceType;
        NodeStatus?: ENodeCommercialAccountStatus;
        "DevicesFilter.ExpiresCheckingDateAt"?: EExpiresCheckingDateAt;
        "DevicesFilter.Model"?: string;
        "DevicesFilter.Question"?: string;
        "DevicesFilter.DiameterRange.From"?: number;
        "DevicesFilter.DiameterRange.To"?: number;
        "DevicesFilter.PipeDiameters"?: number[];
        "CommercialDateRange.From"?: string;
        "CommercialDateRange.To"?: string;
        PageNumber?: number;
        PageSize?: number;
        OrderBy?: EOrderByRule;
        Skip?: number;
        Take?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<NodesPagedListSuccessApiResponse, any>({
        path: `/api/Nodes`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li>
     *
     * @tags Nodes
     * @name NodesDocumentsCreate
     * @summary NodeUpdate
     * @request POST:/api/Nodes/{nodeId}/Documents
     * @secure
     */
    nodesDocumentsCreate: (nodeId: number, data: AddNodeDocumentsRequest, params: RequestParams = {}) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/Nodes/${nodeId}/Documents`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li>
     *
     * @tags Nodes
     * @name NodesChecksDetail
     * @summary NodeCheckRead
     * @request GET:/api/Nodes/{nodeId}/Checks
     * @secure
     */
    nodesChecksDetail: (
      nodeId: number,
      query?: { PageNumber?: number; PageSize?: number; OrderBy?: EOrderByRule; Skip?: number; Take?: number },
      params: RequestParams = {},
    ) =>
      this.request<NodeCheckResponsePagedListSuccessApiResponse, ErrorApiResponse>({
        path: `/api/Nodes/${nodeId}/Checks`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li>
     *
     * @tags Nodes
     * @name NodesChecksCreate
     * @summary NodeCheckCreate
     * @request POST:/api/Nodes/{nodeId}/Checks
     * @secure
     */
    nodesChecksCreate: (nodeId: number, data: CreateNodeCheckRequest, params: RequestParams = {}) =>
      this.request<NodeCheckResponse, ErrorApiResponse>({
        path: `/api/Nodes/${nodeId}/Checks`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li>
     *
     * @tags Nodes
     * @name NodesChecksUpdate
     * @summary NodeCheckUpdate
     * @request PUT:/api/Nodes/{nodeId}/Checks/{checkId}
     * @secure
     */
    nodesChecksUpdate: (nodeId: number, checkId: number, data: UpdateNodeCheckRequest, params: RequestParams = {}) =>
      this.request<NodeCheckResponse, ErrorApiResponse>({
        path: `/api/Nodes/${nodeId}/Checks/${checkId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li>
     *
     * @tags Nodes
     * @name NodesChecksDelete
     * @summary NodeCheckDelete
     * @request DELETE:/api/Nodes/{nodeId}/Checks/{checkId}
     * @secure
     */
    nodesChecksDelete: (nodeId: number, checkId: number, params: RequestParams = {}) =>
      this.request<NodeCheckResponse, ErrorApiResponse>({
        path: `/api/Nodes/${nodeId}/Checks/${checkId}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li>
     *
     * @tags Nodes
     * @name NodesStatisticsDetail
     * @summary ReportRead
     * @request GET:/api/Nodes/{nodeId}/Statistics
     * @secure
     */
    nodesStatisticsDetail: (
      nodeId: number,
      query?: { ReportType?: EReportType; From?: string; To?: string; ReportFormat?: EReportFormat },
      params: RequestParams = {},
    ) =>
      this.request<ArchivesDataModel, ErrorApiResponse>({
        path: `/api/Nodes/${nodeId}/Statistics`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Сервис ЕРЦ</li><li>Контролёр</li>
     *
     * @tags NodeServiceZones
     * @name NodeServiceZonesList
     * @summary MeteringDevicesRead
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
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li>
     *
     * @tags NodeServiceZones
     * @name NodeServiceZonesCreate
     * @summary CalculatorUpdate
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
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Сервис ЕРЦ</li><li>Контролёр</li>
     *
     * @tags NodeServiceZones
     * @name NodeServiceZonesDetail
     * @summary MeteringDevicesRead
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
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li>
     *
     * @tags NodeServiceZones
     * @name NodeServiceZonesUpdate
     * @summary CalculatorUpdate
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
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li>
     *
     * @tags NodeServiceZones
     * @name NodeServiceZonesDelete
     * @summary CalculatorUpdate
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
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Диспетчер УК</li>
     *
     * @tags NodeWorkingRange
     * @name NodeWorkingRangeList
     * @summary NodeWorkingRangeRead
     * @request GET:/api/NodeWorkingRange
     * @secure
     */
    nodeWorkingRangeList: (
      query: { nodeResourceType: EResourceType; season: ENodeWorkingRangeSeason },
      params: RequestParams = {},
    ) =>
      this.request<AllNodeWorkingRangeResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/NodeWorkingRange`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Диспетчер УК</li>
     *
     * @tags NodeWorkingRange
     * @name NodeWorkingRangeHouseManagementDetail
     * @summary NodeWorkingRangeRead
     * @request GET:/api/NodeWorkingRange/HouseManagement/{houseManagementId}
     * @secure
     */
    nodeWorkingRangeHouseManagementDetail: (
      houseManagementId: string,
      query: { nodeResourceType: EResourceType; season: ENodeWorkingRangeSeason },
      params: RequestParams = {},
    ) =>
      this.request<AllNodeWorkingRangeResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/NodeWorkingRange/HouseManagement/${houseManagementId}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Диспетчер УК</li>
     *
     * @tags NodeWorkingRange
     * @name NodeWorkingRangeHousingStockDetail
     * @summary NodeWorkingRangeRead
     * @request GET:/api/NodeWorkingRange/HousingStock/{housingStockId}
     * @secure
     */
    nodeWorkingRangeHousingStockDetail: (
      housingStockId: number,
      query: { nodeResourceType: EResourceType; season: ENodeWorkingRangeSeason },
      params: RequestParams = {},
    ) =>
      this.request<AllNodeWorkingRangeResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/NodeWorkingRange/HousingStock/${housingStockId}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Диспетчер УК</li>
     *
     * @tags NodeWorkingRange
     * @name NodeWorkingRangeNodeDetail
     * @summary NodeWorkingRangeRead
     * @request GET:/api/NodeWorkingRange/Node/{nodeId}
     * @secure
     */
    nodeWorkingRangeNodeDetail: (
      nodeId: number,
      query: { season: ENodeWorkingRangeSeason },
      params: RequestParams = {},
    ) =>
      this.request<AllNodeWorkingRangeResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/NodeWorkingRange/Node/${nodeId}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li>
     *
     * @tags NodeWorkingRange
     * @name NodeWorkingRangeAddOrUpdateCreate
     * @summary NodeWorkingRangeAddOrUpdate
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
     * @description Роли:<li>Администратор</li>
     *
     * @tags NodeWorkingRange
     * @name NodeWorkingRangeDisableDelete
     * @summary NodeWorkingRangeAddOrUpdate
     * @request DELETE:/api/NodeWorkingRange/Disable
     * @secure
     */
    nodeWorkingRangeDisableDelete: (data: DisableNodeWorkingRangeRequest, params: RequestParams = {}) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/NodeWorkingRange/Disable`,
        method: "DELETE",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Диспетчер УК</li>
     *
     * @tags NodeWorkingRange
     * @name NodeWorkingRangeTypesList
     * @summary NodeWorkingRangeRead
     * @request GET:/api/NodeWorkingRange/Types
     * @secure
     */
    nodeWorkingRangeTypesList: (params: RequestParams = {}) =>
      this.request<ENodeWorkingRangeTypeStringDictionaryItemListSuccessApiResponse, ErrorApiResponse>({
        path: `/api/NodeWorkingRange/Types`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Диспетчер УК</li>
     *
     * @tags OrganizationCompetences
     * @name OrganizationCompetencesList
     * @summary OrganizationCompetenceRead
     * @request GET:/api/OrganizationCompetences
     * @secure
     */
    organizationCompetencesList: (params: RequestParams = {}) =>
      this.request<ManagementFirmCompetencesListResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/OrganizationCompetences`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li>
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
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Роли:<li>Старший оператор</li><li>Оператор</li><li>Фоновый рабочий</li>
     *
     * @tags Organizations
     * @name OrganizationsList
     * @summary OrganizationsReadAll
     * @request GET:/api/Organizations
     * @secure
     */
    organizationsList: (
      query?: { PageNumber?: number; PageSize?: number; OrderBy?: EOrderByRule; Skip?: number; Take?: number },
      params: RequestParams = {},
    ) =>
      this.request<OrganizationResponsePagedListSuccessApiResponse, ErrorApiResponse>({
        path: `/api/Organizations`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Контролёр</li>
     *
     * @tags Organizations
     * @name OrganizationsCurrentList
     * @summary OrganizationsRead
     * @request GET:/api/Organizations/current
     * @secure
     */
    organizationsCurrentList: (params: RequestParams = {}) =>
      this.request<OrganizationResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/Organizations/current`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li>
     *
     * @tags Organizations
     * @name OrganizationsUpdate
     * @summary OrganizationsUpdate
     * @request PUT:/api/Organizations/{managingFirmId}
     * @secure
     */
    organizationsUpdate: (managingFirmId: number, data: OrganizationUpdateRequest, params: RequestParams = {}) =>
      this.request<OrganizationResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/Organizations/${managingFirmId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Контролёр</li>
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
        RoleNames?: string[];
        PageNumber?: number;
        PageSize?: number;
        OrderBy?: EOrderByRule;
        Skip?: number;
        Take?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<OrganizationUserListResponsePagedListSuccessApiResponse, ErrorApiResponse>({
        path: `/api/OrganizationUsers`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Старший оператор</li><li>Оператор</li>
     *
     * @tags OrganizationUsers
     * @name OrganizationUsersCreate
     * @summary OrganizationUsersCreate
     * @request POST:/api/OrganizationUsers
     * @secure
     */
    organizationUsersCreate: (data: OrganizationUserCreateRequest, params: RequestParams = {}) =>
      this.request<OrganizationUserResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/OrganizationUsers`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Контролёр</li>
     *
     * @tags OrganizationUsers
     * @name OrganizationUsersDetail
     * @summary OrganizationUsersRead
     * @request GET:/api/OrganizationUsers/{userId}
     * @secure
     */
    organizationUsersDetail: (userId: number, params: RequestParams = {}) =>
      this.request<OrganizationUserResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/OrganizationUsers/${userId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Старший оператор</li><li>Оператор</li>
     *
     * @tags OrganizationUsers
     * @name OrganizationUsersUpdate
     * @summary OrganizationUsersUpdate
     * @request PUT:/api/OrganizationUsers/{userId}
     * @secure
     */
    organizationUsersUpdate: (userId: number, data: OrganizationUserUpdateRequest, params: RequestParams = {}) =>
      this.request<OrganizationUserResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/OrganizationUsers/${userId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Контролёр</li>
     *
     * @tags OrganizationUsers
     * @name OrganizationUsersCurrentList
     * @summary OrganizationUsersRead
     * @request GET:/api/OrganizationUsers/current
     * @secure
     */
    organizationUsersCurrentList: (params: RequestParams = {}) =>
      this.request<OrganizationUserResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/OrganizationUsers/current`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Старший оператор</li><li>Оператор</li>
     *
     * @tags OrganizationUsers
     * @name OrganizationUsersSuspendCreate
     * @summary OrganizationUsersUpdate
     * @request POST:/api/OrganizationUsers/{userId}/suspend
     * @secure
     */
    organizationUsersSuspendCreate: (userId: number, params: RequestParams = {}) =>
      this.request<OrganizationUserResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/OrganizationUsers/${userId}/suspend`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Старший оператор</li><li>Оператор</li>
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
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li>
     *
     * @tags OrganizationUsers
     * @name OrganizationUsersRoleTypesList
     * @summary UserRolesRead
     * @request GET:/api/OrganizationUsers/RoleTypes
     * @secure
     */
    organizationUsersRoleTypesList: (params: RequestParams = {}) =>
      this.request<ESecuredIdentityRoleNameStringDictionaryItemListSuccessApiResponse, ErrorApiResponse>({
        path: `/api/OrganizationUsers/RoleTypes`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Контролёр</li>
     *
     * @tags OrganizationUsers
     * @name OrganizationUsersStatisticsDetail
     * @summary OrganizationUsersRead
     * @request GET:/api/OrganizationUsers/{userId}/statistics
     * @secure
     */
    organizationUsersStatisticsDetail: (
      userId: number,
      query?: { From?: string; To?: string },
      params: RequestParams = {},
    ) =>
      this.request<OrganizationUserStatisticsResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/OrganizationUsers/${userId}/statistics`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Диспетчер УК</li>
     *
     * @tags OrganizationUserWorkingStatuses
     * @name OrganizationUserWorkingStatusesList
     * @summary OrganizationUserWorkingStatusRead
     * @request GET:/api/OrganizationUserWorkingStatuses
     * @secure
     */
    organizationUserWorkingStatusesList: (params: RequestParams = {}) =>
      this.request<EOrganizationUserWorkingStatusTypeStringDictionaryItemListSuccessApiResponse, ErrorApiResponse>({
        path: `/api/OrganizationUserWorkingStatuses`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li>
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
      this.request<OrganizationUserWorkingStatusResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/OrganizationUserWorkingStatuses`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Сервис ЕРЦ</li><li>Контролёр</li>
     *
     * @tags PipeHousingMeteringDevices
     * @name PipeHousingMeteringDevicesDetail
     * @summary MeteringDevicesRead
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
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li>
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
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li>
     *
     * @tags PipeHousingMeteringDevices
     * @name PipeHousingMeteringDevicesCreate
     * @summary HousingMeteringDeviceCreate
     * @request POST:/api/PipeHousingMeteringDevices
     * @secure
     */
    pipeHousingMeteringDevicesCreate: (data: CreatePipeHousingMeteringDeviceRequest, params: RequestParams = {}) =>
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
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Диспетчер УК</li>
     *
     * @tags PipeNodes
     * @name PipeNodesDetail
     * @summary NodeRead
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
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li>
     *
     * @tags PipeNodes
     * @name PipeNodesUpdate
     * @summary NodeUpdate
     * @request PUT:/api/PipeNodes/{pipeNodeId}
     * @secure
     */
    pipeNodesUpdate: (pipeNodeId: number, data: UpdatePipeNodeRequest, params: RequestParams = {}) =>
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
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li>
     *
     * @tags PipeNodes
     * @name PipeNodesCreate
     * @summary NodeCreate
     * @request POST:/api/PipeNodes
     * @secure
     */
    pipeNodesCreate: (data: CreatePipeNodeRequest, params: RequestParams = {}) =>
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
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li>
     *
     * @tags PipeNodes
     * @name PipeNodesSetRegisteredStatusCreate
     * @summary NodeUpdate
     * @request POST:/api/PipeNodes/{pipeNodeId}/SetRegisteredStatus
     * @secure
     */
    pipeNodesSetRegisteredStatusCreate: (
      pipeNodeId: number,
      data: NodeSetRegisteredRequest,
      params: RequestParams = {},
    ) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/PipeNodes/${pipeNodeId}/SetRegisteredStatus`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li>
     *
     * @tags PipeNodes
     * @name PipeNodesSetNotRegisteredStatusCreate
     * @summary NodeUpdate
     * @request POST:/api/PipeNodes/{pipeNodeId}/SetNotRegisteredStatus
     * @secure
     */
    pipeNodesSetNotRegisteredStatusCreate: (
      pipeNodeId: number,
      data: NodeSetNotRegisteredRequest,
      params: RequestParams = {},
    ) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/PipeNodes/${pipeNodeId}/SetNotRegisteredStatus`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Диспетчер УК</li>
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
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Диспетчер УК</li>
     *
     * @tags PipeNodes
     * @name PipeNodesPipeMagistralTypesList
     * @summary NodeRead
     * @request GET:/api/PipeNodes/PipeMagistralTypes
     * @secure
     */
    pipeNodesPipeMagistralTypesList: (query?: { resource?: EResourceType }, params: RequestParams = {}) =>
      this.request<EMagistralTypeStringDictionaryItemListSuccessApiResponse, any>({
        path: `/api/PipeNodes/PipeMagistralTypes`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Диспетчер УК</li>
     *
     * @tags PipeNodes
     * @name PipeNodesSetPipeRuptureCreate
     * @summary NodeRead
     * @request POST:/api/PipeNodes/{pipeNodeId}/SetPipeRupture
     * @secure
     */
    pipeNodesSetPipeRuptureCreate: (
      pipeNodeId: number,
      data: PipeRuptureDateTimeRangeRequest,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/PipeNodes/${pipeNodeId}/SetPipeRupture`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Диспетчер УК</li>
     *
     * @tags PipeNodes
     * @name PipeNodesMeteringDevicesDetail
     * @summary NodeRead
     * @request GET:/api/PipeNodes/{pipeNodeId}/MeteringDevices
     * @secure
     */
    pipeNodesMeteringDevicesDetail: (pipeNodeId: number, params: RequestParams = {}) =>
      this.request<PipeNodeMeteringDeviceResponse[], any>({
        path: `/api/PipeNodes/${pipeNodeId}/MeteringDevices`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Старший оператор</li><li>Оператор</li>
     *
     * @tags PipeNodes
     * @name PipeNodesDataForHousingConsumptionPlotList
     * @summary HousingMeteringDeviceReadingsRead
     * @request GET:/api/PipeNodes/DataForHousingConsumptionPlot
     * @secure
     */
    pipeNodesDataForHousingConsumptionPlotList: (
      query: { HousingStockId: number; ResourceType: EResourceType; From: string; To: string },
      params: RequestParams = {},
    ) =>
      this.request<GetDataForHousingConsumptionPlotResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/PipeNodes/DataForHousingConsumptionPlot`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li>
     *
     * @tags Reports
     * @name ReportsList
     * @summary ReportRead
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
     * @description Роли:<li>Администратор</li>
     *
     * @tags Reports
     * @name ReportsCreate
     * @summary ReportAdd
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
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li>
     *
     * @tags Reports
     * @name ReportsArchivesList
     * @summary ReportRead
     * @request GET:/api/Reports/Archives
     * @secure
     */
    reportsArchivesList: (
      query?: { NodeId?: number; ReportType?: EReportType; From?: string; To?: string; ReportFormat?: EReportFormat },
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
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li>
     *
     * @tags Reports
     * @name ReportsReportDataList
     * @summary ReportRead
     * @request GET:/api/Reports/ReportData
     * @secure
     */
    reportsReportDataList: (
      query?: { NodeId?: number; ReportType?: EReportType; From?: string; To?: string; ReportFormat?: EReportFormat },
      params: RequestParams = {},
    ) =>
      this.request<ReportDataModel, ErrorApiResponse>({
        path: `/api/Reports/ReportData`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li>
     *
     * @tags Reports
     * @name ReportsReportList
     * @summary ReportRead
     * @request GET:/api/Reports/Report
     * @secure
     */
    reportsReportList: (
      query?: { NodeId?: number; ReportType?: EReportType; From?: string; To?: string; ReportFormat?: EReportFormat },
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
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li>
     *
     * @tags Reports
     * @name ReportsConsolidatedReportList
     * @summary ReportRead
     * @request GET:/api/Reports/ConsolidatedReport
     * @secure
     */
    reportsConsolidatedReportList: (
      query?: {
        CalculatorsId?: number[];
        ReportType?: EReportType;
        From?: string;
        To?: string;
        ReportFormat?: EReportFormat;
      },
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
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li>
     *
     * @tags Reports
     * @name ReportsGroupReportList
     * @summary ReportRead
     * @request GET:/api/Reports/GroupReport
     * @secure
     */
    reportsGroupReportList: (
      query?: {
        GroupReportId?: string;
        HouseManagementId?: string;
        NodeResourceTypes?: EResourceType[];
        NodeStatus?: ENodeCommercialAccountStatus;
        "Subscription.Email"?: string;
        "Subscription.ContractorIds"?: number[];
        "Subscription.TriggerAt"?: string;
        "Subscription.Type"?: EEmailSubscriptionType;
        DelayedEmailTarget?: string;
        ReportType?: EReportType;
        From?: string;
        To?: string;
        ReportFormat?: EReportFormat;
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
     * @description Роли:<li>Старший оператор</li><li>Оператор</li>
     *
     * @tags Reports
     * @name ReportsOperatorsWorkingReportList
     * @summary ReadingReportForOperator
     * @request GET:/api/Reports/OperatorsWorkingReport
     * @secure
     */
    reportsOperatorsWorkingReportList: (query?: { From?: string; To?: string }, params: RequestParams = {}) =>
      this.request<File, ErrorApiResponse>({
        path: `/api/Reports/OperatorsWorkingReport`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
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
    reportsInspectorsWorkingReportList: (query?: { From?: string; To?: string }, params: RequestParams = {}) =>
      this.request<File, ErrorApiResponse>({
        path: `/api/Reports/InspectorsWorkingReport`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
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
    reportsCallCenterWorkingReportList: (query?: { From?: string; To?: string }, params: RequestParams = {}) =>
      this.request<File, ErrorApiResponse>({
        path: `/api/Reports/CallCenterWorkingReport`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
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
    reportsHouseManagementsReportList: (query?: { From?: string; To?: string }, params: RequestParams = {}) =>
      this.request<File, ErrorApiResponse>({
        path: `/api/Reports/HouseManagementsReport`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Старший оператор</li><li>Оператор</li>
     *
     * @tags Reports
     * @name ReportsCheckingDatesReportList
     * @summary ReadingReportForOperator
     * @request GET:/api/Reports/CheckingDatesReport
     * @secure
     */
    reportsCheckingDatesReportList: (
      query: { To?: string; From?: string; Resources: EResourceType[] },
      params: RequestParams = {},
    ) =>
      this.request<File, ErrorApiResponse>({
        path: `/api/Reports/CheckingDatesReport`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Старший оператор</li><li>Оператор</li>
     *
     * @tags Reports
     * @name ReportsReadingsReportList
     * @summary ReadingReportForOperator
     * @request GET:/api/Reports/ReadingsReport
     * @secure
     */
    reportsReadingsReportList: (query?: { MonthsFromNow?: number }, params: RequestParams = {}) =>
      this.request<File, ErrorApiResponse>({
        path: `/api/Reports/ReadingsReport`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Старший оператор</li><li>Оператор</li>
     *
     * @tags Reports
     * @name ReportsClosedDevicesReportList
     * @summary ReadingReportForOperator
     * @request GET:/api/Reports/ClosedDevicesReport
     * @secure
     */
    reportsClosedDevicesReportList: (
      query?: {
        ManagementFirmId?: number;
        HouseManagementId?: string;
        HousingStockId?: number;
        Resources?: EResourceType[];
        ClosingReasons?: EClosingReason[];
        From?: string;
        To?: string;
        WithoutApartmentsWithOpenDevicesByResources?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<FileContentResultSuccessApiResponse, ErrorApiResponse>({
        path: `/api/Reports/ClosedDevicesReport`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
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
    reportsApartmentsWithPreviousBrokenDevicesReportList: (params: RequestParams = {}) =>
      this.request<FileContentResultSuccessApiResponse, ErrorApiResponse>({
        path: `/api/Reports/ApartmentsWithPreviousBrokenDevicesReport`,
        method: "GET",
        secure: true,
        format: "json",
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
    reportsRunnerReportsList: (query: { yearRange: YearRangeType; hmIds?: string[] }, params: RequestParams = {}) =>
      this.request<File, ErrorApiResponse>({
        path: `/api/Reports/RunnerReports`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Старший оператор</li><li>Оператор</li>
     *
     * @tags Reports
     * @name ReportsMahallyaTasksReportList
     * @summary ReadingReportForOperator
     * @request GET:/api/Reports/MahallyaTasksReport
     * @secure
     */
    reportsMahallyaTasksReportList: (params: RequestParams = {}) =>
      this.request<File, ErrorApiResponse>({
        path: `/api/Reports/MahallyaTasksReport`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Старший оператор</li><li>Оператор</li>
     *
     * @tags Reports
     * @name ReportsHomeownerAccountsForErcList
     * @summary ReadingReportForOperator
     * @request GET:/api/Reports/HomeownerAccountsForErc
     * @secure
     */
    reportsHomeownerAccountsForErcList: (params: RequestParams = {}) =>
      this.request<File, ErrorApiResponse>({
        path: `/api/Reports/HomeownerAccountsForErc`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Старший оператор</li><li>Оператор</li>
     *
     * @tags Reports
     * @name ReportsDataForMlExportList
     * @summary ReadingReportForOperator
     * @request GET:/api/Reports/DataForMLExport
     * @secure
     */
    reportsDataForMlExportList: (
      query?: { CalculatorIds?: number[]; Resource?: EResourceType },
      params: RequestParams = {},
    ) =>
      this.request<File, ErrorApiResponse>({
        path: `/api/Reports/DataForMLExport`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li>
     *
     * @tags Reports
     * @name ReportsSoiReportList
     * @summary SoiReportCreate
     * @request GET:/api/Reports/SoiReport
     * @secure
     */
    reportsSoiReportList: (
      query?: {
        HouseManagementId?: string;
        HousingStockId?: number;
        Resource?: EResourceType;
        Month?: number;
        Year?: number;
        Period?: ESoiReportPeriod;
        NormativePerPerson?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<File, ErrorApiResponse>({
        path: `/api/Reports/SoiReport`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li>
     *
     * @tags Reports
     * @name ReportsFeedBackFlowTemperatureReportList
     * @summary ReadingReportForAdministrator
     * @request GET:/api/Reports/FeedBackFlowTemperatureReport
     * @secure
     */
    reportsFeedBackFlowTemperatureReportList: (
      query?: { HouseManagementId?: string; OutdoorTemperature?: number },
      params: RequestParams = {},
    ) =>
      this.request<File, ErrorApiResponse>({
        path: `/api/Reports/FeedBackFlowTemperatureReport`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
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
        PageNumber?: number;
        PageSize?: number;
        OrderBy?: EOrderByRule;
        Skip?: number;
        Take?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ReportRequestHistoryPagedList, ErrorApiResponse>({
        path: `/api/Reports/ReportRequestsHistory`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li>
     *
     * @tags ResourceDisconnecting
     * @name ResourceDisconnectingList
     * @summary ResourceDisconnectingRead
     * @request GET:/api/ResourceDisconnecting
     * @secure
     */
    resourceDisconnectingList: (
      query?: {
        City?: string;
        Resource?: EResourceType;
        DisconnectingType?: EResourceDisconnectingType;
        OrderRule?: EResourceDisconnectingOrderRule;
        HousingStockId?: number;
        Status?: EResourceDisconnectingStatus;
        PageNumber?: number;
        PageSize?: number;
        OrderBy?: EOrderByRule;
        Skip?: number;
        Take?: number;
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
     * @description Роли:<li>Администратор</li>
     *
     * @tags ResourceDisconnecting
     * @name ResourceDisconnectingCreate
     * @summary ResourceDisconnectingCreate
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
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li>
     *
     * @tags ResourceDisconnecting
     * @name ResourceDisconnectingDetail
     * @summary ResourceDisconnectingRead
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
     * @description Роли:<li>Администратор</li>
     *
     * @tags ResourceDisconnecting
     * @name ResourceDisconnectingCreate2
     * @summary ResourceDisconnectingUpdate
     * @request POST:/api/ResourceDisconnecting/{id}
     * @originalName resourceDisconnectingCreate
     * @duplicate
     * @secure
     */
    resourceDisconnectingCreate2: (id: string, data: ResourceDisconnectingUpdateRequest, params: RequestParams = {}) =>
      this.request<ResourceDisconnectingResponseSuccessApiResponse, ErrorApiResponse>({
        path: `/api/ResourceDisconnecting/${id}`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li>
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
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li>
     *
     * @tags ResourceDisconnecting
     * @name ResourceDisconnectingAddDocumentCreate
     * @summary ResourceDisconnectingUpdate
     * @request POST:/api/ResourceDisconnecting/{id}/AddDocument/{documentId}
     * @secure
     */
    resourceDisconnectingAddDocumentCreate: (id: string, documentId: number, params: RequestParams = {}) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/ResourceDisconnecting/${id}/AddDocument/${documentId}`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li>
     *
     * @tags ResourceDisconnecting
     * @name ResourceDisconnectingDeleteDocumentCreate
     * @summary ResourceDisconnectingUpdate
     * @request POST:/api/ResourceDisconnecting/{id}/DeleteDocument
     * @secure
     */
    resourceDisconnectingDeleteDocumentCreate: (id: string, params: RequestParams = {}) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/ResourceDisconnecting/${id}/DeleteDocument`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li>
     *
     * @tags ResourceDisconnecting
     * @name ResourceDisconnectingCompleteCreate
     * @summary ResourceDisconnectingUpdate
     * @request POST:/api/ResourceDisconnecting/{id}/Complete
     * @secure
     */
    resourceDisconnectingCompleteCreate: (id: string, params: RequestParams = {}) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/ResourceDisconnecting/${id}/Complete`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li>
     *
     * @tags ResourceDisconnecting
     * @name ResourceDisconnectingFiltersList
     * @summary ResourceDisconnectingRead
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
     * @tags SamoletIntegration
     * @name SamoletIntegrationCalculatorsArchivesList
     * @request GET:/api/SamoletIntegration/CalculatorsArchives
     * @secure
     */
    samoletIntegrationCalculatorsArchivesList: (
      query: { from: string; to: string; resourceType: ResourceType },
      params: RequestParams = {},
    ) =>
      this.request<SamoletCalculatorResponseIEnumerableSuccessApiResponse, ErrorApiResponse>({
        path: `/api/SamoletIntegration/CalculatorsArchives`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags SamoletIntegration
     * @name SamoletIntegrationGetAllConnectedList
     * @request GET:/api/SamoletIntegration/GetAllConnected
     * @secure
     */
    samoletIntegrationGetAllConnectedList: (params: RequestParams = {}) =>
      this.request<SamoletGetAllConnectedResponseListSuccessApiResponse, ErrorApiResponse>({
        path: `/api/SamoletIntegration/GetAllConnected`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li>
     *
     * @tags SubscriberStatistics
     * @name SubscriberStatisticsList
     * @summary SubscriberStatisticsRead
     * @request GET:/api/SubscriberStatistics
     * @secure
     */
    subscriberStatisticsList: (
      query: {
        HousingStockId: number;
        MonthOfLastTransmission?: string;
        DateLastCheckFrom?: string;
        DateLastCheckTo?: string;
        HotWaterSupplyConsumptionFrom?: number;
        HotWaterSupplyConsumptionTo?: number;
        ColdWaterSupplyConsumptionFrom?: number;
        ColdWaterSupplyConsumptionTo?: number;
        ElectricitySupplyConsumptionFrom?: number;
        ElectricitySupplyConsumptionTo?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<SubscriberStatisticsСonsumptionResponseListSuccessApiResponse, ErrorApiResponse>({
        path: `/api/SubscriberStatistics`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li>
     *
     * @tags SubscriberStatistics
     * @name SubscriberStatisticsExportList
     * @summary SubscriberStatisticsRead
     * @request GET:/api/SubscriberStatistics/Export
     * @secure
     */
    subscriberStatisticsExportList: (
      query: {
        HousingStockId: number;
        MonthOfLastTransmission?: string;
        DateLastCheckFrom?: string;
        DateLastCheckTo?: string;
        HotWaterSupplyConsumptionFrom?: number;
        HotWaterSupplyConsumptionTo?: number;
        ColdWaterSupplyConsumptionFrom?: number;
        ColdWaterSupplyConsumptionTo?: number;
        ElectricitySupplyConsumptionFrom?: number;
        ElectricitySupplyConsumptionTo?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<FileContentResultSuccessApiResponse, ErrorApiResponse>({
        path: `/api/SubscriberStatistics/Export`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Диспетчер УК</li>
     *
     * @tags TaskApplications
     * @name TaskApplicationsLinkCreate
     * @summary TaskApplicationCreate
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
     * @description Роли:<li>Администратор</li><li>Диспетчер УК</li>
     *
     * @tags TaskApplications
     * @name TaskApplicationsSimilarList
     * @summary TaskApplicationRead
     * @request GET:/api/TaskApplications/similar
     * @secure
     */
    taskApplicationsSimilarList: (
      query?: {
        Type?: ETaskApplicationType;
        CompetenceId?: string;
        WorkNomenclatureIds?: string[];
        ApartmentId?: number;
        HousingStockId?: number;
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
     * @description Роли:<li>Администратор</li><li>Диспетчер УК</li>
     *
     * @tags TaskApplications
     * @name TaskApplicationsCreate
     * @summary TaskApplicationCreate
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
     * @description Роли:<li>Администратор</li><li>Диспетчер УК</li>
     *
     * @tags TaskApplications
     * @name TaskApplicationsManagingFirmUsersList
     * @summary TaskApplicationCreate
     * @request GET:/api/TaskApplications/managingFirmUsers
     * @secure
     */
    taskApplicationsManagingFirmUsersList: (
      query?: { Type?: ETaskApplicationType; CompetenceId?: string; HousingStockId?: number },
      params: RequestParams = {},
    ) =>
      this.request<OrganizationUserListResponseListSuccessApiResponse, ErrorApiResponse>({
        path: `/api/TaskApplications/managingFirmUsers`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Диспетчер УК</li>
     *
     * @tags TaskApplications
     * @name TaskApplicationsTypesList
     * @summary TaskApplicationRead
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
     * @description Роли:<li>Администратор</li><li>Диспетчер УК</li>
     *
     * @tags TaskApplicationSources
     * @name TaskApplicationSourcesList
     * @summary TaskApplicationRead
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
     * @description Роли:<li>Администратор</li><li>Диспетчер УК</li>
     *
     * @tags TaskApplicationSources
     * @name TaskApplicationSourcesCreate
     * @summary TaskApplicationCreate
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
     * @description Роли:<li>Администратор</li><li>Диспетчер УК</li>
     *
     * @tags TaskApplicationSources
     * @name TaskApplicationSourcesDetail
     * @summary TaskApplicationRead
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
     * @description Роли:<li>Администратор</li><li>Диспетчер УК</li>
     *
     * @tags TaskApplicationSources
     * @name TaskApplicationSourcesUpdate
     * @summary TaskApplicationUpdate
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
     * @description Роли:<li>Администратор</li><li>Диспетчер УК</li>
     *
     * @tags TaskApplicationSources
     * @name TaskApplicationSourcesDelete
     * @summary TaskApplicationDelete
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
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Фоновый рабочий</li><li>Контролёр</li>
     *
     * @tags Tasks
     * @name TasksExportList
     * @summary TasksRead
     * @request GET:/api/Tasks/Export
     * @secure
     */
    tasksExportList: (
      query?: {
        TargetType?: ETaskTargetType;
        TaskId?: number;
        TaskType?: EManagingFirmTaskFilterType;
        GroupType?: TaskGroupingFilter;
        HouseManagementId?: string;
        DeviceId?: number;
        HousingStockId?: number;
        ApartmentId?: number;
        HasChanged?: boolean;
        PipeNodeId?: number;
        ClosingStatuses?: ETaskClosingStatus[];
        ApplicationCompetenceId?: string;
        TimeStatus?: EStageTimeStatus;
        PerpetratorId?: number;
        Resource?: EResourceType;
        EngineeringElement?: ETaskEngineeringElement;
        City?: string;
        Street?: string;
        HousingStockNumber?: string;
        Corpus?: string;
        ApartmentNumber?: string;
        PageNumber?: number;
        PageSize?: number;
        OrderBy?: EOrderByRule;
        Skip?: number;
        Take?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<File, ErrorApiResponse>({
        path: `/api/Tasks/Export`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Фоновый рабочий</li><li>Контролёр</li>
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
        TaskId?: number;
        TaskType?: EManagingFirmTaskFilterType;
        GroupType?: TaskGroupingFilter;
        HouseManagementId?: string;
        DeviceId?: number;
        HousingStockId?: number;
        ApartmentId?: number;
        HasChanged?: boolean;
        PipeNodeId?: number;
        ClosingStatuses?: ETaskClosingStatus[];
        ApplicationCompetenceId?: string;
        TimeStatus?: EStageTimeStatus;
        PerpetratorId?: number;
        Resource?: EResourceType;
        EngineeringElement?: ETaskEngineeringElement;
        City?: string;
        Street?: string;
        HousingStockNumber?: string;
        Corpus?: string;
        ApartmentNumber?: string;
        PageNumber?: number;
        PageSize?: number;
        OrderBy?: EOrderByRule;
        Skip?: number;
        Take?: number;
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
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Фоновый рабочий</li><li>Контролёр</li>
     *
     * @tags Tasks
     * @name TasksDetail
     * @summary TasksRead
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
     * @description Роли:<li>Диспетчер УК</li><li>Фоновый рабочий</li>
     *
     * @tags Tasks
     * @name TasksDelete
     * @summary TaskDelete
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
     * @description Роли:<li>Диспетчер УК</li>
     *
     * @tags Tasks
     * @name TasksCreateCreate
     * @summary TaskCreate
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
     * @description Роли:<li>Диспетчер УК</li><li>Фоновый рабочий</li>
     *
     * @tags Tasks
     * @name TasksCloseCreate
     * @summary TaskDelete
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
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Контролёр</li>
     *
     * @tags Tasks
     * @name TasksPushStageCreate
     * @summary TasksExecute
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
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Контролёр</li>
     *
     * @tags Tasks
     * @name TasksRevertStageCreate
     * @summary TasksExecute
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
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Фоновый рабочий</li><li>Контролёр</li>
     *
     * @tags Tasks
     * @name TasksNextStagesDetail
     * @summary TasksRead
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
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Контролёр</li>
     *
     * @tags Tasks
     * @name TasksCommentsCreate
     * @summary TaskCommentsCreate
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
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Диспетчер УК</li><li>Контролёр</li>
     *
     * @tags Tasks
     * @name TasksCommentsUpdate
     * @summary TaskCommentsUpdate
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
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Диспетчер УК</li><li>Контролёр</li>
     *
     * @tags Tasks
     * @name TasksCommentsDelete
     * @summary TaskCommentsDelete
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
     * @description Роли:<li>Исполнитель УК</li><li>Диспетчер УК</li><li>Контролёр</li>
     *
     * @tags Tasks
     * @name TasksDocumentsDelete
     * @summary TaskDocumentsDelete
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
     * @description Роли:<li>Администратор</li><li>Старший оператор</li><li>Оператор</li><li>Диспетчер УК</li>
     *
     * @tags Tasks
     * @name TasksAssignMultipleCreate
     * @summary TaskAssign
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
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Фоновый рабочий</li><li>Контролёр</li>
     *
     * @tags Tasks
     * @name TasksFiltersList
     * @summary TasksRead
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
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Контролёр</li>
     *
     * @tags Tasks
     * @name TasksReturnCreate
     * @summary TasksExecute
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
     * @description Роли:<li>Администратор</li><li>Исполнитель УК</li><li>Старший оператор</li><li>Оператор</li><li>Наблюдатель УК</li><li>Наблюдатель УК (ограниченный доступ)</li><li>Диспетчер УК</li><li>Фоновый рабочий</li><li>Контролёр</li>
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
        TaskId?: number;
        TaskType?: EManagingFirmTaskFilterType;
        GroupType?: TaskGroupingFilter;
        HouseManagementId?: string;
        DeviceId?: number;
        HousingStockId?: number;
        ApartmentId?: number;
        HasChanged?: boolean;
        PipeNodeId?: number;
        ClosingStatuses?: ETaskClosingStatus[];
        ApplicationCompetenceId?: string;
        TimeStatus?: EStageTimeStatus;
        PerpetratorId?: number;
        Resource?: EResourceType;
        EngineeringElement?: ETaskEngineeringElement;
        City?: string;
        Street?: string;
        HousingStockNumber?: string;
        Corpus?: string;
        ApartmentNumber?: string;
        PageNumber?: number;
        PageSize?: number;
        OrderBy?: EOrderByRule;
        Skip?: number;
        Take?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<File, ErrorApiResponse>({
        path: `/api/Tasks/ExportLite`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),
  };
}
