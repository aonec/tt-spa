import axios from 'axios';
import moment from 'moment';
import { message } from 'antd';
import queryString from 'query-string';
import { combine, createDomain, forward, sample } from 'effector';
import { EClosingReason, EResourceType } from 'myApi';
import { createForm } from 'effector-forms/dist';
import { reportsInputs } from '../models';
import { getReportTypeTitleName, RangePeriod, ReportType } from './types';
import { downloadURI } from './utils';
import { ZippedReports } from './CreateReport.constants';
import { reportsListService } from '../reportsListService';
import { EffectFailDataAxiosError } from './../../../../types/index';

const createReportDomain = createDomain('CreateReport');

const openModalButtonClicked = createReportDomain.createEvent();
const closeModalButonClicked = createReportDomain.createEvent();

const $isModalOpen = createReportDomain
  .createStore(false)
  .on(reportsListService.inputs.openExistedReport, () => true);

export const form = createForm({
  fields: {
    type: {
      init: null as ReportType | null,
      rules: [
        {
          name: 'required',
          validator: Boolean,
        },
      ],
    },
    period: {
      init: null as moment.Moment | null,
    },
    rangePeriod: {
      init: [null, null] as RangePeriod,
    },
    resources: {
      init: [] as EResourceType[],
    },
    closingReasons: {
      init: [] as EClosingReason[],
    },
    managementFirmId: {
      init: null as number | null,
    },
    houseManagementId: {
      init: null as string | null,
    },
    housingStockId: {
      init: null as number | null,
    },
    isWithoutApartments: {
      init: false,
    },
  },
});

sample({
  clock: reportsListService.inputs.openExistedReport,
  fn: (values) => {
    const formValues = {
      type: values.type as ReportType,
      resources: values.resources
        ? (JSON.parse(values.resources) as EResourceType[])
        : [],
      period: values.to ? moment(values.to) : null,
      rangePeriod: [
        values.from ? moment(values.from) : null,
        values.to ? moment(values.to) : null,
      ] as RangePeriod,
      isWithoutApartments:
        values.withoutApartmentsWithOpenDevicesByResources === 'True'
          ? true
          : false,
      closingReasons: values.closingReasons
        ? JSON.parse(values.closingReasons)
        : [],

      managementFirmId: values.managementFirmId
        ? Number(values.managementFirmId)
        : null,
      houseManagementId: values.houseManagementId,
      housingStockId: values.housingStockId
        ? Number(values.housingStockId)
        : null,
    };

    console.log(values);
    return formValues;
  },
  target: form.setForm,
});



const createReportFx = createReportDomain.createEffect<
  {
    type: ReportType;
    date: {
      From?: string | null;
      To?: string | null;
    };
    resources?: EResourceType[];
    closingReasons?: EClosingReason[];
    housingStockId?: number | null;
    houseManagementId?: string | null;
    managementFirmId?: number | null;
    isWithoutApartments?: boolean;
  },
  void,
  EffectFailDataAxiosError
>(
  async ({
    date,
    type,
    resources,
    closingReasons,
    housingStockId,
    houseManagementId,
    managementFirmId,
    isWithoutApartments,
  }) => {
    const res: string = await axios.get(`Reports/${type}`, {
      params: {
        From: date.From && moment(date.From).startOf('day').toISOString(),
        To: date.To && moment(date.To).endOf('day').toISOString(),
        Resources: resources,
        ClosingReasons: closingReasons,
        HousingStockId: housingStockId,
        HouseManagementId: houseManagementId,
        ManagementFirmId: managementFirmId,
        WithoutApartmentsWithOpenDevicesByResources: isWithoutApartments,
      },
      responseType: 'blob',
      paramsSerializer: (params) => {
        return queryString.stringify(params);
      },
    });

    const url = window.URL.createObjectURL(new Blob([res]));

    downloadURI(
      url,
      `${getReportTypeTitleName(form.$values.getState().type!)}_${moment(
        date.To
      ).format('MMMM_YYYY')}`,
      ZippedReports.includes(type)
    );
  }
);

forward({
  from: createReportFx.doneData,
  to: form.reset,
});

$isModalOpen.reset(createReportFx.doneData);

const createReport = createReportDomain.createEvent();

forward({
  from: createReportFx.doneData,
  to: reportsListService.inputs.refetchReportsHistory,
});

forward({
  from: form.formValidated,
  to: createReport,
});

const workingReports = [
  ReportType.HouseManagementsReport,
  ReportType.OperatorsWorkingReport,
  ReportType.InspectorsWorkingReport,
];

sample({
  source: form.$values,
  clock: createReport,
  fn: ({
    type,
    period,
    rangePeriod,
    resources,
    closingReasons,
    housingStockId,
    houseManagementId,
    managementFirmId,
    isWithoutApartments,
  }) => {
    if (workingReports.includes(type!)) {
      const startOfPeriod = moment(period).startOf('month').toISOString();
      const endOfPeriod = moment(period).endOf('month').toISOString();
      return { type: type!, date: { From: startOfPeriod, To: endOfPeriod } };
    }
    return {
      type: type!,
      date: {
        From: rangePeriod![0]?.startOf('day')?.toISOString(),
        To: rangePeriod![1]?.endOf('day')?.toISOString(),
      },
      resources,
      closingReasons,
      housingStockId,
      houseManagementId,
      managementFirmId,
      isWithoutApartments,
    };
  },
  target: createReportFx,
});

$isModalOpen
  .on(openModalButtonClicked, () => true)
  .reset(closeModalButonClicked);

forward({
  from: reportsInputs.createReportButtonClicked,
  to: openModalButtonClicked,
});

createReportFx.failData.watch((error) =>
  message.error(error.response.data.error.Text)
);

const $loading = combine(createReportFx.pending, (...pendings) =>
  pendings.some(Boolean)
);

export const outputs = {
  $isModalOpen,
  $loading,
};

export const inputs = {
  openModalButtonClicked,
  closeModalButonClicked,
};

export const createReportService = {
  inputs,
  outputs,
};
