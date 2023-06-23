import { appointmentsJournalService } from './appointmentsJournalService.models';

export type GetAssigmentsRequestPayload = { from: string; to?: string };

export type SearchFormType = typeof appointmentsJournalService.forms.searchForm;

export type DownloadControllerWorkFileRequestPayload = {
  date: string;
  controllerId: string;
};
