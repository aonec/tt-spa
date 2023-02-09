import { CalculatorResponse } from 'myApi';
import { GetCalculatorReportParams } from '../../consumptionReportCalculatorService.types';

export type ConsumptionReportCalculatorModalProps = {
  isModalOpen: boolean;
  handleModalClosed: () => void;
  calculator: CalculatorResponse | null;
  handleSubmit: (payload: GetCalculatorReportParams) => void;
};
