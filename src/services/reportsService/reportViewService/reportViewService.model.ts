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
  HouseManagementWithStreetsResponse,
  IndividualDevicesConstructedReportResponse,
} from 'myApi';
import { houseManagementsService } from 'services/objects/houseManagementsService';
import {
  $existingCities,
  ExistingCitiesGate,
} from '01/features/housingStocks/displayHousingStockCities/models';
import {
  getActJournalReport,
  getAddressesWithHouseManagements,
  getIndividualDevicesReport,
} from './reportViewService.api';
import {
  ActsJournalReportRequestPayload,
  IndividualDeviceReportRequestPaload,
  ReportFiltrationFormValues,
  ReportPayload,
} from './reportViewService.types';
import {
  prepareActJournalReportData,
  prepareIndividualDevicesReportData,
} from './reportViewService.utils';
import { ReportType } from '../view/ReportsPage/ReportsPage.types';
import { EffectFailDataAxiosError } from 'types';
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

const loadIndividualDeviceReport = domain.createEvent<ReportPayload>();

const loadActJournalReport = domain.createEvent<ReportPayload>();

const setFiltrationValues = domain.createEvent<ReportFiltrationFormValues>();

const $addressesWithHouseManagements = domain
  .createStore<HouseManagementWithStreetsResponse[]>([])
  .on(fetchAddressesWithHouseManagementsFx.doneData, (_, data) => data)
  .reset(AddressesWithHouseManagementsGate.close);

const $filtrationValues = domain
  .createStore<ReportFiltrationFormValues>({
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
  })
  .on(setFiltrationValues, (_, values) => values)
  // .reset(ReportViewGate.close);

const $individualDevicesReportData = domain
  .createStore<IndividualDevicesConstructedReportResponse[] | null>(null)
  .on(fetchIndividualDevicesReportFx.doneData, (_, data) => data)
  .reset(fetchIndividualDevicesReportFx.failData, ReportViewGate.close);

const $actJournalReportData = domain
  .createStore<ApartmentActsConstructedReportResponse | null>(null)
  .on(fetchActJournalReportFx.doneData, (_, data) => data)
  .reset(ReportViewGate.close);

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
  },
});

guard({
  clock: sample({
    clock: loadIndividualDeviceReport.map(({ values }) => values),
    fn: prepareIndividualDevicesReportData,
  }),
  filter: (payload): payload is IndividualDeviceReportRequestPaload =>
    Boolean(payload),
  target: fetchIndividualDevicesReportFx,
});

guard({
  clock: sample({
    clock: loadActJournalReport.map(({ values }) => values),
    fn: prepareActJournalReportData,
  }),
  filter: (payload): payload is ActsJournalReportRequestPayload => {
    return Boolean(payload);
  },
  target: fetchActJournalReportFx,
});

merge([
  fetchIndividualDevicesReportFx.failData,
  fetchActJournalReportFx.failData,
]).watch((error) => message.error(error.response.data.error.Text));

const $isReportLoading = combine(
  fetchIndividualDevicesReportFx.pending,
  fetchActJournalReportFx.pending,
  (...loadings) => loadings.some(Boolean),
);

export const reportViewService = {
  inputs: {
    setFiltrationValues,
  },
  outputs: {
    $existingCities,
    $houseManagements: houseManagementsService.outputs.$houseManagements,
    $addressesWithHouseManagements,
    $filtrationValues,
    $individualDevicesReportData,
    $isReportLoading,
    $actJournalReportData,
  },
  gates: {
    ExistingCitiesGate,
    AddressesWithHouseManagementsGate,
    HouseManagementsGate: houseManagementsService.gates.HouseManagementsGate,
    ReportViewGate,
  },
};
