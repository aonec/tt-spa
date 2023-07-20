import {
  EIndividualDeviceReportOption,
  IndividualDevicesConstructedReportResponse,
} from 'api/myApi';

export type IndividualDevicesReportProps = {
  individualDevicesReportData:
    | IndividualDevicesConstructedReportResponse[]
    | null;
  reportOption: EIndividualDeviceReportOption | null;
};
