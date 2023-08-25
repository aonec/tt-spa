import {
  EIndividualDeviceReportOption,
  IndividualDevicesConstructedReportResponse,
} from 'api/types';

export type IndividualDevicesReportProps = {
  individualDevicesReportData:
    | IndividualDevicesConstructedReportResponse[]
    | null;
  reportOption: EIndividualDeviceReportOption | null;
};
