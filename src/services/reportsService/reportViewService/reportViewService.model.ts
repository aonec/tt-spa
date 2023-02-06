import {
  Store,
  combine,
  createDomain,
  forward,
  guard,
  sample,
  split,
} from 'effector';
import { createGate } from 'effector-react';
import {
  HouseManagementWithStreetsResponse,
  IndividualDevicesConstructedReportResponse,
} from 'myApi';
import { houseManagementsService } from 'services/objects/houseManagementsService';
import {
  $existingCities,
  ExistingCitiesGate,
} from '01/features/housingStocks/displayHousingStockCities/models';
import {
  getAddressesWithHouseManagements,
  getIndividualDevicesReport,
} from './reportViewService.api';
import {
  IndividualDeviceReportRequestPaload,
  ReportFiltrationFormValues,
  ReportPayload,
} from './reportViewService.types';
import { prepareIndividualDevicesReportData } from './reportViewService.utils';
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

const loadIndividualDeviceReport = domain.createEvent<ReportPayload>();

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
  .on(setFiltrationValues, (_, values) => values);

const $individualDevicesReportData = domain
  .createStore<IndividualDevicesConstructedReportResponse[] | null>(null)
  .on(fetchIndividualDevicesReportFx.doneData, (_, data) => data)
  .reset(fetchIndividualDevicesReportFx.failData);

const $isReportLoading = combine(
  fetchIndividualDevicesReportFx.pending,
  (...loadings) => loadings.some(Boolean),
);

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

fetchIndividualDevicesReportFx.failData.watch((error) =>
  message.error(error.response.data.error.Text),
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
  },
  gates: {
    ExistingCitiesGate,
    AddressesWithHouseManagementsGate,
    HouseManagementsGate: houseManagementsService.gates.HouseManagementsGate,
    ReportViewGate,
  },
};
