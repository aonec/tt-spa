import axios from 'axios';
import { combine, createDomain, forward, guard, sample } from 'effector';
import { createForm } from 'effector-forms/dist';
import moment from 'moment';
import { reportsInputs } from '../models';
import { getReportTypeTitleName, ReportType } from './types';
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
    monthPeriod: {
      init: null as moment.Moment | null,
      rules: [
        {
          name: 'required',
          validator: Boolean,
        },
      ],
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
  const res: any = await axios.get(`Reports/${type}`, {
    params: date,
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

sample({
  source: form.$values,
  clock: guard({
    source: form.fields.monthPeriod.$value,
    clock: createReport,
    filter: Boolean,
  }),
  fn: ({ type, monthPeriod }) => {
    const startOfMonth = moment(monthPeriod).startOf('month').toISOString();
    const endOfMonth = moment(monthPeriod).endOf('month').toISOString();

    return { type: type!, date: { From: startOfMonth, To: endOfMonth } };
  },
  target: createReportFx,
});

createReport.watch(() => {});

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
