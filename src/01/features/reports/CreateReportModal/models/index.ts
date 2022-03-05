import axios from 'axios';
import { combine, createDomain, forward } from 'effector';
import { createForm } from 'effector-forms/dist';
import moment from 'moment';
import { reportsInputs } from '../../models';
import { ReportType } from '../types';
import { downloadURI } from '../utils';

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

const createOperatorsReportFx = createReportDomain.createEffect<
  {
    From?: string;
    To?: string;
  },
  void
>(async (params) => {
  const res: any = await axios.get('Reports/OperatorsWorkingReport', {
    params,
    responseType: 'blob',
  });

  const url = window.URL.createObjectURL(new Blob([res]));

  downloadURI(
    url,
    `${form.$values.getState().type}_${moment(params.To).format('MMMM_YYYY')}`
  );
});

$isModalOpen.reset(createOperatorsReportFx.doneData);

const createReport = createReportDomain.createEvent();

forward({
  from: form.formValidated,
  to: createReport,
});

createReport.watch(() => {
  const type = form.fields.type.$value.getState();
  const monthPeriod = form.fields.monthPeriod.$value.getState();

  switch (type) {
    case ReportType.OperatorsWorkingReport:
      const startOfMonth = moment(monthPeriod).startOf('month').toISOString();
      const endOfMonth = moment(monthPeriod).endOf('month').toISOString();

      createOperatorsReportFx({ From: startOfMonth, To: endOfMonth });
  }
});

createOperatorsReportFx.doneData.watch((payload) => {});

$isModalOpen
  .on(openModalButtonClicked, () => true)
  .reset(closeModalButonClicked);

forward({
  from: reportsInputs.createReportButtonClicked,
  to: openModalButtonClicked,
});

const $loading = combine(createOperatorsReportFx.pending, (...pendings) =>
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
