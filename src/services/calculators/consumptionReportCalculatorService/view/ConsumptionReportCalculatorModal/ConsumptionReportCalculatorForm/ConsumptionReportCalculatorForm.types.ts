import { CalculatorResponse } from 'myApi';

export type ConsumptionReportCalculatorFormProps = {
  formId: string;
  calculator: CalculatorResponse | null;
};

export enum ArchiveType {
  LastSevenDays = 'LastSevenDays',
  StartOfMonth = 'StartOfMonth',
  PreviousMonth = 'PreviousMonth',
  AnyPeriod = 'AnyPeriod',
}

export type DatePeriod = [null | moment.Moment, null | moment.Moment];
