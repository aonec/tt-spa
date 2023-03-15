import {
  Store,
  combine,
  createDomain,
  forward,
  guard,
  sample,
  split,
  merge,
} from 'effector';
import { createGate } from 'effector-react';
import {
  ApartmentActsConstructedReportResponse,
  HomeownersConstructedReportResponse,
  HouseManagementWithStreetsResponse,
  HousingDevicesConstructedReportResponse,
  IndividualDevicesConstructedReportResponse,
} from 'myApi';
import { houseManagementsService } from 'services/objects/houseManagementsService';
import {
  $existingCities,
  ExistingCitiesGate,
} from '01/features/housingStocks/displayHousingStockCities/models';
import {
  downloadReportFile,
  getActJournalReport,
  getAddressesWithHouseManagements,
  getHomeownersReport,
  getHousingMeteringDevicesReport,
  getIndividualDevicesReport,
} from './reportViewService.api';
import {
  ActsJournalReportRequestPayload,
  HomeownersReportRequestPayload,
  HousingMeteringDevicesReportRequestPayload,
  IndividualDeviceReportRequestPaload,
  ReportFiltrationFormValues,
  ReportPayload,
} from './reportViewService.types';
import {
  getReportPayloadValues,
  prepareActJournalReportRequestPayload,
  prepareHomeownersReportRequestPayload,
  prepareHousingMeteringDevicesReportRequestPayload,
  prepareIndividualDevicesReportRequestPayload,
} from './reportViewService.utils';
import { ReportType } from '../view/ReportsPage/ReportsPage.types';
import { BlobResponseErrorType, EffectFailDataAxiosError } from 'types';
import { message } from 'antd';

const domain = createDomain('reportViewService');

const ReportViewGate = createGate<{ reportType: ReportType }>();

const AddressesWithHouseManagementsGate = createGate();

const fetchAddressesWithHouseManagementsFx = domain.createEffect<
  void,
  HouseManagementWithStreetsResponse[]
>(getAddressesWithHouseManagements);

const fetchIndividualDevicesReportFx = domain.createEffect<
  IndividualDeviceReportRequestPaload,
  IndividualDevicesConstructedReportResponse[],
  EffectFailDataAxiosError
>(getIndividualDevicesReport);

const fetchActJournalReportFx = domain.createEffect<
  ActsJournalReportRequestPayload,
  ApartmentActsConstructedReportResponse,
  EffectFailDataAxiosError
>(getActJournalReport);

const fetchHousingMeteringDevicesReportFx = domain.createEffect<
  HousingMeteringDevicesReportRequestPayload,
  HousingDevicesConstructedReportResponse[],
  EffectFailDataAxiosError
>(getHousingMeteringDevicesReport);

const fetchHomeownersReportFx = domain.createEffect<
  HomeownersReportRequestPayload,
  HomeownersConstructedReportResponse[],
  EffectFailDataAxiosError
>(getHomeownersReport);

const downloadReportFileFx = domain.createEffect<
  ReportPayload,
  void,
  BlobResponseErrorType
>(downloadReportFile);

const loadIndividualDeviceReport = domain.createEvent<ReportPayload>();
const loadActJournalReport = domain.createEvent<ReportPayload>();
const loadHousingMeteringDevicesReport = domain.createEvent<ReportPayload>();
const loadHomeownersReport = domain.createEvent<ReportPayload>();

const downloadReport = domain.createEvent();

const setFiltrationValues = domain.createEvent<ReportFiltrationFormValues>();

const clearFiltrationValues = domain.createEvent();

const $addressesWithHouseManagements = domain
  .createStore<HouseManagementWithStreetsResponse[]>([])
  .on(fetchAddressesWithHouseManagementsFx.doneData, (_, data) => data)
  .reset(AddressesWithHouseManagementsGate.close);

const $filtrationValues = domain
  .createStore<ReportFiltrationFormValues>({
    city: null,
    houseManagement: null,
    housingStockIds: [],
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
  })
  .on(setFiltrationValues, (_, values) => values)
  .reset(ReportViewGate.close, clearFiltrationValues);

const $individualDevicesReportData = domain
  .createStore<IndividualDevicesConstructedReportResponse[] | null>(null)
  .on(fetchIndividualDevicesReportFx.doneData, (_, data) => data)
  .reset(
    fetchIndividualDevicesReportFx.failData,
    ReportViewGate.close,
    clearFiltrationValues,
  );

const $actJournalReportData = domain
  .createStore<ApartmentActsConstructedReportResponse | null>(null)
  .on(fetchActJournalReportFx.doneData, (_, data) => data)
  .reset(ReportViewGate.close, clearFiltrationValues);

const $housingMeteringDevicesReportData = domain
  .createStore<HousingDevicesConstructedReportResponse[] | null>(null)
  .on(fetchHousingMeteringDevicesReportFx.doneData, (_, data) => data)
  .reset(ReportViewGate.close, clearFiltrationValues);

const $homeownersReportData = domain
  .createStore<HomeownersConstructedReportResponse[] | null>(null)
  .on(fetchHomeownersReportFx.doneData, (_, data) => data)
  .reset(ReportViewGate.close, clearFiltrationValues);

forward({
  from: AddressesWithHouseManagementsGate.open,
  to: fetchAddressesWithHouseManagementsFx,
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
  },
});

guard({
  clock: sample({
    clock: loadIndividualDeviceReport.map(getReportPayloadValues),
    fn: prepareIndividualDevicesReportRequestPayload,
  }),
  filter: (payload): payload is IndividualDeviceReportRequestPaload => {
    return Boolean(payload);
  },
  target: fetchIndividualDevicesReportFx,
});

guard({
  clock: sample({
    clock: loadActJournalReport.map(getReportPayloadValues),
    fn: prepareActJournalReportRequestPayload,
  }),
  filter: (payload): payload is ActsJournalReportRequestPayload => {
    return Boolean(payload);
  },
  target: fetchActJournalReportFx,
});

guard({
  clock: sample({
    clock: loadHousingMeteringDevicesReport.map(getReportPayloadValues),
    fn: prepareHousingMeteringDevicesReportRequestPayload,
  }),
  filter: (payload): payload is HousingMeteringDevicesReportRequestPayload => {
    return Boolean(payload);
  },
  target: fetchHousingMeteringDevicesReportFx,
});

guard({
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
  source: $reportPayload,
  clock: downloadReport,
  target: downloadReportFileFx,
});

merge([
  fetchIndividualDevicesReportFx.failData,
  fetchActJournalReportFx.failData,
  fetchHousingMeteringDevicesReportFx.failData,
  fetchHomeownersReportFx.failData,
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
  (...loadings) => loadings.some(Boolean),
);

const $isReportFileDownloading = downloadReportFileFx.pending;

export const reportViewService = {
  inputs: {
    setFiltrationValues,
    downloadReport,
    clearFiltrationValues,
  },
  outputs: {
    $existingCities,
    $houseManagements: houseManagementsService.outputs.$houseManagements,
    $addressesWithHouseManagements,
    $filtrationValues,
    $isReportLoading,
    $individualDevicesReportData,
    $actJournalReportData,
    $housingMeteringDevicesReportData,
    $homeownersReportData,
    $isReportFileDownloading,
  },
  gates: {
    ExistingCitiesGate,
    AddressesWithHouseManagementsGate,
    HouseManagementsGate: houseManagementsService.gates.HouseManagementsGate,
    ReportViewGate,
  },
};
