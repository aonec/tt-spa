import {
  EIndividualDeviceReportOption,
  IndividualDevicesConstructedReportResponse,
} from 'myApi';

export type IndividualDevicesReportProps = {
  individualDevicesReportData:
    | IndividualDevicesConstructedReportResponse[]
    | null;
  city: string | null;
  reportOption: EIndividualDeviceReportOption | null;
};
