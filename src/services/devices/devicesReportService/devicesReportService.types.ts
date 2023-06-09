import { CalculatorsListRequestPayload } from 'services/calculators/calculatorsListService/calculatorsListService.types';

export type DevicesReportPayload = CalculatorsListRequestPayload & {
  title: string;
};
