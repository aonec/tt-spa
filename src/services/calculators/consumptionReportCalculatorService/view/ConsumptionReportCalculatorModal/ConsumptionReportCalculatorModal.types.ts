import { CalculatorResponse } from "myApi";

export type ConsumptionReportCalculatorModalProps = {
  isModalOpen: boolean;
  handleModalClosed: () => void;
  calculator: CalculatorResponse | null
};
