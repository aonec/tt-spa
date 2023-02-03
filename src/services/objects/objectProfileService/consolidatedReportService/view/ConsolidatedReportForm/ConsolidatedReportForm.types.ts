import { HousingStockResponse } from 'myApi';
import { GetConsolidatedReport } from '../../consolidatedReportService.types';
import moment from 'moment';

export type ConsolidatedReportFormProps = {
  formId: string;
  housingStock: HousingStockResponse;
  handleSubmit: (payload: GetConsolidatedReport) => void;
};

export enum ArchiveType {
  StartOfMonth = 'StartOfMonth',
  PreviousMonth = 'PreviousMonth',
  AnyPeriod = 'AnyPeriod',
}

export type DatePeriod = [null | moment.Moment, null | moment.Moment];
