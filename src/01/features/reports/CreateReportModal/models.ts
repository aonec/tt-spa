import axios from 'axios';
import { combine, createDomain, forward, guard, sample } from 'effector';
import { createForm } from 'effector-forms/dist';
import moment, { Moment, unitOfTime } from 'moment';
import { reportsInputs } from '../models';
import { getReportTypeTitleName, RangePeriod, ReportType } from './types';
import { downloadURI } from './utils';

const createReportDomain = createDomain('CreateReport');

const $isModalOpen = createReportDomain.createStore(false);

const openModalButtonClicked = createReportDomain.createEvent();
const closeModalButonClicked = createReportDomain.createEvent();

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
  },
});

const createReportFx = createReportDomain.createEffect<
  {
    type: ReportType;
    date: {
      From?: string | null;
      To?: string | null;
    };
  },
  void
>(async ({ date, type }) => {
  const res: string = await axios.get(`Reports/${type}`, {
    params: {
      From: date.From && moment(date.From).startOf('day').toISOString(),
      To: date.To && moment(date.To).endOf('day').toISOString(),
    },
    responseType: 'blob',
  });

  const url = window.URL.createObjectURL(new Blob([res]));

  downloadURI(
    url,
    `${getReportTypeTitleName(form.$values.getState().type!)}_${moment(
      date.To
    ).format('MMMM_YYYY')}`
  );
});

$isModalOpen.reset(createReportFx.doneData);

const createReport = createReportDomain.createEvent();

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
  fn: ({ type, period, rangePeriod }) => {
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
