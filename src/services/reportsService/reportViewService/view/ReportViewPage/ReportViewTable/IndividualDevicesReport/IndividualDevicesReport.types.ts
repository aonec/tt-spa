import {
  EIndividualDeviceReportOption,
  IndividualDevicesConstructedReportResponse,
} from 'myApi';

export type IndividualDevicesReportProps = {
  individualDevicesReportData:
    | IndividualDevicesConstructedReportResponse[]
    | null;
  reportOption: EIndividualDeviceReportOption | null;
};
