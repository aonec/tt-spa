import { createDomain } from 'effector';

const reportsDomain = createDomain('Reports');

const createReportButtonClicked = reportsDomain.createEvent();

export const reportsInputs = { createReportButtonClicked };
