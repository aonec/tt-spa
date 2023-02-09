import { CalculatorResponse } from 'myApi';
import { GetCalculatorReportParams } from 'services/calculators/consumptionReportCalculatorService/consumptionReportCalculatorService.types';

export type ConsumptionReportCalculatorFormProps = {
  formId: string;
  calculator: CalculatorResponse | null;
  handleSubmitForm: (payload: GetCalculatorReportParams) => void;
  isSono?: boolean;
};

export enum ArchiveType {
  LastSevenDays = 'LastSevenDays',
  StartOfMonth = 'StartOfMonth',
  PreviousMonth = 'PreviousMonth',
  AnyPeriod = 'AnyPeriod',
}

export type DatePeriod = [null | moment.Moment, null | moment.Moment];
