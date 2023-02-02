import { IndividualDevicesConstructedReportResponse } from 'myApi';

export type IndividualDevicesReportProps = {
  individualDevicesReportData: IndividualDevicesConstructedReportResponse[];
  city: string | null;
};
