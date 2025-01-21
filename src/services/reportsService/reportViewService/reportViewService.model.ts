import { createEffect, createEvent, createStore } from 'effector';
import { Store, combine, sample, split, merge } from 'effector';
import { createGate } from 'effector-react';
import {
  ApartmentActsConstructedReportResponse,
  HomeownersConstructedReportResponse,
  HouseManagementWithStreetsResponse,
  HousingDevicesConstructedReportResponse,
  IndividualDevicesConstructedReportResponse,
} from 'api/types';
import { houseManagementsService } from 'services/objects/houseManagementsService';
import {
  downloadReportFile,
  getActJournalReport,
  getAddressesWithHouseManagements,
  getEmployeeReport,
  getHomeownersReport,
  getHousingMeteringDevicesReport,
  getIndividualDevicesReport,
} from './reportViewService.api';
import {
  ActsJournalReportRequestPayload,
  EmployeeReportRequestPayload,
  EmployeeReportResponse,
  HomeownersReportRequestPayload,
  HousingMeteringDevicesReportRequestPayload,
  IndividualDeviceReportRequestPaload,
  ReportFiltrationFormValues,
  ReportPayload,
} from './reportViewService.types';
import {
  getReportPayloadValues,
  prepareActJournalReportRequestPayload,
  prepareEmployeeReportRequestPayload,
  prepareHomeownersReportRequestPayload,
  prepareHousingMeteringDevicesReportRequestPayload,
  prepareIndividualDevicesReportRequestPayload,
} from './reportViewService.utils';
import { ReportType } from '../view/ReportsPage/ReportsPage.types';
import { BlobResponseErrorType, EffectFailDataAxiosError } from 'types';
import { message } from 'antd';
import { addressSearchService } from 'services/addressSearchService/addressSearchService.models';
import { currentOrganizationService } from 'services/currentOrganizationService';

const ReportViewGate = createGate<{ reportType: ReportType }>();

const AddressesWithHouseManagementsGate = createGate();

const fetchAddressesWithHouseManagementsFx = createEffect<
  void,
  HouseManagementWithStreetsResponse[]
>(getAddressesWithHouseManagements);

const fetchIndividualDevicesReportFx = createEffect<
  IndividualDeviceReportRequestPaload,
  IndividualDevicesConstructedReportResponse[],
  EffectFailDataAxiosError
>(getIndividualDevicesReport);

const fetchActJournalReportFx = createEffect<
  ActsJournalReportRequestPayload,
  ApartmentActsConstructedReportResponse,
  EffectFailDataAxiosError
>(getActJournalReport);

const fetchHousingMeteringDevicesReportFx = createEffect<
  HousingMeteringDevicesReportRequestPayload,
  HousingDevicesConstructedReportResponse[],
  EffectFailDataAxiosError
>(getHousingMeteringDevicesReport);

const fetchHomeownersReportFx = createEffect<
  HomeownersReportRequestPayload,
  HomeownersConstructedReportResponse[],
  EffectFailDataAxiosError
>(getHomeownersReport);

const fetchEmployeeReportFx = createEffect<
  EmployeeReportRequestPayload,
  EmployeeReportResponse,
  EffectFailDataAxiosError
>(getEmployeeReport);

const downloadReportFileFx = createEffect<
  ReportPayload,
  void,
  BlobResponseErrorType
>(downloadReportFile);

const loadIndividualDeviceReport = createEvent<ReportPayload>();
const loadActJournalReport = createEvent<ReportPayload>();
const loadHousingMeteringDevicesReport = createEvent<ReportPayload>();
const loadHomeownersReport = createEvent<ReportPayload>();
const loadEmployeeReport = createEvent<ReportPayload>();

const downloadReport = createEvent();

const setFiltrationValues = createEvent<Partial<ReportFiltrationFormValues>>();

const clearFiltrationValues = createEvent();

const setCityFilter = createEvent<string>();

const setSubmitButtonDisable = createEvent<boolean>();

const $addressesWithHouseManagements = createStore<
  HouseManagementWithStreetsResponse[]
>([])
  .on(fetchAddressesWithHouseManagementsFx.doneData, (_, data) => data)
  .reset(AddressesWithHouseManagementsGate.close);

const $filtrationValues = createStore<ReportFiltrationFormValues>({
  organizationId: null,
  exportType: null,
  city: null,
  houseManagement: null,
  housingStockId: null,
  resources: [],
  reportOption: null,
  from: null,
  to: null,
  reportDatePeriod: null,
  closingReasons: [],
  actResources: [],
  showOnlyDuplicates: false,
  withoutApartmentsWithOpenDevicesByResources: false,
  employeeReportType: null,
  employeeReportDatePeriodType: null,
  employeeReportDate: null,
  actType: null,
})
  .on(setFiltrationValues, (prev, values) => ({ ...prev, ...values }))
  .on(setCityFilter, (prev, city) => ({ ...prev, city }))
  .reset(ReportViewGate.close, clearFiltrationValues);

const $isSubmitButtonDisable = createStore<boolean>(true).on(
  setSubmitButtonDisable,
  (_, value) => value,
);

sample({
  clock: ReportViewGate.open,
  source: currentOrganizationService.outputs.$defaultCity,
  filter: Boolean,
  target: setCityFilter,
});

const $individualDevicesReportData = createStore<
  IndividualDevicesConstructedReportResponse[] | null
>(null)
  .on(fetchIndividualDevicesReportFx.doneData, (_, data) => data)
  .reset(
    fetchIndividualDevicesReportFx.failData,
    ReportViewGate.close,
    clearFiltrationValues,
  );

const $actJournalReportData =
  createStore<ApartmentActsConstructedReportResponse | null>(null)
    .on(fetchActJournalReportFx.doneData, (_, data) => data)
    .reset(ReportViewGate.close, clearFiltrationValues);

const $housingMeteringDevicesReportData = createStore<
  HousingDevicesConstructedReportResponse[] | null
>(null)
  .on(fetchHousingMeteringDevicesReportFx.doneData, (_, data) => data)
  .reset(ReportViewGate.close, clearFiltrationValues);

const $homeownersReportData = createStore<
  HomeownersConstructedReportResponse[] | null
>(null)
  .on(fetchHomeownersReportFx.doneData, (_, data) => data)
  .reset(ReportViewGate.close, clearFiltrationValues);

const $emloyeeReportData = createStore<EmployeeReportResponse | null>(null)
  .on(fetchEmployeeReportFx.doneData, (_, data) => data)
  .reset(ReportViewGate.close, clearFiltrationValues);

sample({
  clock: AddressesWithHouseManagementsGate.open,
  target: fetchAddressesWithHouseManagementsFx,
});

const $reportPayload: Store<ReportPayload> = combine(
  $filtrationValues,
  ReportViewGate.state,
  (values, { reportType }) => ({ values, reportType }),
);

split({
  source: $reportPayload,
  match: (data: ReportPayload): ReportType => data.reportType,
  cases: {
    [ReportType.IndividualDevices]: loadIndividualDeviceReport,
    [ReportType.ActsJournal]: loadActJournalReport,
    [ReportType.HousingDevices]: loadHousingMeteringDevicesReport,
    [ReportType.Homeowners]: loadHomeownersReport,
    [ReportType.Employee]: loadEmployeeReport,
  },
});

sample({
  clock: sample({
    clock: loadIndividualDeviceReport.map(getReportPayloadValues),
    fn: prepareIndividualDevicesReportRequestPayload,
  }),
  filter: (payload): payload is IndividualDeviceReportRequestPaload => {
    return Boolean(payload);
  },
  target: fetchIndividualDevicesReportFx,
});

sample({
  clock: sample({
    clock: loadActJournalReport.map(getReportPayloadValues),
    fn: prepareActJournalReportRequestPayload,
  }),
  filter: (payload): payload is ActsJournalReportRequestPayload => {
    return Boolean(payload);
  },
  target: fetchActJournalReportFx,
});

sample({
  clock: sample({
    clock: loadHousingMeteringDevicesReport.map(getReportPayloadValues),
    fn: prepareHousingMeteringDevicesReportRequestPayload,
  }),
  filter: (payload): payload is HousingMeteringDevicesReportRequestPayload => {
    return Boolean(payload);
  },
  target: fetchHousingMeteringDevicesReportFx,
});

sample({
  clock: sample({
    clock: loadHomeownersReport.map(getReportPayloadValues),
    fn: prepareHomeownersReportRequestPayload,
  }),
  filter: (payload): payload is HomeownersReportRequestPayload => {
    return Boolean(payload);
  },
  target: fetchHomeownersReportFx,
});

sample({
  clock: sample({
    clock: loadEmployeeReport.map(getReportPayloadValues),
    fn: prepareEmployeeReportRequestPayload,
  }),
  filter: (payload): payload is EmployeeReportRequestPayload => {
    return Boolean(payload);
  },
  target: fetchEmployeeReportFx,
});

sample({
  source: $reportPayload,
  clock: downloadReport,
  target: downloadReportFileFx,
});

merge([
  fetchIndividualDevicesReportFx.failData,
  fetchActJournalReportFx.failData,
  fetchHousingMeteringDevicesReportFx.failData,
  fetchHomeownersReportFx.failData,
  fetchEmployeeReportFx.failData,
]).watch((error) => message.error(error.response.data.error.Text));

downloadReportFileFx.failData.watch(async (error) => {
  const jsonData = await error.response.data.text();
  const errObject = JSON.parse(jsonData);

  return message.error(
    errObject.error.Text || errObject.error.Message || 'Произошла ошибка',
  );
});

const $isReportLoading = combine(
  fetchIndividualDevicesReportFx.pending,
  fetchActJournalReportFx.pending,
  fetchHousingMeteringDevicesReportFx.pending,
  fetchHomeownersReportFx.pending,
  fetchEmployeeReportFx.pending,
  (...loadings) => loadings.some(Boolean),
);

const $isReportFileDownloading = downloadReportFileFx.pending;

export const reportViewService = {
  inputs: {
    setFiltrationValues,
    downloadReport,
    clearFiltrationValues,
    setSubmitButtonDisable,
  },
  outputs: {
    $existingCities: addressSearchService.outputs.$existingCities,
    $houseManagements: houseManagementsService.outputs.$houseManagements,
    $addressesWithHouseManagements,
    $filtrationValues,
    $isReportLoading,
    $individualDevicesReportData,
    $actJournalReportData,
    $housingMeteringDevicesReportData,
    $homeownersReportData,
    $isReportFileDownloading,
    $emloyeeReportData,
    $isSubmitButtonDisable,
  },
  gates: {
    ExistingCitiesGate: addressSearchService.gates.ExistingCitiesGate,
    AddressesWithHouseManagementsGate,
    HouseManagementsGate: houseManagementsService.gates.HouseManagementsGate,
    ReportViewGate,
  },
};
