import { createDomain, forward } from 'effector';
import { createForm } from 'effector-forms/dist';
import moment from 'moment';
import { reportsInputs } from '../../models';
import { ReportType } from '../types';

const createReportDomain = createDomain('CreateReport');

const $isModalOpen = createReportDomain.createStore(false);

const openModalButtonClicked = createReportDomain.createEvent();
const closeModalButonClicked = createReportDomain.createEvent();

$isModalOpen.on(openModalButtonClicked, () => true);

export const form = createForm({
  fields: {
    type: {
      init: null as ReportType | null,
    },
    monthPeriod: {
      init: null as moment.Moment | null,
    },
  },
});

forward({
  from: reportsInputs.createReportButtonClicked,
  to: openModalButtonClicked,
});

export const outputs = {
  $isModalOpen,
};

export const inputs = {
  openModalButtonClicked,
  closeModalButonClicked,
};
